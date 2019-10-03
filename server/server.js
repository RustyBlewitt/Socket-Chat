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
    // const groups_collection = await db.createCollection('groups');
    
    // Bind all API calls to app
    require('./routes/api/get_messages.js')(app, db);
    require('./routes/api/send_message.js')(app, db);

    require('./routes/api/create_user.js')(app, db);
    require('./routes/api/delete_user.js')(app, db, ObjectID);
    require('./routes/api/get_users.js')(app, db);

    require('./routes/api/create_channel.js')(app, db);
    require('./routes/api/delete_channel.js')(app, db);
    require('./routes/api/get_channels.js')(app, db);
})



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



/// Listen on port 3000 of localhost
app.listen(3000, '127.0.0.1', function () {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server startup at: ' + n + ':' + m);
});

// POST: /api/auth
app.post('/api/auth', function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    // Stored users, string to object
    var userStringJson = fs.readFileSync('./users.json', 'utf8');
    let users = JSON.parse(userStringJson);

    // Attempted login becomes a user object, initially set to invalid.
    let attemptedUser = {
        username: req.body.username,
        password: req.body.password,
        valid: false
    };

    // Iterate through users to check if attempted user login is valid.
    // attemptedUser is replaced with valid user if attempted user is valid.
    for (i in users) {
        if (attemptedUser.username == users[i].username && attemptedUser.password == users[i].password) {
            attemptedUser = users[i];
        }
    }
    
    // Log whether login was successful or not
    attemptedUser.valid ? console.log('User login succesful for: ', attemptedUser)
        : console.log('User login unsuccesful for: ', attemptedUser);
    
    // Post back attemptedUser object
    res.send(attemptedUser);
})

// POST: /api/createUser
app.post('/api/createUser', function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    // Stored users
    let users = JSON.parse(userStringJson);

    // Set up the response that will be sent to requesting user
    let netResponse = {'user': {}};
    netResponse.message = "Success";
    netResponse.success = true;
    netResponse.user.level = req.body.level;
    netResponse.user.username = req.body.username;
    netResponse.user.password = req.body.password;
    netResponse.user.valid = true;
    netResponse.user.email = req.body.email;
    netResponse.user.groups = [];

    // Iterate through users to check if attempted users name or email already exists.
    for (i in users) {
        if (netResponse.user.username == users[i].username){
            netResponse.success = false;
            netResponse.user.valid = false;
            netResponse.message = "Username is already in use."
        }else{
            if (netResponse.user.email != null && netResponse.user.email == users[i].email){
                netResponse.success = false;
                netResponse.user.valid = false;
                netResponse.message = "Email is already in use."
            }
        }
    }

    // Add the new user to the data file
    if (netResponse.user.valid == true) {
        users.push(netResponse.user);
        userStringJson = JSON.stringify(users);
        fs.writeFileSync('./users.json', userStringJson, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }

    // Send the response back to the user
    res.send(netResponse);
})

// GET: /api/allUsers
app.get('/api/allUsers', function (req, res) {
    var userStringJson = fs.readFileSync('./users.json', 'utf8');
    res.send(userStringJson);
})

// GET: /api/allGroups
app.get('/api/allGroups', function (req, res) {
    var groupStringJson = fs.readFileSync('./groups.json', 'utf8');
    res.send(groupStringJson);
})

// GET: /api/allChannels
app.get('/api/allChannels', function (req, res) {
    var channelStringJson = fs.readFileSync('./channels.json', 'utf8');
    res.send(channelStringJson);
})

// POST: /api/deleteUser
app.post('/api/deleteUser', function (req, res) {
    
    targetname = req.body.username;
    userdeleted = false;

    // For filtering the user list
    function targetUser(user) {
        if(user.username != targetname){
            return true;
        }else{
            userdeleted = true;
            return false;
        }
    }

    // Stored users
    let users = JSON.parse(userStringJson);
    users = users.filter(targetUser);

    if(userdeleted){
        userStringJson = JSON.stringify(users);
        fs.writeFileSync('./users.json', userStringJson, function(err) {
            if(err) {
                userdelete = false;
                return console.log(err);
            }
        });
    }

    res.send(userdeleted);
})

