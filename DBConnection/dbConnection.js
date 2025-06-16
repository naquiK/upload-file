const mongoose = require('mongoose')

const dbConnection= async ()=>{
   try {
    await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Database connected")
    })
   } catch (error) {
    console.log('some error occur during connecting Database')
    process.exit(1)
   }
} 
module.exports=dbConnection