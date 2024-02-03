const product = require('../Model/productModel')
const user = require('../Model/AuthModel')
const catModel = require("../Model/categoryModel")
const mongoose = require("mongoose")

const Product = async(req,res)=>{
    try {
        const {name,price,qty}= req.body

        const {id:userid} = req.params
        const{catId} = req.params
        console.log("thia cat id",catId)
        const getCategory = await catModel.findOne({_id:catId})

        console.log(getCategory)


        const use = await user.findById({_id:userid})
        if(!use){
            return res.status(404).json({message:`user with not found`})
        }

        const newProduct = await product.create({
            name,
            price,
            category:getCategory.name,
            qty,
            createdby:userid,
        })

        getCategory.products.push(new mongoose.Types.ObjectId(newProduct._id))
        getCategory.save()

        const saveProduct = await newProduct.save()
        res.status(200).json({product:saveProduct})
    } catch (error) {
        res.status(500).json({message:error.message})
    }


}

const getAllProduct = async(req,res)=>{
    try{
        const allProduct = await product.find().populate('createdby')
        if(!allProduct){
            res.status(404).json({message:'not found'})
        }else{
            res.status(200).json({allProduct})
        }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}



module.exports={ 
    Product,
    getAllProduct
}