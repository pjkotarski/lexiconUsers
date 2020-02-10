const express = require('express');
const mongoClient = require('mongodb').MongoClient; 
const expRouter = express.Router() ;
const uni = require('unirest');
const User = require('../models/User');

const dbUrl= process.env.MONGOURL || 'mongodb://127.0.0.1:27017/lexicon_users';

expRouter.post('/user-exists/', (req, res) => {

    let requestedEmail = req.body.email

    mongoClient.connect(dbUrl, (err, client) => {

        if (err) res.send(err);

        const db = client.db('lexicon_users');

        if (!db) res.send(err);

        const collection = db.collection('users');

        if (!collection) res.send(err);

        collection.find({email : requestedEmail}).toArray((err, result) => {
            if (err) res.send(err);

            if (result.length === 0) { 
                res.send({ "response" : false})
            }else{
                res.send({"response" : true})
            }
        });

    });
});

expRouter.post('/create-user/', (req, res) => {
    
    mongoClient.connect(dbUrl, (err, client) => {

        if (err) res.send(err);

        const db = client.db('lexicon_users');

        if (!db) res.send(err);

        const collection = db.collection('users');

        if (!collection) res.send(err);

        var newUser = new User(firstName = req.body.firstName, lastName = req.body.lastName, email = req.body.email, 
                             password = req.body.password);
         
        
        collection.insertOne(newUser, (err, dictionaryResponse) => {

            if (err) throw err;

            res.send(dictionaryResponse.ops);
        });
    });

    
});




module.exports = expRouter;


