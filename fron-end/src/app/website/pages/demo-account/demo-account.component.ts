import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { DemoAccountModel } from 'src/app/website/models/demo-account-model';
import { DemAccountService } from 'src/app/website/services/dem-account.service';
import { HomeService } from 'src/app/website/services/home-service.service';
import { LanguageService } from 'src/app/website/services/language.service';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-demo-account',
  templateUrl: './demo-account.component.html',
  styleUrls: ['./demo-account.component.css']
})
export class DemoAccountComponent implements OnInit {

  showAlert = false;
  showPassword = false;
  showConfiremPassword = false;
  leverages = [1000, 888, 500, 400, 300, 200, 100, 66, 50, 25, 20, 15, 10, 5, 3, 2, 1];
  investments = ['1,000', '3,000', '5,000', '10,000', '25,000', '50,000', '100,000', '500,000', '1,000,000', '5,000,000'];
  investmentNumber = [1000, 3000, 5000, 10000, 25000, 50000, 100000, 500000, 1000000, 5000000];
  demoAccountForm!: FormGroup;
  firstNameError = '';
  lastNameError = '';
  phoneNumberError = '';
  emailError = '';
  passwordError = '';
  passwordConfiremError = '';
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  // TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom
  ];
  countries = [];
  currencies: any;

  constructor(protected homeService: HomeService,
    private router: Router,
    protected languageService: LanguageService, protected loginService: LoginService,
    protected demoAccountService: DemAccountService) {


    this.demoAccountService.onGetCountries().subscribe((response: any) => {
      console.log(this.currencies);
      
      this.countries = response;
      console.log("ciuntryyyyyyyyyyy");
      console.log(response);
      
      

      this.demoAccountService.onGetCurrencies().subscribe((response: any) => {
        this.currencies = response;
 
        this.demoAccountForm = new FormGroup({
          'firstName': new FormControl(null, Validators.required),
          'lastName': new FormControl('', Validators.required),
          'country': new FormControl(this.countries[1]['_id'], Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl(null, Validators.required),
          'confiremPassword': new FormControl(null, Validators.required),
          'phoneNumber': new FormControl('', Validators.required),
          'platformType': new FormControl('mt5', Validators.required),
          'currency': new FormControl(this.currencies[1]['_id'], Validators.required),
          'leverage': new FormControl(1000, Validators.required),
          'investmentAmount': new FormControl(1000, Validators.required),
          'accountType': new FormControl(0, Validators.required),
        });

        console.log("//////////////////");
        console.log(this.currencies);
        
        
 
      }, error => {
        console.log(error.error);
      });



    }, error => {
      console.log(error.error);
    });;
 
    // this.demoAccountService.onGetMe().subscribe((response: any) => {
    // });

  }

  ngOnInit(): void {

  }

  onSubmitDemoAccount() {
    // console.log(this.demoAccountForm.value.phoneNumber['internationalNumber']);
    console.log(this.demoAccountForm.value);

    if (this.demoAccountForm.valid &&
      this.demoAccountForm.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/) &&
      this.demoAccountForm.value.password === this.demoAccountForm.value.confiremPassword) {
      // console.log(this.demoAccountForm.value);
      var createDemoAccountBody = new DemoAccountModel(
        this.demoAccountForm.value.firstName,
        this.demoAccountForm.value.lastName,
        this.demoAccountForm.value.phoneNumber['internationalNumber'],
        this.demoAccountForm.value.email,
        this.demoAccountForm.value.password,
        this.demoAccountForm.value.confiremPassword,
        this.demoAccountForm.value.country,
        this.demoAccountForm.value.currency,
        'demo',
        this.demoAccountForm.value.platformType,
        this.demoAccountForm.value.leverage,
        this.demoAccountForm.value.investmentAmount,
        0
      );
      this.demoAccountService.onCreateDemoAccount(createDemoAccountBody).subscribe((response: any) => {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['/']);
        }, 2000);

        localStorage.setItem('token', response.token)
        this.loginService.token = response.token;
        this.homeService.isVerifyEmailModalShow = true;
        this.homeService.isModalShow = false;
        console.log(response);
        
      }, (error) => {
        
console.log(error.error);


      });
    } else {

      if (!this.demoAccountForm.value.firstName) {
        this.firstNameError = 'ناو داواکراوە.';
      } else {
        this.firstNameError = '';
      }

      if (!this.demoAccountForm.value.lastName) {
        this.lastNameError = 'داواکراوە.';
      } else {
        this.lastNameError = '';
      }

      if (!this.demoAccountForm.value.email) {
        this.emailError = 'ئیمەیڵ داواکراوە.';
      } else {
        this.emailError = '';
      }

      if (!this.demoAccountForm.value.phoneNumber) {
        this.phoneNumberError = 'ژمارە تەلەفون داواکراوە.';
      } else {
        this.phoneNumberError = '';
      }



      if (this.demoAccountForm.value.password == undefined) {
        this.passwordError = 'پێویستە وشەی نهێنی لە ٨ پیت کەمتر نەبێت و (capital letter, small letter, هێما) ی تێدابێت و وشە نهێنیە باوەکان نەبێت.'
      }
      else if (this.demoAccountForm.value.password.length >= 8 && this.demoAccountForm.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/)) {
        this.passwordError = '';
      } else if (!((this.demoAccountForm.value.password.length >= 8 && this.demoAccountForm.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/)))) {
        this.passwordError = 'پێویستە وشەی نهێنی لە ٨ پیت کەمتر نەبێت و (capital letter, small letter, هێما) ی تێدابێت و وشە نهێنیە باوەکان نەبێت.'
      }


      if (this.demoAccountForm.value.confiremPassword == undefined) {
        this.passwordConfiremError = 'وشەنهێنیەکان هاوشێوەنین.'
      }
      else
        if (this.demoAccountForm.value.confiremPassword != this.demoAccountForm.value.password) {
          this.passwordConfiremError = 'وشەنهێنیەکان هاوشێوەنین.'
        } else {
          this.passwordConfiremError = '';
        }

    }
  }

  // show and hide password
  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onShowConfiremPassword() {
    this.showConfiremPassword = !this.showConfiremPassword;
  }

}
