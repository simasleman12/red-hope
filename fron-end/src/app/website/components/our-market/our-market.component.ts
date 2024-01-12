import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-our-market',
  templateUrl: './our-market.component.html',
  styleUrls: ['./our-market.component.css']
})
export class OurMarketComponent implements OnInit {

  constructor( protected languageService:LanguageService ) { }

  ngOnInit(): void {
  }

}
