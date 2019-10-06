import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { IUser, INetResponse } from '../interfaces';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  constructor(private router: Router, private dataservice: DataService) { 
    this.error = null;
    this.level = 0;
  }

  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  level: number;
  error: string | null;

  ngOnInit() {
  }

  create(event) {
    event.preventDefault();

    var form = <HTMLElement> document.querySelector(".createuser-form");

    this.dataservice.createUser(this.username, this.password, this.email, this.level).subscribe(
      (res: any ) => {
        console.log('reso', res);
        this.router.navigate(['/home']);
      }, (err: any) => {
        err.status = 409 ? this.error = "username or email already exists" : "Internal server error, try again later.";
        });
  }

  changeLvl(lvl){
    this.level = lvl;
    let lvlSelectors = ["lvl0 ", "lvl1 ", "lvl2 ", "lvl3 "];
    let normalSelectors = "lvlbtn btn btn-primary ";

    // For each option
    lvlSelectors.forEach( (sel) => {
      // Reset classes
      document.querySelector("."+sel).setAttribute("class", sel + normalSelectors);
    })

    // Add active to chosen option
    document.querySelector("."+lvlSelectors[lvl]).setAttribute("class", "active " + normalSelectors + lvlSelectors[lvl]);
  }

  cancel(event) {
    event.preventDefault();
    this.router.navigate(['./home']);
  }

}
