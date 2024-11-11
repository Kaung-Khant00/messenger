const mongoose=require("mongoose")
const message = mongoose.Schema({
    sender:String,
    receiver:String,
    message:String,
    time:String
})
module.exports=mongoose.model("message",message)
