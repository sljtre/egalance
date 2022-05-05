import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public matrix = [];

  constructor() { }

  ngOnInit() {
    console.log('bouh');
    for(let i=0;i<50;i++) {
      this.matrix.push({type: 'usine'});
    }
    console.log('matrix : ', this.matrix);
  }

}
