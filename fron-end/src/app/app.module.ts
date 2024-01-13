import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpBackend, HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './website/pages/home/home.component';
import { LandingPageComponent } from './website/components/landing-page/landing-page.component';
 import { OurMarketComponent } from './website/components/our-market/our-market.component';
 import { PaymentMethodsComponent } from './website/components/payment-methods/payment-methods.component';
import { NavbarComponent } from './website/components/navbar/navbar.component';
import { FooterComponent } from './website/components/footer/footer.component';
import { AboutComponent } from './website/pages/about/about.component';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './website/auth/auth.guard';
 
import { WebcamModule } from 'ngx-webcam';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { WhychooseusComponent } from './whychooseus/whychooseus.component';
  



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trading', component: HomeComponent },
  { path: 'about', component: AboutComponent },
 
  // { path: 'about/section', component: HomeComponent },
  { path: 'start_trading', component: HomeComponent },
  // { path: 'market&alerts', redirectTo: '/market&alerts/news_detail', pathMatch: 'full' },
   
  { path: 'dashboard', redirectTo: 'dashboard/step-one', pathMatch: 'full', },
  
  { path: '**', redirectTo: '/' }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingPageComponent,
     OurMarketComponent,
    
    PaymentMethodsComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    
    WhychooseusComponent,
     ],
  imports: [
    PdfViewerModule,
    BrowserModule,
    SwiperModule,
    FormsModule,
    WebcamModule,
     ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: translateHttpLoaderFactory,
          deps: [HttpBackend]
        }
      }
    ),
    BrowserAnimationsModule,
    NgxIntlTelInputModule,



  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function translateHttpLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader {
  return new TranslateHttpLoader(new HttpClient(httpBackend), './assets/i18n/', '.json');
}



// export function httpTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }



