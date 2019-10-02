import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

import { HttpClientModule }    from '@angular/common/http';
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
// import { ChannelComponent } from './channel/channel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    ProfileComponent,
    CreateuserComponent,
    HomeComponent,
    ListusersComponent,
    DeleteuserComponent,
    CreategroupComponent,
    DeletegroupComponent,
    // ChannelComponent,
    CreatechannelComponent,
    EditchannelComponent,
    DeletechannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
