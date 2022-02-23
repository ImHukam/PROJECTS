/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("dotenv").config();
 require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-etherscan");
 const { API_URL, PRIVATE_KEY , API_ETHERSCAN} = process.env;
 module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "ropsten",
   networks: {
     hardhat: {},
     ropsten: {
       url: API_URL,
       accounts: [`0x${PRIVATE_KEY}`],
     },
   },
   etherscan: {
    apiKey: API_ETHERSCAN
  },
 };