const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

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

