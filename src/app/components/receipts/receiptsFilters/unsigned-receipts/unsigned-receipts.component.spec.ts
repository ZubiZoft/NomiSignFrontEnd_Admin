import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedReceiptsComponent } from './unsigned-receipts.component';

describe('UnsignedReceiptsComponent', () => {
  let component: UnsignedReceiptsComponent;
  let fixture: ComponentFixture<UnsignedReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsignedReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignedReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
