import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saisons',
  templateUrl: './saisons.component.html',
  styleUrls: ['./saisons.component.scss'],
})
export class SaisonsComponent implements OnInit {

  public currentSeason;
  public changeSeason: (month) => void;
  public snowflakes: any[];
  public fallingLeaves: any[];
  public flowers: any[];

  constructor() {}

  ngOnInit() {
    this.changeSeason = (month) => {
      const seasons = ['spring', 'summer', 'autumn', 'winter'];
      const transitionDuration = [5000, 6000, 15000, 15000];
      const previousSeason = this.currentSeason;
      switch (month) {
        case 12 || 1 || 2:
          this.currentSeason = 'winter';
          break;
        case 3 || 4 || 5:
          this.currentSeason = 'spring';
          break;
        case 6 || 7 || 8:
          this.currentSeason = 'summer';
          break;
        case 9 || 10 || 11:
          this.currentSeason = 'autumn';
          break;
      }
      if (previousSeason !== this.currentSeason) {
        const div = document.getElementById(this.currentSeason);
        div.className = 'animated';
        setTimeout(() => {
          div.className = '';
        }, this.currentSeason === 'spring' ? 7000 : 15000);
        const bgElement = document.getElementById('animated-bg');
        bgElement.className = 'bg-' + this.currentSeason;
      }
    };

    setInterval(this.changeSeason, 7000);
    this.snowflakes = new Array(200);
    this.fallingLeaves = [];
    for (let i = 1; i <= 48; i++) {
      this.fallingLeaves.push(i);
    }
    this.flowers = [];
    for (let i = 1; i <= 24; i++) {
      this.flowers.push((Math.floor(Math.random() * 100) % 9) + 1);
    }
  }

}
