// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VyncRewardTreasury is Ownable {
    address public VYNC = 0x71BE9BA58e0271b967a980eD8e59C07fF2108C85;

    IERC20 public vync = IERC20(VYNC);
    address public busdStakingPool;
    address public bnbStakingPool;
    address public vyncStakingPool;

    modifier onlyStakingPool() {
        require(
            busdStakingPool == msg.sender ||
                bnbStakingPool == msg.sender ||
                vyncStakingPool == msg.sender,
            "not authorized"
        );
        _;
    }

    function set_vync(address _vync) external onlyOwner {
        VYNC = _vync;
    }

    function set_stakingpool(
        address _busd,
        address _bnb,
        address _vync
    ) external onlyOwner {
        busdStakingPool = _busd;
        bnbStakingPool = _bnb;
        vyncStakingPool = _vync;
    }

    function treasuryBalance() public view returns (uint256) {
        return vync.balanceOf(address(this));
    }

    function withdrawVync(uint256 _amount, address _to) external onlyOwner {
        vync.transfer(_to, _amount);
    }

    function send(address recipient, uint256 amount) external onlyStakingPool {
        require(
            vync.balanceOf(address(this)) >= amount,
            "reward token not available into contract"
        );
        vync.transfer(recipient, amount);
    }

    function transferAnyERC20Token(
        address _tokenAddress,
        address _to,
        uint256 _amount
    ) public onlyOwner {
        IERC20(_tokenAddress).transfer(_to, _amount);
    }
}
