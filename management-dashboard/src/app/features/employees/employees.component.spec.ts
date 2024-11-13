import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../shared/model/employee.model';
import { SearchEmployeePipe } from '../../shared/pipe/search-employee.pipe';
import { DeletePopupComponent } from '../../shared/components/delete-popup/delete-popup.component';
import { SuccessPopupComponent } from '../../shared/components/success-popup/success-popup.component';

describe('ListEmployeeComponent', () => {
  let component: ListEmployeeComponent;
  let fixture: ComponentFixture<ListEmployeeComponent>;
  let employeeService: EmployeeService;

  const mockEmployees: Employee[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, SearchEmployeePipe, RouterModule, DeletePopupComponent, SuccessPopupComponent],
      declarations: [ListEmployeeComponent],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            getEmployees: jasmine.createSpy().and.returnValue(of(mockEmployees)),
            deleteEmployee: jasmine.createSpy().and.returnValue(of(null)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListEmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployeesList on init and populate employees', () => {
    component.ngOnInit();
    expect(employeeService.getEmployees).toHaveBeenCalled();
    expect(component.employees.length).toBe(2);
  });

  it('should set the employeeId when deleteEmployee is called', () => {
    component.deleteEmployee(1);
    expect(component.showDeletePopup).toBeTrue();
    expect(component.employeeId).toBe(1);
  });

  it('should delete an employee and hide the delete popup', () => {
    component.deleteEmployee(1);
    component.handleDelete();

    expect(employeeService.deleteEmployee).toHaveBeenCalledWith(1);
    expect(component.employees.length).toBe(1); // After deleting 1 employee
    expect(component.showDeletePopup).toBeFalse();
    expect(component.showSuccessPopup).toBeTrue();
  });

  it('should not delete an employee if employeeId is not set', () => {
    component.deleteEmployee(0);  // No valid ID set
    component.handleDelete();

    expect(employeeService.deleteEmployee).not.toHaveBeenCalled();
    expect(component.showSuccessPopup).toBeFalse();
  });

  it('should toggle delete popup visibility and set employeeId correctly', () => {
    component.deleteEmployee(2);
    expect(component.showDeletePopup).toBeTrue();
    expect(component.employeeId).toBe(2);
  });
});
