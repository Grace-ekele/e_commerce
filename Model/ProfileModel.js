const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({

    FirstName:{
        type:String,
        
    },
    LastName:{
        type:String,
        
    },
    Avatar:{
        type:String,
    
    },

    gender:{
        type:String,

        },

    Bio:{
        type:String
    },

    user: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      
})


module.exports = mongoose.model('profile',ProfileSchema)