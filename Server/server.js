const express=require('express');
const app=express();
const PORT=4000;
const todoRoutes=express.Router();
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

let Todo=require('./todo.model');

mongoose.connect('mongodb://127.0.0.1:27017/todos',{useNewUrlParser: true});
const connection=mongoose.connection;
connection.once('open',function(){
    console.log("MongoDB database connection established successfully");
})


app.use('/todos', todoRoutes);
app.use(cors());
app.use(bodyParser.json());


app.listen(PORT,function(){
    console.log("Server is running on Port: "+ PORT);
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

todoRoutes.route('/').get(function(req, res, next){
    Todo.find(function(err, todos){
        if(err){
            console.log(err);
        }else{
            res.json(todos);
        }

    });
});

todoRoutes.route('/:id').get(function(req, res){
    let id=req.params.id;
    Todo.findById(id, function(err, todo){
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req, res){
    let todo=new Todo(req.body);
    todo.save().then(todo=>{
        res.status(200).json({'todo': 'todo added successfully'});
    })
    .catch(err=>{
        res.status(400).sebd('adding new todo failed');
    });
});

todoRoutes.route('/update/:id').post(function(req, res){
    Todo.findById(req.params.id, function(err, todo){
        if(!todo){
            res.status(400).send('data not found');
        }else{
            todo.todo_description=req.body.todo_description;
            todo.todo_responsible=req.body.todo_responsible;
            todo.todo_priority=req.body.todo_priority;
            todo.todo_completed=req.body.todo_completed;
            todo.save().then( todo =>{
                res.json('todo updated');
            })
            .catch(err =>{
                res.status(400).send("Update not completed");
            });
        }

    });
});
