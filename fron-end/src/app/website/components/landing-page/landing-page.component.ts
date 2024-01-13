import { Renderer2, Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/website/services/home-service.service';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { LanguageService } from 'src/app/website/services/language.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/website/auth/login.service';
 import { LoginModel } from 'src/app/website/models/login-model';
 import { delay } from 'rxjs';
import { Router } from '@angular/router';
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
  gender:any='Male';
  noti:any=[1,1,2,3,4,4]
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
     private router: Router,
     ) {
      
    // changeCurrenciesService.onGetExchangeCurrencies()
    // setInterval(function () {
    //   changeCurrenciesService.onGetExchangeCurrencies()
    // }, 1000);

  }
  typeblood:any = [
    {value:'A+'},
    {value:'A-'},
    {value:'B+'},
    {value:'B-'},
    {value:'O+'},
    {value:'O-'},
    {value:'AB+'},
    {value:'AB-'},
  ];



  female(){
    this.gender = 'FeMale';
  }

  male(){
    this.gender =  'Male';
  }
 
  smok:any='No';
  yessmok(){
    this.smok = 'Yes';
  }

  Nosmok(){
    this.smok =  'No';
  }

Suger:any='No';
  yesSuger(){
    this.Suger = 'Yes';
  }

  NoSuger(){
    this.Suger =  'No';
  }

  logins(){
    this.loginService.login =  !this.loginService.login;
  }
  addnews(){
    this.loginService.news =  !this.loginService.news;

  }
  signup(){
    this.loginService.signin =  !this.loginService.signin;
  }
  news(){
    this.loginService.news =  !this.loginService.news;
  }
  fol(){
    this.loginService.folder =  !this.loginService.folder;
  }
  notific(){
    this.loginService.notifi =  !this.loginService.notifi;
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
    
  }



  onCheckVerification() {
    
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

  help:any=false;
  ohelp() {
    this.help =  !this.help;
    
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
