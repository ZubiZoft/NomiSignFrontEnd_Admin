import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeesComponent } from './new-employees.component';

describe('NewEmployeesComponent', () => {
  let component: NewEmployeesComponent;
  let fixture: ComponentFixture<NewEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
