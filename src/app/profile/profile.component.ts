import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { DataService } from './../data.service';
import { IUser } from '../interfaces';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  User: IUser = JSON.parse(sessionStorage.getItem('user'));
  allUsers: IUser[] | null = null;
  level = ['Regular User', 'Group Assis', 'Group Admin', 'Super Admin'];


  constructor(public router: Router, dataservice: DataService, appComp: AppComponent) {
    if(this.User){
      console.log("User found.\n User level: ", this.User.level, " allUsers: ", this.allUsers);

      // Can view other users if over a certain level
      if(this.User.level > 0){
        dataservice.getAllUsers().subscribe(
          (res:IUser[]) => {
            this.allUsers = res;
          }
        )
      }
    }
    else{
      router.navigate(['/login']);
      console.log('Could not find user.\n');
    }

    appComp.updateActive("#profile-link");

  }

  ngOnInit() {
    
  }

  public logout(event){
    console.log('Logging out ', this.User.username);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
