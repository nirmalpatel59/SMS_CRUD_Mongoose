process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let ExamModel = require('../model/exam.model')

let chai = require('chai')
let chaiHttp = require('chao-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('Exams', () => {
  beforeEach((done) => {
    ExamModel.remove({}, (err) => {
      if (err) { console.log(err) }
      done()
    })
  })

  describe('/GET book', () => {
    it(`it should GET all the exams`,(done) => {
      chai.request(server)
        .get('/exams')
        .end((err,res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body.length.should.be.eql(0)
          done()
        })
    })
  })
})
