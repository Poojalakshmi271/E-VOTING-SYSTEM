const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VoteShield Contract", function () {

  let VoteShield, voteShield;
  let owner, voter1, voter2;

  beforeEach(async function () {
    [owner, voter1, voter2] = await ethers.getSigners();

    VoteShield = await ethers.getContractFactory("VoteShield");
    voteShield = await VoteShield.deploy(10); // 10 minutes voting duration
    await voteShield.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await voteShield.owner()).to.equal(owner.address);
    });
  });

  describe("Candidate Management", function () {
    it("Owner can add candidates", async function () {
      await voteShield.addCandidate("Alice");
      const candidates = await voteShield.getAllCandidates();
      expect(candidates.length).to.equal(1);
      expect(candidates[0].name).to.equal("Alice");
    });
  });

  describe("Voter Registration", function () {
    it("Owner can register voter", async function () {
      await voteShield.registerVoter(voter1.address);
      expect(await voteShield.isRegistered(voter1.address)).to.equal(true);
    });

    it("Non-owner cannot register voter", async function () {
      await expect(
        voteShield.connect(voter1).registerVoter(voter2.address)
      ).to.be.revertedWith("Not owner");
    });
  });

  describe("Voting", function () {

    beforeEach(async function () {
      await voteShield.addCandidate("Alice");
      await voteShield.registerVoter(voter1.address);
    });

    it("Registered voter can vote", async function () {
      await voteShield.connect(voter1).vote(0);
      const candidates = await voteShield.getAllCandidates();
      expect(candidates[0].voteCount).to.equal(1);
    });

    it("Should prevent double voting", async function () {
      await voteShield.connect(voter1).vote(0);

      await expect(
        voteShield.connect(voter1).vote(0)
      ).to.be.revertedWith("Already voted");
    });

    it("Should prevent unregistered voter", async function () {
      await expect(
        voteShield.connect(voter2).vote(0)
      ).to.be.revertedWith("Not registered");
    });
  });

});