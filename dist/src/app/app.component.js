import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'Chat room';
    }
    updateActive(target) {
        document.querySelectorAll('.nav-link').forEach((el) => el.setAttribute("class", "nav-link"));
        document.querySelector(target).setAttribute("class", "nav-link active");
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map