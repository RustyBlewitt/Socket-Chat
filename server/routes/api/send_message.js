module.exports = (app, db) => {

    app.post('/api/send_message', function(req, res){
        if(!req.body.message || !req.body.channel_name || !req.body.user) {
            console.log('Bad request');
            return res.sendStatus(400);
        }
        console.log('New message received: ', req.body);
        const collection = db.collection('messages');
        
        // Incoming body
        // {
        //     channel_name: String,
        //     message: String,
        //     user: String,
        // }
        
        collection.insertOne(req.body, function(err, result){
            if(result){
                console.log('Successful insertion', result.result);
                res.status(200).send(result.result);
            } else {
                console.log('Issue: ', err);
                res.status(500).send(err);
            }
        });
        
    });
    
    }