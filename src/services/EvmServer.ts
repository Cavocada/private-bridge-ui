import BigNumber from 'bignumber.js';
import { getErc20Contract, getBridgeContract, getDefaultAccount, gasOptions, createERCDepositData, web3 } from './web3';
import { AddEthereumChainParameter, BridgeConfigSimple } from '_constants/ChainBridge.d';
import { Contract } from 'web3-eth-contract';

const EvmServer = {
  async calculationDecimalsAmount(contract: Contract, amount: string, type: 'toWei' | 'formWei'): Promise<string> {
    const erc20Decimals = await contract.methods.decimals().call();
    const ten = new BigNumber(10);
    const power = ten.exponentiatedBy(erc20Decimals);
    if (type === 'toWei') {
      return new BigNumber(amount).times(power).toString(10);
    }
    return new BigNumber(amount).div(power).toString(10);
  },

  async tokenBalance(contractAddress: string, decimals: boolean): Promise<string> {
    const contract = getErc20Contract(contractAddress);
    const destAddress = await getDefaultAccount();
    let amount = await contract.methods.balanceOf(destAddress).call();

    if (decimals) {
      amount = await EvmServer.calculationDecimalsAmount(contract, amount, 'formWei');
    }

    return amount;
  },
  async approveToken(tokenAddress: string, erc20HandlerAddress: string, price: string) {
    const contract = getErc20Contract(tokenAddress);
    const options = await gasOptions();
    let gasPrice = '';
    if (erc20HandlerAddress == '0x061E042a7789bE411BEb9b9B9797c0a54a87Ffb6') {
      gasPrice = web3.utils.toWei('0.0000003', 'ether');
    }
    const amount = await EvmServer.calculationDecimalsAmount(contract, price, 'toWei');
    return {
      send: () => contract.methods.approve(erc20HandlerAddress, amount).send({ ...options, gasPrice: gasPrice }),
      encode: contract.methods.approve(erc20HandlerAddress, amount).encodeABI()
    };
  },

  async totalSupply(contractAddress: string): Promise<string> {
    const contract = getErc20Contract(contractAddress);
    return await contract.methods.totalSupply().call();
  },

  async allowance(contractAddress: string, erc20HandlerAddress: string): Promise<string> {
    const contract = getErc20Contract(contractAddress);
    const account = await getDefaultAccount();
    return await contract.methods.allowance(account, erc20HandlerAddress).call();
  },

  async deposit(
    bridgeAddress: string,
    tokenAddress: string,
    destinationChainId: string,
    tokenResourceId: string,
    tokenAmount: string,
    recipientAddress: string,
  ) {
    const contract = getBridgeContract(bridgeAddress);
    const erc20Contract = getErc20Contract(tokenAddress);

    const options = await gasOptions();

    const feePrice = await contract.methods._fee().call(options);

    const feeAmount = feePrice;
    const bridgeAmount = await EvmServer.calculationDecimalsAmount(erc20Contract, tokenAmount, 'toWei');

    const data = createERCDepositData(bridgeAmount, recipientAddress);

    let gasPrice = '';
    if (bridgeAddress == '0x1C3Ccb7d30209c36FF908319ef3A735190A11aD2') {
      gasPrice = web3.utils.toWei('0.0000003', 'ether');
    }

    return {
      send: () => contract.methods
        .deposit(destinationChainId, tokenResourceId, data)
        .send({ ...options, value: feeAmount, gasPrice: gasPrice }),
      encode: contract.methods
        .deposit(destinationChainId, tokenResourceId, data)
        .encodeABI(),
      gasPrice,
      feeAmount,
    }
  },
  async switchNetwork(value: BridgeConfigSimple) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(value.networkId) }],
      });
    } catch (error) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: web3.utils.toHex(value.networkId),
            chainName: value.name,
            nativeCurrency: {
              name: value.nativeTokenSymbol,
              symbol: value.nativeTokenSymbol,
              decimals: value.decimals,
            },
            rpcUrls: [value.rpcUrl],
            blockExplorerUrls: [value.explorerUrl],
          } as AddEthereumChainParameter,
        ],
      });
    }
  },
};

export default EvmServer;
