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
import { LatestNewsComponent } from './website/components/latest-news/latest-news.component';
import { WebTraderInfoComponent } from './website/components/web-trader-info/web-trader-info.component';
import { OurMarketComponent } from './website/components/our-market/our-market.component';
import { TestimonialsComponent } from './website/components/testimonials/testimonials.component';
import { TradingServicesComponent } from './website/components/trading-services/trading-services.component';
import { PaymentMethodsComponent } from './website/components/payment-methods/payment-methods.component';
import { NavbarComponent } from './website/components/navbar/navbar.component';
import { FooterComponent } from './website/components/footer/footer.component';
import { AboutComponent } from './website/pages/about/about.component';
import { NewsDetailsComponent } from './website/pages/news-details/news-details.component';
import { NewsDetailComponent } from './website/pages/news-details/news-detail/news-detail.component';
import { TechnicalAnalysisComponent } from './website/pages/technical-analysis/technical-analysis.component';
import { RealAccountStepOneComponent } from './website/pages/real-account-step-one/real-account-step-one.component';
import { RealAccountStepTwoComponent } from './website/pages/real-account-step-two/real-account-step-two.component';
import { DemoAccountComponent } from './website/pages/demo-account/demo-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './website/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StepOneComponent } from './dashboard/step-one/step-one.component';
import { StepTwoComponent } from './dashboard/step-two/step-two.component';
import { WebcamModule } from 'ngx-webcam';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RealAccountStepOneAuthGuard } from './website/auth/real-account-stepone-auth.guard';
import { WhychooseusComponent } from './whychooseus/whychooseus.component';
 import { Nav2Component } from './nav2/nav2.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
 



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trading', component: HomeComponent },
  { path: 'about', component: AboutComponent },
 
  // { path: 'about/section', component: HomeComponent },
  { path: 'start_trading', component: HomeComponent },
  // { path: 'market&alerts', redirectTo: '/market&alerts/news_detail', pathMatch: 'full' },
  { path: 'market&alerts/news_detail', component: NewsDetailsComponent },
  { path: 'market&alerts/news_detail/:id', component: NewsDetailComponent },
  { path: 'market&alerts/technical_analysis', component: TechnicalAnalysisComponent },
  { path: 'real_account_step_one', component: RealAccountStepOneComponent },
  { path: 'real_account_step_two',  component: RealAccountStepTwoComponent },
  { path: 'demo_account', component: DemoAccountComponent },
  { path: 'dashboard', redirectTo: 'dashboard/step-one', pathMatch: 'full', },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'step_one', canActivate: [RealAccountStepOneAuthGuard], component: StepOneComponent },
      { path: 'step_two', canActivate: [RealAccountStepOneAuthGuard], component: StepTwoComponent }
    ]
  },
  { path: '**', redirectTo: '/' }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingPageComponent,
    LatestNewsComponent,
    WebTraderInfoComponent,
    OurMarketComponent,
    TestimonialsComponent,
    TradingServicesComponent,
    PaymentMethodsComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    NewsDetailsComponent,
    NewsDetailComponent,
    TechnicalAnalysisComponent,
    RealAccountStepOneComponent,
    RealAccountStepTwoComponent,
    DemoAccountComponent,
    DashboardComponent,
    StepOneComponent,
    StepTwoComponent,
    WhychooseusComponent,
     Nav2Component,
     ChartBarComponent,
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



