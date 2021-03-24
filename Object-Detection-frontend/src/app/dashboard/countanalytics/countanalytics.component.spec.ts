import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountanalyticsComponent } from './countanalytics.component';

describe('CountanalyticsComponent', () => {
  let component: CountanalyticsComponent;
  let fixture: ComponentFixture<CountanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
