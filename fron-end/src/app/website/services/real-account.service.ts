import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NetworkHandlerService } from './network-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RealAccountService {
  countries = [];
  currencies = [];
  realFormStepOne!: FormGroup;
  firstNameError = '';
  lastNameError = '';
  countryError = '';
  emailError = '';
  passwordError = '';
  confiremPasswordError = '';


  constructor(private networkHandllerService: NetworkHandlerService) {

  }



  onGetCountries() {
    this.countries = [];
    this.currencies = [];
    this.onGetCurrencies().subscribe((responseCurrenices: any) => {
      this.currencies = responseCurrenices;

      this.networkHandllerService.onGet('/countries', 'others').subscribe((responseCountries: any) => {
        this.countries = responseCountries;
        
        this.realFormStepOne = new FormGroup({
          'firstName': new FormControl('', Validators.required),
          'lastName': new FormControl('', Validators.required),
          'country': new FormControl(this.countries[1]['_id'], Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl(null, Validators.required),
          'confiremPassword': new FormControl(null, Validators.required),
          'platformType': new FormControl('mt5', Validators.required),
          'accountType': new FormControl(0, Validators.required),
          'currency': new FormControl(this.currencies[1]['_id'], Validators.required),
          'leverage': new FormControl(1000, Validators.required),
          'investment': new FormControl(1000, Validators.required,),
          'dateOfBirth': new FormControl(null, Validators.required),
          'city': new FormControl(null, Validators.required),
          'phoneNumber': new FormControl('', Validators.required),
          'cardtypeCard': new FormControl('civil status id', Validators.required),
          'cardnumber': new FormControl(null, Validators.required),
        });


      }, error => {
        // console.log('===== get countries =====');
        console.log(error);
      });


      // console.log(response);

    }, error => {
      // console.log('===== get currencies =====');
      console.log(error);
    });

  }


  onGetCurrencies() {
    return this.networkHandllerService.onGet('/currencies', 'others')
  }

  onGetMe() {
    return this.networkHandllerService.onGet('/me', 'users');
  }


  onSubmitRealAccount(body: any) {
    return this.networkHandllerService.onPost(body, '/register', 'accounts');
  }


}
