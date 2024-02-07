import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'rb-health-insurance-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './health-insurance-form.component.html',
  styleUrl: './health-insurance-form.component.scss'
})
export class HealthInsuranceFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('John'),
      email: new FormControl('johnsmith@gmail.com', [ Validators.email ]),
      password: new FormControl('P@ssw0rd12', [ Validators.minLength(8) ])
    });
    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(): void {
    const initialFormValue = this.form.value;
    this.form.valueChanges.subscribe(() => {
      Object.keys(initialFormValue).forEach(key => {
        const formControl = this.form.get(key);
        if (formControl?.dirty && formControl?.value === initialFormValue[key]) {
          formControl.markAsPristine();
        }
      });
    });
  }

  submit(): void {
    console.log('name change: ', this.name?.dirty);
    console.log('email change: ', this.email?.dirty);
    console.log('password change: ', this.password?.dirty);
    console.log('-----------------------------')
  }
}
