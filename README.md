# Assignment Two - Chat application that you can chat on

#### Built by Rusty Blewitt | s5131071 | rusty.blewitt@griffithuni.edu.au

## To run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

From the server directory, run `npm start`.

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
    "level": number;        // This number indicates the users level of privilege
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
    "messages": string[];   // Assignment 2 will involve actual chat
}
```

## Rest API

* <h4>getAllUsers</h4><span style="color: #66ff33">get</span>("http://localhost:3000/api/allUsers");

* <h4>getAllGroups</h4><span style="color: #66ff33">get</span>("http://localhost:3000/api/allGroups");

* <h4>getAllChannels</h4><span style="color: #66ff33">get</span>("http://localhost:3000/api/allChannels");

* <h4>attemptLogin</h4><span style="color: #6633ff">post</span>("http://localhost:3000/api/auth", {'username': username, 'password': password});

* <h4>createUser</h4><span style="color: #6633ff">post</span>("http://localhost:3000/api/createUser", {'username': username, 'password': password, 'email': email, 'level': level, 'groups':[]});

* <h4>createChannel</h4><span style="color: #6633ff">post</span>("http://localhost:3000/api/createChannel", {'channel_name': channel_name, 'channelusers': channelusers, 'group_name': group_name});

* <h4>createGroup</h4><span style="color: #6633ff">post</span>("http://localhost:3000/api/createGroup", {'group_name': group_name, 'users': users,       'assis': assis, 'admins': admins});

* <h4>editChannel</h4><span style="color: #6633ff">post</span>("http://localhost:3000/api/editChannel", {'old_name': old_name, 'new_name': new_name, 'users': users, 'group_name':group_name});

* <h4>deleteChannel</h4><span style="color: #6633ff">post</span>("http://localhost:3000/api/deleteChannel", {'channel_name': channel_name});

* <h4>deleteUser</h4><span style="color: #6633ff">post</span>("http://localhost:3000/api/deleteUser", {'username': username});

* <h4>deleteGroup</h4><span style="color: #6633ff">post</span>("http://localhost:3000/api/deleteGroup", {'group_name': group_name});

## Angular architecture

Angular provided sound architecture for this project, allowing for fast generation of `component`s and `service`s through the Angular CLI.

Angular's `service` was heavily used as a `DataService`, which acted as a man in the middle for all outgoing API requests.

`Component`s were abundant and offered a simple and fast means to duplicating similar `forms` that were needed for the functionality of this application.

`Model`s were littered throughout the aforementioned `forms` in the application which enabled for pain free data binding. This ensured that the right data was always ready to fly when the user was ready to submit.

## State change

Changes in state through user interaction were handled as minimalistically as possible. To future proof this project, API requests were sent as sparsely as possible. This approach entailed working with the "local data" as often as possible and only sending the requests when a definitive user action was being made.
