import { Renderer2, Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/website/services/home-service.service';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { LanguageService } from 'src/app/website/services/language.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/website/auth/login.service';
import { RegistrationService } from 'src/app/website/auth/registration.service';
import { LoginModel } from 'src/app/website/models/login-model';
import { RegistratioModel } from 'src/app/website/models/registration-model';
import { delay } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeCurrenciesService } from '../../services/change-currencies.service';
 // install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);
 
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  template: '<div>Current date: {{ currentDate }}</div>'

 

})
export class LandingPageComponent implements OnInit {
 


  items = ['EUR', 'GBP', 'CAD', 'CHF','UTF','ABC','WWW'];
  showPassword = false;
  showConfiremPassword = false;
  registrationForm!: FormGroup;
  loginForm!: FormGroup;
  RUsernameError = '';
  RPhoneNumberError = '';
  REmailError = '';
  RPasswordError = '';
  RPasswordConfiremError = '';
  LEmailError = '';
  LPasswordError = '';
  loginError = '';
  checkVerifyButtonString = 'Check Verification';
 

  constructor(protected homeService: HomeService,
    private renderer: Renderer2,
    protected languageService: LanguageService,
    protected loginService: LoginService,
    private registrationService: RegistrationService,
    private router: Router,
     protected changeCurrenciesService: ChangeCurrenciesService) {
      
    // changeCurrenciesService.onGetExchangeCurrencies()
    // setInterval(function () {
    //   changeCurrenciesService.onGetExchangeCurrencies()
    // }, 1000);

  }


