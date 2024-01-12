import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Nav2Component } from 'src/app/nav2/nav2.component';
import { HomeService } from 'src/app/website/services/home-service.service';
import { LanguageService } from 'src/app/website/services/language.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  // @ViewChild('topnews') topnews: any;
  id = '';
  catogory:any[]=[];
  catogroryId:any;
  data:any;
  routeSub!: Subscription;

 navtypenews(){
  return this.http.get(this.url+"/categories", {headers: new HttpHeaders({})}) ;
  
}
 
  constructor( private route: ActivatedRoute,protected languageService: LanguageService,private sanitizer: DomSanitizer, private http: HttpClient,  private homeService: HomeService, private route1: Router) { }
  ngOnInit(): void {



    
      this.navtypenews().subscribe((res: any) => {  
  this.catogory=res;
        console.log("naw rsponsy catogory");
        console.log(res);
      }, (error) => {
        console.log("naw errory catogoeryu");
        console.log(error);
      });
     




 


    console.log("naw  new detail");
    
      
    this.routeSub = this.route.params.subscribe(async (params) => {
      this.id = params['id'];
     

    this.newsId(this.id).subscribe((res: any) => {
            this.data=res;
         this.id = res._id;
 
        let TYPED_ARRAY = new Uint8Array(res.image.data.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        let base64String = btoa(STRING_CHAR);

        this.imageUrl1= this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/jpg;base64,` + base64String
        );
    
      // this.newss = res;
       
         console.log(res);

      console.log("naw rsponsy news");
     }, (error) => {
      console.log("naw errory news");
      console.log(error);
 
    });


 


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



  onChangeCatagory(id: string){
    console.log(id);
    
    this.newscotagoryId(id).subscribe((res: any) => {
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
console.log(error);

});

  }


  onAll(){
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
  }

 
  imageUrl1: SafeResourceUrl = '';

  // imageUrl: SafeResourceUrl[] = [];

  // newss:any[]=[];
  url="https://black-stallion-backend-api-ece2qdboea-uc.a.run.app";

   //  news(){
  //   return this.http.get(this.url, {headers: new HttpHeaders({})}) ;
    
  // }


  showMore = false;

  onChangeShowMore() {
    this.showMore = !this.showMore;
   }
   
   newsId(id:string){
    return this.http.get(this.url+`/news/${id}`, {headers: new HttpHeaders({})}) ;
    
  }
 
  newscotagoryId(id:string){
    return this.http.get(this.url+`/news/category/${id}`, {headers: new HttpHeaders({})}) ;
    
  }

  //  onTop() {
  //   this.route1.navigate(['/market&alerts/news_detail']).then(() => {
  //     this.topnews.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  //   })
  // }
  imageUrl: SafeResourceUrl[] = [];

  newss:any[]=[];
  news(){
    return this.http.get(this.url+"/news", {headers: new HttpHeaders({})}) ;
    
  }


  
  items = [1, 2, 3, 4, 5];
  itemss = [1, 2, 3];


}
