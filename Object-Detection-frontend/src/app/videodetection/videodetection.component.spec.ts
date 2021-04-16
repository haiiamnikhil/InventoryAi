import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideodetectionComponent } from './videodetection.component';

describe('VideodetectionComponent', () => {
  let component: VideodetectionComponent;
  let fixture: ComponentFixture<VideodetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideodetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideodetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
