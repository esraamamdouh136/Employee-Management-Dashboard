import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../model/employee.model';

@Pipe({
  name: 'namefilter',
  standalone: true, // Mark the pipe as standalone
})
export class NamefilterPipe implements PipeTransform {
    transform(value: any[], searchText: string): any[] {
      if (!value || !searchText) {
        return value;
      }
      searchText = searchText.toLowerCase();
      return value.filter((item) =>
        item.name.toLowerCase().includes(searchText)
      );
    }
  }