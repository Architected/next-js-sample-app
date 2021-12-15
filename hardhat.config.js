require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

/*
const projectId = process.env.INFURA_PROJECTID;
const accountPrivateKey = process.env.CONTRACT_OWNER_PRIVATE_KEY;
*/

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    /*mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/' + projectId,
      accounts: [accountPrivateKey],
    }*/
  },
  solidity: '0.8.4',
};
