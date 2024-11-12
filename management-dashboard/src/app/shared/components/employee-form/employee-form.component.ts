import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-form',
  standalone: true,
imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  @Input() employeeData: Employee | null = null;
  @Input() formTitle: string = 'Employee Form';
  @Input() submitButtonLabel: string = 'Submit';

  @Output() formSubmit = new EventEmitter<Employee>();

  employeeForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.initForm();
    if (this.employeeData) {
      this.employeeForm.patchValue(this.employeeData);
    }
  }

  initForm() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: [''],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.formSubmit.emit(this.employeeForm.value);
    }
  }
}
