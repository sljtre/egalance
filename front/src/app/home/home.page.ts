import {Component, OnInit} from '@angular/core';
import * as honeycomb from 'honeycomb-grid';
import * as SVG from 'svg.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public matrix = [];

  constructor() {}

  ngOnInit() {
      for(let i=0;i<50;i++) {
        this.matrix.push({type: 'usine'});
      }
    console.log(this.matrix);
  }
}
