import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let CreateuserComponent = class CreateuserComponent {
    constructor(router, dataservice) {
        this.router = router;
        this.dataservice = dataservice;
        this.error = null;
        this.level = 0;
    }
    ngOnInit() {
    }
    create(event) {
        event.preventDefault();
        var form = document.querySelector(".createuser-form");
        this.dataservice.createUser(this.username, this.password, this.email, this.level).subscribe((res) => {
            if (res.success) {
                this.router.navigate(['/home']);
            }
            else {
                this.error = res.message;
            }
        });
    }
    changeLvl(lvl) {
        this.level = lvl;
        let lvlSelectors = ["lvl0 ", "lvl1 ", "lvl2 ", "lvl3 "];
        let normalSelectors = "lvlbtn btn btn-primary ";
        // For each option
        lvlSelectors.forEach((sel) => {
            // Reset classes
            document.querySelector("." + sel).setAttribute("class", sel + normalSelectors);
        });
        // Add active to chosen option
        document.querySelector("." + lvlSelectors[lvl]).setAttribute("class", "active " + normalSelectors + lvlSelectors[lvl]);
    }
    cancel(event) {
        event.preventDefault();
        this.router.navigate(['./home']);
    }
};
CreateuserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-createuser',
        templateUrl: './createuser.component.html',
        styleUrls: ['./createuser.component.css']
    })
], CreateuserComponent);
export { CreateuserComponent };
//# sourceMappingURL=createuser.component.js.map