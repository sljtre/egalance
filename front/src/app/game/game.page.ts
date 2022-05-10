import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public matrix = [];
  public clock;
  public paused = false;

  public day = 1;
  public month = 1;
  public year = 2023;

  public delay = 1000;

  constructor() { }

  ngOnInit() {
    for(let i=0;i<50;i++) {
      this.matrix.push({type: 'usine'});
    }
    this.clock = setInterval(this.calendar, this.delay);
  }

  calendar = () => {
    this.addTime(1);
  };

  pause = () => {
    if(this.paused){
      this.paused = false;
      this.clock = setInterval(this.calendar, this.delay);
    }else{
      this.paused = true;
      clearInterval(this.clock);
    }
  };

  addTime = (days) => {
    this.day += days;
    if(this.day>30){
      this.day-=30;
      this.month++;
      this.addTime(0);
    }
    if(this.month>12){
      this.month-=12;
      this.year++;
      this.addTime(0);
    }
  };

}