// POST: /api/createGroup
app.post('/api/createGroup', function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    let error = null;

    let groups = JSON.parse(groupStringJson);

    group = {
        groupname: "",
        users: [],
        admins: [],
        assis: [],
    }

    group.groupname = req.body.groupname;
    group.users = req.body.users;
    group.admins = req.body.admins;
    group.assis = req.body.assis;

    storedGroups = JSON.parse(groupStringJson);

    // Checks if group exists
    for(i in storedGroups){
        if(storedGroups[i].groupname == group.groupname){
            console.log('Error ' + group.groupname + " already exists.");
            error = group.groupname + " already exists."
        }
    }
    
    if(error == null){
        groups.push(group);
        groupStringJson = JSON.stringify(groups)
        fs.writeFileSync('./groups.json', groupStringJson, function(err) {
            if(err) {
                error = "Group was unsuccessfully stored";
                console.log("Erroring out at filewrite");
                return console.log(err);
            }
        });

        // Update users group lists
        var userStringJson = fs.readFileSync('./users.json', 'utf8');
        storedUsers = JSON.parse(userStringJson);

        // Add group to all stored users in group
        for(u in storedUsers){
            for(g in group.users){
                if(storedUsers[u].username == group.users[g]){
                    storedUsers[u].groups.push(group.groupname);
                }
            }
        }

        userStringJson = JSON.stringify(storedUsers)
        fs.writeFileSync('./users.json', userStringJson, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }

    res.send({"error":error});

})

// Post: /api/createchannel
app.post('/api/createChannel', function (req, res){

    // Setup new channel
    channel = {}
    channel.name = req.body.channelname;
    channel.users = req.body.channelusers;
    channel.groupname = req.body.groupname;
    channel.messages = [];
    
    var channelStringJson = fs.readFileSync('./channels.json', 'utf8');
    channels = JSON.parse(channelStringJson);
    
    channels.push(channel);
    channeladded = true;

    channelStringJson = JSON.stringify(channels);

    fs.writeFileSync('./channels.json', channelStringJson, function(err) {
        if(err) {
            channeladded = false;
            return console.log(err);
        }
    });
    res.send(channeladded);
})

// POST: /api/deleteGroup
app.post('/api/deleteGroup', function (req, res) {
    
    targetgroup = req.body.groupname;
    groupdeleted = false;

    // To filter deleted group out of groups
    function deletegroup(group) {
        if(group.groupname != targetgroup){
            return true;
        }else{
            groupdeleted = true;
            return false;
        }
    }

    // Stored groups
    let groups = JSON.parse(groupStringJson);
    groups = groups.filter(deletegroup);

    if(groupdeleted){
        groupStringJson = JSON.stringify(groups);
        fs.writeFileSync('./groups.json', groupStringJson, function(err) {
            if(err) {
                groupdeleted = false;
                return console.log(err);
            }
        });
    }

    res.send(groupdeleted);
})

// POST: /api/deletechannel
app.post('/api/deleteChannel', function (req, res) {
    
    targetchannel = req.body.channelname;
    channeldeleted = false;

    // To filter deleted channel out of channels
    function filterChannel(channel) {
        if(channel.channelname != targetchannel){
            return true;
        }else{
            channeldeleted = true;
            return false;
        }
    }

    // Stored channels
    let channels = JSON.parse(channelStringJson);
    channels = channels.filter(filterChannel);

    if(channeldeleted){
        channelStringJson = JSON.stringify(channels);
        fs.writeFileSync('./channels.json', channelStringJson, function(err) {
            if(err) {
                channeldeleted = false;
                return console.log(err);
            }
        });
    }

    res.send(channeldeleted);
})

// PUT: /api/editChannel
app.post('/api/editChannel', function (req, res) {

    var channelStringJson = fs.readFileSync('./channels.json', 'utf8');

    targetchannel = req.body.oldname;
    channeledited = false;

    // To filter channel that will be edited out
    // Channel is later replaced with updated channel
    function filterChannel(channel) {
        if(channel.channelname != targetchannel){
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
        "groupname": req.body.groupname,
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
    