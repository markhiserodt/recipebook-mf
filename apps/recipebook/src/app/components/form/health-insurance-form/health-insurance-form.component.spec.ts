import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceFormComponent } from './health-insurance-form.component';

describe('HealthInsuranceFormComponent', () => {
  let component: HealthInsuranceFormComponent;
  let fixture: ComponentFixture<HealthInsuranceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthInsuranceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthInsuranceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
