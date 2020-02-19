const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.createUser = function(req, res) { 
    
    let newUser = new UserModel({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        hashedPassword: req.body.hashedPassword,
        words: []
    });

    newUser.saveUser()
        .then(doc => res.send(doc.toObject()))
        .catch(err => res.send(err))
}

//I honestly think passport js is so fucking stupid 

//custom callback for passport js
exports.authUser = (req, res) => {
    passport.authenticate('local', (err, user) => {
    
        if (err) res.status(400).send(err);

        if (!user) res.status(204).send({"errorMessage" : "could not authenticate"})
        
        return res.send({"you did it": "you fucking did it"}) 
    })(req, res)
}

