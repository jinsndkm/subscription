import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FusebillComponent } from './fusebill.component';

describe('FusebillComponent', () => {
  let component: FusebillComponent;
  let fixture: ComponentFixture<FusebillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FusebillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FusebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
