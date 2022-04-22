const hre = require("hardhat");

async function main() {
  
  const VYNCTOKEN = await hre.ethers.getContractFactory("TOKEN");
  const vynctoken = await VYNCTOKEN.deploy();

  await vynctoken.deployed();

  console.log("Token deployed to:", vynctoken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
