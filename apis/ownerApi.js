const exp=require('express');
const router=exp.Router();

//import dbo from db.js


//hadling ownerprofile
router.get('/Ownerprofile',(req,res)=>{
  res.send({message:"I am on Owner Profile Page!"});
});

//handling addvenue 
router.post('/addvenue',(req,res)=>{
   //console.log(req.body);
   var venuecollectionObj=req.app.locals.venuesCollectionObj;
   venuecollectionObj.insertOne(req.body,(err,result)=>{
     if(err)
     {
       console.log("Error while adding venue into server",err);
       res.send({message:'Some Error Has Ocuured , Please try again after some time!'});
     }
     else
     {
      res.send({message:"Succesfully Added!"});
      console.log('Succesfully Added 1 record');
     }
   });

  
});









module.exports=router;