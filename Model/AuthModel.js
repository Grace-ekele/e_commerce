const mongoose = require('mongoose')


const  UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'userName must be provided'],
    },
    Email:{
        type:String,
        unique: true,
        required:[true,'email must be provided'],

    },

    Password:{
        type:String,
        required:[true,'password must be provided'],
    },
    Profile: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "profile",
        },
      
  


})


module.exports= mongoose.model('users',UserSchema)