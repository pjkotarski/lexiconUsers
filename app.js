const express = require('express');
const usersRouter = require('./routes/user_routes');
const bodyParser = require('body-parser');
const passport = require('passport');



require('dotenv').config();

const app = express();

require('./src/databse')
app.use(passport.initialize());
app.use(passport.session());
require('./middlewares/passport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/users', usersRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log('sersver is running on port 3000'));