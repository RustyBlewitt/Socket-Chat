module.exports = (app, db) => {

    app.post('/api/create_channel', function(req, res){
        if(!req.body) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('channels');
        
        // Incoming body
        // {
        //     channelname: String,
        //     groupname: String,
        //     users: String[],
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