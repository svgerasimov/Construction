import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyExpensesComponent } from './duty-expenses.component';

describe('DutyExpensesComponent', () => {
  let component: DutyExpensesComponent;
  let fixture: ComponentFixture<DutyExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
