import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let EditchannelComponent = class EditchannelComponent {
    constructor(dataservice, router) {
        this.dataservice = dataservice;
        this.router = router;
        this.selectedusers = [];
        this.selectedchannel = null;
        this.error = null;
        // Load channels
        dataservice.getAllChannels().subscribe((res) => {
            this.channels = res;
            console.log(this.channels);
        });
    }
    ngOnInit() {
    }
    // Cancel and return home
    cancel(event) {
        event.preventDefault();
        this.router.navigate(['home']);
    }
    // This fires on the clicking of a channel, deals with data according to which 
    // channel was clicked then displays edit options for that channel to the user.
    selectchannel(event, name) {
        event.preventDefault();
        this.selectedchannel = this.channels.filter((ch) => {
            return ch.name == name;
        });
        this.selectedchannel = this.selectedchannel[0];
        this.channelname = this.selectedchannel.channelname;
        this.dataservice.getAllUsers().subscribe((res) => {
            this.potentialusers = res;
            this.potentialusers = this.potentialusers.filter((u) => {
                let inGroup = false;
                u.groups.forEach((g) => {
                    if (g == this.selectedchannel.groupname) {
                        inGroup = true;
                    }
                    ;
                });
                return inGroup;
            });
        });
    }
    // This executes the edit function through the DataService using the
    // data stored in this component
    edit(event) {
        event.preventDefault();
        let newName = this.channelname || this.selectedchannel.name;
        let users = this.selectedusers;
        let groupname = this.selectedchannel.groupname;
        this.dataservice.editChannel(this.selectedchannel.name, newName, users, groupname).subscribe((success) => {
            success ? this.router.navigate(['home']) : this.error = "Failed to edit";
        });
    }
    // Toggle between selected and unselected on users
    toggleuser(event, uname) {
        event.preventDefault();
        // If not already selected
        if (this.selectedusers.indexOf(uname) < 0) {
            document.querySelector("#" + uname).setAttribute("class", "btn btn-primary selected");
            this.selectedusers.push(uname);
            // If already selected
        }
        else {
            document.querySelector("#" + uname).setAttribute("class", "btn btn-primary unselected");
            this.selectedusers = this.selectedusers.filter((u) => {
                return u != uname;
            });
        }
        console.log("Selected users: ", this.selectedusers);
    }
};
EditchannelComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editchannel',
        templateUrl: './editchannel.component.html',
        styleUrls: ['./editchannel.component.css']
    })
], EditchannelComponent);
export { EditchannelComponent };
//# sourceMappingURL=editchannel.component.js.map