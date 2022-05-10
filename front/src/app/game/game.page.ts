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
  private launchSummerAnimation: () => void;
  private launchAutumnAnimation: () => void;
  private launchWinterAnimation: () => void;
  private snowflakes: any[];
  private fallingLeaves: any[];

  constructor() {
    this.currentSeason = 0;
    this.changeSeason = () => {
      const seasons = ['spring', 'summer', 'autumn', 'winter'];
      switch (this.currentSeason) {
        case 1:
          this.launchSummerAnimation();
          break;
        case 2:
          this.launchAutumnAnimation();
          break;
        case 3:
          this.launchWinterAnimation();
          break;
      }
      const bgElement = document.getElementById('animated-bg');
      bgElement.className = 'bg-' + seasons[this.currentSeason];
      this.currentSeason = (this.currentSeason + 1) % 4;
    };

    this.launchSummerAnimation = () => {
      const sun = document.querySelector('#sun-div');
      sun.className = 'animated';
      setTimeout(() => {
        sun.className = '';
      }, 5000);
    };
    this.launchAutumnAnimation = () => {
      const leaves = document.querySelector('#leaves');
      leaves.className = 'animated';
      setTimeout(() => {
        leaves.className = '';
      }, 15000);
    };
    this.launchWinterAnimation = () => {
      const snow = document.querySelector('#snow');
      snow.className = 'animated';
      setTimeout(() => {
        snow.className = '';
      }, 15000);
    };
  }

  ngOnInit() {
    setInterval(this.changeSeason, 7000);
    this.snowflakes = new Array(200);
    this.fallingLeaves = [];
    for (let i = 1; i <= 48; i++) {
      this.fallingLeaves.push(i);
    }
    for (let i = 0; i < 50; i++) {
      this.matrix.push({type: 'usine'});
    }
    console.log('matrix : ', this.matrix);
  }

}
