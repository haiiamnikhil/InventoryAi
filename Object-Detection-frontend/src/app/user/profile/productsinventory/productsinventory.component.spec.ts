import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsinventoryComponent } from './productsinventory.component';

describe('ProductsinventoryComponent', () => {
  let component: ProductsinventoryComponent;
  let fixture: ComponentFixture<ProductsinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
