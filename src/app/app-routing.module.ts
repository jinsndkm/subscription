import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import{HomeComponent} from './home/home.component';
import{CreateUserComponent} from './create-user/create-user.component';
import {FusebillComponent} from './fusebill/fusebill.component';

import { from } from 'rxjs';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
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
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
