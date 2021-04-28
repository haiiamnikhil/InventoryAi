import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadvideocounterComponent } from './uploadvideocounter.component';

describe('UploadvideocounterComponent', () => {
  let component: UploadvideocounterComponent;
  let fixture: ComponentFixture<UploadvideocounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadvideocounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadvideocounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
