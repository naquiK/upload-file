const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true , "Username is require"],
        unique:[true , "Username must be unique"]
    },
    email:{
        type:String,
        require:[true , "Password is require"],
        unique:[true , "Password must be unique"],
        toLowerCase:true
    },
    password:{
        type:String,
        require:[true , "Password is require"]
    },
    role:{
        type:String,
        default:"user"
    },
    jwtToken:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports =mongoose.model("User" ,userSchema)