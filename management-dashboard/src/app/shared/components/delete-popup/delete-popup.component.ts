import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss'
})
export class DeletePopupComponent {
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  onConfirm() {
    this.confirmDelete.emit();
  }

  onCancel() {
    this.cancelDelete.emit();
  }
}

