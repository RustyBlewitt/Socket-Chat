import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { DataService } from './../data.service';
import { IUser } from '../interfaces';
import { AppComponent } from '../app.component';
import { Buffer } from '../../../node_modules/buffer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  User: IUser;
  allUsers: IUser[] | null = null;
  level = ['Regular User', 'Group Assis', 'Group Admin', 'Super Admin'];
  user_image: string | null;
  dataService: DataService;
  domSan: DomSanitizer;
  errorMsg: string | null;
  
  constructor(public router: Router, dataService: DataService, domSan: DomSanitizer, appComp: AppComponent) {
    this.User= JSON.parse(sessionStorage.getItem('user'));
    this.dataService = dataService;
    this.domSan = domSan;
    
    if(this.User){
      this.user_image = this.User.user_image;
      // Can view other users if over a certain level
      if(this.User.level > 0){
        dataService.getAllUsers().subscribe((res:IUser[]) => {
          this.allUsers = res;
        })
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
  
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    
    reader.addEventListener('load', (event: any) => {
      this.user_image = event.target.result
      this.dataService.addUserImage(this.User.username, this.user_image).subscribe(
        (res) => {
          console.log('Successful upload');
          this.User.user_image = this.user_image;
          sessionStorage.setItem('user', JSON.stringify(this.User));
        },
        (err) => {
          this.errorMsg = "Failed to upload image";
        }
      )
    })
        
    reader.readAsDataURL(file);
    
  }
    

  public logout(event){
    console.log('Logging out ', this.User.username);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
