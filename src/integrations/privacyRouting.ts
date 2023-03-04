import web3 from 'web3';
import { evm, findora, utils } from 'privacy-routing-sdk';
import BigNumber from 'bignumber.js';
import sleep from 'sleep-promise';

import { MIDDLE_MAN_PRIVATE_KEY, PRISM_BRIDGE_LEDGER_ADDRESS, PRISM_BRIDGE_ADDRESS } from '_constants/PrismBridge';

export const routingByPrivateKey = async (amount, to, rpcUrl, tokenAddress) => {
  const web3Instance = new web3(rpcUrl);
  const middleMan = web3Instance.eth.accounts.privateKeyToAccount(MIDDLE_MAN_PRIVATE_KEY);
  const findoraWallets = await findora.keypair.getWallet();
  const { walletStart, anonWallet, walletEnd } = findoraWallets;

  const tokenContract = evm.contracts.erc20(tokenAddress, rpcUrl);
  const prismBridge = evm.contracts.prismBridge(PRISM_BRIDGE_ADDRESS, rpcUrl);

  let receiveEvents = [];

  // FRC20 To BAR: approve
  const decimals = await tokenContract.methods.decimals().call();
  const approveValue = new BigNumber(amount).times(10 ** +decimals).toString(10);
  const approveData = tokenContract.methods.approve(PRISM_BRIDGE_LEDGER_ADDRESS, approveValue).encodeABI();
  const { rawTransaction: approveRaw } = await middleMan.signTransaction({
    from: middleMan.address,
    to: tokenAddress,
    data: approveData,
    gas: web3.utils.toHex(800000),
  })
  await web3Instance.eth.sendSignedTransaction(approveRaw);

  // FRC20 To BAR: amount
  const findoraTo = utils.fraAddressToHashAddress(walletStart.address);
  const amountValue = new BigNumber(amount).times(10 ** +decimals).toString(10);
  const amountData = prismBridge.methods.depositFRC20(tokenAddress, findoraTo, amountValue).encodeABI();
  const { rawTransaction: amountRaw } = await middleMan.signTransaction({
    from: middleMan.address,
    to: PRISM_BRIDGE_ADDRESS,
    data: amountData,
    gas: web3.utils.toHex(800000),
  })
  await web3Instance.eth.sendSignedTransaction(amountRaw);

  // FRC20 To BAR: bar2abar_fee & bar2evm_fee
  for (const fee of [0.02, 0.01]) {
    const value = new BigNumber(fee).times(10 ** 18).toString(10);
    const data = prismBridge.methods.depositFRA(findoraTo).encodeABI();
    const { rawTransaction } = await middleMan.signTransaction({
      from: middleMan.address,
      to: PRISM_BRIDGE_ADDRESS,
      data,
      gas: web3.utils.toHex(800000),
      value
    })
    await web3Instance.eth.sendSignedTransaction(rawTransaction);
  }

  let sids = [];
  while (sids.length < 3) {
    // check walletStart have [amount, bar2abar_fee, bar2evm_fee]
    const { response } = await findora.apis.getOwnedSids(walletStart.publickey);
    sids = response;
  }

  const barToAbarResult =  await findora.transfer.barToAbar(findoraWallets, sids);
  await findora.transfer.abarToBar(anonWallet, walletEnd, barToAbarResult.commitments);

  const assetCode = await evm.services.getAssetCode(
    PRISM_BRIDGE_ADDRESS,
    tokenAddress,
    rpcUrl
  );

  await findora.transfer.barToEVM(
    walletEnd,
    amount,
    to,
    assetCode,
    '',
    false
  );

  const receiverFromBlock = await web3Instance.eth.getBlockNumber();
  receiveEvents = [];
  while (!receiveEvents.length) {
    await sleep(10000);
    receiveEvents = await tokenContract.getPastEvents('Transfer', { fromBlock: receiverFromBlock, filter: { from: PRISM_BRIDGE_LEDGER_ADDRESS, to } });
    console.log(receiveEvents);
  }
}

export const routingByCurrentProvider = async (amount, to, tokenAddress) => {
  const findoraWallets = await findora.keypair.getWallet();
  const { walletStart, anonWallet, walletEnd } = findoraWallets;

  await evm.services.approveToken(tokenAddress, PRISM_BRIDGE_LEDGER_ADDRESS, amount);
  await evm.transfer.frc20ToBar({
    bridgeAddress: PRISM_BRIDGE_ADDRESS,
    recipientAddress: walletStart.address,
    tokenAddress: tokenAddress,
    tokenAmount: amount,
  });

  let sids = [];
  while (sids.length < 3) {
    // check walletStart have [amount, bar2abar_fee, bar2evm_fee]
    const { response } = await findora.apis.getOwnedSids(walletStart.publickey);
    sids = response;
  }

  const barToAbarResult =  await findora.transfer.barToAbar(findoraWallets, sids);
  await findora.transfer.abarToBar(anonWallet, walletEnd, barToAbarResult.commitments);

  const assetCode = await evm.services.getAssetCode(
    PRISM_BRIDGE_ADDRESS,
    tokenAddress,
  );

  await findora.transfer.barToEVM(
    walletEnd,
    amount,
    to,
    assetCode,
    '',
    false
  );
}