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

exports.loginUser = (req, res) => {

    let loginObject = req.body.loginObject;

    if (!loginObject) res.status(404).send({"error" : "Could not get Login Object"});

    UserModel.getMatchingEmail(loginObject.email)
        .then(user => {

            if (!user) res.status(404).send({"error" : "user not found"})

            user.verifyPassword(loginObject.password)
                .then(resp => {
                    if (resp) { 
                        res.send(JSON.stringify(user))
                    }else { 
                        res.status(401).send({"error" : "incorrect password"})
                    }
                }).catch(err => res.send(err))



        }).catch(err => {
            res.send(err)
        })
}


