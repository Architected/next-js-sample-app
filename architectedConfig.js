const architectedConfig = {
  appKey: process.env.NEXT_PUBLIC_APP_KEY,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  appEnv: 'dev',
  siteName: 'Merkki',
  siteMode: 'app',
  timeout: 20000,
  connectType: 'BC',
  clientType: 'SRV',
  challengeMethod: 'SHA256',
};

module.exports = { architectedConfig };
