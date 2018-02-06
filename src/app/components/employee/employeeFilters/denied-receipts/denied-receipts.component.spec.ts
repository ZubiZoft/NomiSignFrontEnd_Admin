import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedReceiptsComponent } from './denied-receipts.component';

describe('DeniedReceiptsComponent', () => {
  let component: DeniedReceiptsComponent;
  let fixture: ComponentFixture<DeniedReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniedReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
