import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DeletegroupComponent = class DeletegroupComponent {
    constructor(router, dataservice) {
        this.router = router;
        this.dataservice = dataservice;
        dataservice.getAllGroups().subscribe((res) => {
            this.groups = res;
        });
    }
    delete(event, name) {
        event.preventDefault();
        this.dataservice.deleteGroup(name).subscribe((res) => {
            if (res) {
                this.dataservice.getAllGroups().subscribe((res) => {
                    this.groups = res;
                });
            }
            else {
                this.error = "Failed to delete";
            }
        });
    }
    ngOnInit() {
    }
};
DeletegroupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-deletegroup',
        templateUrl: './deletegroup.component.html',
        styleUrls: ['./deletegroup.component.css']
    })
], DeletegroupComponent);
export { DeletegroupComponent };
//# sourceMappingURL=deletegroup.component.js.map