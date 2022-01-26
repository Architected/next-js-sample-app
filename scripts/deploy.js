// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const NFTMarket = await ethers.getContractFactory('NFTMarket');
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  //console.log('Initial NFTMarket deployed to:', nftMarket.address);

  // This solves the bug in Mumbai network where the contract address is not the real one
  let txHash = nftMarket.deployTransaction.hash;
  console.log(`Tx hash: ${txHash}\nWaiting for transaction to be mined...`);
  let txReceipt = await ethers.provider.waitForTransaction(txHash);

  console.log('NFTMarket deployed to address:', txReceipt.contractAddress);

  const NFT = await ethers.getContractFactory('NFT');
  const nft = await NFT.deploy(txReceipt.contractAddress);
  await nft.deployed();
  //console.log('Initial NFT deployed to:', nft.address);

  // This solves the bug in Mumbai network where the contract address is not the real one
  txHash = nft.deployTransaction.hash;
  console.log(`Tx hash: ${txHash}\nWaiting for transaction to be mined...`);
  txReceipt = await ethers.provider.waitForTransaction(txHash);

  console.log('NFT deployed to address:', txReceipt.contractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
