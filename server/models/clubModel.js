import mongoose from "mongoose";



const clubSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId , ref:'User' , require: true 
    },
    announcements:[{
        type:mongoose.Schema.Types.ObjectId , ref:'Announcements'

    }],
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['admin', 'member'], default: 'member' }, // User roles
        status: { type: String, enum: ['pending', 'approved'], default: 'pending' } // Membership status
      }]


})
export const Club = mongoose.model('Club',clubSchema)