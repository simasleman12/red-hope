import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/website/services/language.service';
import { HomeService } from '../../services/home-service.service';

@Component({
  selector: 'app-technical-analysis',
  templateUrl: './technical-analysis.component.html',
  styleUrls: ['./technical-analysis.component.css']
})
export class TechnicalAnalysisComponent implements OnInit {
  @ViewChild('toptechnicalanalysis') toptechnicalanalysis: any;


  constructor(protected languageService: LanguageService, private homeService: HomeService, private route: Router) { }

  ngOnInit() {
    this.homeService.customRoute.subscribe(value => {
      // this.onTop();

    });
  }

  onTop() {
    // this.route.navigate(['/market&alerts/technical_analysis']).then(() => {
    //   this.toptechnicalanalysis.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    // })
  }

}
