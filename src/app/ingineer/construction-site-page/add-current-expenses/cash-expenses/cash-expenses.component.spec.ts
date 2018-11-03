import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashExpensesComponent } from './cash-expenses.component';

describe('CashExpensesComponent', () => {
  let component: CashExpensesComponent;
  let fixture: ComponentFixture<CashExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
