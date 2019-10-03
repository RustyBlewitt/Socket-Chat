module.exports = (app, db) => {

    app.post('/api/create_channel', async function(req, res){
        if(!req.body) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('channels');
        
        // Incoming body
        // {
        //     channel_name: String,
        //     group_name: String,
        //     users: String[],
        // }

        // Check if channel name exists
        let existing;
        await collection.find({'channel_name': req.body.channel_name}).toArray().then((res) => {
            console.log("Here the result: ", res);
            existing = res.length > 0 ? true : false;
        });

        // If channel exists, send response and return early
        if(existing){
            return res.status(409).send({"message": "Channel already exists."});
        }
        else{
            collection.insertOne(req.body, function(err, result){
                if(result){
                    console.log('Successful insertion', result.result);
                    res.status(200).send(result.result);
                } else {
                    console.log('Issue: ', err);
                    res.status(500).send(err);
                }
            });
        }     
    });
    
    }