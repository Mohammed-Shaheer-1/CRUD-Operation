const mongoClient=require('mongodb').MongoClient
const state={
   db:null
}

    const url='mongodb://localhost:27017'
    const dbname='CRUDoperation'
    mongoClient.connect(url,(error,data)=>{
        if(error){
            console.log("err",error);
        }else{
            console.log("successsfully connected");
            state.db=data.db(dbname)
       
        }
  
       
    })
    module.exports={mongoClient}
module.exports.get=()=>{
    return state.db
}
