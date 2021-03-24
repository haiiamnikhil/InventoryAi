import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilecountsComponent } from './filecounts.component';

describe('FilecountsComponent', () => {
  let component: FilecountsComponent;
  let fixture: ComponentFixture<FilecountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilecountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilecountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
