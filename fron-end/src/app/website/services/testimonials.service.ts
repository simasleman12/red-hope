import { Injectable } from '@angular/core';
import { NetworkHandlerService } from './network-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  testimonials = [];
  // testimonialsdata: NewsModel = new NewsModel('', '', '', '', '', '', '', '', '', '', '', '');
  perPage = 0;
  lastPage = 0;
  lastPageArray: number[] = [];
  currentPage = 0;
  totalTestimonials = 0;
  paginationNumber = this.currentPage;
  indexOFTestimonials = 0;

  constructor(private networkHandlerService: NetworkHandlerService) { }

  onGetTestimonials(number: number) {
    let pageIndex = number;

    this.testimonials = [];
    this.lastPageArray = [];


    this.networkHandlerService.onGet(`/imonials?page=${pageIndex}`, 'others')
      .subscribe((response: any) => {
        console.log(response);

        this.testimonials = response['imonials'];
        this.perPage = response['perPage'];
        this.totalTestimonials = response['totalTestImonial'];
        this.lastPage = response['lastPage'];
        for (let i = 1; i <= this.lastPage; i++) {
          this.lastPageArray.push(i);
        }
        this.currentPage = response['currentPage'];

      }, (error: any) => {
        console.log(error);

      });
  }

}
