// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.05 ether; // <-- COST OF EACH TOKEN
    uint256 public maxSupply = 10000; // <-- MAXIMUM NUMBER OF TOKENS
    uint256 public maxMintAmount = 20; // <-- MAXIMUM NUMBER OF TOKENS TO MINT AT A TIME
    bool public paused = false;
    bool public revealed = false;
    string public notRevealedUri;

    constructor(
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        uint256 _maxSupply
    ) ERC721("NFT_NAME", "NFT_SYMBOL") {
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
        if (_maxSupply > 0) maxSupply = _maxSupply;
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // public
    function mint(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(!paused, "mint is paused");
        require(_mintAmount > 0, "mint amount must be greater than 0");
        require(
            _mintAmount <= maxMintAmount,
            "mint amount must be less than or equal to max mint amount"
        );
        require(supply + _mintAmount <= maxSupply, "not enough supply");

        require(msg.value >= cost * _mintAmount, "not enough ether sent");

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (!revealed) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    //only owner
    function reveal() public onlyOwner {
        revealed = true;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setMaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw() public payable onlyOwner {
        // This will payout the owner 100% of the contract balance.
        // Do not remove this otherwise you will not be able to withdraw the funds.
        // =============================================================================
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Failed to send ether to the owner");
        // =============================================================================
    }
}
