const JobModel = require('../models/jobModel')
const UserModel = require('../models/userModel')

// create record
exports.createJob = async (req, res) => {
  try {
    const msg = new JobModel(req.body)
    const doc = await msg.save()
    // 201 indicates record created
    res.status(201).json(doc) 
  } catch(e) {
    res.status(400).json({ error: error.message })
  }
}

exports.getJob = async (req, res) => {
  try {
    const jobId = req.params.jobId
    const job = await JobModel.findById(jobId)
    res.status(200).json(job)
  } catch(e) {
    res.status(400).json({ error: error.message })
  }
}

// get by search
exports.getJobs = async (req, res) => {
  try {
    const filter = {}

    // always use case insensitive search ('i')
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: 'i'}
    }
    if (req.query.company) {
      filter.name = { $regex: req.query.company, $options: 'i'}
    }
    if (req.query.location) {
      filter.name = { $regex: req.query.location, $options: 'i'}
    }

    const jobs = await JobModel.find(filter)
    res.status(200).json(jobs)
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
}

// updates by ID
exports.updateJob = async (req, res) => {
  try {
    await JobModel.findByIdAndUpdate(
      req.params.jobId,
      req.body,
      {runValidators: true}
    )
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
}

exports.deleteJob = async (req, res) => {
  try {
    await JobModel.findByIdAndDelete(req.params.jobId)
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
}

// only 1 upvote per user
exports.upvoteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId
    const user = await UserModel.findById(req.user.id)
    if (!user) {
      return res.status(401).json({ message: 'No user account found. Unauthorised to vote.' })
    }
    const job = await JobModel.findById(req.params.jobId)
    if (!job) {
      return res.status(404).json({ message: "The job you are editing is not found" })
    }

    if (user.upvotedJobs.includes(jobId)) {
      // remove upvote if already upvoted
      job.upvotes -= 1
      user.upvotedJobs = user.upvotedJobs.filter(id => id.toString() !== jobId)
    } else {
      job.upvotes += 1
      user.upvotedJobs = user.upvotedJobs.push(jobId)
    }
    await user.save()
    await job.save()
    return res.status(200).json({ message: "job upvote updated successfully" })
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
}