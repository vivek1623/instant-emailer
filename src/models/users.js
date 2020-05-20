const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true
})

const User = model('User', userSchema)

module.exports = User