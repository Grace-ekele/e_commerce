const category = require('../Model/categoryModel')
const product = require('../Model/productModel')
const Auth = require('../Model/AuthModel')

const newCategory = async(req,res)=>{
    try {
        const {name,slug,parent}=req.body

        if(!name,!slug,!parent){
            return res.status(400).json({error:'invalid data provided'})
        }
        const newCategory= new  category({name,slug,parent})
        const savedCategory =await newCategory.save()
        res.status(200).json({
            message:'category created successfully',
            data: savedCategory 
        })
        

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const allCategory = async(req,res)=>{
    try {
        const allCat = await category.find().populate('products')
        if(allCat.length == null){
            return res.status(404).json({
                message:'there are no categories'
            })
        }
        res.status(200).json({allCat})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



module.exports = {
    newCategory,
    allCategory
}
