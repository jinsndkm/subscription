import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterPipeModule } from 'ngx-filter-pipe'; 
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';

import { from } from 'rxjs';
import { FusebillComponent } from './fusebill/fusebill.component';
import { LoginComponent } from './login/login.component';
import { MyserviceComponent } from './myservice/myservice.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UpgradeSubscriptionComponent } from './upgrade-subscription/upgrade-subscription.component';
import { ViewSubscriptionDetailsComponent } from './view-subscription-details/view-subscription-details.component';

import { PlanProductDetailsComponent } from './plan-product-details/plan-product-details.component'

import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostsComponent,
    UsersComponent,
    UserDetailsComponent,
    HomeComponent,
    CreateUserComponent,
    FusebillComponent,
    LoginComponent,
    MyserviceComponent,
    SubscriptionComponent,
    UpgradeSubscriptionComponent,
    ViewSubscriptionDetailsComponent,

    PlanProductDetailsComponent

    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule   ,
    NgxSpinnerModule,
    FilterPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
