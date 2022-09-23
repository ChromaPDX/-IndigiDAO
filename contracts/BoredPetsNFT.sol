// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BoredPetsNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address marketplaceContract;
    event NFTMinted(uint256);

    constructor(address _marketplaceContract) ERC721("chainwriter", "chnwrtr") {
        marketplaceContract = _marketplaceContract;
    }

    function mint() public {
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        // _setTokenURI(newTokenId, someText);
        setApprovalForAll(marketplaceContract, true);
        emit NFTMinted(newTokenId);
        _tokenIds.increment();
    }
}
