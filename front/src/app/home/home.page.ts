import {Component, OnInit} from '@angular/core';
import * as honeycomb from 'honeycomb-grid';
import * as SVG from 'svg.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public alternate = ['even', 'odd'];
  public c1 = [0,1,2,3,4,5];
  public c2 = [0,1,2,3,4,5,6,7,8];
  public matrix = [];

  constructor() {}

  ngOnInit() {
      for(let i=0;i<50;i++) {
        this.matrix.push({type: 'usine'});
      }
    console.log(this.matrix);
  }
}
