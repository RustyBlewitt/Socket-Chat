import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';
import { IUser } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})


export class GroupsComponent implements OnInit {

User: IUser = JSON.parse(sessionStorage.getItem('user'));
  
  constructor( dataService: DataService, appComp: AppComponent, router: Router) {
    if(!this.User){
      router.navigate(['/login']);
    }
    // Update active link in nav bar
    appComp.updateActive("#groups-link");
    
    this.dataService = dataService;
    dataService.getAllGroups().subscribe(
      (res: any) => {
        console.log('Here my res: ', res);
        this.groups = res;
      },
      (err: any) => {
        this.error_msg = err.message;
      }
    );


  }

  dataService: DataService;
  groups: Object[];
  error_msg: String | null;

  ngOnInit() {
  }

}
