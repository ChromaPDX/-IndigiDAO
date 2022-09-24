// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {ERC721A} from "@thirdweb-dev/contracts/eip/ERC721A.sol";
import "@thirdweb-dev/contracts/drop/DropERC721.sol";

contract indigidaoDropERC721 is DropERC721 {
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

    struct Redeemey {
        uint256 id;
        string tokenURI;
        bool redeemed;
    }

    struct NonRedeemey {
        uint256 id;
        string tokenURI;
    }

    function getMineWithRedeemies() public view returns (Redeemey[] memory) {
        address _owner = msg.sender;
        uint256 lngth = ERC721Upgradeable.balanceOf(_owner);
        Redeemey[] memory _metadatasOfOwners = new Redeemey[](lngth);

        uint256 i;
        for (i = 0; i < lngth; i++) {
            uint256 tUid = tokenOfOwnerByIndex(_owner, i);

            _metadatasOfOwners[i] = Redeemey({
                id: tUid,
                redeemed: redeemable,
                tokenURI: DropERC721.tokenURI(tUid)
            });
        }

        return (_metadatasOfOwners);
    }

    function getOthersWithoutRedeemies()
        public
        view
        returns (NonRedeemey[] memory)
    {
        address _owner = address(this);
        uint256 lngth = ERC721Upgradeable.balanceOf(_owner);
        NonRedeemey[] memory _metadatasOfOwners = new NonRedeemey[](lngth);

        uint256 i;
        for (i = 0; i < lngth; i++) {
            uint256 tUid = tokenOfOwnerByIndex(_owner, i);

            _metadatasOfOwners[i] = NonRedeemey({
                id: tUid,
                tokenURI: DropERC721.tokenURI(tUid)
            });
        }

        return (_metadatasOfOwners);
    }
}
