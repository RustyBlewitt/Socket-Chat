import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'week5';
  updateActive(target) {
    document.querySelectorAll('.nav-link').forEach((el) => el.setAttribute("class", "nav-link"));
    document.querySelector(target).setAttribute("class", "nav-link active");
  }
}