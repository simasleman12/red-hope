import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(protected homeService: HomeService) { }

  ngOnInit(): void {
  }

}
