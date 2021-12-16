require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

<<<<<<< HEAD
const projectId = process.env.INFURA_PROJECTID;
const accountPrivateKey = process.env.CONTRACT_OWNER_PRIVATE_KEY;
=======
/*
const projectId = process.env.INFURA_PROJECTID;
const accountPrivateKey = process.env.CONTRACT_OWNER_PRIVATE_KEY;
*/
>>>>>>> 5f316efdf09861a468c81165aab98acbec0fdb4b

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/' + projectId,
      accounts: [accountPrivateKey],
<<<<<<< HEAD
    },
=======
    }*/
>>>>>>> 5f316efdf09861a468c81165aab98acbec0fdb4b
  },
  solidity: '0.8.4',
};
