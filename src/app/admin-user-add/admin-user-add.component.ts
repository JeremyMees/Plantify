import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-user-add',
  templateUrl: './admin-user-add.component.html',
  styleUrls: ['./admin-user-add.component.scss'],
})
export class AdminUserAddComponent {
  @Output() newAdmin = new EventEmitter<string>();

  addAdmin(email: string): void {
    this.newAdmin.emit(email);
  }
}
