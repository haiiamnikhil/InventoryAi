import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserapiviewComponent } from './userapiview.component';

describe('UserapiviewComponent', () => {
  let component: UserapiviewComponent;
  let fixture: ComponentFixture<UserapiviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserapiviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserapiviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
