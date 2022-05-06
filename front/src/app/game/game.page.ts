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

  constructor() {
    this.currentSeason = 0;
    this.changeSeason = () => {
      const seasons = ['winter', 'spring', 'summer', 'autumn'];
      const bgElement = document.getElementById('animated-bg');
      bgElement.className = 'bg-' + seasons[this.currentSeason];
      this.currentSeason = (this.currentSeason + 1) % 4;
    };
  }

  ngOnInit() {
    setInterval(this.changeSeason, 3000);
    for (let i = 0; i < 50; i++) {
      this.matrix.push({type: 'usine'});
    }
    console.log('matrix : ', this.matrix);
  }

}
