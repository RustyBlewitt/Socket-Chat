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
  User: IUser = JSON.parse(sessionStorage.getItem('user'));
  allUsers: IUser[] | null = null;
  level = ['Regular User', 'Group Assis', 'Group Admin', 'Super Admin'];
  selectedFileSrc: String | null;
  selectedFileFile: File | null;
  dataService: DataService;
  domSan: DomSanitizer;

  // currentImgBinary: String | null;
  currentImgBinary: any | null;
  
  constructor(public router: Router, dataService: DataService, domSan: DomSanitizer, appComp: AppComponent) {
    
    this.dataService = dataService;
    this.domSan = domSan;
    
    if(this.User){
      console.log("User found.\n User level: ", this.User.level, " allUsers: ", this.allUsers);
      
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
      
      this.selectedFileSrc = event.target.result
      this.selectedFileFile =  file;

    })
        
    reader.readAsDataURL(file);
    }

  public logout(event){
    console.log('Logging out ', this.User.username);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
