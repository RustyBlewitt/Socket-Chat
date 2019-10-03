import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';
import { IUser } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-container',
  templateUrl: './channel-container.component.html',
  styleUrls: ['./channel-container.component.css']
})
export class ChannelContainerComponent implements OnInit {

  User: IUser = JSON.parse(sessionStorage.getItem('user'));
  
  constructor( dataService: DataService, appComp: AppComponent, router: Router) {
    if(!this.User){
      router.navigate(['/login']);
    }

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
  messages: any[] | null;

  ngOnInit() {
  }

  select_channel(event, channel_name) {
    event.preventDefault();
    for(let c in this.channels){
      // For channel that was clicked on
      if(this.channels[c].channel_name == channel_name){
        // Set current_channel to clicked on channel
        this.current_channel = this.channels[c];
        this.messages = null;
        // Retrieve clicked on channel's messages
        this.dataService.getChannelMessages(channel_name).subscribe(
          (res: any) => {
            console.log('Here my res: ', res);
            this.messages = res;
          },
          (err: any) => {
            this.error_msg = err.message;
          }
        );
      }
    }
  }

  exit_channel(event){
    event.preventDefault();
    this.current_channel = null;
  }

}
