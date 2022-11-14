const express=require('express')
const db=require('./db')
const collections=require('./collections')
var objectId=require('mongodb').ObjectId
const promise=require('promise')
const { Router } = require('express')

const router=express.Router()

router.delete('/deleteproduct/:id',async(req,res)=>{
  let pid=objectId(req.params.id)
 await db.get().collection(collections.add_product).deleteOne({_id:pid},(err,data)=>{
    if(err){
      console.log("err",err);
    }else{
      console.log("data",data);
      res.send("success")
    }
  })
  
})


router.put('/updateproduct/:id',(req,res)=>{
    return new promise(async(resolve,rejuct)=>{
        let id=req.params.id

        let prodect=await db.get().collection(collections.add_product).findOne({_id:objectId(id)})
        console.log(prodect);
        if(prodect){
        db.get().collection(collections.add_product).updateOne({ _id: objectId(id) }, 
                {
                  $set: { 
                    productName:req.body.productName,
                    category:req.body.category,
                    freshness:req.body.freshness,
                    price:req.body.price,
                    comment:req.body.comment,
                    date:req.body.date
                },
                  $currentDate: { lastModified: true }
                },(err,data)=>{
                    console.log("data",data);
                    res.send("success")
                } ) 
              
         
        }else{
            res.send("errr")
            console.log("user dousnot exist");
        }})

})

router.get('/addproduct',(req,res)=>{
   let getProduct= db.get().collection(collections.add_product).find().toArray().then((result)=>{
  console.log(result);
  res.send(result)
   })
  
})

router.post('/addproduct',(req,res)=>{
   let userData=req.body 
  db.get().collection(collections.add_product).insertOne(userData).then((response)=>{
  res.status(200),res.json(userData)
  })
})


module.exports=router