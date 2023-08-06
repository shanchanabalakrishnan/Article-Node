const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./models/article')



app.use(express.json());
app.use(express.urlencoded({extended: false}))

//app.use('/articles', articles)


//routes
app.get('/', (req, res)=> {
res.send('This is from node home')
})


app.get('/articles', async(req, res)=>{
    try{
        const articles = await Article.find({});
        res.status(200).json(articles);
        }catch(error){
            
            res.status(500).json({message: error.message});
        }
})

app.get('/articles/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const article = await Article.findById(id);
        res.status(200).json(article);
        }catch(error){
            
            res.status(500).json({message: error.message});
        }
})


 app.post('/article', async(req, res) => {
    try{
        const article = await Article.create(req.body);
        res.status(200).json(article);

    }catch(error){
        console.log('error.message');
        res.status(500).json({message: error.message});
    }
 });

//Update a article

app.put('/articles/:id', async(req, res) => {

    try{
        const {id} = req.params;
        const article = await Article.findByIdAndUpdate(id, req.body);
        //Cannot find any product in database
        if(!article){
            return res.status(404).json({message: `Cannot find any product with id ${id}`})
        }
        const updateArticle = await Article.findById(id);
        res.status(200).json(updateArticle);

    }catch(error){
        
        res.status(500).json({message: error.message});
    }
 });

//Delete a product
app.delete('/articles/:id', async(req, res) => {
    
    try{
        const {id} = req.params;
        const article = await Article.findByIdAndDelete(id);
        //Cannot find any product in database
        if(!article){
            return res.status(404).json({message: `Cannot find any product with id ${id}`})
        }
        
        res.status(200).json(article);

    }catch(error){
        
        res.status(500).json({message: error.message});
    }
 });
 
//CONNECT TO DATABASE
mongoose.connect(process.env.CONNECTION_STRING)
.then(() =>
console.log('Connected to Database ')
)
.catch((err) => 
console.log('Error connecting to Database')
)

const port = 5000;
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})