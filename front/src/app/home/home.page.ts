import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public matrix = [];

  constructor() {}

  ngOnInit() {
    for(let x=0; x<5; x++){
      this.matrix[x]=[];
      for(let y=0; y<5; y++){
        this.matrix[x].push({line: x,col: y});
      }
    }
    console.log(this.matrix);
  }

}
