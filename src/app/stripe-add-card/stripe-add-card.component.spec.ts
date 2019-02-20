import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeAddCardComponent } from './stripe-add-card.component';

describe('StripeAddCardComponent', () => {
  let component: StripeAddCardComponent;
  let fixture: ComponentFixture<StripeAddCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeAddCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
