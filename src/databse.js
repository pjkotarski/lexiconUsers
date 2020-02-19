let mongoose = require('mongoose');
const db= process.env.MONGOURL || 'mongodb://127.0.0.1:27017/lexicon_users';

class Database { 
    constructor() { 
        this._connect()
    }

    _connect(){ 
        mongoose.connect(db)
    }
}

module.exports = new Database();