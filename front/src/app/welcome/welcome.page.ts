import { Component, OnInit } from '@angular/core';
import {RouterService} from '../shared/services/router.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public router: RouterService,
  ) {}

  ngOnInit() {}
}
