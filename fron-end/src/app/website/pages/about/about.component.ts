import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { LanguageService } from 'src/app/website/services/language.service';
import { HomeService } from '../../services/home-service.service';
import { Router } from '@angular/router';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @ViewChild('topabout') topabout: any;

  constructor(protected languageService: LanguageService, private homeService: HomeService, private route: Router) { }

  ngOnInit(): void {

    this.homeService.customRoute.subscribe(value => {
      this.onTop();

    });
  }

  items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  onTop() {
    // this.route.navigate(['/about']).then(() => {
    //   this.topabout.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    // })
  }

}
