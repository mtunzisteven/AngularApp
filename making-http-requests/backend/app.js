const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import Post model
const Post = require('./models/post');

// constant that registers middlewares and funnels all incoming requests
const app = express();

// connect to db: Mongodb
mongoose
    .connect("mongodb+srv://mtunzism:NtandoMilaniImani321.@mtunzisms.prgecmz.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() =>{
        console.log("Connected to Database!");
    })
    .catch( error => {
        console.log('Connection Failed');
    });

// add the body parser for all incoming requests
// This allows us to access and pass data from req.body
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false})); // for data that is encoded on urls

// allow communication with apps from outside same host
// CORS: allowing CORS using the folowing middleware
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); 

    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Auth, Custom-Header, Origin, X-Requested-With, Content-Type, Accept'
    );

    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
    );

    next(); // not responding therefore need to next the request so it doesn't get stuck in this middleware
});


app.post('/api/posts', (req, res, next) =>{

    // created a new post object managed by mongoose
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    }); 

    // save is a Mongoose provided method that will save the 
    // mongoose modelled post obj to the mongoDB data base.
    // the collection name will be the plural name of the obj: 
    // 'posts' ---> collection created automatically.
    post.save();

    // staus for "all good, new resource created"
    res.status(201).json(
        {
            message: "Post added successfully!"
        }
    );
});

// this will filter out requests coming from domainName/api/posts/id
// Example: localhost:3000/api/posts/id, mediafrika.co.za/api/posts/id
app.delete('/api/posts/:id',(req, res, next) =>{

    Post.deleteOne({_id: req.params.id}) // we specify to delete by id
    .then(result =>{
        // response needs to go into then block
        res.status(200).json({message: "Post deleted!"});
    })
    .catch(error => {
        console.log(error.message);
    });

});

// this will filter out requests coming from domainName/api/posts
// Example: localhost:3000/api/posts, mediafrika.co.za/api/posts
app.patch('/api/posts/',(req, res, next) =>{

    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;

    Post.findOneAndUpdate({_id: id}, {title: title, content: content}) // we specify to delete by id
    .then(result =>{
        // response needs to go into then block
        res.status(200).json({message: "Post updated!"});
    })
    .catch(error => {
        console.log(error.message);
    });

});

// this will filter out requests coming from domainName/api/posts
// Example: localhost:3000/api/posts, mediafrika.co.za/api/posts
// App.use method should come after all other app. methods, 
// otherwise they will never be reached ||||||||||| Important ||||||||||||
app.use('/api/posts',(req, res, next) =>{

    Post.find()
    .then(posts =>{
        // response needs to go into then block
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error.message);
    });
});

module.exports = app;
