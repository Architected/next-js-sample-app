import { ArchitectedFrontChannel } from 'architected-client';
import { architectedConfig } from '../architectedConfig';

const frontChannelService = () => {
  const instance = new ArchitectedFrontChannel();
  instance.init(architectedConfig);
  return instance;
};

export default frontChannelService;
