import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriptionDetailsComponent } from './view-subscription-details.component';

describe('ViewSubscriptionDetailsComponent', () => {
  let component: ViewSubscriptionDetailsComponent;
  let fixture: ComponentFixture<ViewSubscriptionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubscriptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubscriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
