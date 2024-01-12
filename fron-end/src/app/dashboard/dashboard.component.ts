import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../website/services/language.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(protected languageService: LanguageService, private router: Router) {
    // router.navigate(['/dashboard/step_one']);
  }

  ngOnInit(): void {
  }

  // onLogout(){

  // }

}
