import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.scss'],
})
export class AdminUserUpdateComponent {
  @Input() chosenAdmin: Admin;
  @Output() updateAdmin = new EventEmitter<string>();

  updateChosenAdmin(email: string): void {
    this.updateAdmin.emit(email);
  }
}
