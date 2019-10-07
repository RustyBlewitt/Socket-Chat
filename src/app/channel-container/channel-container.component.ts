import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SocketService } from '../socket.service';
import { AppComponent } from '../app.component';
// import { IUser } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-container',
  templateUrl: './channel-container.component.html',
  styleUrls: ['./channel-container.component.css']
})
export class ChannelContainerComponent implements OnInit {
  
  // Component variables
  message_content: string;
  ioConnection: any;
  current_channel: any | null;
  dataService: DataService;
  channels: any[];
  error_msg: String | null;
  messages: any[] | null;
  user: any = JSON.parse(sessionStorage.getItem('user'));
  // current_channel_users: any[] | null;
  user_images: any[] | null;
  
  constructor( private socketService: SocketService, dataService: DataService, appComp: AppComponent, router: Router) {
    if(!this.user){
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


  ngOnInit() {
    this.initIoConnection();
  }

  private chat(event){
    event.preventDefault();
    if(this.message_content){
      // Extract variables for readability
      const channel_name = this.current_channel.channel_name;
      const message = this.message_content;
      const user_name = this.user.username;

      // Use socket service to send message
      this.socketService.send(channel_name);

      // API call to update DB
      this.dataService.sendMessage(channel_name, message, user_name).subscribe(
        (res: any) => {
          this.refreshMessages();
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
      .subscribe((target_channel: any) => {
        // add new msg to the messages array
        if(target_channel == this.current_channel.channel_name){
          this.refreshMessages();
        }
        });
  }

  private refreshMessages(){
    this.dataService.getChannelMessages(this.current_channel.channel_name).subscribe(
      (res: any) => {
        this.messages = res;
      },
      (err: any) => {
        this.error_msg = err.message;
      }
    );
  }

  select_channel(event, channel_name) {
    event.preventDefault();
    for(let c in this.channels){
      // For channel that was clicked on
      if(this.channels[c].channel_name == channel_name){
        // Set current_channel to clicked on channel
        this.current_channel = this.channels[c];
        this.messages = null;
        this.get_user_images();
        this.refreshMessages();
      }
    }
  }

  get_user_images(){
    this.user_images = [];
    console.log(this.current_channel.users);
    for(let i = 0; i < this.current_channel.users.length; i++){
      this.dataService.getUser(this.current_channel.users[i]).subscribe(
        (user: any) => {
          user = user[0];
          console.log('User response: ', user);
          console.log('current_channel.users', this.current_channel.users);
          let key = user.username;
          let val = user.user_image;
          this.user_images[key] = val;
          console.log(this.user_images);
          // console.log('test = ', this.user_images['rusty']);
          },
        (err) => {
          console.log('Err retrieving user');
        }
      )
    }
  }

  exit_channel(event){
    event.preventDefault();
    this.current_channel = null;
  }


}
