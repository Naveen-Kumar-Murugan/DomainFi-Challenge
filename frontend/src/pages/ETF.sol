// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ETF {
    struct DomainETF {
        uint256 etfId;
        uint256[] domainTokenIds;
        address owner;
        uint256 price;
        bool active;
    }

    uint256 public nextETFId;
    mapping(uint256 => DomainETF) public etfs;

    event ETFCreated(uint256 etfId, uint256[] domainTokenIds, address owner, uint256 price);
    event ETFBought(uint256 etfId, address buyer, uint256 price);
    event ETFRedeemed(uint256 etfId, address redeemer);

    function createETF(uint256[] memory domainTokenIds, uint256 price) external {
        uint256 etfId = nextETFId++;
        etfs[etfId] = DomainETF({
            etfId: etfId,
            domainTokenIds: domainTokenIds,
            owner: msg.sender,
            price: price,
            active: true
        });
        emit ETFCreated(etfId, domainTokenIds, msg.sender, price);
    }

    function buyETF(uint256 etfId) external payable {
        DomainETF storage etf = etfs[etfId];
        require(etf.active, "ETF not active");
        require(msg.value >= etf.price, "Insufficient payment");
        etf.active = false;
        payable(etf.owner).transfer(etf.price);
        etf.owner = msg.sender;
        emit ETFBought(etfId, msg.sender, etf.price);
        // Transfer domain tokens logic here
    }

    function redeemETF(uint256 etfId) external {
        DomainETF storage etf = etfs[etfId];
        require(etf.owner == msg.sender, "Not owner");
        // Redemption logic here
        emit ETFRedeemed(etfId, msg.sender);
    }
}
