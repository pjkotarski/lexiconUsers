const bcrypt = require('bcrypt');
const passValidator = require('password-validator');
const validator = require('validator');
const UserModel = require('../models/user');

exports.encrypt = (req, res, next) => {

    const saltRounds = 10
    let password = req.body.password
    if (!password) res.send({"error" : "there was an error finding password"});

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) res.send(err)

        req.body.hashedPassword = hash
        next()
    });
}
 
exports.validate = (req, res, next) => {
    
    var schema = new passValidator();

    schema.is().min(8).max(100).has().uppercase().has().lowercase().has().digits().has().not().spaces()
        .is().not().oneOf(['Passw0rd', 'Password123'])

    try{ 
        const password = req.body.password;
        const email = req.body.email;
        if (schema.validate(password) && validator.isEmail(email)) { 
            next()
        }else{
            res.status(400).send({"errorMessage" : "password not strong enough"})
        }

    } catch(err) { 
        res.send(err)
    }
}

exports.checkForEmail = function(req, res, next) { 
    let email = req.body.email;

    if (!email) res.status(404).send({"errorMessage" : "ERROR"});

    UserModel.checkForEmail(email)
        .then(count => {
            if (count >= 1){
                res.status(409).send({"emailExists" : true})
            }else{
                next()
            }
        })
        .catch(err => res.send(err))
}