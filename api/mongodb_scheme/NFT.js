const mongoose = require('mongoose');

let counter = 0;
const NFTSchema = new mongoose.Schema({
  nft_id: {
    type: Number,
    require: true,
    default: () => counter++,
  },
  stage: {
    type: String,
    require: true,
    maxLength: 100,
  },
  last_step: {
    type: String,
    require: true,
    maxLength: 100,
  },
  update_authority: {
    type: String,
    require: true,
    maxLength: 100,
  },
  collection: {
    type: String,
    require: true,
    maxLength: 100,
  },
  collection_address: {
    type: String,
    require: true,
    maxLength: 100,
  },
  creator_address:{
    type: String,
    require: true,
    maxLength: 100,
  },
  sol_wallet_address:{
    type: String,
    require: true,
    maxLength: 100,
  },
  created_date: {
    type: Date,
    require: true,
  }
});

const NFT = mongoose.model('nfts', NFTSchema);

module.exports = NFT;
