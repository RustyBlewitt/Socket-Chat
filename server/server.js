const express = require('express');             // Routing library
const app = express();                          // Initialise app express object
const cors = require('cors');                   // X Origin Resource Sharing
const bodyParser = require('body-parser');        // Means of accessing form elements 
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');

// Mongo setup/////
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'chat';
const client = new MongoClient(url);
///////////////////

// Allows cross origin requests
app.use(cors());                 
// Allows JSON parsing      
// app.use(bodyParser.json());
// Serve static content for the app from the "www" directory in the app directory
app.use(express.static(__dirname + '/www'));
// Serve static content for the app from the public directory
app.use('/public', express.static(__dirname + '/public')); 
// Increase file size
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

sockets.connect(io, 3000);
server.listen(http, 3000);

// Connect to MongoClient
client.connect(async function(err) {
    if (err) {
        console.log('Error connecting.\n', err);
        return;
    }

    // Open db 'chat'
    const db = client.db(dbName);

    // Create collections if they don't already exist
    await db.createCollection('messages');
    await db.createCollection('users');
    await db.createCollection('channels');
    await db.createCollection('groups');
    
    // Bind all API calls to app
    require('./routes/api/auth.js')(app, db);

    require('./routes/api/get_messages.js')(app, db);
    require('./routes/api/send_message.js')(app, db);

    require('./routes/api/create_user.js')(app, db);
    require('./routes/api/add_user_image.js')(app, db);
    require('./routes/api/delete_user.js')(app, db);
    require('./routes/api/get_users.js')(app, db);

    require('./routes/api/create_channel.js')(app, db);
    require('./routes/api/delete_channel.js')(app, db);
    require('./routes/api/get_channels.js')(app, db);
    require('./routes/api/update_channel.js')(app, db);
    
    require('./routes/api/create_group.js')(app, db);
    require('./routes/api/get_groups.js')(app, db);
    require('./routes/api/delete_group.js')(app, db);
})
