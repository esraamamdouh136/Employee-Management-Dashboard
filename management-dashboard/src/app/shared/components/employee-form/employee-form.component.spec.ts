import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EmployeeFormComponent } from './employee-form.component';
import { CommonModule } from '@angular/common';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule],  // Add necessary modules here
      declarations: [EmployeeFormComponent],  // This line can be removed
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.employeeForm).toBeDefined();
    expect(component.employeeForm.controls['firstName'].value).toBe('');
    expect(component.employeeForm.controls['lastName'].value).toBe('');
  });
});
