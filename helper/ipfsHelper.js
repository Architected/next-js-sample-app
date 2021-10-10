import { create as ipfsHttpClient } from 'ipfs-http-client';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

async function uploadInterPlanetaryFile(file) {
  try {
    const fileResponse = await client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });

    console.log('added: ' + JSON.stringify(fileResponse));

    return fileResponse;
  } catch (error) {
    console.log('Error uploading file: ', error);
  }
}

function getInterPlanetaryFileUrl(path) {
  return `https://ipfs.infura.io/ipfs/${path}`;
}

async function createMetaData(file) {
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
}

module.exports = {
  uploadInterPlanetaryFile,
  getInterPlanetaryFileUrl,
  createMetaData,
};
