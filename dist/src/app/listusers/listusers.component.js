import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListusersComponent = class ListusersComponent {
    constructor(dataservice, router) {
        this.router = router;
        this.userlist = null;
        this.level = ["Regular user", "Group assis", "Group admin", "Super user"];
        dataservice.getAllUsers().subscribe((userlist) => {
            this.userlist = userlist;
        });
    }
    home(event) {
        event.preventDefault();
        this.router.navigate(['home']);
    }
    ngOnInit() {
    }
};
ListusersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listusers',
        templateUrl: './listusers.component.html',
        styleUrls: ['./listusers.component.css']
    })
], ListusersComponent);
export { ListusersComponent };
//# sourceMappingURL=listusers.component.js.map