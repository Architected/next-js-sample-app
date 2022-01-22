import {
  iamServiceClient,
  fileServiceClient,
  profileServiceClient,
  contentServiceClient,
  connectServiceClient,
} from 'architected-client';
import { architectedConfig } from '../architectedConfig';
import startAuthorize from '../helper/authorizeHelper';
import { CryptoHelper } from 'architected-crypto-helper';

const cryptoHelper = new CryptoHelper();

const iamClient = iamServiceClient;
iamClient.init(architectedConfig, cryptoHelper, startAuthorize);

const fileClient = fileServiceClient;
fileClient.init(architectedConfig);

const profileClient = profileServiceClient;
profileClient.init(architectedConfig);

const contentClient = contentServiceClient;
contentClient.init(architectedConfig);

const connectClient = connectServiceClient;
connectClient.init(architectedConfig, cryptoHelper);

export { iamClient, fileClient, profileClient, contentClient, connectClient };
