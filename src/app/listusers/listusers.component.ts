import { Component, OnInit } from '@angular/core';
import { IUser } from './../interfaces'
import { DataService } from './../data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  ready: boolean;
  userlist: IUser[] | null;
  level: string[];
  router: Router;

  constructor(dataservice: DataService, router: Router) { 
    this.router = router;
    this.userlist = null;
    this.level = ["Regular user", "Group assis", "Group admin", "Super user"];
    dataservice.getAllUsers().subscribe( (userlist: IUser[]) =>{
      this.userlist = userlist;
    });
  }

  home(event){
    event.preventDefault();
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }
}
