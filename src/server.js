const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://usuario:senha@cluster0-rldos.gcp.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    }).then(() => {
        console.log('Connected to mongo database');
    }).catch((err) => {
        console.log('Error connecting mongo database', err);
    });

app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files/', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require('./routes'));

server.listen(process.env.PORT || 8000);

// yarn add express
// yarn add mongoose
// yarn add multer
// yarn add socket.io
// yarn add cors
// heroku.com

// yarn create react-app frontend