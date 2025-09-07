import AuctionABI from "../../../backend/artifacts/contracts/Auction.sol/Auction.json";
import ETFABI from "../../../backend/artifacts/contracts/ETF.sol/ETF.json";
import MockABI from "../../../backend/artifacts/contracts/MockOwnershipToken.sol/MockOwnershipToken.json";

export const AUCTION_CONTRACT_ADDRESS = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318'; // Your contract address
export const ETF_CONTRACT_ADDRESS = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788'; // Your contract address
export const MOCK_CONTRACT_ADDRESS = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
// Replace with addresses from deployment log
export const AUCTION_ABI = AuctionABI.abi;
export const ETF_ABI = ETFABI.abi;
export const MOCK_ABI = MockABI.abi; // ❌ Only for local testing
