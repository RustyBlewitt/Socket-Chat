import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-editchannel',
  templateUrl: './editchannel.component.html',
  styleUrls: ['./editchannel.component.css']
})
export class EditchannelComponent implements OnInit {

  selectedchannel: any;
  dataservice: DataService;
  channels: any[];
  potentialusers: any[];
  router: Router;
  selectedusers: string[];
  channel_name: string;
  error: string | null;

  constructor(dataservice: DataService, router: Router) {
    this.dataservice = dataservice;
    this.router = router;
    this.selectedusers = [];
    this.selectedchannel = null;
    this.error = null;

    // Load channels
    dataservice.getAllChannels().subscribe( (res: any[]) => {
      this.channels = res;
      console.log(this.channels);
    })

  }

  ngOnInit() {
  }

  // Cancel and return home
  cancel(event){
    event.preventDefault();
    this.router.navigate(['home']);
  }

  // This fires on the clicking of a channel, deals with data according to which 
  // channel was clicked then displays edit options for that channel to the user.
  selectchannel(event, name){
    event.preventDefault();
    console.log(this.channels);
    this.selectedchannel = this.channels.filter((ch) => {
      console.log(ch);
      return ch.channel_name == name;
    });
    this.selectedchannel = this.selectedchannel[0];
    this.channel_name = this.selectedchannel.channel_name;
    this.dataservice.getAllUsers().subscribe( (res: any[]) => {
      this.potentialusers = res;
      console.log('here res: ');
      console.log(this.potentialusers);
      // this.potentialusers = this.potentialusers.filter( (u) => {
      //   let inGroup = false;
      //   u.groups.forEach( (g) => {
      //     if(g == this.selectedchannel.group_name){
      //       inGroup = true;
      //     };
      //   })
        // return inGroup;
      // })
    })
  }

  // This executes the edit function through the DataService using the
  // data stored in this component
  edit(event){
    event.preventDefault();
    let channel_name = this.selectedchannel.channel_name;
    let users = this.selectedusers;
    console.log('sending channel name as : ', channel_name);
    this.dataservice.updateChannel(channel_name, users).subscribe( 
      (success) => {
        this.router.navigate(['home'])
      }, (err) => {
        this.error = "Failed to edit";
      }
      )
  }

  // Toggle between selected and unselected on users
  toggleuser(event, uname){
    event.preventDefault();
    // If not already selected
    if(this.selectedusers.indexOf(uname) < 0){
      document.querySelector("#"+uname).setAttribute("class", "btn btn-primary selected")
      this.selectedusers.push(uname);
    // If already selected
    }else{
      document.querySelector("#"+uname).setAttribute("class", "btn btn-primary unselected")
      this.selectedusers = this.selectedusers.filter( (u) => {
        return u != uname;
      });
    }

    console.log("Selected users: ", this.selectedusers);
  }

}
