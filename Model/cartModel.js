const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref:"users"
    },
  
    cartItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
        quantity: { type: Number, default: 1, min:1 },
        price:Number
    }],
    bill:{
          type: Number,
        required: true, 
            default: 0
    }
},
    {timestamps:true}
)

module.exports =mongoose.model('cart',cartSchema)