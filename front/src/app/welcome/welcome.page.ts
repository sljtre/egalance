import { Component, OnInit } from '@angular/core';
import {RouletteService} from '../shared/services/roulette.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public roulette : RouletteService
  ) { }

  async ngOnInit() {    
    this.roulette.setRoulette(["Simon","Nathan","Paul","Edgar","JC"],[0.20,0.20,0.20,0.20,0.20]);
    this.roulette.drawRouletteWheel();
    
  }

  buttonFunc=()=>{
    this.roulette.spin();
  }


}
