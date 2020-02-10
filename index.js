const express = require('express');
const usersRouter = require('./users/users');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res)=> {
    res.send('Welcome to your users api.');
});

app.use('/users/', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log('sersver is running on port 3000'));