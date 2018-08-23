import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsAdminComponent } from './dashboards-admin.component';

describe('DashboardsAdminComponent', () => {
  let component: DashboardsAdminComponent;
  let fixture: ComponentFixture<DashboardsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
