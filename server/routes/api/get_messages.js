module.exports = (app, db) => {

    app.post('/api/get_messages', function(req, res){
        if(!req.body.query.channel) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('messages');
    
        // Incoming body
        // {
        //     channel: String,
        // }

        const query = {
            "channel": req.body.channel,
        }

        collection.find(query).sort({ createdOn: -1}).toArray(function(err, result_array){
            if(result_array){
                // For each message...
                result_array.forEach(msg => {
                    // Extract timestamp to base level property
                    msg.timestamp = msg._id.getTimestamp();
                });
                console.log('Successful retrieval of messages.');
                return res.status(200).send(result_array);
            } else {
                console.log('Issue: ', err);
                return res.status(500).send(err);
            }
        });
        
    });
};