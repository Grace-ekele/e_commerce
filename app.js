const express = require('express');
const app = express()
const db = require('./config/conect')
const authRouter = require('./Router/router')
const profileRouter = require('./Router/profileRouter')
const productRouter = require('./Router/productRouter')
const categoryRouter = require('./Router/categoryRouter')
const addCat = require("./Router/cartRouter")
const PORT= 5000
app.use(express.json())
 

app.use('/api/user',authRouter)
app.use('/api/profile',profileRouter)
app.use('/api/product',productRouter)
app.use('/api/category',categoryRouter)
app.use('/api/add-item',addCat)


app.listen(PORT,  console.log(`server is running on ${PORT}`))
   