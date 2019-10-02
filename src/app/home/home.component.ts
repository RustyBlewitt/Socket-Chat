import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { DataService } from './../data.service';
import { IUser } from './../interfaces';
import { AppComponent } from './../app.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  level = ['Regular User', 'Group Assis', 'Group Admin', 'Super Admin'];

  User: IUser;
  router: Router;
  userLoggedIn: boolean;
  appComp: AppComponent;

  constructor(router: Router, appComp: AppComponent) {
    this.User= JSON.parse(sessionStorage.getItem('user'));
    this.router = router;
    this.appComp = appComp;
    this.userLoggedIn = this.User != null;
    this.userLoggedIn ? console.log("Welcome home, " + this.User) : this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.appComp.updateActive("#home-link");
  }

  createUser(){
    this.router.navigate(['./createuser']);
  }

  deleteGroup(){
    this.router.navigate(['./deletegroup']);
  }
  
  editChannelUsers(){
    this.router.navigate(['./editchannel']);
  }

  listUsers(){
    this.router.navigate(['./userlist']);
  }

  deleteUser(){
    this.router.navigate(['./deleteuser']);
  }
  
  createGroup(){
    this.router.navigate(['./creategroup']);
  }

  createChannel(){
    this.router.navigate(['./createchannel']);
  }

  deleteChannel(){
    this.router.navigate(['./deletechannel']);
  }

  unhandled(){
    console.log("This button not handled yet");
  }

}
