import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import { Checkbox, Form, notification, Spin, Row, Col, Select } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import BigNumber from 'bignumber.js';
import { useImmer } from 'use-immer';
import { LoadingOutlined } from '@ant-design/icons';
import { evm } from 'privacy-routing-sdk';
import sleep from 'sleep-promise';

import FindoraLabel from '_components/FindoraLabel';
import FindoraButton from '_components/FindoraButton';
import DestinationNetwork from '_containers/DestinationNetwork';
import SourceNetwork from '_containers/SourceNetwork';
import InputAmount, { TypeValue as TypeInputAmountValue } from '_containers/InputAmount';
import ChangeNetwork from '_containers/ChangeNetwork';
import { MIDDLE_MAN_PRIVATE_KEY, PRISM_BRIDGE_LEDGER_ADDRESS } from '_constants/PrismBridge';

import FindoraInput from '_components/FindoraInput';
import { BridgeConfigSimple, ChainBridgeConfig } from '_constants/ChainBridge.d';
import stores from '_src/stores';
import ChainBridge from '_constants/ChainBridge';
import ArrowSvg from '_src/assets/images/arrow.svg';
import Swapicon from '_src/assets/images/swapicon.svg';

import services from '_src/services';

import './index.less';
import { routingByCurrentProvider, routingByPrivateKey } from '_src/integrations/privacyRouting';

const { Option } = Select;

