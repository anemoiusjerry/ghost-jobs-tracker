const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI)
  } catch(e) {
    console.error(e)
    process.exit(1)
  }
}

module.exports = connectDb