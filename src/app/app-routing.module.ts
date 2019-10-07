import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { GroupsComponent } from './groups/groups.component';
import { ChannelContainerComponent } from './channel-container/channel-container.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'createuser', component: CreateuserComponent },
  { path: 'deleteuser', component: DeleteuserComponent },
  { path: 'userlist', component: ListusersComponent },
  { path: 'creategroup', component: CreategroupComponent },
  { path: 'deletegroup', component: DeletegroupComponent },
  { path: 'createchannel', component: CreatechannelComponent },
  { path: 'updatechannel', component: EditchannelComponent },
  { path: 'deletechannel', component: DeletechannelComponent },
  { path: 'groups', component: GroupsComponent},
  { path: 'channels', component: ChannelContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
