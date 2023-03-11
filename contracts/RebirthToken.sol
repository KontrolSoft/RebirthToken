// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./token/ERC20/ERC20.sol";
import "./token/ERC20/extensions/ERC20Burnable.sol";
import "./access/Ownable.sol";

/// @custom:security-contact security@kontrolsoft.com
contract RebirthToken is ERC20, ERC20Burnable, Ownable {
    /**
     * Emitted on BNB withdrawal
     *
     * @param receiver address - Receiver of BNB
     * @param amount uint256 - BNB amount
     */
    event EmergencyWithdraw(address receiver, uint256 amount);

    /**
     * Emitted on token withdrawal
     *
     * @param receiver address - Receiver of token
     * @param token address - Token address
     * @param amount uint256 - token amount
     */
    event EmergencyWithdrawToken(address receiver, IERC20 token, uint256 amount);

    /**
     * Definitions for Token Allocation
     *
     * Each allocation has its vesting contract.
     * Here, the maximum amounts that can be sent to vesting contracts are defined. 
     * All defined amounts are transferred by the distributeToken function. 
     * In the pre-sale process, a partial transfer will be made starting from the Private II allocation to be able to sell from more than one channel.
     * All allocations outside the pre-sale process and exchange will be transferred to the relevant contract at once.
     */
    uint256 private seedTotal       = 53000000e18;  // allocationId : 1
    uint256 private privateITotal   = 30000000e18;  // allocationId : 2
    uint256 private privateIITotal  = 36000000e18;  // allocationId : 3
    uint256 private privateIIITotal = 36000000e18;  // allocationId : 4
    uint256 private rewardsTotal    = 47500000e18;  // allocationId : 5
    uint256 private advisorsTotal   = 52500000e18;  // allocationId : 6
    uint256 private communityTotal  = 60000000e18;  // allocationId : 7
    uint256 private exchangesTotal  = 80000000e18;  // allocationId : 8
    uint256 private teamTotal       = 140000000e18; // allocationId : 9
    uint256 private reservesTotal   = 250000000e18; // allocationId : 10
    uint256 private investorsTotal  = 215000000e18; // allocationId : 11
    uint256 private tgeTotal        = 30000000e18;  // allocationId : 12

    /**
     * @dev function that can allocate defined allocations at once or in parts.
     *
     * @param allocationId uint256 - Allocations are identified by an ID number. ID numbers are specified as comments to the right of the variables.
     * @param contractAddress address - It is the address of the target contract where the distribution will be made.
     * @param amountRepa uint256 - The amount to be sent to the target contract. When the amount is submitted as `0`, it equates to the maximum supply.
     */
    function distributeToken(uint256 allocationId, address contractAddress, uint256 amountRepa) external onlyOwner{
        uint256 _getSupply = getDistributableAmount(allocationId);

        if(amountRepa==0){amountRepa=_getSupply;}

        require(_getSupply>=amountRepa,"The amount demanded cannot be higher than the distributable supply.");

        _transfer(msg.sender, contractAddress, amountRepa);

        setDistributableAmount(allocationId,(_getSupply - amountRepa));
    }

    /**
     * @dev function that defines the amount of supply remaining after distrubuted allocations.
     *
     * @param allocationId uint256 - Allocations are identified by an ID number. ID numbers are specified as comments to the right of the variables.
     * @param newSupply uint256 - The amount remaining after distrubuted allocations.
     */
    function setDistributableAmount(uint256 allocationId,uint256 newSupply) private onlyOwner{
        require(allocationId>0 && allocationId<=12,"_allocationId must be between 1 and 12.");
        if(allocationId==1){seedTotal=newSupply;}
        else if(allocationId==2){privateITotal=newSupply;}
        else if(allocationId==3){privateIITotal=newSupply;}
        else if(allocationId==4){privateIIITotal=newSupply;}
        else if(allocationId==5){rewardsTotal=newSupply;}
        else if(allocationId==6){advisorsTotal=newSupply;}
        else if(allocationId==7){communityTotal=newSupply;}
        else if(allocationId==8){exchangesTotal=newSupply;}
        else if(allocationId==9){teamTotal=newSupply;}
        else if(allocationId==10){reservesTotal=newSupply;}
        else if(allocationId==11){investorsTotal=newSupply;}
        else if(allocationId==12){tgeTotal=newSupply;}
    }

    /**
     * @dev function that specifies how much supply the allocation has left.
     *
     * @param allocationId uint256 - Allocations are identified by an ID number. ID numbers are specified as comments to the right of the variables.
     */
    function getDistributableAmount(uint256 allocationId) public view returns(uint256){
        require(allocationId>0 && allocationId<=12,"_allocationId must be between 1 and 12.");
        uint256 _getSupply;
        if(allocationId==1){_getSupply=seedTotal;}
        else if(allocationId==2){_getSupply=privateITotal;}
        else if(allocationId==3){_getSupply=privateIITotal;}
        else if(allocationId==4){_getSupply=privateIIITotal;}
        else if(allocationId==5){_getSupply=rewardsTotal;}
        else if(allocationId==6){_getSupply=advisorsTotal;}
        else if(allocationId==7){_getSupply=communityTotal;}
        else if(allocationId==8){_getSupply=exchangesTotal;}
        else if(allocationId==9){_getSupply=teamTotal;}
        else if(allocationId==10){_getSupply=reservesTotal;}
        else if(allocationId==11){_getSupply=investorsTotal;}
        else if(allocationId==12){_getSupply=tgeTotal;}
        return _getSupply;
    }

    /// @dev Owner can transfer out any accidentally sent ERC20 tokens
	function transferERC20Token(IERC20 tokenAddress, address receiverAddress, uint256 tokenAmount) external onlyOwner returns (bool success){
		require(tokenAddress.balanceOf(address(this)) >= tokenAmount,"The balance of the token to be transferred is insufficient.");
		require(tokenAddress.transfer(receiverAddress, tokenAmount));
        emit EmergencyWithdrawToken(receiverAddress, tokenAddress, tokenAmount);
		return true;
	}
    
    /// @dev Owner can transfer out any accidentally sent BNB
    function transferBNB(uint256 amount, address receiverAddress) external onlyOwner {
        require(address(this).balance>=amount,"The balance of the BNB to be transferred is insufficient.");
        payable(receiverAddress).transfer(amount);
        emit EmergencyWithdraw(receiverAddress, amount);
    }

    receive() external payable {}

    constructor() ERC20("RebirthToken", "REPA") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}
