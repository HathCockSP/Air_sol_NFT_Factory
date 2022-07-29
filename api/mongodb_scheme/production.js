const mongoose = require('mongoose');

const ProductionSchema = new mongoose.Schema({
  production_id: {
    type: Number,
    require: true,
  },
  username: {
    type: String,
    require: true,
    maxLength: 100,
  },
  wallet_address: {
    type: String,
    require: true,
    maxLength: 100,
  },
  production_name: {
    type: String,
    require: true,
    maxLength: 100,
  },
  batch_name: {
    type: String,
    require: true,
    maxLength: 100,
  },
  selected_ids: {
    type: [{id:String, config_url:String, meta_url: String, image:String}],
    require: true,
  },
  updated_uri: {
    type: String,
    require: true,
    maxLength: 100,
  },
  collection_address:{
    type: String,
    require: true,
    maxLength: 100,
  },
  completed: {        
    type: Boolean,
    require: true,
  },
  created_date: { //same as last_action_date
    type: Date,
    require: true,
  }
});

const Production = mongoose.model('productions', ProductionSchema);

module.exports = Production;
