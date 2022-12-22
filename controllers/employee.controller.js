const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId
const Employee = require('../models/employee.model')

//get all details
router.get('/', (req, res) => { 

    Employee.find()
    .then( data => res.send(data))
    .catch(err => console.log(err))
    
  })
  
  //find by id
  router.get('/:id', (req, res) => { 

    if(ObjectId.isValid(req.params.id)== false){
        res.status(400).json({
            error : 'object ID is not valid'
        })
    }
    else
    Employee.findById(req.params.id)
    .then( data => {
        if(data){
            res.send(data);
        }
        else{
            res.status(404).json({
                error : 'no found data '+ req.params.id
            })
        }
    })
    .catch(err => console.log(err))
    
  })

//create details
  router.post('/', (req , res )=>{
     //req.body
     Employee.create(req.body)
     .then( data => res.status(201).json(data))
     .catch(err => console.log(err))
  })

  //update
  router.put('/:id', async(req, res)=>{

    let result = await Employee.findById(req.params.id);

    result = await Employee.findByIdAndUpdate(req.params.id, req.body , {new : true,
    findAndModify:true,
    runValidators:true
        })

        res.status(200).json({
            result
        })

  })

  //delete 
  router.delete('/:id', async(req, res)=>{

    let result = await Employee.findById(req.params.id)

    if(!result){
            return res.status(404).json({
                message:'ID not found '
            })
    }

    await result.remove();

    res.status(200).json({
        messgae: 'employee details deleted successfully'
    })
  })

  module.exports= router;