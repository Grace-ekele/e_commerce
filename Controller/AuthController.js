const Auth = require('../Model/AuthModel')
const userProfile = require("../Model/ProfileModel")
const product = require('../Model/productModel')
const bcrypt = require('bcrypt')

const GetAll = async (req,res)=>{
    try{
        const get= await Auth.find()
        res.status(200).json({data:get})
    }catch(error){
        res.status(500).json({mes: error.message})
    }
}

// user signup
const CreateUser = async (req,res)=>{

    try{
        const {userName,Email,Password} = req.body
     // Salt and hash the password using bcrypt
     const salt = bcrypt.genSaltSync(10)
     const hashedPassword = bcrypt.hashSync(Password, salt)
     const data = {
        userName:userName.toUpperCase(),
        Email:Email.toUpperCase(),
        Password:hashedPassword

     }
     // create a user
     

     const user = (await Auth.create(data)).populate

     const createProfile = await userProfile.create({
        _id:user._id,
        FirstName:"",
        LastName:"",
        Avatar:"",
        gender:"",
        Bio:""

     })
     
     createProfile.user = user._id
     createProfile.save()

     user.Profile = createProfile._id
     user.save()
     
     res.status(200).json({user})

    }catch(error){
     res.status(500).json({message: error.message})
    }
    
}



// User loging

const UserLogin = async (req, res) => {
    try {
        // Extract the user's email and password
        const { Password, Email } = req.body
        if(!Email || !Password){
            return res.status(403).json({error:'please enter all fields'})

        }
        // Find user by their registered email

        const user = await Auth.findOne({Email: Email})

        //Check if the email exist

        if(!user){
            return res.status(404).json({failed:'user not found'})
        }

        // Compare user's password with the sved password.

        const checkPassword = bcrypt.compareSync(Password, user.Password)
        //check for password error

        if(!checkPassword){
            return res.status(404).json({
                message:'login unsucccesful',
                Failed:'invalid password'
            })
        }

        user.saved()
        res.status(200).json({
            message:'login succesful',
            userName:user.userName,
            Email:user.Email
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



module.exports = {
    CreateUser,
    GetAll,
    UserLogin
}