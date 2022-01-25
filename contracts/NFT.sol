// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;         
    address _marketPlaceAddress;                    

    constructor(address marketPlaceAddress) ERC721("MyKToken2", "MKT2") {
        _marketPlaceAddress = marketPlaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();                          
        uint256 tokenId = _tokenIds.current();        

        _mint(msg.sender, tokenId);                   
        _setTokenURI(tokenId, tokenURI);            

        /* 
            Sets the approval of _marketPlaceAddress 
            _marketPlaceAddress is allowed to transfer all tokens of the sender on their behalf  
        */
        setApprovalForAll(_marketPlaceAddress, true); 
        
        return tokenId;
    }
}