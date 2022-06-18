const { ethers, upgrades } = require("hardhat");

// TO DO: Place the address of your proxy here!
const proxyAddress = "0x63E2Ef487EE78e0391548f57102B0681343eC69A";
// const V1_implementation_address = "0x09D42cFF54f36653C82cc42ED38178526f0542C5"
// const V2_implementation_address = "0xaed5a104602bf9673e85b9fafdc5f0c49b538421"

async function main() {
  const BUSDVYNCSTAKEV2 = await ethers.getContractFactory("BUSDVYNCSTAKEV2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, BUSDVYNCSTAKEV2);

  console.log((await upgraded.dataAddress()).toString());
  console.log(
    (await upgraded.dataAddress()).toString() ==
      "0xbA9fFDe1CE983a5eD91Ba7b2298c812F6C633542"
  );

  console.log(
    (await upgraded.version()).toString(),
    "version by calling variable"
  );
  console.log(
    (await upgraded.getVersion()).toString(),
    "version by calling function"
  );
  await upgraded.setVersion(2);

  console.log(
    (await upgraded.version()).toString(),
    "version by calling variable"
  );
  console.log(
    (await upgraded.getVersion()).toString(),
    "version by calling function"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
