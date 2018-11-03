import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashlessExpensesComponent } from './cashless-expenses.component';

describe('CashlessExpensesComponent', () => {
  let component: CashlessExpensesComponent;
  let fixture: ComponentFixture<CashlessExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashlessExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashlessExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
