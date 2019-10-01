// module.exports = (app, db) => {


// TODO: but should put users in db first


//     app.post('/api/auth', function(req, res){
//         if(!req.body) {
//             return res.sendStatus(400);
//         }
//         console.log('Request received: ', req.body);
//         const collection = db.collection('messages');
        
//         // Expected body
//         // {
//         //     channel: String,
//         //     message: String,
//         //     user: String,
//         //     date: Number, [YYYYMMDD]
//         //     seconds: Number, 
//         // }
        
//         collection.insertOne(req.body, function(err, result){
//             if(result){
//                 console.log('Successful insertion', result.result);
//                 res.status(200).send(result.result);
//             } else {
//                 console.log('Issue: ', err);
//                 res.status(500).send(err);
//             }
//         });
        
//     });
    
//     }

//     // app.post('/api/auth', function (req, res) {
//     //     if (!req.body) {
//     //         return res.sendStatus(400);
//     //     }
    
//     //     // Stored users, string to object
//     //     var userStringJson = fs.readFileSync('./users.json', 'utf8');
//     //     let users = JSON.parse(userStringJson);
    
//     //     // Attempted login becomes a user object, initially set to invalid.
//     //     let attemptedUser = {
//     //         username: req.body.username,
//     //         password: req.body.password,
//     //         valid: false
//     //     };
    
//     //     // Iterate through users to check if attempted user login is valid.
//     //     // attemptedUser is replaced with valid user if attempted user is valid.
//     //     for (i in users) {
//     //         if (attemptedUser.username == users[i].username && attemptedUser.password == users[i].password) {
//     //             attemptedUser = users[i];
//     //         }
//     //     }
        
//     //     // Log whether login was successful or not
//     //     attemptedUser.valid ? console.log('User login succesful for: ', attemptedUser)
//     //         : console.log('User login unsuccesful for: ', attemptedUser);
        
//     //     // Post back attemptedUser object
//     //     res.send(attemptedUser);
//     // })