import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(options: SendOptions, callback: (error: Error, result: any) => void): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(options: EstimateGasOptions, callback: (error: Error, result: any) => void): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(options: CallOptions, callback: (error: Error, result: TCallReturn) => void): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<Bridge, BridgeMethodNames, BridgeEventsContext, BridgeEvents>;
export type BridgeEvents =
  | 'Deposit'
  | 'FailedHandlerExecution'
  | 'Paused'
  | 'ProposalEvent'
  | 'ProposalVote'
  | 'RelayerAdded'
  | 'RelayerRemoved'
  | 'RelayerThresholdChanged'
  | 'RoleGranted'
  | 'RoleRevoked'
  | 'Unpaused';
export interface BridgeEventsContext {
  Deposit(
    parameters: {
      filter?: { user?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  FailedHandlerExecution(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Paused(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  ProposalEvent(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  ProposalVote(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  RelayerAdded(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  RelayerRemoved(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  RelayerThresholdChanged(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  RoleGranted(
    parameters: {
      filter?: {
        role?: string | number[] | string | number[][];
        account?: string | string[];
        sender?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  RoleRevoked(
    parameters: {
      filter?: {
        role?: string | number[] | string | number[][];
        account?: string | string[];
        sender?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
  Unpaused(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ): EventResponse;
}
export type BridgeMethodNames =
  | 'new'
  | 'DEFAULT_ADMIN_ROLE'
  | 'MAX_RELAYERS'
  | 'RELAYER_ROLE'
  | '_depositCounts'
  | '_domainID'
  | '_expiry'
  | '_fee'
  | '_relayerThreshold'
  | '_resourceIDToHandlerAddress'
  | 'getRoleAdmin'
  | 'getRoleMember'
  | 'getRoleMemberCount'
  | 'getRoleMemberIndex'
  | 'grantRole'
  | 'hasRole'
  | 'paused'
  | 'renounceRole'
  | 'revokeRole'
  | '_hasVotedOnProposal'
  | 'isRelayer'
  | 'renounceAdmin'
  | 'adminPauseTransfers'
  | 'adminUnpauseTransfers'
  | 'adminChangeRelayerThreshold'
  | 'adminAddRelayer'
  | 'adminRemoveRelayer'
  | 'adminSetResource'
  | 'adminSetGenericResource'
  | 'adminSetBurnable'
  | 'adminSetDepositNonce'
  | 'getProposal'
  | '_totalRelayers'
  | 'adminChangeFee'
  | 'adminWithdraw'
  | 'deposit'
  | 'voteProposal'
  | 'cancelProposal'
  | 'executeProposal'
  | 'transferFunds';
export interface DepositEventEmittedResponse {
  destinationDomainID: string | number;
  resourceID: string | number[];
  depositNonce: string;
  user: string;
  data: string | number[];
  handlerResponse: string | number[];
}
export interface FailedHandlerExecutionEventEmittedResponse {
  lowLevelData: string | number[];
}
export interface PausedEventEmittedResponse {
  account: string;
}
export interface ProposalEventEventEmittedResponse {
  originDomainID: string | number;
  depositNonce: string;
  status: string | number;
  dataHash: string | number[];
}
export interface ProposalVoteEventEmittedResponse {
  originDomainID: string | number;
  depositNonce: string;
  status: string | number;
  dataHash: string | number[];
}
export interface RelayerAddedEventEmittedResponse {
  relayer: string;
}
export interface RelayerRemovedEventEmittedResponse {
  relayer: string;
}
export interface RelayerThresholdChangedEventEmittedResponse {
  newThreshold: string;
}
export interface RoleGrantedEventEmittedResponse {
  role: string | number[];
  account: string;
  sender: string;
}
export interface RoleRevokedEventEmittedResponse {
  role: string | number[];
  account: string;
  sender: string;
}
export interface UnpausedEventEmittedResponse {
  account: string;
}
export interface ProposalResponse {
  _status: string;
  _yesVotes: string;
  _yesVotesTotal: string;
  _proposedBlock: string;
}
export interface Bridge {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param domainID Type: uint8, Indexed: false
   * @param initialRelayers Type: address[], Indexed: false
   * @param initialRelayerThreshold Type: uint256, Indexed: false
   * @param fee Type: uint256, Indexed: false
   * @param expiry Type: uint256, Indexed: false
   */
  'new'(
    domainID: string | number,
    initialRelayers: string[],
    initialRelayerThreshold: string,
    fee: string,
    expiry: string,
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DEFAULT_ADMIN_ROLE(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAX_RELAYERS(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  RELAYER_ROLE(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint8, Indexed: false
   */
  _depositCounts(parameter0: string | number): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  _domainID(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  _expiry(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  _fee(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  _relayerThreshold(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  _resourceIDToHandlerAddress(parameter0: string | number[]): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   */
  getRoleAdmin(role: string | number[]): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param index Type: uint256, Indexed: false
   */
  getRoleMember(role: string | number[], index: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   */
  getRoleMemberCount(role: string | number[]): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  getRoleMemberIndex(role: string | number[], account: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  grantRole(role: string | number[], account: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  hasRole(role: string | number[], account: string): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  paused(): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  renounceRole(role: string | number[], account: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  revokeRole(role: string | number[], account: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param destNonce Type: uint72, Indexed: false
   * @param dataHash Type: bytes32, Indexed: false
   * @param relayer Type: address, Indexed: false
   */
  _hasVotedOnProposal(
    destNonce: string,
    dataHash: string | number[],
    relayer: string,
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param relayer Type: address, Indexed: false
   */
  isRelayer(relayer: string): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newAdmin Type: address, Indexed: false
   */
  renounceAdmin(newAdmin: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  adminPauseTransfers(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  adminUnpauseTransfers(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newThreshold Type: uint256, Indexed: false
   */
  adminChangeRelayerThreshold(newThreshold: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param relayerAddress Type: address, Indexed: false
   */
  adminAddRelayer(relayerAddress: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param relayerAddress Type: address, Indexed: false
   */
  adminRemoveRelayer(relayerAddress: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param handlerAddress Type: address, Indexed: false
   * @param resourceID Type: bytes32, Indexed: false
   * @param tokenAddress Type: address, Indexed: false
   */
  adminSetResource(handlerAddress: string, resourceID: string | number[], tokenAddress: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param handlerAddress Type: address, Indexed: false
   * @param resourceID Type: bytes32, Indexed: false
   * @param contractAddress Type: address, Indexed: false
   * @param depositFunctionSig Type: bytes4, Indexed: false
   * @param depositFunctionDepositerOffset Type: uint256, Indexed: false
   * @param executeFunctionSig Type: bytes4, Indexed: false
   */
  adminSetGenericResource(
    handlerAddress: string,
    resourceID: string | number[],
    contractAddress: string,
    depositFunctionSig: string | number[],
    depositFunctionDepositerOffset: string,
    executeFunctionSig: string | number[],
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param handlerAddress Type: address, Indexed: false
   * @param tokenAddress Type: address, Indexed: false
   */
  adminSetBurnable(handlerAddress: string, tokenAddress: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param domainID Type: uint8, Indexed: false
   * @param nonce Type: uint64, Indexed: false
   */
  adminSetDepositNonce(domainID: string | number, nonce: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param originDomainID Type: uint8, Indexed: false
   * @param depositNonce Type: uint64, Indexed: false
   * @param dataHash Type: bytes32, Indexed: false
   */
  getProposal(
    originDomainID: string | number,
    depositNonce: string,
    dataHash: string | number[],
  ): MethodConstantReturnContext<ProposalResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  _totalRelayers(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newFee Type: uint256, Indexed: false
   */
  adminChangeFee(newFee: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param handlerAddress Type: address, Indexed: false
   * @param tokenAddress Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amountOrTokenID Type: uint256, Indexed: false
   */
  adminWithdraw(
    handlerAddress: string,
    tokenAddress: string,
    recipient: string,
    amountOrTokenID: string,
  ): MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param destinationDomainID Type: uint8, Indexed: false
   * @param resourceID Type: bytes32, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  deposit(
    destinationDomainID: string | number,
    resourceID: string | number[],
    data: string | number[],
  ): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param domainID Type: uint8, Indexed: false
   * @param depositNonce Type: uint64, Indexed: false
   * @param resourceID Type: bytes32, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  voteProposal(
    domainID: string | number,
    depositNonce: string,
    resourceID: string | number[],
    data: string | number[],
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param domainID Type: uint8, Indexed: false
   * @param depositNonce Type: uint64, Indexed: false
   * @param dataHash Type: bytes32, Indexed: false
   */
  cancelProposal(domainID: string | number, depositNonce: string, dataHash: string | number[]): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param domainID Type: uint8, Indexed: false
   * @param depositNonce Type: uint64, Indexed: false
   * @param data Type: bytes, Indexed: false
   * @param resourceID Type: bytes32, Indexed: false
   * @param revertOnFail Type: bool, Indexed: false
   */
  executeProposal(
    domainID: string | number,
    depositNonce: string,
    data: string | number[],
    resourceID: string | number[],
    revertOnFail: boolean,
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param addrs Type: address[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   */
  transferFunds(addrs: string[], amounts: string[]): MethodReturnContext;
}
