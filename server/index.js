const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const url='mongodb://127.0.0.1:27017/test';
const TodoModel=require('./models/todoModel');
const app=express();
app.use(cors());

app.use(express.json());
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true});
const conn=mongoose.connection;


conn.on('error',()=>{
    console.log("error")
})


conn.on('open',()=>{
    console.log("open")
})

app.post('/add',(req,res)=>{
    const task=req.body.task;
    TodoModel.create({
        task:task

}).then(result=>res.json(result)).catch(err=>res.json(err));
    
});

app.get('/get',(req,res)=>{
    TodoModel.find().
    then(result=>res.json(result)).
    catch(err=>res.json(err));
})

app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result)).catch(err=>res.json(err));
});


app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result)).catch(err=>res.json(err));
});

app.listen(3000,()=>{console.log('listening on port 3000')});