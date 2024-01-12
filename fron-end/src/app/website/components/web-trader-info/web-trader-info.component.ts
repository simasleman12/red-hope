import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/website/services/language.service';
import { HomeService } from '../../services/home-service.service';

@Component({
  selector: 'app-web-trader-info',
  templateUrl: './web-trader-info.component.html',
  styleUrls: ['./web-trader-info.component.css']
})
export class WebTraderInfoComponent implements OnInit {

  constructor(protected languageService: LanguageService, protected homeService: HomeService) { }

  ngOnInit(): void {
  }

}
