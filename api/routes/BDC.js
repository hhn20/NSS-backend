const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const BDClist = require('../models/BDC');

router.get('/',(req,res,next)=>{
    BDClist.find().exec().then(doc => {
        console.log(doc)
        if(doc.length>0){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({error:'nothing sent'});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    })
});

router.post('/',(req,res,next)=>{
    const BDC = new BDClist({
     _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    ph_no: req.body.ph_no,
    email: req.body.email
    });
    BDC.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message:"handling /BDClists post",
            createdBDClist: BDC
        });
    }).catch(err =>{ 
    console.log(err);
    res.status(500).json({error:err});
    });
  
});

router.patch('/:id',(req,res,next)=>{
    const u = req.params.id;
    arr=req.body;
    const updateOps={};
    obj=arr
    console.log(obj)
    for (var key in obj){

        if(obj[key].length>0){updateOps[key]=obj[key]}
    }
    
    BDClist.update({ _id:u },{ $set: updateOps }).exec().then(doc =>{
            res.status(200).json(doc);
        }).catch(err =>{
            res.status(500).json([{error:err}]);
        });
});


router.delete('/:id',(req,res,next)=>{

    
    BDClist.remove({_id:req.params.id}).exec().then(doc =>{
    res.status(200).json(doc); 
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
}); 

router.get('/:id',(req,res,next)=>{
    const u = req.params.id;
    BDClist.find({_id:u}).exec().then(doc =>{
        console.log(doc);
        if(doc.length>0){
        res.status(200).json(doc);
        }
        else{
            res.status(404).json({error:'no valid entry found'});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;