const { ethers } = require("hardhat");

async function main() {
  try {
    // Auction contract
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy();
    await auction.waitForDeployment();
    console.log("Auction deployed:", await auction.getAddress());

    // ETF contract
    const ETF = await ethers.getContractFactory("ETF");
    const etf = await ETF.deploy();
    await etf.waitForDeployment();
    console.log("ETF deployed:", await etf.getAddress());
  } catch (error) {
    console.error("Deployment error details:", error);
    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
