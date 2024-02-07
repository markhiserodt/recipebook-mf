import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Operation, OperationType } from '../../../enumerations/operation.enum';

@Component({
  selector: 'rb-home-insurance-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home-insurance-form.component.html',
  styleUrl: './home-insurance-form.component.scss'
})
export class HomeInsuranceFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  operation: OperationType = Operation.Modify;
  operations = Operation;

  get caseId() { return this.form.get('caseId'); }
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get address() { return this.form.get('address'); }

  get formKeys() { return Object.keys(this.form.controls) }

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      caseId: new FormControl({value: '1000991', disabled: true}),
      name: new FormControl('John'),
      email: new FormControl('johnsmith@gmail.com', [ Validators.email ]),
      address: new FormControl('123 Main St', [ Validators.minLength(8) ])
    });
    this.subscribeToFormChanges();
  }

  changeOperationMode(operationType: OperationType): void {
    this.operation = operationType;
    switch (operationType) {
      case Operation.Modify:
        this.enableForm(this.form);
        break;
      case Operation.Inquiry:
        this.disableForm(this.form);
        break;
      case Operation.Correct:
        this.enableForm(this.form);
        break;
      default:
        break;
    }
  }

  enableForm(form: FormGroup): void {
    Object.keys(form.value).forEach(key => {
      const formControl = form.get(key);
      formControl?.enable();
    });
    this.caseId?.disable();
  }

  disableForm(form: FormGroup): void {
    Object.keys(form.value).forEach(key => {
      const formControl = form.get(key);
      formControl?.disable();
    });
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
    console.log('caseId change: ', this.caseId?.dirty);
    console.log('name change: ', this.name?.dirty);
    console.log('email change: ', this.email?.dirty);
    console.log('address change: ', this.address?.dirty);
    console.log('-----------------------------')
  }
}
