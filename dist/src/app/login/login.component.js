import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(router, dataservice, appC) {
        this.router = router;
        this.dataservice = dataservice;
        this.error = false;
        this.allUsers = null;
        appC.updateActive("#login-link");
    }
    ngOnInit() {
    }
    login(event) {
        event.preventDefault();
        var form = document.querySelector(".login-form");
        form.classList.toggle('shake'); // Flick off
        form.classList.toggle('shake'); // Flick on to activate animation
        this.dataservice.attemptLogin(this.username, this.password).subscribe((user) => {
            console.log("this response ", user);
            if (user.valid) {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['/home']);
            }
            else {
                this.error = true;
            }
        });
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