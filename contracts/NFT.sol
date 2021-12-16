// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;     // token id after being minted
    address contractAddress;                // address of the marketplace that we want the NFT to interact with e.g. change ownership after creation

    constructor(address marketPlaceAddress) ERC721("MyKToken1", "MKT1") {
        contractAddress = marketPlaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();                      // increment the token id
        uint256 newItemId = _tokenIds.current();    // current value of the token id

        _mint(msg.sender, newItemId);               // mint the token msg.sender as the creator
        _setTokenURI(newItemId, tokenURI);          // set the token uri
        setApprovalForAll(contractAddress, true);   // allows the market place permission to transact the token
        return newItemId;                           // allows us to interact with tehe token in a front end application
    }
}