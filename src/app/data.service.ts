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
    return this.http.post('http://localhost:3000/api/auth', {'username': username, 'password': password});
  }

  createUser(username, password, email, level, image?){
    return this.http.post('http://localhost:3000/api/create_user', {'username': username, 'password': password, 'email': email, image: image || "",'level': level, 'groups':[]});
  }

  createChannel(channel_name, users, group_name){
    return this.http.post('http://localhost:3000/api/create_channel', {'channel_name': channel_name, 'users': users, 'group_name': group_name});
  }

  createGroup(group_name, users, assis, admins){
    return this.http.post('http://localhost:3000/api/create_group', {'group_name': group_name, 'users': users, 'assis': assis, 'admins': admins});
  }

  getAllUsers(){
    return this.http.post('http://localhost:3000/api/get_users', {'query': {}});
  };
  
  getAllGroups(){
    return this.http.post('http://localhost:3000/api/get_groups', {'query': {}});
  }

  getAllChannels(){
    return this.http.post('http://localhost:3000/api/get_channels', {'query': {}});
  }

  getChannelMessages(channel_name){
    return this.http.post('http://localhost:3000/api/get_messages', {'channel_name': channel_name})
  }

  updateChannel(old_name, new_name, users, group_name){
    return this.http.post('http://localhost:3000/api/update_channel', {'old_name': old_name, 'new_name': new_name, 'users': users, 'group_name':group_name});
  }

  sendMessage(channel_name, message, user){
    return this.http.post('http://localhost:3000/api/send_message', {'channel_name': channel_name, 'message': message, 'user': user});
  }
  
  deleteChannel(channel_name){
    return this.http.post('http://localhost:3000/api/delete_channel', {'channel_name': channel_name});
  }

  deleteUser(username){
    return this.http.post('http://localhost:3000/api/delete_user', {'username': username});
  }

  deleteGroup(group_name){
    return this.http.post('http://localhost:3000/api/delete_group', {'group_name': group_name});
  }

  addUserImage(username, image){ 
    return this.http.post('http://localhost:3000/api/add_user_image', {'username': username, 'image': image});
  }

}
