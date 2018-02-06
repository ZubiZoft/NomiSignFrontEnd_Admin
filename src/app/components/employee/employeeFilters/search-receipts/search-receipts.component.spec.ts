import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReceiptsComponent } from './search-receipts.component';

describe('SearchReceiptsComponent', () => {
  let component: SearchReceiptsComponent;
  let fixture: ComponentFixture<SearchReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
