import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkHandlerService {

  constructor(private http: HttpClient) { }

   


 






  onPost(body: any, endPoint: string, prefixType: string,) {
    var token = localStorage.getItem('token') ?? '';
    var url = '';
    if (prefixType == 'others') {
      url = this.createUrlOthers(endPoint)
    } else if (prefixType == 'users') {
      url = this.createUrlUsers(endPoint)
    } else {
      url = this.createUrlAccounts(endPoint)
    }
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
         'Authorization': `Bearer ${token}`
      }),
    });
  }

  onGet(endPoint: string, prefixType: string) {
    // var token = localStorage.getItem('token') ?? '';
    var url = '';
    if (prefixType == 'others') {
      url = this.createUrlOthers(endPoint)
    } else if (prefixType == 'users') {
      url = this.createUrlUsers(endPoint)
    } else {
      url = this.createUrlAccounts(endPoint)
    }

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
        // 'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`
      }),
    });
  }

  onGetMeForCheck(tokenForGetMe: string, prefixType: string) {
    var token = tokenForGetMe
    var url = '';
    if (prefixType == 'others') {
      url = this.createUrlOthers('/check-email-verification')
    } else if (prefixType == 'users') {
      url = this.createUrlUsers('/check-email-verification')
    } else {
      url = this.createUrlAccounts('/check-email-verification')
    }
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    });
  }



  createUrlOthers(endPoint: string) {
    return 'https://black-stallion-backend-api-ece2qdboea-uc.a.run.app'+ endPoint;

    // return 'https://black-stallion.ml/api' + endPoint;
  }

  createUrlUsers(endPoint: string) {
    return 'https://black-stallion-backend-api-ece2qdboea-uc.a.run.app'+ endPoint;

    // return 'https://black-stallion.ml/api/YuFsUAoI2JXRZGdfe3WcHvKgq4j6APO' + endPoint;
  }

  createUrlAccounts(endPoint: string) {
    return 'https://black-stallion-backend-api-ece2qdboea-uc.a.run.app'+ endPoint;

    // return 'https://black-stallion.ml/api/jbUCnl3mJtwy333F8uo18OIpcq7u7YyYBgmnBUZF7cPgHMgv3KToi' + endPoint;
  }

  


}
