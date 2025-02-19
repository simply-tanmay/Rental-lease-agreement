require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",  // ✅ Update this to match your contract version
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_KEY ? `0x${process.env.PRIVATE_KEY}` : ""],
    },
  },
};
