import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FusebillAddCardDetailsComponent } from './fusebill-add-card-details.component';

describe('FusebillAddCardDetailsComponent', () => {
  let component: FusebillAddCardDetailsComponent;
  let fixture: ComponentFixture<FusebillAddCardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FusebillAddCardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FusebillAddCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