function Cross() {
  const { account, chainId } = useWeb3React();
  const [tokenInfo, setTokenInfo] = useImmer<TypeInputAmountValue & { balance: string }>(null);
  const [form] = Form.useForm();
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [sourceNetworkList, setSourceNetworkList] = useRecoilState<BridgeConfigSimple[]>(stores.sourceNetwork);
  const [destNetworkList, setDestNetworkList] = useRecoilState<BridgeConfigSimple[]>(stores.destNetwork);

  useEffect(() => {
    const _chainBridge: ChainBridgeConfig = { chains: ChainBridge.chains.filter((item) => item.type === 'Ethereum') };
    let _sourceNetworks: BridgeConfigSimple[] = [];
    let _destNetworks: BridgeConfigSimple[] = [];

    _chainBridge.chains.forEach((item) => {
      if (item.networkId === chainId) {
        _sourceNetworks.push(item);
      } else {
        _destNetworks.push(item);
      }
    });

    const destFraNetwork = _destNetworks.find((item) => item.nativeTokenSymbol === 'FRA');
    if (destFraNetwork) {
      _destNetworks = [destFraNetwork];
      // _sourceNetworks = _destNetworks.filter((item) => item.nativeTokenSymbol !== 'FRA');
    }
    setSourceNetworkList(_sourceNetworks);
    setDestNetworkList(_destNetworks);
  }, [chainId]);

  useEffect(() => {
    form.setFieldsValue({ sourceNetwork: sourceNetworkList[0] });
    const tokenInfoDefault = { ...sourceNetworkList[0]?.tokens[0], amount: '' };
    form.setFieldsValue({ tokenInfo: tokenInfoDefault });
    setTokenInfo({ ...tokenInfoDefault, balance: '' });

    form.resetFields(['destAddress']);
  }, [sourceNetworkList]);

  useEffect(() => {
    form.setFieldsValue({ destNetwork: destNetworkList[0] });
  }, [destNetworkList]);

  useEffect(() => {
    if (tokenInfo?.address) {
      services.evmServer.tokenBalance(tokenInfo.address, true).then((balance) => {
        setTokenInfo((state) => {
          state.balance = balance; // web3.utils.fromWei(balance).toString();
        });
      });
    }
  }, [tokenInfo, account]);

  useEffect(() => {
    form.setFieldsValue({ myAddress: false });
    form.setFieldsValue({ desAddress: '' });
  }, [account]);

  async function handleOnFinish(values) {
    console.log('handleOnFinish===>', values);
    console.log(tokenInfo);
    setIsSpin(true);

    try {
      const sourceServersToken = values.sourceNetwork.servers.find(
        (item) => item.chainId === values.destNetwork.chainId,
      );
      const [destTokenInfo] = values.destNetwork.tokens;
      // console.log(sourceServersToken);

      const { networkId } = values.sourceNetwork;
      if ([2154].includes(networkId)) {
        //** -- Start from Forge: Privacy Routing + deposit -- */
        const web3Instance = new web3(web3.givenProvider);
        const middleMan = web3Instance.eth.accounts.privateKeyToAccount(MIDDLE_MAN_PRIVATE_KEY);

        // Privacy Routing
        await routingByCurrentProvider(tokenInfo.amount, middleMan.address, tokenInfo.address);

        // check if middle man received the token.
        const tokenContract = evm.contracts.erc20(tokenInfo.address);
        const fromBlock = await web3Instance.eth.getBlockNumber();
        let receiveEvents = [];
        while (!receiveEvents.length) {
          await sleep(10000);
          receiveEvents = await tokenContract.getPastEvents('Transfer', { fromBlock, filter: { from: PRISM_BRIDGE_LEDGER_ADDRESS, to: middleMan.address } });
          console.log(receiveEvents);
        }

        const { encode: approveEncode } = await services.evmServer.approveToken(tokenInfo.address, sourceServersToken.erc20HandlerAddress, tokenInfo.amount);

        const { rawTransaction: approveRaw } = await middleMan.signTransaction({
          data: approveEncode,
          to: tokenInfo.address,
          from: middleMan.address,
          gas: web3.utils.toHex(800000),
        })
        await web3Instance.eth.sendSignedTransaction(approveRaw);

        const { encode, feeAmount } = await services.evmServer.deposit(
          sourceServersToken.bridgeAddress,
          values.tokenInfo.address,
          values.destNetwork.chainId,
          values.tokenInfo.resourceId,
          values.tokenInfo.amount,
          values.desAddress,
        );

        const { rawTransaction } = await middleMan.signTransaction({
          data: encode,
          to: sourceServersToken.bridgeAddress,
          from: middleMan.address,
          gas: web3.utils.toHex(800000),
          value: feeAmount
        })
        const receipt = await web3Instance.eth.sendSignedTransaction(rawTransaction);
        console.log('deposit: ', receipt.transactionHash);

      } else {
        //** -- Start from Base: deposit + Privacy Routing -- */
        const web3Instance = new web3(values.destNetwork.rpcUrl);
        const middleMan = web3Instance.eth.accounts.privateKeyToAccount(MIDDLE_MAN_PRIVATE_KEY);

        await evm.services.approveToken(tokenInfo.address, sourceServersToken.erc20HandlerAddress, tokenInfo.amount);
        const { send } = await services.evmServer.deposit(
          sourceServersToken.bridgeAddress,
          values.tokenInfo.address,
          values.destNetwork.chainId,
          values.tokenInfo.resourceId,
          values.tokenInfo.amount,
          middleMan.address
        );
        await send();

        // check if middle man received the token from Base.
        const tokenContract = evm.contracts.erc20(destTokenInfo.address, values.destNetwork.rpcUrl);
        const fromBlock = await (new web3(values.destNetwork.rpcUrl)).eth.getBlockNumber();
        let receiveEvents = [];
        while (!receiveEvents.length) {
          await sleep(10000);
          receiveEvents = await tokenContract.getPastEvents('Transfer', { fromBlock, filter: { to: middleMan.address } });
          console.log(receiveEvents);
        }

        // Privacy Routing START
        await routingByPrivateKey(tokenInfo.amount, values.desAddress, values.destNetwork.rpcUrl, destTokenInfo.address);
      }

      services.evmServer.tokenBalance(tokenInfo.address, true).then((balance) => {
        setTokenInfo((state) => {
          state.balance = balance;
          state.amount = '';
        });

        form.setFieldsValue({
          tokenInfo: { ...tokenInfo, amount: '', balance },
        });

        form.setFieldsValue({ myAddress: false });
        form.setFieldsValue({ desAddress: '' });

        notification.success({
          message: 'Cross-chain Tips',
          placement: 'bottomRight',
          description: `Successfully transfer ${values.tokenInfo.amount} ${values.tokenInfo.symbol} from ${values.sourceNetwork.name} to ${values.destNetwork.name} network`,
        });
      });
    } catch (error) {
      notification.error({
        message: 'Cross-chain Tips',
        placement: 'bottomRight',
        description: `Transfer failed`,
      });
      console.log(error);
      return;
    } finally {
      setIsSpin(false);
    }
  }

  function handleOnChangeAmount(item) {
    setTokenInfo({ ...tokenInfo, ...item });
    console.log(item);
  }

  function handleOnClickMaxAmount() {
    form.setFieldsValue({ tokenInfo: { ...tokenInfo, amount: tokenInfo.balance } });
    setTokenInfo({ ...tokenInfo, amount: tokenInfo.balance });
  }

  function handleOnChangeDesAddress(value) {
    if (form.getFieldValue('myAddress')) {
      form.setFieldsValue({ myAddress: false });
    }

    if (value === account) {
      form.setFieldsValue({ myAddress: true });
    }
  }

  function handleOnChangemyAddress(e) {
    if (e.target.checked) {
      form.setFieldsValue({ desAddress: account });
    } else {
      form.setFieldsValue({ desAddress: '' });
    }
  }

  return (
    <div className="section-cross">
      <Spin wrapperClassName="cross-spin" indicator={<LoadingOutlined style={{ fontSize: 128 }} />} spinning={isSpin}>
        <div className="form-box">
          <Form layout="vertical" form={form} onFinish={handleOnFinish}>
            <FindoraLabel className="column-label">
              <span>From</span>
              <ChangeNetwork />
            </FindoraLabel>
            <Row justify="space-between" style={{ marginBottom: '24px' }}>
              <Col span={10}>
                <Form.Item name="sourceNetwork" style={{ marginBottom: '0' }} rules={[{ required: true }]}>
                  <SourceNetwork dataList={sourceNetworkList} />
                </Form.Item>
              </Col>
              <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* <Swapicon /> */}
                <ArrowRightOutlined style={{ fontSize: '28px', width: '30px' }} />
              </Col>
              <Col span={10}>
                <Form.Item name="destNetwork" style={{ marginBottom: '0' }} rules={[{ required: true }]}>
                  <DestinationNetwork dataList={destNetworkList} />
                </Form.Item>
              </Col>
            </Row>
            {/* <div className="icon-arrow">
              <ArrowSvg />
            </div>

            <FindoraLabel>Destination Network</FindoraLabel> */}
            <FindoraLabel className="column-label">
              <span>Assets</span>
              <span style={{ color: '#fff' }}>
                Balance:{' '}
                {tokenInfo?.symbol
                  ? `${new BigNumber(tokenInfo?.balance || '0').toFixed(2, 1)} ${tokenInfo?.symbol}`
                  : '--'}
              </span>
            </FindoraLabel>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, curValues) => {
                if (prevValues.destNetwork?.chainId !== curValues.destNetwork?.chainId) {
                  // form.resetFields(['inputNumbers']);

                  // form.setFieldsValue({ tokenInfo: { ...tokenInfo, amount: tokenInfo.balance } });
                  // console.log('xxxxx');

                  const tokenInfoDefault = { ...sourceNetworkList[0]?.tokens[0], amount: '' };
                  form.setFieldsValue({ tokenInfo: tokenInfoDefault });
                  setTokenInfo({ ...tokenInfoDefault, balance: '' });

                  return true;
                }
                return false;
              }}
            >
              {({ getFieldValue }) => {
                const _destNetwork = getFieldValue('destNetwork');
                return (
                  <Form.Item
                    name="tokenInfo"

                  >
                    <InputAmount
                      units={sourceNetworkList[0]}
                      desNetwork={_destNetwork}
                      onChange={handleOnChangeAmount}
                      onMaxAmount={handleOnClickMaxAmount}
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
            <FindoraLabel>Destination Address</FindoraLabel>
            <Form.Item
              name="desAddress"
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!web3.utils.isAddress(value)) {
                      return Promise.reject('Please enter the correct wallet address');
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <FindoraInput
                placeholder="Please enter the receiving address"
                onChange={handleOnChangeDesAddress}
              ></FindoraInput>
            </Form.Item>
            <Form.Item name="myAddress" valuePropName="checked">
              <Checkbox className="agreement" onChange={handleOnChangemyAddress}>
                I want to send funds to my address
              </Checkbox>
            </Form.Item>
          </Form>
        </div>
        <div className="form-submit">
          <div className="transfer-amount">
            <FindoraLabel>Transfer Amount: </FindoraLabel>
            <div style={{ marginLeft: '4px' }}>
              {tokenInfo?.symbol ? `${tokenInfo?.amount || '0'} ${tokenInfo?.symbol}` : '--'}
            </div>
          </div>
          <FindoraButton
            className="btn-transfer"
            onClick={() => {
              form.submit();
            }}
          >
            Start Transfer
          </FindoraButton>
        </div>
      </Spin>
    </div>
  );
}
export default Cross;
