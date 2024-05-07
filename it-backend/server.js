require('dotenv').config()
const express = require('express')
const app = express()
const port = 5000
const router=require('./router/auth_route')
const ConnectDb = require('./utils/MongoDB')

//  midle wares 
app.use(express.json())



app.use('/api/auth',router)


//  mongo db utils 
ConnectDb().then(()=>{
    
app.listen(port, () => {
  console.log(`Server is Running  on port ${port}`)
})
})