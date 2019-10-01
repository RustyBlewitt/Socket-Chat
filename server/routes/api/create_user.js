module.exports = (app, db) => {
    app.post('/api/create_user', async function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        const collection = db.collection('users');

        // Check if email or password exists
        let existing = false;

        await collection.find({
            $or: [
                {'name': req.body.name},
                {'email': req.body.email}
            ]
        // }).toArray(function(err, result){
        //     if ( result.length > 0 ){
        //         console.log('Result len: ', result.length);
        //         existing = true;
        //     }
        // })

        }).toArray().then((res) => {
            existing = res.length > 0 ? true : false;
        });
    // })

        console.log("Is it existing?: ", existing);
        // If user exists, send response and return early
        if(existing){
            res.status(200).send({"success": false, "message": "Username or email already exists."});
            return;
        }
        else{
            await collection.insertOne(req.body, function(err, result){
                if(result){
                    console.log('Successful insertion', result.result);
                    res.status(200).send(result.result);
                } else {
                    console.log('Issue: ', err);
                    res.status(500).send(err);
                }
            });        
        }

        // console.log(existing);

        // // Set up the response that will be sent to requesting user
        // let netResponse = {'user': {}};
        // netResponse.message = "Success";
        // netResponse.success = true;
        // netResponse.user.level = req.body.level;
        // netResponse.user.username = req.body.username;
        // netResponse.user.password = req.body.password;
        // netResponse.user.valid = true;
        // netResponse.user.email = req.body.email;
        // netResponse.user.groups = [];

        // // Iterate through users to check if attempted users name or email already exists.
        // for (i in users) {
        //     if (netResponse.user.username == users[i].username){
        //         netResponse.success = false;
        //         netResponse.user.valid = false;
        //         netResponse.message = "Username is already in use."
        //     }else{
        //         if (netResponse.user.email != null && netResponse.user.email == users[i].email){
        //             netResponse.success = false;
        //             netResponse.user.valid = false;
        //             netResponse.message = "Email is already in use."
        //         }
        //     }
        // }

        // // Add the new user to the data file
        // if (netResponse.user.valid == true) {
        //     users.push(netResponse.user);
        //     userStringJson = JSON.stringify(users);
        //     fs.writeFileSync('./users.json', userStringJson, function(err) {
        //         if(err) {
        //             return console.log(err);
        //         }
        //     });
        // }

    })
}