module.exports = (app, db, ObjectID) => {

    app.post('/api/delete_message', function(req, res){
        if(!req.body) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('messages');
    
        // Incoming body
        // {
        //     _id: String,
        // }

        const id = new ObjectID(req.body._id);

        const query = {
            _id: id,
        }

        collection.deleteOne(query, function(err, result){
            if(result){
                console.log('Successful delete.', result.result);
                res.status(200).send(result.result);
            } else {
                res.status(500).send(err);
            }
        })
        
    });
};