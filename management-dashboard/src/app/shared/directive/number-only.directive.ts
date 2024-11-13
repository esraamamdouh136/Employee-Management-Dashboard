import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[inputNumberOnly]',
  standalone: true,
})
export class NumberOnlyDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, ''); // Removes any non-numeric characters
  }
}