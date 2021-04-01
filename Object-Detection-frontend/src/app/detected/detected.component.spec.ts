import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectedComponent } from './detected.component';

describe('DetectedComponent', () => {
  let component: DetectedComponent;
  let fixture: ComponentFixture<DetectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
