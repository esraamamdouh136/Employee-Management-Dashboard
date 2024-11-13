import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditEmployeeComponent } from './add-edit-employee.component';
import { EmployeeService } from '../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../../../shared/model/employee.model';

class MockEmployeeService {
  getEmployeeById(id: number) {
    return of({ id, firstName: 'John', lastName: 'Doe' });
  }
  addEmployee(employeeData: Employee) {
    return of({});
  }
  updateEmployee(employeeData: Employee) {
    return of({});
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => '1',
    },
  };
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AddEditEmployeeComponent', () => {
  let component: AddEditEmployeeComponent;
  let fixture: ComponentFixture<AddEditEmployeeComponent>;
  let employeeService: EmployeeService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditEmployeeComponent],
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should initialize and check the header title for edit mode', () => {
    spyOn(employeeService, 'getEmployeeById').and.callThrough();

    component.ngOnInit();

    expect(component.employeeId).toBe(1);
    expect(employeeService.getEmployeeById).toHaveBeenCalledWith(1);
    expect(component.formTitle).toBe('Edit Employee');
    expect(component.submitButtonLabel).toBe('Update Employee');
    expect(component.employee).toEqual({ id: 1, firstName: 'John', lastName: 'Doe',  email:'name@gmail.com' });
  });

  it('should handle form submission for adding a new employee', () => {
    spyOn(employeeService, 'addEmployee').and.callThrough();
    const employeeData: Employee = { id : 0,firstName: 'Jane', lastName: 'Smith', email:'name@gmail.com' };

    component.handleFormSubmit(employeeData);

    expect(employeeService.addEmployee).toHaveBeenCalledWith(employeeData);
    expect(router.navigate).toHaveBeenCalledWith(['/employees/list']);
  });

  it('should handle form submission for updating an employee', () => {
    component.employee = { id: 1, firstName: 'John', lastName: 'Doe' , email:'name@gmail.com' };
    spyOn(employeeService, 'updateEmployee').and.callThrough();
    const employeeData: Employee = { id : 0,firstName: 'Jane', lastName: 'Smith', email:'name@gmail.com' };

    component.handleFormSubmit(employeeData);

    expect(employeeService.updateEmployee).toHaveBeenCalledWith({ ...employeeData, id: 1 });
    expect(router.navigate).toHaveBeenCalledWith(['/employees/list']);
  });

  it('should navigate to the employee list after form submission', () => {
    component.navigation();
    expect(router.navigate).toHaveBeenCalledWith(['/employees/list']);
  });
});
