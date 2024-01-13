import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodGroupComponent } from './food-group.component';

describe('FoodGroupComponent', () => {
  let component: FoodGroupComponent;
  let fixture: ComponentFixture<FoodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
