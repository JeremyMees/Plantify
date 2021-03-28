import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fakeService: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: TranslateService,
          useValue: jasmine.createSpyObj('TranslateService', [
            'addLangs',
            'setDefaultLang',
            'getBrowserLang',
            'use',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
  });

  beforeEach(() => {
    fakeService.getBrowserLang.and.returnValue('en');
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add languages', () => {
    expect(fakeService.addLangs).toHaveBeenCalledWith(['en', 'nl']);
  });

  it('should add default language', () => {
    expect(fakeService.setDefaultLang).toHaveBeenCalledWith('en');
  });

  describe('set browser language as default language', () => {
    it('should set language to EN', () => {
      component.browserLang = '';
      fakeService.getBrowserLang.and.returnValue('en');
      TestBed.createComponent(AppComponent);
      expect(fakeService.use).toHaveBeenCalledWith('en');
    });

    it('should set language to NL', () => {
      component.browserLang = '';
      fakeService.getBrowserLang.and.returnValue('nl');
      TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      expect(fakeService.use).toHaveBeenCalledWith('nl');
    });

    it('should set language to EN because its not a supported language', () => {
      component.browserLang = '';
      fakeService.getBrowserLang.and.returnValue('de');
      TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      expect(fakeService.use).toHaveBeenCalledWith('en');
    });
  });
});
