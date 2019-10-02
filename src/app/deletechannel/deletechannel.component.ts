import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deletechannel',
  templateUrl: './deletechannel.component.html',
  styleUrls: ['./deletechannel.component.css']
})
export class DeletechannelComponent implements OnInit {

  dataservice: DataService
  channellist: any[] | null;
  router: Router;
  error: string;

  constructor(dataservice: DataService, router: Router) { 
    this.channellist = null;
    this.dataservice = dataservice;
    this.router = router;

    dataservice.getAllChannels().subscribe( (channels: any[]) => {
      this.channellist = channels;
    })
  }

  delete(event, channelname){
    event.preventDefault();
    this.dataservice.deleteChannel(channelname).subscribe(
      res => {
        console.log(res, " deletion of ", channelname);
        res ? this.router.navigate(['home']) : this.error = "Error deleting channel";
    }
    )
  }

  cancel(event){
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
