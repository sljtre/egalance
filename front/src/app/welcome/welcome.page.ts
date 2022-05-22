import { Component, OnInit } from '@angular/core';
import {RouterService} from '../shared/services/router.service';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  private retour;

  constructor(
    public router: RouterService,
    public http: HttpService,
  ) {}

  async ngOnInit() {
    this.retour = await this.http.pushScore(123,-5,2,3);
    console.log(this.retour);
  }
}
