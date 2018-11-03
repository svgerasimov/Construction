import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngineerComponent } from './ingineer.component';

describe('IngineerComponent', () => {
  let component: IngineerComponent;
  let fixture: ComponentFixture<IngineerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngineerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
