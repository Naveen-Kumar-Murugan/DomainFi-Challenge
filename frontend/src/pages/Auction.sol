// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Auction {
    struct DomainAuction {
        uint256 auctionId;
        string domainName;
        uint256 tokenId;
        address owner;
        uint256 currentBid;
        address highestBidder;
        uint256 bidCount;
        uint256 endTime;
        string category;
        bool finalized;
    }

    uint256 public nextAuctionId;
    mapping(uint256 => DomainAuction) public auctions;

    event AuctionCreated(uint256 auctionId, string domainName, uint256 tokenId, address owner, uint256 endTime, string category);
    event BidPlaced(uint256 auctionId, address bidder, uint256 amount);
    event AuctionFinalized(uint256 auctionId, address winner, uint256 amount);

    function createAuction(
        string memory domainName,
        uint256 tokenId,
        uint256 duration,
        string memory category
    ) external {
        uint256 auctionId = nextAuctionId++;
        auctions[auctionId] = DomainAuction({
            auctionId: auctionId,
            domainName: domainName,
            tokenId: tokenId,
            owner: msg.sender,
            currentBid: 0,
            highestBidder: address(0),
            bidCount: 0,
            endTime: block.timestamp + duration,
            category: category,
            finalized: false
        });
        emit AuctionCreated(auctionId, domainName, tokenId, msg.sender, block.timestamp + duration, category);
    }

    function bid(uint256 auctionId) external payable {
        DomainAuction storage auction = auctions[auctionId];
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.value > auction.currentBid, "Bid too low");
        if (auction.currentBid > 0) {
            payable(auction.highestBidder).transfer(auction.currentBid);
        }
        auction.currentBid = msg.value;
        auction.highestBidder = msg.sender;
        auction.bidCount += 1;
        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    function finalizeAuction(uint256 auctionId) external {
        DomainAuction storage auction = auctions[auctionId];
        require(block.timestamp >= auction.endTime, "Auction not ended");
        require(!auction.finalized, "Already finalized");
        auction.finalized = true;
        if (auction.currentBid > 0) {
            payable(auction.owner).transfer(auction.currentBid);
        }
        // Transfer domain token logic here (ERC721 transfer)
        emit AuctionFinalized(auctionId, auction.highestBidder, auction.currentBid);
    }
}
