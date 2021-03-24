import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectdetectorComponent } from './objectdetector.component';

describe('ObjectdetectorComponent', () => {
  let component: ObjectdetectorComponent;
  let fixture: ComponentFixture<ObjectdetectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectdetectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectdetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
