module.exports = (app, db) => {

    app.post('/api/add_user_image', function(req, res){
        if(!req.body.username) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('users');
    
        // Incoming body
        // {
        //      username: string
        //      dp: string(base64img)
        // }

        collection.update(
            {'username': req.body.username}, 
            {$set: 
                {'user_image': req.body.image}
            },
            function(err, result){
                if(result){
                    if(result.n == 0){
                        console.log('User not found for editing.', result.result);
                        return res.status(404).send({"message": "User not found"});
                    } else {
                        console.log('Successful update.', result.result);
                        return res.status(200).send(result.result);
                    }
                } else {
                    console.log('Issue: ', err);
                    res.status(500).send(err);
                }
        })
        
    });
};