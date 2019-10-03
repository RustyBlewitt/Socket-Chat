module.exports = (app, db) => {

    app.post('/api/get_users', function(req, res){
        if(!req.body) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('users');
    
        // Expected body
        // {
        //     query: {},
        // }

        const query = req.body.query;

        collection.find(query).toArray(function(err, result){
            if(result){
                console.log('Successful retrieval of users.');
                res.status(200).send(result);
            } else {
                res.status(500).send(err);
            }
        });
        
    });
};