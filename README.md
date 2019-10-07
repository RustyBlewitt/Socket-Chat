# Assignment Two - Chat application that you can chat on

#### Built by Rusty Blewitt | s5131071 | rusty.blewitt@griffithuni.edu.au

## To run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

From the server directory, run `npm start`.

From any directory in a separate terminal, run `mongod` to fire up the database and ensure you have a database created titled `chat`.

## Git approach

Leveraging Git's simple `git clone` command, bootstrapping this project from the Week 5 workshop project was a simple and efficient way to get moving.

Throughout development, regular commits were made using Git via the cli. Having such frequent commits allowed for worry free execution of `git reset --hard`, which gave me the freedom of backpedalling out of situations where my code would begin to look like spaghetti.

The layout of the Git repository is stock standard in that no major changes were made following bootstrapping an Angular project and initialising a node project for the server within.

## Data structures

The primary points of data: users and groups, were both structured as straightforward JS objects with references to the other within each.

This allowed for simple storage and retrieval of data within JSON files.

Channels, being the third most relevant class of data, are much the same but they keep references to both the users within the channel, and the group that the channel belongs to.

```javascript
Users{
    "level": number;
    "username": string;
    "password": string;
    "valid": boolean;
    "email": string;
    "groups": string[];
}

Groups{
    "group_name": string;
    "admins": string[];
    "assis": string[];
    "users": string[]
}

Channels{
    "name": string;
    "users": string[];
    "group_name": string;
    "messages": string[];
}
```

## Rest API

* <h4>attemptLogin</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/auth");

* <h4>createUser</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/createUser");

* <h4>createChannel</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/createChannel");

* <h4>createGroup</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/createGroup");

* <h4>getUsers</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/get_users");

* <h4>getAllGroups</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/all_groups");

* <h4>getAllChannels</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/get_channels");

* <h4>getChannelMessages</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/get_messages"); 
  
* <h4>updateChannel</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/update_channel"); 

* <h4>sendMessage</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/send_message"); 

* <h4>editChannel</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/editChannel");

* <h4>deleteChannel</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/delete_channel");

* <h4>deleteUser</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/delete_user");

* <h4>deleteGroup</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/deleteGroup");
  
* <h4>addUserImage</h4><span style="color: #66ff33">post</span>("http://localhost:3000/api/add_user_image");

## Angular architecture

Angular provided sound architecture for this project, allowing for fast generation of `component`s and `service`s through the Angular CLI.

Angular's `service` was heavily used as a `DataService`, which acted as a man in the middle for all outgoing API requests.

`Component`s were abundant and offered a simple and fast means to duplicating similar `forms` that were needed for the functionality of this application.

`Model`s were littered throughout the aforementioned `forms` in the application which enabled for pain free data binding. This ensured that the right data was always ready to fly when the user was ready to submit.

## State change

Changes in state through user interaction were handled as minimalistically as possible. To future proof this project, API requests were sent as sparsely as possible. This approach entailed working with the "local data" as often as possible and only sending the requests when a definitive user action was being made.
