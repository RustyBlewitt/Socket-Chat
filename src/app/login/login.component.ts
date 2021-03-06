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

  constructor(private router: Router, private dataservice: DataService, appComp: AppComponent) {
    this.error = false;
    this.allUsers = null;
    appComp.updateActive("#login-link");
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
    // form.classList.toggle('shake'); // Flick off
    // form.classList.toggle('shake'); // Flick on to activate animation

    this.dataservice.attemptLogin(this.username, this.password).subscribe(
      (data: any) => {
          this.error = false;
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/home']);
      },
      (err: any) => {
        console.log("Erroring out bro", err);
        form.classList.toggle('shake'); // Flick off
        form.classList.toggle('shake'); // Flick on to activate animation
        this.error = true;
      }
    )
  }

}
