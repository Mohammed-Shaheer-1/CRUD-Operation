const express=require('express')
const app=express()
const router=require('./routes')
const mongodb=require('./db').mongoClient
const cors=require('cors')

app.use(express.json())

app.use(cors({
    origin:'http://localhost:4200'
  }))


app.use('/admin',router)
app.listen(3000,(req,res)=>{
    console.log("PORT 3000 is Running");
})