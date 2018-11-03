import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurrentExpensesComponent } from './add-current-expenses.component';

describe('AddCurrentExpensesComponent', () => {
  let component: AddCurrentExpensesComponent;
  let fixture: ComponentFixture<AddCurrentExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCurrentExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCurrentExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
