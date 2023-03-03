import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Form, notification, Spin } from 'antd';
import { useRecoilState } from 'recoil';
import BigNumber from 'bignumber.js';
import { useImmer } from 'use-immer';
import { LoadingOutlined } from '@ant-design/icons';

import FindoraLabel from '_components/FindoraLabel';
import FindoraButton from '_components/FindoraButton';
import SourceNetwork from '_containers/SourceNetwork';
import InputAmount, { TypeValue as TypeInputAmountValue } from '_containers/InputAmount';
import ChangeNetwork from '_containers/ChangeNetwork';

import { BridgeConfigSimple, ChainBridgeConfig } from '_constants/ChainBridge.d';
import stores from '_src/stores';
import ChainBridge from '_constants/ChainBridge';

import services from '_src/services';

import './index.less';

function Wrap() {
  const { account, chainId } = useWeb3React();
  const [tokenInfo, setTokenInfo] = useImmer<TypeInputAmountValue & { balance: string }>(null);
  const [form] = Form.useForm();
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [sourceNetworkList, setSourceNetworkList] = useRecoilState<BridgeConfigSimple[]>(stores.sourceNetwork);
  const [destNetworkList, setDestNetworkList] = useRecoilState<BridgeConfigSimple[]>(stores.destNetwork);

  useEffect(() => {
    const _chainBridge: ChainBridgeConfig = { chains: ChainBridge.chains.filter((item) => item.type === 'Ethereum') };
    const _sourceNetworks: BridgeConfigSimple[] = [];
    const _destNetworks: BridgeConfigSimple[] = [];

    _chainBridge.chains.forEach((item) => {
      if (item.networkId === chainId) {
        _sourceNetworks.push(item);
      } else {
        _destNetworks.push(item);
      }
    });

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
    setIsSpin(true);
    try {
      notification.success({
        message: 'Wrap/Unwrap Tips',
        placement: 'bottomRight',
        description: `还在开发中`,
      });
      // await services.evmServer.approveToken(
      //   values.tokenInfo.address,
      //   values.sourceNetwork.erc20HandlerAddress,
      //   values.tokenInfo.amount,
      // );

      // await services.evmServer.deposit(
      //   values.sourceNetwork.bridgeAddress,
      //   values.tokenInfo.address,
      //   values.destNetwork.chainId,
      //   values.tokenInfo.resourceId,
      //   values.tokenInfo.amount,
      //   values.desAddress,
      // );

      // services.evmServer.tokenBalance(tokenInfo.address).then((balance) => {
      //   setTokenInfo((state) => {
      //     state.balance = web3.utils.fromWei(balance).toString();
      //     state.amount = '';
      //   });

      //   form.setFieldsValue({
      //     tokenInfo: { ...tokenInfo, amount: '', balance: web3.utils.fromWei(balance).toString() },
      //   });
      //   form.setFieldsValue({ myAddress: false });
      //   form.setFieldsValue({ desAddress: '' });

      // notification.success({
      //   message: 'Cross-chain Tips',
      //   placement: 'bottomRight',
      //   description: `Successfully transfer ${values.tokenInfo.amount} ${values.tokenInfo.symbol} from ${values.sourceNetwork.name} to ${values.destNetwork.name} network`,
      // });
      // });
    } catch (error) {
      notification.error({
        message: 'Cross-chain Tips',
        placement: 'bottomRight',
        description: `Transfer failed`,
      });
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

  return (
    <div className="section-wrap">
      <Spin wrapperClassName="wrap-spin" indicator={<LoadingOutlined style={{ fontSize: 128 }} />} spinning={isSpin}>
        <div className="form-box">
          <Form layout="vertical" form={form} onFinish={handleOnFinish}>
            <FindoraLabel className="column-label">
              <span>Source Network</span>
              <ChangeNetwork />
            </FindoraLabel>
            <Form.Item name="sourceNetwork" rules={[{ required: true, message: '不能为空' }]}>
              <SourceNetwork dataList={sourceNetworkList} />
            </Form.Item>

            <FindoraLabel className="column-label">
              <span>Enter amount to send</span>
              <span style={{ color: '#fff' }}>
                Balance:{' '}
                {tokenInfo?.symbol
                  ? `${new BigNumber(tokenInfo?.balance || '0').toFixed(2)} ${tokenInfo?.symbol}`
                  : '--'}
              </span>
            </FindoraLabel>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, curValues) => {
                if (prevValues.destNetwork?.chainId !== curValues.destNetwork?.chainId) {
                  form.resetFields(['inputNumbers']);
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
                    rules={[
                      { required: true, message: '不能为空' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const _value = new BigNumber(value?.amount ?? 0).times(10 ** sourceNetworkList[0].decimals);
                          if (value?.amount.trim() === '' || _value.lte(0)) {
                            return Promise.reject('Please enter the transfer amount');
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <InputAmount
                      desNetwork={_destNetwork}
                      units={sourceNetworkList[0]}
                      onChange={handleOnChangeAmount}
                      onMaxAmount={handleOnClickMaxAmount}
                    />
                  </Form.Item>
                );
              }}
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
export default Wrap;
