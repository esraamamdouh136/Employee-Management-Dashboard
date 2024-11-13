import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  standalone: true,
  imports: [],
  templateUrl: './success-popup.component.html',
})
export class SuccessPopupComponent {
  @Output() closePopup = new EventEmitter<void>();

  onClose() {
    this.closePopup.emit();
  }
}
