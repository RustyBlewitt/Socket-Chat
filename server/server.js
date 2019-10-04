const cors = require('cors');                 // X Origin Resource Sharing
var express = require('express');           // Routing library
var bodyParser = require('body-parser');    // Means of accessing form elements 

// Mongo setup
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'chat';
const client = new MongoClient(url);

// To delete specific mongo items
// const ObjectID = require('mongodb').ObjectID;

// Initialise app express object
const app = express();
//// Mount middleware
// Enable Cors

const server  = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(cors());                 

// Allows JSON parsing      
app.use(bodyParser.json());
// Serve static content for the app from the "www" directory in the app directory
app.use(express.static(__dirname + '/www'));
// Serve static content for the app from the public directory
app.use('/public', express.static(__dirname + '/public')); 

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


/// Listen on port 3000 of localhost
// app.listen(3000, '127.0.0.1', function () {
server.listen(3000, '127.0.0.1', function () {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server startup at: ' + n + ':' + m);
});
