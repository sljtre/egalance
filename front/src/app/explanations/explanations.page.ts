import { Component, OnInit } from '@angular/core';
import {RouterService} from '../shared/services/router.service';

@Component({
  selector: 'app-explanations',
  templateUrl: './explanations.page.html',
  styleUrls: ['./explanations.page.scss'],
})
export class ExplanationsPage implements OnInit {

  constructor(
    public router: RouterService,
  ) {}

  ngOnInit(){}
}
