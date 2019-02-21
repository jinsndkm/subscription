import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FusebillComponent } from './fusebill/fusebill.component';

import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MyserviceComponent } from './myservice/myservice.component';
import { UpgradeSubscriptionComponent } from './upgrade-subscription/upgrade-subscription.component';
import { ViewSubscriptionDetailsComponent } from './view-subscription-details/view-subscription-details.component';
import { PlanProductDetailsComponent } from './plan-product-details/plan-product-details.component'

import { AddCardDetailsComponent } from './add-card-details/add-card-details.component';

import { CartDetailsComponent } from './cart-details/cart-details.component'
import { SuccessMessageComponent } from './success-message/success-message.component';
import { FusebillAddCardDetailsComponent } from './fusebill-add-card-details/fusebill-add-card-details.component';
import { RedirectionComponent } from './redirection/redirection.component';

import { StripeAddCardComponent } from './stripe-add-card/stripe-add-card.component';

import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ManageCardsComponent } from './manage-cards/manage-cards.component';
import { ManageNewCardComponent } from './manage-new-card/manage-new-card.component';



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
    path: 'createUser',
    component: CreateUserComponent
  },
  {
    path: 'fusebill',
    component: FusebillComponent
  }, {
    path: 'users',
    component: CreateUserComponent
  },
  {
    path: 'home/mysubscription',
    component: SubscriptionComponent
  }, {
    path: 'home/mysubscription/upgradeSubscription',
    component: UpgradeSubscriptionComponent
  }, {
    path: 'home/mysubscription/viewSubscription',
    component: ViewSubscriptionDetailsComponent
  }, {
    path: 'home/addservice',
    component: MyserviceComponent
  }, {
    path: 'addservice/viewplanproducts/:id/:name',
    component: PlanProductDetailsComponent
  },
  {

    path: 'addcarddetails',
    component: AddCardDetailsComponent
  },
  {
    path: 'SuccessMessage',
    component: SuccessMessageComponent
  },
  {
    path: 'myCart',
    component: CartDetailsComponent
  }, {
    path: 'myCart/addservice',
    component: MyserviceComponent
  }, {
    path: 'home/addcarddetails',
    component: FusebillAddCardDetailsComponent
  }, {
    path: 'redirect',
    component: RedirectionComponent
  }, {
    path: 'addcardstripe',
    component: StripeAddCardComponent
  }

  ,{
    path:'addservice/carddetails/:id',
    component:PaymentDetailsComponent
  },{
    path:'home/managecards',
    component:ManageCardsComponent
  },{
    path:'addnewcardstripe',
    component:ManageNewCardComponent
  }

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
