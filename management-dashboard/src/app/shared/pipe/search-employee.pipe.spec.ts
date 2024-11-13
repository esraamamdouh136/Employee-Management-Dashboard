import { SearchEmployeePipe } from './search-employee.pipe';
import { Employee } from '../model/employee.model';

describe('SearchEmployeePipe', () => {
  let pipe: SearchEmployeePipe;

  beforeEach(() => {
    pipe = new SearchEmployeePipe();
  });

  it('should return the same list if no search term is provided', () => {
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
    ];

    expect(pipe.transform(employees, '')).toEqual(employees);
  });

  it('should return the same list if no employees are provided', () => {
    expect(pipe.transform([], 'Doe')).toEqual([]);
  });

  it('should return the filtered list of employees by first name', () => {
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
    ];

    const result = pipe.transform(employees, 'Jane');
    expect(result.length).toBe(1);
    expect(result[0].firstName).toBe('Jane');
  });

  it('should return the filtered list of employees by last name', () => {
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
    ];

    const result = pipe.transform(employees, 'Doe');
    expect(result.length).toBe(1);
    expect(result[0].lastName).toBe('Doe');
  });

  it('should return the filtered list of employees by both first name and last name', () => {
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
      { id: 3, firstName: 'Mary', lastName: 'Johnson', email: 'mary.johnson@example.com' }
    ];

    const result = pipe.transform(employees, 'doe');
    expect(result.length).toBe(1);
    expect(result[0].firstName).toBe('John');
    expect(result[0].lastName).toBe('Doe');
  });

  it('should return an empty list if no employee matches the search term', () => {
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
    ];

    const result = pipe.transform(employees, 'Nonexistent');
    expect(result.length).toBe(0);
  });

  it('should handle case insensitivity of search term', () => {
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
    ];

    const result = pipe.transform(employees, 'jANE');
    expect(result.length).toBe(1);
    expect(result[0].firstName).toBe('Jane');
  });
});
