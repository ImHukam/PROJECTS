// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

interface SetDataInterface {
    function totalStake() external view returns (uint256);

    function totalUnstake() external view returns (uint256);

    function totalStakeInVync() external view returns (uint256);

    function totalUnstakeInVync() external view returns (uint256);
}

contract VyncPoolInfo is Ownable {
    SetDataInterface data;
    address public VyncPool;

    uint256 s; // total staking
    uint256 u; // total unstaking
    uint256 b; // available Staking
    uint256 s_v; // total staking in vync
    uint256 u_v; // available stakiing in vync
    uint256 pl = 100000; // yearly interst
    bool r_ed = false; // r enable disable
    uint256 r; // extra apr basesd on yearly interst
    uint256 apr = 1 * 1e18; //daily apr in 18 decimal
    uint256 a; // total apr: r+apr
    uint256 compoundRate = 300; // compound rate in seconds
    uint256 up = 50; // unstake percentage
    uint256 maxStakePerTx = 5000 * 1e18; //in term of usd, 18 decimal
    uint256 maxUnstakePerTx = 5000 * 1e18; //in term f usd, 18 decimal
    uint256 totalStakePerUser = 20000 * 1e18; //in term of usd, 18 decimal

    function poolInfo()
        external
        view
        returns (
            uint256 _s,
            uint256 _u,
            uint256 _b,
            uint256 _s_v,
            uint256 _u_v,
            uint256 _pl,
            bool _r_ed,
            uint256 _r,
            uint256 _apr,
            uint256 _a,
            uint256 _compoundRate,
            uint256 _up
        )
    {
        (_s, , ) = set_sub();
        (, _u, ) = set_sub();
        (, , _b) = set_sub();
        _s_v= data.totalStakeInVync();
        _u_v = data.totalUnstakeInVync();
        _pl = pl;
        _r_ed = r_ed;
        _r = set_r();
        _apr = apr;
        _a = set_a();
        _compoundRate = compoundRate;
        _up = up;
    }

    function returnData()
        external
        view
        returns (
            uint256 _a,
            uint256 _compoundRate,
            uint256 _up
        )
    {
        _a = set_a();
        _compoundRate = compoundRate;
        _up = up;
    }

    function returnMaxStakeUnstake()
        external
        view
        returns (
            uint256 _maxStakePerTx,
            uint256 _maxUnstakePerTx,
            uint256 _totalStakePerUser
        )
    {
        _maxStakePerTx = maxStakePerTx;
        _maxUnstakePerTx = maxUnstakePerTx;
        _totalStakePerUser = totalStakePerUser;
    }

    function set_VyncPool(address _VyncPool) public onlyOwner {
        VyncPool = _VyncPool;
        data = SetDataInterface(_VyncPool);
    }

    // set staking,unstaking, available staking
    function set_sub()
        private
        view
        returns (
            uint256 _s,
            uint256 _u,
            uint256 _b
        )
    {
        _s = data.totalStake();
        _u = data.totalUnstake();
        _b = _s - _u;
    }

    //set pl
    function set_pl(uint256 _pl) public onlyOwner {
        pl = _pl;
    }

    //set r_ed
    function set_r_ed(bool _r_ed) public onlyOwner {
        r_ed = _r_ed;
    }

    //set r
    function set_r() private view returns (uint256 _r) {
        uint256 _b = data.totalStake() - data.totalUnstake();
        if (r_ed == true) {
            uint256 _pl = pl;
            _r = _b / _pl;
        }
        if (r_ed == false) {
            _r = 0;
        }
    }

    //set apr
    function set_apr(uint256 _apr) public onlyOwner {
        apr = _apr;
    }

    //set a
    function set_a() private view returns (uint256 _a) {
        uint256 _r = set_r();
        _a = apr + _r;
    }

    //set compound rate
    function setCompoundRate(uint256 _compoundRate) public onlyOwner {
        compoundRate = _compoundRate;
    }

    //set up
    function set_up(uint256 _up) public onlyOwner {
        require(
            _up >= 0 && _up <= 100,
            "invalid percentage, input between 0 to 100"
        );
        up = _up;
    }

    function set_maxStakePerTx(uint256 _amount) public onlyOwner {
        maxStakePerTx = _amount;
    }

    function set_maxUnstakePerTx(uint256 _amount) public onlyOwner {
        maxUnstakePerTx = _amount;
    }

    function set_totalStakePerUser(uint256 _amount) public onlyOwner {
        totalStakePerUser = _amount;
    }
}
