import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HomeComponent } from '../pages/home/home.component';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  customRoute = new BehaviorSubject("any");

  modalStatus = 'login';
  status = '';

  accountType = '';
  isModalShow = false;
  isTradingModalShow = false;
  isVerifyEmailModalShow = false;
  isDiclaimerPdfShow = false;

  constructor(private router: Router) { }




  onShowModal(accountType: string) {
    this.accountType = accountType;
    var token = localStorage.getItem('token') ?? '';
    if (token != '') {
      if (this.accountType == 'demo account') {
        this.router.navigate(['/demo_account']);
        
      } else if (this.accountType == 'real account') {
        this.router.navigate(['/real_account_step_one']);
      } else {
        this.isModalShow = !this.isModalShow;
        this.status = '';
      }
    } else {
      this.isModalShow = !this.isModalShow;
      this.status = '';
    }

  }

  onTradingShowModal() {
    this.router.navigate(['/start_trading']);
    this.isTradingModalShow = !this.isTradingModalShow;
    this.status = '';
    if (!this.isTradingModalShow) {
      this.router.navigate(['/start_trading']);
    }
  }

  onDisclaimerPdfShowModal() {
    this.isDiclaimerPdfShow = !this.isDiclaimerPdfShow;
  }

  onVerifyEmailShowModal() {
    this.isVerifyEmailModalShow = !this.isVerifyEmailModalShow;
  }

  onChangeStatus(status: string) {
    this.status = status;
  }

  onGoToLoginForm(accountType: string) {
    var token = localStorage.getItem('token') ?? '';
    if (token != '') {
      if (accountType == 'demo account') {
        this.router.navigate(['/demo_account']);
      } else if (accountType == 'real account') {
        this.router.navigate(['/real_account_step_one']);
      } else {
        this.isTradingModalShow = false
        this.isModalShow = true;
        this.modalStatus = 'login';
      }
    } else {
      this.isTradingModalShow = false
      this.isModalShow = true;
      this.modalStatus = 'login';
    }

  }


}
