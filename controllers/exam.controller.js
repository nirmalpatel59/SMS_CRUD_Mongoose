var express = require('express')
let userModel = require('../model/user.model')
let examModel = require('../model/exam.model')
let router = express.Router()

router.get('/examInfo', getExamInfo)
router.get('/examsInfo', getExamsByUser)
router.post('/examInfo', saveExamInfo)
router.delete('/removeExam', removeExam)
router.put('/updateExam', updateExam)

function getExamInfo (req, res) {
  if (req.user.username) {
    examModel.findOne({exam_id: req.query.exam_id}).populate('created_by', ['first_name', 'last_name', 'username']).exec(function (err, data) {
      if (err) {
        res.send(err)
      } else {
        if (data) {
          res.send(data)
        } else {
          res.send('Exam info not found.')
        }
      }
    })
  } else {
    res.send('No user found').status(404)
  }
}

function saveExamInfo (req, res) {
  if (req.user.username) {
    var examInstance = new examModel({
      exam_id: req.body.exam_id,
      exam_name: req.body.exam_name,
      type: req.body.type,
      total_marks: req.body.total_marks,
      standard: req.body.standard,
      standard_stream: req.body.standard_stream,
      subject: req.body.subject,
      created_by: req.body.created_by,
      duration: req.body.duration,
      duration_type: req.body.duration_type,
      passing_marks: req.body.passing_marks,
      exam_date: req.body.exam_date
    })
    examInstance.save(function (err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data)
      }
    })
  } else {
    res.send('No user found').status(404)
  }
}

function getExamsByUser (req, res) {
  if (req.user.username) {
    userModel.findOne({'username': req.user.username}, function (err, data1) {
      if (err) {
        res.send(err)
      } else {
        console.log(data1)
        examModel.find({ created_by: data1._id }).exec(function (err, data) {
          if (err) {
            res.send(err)
          } else {
            res.send(data)
          }
        })
      }
    })
  } else {
    res.send('No user found').status(404)
  }
}

function removeExam (req, res) {
  examModel.findOneAndRemove(req.query.exam_id, function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

function updateExam (req, res) {
  var updatedata = {
    'exam_name': req.body.exam_name,
    'type': req.body.type,
    'total_marks': req.body.total_marks,
    'standard': req.body.standard,
    'standard_stream': req.body.standard_stream,
    'subject': req.body.subject,
    'created_by': req.body.created_by,
    'duration': req.body.duration,
    'duration_type': req.body.duration_type,
    'passing_marks': req.body.passing_marks,
    'updated_at': Date.now(),
    'exam_date': req.body.exam_date
  }
  examModel.findOneAndUpdate({ 'exam_id': req.body.exam_id }, updatedata, {new: true}, function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports = router
