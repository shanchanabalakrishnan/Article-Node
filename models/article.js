const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({

title:{
    type: String,
    required: [true, "Please enter a title"]
},
description: {
    type: String,
    required: [true, "Please enter a description"]
},
date: {
    type: Date,
    default: Date.now

}
},
{
    timestamps: true
}

);

const Article = mongoose.model('Article', articleSchema)
module.exports = Article;