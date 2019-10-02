import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { HomeComponent } from './home/home.component';
import { ListusersComponent } from './listusers/listusers.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { DeletegroupComponent } from './deletegroup/deletegroup.component';
import { CreatechannelComponent } from './createchannel/createchannel.component';
import { EditchannelComponent } from './editchannel/editchannel.component';
import { DeletechannelComponent } from './deletechannel/deletechannel.component';
const routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'createuser', component: CreateuserComponent },
    { path: 'deleteuser', component: DeleteuserComponent },
    { path: 'userlist', component: ListusersComponent },
    { path: 'creategroup', component: CreategroupComponent },
    { path: 'deletegroup', component: DeletegroupComponent },
    { path: 'createchannel', component: CreatechannelComponent },
    { path: 'editchannel', component: EditchannelComponent },
    { path: 'deletechannel', component: DeletechannelComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map