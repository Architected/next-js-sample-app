import CryptoHelper from './cryptoHelper';
import { architectedConfig } from '../architectedConfig';
import { ArchitectedConnect } from 'architected-client';

const connectInit = () => {
  const cryptoHelper = new CryptoHelper();
  const connectInstance = new ArchitectedConnect();
  connectInstance.init(architectedConfig, cryptoHelper);

  return connectInstance.connectService();
};

export default connectInit;
