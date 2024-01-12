import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/website/services/home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('payment') payment: any;
  @ViewChild('contact') contact: any;
  @ViewChild('services') services: any;
  @ViewChild('top') top: any;



  constructor(protected homeService: HomeService, private route: Router) {


  }

  ngOnInit(): void {
    this.homeService.customRoute.subscribe(value => {
      if (value == 'payment') {
        this.onPayment();
      } else if (value == 'contact') {
        this.onContactUs();
      } else if (value == 'services') {
        this.onServices();
      } else if (value == 'top') {
        this.onTop();
      }
    });
  }



  onPayment() {
    this.route.navigate(['/']).then(() => {
      this.payment.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    })

  }

  onContactUs() {
    this.route.navigate(['/']).then(() => {
      this.contact.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    })

  }

  onServices() {
    this.route.navigate(['/']).then(() => {
      this.services.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    })

  }

  onTop() {
    this.route.navigate(['/']).then(() => {
      this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    })

  }






}
