module.exports = (app, db) => {

    app.post('/api/get_groups', function(req, res){
        if(!req.body.query) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('groups');
        
        // Incoming body
        // {
        //     query: {},
        // }
        
        const query = req.body.query;

        collection.find(query).toArray(function(err, result_array){
            if(result_array){
                console.log('Successful retrieval of channel/s.');
                res.status(200).send(result_array);
            } else {
                console.log('Issue: ', err);
                res.status(500).send(err);
            }
        
        });
    
    })
}