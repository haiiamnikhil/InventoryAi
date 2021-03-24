import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieselectorComponent } from './categorieselector.component';

describe('CategorieselectorComponent', () => {
  let component: CategorieselectorComponent;
  let fixture: ComponentFixture<CategorieselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
