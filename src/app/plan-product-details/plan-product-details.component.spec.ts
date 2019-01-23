import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanProductDetailsComponent } from './plan-product-details.component';

describe('PlanProductDetailsComponent', () => {
  let component: PlanProductDetailsComponent;
  let fixture: ComponentFixture<PlanProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
