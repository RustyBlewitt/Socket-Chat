module.exports = (app, db) => {
    app.post('/api/create_user', async function (req, res) {
        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.sendStatus(400);
        }

        const collection = db.collection('users');

        // Incoming body
        // {
        //     "email": String,
        //     "level": number,
        //     "name": "Newbie",
        //     "password": "password"
        // }

        
        // Check if email or password exists
        let existing;
        await collection.find({
            $or: [
                {'name': req.body.name},
                {'email': req.body.email}
            ]
        }).toArray().then((res) => {
            existing = res.length > 0 ? true : false;
        });

        // If user exists, send response and return early
        if(existing){
            console.log("Username or email already exists: ", req.body.name, req.body.email);
            return res.status(409).send({"message": "Username or email already exists."});
            
        }
        else{
            await collection.insertOne(req.body, function(err, result){
                if(result){
                    console.log('Successful user creation', result.result);
                    res.status(200).send(result.result);
                } else {
                    console.log('Issue: ', err);
                    res.status(500).send(err);
                }
            });        
        }
    })
}