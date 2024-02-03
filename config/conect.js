const mongoose = require('mongoose')

const URL = 'mongodb://localhost:27017'


const db = mongoose.connect(URL)
.then(()=>{
    console.log('Database conected sucessfuly')
}).catch((error) =>{
    console.log(error)
})




module.exports = db