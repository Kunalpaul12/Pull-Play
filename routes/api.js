const express = require('express')
const routes = express.Router()
const user = require('../models/user')
var fs = require("fs")
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var d = new Date()
      var dir = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'-'+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+"-"+d.getMilliseconds();
      /*fs.mkdirSync(`uploads/${dir}`,0o777).then((e)=>{
        console.log("wat is this :----",e)
      });*/
      /*fs.exists(`uploads/${dir}`,(e) => {
        //if(e){cb(null, `uploads/${dir}`)}
        alert(e)
      })*/
      fs.mkdir(`uploads/${dir}`,(e) =>{
        if(e){console.log("can't created a dir")}
        else{cb(null, `uploads/${dir}`)}
      })
       
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
var upload = multer({ storage: storage })

routes.get('/get',(req,res,next) => {
    user.find({})
    .then((response) =>{res.send(response)})
    .catch(next)
})

routes.post('/post',upload.any(),(req,res,next) => {
    user.create(req.body)
    .then((response) => {res.send({response})})
    .catch(next)
    
})

module.exports = routes