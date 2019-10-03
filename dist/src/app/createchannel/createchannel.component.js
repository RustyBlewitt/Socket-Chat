import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let CreatechannelComponent = class CreatechannelComponent {
    constructor(dataservice, router) {
        this.selectedgroup = null;
        this.dataservice = dataservice;
        this.selectedusers = [];
        this.router = router;
        this.channel_name = null;
        this.error = null;
        dataservice.getAllGroups().subscribe((res) => {
            this.grouplist = res;
        });
    }
    ngOnInit() {
    }
    create(event) {
        event.preventDefault();
        this.dataservice.createChannel(this.channel_name, this.selectedusers, this.selectedgroup).subscribe((success) => {
            success ? this.router.navigate(['home']) : this.error = "Error creating channel";
        });
    }
    cancel(event) {
        event.preventDefault();
        this.router.navigate(['home']);
    }
    toggleuser(event, user) {
        event.preventDefault();
        if (this.selectedusers.indexOf(user) < 0) {
            console.log('in');
            this.selectedusers.push(user);
            document.querySelector("#" + user).setAttribute("class", "btn btn-primary selected");
        }
        else {
            console.log('out');
            document.querySelector("#" + user).setAttribute("class", "btn btn-primary unselected");
            this.selectedusers = this.selectedusers.filter((u) => {
                return u != user;
            });
        }
        console.log('sel users: ', this.selectedusers);
    }
    selectgroup(event, group_name) {
        event.preventDefault();
        document.querySelectorAll(".selected").forEach((el) => {
            el.setAttribute("class", "btn btn-primary unselected");
        });
        this.selectedusers = [];
        let userlist = [];
        this.grouplist.forEach((group) => {
            if (group.group_name == group_name) {
                group.users.forEach((user) => {
                    userlist.push(user);
                });
            }
            document.querySelector('#' + group.group_name).setAttribute('class', 'btn btn-primary unselected');
        });
        document.querySelector('#' + group_name).setAttribute('class', 'btn btn-primary selected');
        this.userlist = userlist;
        console.log(this.userlist);
        this.selectedgroup = group_name;
    }
};
CreatechannelComponent = tslib_1.__decorate([
    Component({
        selector: 'app-createchannel',
        templateUrl: './createchannel.component.html',
        styleUrls: ['./createchannel.component.css']
    })
], CreatechannelComponent);
export { CreatechannelComponent };
//# sourceMappingURL=createchannel.component.js.map