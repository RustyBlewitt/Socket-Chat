import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class DataService {
  
  loginError: boolean ;

  constructor(private router: Router, private http: HttpClient) { 
    this.loginError = true;
  }

  attemptLogin(username, password){
    return this.http.post("http://localhost:3000/api/auth", {'username': username, 'password': password});
  }

  createUser(username, password, email, level){
    return this.http.post("http://localhost:3000/api/createUser", {'username': username, 'password': password, 'email': email, 'level': level, 'groups':[]});
  }

  createChannel(channelname, channelusers, groupname){
    return this.http.post("http://localhost:3000/api/createChannel", {'channelname': channelname, 'channelusers': channelusers, 'groupname': groupname});
  }

  createGroup(groupname, users, assis, admins){
    return this.http.post("http://localhost:3000/api/createGroup", {'groupname': groupname, 'users': users, 'assis': assis, 'admins': admins});
  }

  getAllUsers(){
    return this.http.get("http://localhost:3000/api/allUsers");
  };
  
  getAllGroups(){
    return this.http.get("http://localhost:3000/api/allGroups");
  }

  getAllChannels(){
    return this.http.get("http://localhost:3000/api/allChannels");
  }

  editChannel(oldname, newname, users, groupname){
    return this.http.post("http://localhost:3000/api/editChannel", {'oldname': oldname, 'newname': newname, 'users': users, 'groupname':groupname});
  }

  deleteChannel(channelname){
    return this.http.post("http://localhost:3000/api/deleteChannel", {'channelname': channelname});
  }

  deleteUser(username){
    return this.http.post("http://localhost:3000/api/deleteUser", {'username': username});
  }

  deleteGroup(groupname){
    return this.http.post("http://localhost:3000/api/deleteGroup", {'groupname': groupname});
  }

}
