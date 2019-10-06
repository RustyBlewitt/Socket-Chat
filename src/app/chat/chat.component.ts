import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent: string;
  messages: string[];
  ioConnection: any;

  constructor(private socketService: SocketService) { 
    this.messagecontent = '';
    this.messages = [];
  }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: string) => {
        // add new msg to the messages array
        this.messages.push(message);
        })
  }

  private chat(event){
    event.preventDefault();
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent=null;
    }else{
      console.log('No message');
    }
    }

}
