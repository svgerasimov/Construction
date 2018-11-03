import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDutyComponent } from './on-duty.component';

describe('OnDutyComponent', () => {
  let component: OnDutyComponent;
  let fixture: ComponentFixture<OnDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
