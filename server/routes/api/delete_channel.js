module.exports = (app, db) => {

    app.post('/api/delete_channel', async function(req, res){
        if(!req.body.channel_name) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('channels');
        
        // Incoming body
        // {
        //     channel_name: String,
        // }

        collection.deleteOne(req.body, function(err, result){
            if(result){
                if(result.n == 0){
                    // If channel doesn't exist, send response and return early
                    console.log('Channel not found ', result.result);
                    return res.status(404).send({"message": "Channel not found"});
                } else {
                    console.log('Successful delete ', result.result);
                    return res.status(200).send(result.result);
                }
            } else {
                console.log('Issue: ', err);
                res.status(500).send(err);
            }
        });
    });
}