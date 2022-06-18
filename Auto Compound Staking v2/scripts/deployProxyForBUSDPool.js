const { upgrades, ethers } = require("hardhat");

async function main() {
  const BUSDPixelSafePool = await ethers.getContractFactory("BUSDVYNCSTAKEV1");
  const bUSDPixelSafePool = await upgrades.deployProxy(BUSDPixelSafePool);

  await bUSDPixelSafePool.deployed();

  console.log("deployed to:", bUSDPixelSafePool.address);

  console.log((await bUSDPixelSafePool.dataAddress()).toString());
  console.log(
    (await bUSDPixelSafePool.dataAddress()).toString() ==
      "0xbA9fFDe1CE983a5eD91Ba7b2298c812F6C633542"
  );

  //   console.log(
  //     (await bUSDPixelSafePool.version()).toString(),
  //     "version by calling variable"
  //   );
  //   console.log(
  //     (await bUSDPixelSafePool.getVersion()).toString(),
  //     "version by calling function"
  //   );

  //   await bUSDPixelSafePool.setVersion(2);

  //   console.log(
  //     (await bUSDPixelSafePool.version()).toString(),
  //     "version by calling variable"
  //   );
  //   console.log(
  //     (await bUSDPixelSafePool.getVersion()).toString(),
  //     "version by calling function"
  //   );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
