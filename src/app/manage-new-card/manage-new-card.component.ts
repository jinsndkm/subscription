import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../data.service';
import { HideMenusService } from '../hide-menus.service';

@Component({
  selector: 'app-manage-new-card',
  templateUrl: './manage-new-card.component.html',
  styleUrls: ['./manage-new-card.component.scss']
})
export class ManageNewCardComponent implements OnInit {

  elements: Elements;
  card: StripeElement;

  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(private data: DataService,
    private fb: FormBuilder,
    private stripeService: StripeService, private spinner: NgxSpinnerService,public nav: HideMenusService) { }

  ngOnInit() {
   
    this.nav.show();
    window.scrollTo(0, 0)
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }

  buy() {
    this.spinner.show();
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token.id);
          this.data.addNewCard(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          
        }
      });
  }

}
