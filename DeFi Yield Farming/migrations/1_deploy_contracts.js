const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (deployer) {
  //deploy Dapp token
  
  await deployer.deploy(DappToken);
  const dappToken= await DappToken.deployed();
  console.log(dappToken.address);

  //deploy mock dai token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //deploy tokenfarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //transfer all dapp token to yield farm contract
  await dappToken.transfer(tokenFarm.address,'1000000000000000000000000');

  //transfer 100 mock dai token to investor 
  await daiToken.transfer("0xDdc3C83e29f0E784D772637fB8B7e4Ae59cF921d",'100000000000000000000');
 
};
