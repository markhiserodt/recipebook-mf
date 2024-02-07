import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInsuranceFormComponent } from './home-insurance-form.component';

describe('HomeInsuranceFormComponent', () => {
  let component: HomeInsuranceFormComponent;
  let fixture: ComponentFixture<HomeInsuranceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInsuranceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeInsuranceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
