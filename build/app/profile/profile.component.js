"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProfileComponent = (function () {
    function ProfileComponent(router, dataservice) {
        var _this = this;
        this.router = router;
        this.User = JSON.parse(sessionStorage.getItem('user'));
        this.allUsers = null;
        if (this.User) {
            console.log("User found.\n");
            if (this.User.level > 0) {
                dataservice.getAllUsers().then(function (res) {
                    _this.allUsers = res;
                });
            }
        }
        else {
            router.navigate(['/login']);
            console.log('Could not find user.\n');
        }
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent.prototype.logout = function (event) {
        console.log('Logging out ', this.User.username);
        sessionStorage.clear();
        this.router.navigate(['/login']);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map