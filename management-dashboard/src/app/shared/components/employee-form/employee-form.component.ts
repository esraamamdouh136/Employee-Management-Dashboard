import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
import { NumberOnlyDirective } from '../../directive/number-only.directive';


@Component({
  selector: 'app-employee-form',
  standalone: true,
imports: [ReactiveFormsModule , CommonModule, BackButtonComponent , NumberOnlyDirective],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  @Input() employeeData: Employee | null = null;
  @Input() formTitle: string = 'Employee Form';
  @Input() submitButtonLabel: string = 'Submit';
  @Output() formSubmit = new EventEmitter<Employee>();
 
  disable : boolean = false
  employeeForm: FormGroup;
  private fb = inject(FormBuilder);

  ngOnChanges() {
    this.initForm();
    if (this.employeeData) {
      this.employeeForm.patchValue(this.employeeData);
    }
  }

  initForm() {
    this.employeeForm = this.fb.group({
      id : ['', [Validators.required , Validators.pattern('^[0-9]*$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.formSubmit.emit(this.employeeForm.value);
    }
  }
}
