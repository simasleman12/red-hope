import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from './website/services/home-service.service';
import { LanguageService } from './website/services/language.service';
import { NetworkHandlerService } from './website/services/network-handler.service';
import { RealAccountService } from './website/services/real-account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Black Stallion';
  selectedLanguage = 'ku';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public translate: TranslateService,
    private realAccountService: RealAccountService,
    protected homeService: HomeService, protected languageService: LanguageService, private networkHandlerService: NetworkHandlerService) {
    var token = localStorage.getItem('token') ?? '';
    if (token == '') {
      homeService.isVerifyEmailModalShow = false;
    } else if (token != '') {
      networkHandlerService.onGetMeForCheck(token, 'users').subscribe((reponse: any) => {
        homeService.isVerifyEmailModalShow = false;
      },
        ((error: any) => {
          homeService.isVerifyEmailModalShow = true;
        })
      )
    } else {
      homeService.isVerifyEmailModalShow = true;
    }


    this.realAccountService.onGetCountries();

    this.translate.addLangs(['ku', 'ar', 'en']);
    this.selectedLanguage = localStorage.getItem('language') || 'ku';
    let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = this.selectedLanguage == 'en' ? 'ltr' : 'rtl';
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);

  }

}
