import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from 'src/app/website/services/home-service.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from 'src/app/website/services/language.service';
import { LoginService } from '../../auth/login.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavOpen = false;
  isProfileNavOpen = false;
  isTradingOpen = false;
  isMarketOpen = false;
  isAboutOpen = false;
  isLanguageOpen = false;
  isProfileOpen = false;
  openDropdown = false;
  openDropdownProfile = false;


  constructor(protected homeService: HomeService,
    protected languageService: LanguageService,
    public translate: TranslateService,
    protected loginService: LoginService,
    protected router: Router,
  ) {


  }

  ngOnInit(): void {
  }


  onContactUs() {
  
    if(this.router.url !== '/'){
      this.homeService.customRoute.next('contact');
      this.router.navigateByUrl('/');
   
    }
    else{
      this.homeService.customRoute.next('contact');
    }
  }

  onTop() {
    if (this.router.url == '/') {
      this.homeService.customRoute.next('top');
    } 
    // else if (this.router.url == '/about') {
    //   this.homeService.customRoute.next('topabout');
    // } else if (this.router.url == '/market&alerts/technical_analysis') {
    //   this.homeService.customRoute.next('toptechnicalanalysis');
    // } else if (this.router.url == '/market&alerts/news_detail') {
    //   this.homeService.customRoute.next('topnews');
    // }
  }

  onPayment() {
    if(this.router.url !== '/'){
       this.homeService.customRoute.next('payment');
      this.router.navigateByUrl('/');


    }
    else{
      this.homeService.customRoute.next('payment');
    }
    // this.homeService.customRoute.next('payment');
  }


  onOpenLanguageDropdown(language: string): void {
    if (language != '') {
      this.languageService.onOpenLanguageDropdown(language);
    }
    this.openDropdown = !this.openDropdown;
    this.openDropdownProfile = false;

  }


  onOpenprofileDropdown(): void {
    this.openDropdown = false;
    this.openDropdownProfile = !this.openDropdownProfile;
  }

  onOpenNav() {
    this.isProfileNavOpen = false;
    this.isNavOpen = !this.isNavOpen;
  }


  onOpenTradingForMob() {
    this.isTradingOpen = !this.isTradingOpen;
  }

  onOpenMarketForMob() {
    this.isMarketOpen = !this.isMarketOpen;
    this.homeService.onChangeStatus('');
  }

  onOpenAboutForMob(status: string) {
    this.isAboutOpen = !this.isAboutOpen;
    this.homeService.onChangeStatus(status);
  }

  onOpenProfileNav() {
    this.isNavOpen = false;
    this.isProfileNavOpen = !this.isProfileNavOpen
  }



  onOpenlanguageForMob() {
    this.isLanguageOpen = !this.isLanguageOpen;
  }

  // onOpenProfileForMob() {
  //   this.isProfileOpen = !this.isProfileOpen;
  // }

  onPortal() {

    var token = localStorage.getItem('token') ?? '';
    if (token == '') {
      if (this.isProfileNavOpen) {
        this.onOpenProfileNav();
      }
      this.router.navigate(['/']);
      this.homeService.onShowModal('real account');
    } else {
      this.router.navigate(['/dashboard/step_one']);
    }
    this.openDropdownProfile = false;

  }


  onLogin() {
    this.loginService.login=true;
    var token = localStorage.getItem('token') ?? '';
    if (token == '') {
      this.homeService.onShowModal('real account');
    } else {
      this.homeService.isVerifyEmailModalShow = true;
    }
  }


  addnews() {
    this.loginService.news=true;
    // var token = localStorage.getItem('token') ?? '';
    // if (token == '') {
    //   this.homeService.onShowModal('real account');
    // } else {
    //   this.homeService.isVerifyEmailModalShow = true;
    // }
  }


  folder() {
    this.loginService.folder=true;
    // var token = localStorage.getItem('token') ?? '';
    // if (token == '') {
    //   this.homeService.onShowModal('real account');
    // } else {
    //   this.homeService.isVerifyEmailModalShow = true;
    // }
  }


  
  onLogout() {
    this.loginService.notifi=true;

    // this.loginService.token = localStorage.getItem('token') ?? '';
     
    //   this.loginService.onLogout({}).subscribe((response: any) => {
    //     // console.log(response);
    //     this.loginService.token = '';
    //     localStorage.removeItem('token');
    //     this.router.navigate(['/']);
    //     console.log(response);
        
    //   }, error => {
    //     console.log(error);
        
    //   })

    

  }





}
