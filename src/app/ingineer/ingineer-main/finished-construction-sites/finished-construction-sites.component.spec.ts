import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedConstructionSitesComponent } from './finished-construction-sites.component';

describe('FinishedConstructionSitesComponent', () => {
  let component: FinishedConstructionSitesComponent;
  let fixture: ComponentFixture<FinishedConstructionSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedConstructionSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedConstructionSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
