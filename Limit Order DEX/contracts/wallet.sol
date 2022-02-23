// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is Ownable{

    struct Token{
        bytes32 ticker;
        address tokenAddress;
    }

    mapping(bytes32=>Token) tokens;
    mapping(address=>mapping(bytes32=>uint256)) balances;
    bytes32[] tokenList;

    modifier tokenExist(bytes32 ticker) {
        require(tokens[ticker].tokenAddress != address(0), "token does not exist");
        _;
    }
    function addToken(bytes32 ticker, address tokenAddress) onlyOwner external{
        tokens[ticker] = Token(ticker,tokenAddress);
        tokenList.push(ticker);
    }

    function deposit(bytes32 ticker, uint256 amount) tokenExist(ticker) external{
        IERC20(tokens[ticker].tokenAddress).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender][ticker] += amount;
    }

    function withdraw(bytes32 ticker, uint256 amount) tokenExist(ticker) external {

        IERC20(tokens[ticker].tokenAddress).transfer(msg.sender, amount);
        balances[msg.sender][ticker] -= amount;
    }
}
