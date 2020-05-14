const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Student = require('../models/students');

router.get('/',(req,res,next)=>{
    Student.find().exec().then(doc => {
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

router.get('/certificate',(req,res,next)=>{
    Student.find( {$and: [{BDC: {$gt: 1},specialCamp: {$gt: 0}}]}).exec().then(doc =>{
        console.log(doc);
        if(doc.length>0){
        console.log(doc[0]['name'])
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

router.get('/donors',(req,res,next)=>{
    Student.find({emergencyDonor: {$eq: true} }).exec().then(doc =>{
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

router.post('/',(req,res,next)=>{
    const student = new Student({
     _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    usn: req.body.usn,
    BDC: req.body.BDC,
    specialCamp: req.body.specialCamp,
    emergencyDonor: req.body.emergencyDonor,
    role: req.body.role,
    team: req.body.team,
    ph_no: req.body.ph_no
    });
    student.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message:"handling /students post",
            createdStudent: student
        });
    }).catch(err =>{ 
    console.log(err);
    res.status(500).json({error:err});
    });
  
});

router.get('/:usn',(req,res,next)=>{
    const u = req.params.usn;
    Student.find({usn:u}).exec().then(doc =>{
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

router.patch('/:usn',(req,res,next)=>{
    const u = req.params.usn;
    arr=req.body;
    const updateOps={};
    obj=arr
    console.log(obj)
    for (var key in obj){
        if(obj[key].length>0){updateOps[key]=obj[key]}
    }
    
    Student.update({ usn:u },{ $set: updateOps }).exec().then(doc =>{
            res.status(200).json(doc);
        }).catch(err =>{
            res.status(500).json([{error:err}]);
        });
});

router.delete('/:usn',(req,res,next)=>{
    Student.remove({usn:req.params.usn}).exec().then(doc =>{
    res.status(200).json(doc); 
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
}); 

module.exports = router;