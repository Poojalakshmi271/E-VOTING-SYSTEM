const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Backend server running on port 5000");

  // Demo logs (namesake backend processing)
  console.log("----- Vote Request Received -----");
  console.log("Wallet: 0x2bd50E44B4F0789F1A5e921FA70E59B0E46A6474");
  console.log("Candidate: 1");
  console.log("Submitting vote to blockchain...");
  console.log("Transaction Successful");
  console.log("Transaction Hash: 0x8A3F12B6E9C4F5D8A7B1E2F3");
});