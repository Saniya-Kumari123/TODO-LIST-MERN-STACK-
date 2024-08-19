const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo.js')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect ('mongodb://localhost:27017')
app.post('/add', (req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task:task

    })
    .then(result=> res.json(result))
   .catch(err => res.json(err))

})

app.get('/get' ,(req,res)=>{
    TodoModel.find()
    .then(result=> res.json(result))
    .catch(err => res.json(err))
 
})

app.put('/update/:id' ,(req,res)=>{
    const{id}= req.params;
   TodoModel.findByIdAndUpdate({_id:id}, {done:true })
    .then(result=> res.json(result))
   .catch(err => res.json(err))

})
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json(result); // Return the deleted todo
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        })
        .catch(err => {
            console.error('Error deleting todo:', err);
            res.status(500).json({ message: 'Server error' });
        });
});





app.listen(3001, ()=>{
    console.log('server is running')
})



