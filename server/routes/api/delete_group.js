module.exports = (app, db) => {

    app.post('/api/delete_group', async function(req, res){
        if(!req.body.group_name) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('groups');
        
        // Incoming body
        // {
        //     group_name: String,
        // }

        collection.deleteOne(req.body, function(err, result){
            if(result){
                console.log('result: ', result);
                if(result.result.n == 0){
                    // If group doesn't exist, send response and return early
                    console.log('Group not found ', req.body.group_name);
                    return res.status(404).send({"message": "Group not found"});
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