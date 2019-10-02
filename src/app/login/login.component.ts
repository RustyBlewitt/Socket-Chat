import { IUser } from '../interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from './../app.component'
import { DataService } from './../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private dataservice: DataService, appC: AppComponent) {
    this.error = false;
    this.allUsers = null;
    appC.updateActive("#login-link");
  }

  username: string;
  password: string;
  allUsers: object | null;
  error: boolean;
  level: number;

  ngOnInit() {
  }

  login(event) {
    event.preventDefault();

    var form = <HTMLElement> document.querySelector(".login-form");
    form.classList.toggle('bounce'); // Flick off
    form.classList.toggle('bounce'); // Flick on to activate animation

    this.dataservice.attemptLogin(this.username, this.password).subscribe(
      (user: IUser) => {
        console.log("this response ", user);
        if (user.valid){
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        } else {
          this.error = true;
        }
      }
    )
  }

}
