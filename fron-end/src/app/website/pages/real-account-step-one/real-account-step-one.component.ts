import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/website/services/home-service.service';
import { LanguageService } from 'src/app/website/services/language.service';
import { RealAccountService } from '../../services/real-account.service';

@Component({
  selector: 'app-real-account-step-one',
  templateUrl: './real-account-step-one.component.html',
  styleUrls: ['./real-account-step-one.component.css']
})
export class RealAccountStepOneComponent implements OnInit {

  showPassword = false;
  showConfiremPassword = false;



  constructor(
    protected homeService: HomeService,
    protected languageService: LanguageService,
    protected realAccountServiec: RealAccountService,
    private router: Router
  ) {
    // realAccountServiec.onGetCountries();
  }


  ngOnInit(): void {

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
      this.router.navigate(['/real_account_step_two']);
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

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onShowConfiremPassword() {
    this.showConfiremPassword = !this.showConfiremPassword;
  }


}