  ngOnInit(): void {
  



    this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confiremPassword': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });


    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    });
  }



  onSubmitRegistration() {
    // && this.registrationForm.value.password == this.registrationForm.value.confiremPassword
    if (this.registrationForm.valid &&
      this.registrationForm.value.password.length >= 8 && this.registrationForm.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/) &&
      this.registrationForm.value.password === this.registrationForm.value.confiremPassword
    ) {
      var registrationBody = new RegistratioModel(
        this.registrationForm.value.username,
        this.registrationForm.value.phoneNumber,
        this.registrationForm.value.email,
        this.registrationForm.value.password,
        this.registrationForm.value.confiremPassword
      );

      this.registrationService.onRegister(registrationBody).subscribe((response: any) => {
        this.onResetRegistration();
        localStorage.setItem('token', response.token)
        this.loginService.token = response.token;
        this.homeService.isVerifyEmailModalShow = true;
        this.homeService.isModalShow = false;
        this.RUsernameError = '';
        this.RPhoneNumberError = '';
        this.REmailError = '';
        this.RPasswordError = '';
        this.RPasswordConfiremError = '';
         
console.log(response);

      }, (error: any) => {
        // console.log(error);
        // console.log(error.error.errors.fullname);
        if (error.error.errors.fullname != undefined) {
          this.RUsernameError = error.error.errors.fullname[0];
        } else if (error.error.errors.phone != undefined) {
          this.RPhoneNumberError = error.error.errors.phone[0];
        }
        if (error.error.errors.email != undefined) {
          this.REmailError = error.error.errors.email[0];
        } if (error.error.errors.password != undefined) {
          if (error.error.errors.password == 'The password confirmation does not match.') {
            // this.RPasswordError = error.error.errors.password[0];
            this.RPasswordConfiremError = 'وشەنهێنیەکان هاوشێوەنین.';
          } else if (error.error.errors.password == 'The given password has appeared in a data leak. Please choose a different password.') {
            // this.RPasswordError = error.error.errors.password[0];
            this.RPasswordError = 'ئەم وشەن‌هێنیە زۆر دوبارە بۆتەوە، تکایە وشەیەکی تر بنوسە.';

          }
        } else {
          this.RUsernameError = '';
          this.RPhoneNumberError = '';
          this.REmailError = '';
          this.RPasswordError = '';
          this.RPasswordConfiremError = '';
        }
      });

    } else {

      if (this.registrationForm.value.username == undefined) {
        this.RUsernameError = 'پێویستە ناوی بەکارهێنەر لە ١٠ پیت کەمترنەبێت.'
      } else
        if (this.registrationForm.value.username.length < 10) {
          this.RUsernameError = 'پێویستە ناوی بەکارهێنەر لە ١٠ پیت کەمترنەبێت.'
        } else {
          this.RUsernameError = '';
        }


      if (this.registrationForm.value.phoneNumber == undefined) {
        this.RPhoneNumberError = 'ژمارە تەلەفون نادروستە.'
      } else
        if (this.registrationForm.value.phoneNumber.length != 11 || this.registrationForm.value.phoneNumber[0] != 0) {
          this.RPhoneNumberError = 'ژمارە تەلەفون نادروستە.'
        } else {
          this.RPhoneNumberError = '';
        }


      if (this.registrationForm.value.email == undefined) {
        this.REmailError = 'ئیمەیڵ نادروستە.'
      } else {
        this.REmailError = '';
      }


      if (this.registrationForm.value.password == undefined) {
        this.RPasswordError = 'پێویستە وشەی نهێنی لە ٨ پیت کەمتر نەبێت و (capital letter, small letter, هێما) ی تێدابێت و وشە نهێنیە باوەکان نەبێت.'
      }
      else if (this.registrationForm.value.password.length >= 8 && this.registrationForm.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/)) {
        this.RPasswordError = '';
      } else if (!((this.registrationForm.value.password.length >= 8 && this.registrationForm.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/)))) {
        this.RPasswordError = 'پێویستە وشەی نهێنی لە ٨ پیت کەمتر نەبێت و (capital letter, small letter, هێما) ی تێدابێت و وشە نهێنیە باوەکان نەبێت.'
      }



      if (this.registrationForm.value.confiremPassword == undefined) {
        this.RPasswordConfiremError = 'وشەنهێنیەکان هاوشێوەنین.'
      }
      else
        if (this.registrationForm.value.confiremPassword != this.registrationForm.value.password) {
          this.RPasswordConfiremError = 'وشەنهێنیەکان هاوشێوەنین.'
        } else {
          this.RPasswordConfiremError = '';
        }

    }

  }



  onCheckVerification() {
    this.registrationService.onGetMeForCheck(this.loginService.token).subscribe((response: any) => {

      this.checkVerifyButtonString = 'Verified';
      setTimeout(() => {
        this.homeService.isVerifyEmailModalShow = false;
        // if (this.homeService.accountType == 'demo account') {
        //   this.router.navigate(['/demo_account']);
        // } else if (this.homeService.accountType == 'real account') {
        //   this.router.navigate(['/real_account_step_one']);
        // }
      }, 3000);

console.log(response);

    }, (error: any) => {
      this.checkVerifyButtonString = 'Not Verified';
console.log(error);

    });
  }








  onSubmitLogin() {

    if (this.loginForm.valid) {
      var loginBody = new LoginModel(this.loginForm.value.email, this.loginForm.value.password);
      this.loginService.onLogin(loginBody).subscribe((response: any) => {
        this.onResetLogin();
        // console.log(response);
        localStorage.setItem('token', response.token);
        this.loginService.token = response.token;
        this.homeService.isModalShow = false;
        this.router.navigate(['/']);

        this.LEmailError = '';
        this.LPasswordError = '';
        this.loginError = '';

      }, (error: any) => {
        // console.log(error);
        // if (error.error.message) {}
        this.loginError = error.error.message;
        this.LEmailError = '';
        this.LPasswordError = '';
      });
    } else {
      this.loginError = '';
      this.LEmailError = 'ئیمەیڵ داواکراوە.';
      this.LPasswordError = 'وشەی نهێنی داواکراوە.';
    }

  }





  // reset forms

  onResetRegistration() {
    this.registrationForm.reset();
  }

  onResetLogin() {
    this.loginForm.reset();
  }

  onReset() {
    this.registrationForm.reset();
    this.loginForm.reset();
    this.homeService.onShowModal('');
    this.RUsernameError = '';
    this.RPhoneNumberError = '';
    this.REmailError = '';
    this.RPasswordError = '';
    this.RPasswordConfiremError = '';
    this.LEmailError = '';
    this.LPasswordError = '';
    this.loginError = '';
  }



  // change modal status for register and login
  onChangeModalStatus(status: string) {
    this.homeService.modalStatus = status;
    this.RUsernameError = '';
    this.RPhoneNumberError = '';
    this.REmailError = '';
    this.RPasswordError = '';
    this.RPasswordConfiremError = '';
    this.LEmailError = '';
    this.LPasswordError = '';
    this.loginError = '';

  }


  onLogout() {
    this.loginService.token = localStorage.getItem('') ?? '';
    console.log('pesh if');
    
     
      this.loginService.onLogout({}).subscribe((response: any) => {
        // console.log(response);
        localStorage.removeItem('token');
        this.homeService.isVerifyEmailModalShow = false;
        this.loginService.token = '';
        this.router.navigate(['/']);
        console.log(response);
        
      }, error => {
console.log('erroerrrrrrr'+error);

      })

    
  }




  // show and hide password
  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onShowConfiremPassword() {
    this.showConfiremPassword = !this.showConfiremPassword;
  }




}
