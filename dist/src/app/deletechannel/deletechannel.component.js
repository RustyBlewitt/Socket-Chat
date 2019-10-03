import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DeletechannelComponent = class DeletechannelComponent {
    constructor(dataservice, router) {
        this.channellist = null;
        this.dataservice = dataservice;
        this.router = router;
        dataservice.getAllChannels().subscribe((channels) => {
            this.channellist = channels;
        });
    }
    delete(event, channel_name) {
        event.preventDefault();
        this.dataservice.deleteChannel(channel_name).subscribe(res => {
            console.log(res, " deletion of ", channel_name);
            res ? this.router.navigate(['home']) : this.error = "Error deleting channel";
        });
    }
    cancel(event) {
        this.router.navigate(['home']);
    }
    ngOnInit() {
    }
};
DeletechannelComponent = tslib_1.__decorate([
    Component({
        selector: 'app-deletechannel',
        templateUrl: './deletechannel.component.html',
        styleUrls: ['./deletechannel.component.css']
    })
], DeletechannelComponent);
export { DeletechannelComponent };
//# sourceMappingURL=deletechannel.component.js.map