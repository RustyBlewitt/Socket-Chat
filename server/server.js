var cors = require('cors');                 // X Origin Resource Sharing
var express = require('express');           // Routing library
var bodyParser = require('body-parser');    // Means of accessing form elements 
var fs = require('fs');

// Mongo setup
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'chat';
const client = new MongoClient(url);

// To delete specific mongo items
const ObjectID = require('mongodb').ObjectID;

// Initialise app express object
var app = express();

//// Mount middleware
// Enable Cors
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
    const messages_collection = await db.createCollection('messages');
    const users_collection = await db.createCollection('users');
    const channels_collection = await db.createCollection('channels');
    const groups_collection = await db.createCollection('groups');
    
    // Bind all API calls to app
    require('./routes/api/auth.js')(app, db);

    require('./routes/api/get_messages.js')(app, db);
    require('./routes/api/send_message.js')(app, db);

    require('./routes/api/create_user.js')(app, db);
    require('./routes/api/delete_user.js')(app, db, ObjectID);
    require('./routes/api/get_users.js')(app, db);

    require('./routes/api/create_channel.js')(app, db);
    require('./routes/api/delete_channel.js')(app, db);
    require('./routes/api/get_channels.js')(app, db);
    
    require('./routes/api/create_group.js')(app, db);
    require('./routes/api/get_groups.js')(app, db);
    require('./routes/api/delete_group.js')(app, db);
})

/// Listen on port 3000 of localhost
app.listen(3000, '127.0.0.1', function () {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server startup at: ' + n + ':' + m);
});


// Users stored here
var userStringJson = fs.readFileSync('./users.json', 'utf8');
// Groups stored here
var groupStringJson = fs.readFileSync('./groups.json', 'utf8');
// Channels stored here
var channelStringJson = fs.readFileSync('./channels.json', 'utf8');

// Middleware functions are functions that have access to the request object (req),
// the response object (res), and the next function in the application’s request-response cycle. 
// The next function is a function in the Express router which, when invoked, 
// executes the middleware succeeding the current middleware.

// Middleware functions can perform the following tasks:

    // Execute any code.
    // Make changes to the request and the response objects.
    // End the request-response cycle.
    // Call the next middleware in the stack.




// POST: /api/auth
// app.post('/api/auth', function (req, res) {
//     if (!req.body) {
//         return res.sendStatus(400);
//     }

//     // Stored users, string to object
//     var userStringJson = fs.readFileSync('./users.json', 'utf8');
//     let users = JSON.parse(userStringJson);

//     // Attempted login becomes a user object, initially set to invalid.
//     let attemptedUser = {
//         username: req.body.username,
//         password: req.body.password,
//         valid: false
//     };

//     // Iterate through users to check if attempted user login is valid.
//     // attemptedUser is replaced with valid user if attempted user is valid.
//     for (i in users) {
//         if (attemptedUser.username == users[i].username && attemptedUser.password == users[i].password) {
//             attemptedUser = users[i];
//         }
//     }
    
//     // Log whether login was successful or not
//     attemptedUser.valid ? console.log('User login succesful for: ', attemptedUser)
//         : console.log('User login unsuccesful for: ', attemptedUser);
    
//     // Post back attemptedUser object
//     res.send(attemptedUser);
// })

// PUT: /api/editChannel
app.post('/api/editChannel', function (req, res) {

    var channelStringJson = fs.readFileSync('./channels.json', 'utf8');

    targetchannel = req.body.oldname;
    channeledited = false;

    // To filter channel that will be edited out
    // Channel is later replaced with updated channel
    function filterChannel(channel) {
        if(channel.channel_name != targetchannel){
            channeledited = true;
            return false;
        }else{
            return true;
        }
    }


    // Channel to be stored
    let newchannel = {
        "name": req.body.newname,
        "users": req.body.users,
        "group_name": req.body.group_name,
        "messages": []
    }

    let channels = JSON.parse(channelStringJson);
    channels = channels.filter(filterChannel);

    channels.push(newchannel);

    channelStringJson = JSON.stringify(channels);

    fs.writeFileSync('./channels.json', channelStringJson, function(err) {
        if(err) {
            channeledited = false;
            return console.log(err);
        }
    });

    res.send(channeledited);
});
    