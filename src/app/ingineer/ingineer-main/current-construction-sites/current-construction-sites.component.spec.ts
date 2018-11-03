import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentConstructionSitesComponent } from './current-construction-sites.component';

describe('CurrentConstructionSitesComponent', () => {
  let component: CurrentConstructionSitesComponent;
  let fixture: ComponentFixture<CurrentConstructionSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentConstructionSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConstructionSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
