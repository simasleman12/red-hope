import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { LanguageService } from 'src/app/website/services/language.service';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TestimonialsComponent implements OnInit {

  constructor(protected languageService: LanguageService) { }

  ngOnInit(): void {
  }

  items = [1, 2, 3, 4, 5];


}
