// const hre = require("hardhat");
const {upgrades, ethers} = require("hardhat")
// const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
  "https://speedy-nodes-nyc.moralis.io/643aeed93950729354119385/bsc/testnet"
);

const busd_abi = [
  "function approve(address,uint256) external returns (bool)",
  "function transfer(address,uint256) external returns(bool)",
];

const pool_abi = ["function set_VyncBusd(address) external"];

const treasury_abi = [
  "function set_stakingpool(address,address,address) external",
];

const busd_address = "0xB57ab40Db50284f9F9e7244289eD57537262e147";
const pool_address = "0xa5e489407C8C3B2E345B073Aab3b9E1789370D9d";
const treasury_address = "0xA4FE6E8150770132c32e4204C2C1Ff59783eDfA0";
const busdContract = new ethers.Contract(busd_address, busd_abi, provider);
const poolContract = new ethers.Contract(pool_address, pool_abi, provider);
const treasuryContract = new ethers.Contract(treasury_address, treasury_abi);
const max = ethers.utils.parseEther(
  "11579208923731619542357098500868790785326"
);

const privateKey = process.env.PRIVATE_KEY;

console.log(privateKey, process.env.mnemonic)


const wallet = new ethers.Wallet(privateKey, provider);
const busdContractWithWallet = busdContract.connect(wallet);
const pool = poolContract.connect(wallet);
const treasury = treasuryContract.connect(wallet);

async function main() {
  //   const BUSDVYNCSTAKE = await hre.ethers.getContractFactory("BUSDVYNCSTAKE");
  //   const bUSDVYNCSTAKE = await BUSDVYNCSTAKE.deploy();
  //   await bUSDVYNCSTAKE.deployed();

  const BUSDVYNCSTAKE = await ethers.getContractFactory("BUSDVYNCSTAKE");
  const bUSDVYNCSTAKE = await upgrades.deployProxy(BUSDVYNCSTAKE);
  await bUSDVYNCSTAKE.deployed();

  console.log("BUSDVYNCSTAKE deployed to:", bUSDVYNCSTAKE.address);

  console.log("approving busd and busdStake Contract");
  await busdContractWithWallet.approve(bUSDVYNCSTAKE.address, max);

  await bUSDVYNCSTAKE.approve();
  console.log("approved both");

  await pool.set_VyncBusd(bUSDVYNCSTAKE.address);
  console.log("pool info updated");

  const zero = "0x0000000000000000000000000000000000000000";
  await treasury.set_stakingpool(bUSDVYNCSTAKE.address, zero, zero);
  console.log("treasury pool update");

  await bUSDVYNCSTAKE.set_data("0xa5e489407C8C3B2E345B073Aab3b9E1789370D9d");
  console.log("set busd info pool to stake pool");

  // await bUSDVYNCSTAKE.stake(ethers.utils.parseEther('10'));
  // console.log("amount staked");
  //await bUSDVYNCSTAKE.stake(ethers.utils.parseEther('10'));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
