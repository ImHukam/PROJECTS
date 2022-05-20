const { ethers, upgrades } = require("hardhat");

// TO DO: Place the address of your proxy here!
const proxyAddress = "0x3F855C2D6aa35b99Df67025ad0E7007755808a36";
// const V1_implementation_address = "0x6d2c8e1095858c10e98ca40da9a1f625c8d49b83"
// const V2_implementation_address = "0x3dcc0aec5cfe8092321de11d517c4abd81f86b17"

async function main() {
  const BUSDVYNCSTAKEV2 = await ethers.getContractFactory("BUSDVYNCSTAKEV2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, BUSDVYNCSTAKEV2);

  console.log((await upgraded.dataAddress()).toString());
  console.log((await upgraded.dataAddress()).toString() == "0xa5e489407C8C3B2E345B073Aab3b9E1789370D9d");
  console.log((await upgraded.version()).toString(), "version");
  console.log((await upgraded.newFunctionIntroduced()).toString());
  console.log((await upgraded.newFunctionIntroduced()).toString() == "0xa5e489407C8C3B2E345B073Aab3b9E1789370D9d");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });