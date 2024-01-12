import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/website/services/home-service.service';
import { LanguageService } from 'src/app/website/services/language.service';
import { RealAccountService } from '../../services/real-account.service';

@Component({
  selector: 'app-real-account-step-two',
  templateUrl: './real-account-step-two.component.html',
  styleUrls: ['./real-account-step-two.component.css']
})
export class RealAccountStepTwoComponent implements OnInit {


  showPassword = false;
  showConfiremPassword = false;
  leverages = [1000, 888, 500, 400, 300, 200, 100, 66, 50, 25, 20, 15, 10, 5, 3, 2, 1];
  investments = ['1,000', '3,000', '5,000', '10,000', '25,000', '50,000', '100,000', '500,000', '1,000,000', '5,000,000'];
  investmentNumber = [1000, 3000, 5000, 10000, 25000, 50000, 100000, 500000, 1000000, 5000000];


  constructor(protected homeService: HomeService, protected languageService: LanguageService,
    protected realAccountService: RealAccountService, private router: Router,    protected realAccountServiec: RealAccountService,
    ) {

    // realAccountService.onGetCountries();
    // realAccountService.onGetCurrencies();
  }


  ngOnInit(): void {

    // if (
    //   !this.realAccountService.realFormStepOne.value.firstName ||
    //   !this.realAccountService.realFormStepOne.value.lastName ||
    //   !this.realAccountService.realFormStepOne.value.country ||
    //   !this.realAccountService.realFormStepOne.value.email ||
    //   !this.realAccountService.realFormStepOne.value.password ||
    //   !this.realAccountService.realFormStepOne.value.confiremPassword
    // ) {
    //   this.router.navigate(['./real_account_step_one']);
    // } else {
    //   console.log('ama keshay nia');

    // }
  }


  onSubmitRealStepOne() {

    if (
      this.realAccountServiec.realFormStepOne.value.firstName != null &&
      this.realAccountServiec.realFormStepOne.value.lastName != null &&
      this.realAccountServiec.realFormStepOne.value.email != null &&
      this.realAccountServiec.realFormStepOne.value.country != null &&
      this.realAccountServiec.realFormStepOne.value.password != null &&
      this.realAccountServiec.realFormStepOne.value.confiremPassword != null &&
      this.realAccountServiec.realFormStepOne.value.password.length >= 8 &&
      this.realAccountServiec.realFormStepOne.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/) &&
      this.realAccountServiec.realFormStepOne.value.password === this.realAccountServiec.realFormStepOne.value.confiremPassword) {
      // console.log(this.realAccountServiec.realFormStepOne.value);
    this.router.navigate(['/dashboard/step_one']);
  this.realAccountServiec.firstNameError = '';
      this.realAccountServiec.lastNameError = '';
      this.realAccountServiec.emailError = '';
      this.realAccountServiec.countryError = '';
      this.realAccountServiec.passwordError = '';
      this.realAccountServiec.confiremPasswordError = '';
    }
    else {

      if (this.realAccountServiec.realFormStepOne.value.firstName == null || this.realAccountServiec.realFormStepOne.value.firstName =='' ) {
        this.realAccountServiec.firstNameError = 'ناو داواکراوە.';
      } else {
        this.realAccountServiec.firstNameError = '';
      }

      if (!this.realAccountServiec.realFormStepOne.value.lastName) {
        this.realAccountServiec.lastNameError = 'داواکراوە.';
      } else {
        this.realAccountServiec.lastNameError = '';
      }

      if (!this.realAccountServiec.realFormStepOne.value.email) {
        this.realAccountServiec.emailError = 'ئیمەیڵ داواکراوە.';
      } else {
        this.realAccountServiec.emailError = '';
      }


      if (this.realAccountServiec.realFormStepOne.value.password == undefined) {
        this.realAccountServiec.passwordError = 'پێویستە وشەی نهێنی لە ٨ پیت کەمتر نەبێت و (capital letter, small letter, هێما) ی تێدابێت و وشە نهێنیە باوەکان نەبێت.'
      }
      else if (this.realAccountServiec.realFormStepOne.value.password.length >= 8 && this.realAccountServiec.realFormStepOne.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/)) {
        this.realAccountServiec.passwordError = '';
      } else if (!((this.realAccountServiec.realFormStepOne.value.password.length >= 8 && this.realAccountServiec.realFormStepOne.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[0-9a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/)))) {
        this.realAccountServiec.passwordError = 'پێویستە وشەی نهێنی لە ٨ پیت کەمتر نەبێت و (capital letter, small letter, هێما) ی تێدابێت و وشە نهێنیە باوەکان نەبێت.'
      }


      if (this.realAccountServiec.realFormStepOne.value.confiremPassword == undefined) {
        this.realAccountServiec.confiremPasswordError = 'وشەنهێنیەکان هاوشێوەنین.'
      }
      else
        if (this.realAccountServiec.realFormStepOne.value.confiremPassword != this.realAccountServiec.realFormStepOne.value.password) {
          this.realAccountServiec.confiremPasswordError = 'وشەنهێنیەکان هاوشێوەنین.'
        } else {
          this.realAccountServiec.confiremPasswordError = '';
        }

    }



  }



  // onSubmitRealStepOne() {
  //   this.router.navigate(['/dashboard/step_one']);
  // }


  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onShowConfiremPassword() {
    this.showConfiremPassword = !this.showConfiremPassword;
  }

}
