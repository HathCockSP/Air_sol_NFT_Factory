const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
  production_id: {
    type: Number,
    require: true,
  },
  event_step: {
    type: String,
    require: true,
    maxLength: 100,
  },
  description: {
    type: String,
    require: true,
  },
  event_date: {
    type: String,
    require: true,
  }
});

const Error = mongoose.model('error_logs', ErrorLogSchema);

module.exports = Error;
