// SPDX-License-Identifier: MIT
// Author : spikeyrock - nftit
// Contact : nftit@protonmail.com
// Discription : Payment system to recieve funds for Warlands.io "Chests"


pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.0;
contract WarlandsChest is Ownable  {
    string public name = "Warlands Presale Chests";
    uint256 public SilverCost = 0.25 ether;
    uint256 public totalSilverMinted;
    uint256 public GoldCost = 0.65 ether;
    uint256 public totalGoldMinted;
    uint256 public DiamondCost = 1.65 ether;
    uint256 public totalDiamondMinted;

    
    event boughtChest(address indexed _from, uint256 cost); 
    modifier shouldPay(uint256 _cost) {
        require(msg.value >= _cost, "The chests cost more!");
        _;
    }
    function BuySilverChest() payable public shouldPay(SilverCost) {
        emit boughtChest(msg.sender, SilverCost);
        totalSilverMinted++;
    }
    function BuyGoldChest() payable public shouldPay(GoldCost) {
        emit boughtChest(msg.sender, GoldCost);
        totalGoldMinted++;
    }
    function BuyDiamondChest() payable public shouldPay(DiamondCost) {
        emit boughtChest(msg.sender, DiamondCost);
        totalDiamondMinted++;
    }
    function getFunds() public view returns(uint256) {
        return address(this).balance;
    }
   
    function setCostSilver(uint256 _newCost) public onlyOwner {
    SilverCost = _newCost;
    }

    function setCostGold(uint256 _newCost) public onlyOwner {
    GoldCost = _newCost;
    }

    function setCostDiamond(uint256 _newCost) public onlyOwner {
    DiamondCost = _newCost;
    }
  
     function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }
}

