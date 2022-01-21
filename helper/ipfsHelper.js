import { create as ipfsHttpClient } from 'ipfs-http-client';
import { architectedConfig } from '../architectedConfig';

export const uploadInterPlanetaryFile = async (file) => {
  try {
    const client = ipfsHttpClient(architectedConfig.ipfsAPIEndpoint);
    const fileResponse = await client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });

    console.log('added: ' + JSON.stringify(fileResponse));

    return fileResponse;
  } catch (error) {
    console.log('Error uploading file: ', error);
  }
};

export const getInterPlanetaryFileUrl = (path) => {
  return `${architectedConfig.ipfsFilePath}` + '/' + `${path}`;
};

export const createMetaData = async (file) => {
  const data = JSON.stringify({
    fileId: file.globalId,
    name: file.name,
    description: file.description,
    asset: file.ipfsAssetUrl,
    image: file.ipfsThumbnailUrl,
  });

  var metaDataResponse = await uploadInterPlanetaryFile(data);
  var metaDataUrl = getInterPlanetaryFileUrl(metaDataResponse.path);

  return metaDataUrl;
};
