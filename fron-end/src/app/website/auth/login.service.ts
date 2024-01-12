import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login-model';
import { NetworkHandlerService } from '../services/network-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token = localStorage.getItem('token') ?? '';

  constructor(private networkHandler: NetworkHandlerService, private router: Router) { }

  onLogin(body: LoginModel) {
    return this.networkHandler.onPost(body, '/login', 'users');
  }

  onLogout(body: any) {
    return this.networkHandler.onPost(body, '/logout', 'users');
  }


}
