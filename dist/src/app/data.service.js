import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DataService = class DataService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.loginError = true;
    }
    attemptLogin(username, password) {
        return this.http.post("http://localhost:3000/api/auth", { 'username': username, 'password': password });
    }
    createUser(username, password, email, level) {
        return this.http.post("http://localhost:3000/api/createUser", { 'username': username, 'password': password, 'email': email, 'level': level, 'groups': [] });
    }
    createChannel(channel_name, channelusers, group_name) {
        return this.http.post("http://localhost:3000/api/createChannel", { 'channel_name': channel_name, 'channelusers': channelusers, 'group_name': group_name });
    }
    createGroup(group_name, users, assis, admins) {
        return this.http.post("http://localhost:3000/api/createGroup", { 'group_name': group_name, 'users': users, 'assis': assis, 'admins': admins });
    }
    getAllUsers() {
        return this.http.get("http://localhost:3000/api/allUsers");
    }
    ;
    getAllGroups() {
        return this.http.get("http://localhost:3000/api/allGroups");
    }
    getAllChannels() {
        return this.http.get("http://localhost:3000/api/allChannels");
    }
    editChannel(oldname, newname, users, group_name) {
        return this.http.post("http://localhost:3000/api/editChannel", { 'oldname': oldname, 'newname': newname, 'users': users, 'group_name': group_name });
    }
    deleteChannel(channel_name) {
        return this.http.post("http://localhost:3000/api/deleteChannel", { 'channel_name': channel_name });
    }
    deleteUser(username) {
        return this.http.post("http://localhost:3000/api/deleteUser", { 'username': username });
    }
    deleteGroup(group_name) {
        return this.http.post("http://localhost:3000/api/deleteGroup", { 'group_name': group_name });
    }
};
DataService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map