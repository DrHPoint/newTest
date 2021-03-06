const hre = require("hardhat");

async function main() {


  const Deposit = await hre.ethers.getContractFactory("Deposit");
  const deposit = await Deposit.deploy();

  await deposit.deployed();

  console.log("Deposit deployed to:", deposit.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });