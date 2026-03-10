// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VoteShield {

    event VoteCast(address voter, uint candidateId);

    address public owner;

    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;

    mapping(address => bool) public isRegistered;
    mapping(address => bool) public hasVoted;

    uint public votingStart;
    uint public votingEnd;

    constructor(uint _votingDurationInMinutes) {
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_votingDurationInMinutes * 1 minutes);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate(_name, 0));
    }

    function registerVoter(address _voter) public onlyOwner {
        require(!isRegistered[_voter], "Already registered");
        isRegistered[_voter] = true;
    }

    function vote(uint _candidateId) public {
        require(block.timestamp >= votingStart, "Voting not started");
        require(block.timestamp <= votingEnd, "Voting ended");
        require(isRegistered[msg.sender], "Not registered");
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId < candidates.length, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}