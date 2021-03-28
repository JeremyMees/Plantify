import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  browserLang: string;
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');

    this.browserLang = translate.getBrowserLang();
    console.log(this.browserLang);
    translate.use(this.browserLang.match(/en|nl/) ? this.browserLang : 'en');
  }
}
