import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListReceiptsComponent } from './company-list-receipts.component';

describe('CompanyListReceiptsComponent', () => {
  let component: CompanyListReceiptsComponent;
  let fixture: ComponentFixture<CompanyListReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
