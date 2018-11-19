import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewContractorDialogComponent } from './add-new-contractor-dialog.component';

describe('AddNewContractorDialogComponent', () => {
  let component: AddNewContractorDialogComponent;
  let fixture: ComponentFixture<AddNewContractorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewContractorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewContractorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
