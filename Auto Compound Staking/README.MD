Project Overview:</br>
deployed a smart contract in evm( bsc chain) for compound interest staking..</br>

Tools: hardhat, ethers js,openzeppelin, </br>
Language: solidity and java script</br>

User have to stake busd or bnb or their project’s native token(a bep20 xyz token), in behind those staked amount will be added into pancakeswap liquidity pair.. in return user will get rewarded in xyz token..reward will be compounded in every 24 hour.. </br>

Process:</br>
1. User stake busd, then those busd will be swap into 2 parts, 50% busd, 50% into xyz token .. these 50-50% amount will be added into pancakeswap liquidity pair using pancakeswap router function .. contract will got lp token as a proof..</br>

2. after staking user can claim reward on daily bases, it will be auto compound every 24 hour.. </br>

3. If user want to unstake, then contract will use those lp token which got as proof during stake.. liquidity will be removed from pancakeswap using router function , contract will get token into 2 parts, busd and xyz token.. those xyz token will be swap into busd using router function and sents to users.. </br>

User Benefits: user will get reward by staking busd or bnb.. </br>

Project benefits: </br>
it will help to increase dex liquidity.. user will stake busd, but at the backend, those busd will be added into dex liquidity..</br>
Also it was a roadmap product of their porject, they delivered to community..
