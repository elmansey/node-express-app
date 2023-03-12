const express = require('express');
const router = express.Router();
const Tasks = require("../models/tasksModel")
const RouteTokenValidator = require("../middleware/validateToken")


// add task
router.post('/', RouteTokenValidator, async (req, res, next) => {
    try{
        var data = req.body
        var Task = new Tasks ({
            title : data.title,
            status : data.status
        })
       await Task.save()
       res.send("added successfully")
    }catch(err){
        next(err)
    }
})
  
// all taske 
router.get('/', RouteTokenValidator , async (req, res, next) => {
    try{
        var tasks = await Tasks.find();
        res.send(tasks)
    }catch(err){
        next(err)
    }
  
})

router.get('/:id', RouteTokenValidator , async (req, res, next) => {
    try{
        var task = await Tasks.findById(req.params.id);
        res.send(task)
    }catch(err){
        next(err)
    }
})



   
router.put('/:id',  RouteTokenValidator ,async (req, res, next) => {
    try{
        var data = req.body
        var task = await Tasks.findByIdAndUpdate(req.params.id ,data );
        res.send("updated successfully !")
    }catch(err){
        next(err)
    }
})

router.delete('/:id', RouteTokenValidator ,   async (req, res, next) => {
    try{
        var task = await Tasks.findByIdAndRemove(req.params.id);
        res.send("deleted successfully !")
    }catch(err){
        next(err)
    }
})



module.exports = router