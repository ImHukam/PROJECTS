const { ethers, upgrades } = require("hardhat");

// TO DO: Place the address of your proxy here!
const proxyAddress = "0xB392B57a45e01F60D3aB4E9109D9d23cAaF5805b";
// const V1_implementation_address = "0xb62A781F44c9a3342E975c4eD25c449A0C3BEfc7"
// const V2_implementation_address = "0x8535e6b68931a872922b16e3b3a71784d5be502d"
// const V3_implementation_address = "0x3e8a529ba56638198a6408e110035c017fc1bc3e"
// const V4_implementation_address = "0x7a3782e3479d52a5371a11fa04b06fcfdd9a35de"

async function main() {
  const BUSDVYNCSTAKEV4 = await ethers.getContractFactory("BUSDVYNCSTAKEV4");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, BUSDVYNCSTAKEV4);

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