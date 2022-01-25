import { ethers } from 'ethers';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import axios from 'axios';
import { architectedConfig } from '../architectedConfig';
import { getProvider, getSigner } from './walletHelper.js';

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

async function purchaseToken(nft) {
  const signer = await getSigner();
  const marketContract = getMarketContract(signer);
  const etherPrice = convertToEther(nft.price);

  console.log('etherPrice' + etherPrice);
  console.log('nft.itemId', nft.itemId);
  console.log('nft.tokenId', nft.tokenId);
  console.log('nftaddress', architectedConfig.nftAddress);
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

const getMarketplaceItems = async () => {
  console.log('starting marketContract.fetchMarketItems');
  const signer = await getSigner();
  const marketContract = getMarketContract(signer);
  const data = await marketContract.fetchMarketItems();

  console.log('starting getTokenContract');
  const provider = await getProvider();
  const tokenContract = getTokenContract(provider);

  console.log('mapping tokens');
  const items = await Promise.all(
    data.map(async (i) => {
      return mapToken(tokenContract, i);
    })
  );

  return items;
};

const getSoldItems = async () => {
  const signer = await getSigner();
  const provider = await getProvider();

  const marketContract = getMarketContract(signer);
  const tokenContract = getTokenContract(provider);
  const data = await marketContract.fetchItemsCreated();
  const soldItems = data.filter((i) => i.sold);
  const items = await Promise.all(
    soldItems.map(async (i) => {
      return mapToken(tokenContract, i);
    })
  );

  return items;
};

const getPurchasedItems = async () => {
  const signer = await getSigner();
  const provider = await getProvider();
  const marketContract = getMarketContract(signer);
  const tokenContract = getTokenContract(provider);
  const data = await marketContract.fetchMyNFTs();

  const items = await Promise.all(
    data.map(async (i) => {
      return mapToken(tokenContract, i);
    })
  );

  return items;
};

const getCreatedItems = async () => {
  const signer = await getSigner();
  const provider = await getProvider();
  const marketContract = getMarketContract(signer);
  const tokenContract = getTokenContract(provider);
  const data = await marketContract.fetchItemsCreated();

  const items = await Promise.all(
    data.map(async (i) => {
      return mapToken(tokenContract, i);
    })
  );

  return items;
};

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
  getMarketplaceItems,
  getSoldItems,
  getPurchasedItems,
  getCreatedItems,
};
