const hre = require("hardhat");

async function main() {

  const VoteShield = await hre.ethers.getContractFactory("VoteShield");

  // voting duration = 100000 minutes (~69 days)
  const voteShield = await VoteShield.deploy(100000);

  await voteShield.waitForDeployment();

  const address = await voteShield.getAddress();

  console.log("VoteShield deployed to:", address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});