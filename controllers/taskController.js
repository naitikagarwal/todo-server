const Task =  require('../models/task');
const jwt = require('jsonwebtoken');


const getTask = async (req,res) => {
  token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const tasks = await Task.find({user: decoded.userId});
        res.json(tasks);
    } catch (error) {
        res.json({ message: error.message });
    }
};


const createTask = async (req, res) => {
  const { taskName, taskPriority, taskTime, subtasks } = req.body;
  token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {const task = await Task.create({
          user: decoded.userId,
          taskName,
          taskPriority,
          taskTime,
          subtasks,
        });
        res.status(201).json(task);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    
const updateTask = async(req, res) =>{
  token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);


  try {
    const task = await Task.findById(req.params.id)
    console.log(task);
    console.log(req.body);
    if(!task){
      return tes.json({message: 'Task not found'})
    }
    if(task.user.toString() !== decoded.userId.toString()){
      return res.json({message:"Access Denied!"})
    }
    task.set(req.body);
   await task.save();

    const updatedTask = await task.save();
    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({message:'error.message'})
  }
}


const deleteTask = async(req, res) =>{
  token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const task = await Task.findById(req.params.id)    
    
    if(!task){
      return tes.json({message: 'Task not found'})
    }
    if(task.user.toString() !== decoded.userId.toString()){
      return res.json({message:"Access Denied!"})
    }
    await task.deleteOne();
    res.json({message: 'task deleted'})
  } catch (error) {
    res.status(500).json({message:'error.message'})
  }
}

    
    module.exports = {getTask, createTask, updateTask, deleteTask};