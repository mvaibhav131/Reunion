const mongoose= require("mongoose");

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Enter Product Name"]
    },
    desc:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    comment:{
     type:String,
     required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    like:{
        type:String,
        required:true
       },
})

module.exports= mongoose.model("product",productSchema)