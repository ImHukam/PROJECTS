// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Link is ERC20 {
    constructor() ERC20("Chainlink", "LINK") public {
        _mint(msg.sender, 1000*10**decimals());
    }
}
