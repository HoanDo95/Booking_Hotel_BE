const mongoose = require('mongoose');

const BlacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true
  }
});

BlacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 });

const BlacklistedToken = mongoose.model('BlacklistedToken', BlacklistedTokenSchema);

module.exports = BlacklistedToken; 
