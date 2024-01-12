import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeCurrenciesService {
  rates: any ;

  constructor(private http: HttpClient) {
  }


  onGetExchangeCurrencies() {
    console.log('get currencies gettttt');
    this.http.get('https://currencyscoop.p.rapidapi.com/latest', {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '894662ee4bmshe4dfa3b2832cb73p1a79afjsn7d7aa4c4c91a',
        'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com'
      }),
    }).subscribe((response: any) => {
      console.log(response['response']['rates']);
      this.rates = response['response']['rates'];

    }, (error: any) => {
      console.log(error);

    })
  }

}




