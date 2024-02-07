import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoInsuranceFormComponent } from './auto-insurance-form.component';

describe('AutoInsuranceFormComponent', () => {
  let component: AutoInsuranceFormComponent;
  let fixture: ComponentFixture<AutoInsuranceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoInsuranceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoInsuranceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
