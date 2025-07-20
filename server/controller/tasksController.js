const Tasks = require('../Model/Tasks')

// for a single
const getMyTasks = async(req,res)=>{
    const task = await Tasks.find({owner:req.user.id})
    res.json(task)
}


// for admin
const getAllTasks = async(req,res)=>{
    const task = await Tasks.find().populate("owner","email")
    res.json(task)
}

const createTasks = async(req,res) =>{
    const task = await Tasks.create({...req.body, owner:req.user.id})
    res.json(task)
}



module.exports = {getMyTasks, getAllTasks, createTasks}