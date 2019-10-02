import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { IUser }from './../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {

  dataservice: DataService
  userlist: IUser[] | null;
  router: Router;
  error: string;

  constructor(dataservice: DataService, router: Router) { 
    this.userlist = null;
    this.dataservice = dataservice;
    this.router = router;

    dataservice.getAllUsers().subscribe( (users: IUser[]) => {
      this.userlist = users;
    })
  }

  // Execute delete through dataservice
  delete(event, user){
    event.preventDefault();
    this.dataservice.deleteUser(user.username).subscribe(
      res => {
        console.log(res, " deletion of ", user);
        res ? this.router.navigate(['home']) : this.error = "Error deleting user";
    }
    )
  }

  // Cancel and return home
  cancel(event){
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
