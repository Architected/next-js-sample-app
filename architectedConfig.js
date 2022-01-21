const architectedConfig = {
  appKey: process.env.NEXT_PUBLIC_APP_KEY,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  appEnv: process.env.NEXT_PUBLIC_APP_ENV,
  siteMode: process.env.NEXT_PUBLIC_SITE_MODE,
  siteName: process.env.NEXT_PUBLIC_SITE_NAME,
  timeout: 20000,
  connectType: 'BC',
  clientType: 'SRV',
  challengeMethod: 'SHA256',
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
  nftAddress: process.env.NEXT_PUBLIC_NFT_ADDRESS,
  marketAddress: process.env.NEXT_PUBLIC_MARKET_ADDRESS,
  maxFileSizeMB: 100,
  ipfsFilePath: 'https://ipfs.infura.io/ipfs',
  ipfsAPIEndpoint: 'https://ipfs.infura.io:5001/api/v0',
};

module.exports = { architectedConfig };
