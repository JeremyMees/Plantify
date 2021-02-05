import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Admin } from '../admin';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
})
export class AdminUserListComponent {
  @Input() admins: Array<Admin>;
  @Output() delete = new EventEmitter<Admin>();
  @Output() editAdmin = new EventEmitter<Admin>();

  selectForUpdate(admin: Admin): void {
    this.editAdmin.emit(admin);
  }

  selectForDelete(admin: Admin): void {
    this.delete.emit(admin);
  }
}
