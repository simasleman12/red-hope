import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealAccountService } from 'src/app/website/services/real-account.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
  firstNameError = '';
  lastNameError = '';
  emailError = '';
  phoneError = '';
  countryError = '';
  cityError = '';
  birthError = '';


  constructor(protected realAccountService: RealAccountService, private router: Router) {
    // realAccountService.onGetCountries();

  }

  ngOnInit(): void {

  }

  onNext() {
   

    if (this.realAccountService.realFormStepOne.value.firstName != null &&
      this.realAccountService.realFormStepOne.value.lastName != null &&
      this.realAccountService.realFormStepOne.value.email != null &&
      this.realAccountService.realFormStepOne.value.phoneNumber != null &&
      this.realAccountService.realFormStepOne.value.country != null &&
      this.realAccountService.realFormStepOne.value.city != null &&
      this.realAccountService.realFormStepOne.value.dateOfBirth != null
    ) {
      this.firstNameError = '';
      this.lastNameError = '';
      this.emailError = '';
      this.phoneError = '';
      this.countryError = '';
      this.cityError = '';
      this.birthError = '';

      this.router.navigate(['./dashboard/step_two']);

    } else {
      if (!this.realAccountService.realFormStepOne.value.firstName) {
        this.firstNameError = 'ناو داواکراوە.';
      } else {
        this.firstNameError = '';
      }

      if (!this.realAccountService.realFormStepOne.value.lastName) {
        this.lastNameError = 'داواکراوە.';
      } else {
        this.lastNameError = '';
      }

      if (!this.realAccountService.realFormStepOne.value.email) {
        this.emailError = 'ئیمەیڵ داواکراوە.';
      } else {
        this.emailError = '';
      }

      if (!this.realAccountService.realFormStepOne.value.phoneNumber) {
        this.phoneError = 'ژمارە تەلەفون داواکراوە.';
      } else {
        this.phoneError = '';
      }

      if (!this.realAccountService.realFormStepOne.value.country) {
        this.countryError = 'وڵات داواکراوە.';
      } else {
        this.countryError = '';
      }


      if (!this.realAccountService.realFormStepOne.value.city) {
        this.cityError = 'شار داواکراوە.';
      } else {
        this.cityError = '';
      }

      if (!this.realAccountService.realFormStepOne.value.dateOfBirth) {
        this.birthError = 'بەرواری لەدایکبون داواکراوە.';
      } else {
        this.birthError = '';
      }


    }






  }

}
