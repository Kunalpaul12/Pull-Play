const mongoose = require('mongoose')
const schema = mongoose.Schema
const userSchema = new schema({
    name:{type:String,required:[true,"Please provied name"]},
    songName:{type:String,required:[true,"Please selected a song"]},
    dedicatedTo:{type:String},
    userImage:{data: Buffer, contentType: String},
    dedicatedToImage:{data: Buffer, contentType: String}

})
const user = mongoose.model('userData',userSchema)
module.exports = user