import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUserAddComponent } from './admin-user-add.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AdminUserAddComponent', () => {
  let component: AdminUserAddComponent;
  let fixture: ComponentFixture<AdminUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserAddComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the email adress from new admin user', () => {
    spyOn(component.newAdmin, 'emit');
    component.addAdmin('foo');
    expect(component.newAdmin.emit).toHaveBeenCalledWith('foo');
  });
});
