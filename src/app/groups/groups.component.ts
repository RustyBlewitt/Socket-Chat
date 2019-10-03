import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor( dataService: DataService, appComp: AppComponent ) {
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
