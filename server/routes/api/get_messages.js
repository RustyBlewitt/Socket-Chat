module.exports = (app, db) => {

    app.post('/api/get_messages', function(req, res){
        if(!req.body) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('messages');
    
        // Expected body
        // {
        //     channel: String,
        // }

        const query = {
            "channel": req.body.channel,
        }

        collection.find(query).sort({ createdOn: -1}).toArray(function(err, result){
            if(result){
                console.log('Successful retrieval of messages.');
                result.forEach(doc => {
                    // Extract timestamp to base level property
                    doc.timestamp = doc._id.getTimestamp();
                });
                res.status(200).send(result);
            } else {
                res.status(500).send(err);
            }
        });
        
    });
};