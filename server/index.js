const express = require('express')
const connectDb = require('./dbCnxn')
const jobRoutes = require('./routes/jobRoutes')

// load env variables
require('dotenv').config()

// 1-time connect to mongoDB
connectDb()

const app = express()

// middleware to parse json
app.use(express.json())
// connect routes
app.use('/api/jobs', jobRoutes)

app.listen(process.env.PORT || 3000, () => {
  "Server started , listening on port 3000"
})