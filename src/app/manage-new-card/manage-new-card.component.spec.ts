import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewCardComponent } from './manage-new-card.component';

describe('ManageNewCardComponent', () => {
  let component: ManageNewCardComponent;
  let fixture: ComponentFixture<ManageNewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
