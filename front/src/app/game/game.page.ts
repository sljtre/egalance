import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public matrix = [];
  private currentSeason: number;
  private changeSeason: () => void;
  private snowflakes: any[];
  private fallingLeaves: any[];
  private flowers: any[];

  constructor() {
    this.currentSeason = 0;
    this.changeSeason = () => {
      const seasons = ['spring', 'summer', 'autumn', 'winter'];
      const transitionDuration = [5000, 6000, 15000, 15000];
      const div = document.getElementById(seasons[this.currentSeason]);
      div.className = 'animated';
      setTimeout(() => {
        div.className = '';
      }, transitionDuration[this.currentSeason]);
      const bgElement = document.getElementById('animated-bg');
      bgElement.className = 'bg-' + seasons[this.currentSeason];
      this.currentSeason = (this.currentSeason + 1) % 4;
    };
  }

  ngOnInit() {
    setInterval(this.changeSeason, 7000);
    this.snowflakes = new Array(200);
    this.fallingLeaves = [];
    for (let i = 1; i <= 48; i++) this.fallingLeaves.push(i);
    this.flowers = [];
    for (let i = 1; i <= 24; i++) this.flowers.push((Math.floor(Math.random() * 100) % 9) + 1);
    for (let i = 0; i < 50; i++) {
      this.matrix.push({type: 'usine'});
    }
    console.log('matrix : ', this.matrix);
  }

}
