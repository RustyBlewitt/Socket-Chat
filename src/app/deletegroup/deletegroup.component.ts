import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-deletegroup',
  templateUrl: './deletegroup.component.html',
  styleUrls: ['./deletegroup.component.css']
})
export class DeletegroupComponent implements OnInit {

  groups: any[] | null;
  router: Router;
  dataservice: DataService;
  error: string | null;

  constructor(router: Router, dataservice: DataService) {
    this.router = router;
    this.dataservice = dataservice;
    dataservice.getAllGroups().subscribe(
      (res: any) => {
        this.groups = res;
      }
    )
   }
   
  delete(event, name){
    event.preventDefault();
    this.dataservice.deleteGroup(name).subscribe(
      (res) => {
        if(res){
          this.dataservice.getAllGroups().subscribe(
            (res: any) => {
              this.groups = res;
            }
          )
          }else{
            this.error = "Failed to delete";
          }
      }
    )
  }

  ngOnInit() {
  }

}
