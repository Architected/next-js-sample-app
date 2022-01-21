import {
  IamService,
  FileService,
  ProfileService,
  ContentService,
  ConnectService,
} from 'architected-client';
import { architectedConfig } from '../architectedConfig';
import startAuthorize from '../helper/authorizeHelper';

const iamService = (() => {
  const instance = new IamService();
  instance.init(architectedConfig, startAuthorize);
  return instance;
})();

const fileService = (() => {
  const instance = new FileService();
  instance.init(architectedConfig);
  return instance;
})();

const profileService = (() => {
  const instance = new ProfileService();
  instance.init(architectedConfig);
  return instance;
})();

const contentService = (() => {
  const instance = new ContentService();
  instance.init(architectedConfig);
  return instance;
})();

const connectService = (() => {
  const instance = new ConnectService();
  instance.init(architectedConfig);
  return instance;
})();

export {
  iamService,
  fileService,
  profileService,
  contentService,
  connectService,
};
