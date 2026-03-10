const { ethers } = require("hardhat");

async function main() {

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const VoteShield = await ethers.getContractFactory("VoteShield");
  const voteShield = await VoteShield.attach(contractAddress);

  const [owner, voter1] = await ethers.getSigners();

  console.log("Owner:", owner.address);
  console.log("Voter1:", voter1.address);

  // Add candidates (only owner)
  await voteShield.addCandidate("Alice");
  await voteShield.addCandidate("Bob");

  console.log("Candidates added.");

  // Register voter
  await voteShield.registerVoter(voter1.address);
  console.log("Voter registered.");

  // Connect as voter1 and vote
  const voteShieldAsVoter = voteShield.connect(voter1);
  await voteShieldAsVoter.vote(0);

  console.log("Vote cast successfully!");

  // Get results
  const candidates = await voteShield.getAllCandidates();

  console.log("Final Results:");
  console.log(candidates);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});