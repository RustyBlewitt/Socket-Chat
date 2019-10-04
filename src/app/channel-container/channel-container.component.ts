import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SocketService } from '../socket.service';
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
  
  constructor( private socketService: SocketService, dataService: DataService, appComp: AppComponent, router: Router) {
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

  message_content: string;
  // messages: string[];
  ioConnection: any;
  current_channel: any | null;
  dataService: DataService;
  channels: any[];
  error_msg: String | null;
  messages: any[] | null;

  ngOnInit() {
    this.initIoConnection();
  }


  private chat(event){
    event.preventDefault();
    if(this.message_content){
      const channel_name = this.current_channel.channel_name;
      const message = this.message_content;
      const user_name = this.User.username;
      console.log('Channel name: ', channel_name);
      console.log('Message: ', message);
      console.log('Username: ', user_name);
      this.socketService.send(this.message_content);
      this.dataService.sendMessage(channel_name, message, user_name).subscribe(
        (res: any) => {
          console.log('Here my res: ', res);
        },
        (err: any) => {
          this.error_msg = err.message;
        }
      );
      this.message_content=null;
    }else{
      console.log('No message');
    }
    }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: string) => {
        // add new msg to the messages array
        console.log('new message: ', message);
        this.messages.push(message);
        })
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
