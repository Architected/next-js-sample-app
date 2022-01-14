import { architectedConfig } from '../architectedConfig';
import { ArchitectedConnect } from 'architected-client';

const connectInit = () => {
  const connectInstance = new ArchitectedConnect();
  connectInstance.init(architectedConfig);
  return connectInstance.connectService();
};

export default connectInit;
