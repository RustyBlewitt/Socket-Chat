import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { IUser } from './../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {

  userlist: IUser[] | null;
  router: Router;
  groupname: string;

  usersToAdd: string[];
  dataService: DataService;

  error: string;

  constructor(dataService: DataService, router: Router) { 
    this.error = null;
    this.userlist = null;
    this.router = router;
    this.usersToAdd = [];
    this.dataService = dataService;
    dataService.getAllUsers().subscribe(
      (res: IUser[]) => {
        this.userlist = res;
      }
    )
  }

  cancel(event){
    event.preventDefault();
    this.router.navigate(['home']);
  }

  // Create group through dataservice
  create(event){
    this.error = null;
    if (this.groupname == null){
      this.error = "Group name required";
      return;
    }
    if (this.usersToAdd.length == 0){
      this.error = "Add users by clicking on their names";
      return;
    }
    event.preventDefault();
    this.dataService.createGroup(this.groupname, this.usersToAdd, [], []).subscribe(
      (res: any) => {
        if(res.error){
          this.error = res.error;
        }else{
          this.router.navigate(['home']);
        }
      }
    )
  }
  
  // Toggle selected / unselected users
  toggleuser(event, username){
    event.preventDefault();
    if(this.usersToAdd.indexOf(username) > -1){
      document.querySelector('#'+username).setAttribute('class', 'btn btn-primary unselected');
      this.usersToAdd = this.usersToAdd.filter( (u) => u != username);
    }else{
      document.querySelector('#'+username).setAttribute('class', 'btn btn-primary selected');
      this.usersToAdd.push(username);
    }
  }

  ngOnInit() {
  }

}
