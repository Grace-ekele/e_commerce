const mongoose = require('mongoose')

const proSchema =new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    category:{
        type:String
    },
    qty:{
        type:Number
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},
{timestamps:true}
)

module.exports= mongoose.model('product',proSchema)