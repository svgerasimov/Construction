import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentExpensesComponent } from './current-expenses.component';

describe('CurrentExpensesComponent', () => {
  let component: CurrentExpensesComponent;
  let fixture: ComponentFixture<CurrentExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
