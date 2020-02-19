let mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        index: true,
        required : true
    },
    lastName: { 
        type: String,
        index: true,
        required: true
    }, 
    email: {
        type: String, 
        index: true, 
        required: true,
        unique: true,
        lowercase: true,
        dropDups: true
    }, 
    hashedPassword: {
        type: String,
        index: true,
        required: true
    },
    words: {
        type: Array, 
        index: true,
        required: true
    }
});


UserSchema.methods.saveUser = function() { 
    return this.save()
}   

UserSchema.methods.verifyPassword = function(password) { 
    return bcrypt.compare(password, this.hashedPassword)
}

UserSchema.statics.checkForEmail = function(email){ 
    return this.count({"email" : email})
}

UserSchema.statics.getMatchingEmail = function(email) {
    return this.findOne({"email" : email})
}

module.exports = mongoose.model('User', UserSchema);