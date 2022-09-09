const mongoose = require("mongoose");

const connectdb=()=>{
    mongoose.connect(process.env.DB,(error)=>{
        if(error) console.log("Error occure connecting MongoDB");
        else console.log("DB Connected");
    })
}

module.exports=connectdb;