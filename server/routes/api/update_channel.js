module.exports = (app, db) => {

    app.post('/api/update_channel', async function(req, res){
        if(!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('channels');
        
        // Incoming body
        // {
        //     old_name: String,
        //     new_name: String,
        //     group_name: String,
        //     users: String[],
        // }

        // Check if old channel name exists
        let existing;
        await collection.find({'channel_name': req.body.channel_name}).toArray().then((res) => {
            console.log('Here the result: ', res);
            existing = res.length > 0 ? true : false;
        });
        
        // If channel doesn't exist, send response and return early
        if(!existing){
            return res.status(404).send({'message': 'Channel doesnt exist.'});
        }
        else{
            const query = {
                'channel_name': `${req.body.channel_name}`
            }
            const updates = {
                $set: {
                    'users': req.body.users
                }
            }
            console.log('Query');
            console.log(query);
            console.log('Updates');
            console.log(updates);

            collection.update(query, updates, function(err, result){
                if(result){
                    console.log('Successful update', result.result);
                    res.status(200).send(result.result);
                } else {
                    console.log('Issue: ', err);
                    res.status(500).send(err);
                }
            });
        }     
    });
    
    }