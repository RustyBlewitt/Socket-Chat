import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let CreategroupComponent = class CreategroupComponent {
    constructor(dataService, router) {
        this.error = null;
        this.userlist = null;
        this.router = router;
        this.usersToAdd = [];
        this.dataService = dataService;
        dataService.getAllUsers().subscribe((res) => {
            this.userlist = res;
        });
    }
    cancel(event) {
        event.preventDefault();
        this.router.navigate(['home']);
    }
    create(event) {
        this.error = null;
        if (this.group_name == null) {
            this.error = "Group name required";
            return;
        }
        if (this.usersToAdd.length == 0) {
            this.error = "Add users by clicking on their names";
            return;
        }
        console.log(this.group_name);
        event.preventDefault();
        this.dataService.createGroup(this.group_name, this.usersToAdd, [], []).subscribe((res) => {
            if (res.error) {
                this.error = res.error;
            }
            else {
                this.router.navigate(['home']);
            }
        });
    }
    // Toggle selected / unselected users
    toggleuser(event, username) {
        event.preventDefault();
        console.log('username coming in', username);
        if (this.usersToAdd.indexOf(username) > -1) {
            document.querySelector('#' + username).setAttribute('class', 'btn btn-primary unselected');
            this.usersToAdd = this.usersToAdd.filter((u) => u != username);
        }
        else {
            document.querySelector('#' + username).setAttribute('class', 'btn btn-primary selected');
            this.usersToAdd.push(username);
        }
        console.log(username);
    }
    ngOnInit() {
    }
};
CreategroupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-creategroup',
        templateUrl: './creategroup.component.html',
        styleUrls: ['./creategroup.component.css']
    })
], CreategroupComponent);
export { CreategroupComponent };
//# sourceMappingURL=creategroup.component.js.map