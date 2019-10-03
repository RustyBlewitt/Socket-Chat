module.exports = (app, db, ObjectID) => {

    app.post('/api/delete_user', function(req, res){
        if(!req.body._id) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('users');
    
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
                if(result.n == 0){
                    console.log('User not found for deletion.', result.result);
                    return res.status(404).send({"message": "User not found"});
                } else {
                    console.log('Successful delete.', result.result);
                    return res.status(200).send(result.result);
                }
            } else {
                console.log('Issue: ', err);
                res.status(500).send(err);
            }
        })
        
    });
};