import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-channel-container',
  templateUrl: './channel-container.component.html',
  styleUrls: ['./channel-container.component.css']
})
export class ChannelContainerComponent implements OnInit {


  constructor( dataService: DataService, appComp: AppComponent) {
    // Update active link in nav bar
    appComp.updateActive('#channels-link');

    this.dataService = dataService;
    dataService.getAllChannels().subscribe(
      (res: any) => {
        console.log('Here my res: ', res);
        this.channels = res;
      },
      (err: any) => {
        this.error_msg = err.message;
      }
    );
  }

  current_channel: any | null;
  dataService: DataService;
  channels: any[];
  error_msg: String | null;

  ngOnInit() {
  }

  select_channel(event, channel_name) {
    event.preventDefault();
    for(let c in this.channels){
      if(this.channels[c].channel_name == channel_name){
        this.current_channel = this.channels[c];
      }
    }

  }

}
