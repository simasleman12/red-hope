import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home-service.service';
import { LanguageService } from '../../services/language.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsDetailsComponent implements OnInit {
  @ViewChild('topnews') topnews: any;
 
  constructor(private route1: ActivatedRoute,protected languageService: LanguageService,
    private sanitizer: DomSanitizer, private http: HttpClient,  private homeService: HomeService, 
    private route: Router) { }

  routeSub!: Subscription;
  catogory:any[]=[];
  catogroryId:any;
  idtimezone:any;
  showdropdown=false;
  showMore = false;
  imageUrl: SafeResourceUrl[] = [];
  timezony:any[]=[];
  newss:any[]=[];
  name:any;
  url="https://black-stallion-backend-api-ece2qdboea-uc.a.run.app";
  // url2="http://192.168.33.16:7000"; 


  
  ngOnInit(): void {

    
    
    this.news(this.idtimezone).subscribe((res: any) => {
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


    this.timezon().subscribe((res: any) => {
      this.timezony = res;

      res.name  = this.name;
      console.log("naw rsponsy time");
      console.log(res);
    }, (error) => {
      console.log("naw errory time");
      console.log(error);
    });
    
         this.navtypenews().subscribe((res: any) => {  
     this.catogory=res;
           console.log("naw rsponsy catogory");
           console.log(res);
         }, (error) => {
           console.log("naw errory catogoeryu");
           console.log(error);
         });
      
 
  }

  onchangetimezon(id:string){
   this.idtimezone = id;


 console.log(this.idtimezone);

 this.news(id).subscribe((res: any) => {
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


 this.newscotagoryId(id,this.idtimezone).subscribe((res: any) => {
  this.newss=res;
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

console.log(res);

console.log("katagoryyyyyyyyyyyy");
}, (error) => {
console.log("999999999999");
// console.log(this.idtimezone);

console.log(error);

});

 
 }


  onshow(){
  this.showdropdown = !this.showdropdown;
 }


  newscotagoryId(id:string ,id1:string ){
    return this.http.get(this.url+`/news/category/${id}/${id1}`, {headers: new HttpHeaders({})}) ;
    
  }

  onChangeCatagory(id: string  ){
 
 
    console.log(this.idtimezone);
    
    this.newscotagoryId(id,this.idtimezone).subscribe((res: any) => {
      this.newss=res;
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
 
   console.log(res);

console.log("katagoryyyyyyyyyyyy");
}, (error) => {
console.log("999999999999");
    // console.log(this.idtimezone);

console.log(error);

});

  }


  onAll(id:string ){
    this.news(id).subscribe((res: any) => {
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
  }


  onTop() {
    this.route.navigate(['/market&alerts/news_detail']).then(() => {
      this.topnews.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    })
  }
 

  timezon(){
    return this.http.get(this.url+"/countries/time", {headers: new HttpHeaders({})}) ;
    
  }
 
  news(id:string){
    return this.http.get(this.url+`/newses/${id}`, {headers: new HttpHeaders({})}) ;
    
  }

   navtypenews(){
    return this.http.get(this.url+"/categories", {headers: new HttpHeaders({})}) ;
    
  }


 
  onChangeShowMore() {
    this.showMore = !this.showMore;
   }
   
 
 


}
