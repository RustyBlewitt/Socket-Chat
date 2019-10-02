import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ProfileComponent = class ProfileComponent {
    constructor(router, dataservice, appC) {
        this.router = router;
        this.User = JSON.parse(sessionStorage.getItem('user'));
        this.allUsers = null;
        this.level = ['Regular User', 'Group Assis', 'Group Admin', 'Super Admin'];
        if (this.User) {
            console.log("User found.\n User level: ", this.User.level, " allUsers: ", this.allUsers);
            if (this.User.level > 0) {
                dataservice.getAllUsers().subscribe((res) => {
                    this.allUsers = res;
                });
            }
        }
        else {
            router.navigate(['/login']);
            console.log('Could not find user.\n');
        }
        appC.updateActive("#profile-link");
    }
    ngOnInit() {
    }
    logout(event) {
        console.log('Logging out ', this.User.username);
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
};
ProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    })
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map