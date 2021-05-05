import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserListComponent } from './admin-user-list.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AdminUserListComponent', () => {
  let component: AdminUserListComponent;
  let fixture: ComponentFixture<AdminUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserListComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserListComponent);
    component = fixture.componentInstance;
    component.admins = [{ email: 'foo', id: 0 }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the admin to update', () => {
    spyOn(component.editAdmin, 'emit');
    component.selectForUpdate({ email: 'foo', id: 0 });
    expect(component.editAdmin.emit).toHaveBeenCalledWith({
      email: 'foo',
      id: 0,
    });
  });

  it('should emit the admin to delete', () => {
    spyOn(component.delete, 'emit');
    component.selectForDelete({ email: 'foo', id: 0 });
    expect(component.delete.emit).toHaveBeenCalledWith({
      email: 'foo',
      id: 0,
    });
  });
});
