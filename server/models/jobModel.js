const { Schema, model } = require('mongoose')

const jobSchema = new Schema({
  title: { type: String, required: true },
  companyId: { type: String, required: true },
  location: { type: String },
  salary: { type: Number },
  position: { type: Number },
  url: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  createDate: { type: Date }
})

module.exports = model('Job', jobSchema)