
const hre = require("hardhat");
const {ethers} = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("rpc node");

const busd_abi=[
    "function approve(address,uint256) external returns (bool)",
    "function transfer(address,uint256) external returns(bool)",
  ];

const pool_abi=[
  "function set_VyncBusd(address) external",
]

const busd_address= "0xB57ab40Db50284f9F9e7244289eD57537262e147";
const pool_address= "0x994Bde430BA69b96Ce14824c7d848c996A09Ba67";
const busdContract= new ethers.Contract(busd_address,busd_abi,provider);
const poolContract= new ethers.Contract(pool_address,pool_abi,provider);
const max= ethers.utils.parseEther("11579208923731619542357098500868790785326");

const privateKey = "private key"; // only for testing, use env for mainnet development
const wallet = new ethers.Wallet(privateKey, provider);
const busdContractWithWallet= busdContract.connect(wallet);
const pool= poolContract.connect(wallet);


async function main() {
  
  const BUSDVYNCSTAKE = await hre.ethers.getContractFactory("BUSDVYNCSTAKE");
  const bUSDVYNCSTAKE = await BUSDVYNCSTAKE.deploy();

  await bUSDVYNCSTAKE.deployed();

  console.log("BUSDVYNCSTAKE deployed to:", bUSDVYNCSTAKE.address);

  console.log("approving busd and busdStake Contract");
  await busdContractWithWallet.approve(bUSDVYNCSTAKE.address,max);

  await bUSDVYNCSTAKE.approve();
  console.log("approved both");

  await pool.set_VyncBusd(bUSDVYNCSTAKE.address);
  console.log("pool info updated");

  await bUSDVYNCSTAKE.set_data("0x994Bde430BA69b96Ce14824c7d848c996A09Ba67");
  console.log("set busd info pool to stake pool")
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
