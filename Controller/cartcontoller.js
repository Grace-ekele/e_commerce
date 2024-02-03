const cart = require('../Model/cartModel')
const user =require('../Model/AuthModel')
const product = require('../Model/productModel')



const addToCart = async (req,res)=>{
    try{
        const {id}= req.params
      const getuser = await user.findOne({_id:id})
    //   console.log("us",getuser)
      if(!getuser){
        res.status(404).json({
            message:"user not found"
        })
      }
        const {productid}=req.params
        const getproduct = await product.findOne({_id:productid})

        // console.log("pr",getproduct)
        if(!product){
            res.status(404).json({
                message:"user not found"
            })
        }
        const chectUserCart = await cart.findOne({user:id})
        console.log("ruirs", chectUserCart)
        if(chectUserCart){

            const findIndexProduct = chectUserCart.cartItems.findIndex(item => item.product.equals(productid))
            console.log("",findIndexProduct)
            if(findIndexProduct > -1){

                const slectItemProduct = chectUserCart.cartItems[findIndexProduct]
                console.log("main",slectItemProduct)
                slectItemProduct.quantity += 1
                console.log("increase", slectItemProduct)

                chectUserCart.bill = chectUserCart.cartItems.reduce((acc, curr)=>{
                    return acc + curr.quantity * curr.price
                },0)
     
                chectUserCart.cartItems[findIndexProduct] = slectItemProduct
                await chectUserCart.save()
                res.status(201).json({
                    message:"this product is already in the cart item",
                    data:chectUserCart
                })

            }else{
                
                chectUserCart.cartItems.push({
                    product:getproduct._id,
                    quantity:1,
                    price:getproduct.price
     
                 })
                 chectUserCart.bill = chectUserCart.cartItems.reduce((acc, curr)=>{
                    return acc + curr.quantity * curr.price
                },0)
                await chectUserCart.save()

                res.status(201).json({
                    message:"this product is not in cart item wiil add it",
                    data:chectUserCart
                })
            }
            


        }else{
            const  dataCart = await cart.create({
                user:getuser._id,
                cartItems:[{
                   product:getproduct._id,
                   quantity:1,
                   price:getproduct.price
    
                }],
                bill:1 * getproduct.price
    
            })
    
            res.status(201).json({
                message:"item added successfully",
                data:dataCart
            })

        }
        


       

    }catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports = {
    addToCart
}