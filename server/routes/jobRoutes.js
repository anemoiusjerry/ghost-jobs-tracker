const express = require('express')
const { createJob, getJobs, getJob, updateJob, deleteJob } = require('../controllers/jobController')

const router = express.Router()

router.route("/")
.get(getJobs)
.post(createJob)

// chain all requests by job ID
router.route("/:jobId")
.get(getJob)
.put(updateJob)
.delete(deleteJob)

module.exports = router