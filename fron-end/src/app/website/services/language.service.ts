import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selectedLanguage = localStorage.getItem('language') || 'ku';

  constructor(@Inject(DOCUMENT) private document: Document,
  public translate: TranslateService,) { }

  onOpenLanguageDropdown(language: string){
    this.selectedLanguage = language;
    localStorage.setItem('language', this.selectedLanguage);
    let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = this.selectedLanguage == 'en' ? 'ltr' : 'rtl';
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(language);
  }
}
