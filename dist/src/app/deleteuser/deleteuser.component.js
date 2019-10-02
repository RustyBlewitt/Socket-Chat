import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DeleteuserComponent = class DeleteuserComponent {
    constructor(dataservice, router) {
        this.userlist = null;
        this.dataservice = dataservice;
        this.router = router;
        dataservice.getAllUsers().subscribe((users) => {
            this.userlist = users;
        });
    }
    // Execute delete through dataservice
    delete(event, user) {
        event.preventDefault();
        this.dataservice.deleteUser(user.username).subscribe(res => {
            console.log(res, " deletion of ", user);
            res ? this.router.navigate(['home']) : this.error = "Error deleting user";
        });
    }
    // Cancel and return home
    cancel(event) {
        this.router.navigate(['home']);
    }
    ngOnInit() {
    }
};
DeleteuserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-deleteuser',
        templateUrl: './deleteuser.component.html',
        styleUrls: ['./deleteuser.component.css']
    })
], DeleteuserComponent);
export { DeleteuserComponent };
//# sourceMappingURL=deleteuser.component.js.map