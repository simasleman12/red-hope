import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../website/services/language.service';

@Component({
  selector: 'app-whychooseus',
  templateUrl: './whychooseus.component.html',
  styleUrls: ['./whychooseus.component.css']
})
export class WhychooseusComponent implements OnInit {
  constructor( protected languageService:LanguageService ) { }

  ngOnInit(): void {
  }


}
