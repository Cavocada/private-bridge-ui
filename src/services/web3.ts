import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import { Bridge } from '_src/contracts/Bridge';
import { Erc20 } from '_src/contracts/Erc20';
import { ethers } from 'ethers';

const Erc20Abi = require('_abis/Erc20.json');
const BridgeAbi = require('_abis/Bridge.json');

const web3 = new Web3(Web3.givenProvider);

interface MyContract<T> extends Contract {
  methods: T;
}

const getErc20Contract = (address: string) => {
  return new web3.eth.Contract(Erc20Abi, address) as unknown as MyContract<Erc20>;
};

const getBridgeContract = (address: string) => {
  return new web3.eth.Contract(BridgeAbi, address) as unknown as MyContract<Bridge>;
};

const getDefaultAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  }
  return '';
};

const gasOptions = async (params = {}) => {
  const gasLimit = Web3.utils.toHex(800000);
  const from = await getDefaultAccount();
  return {
    from,
    gasLimit,
    ...params,
  };
};

const toHex = (covertThis: string, padding: number) => {
  const temp1 = ethers.utils.hexZeroPad(ethers.utils.hexlify(BigInt(covertThis)), padding);
  // const temp2 = web3.utils.leftPad(web3.utils.toHex(covertThis), padding);
  // console.log('toHex', temp2, temp1);

  return temp1;
};

const createERCDepositData = (tokenAmount: string, recipientAddress: string) => {
  const lenRecipientAddress = `${(recipientAddress.length - 2) / 2}`;
  console.log('createERCDepositData', tokenAmount, recipientAddress);
  return `0x${toHex(tokenAmount, 32).substr(2)}${toHex(lenRecipientAddress, 32).substr(2)}${recipientAddress.substr(
    2,
  )}`;
};

export { web3, getErc20Contract, getBridgeContract, gasOptions, getDefaultAccount, createERCDepositData };
