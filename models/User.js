const User = function(_id, firstName, lastName, email, password, passSalt, words) { 
    this._id = _id || undefined;
    this.firstName = firstName || undefined;
    this.lastName = lastName || undefined;
    this.email = email || undefined;
    this.password = password || undefined;
    this.passSalt = passSalt || undefined;
    this.words = words || {};
};

User.prototype.getId = function() { 
    return this._id;
};

User.prototype.getWords = function() { 
    return this.words;
};


module.exports = User;
