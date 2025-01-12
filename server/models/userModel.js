const { Schema,  model } = require('mongoose')

const userSchema = new Schema({
  email: { type: String, required: true },
  displayName: { type: String },
  // reference to job entries
  upvotedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
})

module.exports = model('User', userSchema)