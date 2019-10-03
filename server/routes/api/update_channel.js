module.exports = (app, db) => {

    app.put('/api/update_channel', async function(req, res){
        if(!req.body.old_name || !req.body.users || !req.body.group_name || !req.body.new_name) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
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
        await collection.find({'old_name': req.body.channel_name}).toArray().then((res) => {
            console.log('Here the result: ', res);
            existing = res.length > 0 ? true : false;
        });

        // If channel doesn't exist, send response and return early
        if(!existing){
            return res.status(404).send({'message': 'Channel doesnt exist.'});
        }
        else{
            const query = {
                'channel_name': req.body.old_name
            }
            const updates = {
                'channel_name': req.body.new_name,
                'users': req.body.users,
                'group_name': req.body.group_name
            }

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