module.exports = (app, db) => {

    app.post('/api/auth', function(req, res){
        if(!req.body.username && !req.body.password) {
            return res.sendStatus(400);
        }
        console.log('Request received: ', req.body);
        const collection = db.collection('users');
    
        // Incoming body
        // {
        //     username: string,
        //     password: string,
        // }


        // Look for a corresponding user with given name and pw
        collection.find({
            $and: [ {'username': req.body.username}, {'password': req.body.password}]
        }).toArray(function(err, result_array){
            if(result_array.length > 0){
                console.log('Login successful');
                return res.status(200).send(result_array[0]);
            } else if(err){
                console.log('Internal error during authentication');
                return res.status(500).send({"message": "Internal error during authentication"});
            }else{
                console.log('Invalid username or password');
                return res.status(401).send({"message":"Invalid username or password"});
            }
        })
    });
};