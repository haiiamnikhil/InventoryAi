import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectiontableComponent } from './detectiontable.component';

describe('DetectiontableComponent', () => {
  let component: DetectiontableComponent;
  let fixture: ComponentFixture<DetectiontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectiontableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
