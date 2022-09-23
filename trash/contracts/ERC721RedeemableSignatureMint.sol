// SPDX-License-Identifier: Apache-2.0
//
// Adam Wong, Chroma, 2022
//
// Credits
// https://eips.ethereum.org/EIPS/eip-5560

pragma solidity ^0.8.4;

import "@thirdweb-dev/contracts/base/ERC721SignatureMint.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC721Enumerable.sol";

contract ERC721RedeemableSignatureMint is ERC721SignatureMint {
    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _primarySaleRecipient
    )
        ERC721SignatureMint(
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps,
            _primarySaleRecipient
        )
    {}

    ////////////////////////////////////////////////////////////////////////////

    bool internal redeemable = true;

    event Redeem(address indexed from, uint256 indexed tokenId);

    function isRedeemable(uint256 tokenId) public view virtual returns (bool) {
        require(
            _exists(tokenId),
            "ERC721RedeemableSignatureMint: Redeem query for nonexistent token"
        );
        return redeemable;
    }

    function redeem(uint256 tokenId) public virtual {
        require(
            _exists(tokenId),
            "ERC721RedeemableSignatureMint: Redeem query for nonexistent token"
        );
        require(
            ownerOf(tokenId) == msg.sender,
            "ERC721RedeemableSignatureMint: You are not the owner of this token"
        );
        redeemable = false;
        emit Redeem(msg.sender, tokenId);
    }
}
