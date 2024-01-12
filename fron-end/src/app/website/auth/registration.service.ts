import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistratioModel } from '../models/registration-model';
import { NetworkHandlerService } from '../services/network-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private networkHandler: NetworkHandlerService, private router: Router) { }

  onRegister(body: RegistratioModel) {
    return this.networkHandler.onPost(body, '/register', 'users');
  }

  onGetMeForCheck(token: string) {
    return this.networkHandler.onGetMeForCheck(token, 'users');
  }


}
