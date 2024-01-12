import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { LanguageService } from 'src/app/website/services/language.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HomeService } from '../../services/home-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LatestNewsComponent implements OnInit {
  @ViewChild('topnews') topnews: any;

  constructor(private route: ActivatedRoute,protected languageService: LanguageService,private sanitizer: DomSanitizer, private http: HttpClient,  private homeService: HomeService, private route1: Router) { }
  // id = '';
 
  // data:any;
  routeSub!: Subscription;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(async (params) => {
      // this.id = params['id'];
     
 



    this.news().subscribe((res: any) => {
      this.newss = res;

      for (let i = 0; i < this.newss.length; i++) {
        let TYPED_ARRAY = new Uint8Array(res[i].image.data.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        let base64String = btoa(STRING_CHAR);

        this.imageUrl[i] = this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/jpg;base64, ` + base64String
        );
      }
      // this.newss = res;
       

      console.log("naw rsponsy news");
      console.log(this.newss);
    }, (error) => {
      console.log("naw errory news");
      console.log(error);
    });
  } );
 
     
  }


  // imageUrl1: SafeResourceUrl = '';

  // imageUrl: SafeResourceUrl[] = [];

  // newss:any[]=[];
   url="https://black-stallion-backend-api-ece2qdboea-uc.a.run.app";
  //  news(){
  //   return this.http.get(this.url, {headers: new HttpHeaders({})}) ;
    
  // }

  


   
  imageUrl: SafeResourceUrl[] = [];

  newss:any[]=[];
  


  onTop() {
    this.route1.navigate(['/market&alerts/news_detail']).then(() => {
      this.topnews.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    })
  }
  
 
 
  news(){
    return this.http.get(this.url + '/news', {headers: new HttpHeaders({})}) ;
    
  }









 
  
  showMore = false;
  showMore1 = false;
  showMore2 = false;
  showMore3 = false;
  showMore4 = false;
  showMore5 = false;
  showMore6 = false;
  showMore8 = false;
  showMore9 = false;

  onChangeShowMore() {
    this.showMore = !this.showMore;
   }
  onChangeShowMore1() {
    this.showMore1 = !this.showMore1;
   }
   onChangeShowMore2() {
     this.showMore2 = !this.showMore2;
    }
    onChangeShowMore3() {
      this.showMore3 = !this.showMore3;
     }
     onChangeShowMore4() {
       this.showMore4 = !this.showMore4;
      }
      onChangeShowMore5() {
        this.showMore5 = !this.showMore5;
       }
       onChangeShowMore6() {
        this.showMore5 = !this.showMore5;
       }

       onChangeShowMore8() {
        this.showMore8 = !this.showMore8;
       }
       onChangeShowMore9() {
        this.showMore9 = !this.showMore9;
       }



}
