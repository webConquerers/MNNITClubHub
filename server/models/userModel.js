import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    clubs:[{
       type:mongoose.Schema.Types.ObjectId ,ref: 'Clubs'}]
}, {timestamps:true})

export const User = mongoose.model('User', userSchema)