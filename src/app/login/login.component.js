import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(router) {
        this.router = router;
        this.error = false;
    }
    ngOnInit() {
    }
    login(event) {
        event.preventDefault();
        if ((this.useremail == 'test@email.com' && this.userpassword == 'password') ||
            (this.useremail == 'john@smith.com' && this.userpassword == '123456') ||
            (this.useremail == 'user@google.com' && this.userpassword == 'useruser')) {
            console.log("Big success, welcome ", this.useremail);
            this.router.navigate(['account']);
        }
        else {
            this.error = true;
            console.log("useless, get it right");
        }
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map