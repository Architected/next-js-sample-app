import { ethers } from 'ethers';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import axios from 'axios';
import { architectedConfig } from '../architectedConfig';

function getTokenContract(signerOrProvider) {
  const tokenContract = new ethers.Contract(
    architectedConfig.nftAddress,
    NFT.abi,
    signerOrProvider
  );
  console.log('loaded tokenContract: ' + architectedConfig.nftAddress);
  return tokenContract;
}

function getMarketContract(signerOrProvider) {
  const marketContract = new ethers.Contract(
    architectedConfig.marketAddress,
    Market.abi,
    signerOrProvider
  );
  console.log('loaded marketContract: ' + architectedConfig.marketAddress);
  return marketContract;
}

async function createNFT(url, signer) {
  let nft_contract = new ethers.Contract(
    architectedConfig.nftAddress,
    NFT.abi,
    signer
  );
  let transaction = await nft_contract.createToken(url);
  let nft_transaction = await transaction.wait();

  let event = nft_transaction.events[0];
  console.log('createNFT event object: ' + JSON.stringify(event));
  let value = event.args[2];
  let tokenId = value.toNumber();
  console.log('createNFT tokenId: ' + tokenId);
  return tokenId;
}

function convertToEther(inputPrice) {
  return ethers.utils.parseUnits(inputPrice, 'ether');
}
function convertFromEther(etherPrice) {
  return ethers.utils.formatUnits(etherPrice.toString(), 'ether');
}

async function addNFTToMarket(signer, tokenId, etherPrice) {
  let market_contract = new ethers.Contract(
    architectedConfig.marketAddress,
    Market.abi,
    signer
  );

  let listingPrice = await market_contract.getListingPrice();
  listingPrice = listingPrice.toString();

  console.log('etherPrice:' + etherPrice);
  console.log('listingPrice:' + listingPrice);

  let market_transaction = await market_contract.createMarketItem(
    architectedConfig.nftAddress,
    tokenId,
    etherPrice,
    {
      value: listingPrice,
    }
  );
  console.log('market_contract.createMarketItem called');

  await market_transaction.wait();

  console.log('market_contract.wait complete');
}

async function purchaseToken(provider, nft) {
  const marketContract = getMarketContract(provider);
  console.log('nft.price' + nft.price);
  const etherPrice = convertToEther(nft.price);
  console.log('etherPrice' + etherPrice);
  console.log('nft.itemId', nft.itemId);
  console.log('nft.tokenId', nft.tokenId);
  console.log('nftaddress', nftaddress);
  const transaction = await marketContract.createMarketSale(
    architectedConfig.nftAddress,
    nft.itemId,
    {
      value: etherPrice,
    }
  );

  await transaction.wait();
}

async function getTokenMetaData(tokenContract, tokenId) {
  const tokenUri = await tokenContract.tokenURI(tokenId);
  return await axios.get(tokenUri);
}

function validURL(str) {
  const reg = /((https):\/\/)/;

  return reg.test(str);
}

async function mapToken(tokenContract, token) {
  const meta = await getTokenMetaData(tokenContract, token.tokenId);

  let price = convertFromEther(token.price);
  let imageUrl = validURL(meta.data.image) ? meta.data.image : null;
  let assetUrl = validURL(meta.data.asset) ? meta.data.image : null;
  // console.log();
  // console.log('image url:' + imageUrl);
  // console.log('image seller:' + token.seller);
  // console.log('image owner:' + token.owner);
  // console.log('itemId:' + token.itemId);
  //console.log('tokenId:' + token.tokenId);
  let item = {
    price,
    itemId: token.itemId.toNumber(),
    tokenId: token.tokenId.toNumber(),
    seller: token.seller,
    owner: token.owner,
    sold: token.sold,
    image: imageUrl,
    asset: assetUrl,
    name: meta.data.name,
    description: meta.data.description,
  };
  return item;
}

module.exports = {
  createNFT,
  convertToEther,
  convertFromEther,
  addNFTToMarket,
  getTokenContract,
  getMarketContract,
  purchaseToken,
  getTokenMetaData,
  mapToken,
};
