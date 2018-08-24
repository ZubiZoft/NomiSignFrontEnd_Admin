import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBarComponent } from './employee-bar.component';

describe('EmployeeBarComponent', () => {
  let component: EmployeeBarComponent;
  let fixture: ComponentFixture<EmployeeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
