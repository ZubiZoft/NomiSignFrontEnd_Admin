import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsBarComponent } from './receipts-bar.component';

describe('ReceiptsBarComponent', () => {
  let component: ReceiptsBarComponent;
  let fixture: ComponentFixture<ReceiptsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
