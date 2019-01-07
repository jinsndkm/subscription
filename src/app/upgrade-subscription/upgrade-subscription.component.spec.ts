import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeSubscriptionComponent } from './upgrade-subscription.component';

describe('UpgradeSubscriptionComponent', () => {
  let component: UpgradeSubscriptionComponent;
  let fixture: ComponentFixture<UpgradeSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
