import { ArchitectedBackChannel } from 'architected-client';
import { architectedConfig } from '../architectedConfig';

const backChannelService = () => {
  const instance = new ArchitectedBackChannel();
  instance.init(architectedConfig);
  return instance;
};

export default backChannelService;
