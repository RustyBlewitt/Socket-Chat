module.exports = (app, db) => {

    app.post('/api/delete_user', function(req, res){
        if(!req.body.username) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('users');
    
        // Incoming body
        // {
        //     username: String,
        // }

        collection.deleteOne({'username': req.body.username}, function(err, result){
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