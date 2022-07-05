const express = require('express');
const bodyParser = require('body-parser');

// constant that registers middlewares and funnels all incoming requests
const app = express();

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
    const post = req.body;
    console.log(post);

    // staus for "all good, new resource created"
    res.status(201).json(
        {
            message: "Post added successfully!"
        }
    );
});


// this will filter out requests coming from domainName/api/posts
// Example: localhost:3000/api/posts, mediafrika.co.za/api/posts
app.use('/api/posts',(req, res, next) =>{

    let posts = [
        {
            id: 'hfukhasbj',
            title: 'First server-side post',
            content: 'This is coming from the server'
        },
        {
            id: 'fukahfaoi',
            title: 'Second server-side post',
            content: 'This is coming from the server!'
        }
    ];

    res.status(200).json(posts);

});



module.exports = app;
