import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  @Output() modalClose = new EventEmitter<void>();

  closeActiveModal(): void {
    console.log('test component');
    this.modalClose.emit();
  }
}
