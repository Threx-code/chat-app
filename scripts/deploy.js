const hre = require("hardhat");

async function main() {
    const ChatApp = await hre.ethers.getContractFactory("ChatApp");
    const chatApp = await ChatApp.deploy();

    //console.log(chatApp);
    console.log(chatApp);

    console.log(`Contract Address: deployed to ${chatApp.target} on network: ${hre.network.name}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});