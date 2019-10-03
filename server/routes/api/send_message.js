module.exports = (app, db) => {

    app.post('/api/send_message', function(req, res){
        if(!req.body) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('messages');
        
        // Incoming body
        // {
        //     channel: String,
        //     message: String,
        //     user: String,
        //     date: Number, [YYYYMMDD]
        //     groups: String[],
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