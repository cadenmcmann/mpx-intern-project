import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingItemCardComponent } from './shopping-item-card.component';

describe('ShoppingItemCardComponent', () => {
  let component: ShoppingItemCardComponent;
  let fixture: ComponentFixture<ShoppingItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
