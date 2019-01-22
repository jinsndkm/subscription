import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import{HomeComponent} from './home/home.component';
import{CreateUserComponent} from './create-user/create-user.component';
import {FusebillComponent} from './fusebill/fusebill.component';

import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MyserviceComponent } from './myservice/myservice.component';
import { UpgradeSubscriptionComponent } from './upgrade-subscription/upgrade-subscription.component';
import { ViewSubscriptionDetailsComponent } from './view-subscription-details/view-subscription-details.component';


const routes: Routes = [
  {
    path: 'home',
    component: UsersComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
 
  {
    path:'createUser',
    component:CreateUserComponent
  },
  {
    path : 'fusebill',
    component : FusebillComponent
  },{
    path:'users',
    component:CreateUserComponent
  },
  {
    path:'home/mysubscription',
    component:SubscriptionComponent
  }, {
    path:'home/mysubscription/upgradeSubscription',
    component:UpgradeSubscriptionComponent
  }, {
    path:'home/mysubscription/viewSubscription',
    component:ViewSubscriptionDetailsComponent
  },{
    path:'addservice',
    component:MyserviceComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
