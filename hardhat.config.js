require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const projectId = process.env.INFURA_PROJECTID;
const accountPrivateKey = process.env.CONTRACT_OWNER_PRIVATE_KEY;

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/' + projectId,
      accounts: [
        '133ac2d2786c07be2a85ccfc575cc7d051e7c87faf6033aa400c35d5d5896264',
      ],
    },
  },
  solidity: '0.8.4',
};
