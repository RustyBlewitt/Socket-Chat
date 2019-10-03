import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HomeComponent = class HomeComponent {
    constructor(router, appComp) {
        this.level = ['Regular User', 'Group Assis', 'Group Admin', 'Super Admin'];
        this.User = JSON.parse(sessionStorage.getItem('user'));
        this.router = router;
        this.appComp = appComp;
        this.userLoggedIn = this.User != null;
        this.userLoggedIn ? console.log("Welcome home, " + this.User) : this.router.navigate(['/login']);
    }
    ngOnInit() {
        this.appComp.updateActive("#home-link");
    }
    createUser() {
        this.router.navigate(['./createuser']);
    }
    deleteGroup() {
        this.router.navigate(['./deletegroup']);
    }
    editChannelUsers() {
        this.router.navigate(['./updatechannel']);
    }
    listUsers() {
        this.router.navigate(['./userlist']);
    }
    deleteUser() {
        this.router.navigate(['./deleteuser']);
    }
    createGroup() {
        this.router.navigate(['./creategroup']);
    }
    createChannel() {
        this.router.navigate(['./createchannel']);
    }
    deleteChannel() {
        this.router.navigate(['./deletechannel']);
    }
    unhandled() {
        console.log("This button not handled yet");
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map