import { Injectable } from '@angular/core';
import { DemoAccountModel } from '../models/demo-account-model';
import { NetworkHandlerService } from './network-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DemAccountService {
  countries = [];
  currencies = [];

  constructor(private networkHandllerService: NetworkHandlerService) { }


  onGetCountries() {
    return this.networkHandllerService.onGet('/countries', 'others')
  }


  onGetCurrencies() {
    return this.networkHandllerService.onGet('/currencies', 'others')
  }

  onGetMe() {
    return this.networkHandllerService.onGet('/me', 'users');
  }

  onCreateDemoAccount(body: DemoAccountModel) {
    return this.networkHandllerService.onPost(body, '/register', 'accounts');
  }

}
