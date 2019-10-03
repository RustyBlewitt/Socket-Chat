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
        }).toArray().then((res) => {
            existing = res.length > 0 ? true : false;
        });

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
    })
}