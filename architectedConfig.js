const architectedConfig = {
  appKey: process.env.NEXT_PUBLIC_APP_KEY,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  appEnv: process.env.NEXT_PUBLIC_APP_ENV,
  siteName: 'Merkki',
  siteMode: process.env.NEXT_PUBLIC_SITE_MODE,
  timeout: 20000,
  connectType: 'BC',
  clientType: 'SRV',
  challengeMethod: 'SHA256',
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
  chainUrl: process.env.NEXT_PUBLIC_CHAIN_URL,
  nftAddress: process.env.NEXT_PUBLIC_NFT_ADDRESS,
  marketAddress: process.env.NEXT_PUBLIC_MARKET_ADDRESS,
};

module.exports = { architectedConfig };
