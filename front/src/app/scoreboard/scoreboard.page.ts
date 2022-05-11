import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {

  public nbRQ = 10;
  public display = [];

  private retour;

  constructor(
    private http: HttpService,
  ) {}

  async ngOnInit() {
    await this.updateDisplay();
  }

  updateDisplay = async () => {
    this.display = [];
    this.retour = await this.http.getScoreboard();
    let limit = 0;
    if(this.retour.output.length<this.nbRQ){
      limit = this.retour.output.length;
    }else{
      limit = this. nbRQ;
    }
    for(let i=0;i<limit;i++){
      this.display.push(this.retour.output[i]);
    }
    console.log(this.display);
  };

}
