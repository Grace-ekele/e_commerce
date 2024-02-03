const mongoose = require('mongoose')

const catSchema =new mongoose.Schema({
    name: {
        type:String
    },
    slug: {
        type:String
    },
    parent: {
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product"
    }]
})

module.exports=mongoose.model('category',catSchema)