import { Injectable } from '@angular/core';
import {PersoService} from '../services/perso.service'
import {TuilesService} from '../services/tuiles.service'
import {GameEventService} from '../services/game-event.service'
import {RouletteService} from '../services/roulette.service'


@Injectable({
  providedIn: 'root'
})
export class GameActionsService {

  private actionCity;
  private tuileActuelle;
  private actionChosen;

  constructor(
    public persoService: PersoService,
    public tuilesService:TuilesService,
    public eventService:GameEventService,
    public rouletteService:RouletteService
  ) {

  }

  actionHandler=(action,localization,tuileActuelle)=>{
    let result;
    this.actionCity=localization;
    this.tuileActuelle=tuileActuelle;
    this.actionChosen=action;
    switch(action){
      case 'Eat':
        result=this.eatHandler();
        break;
      case 'Rest':
        result=this.restHandler();
      case 'Work':
        result=this.workHandler();
        break;
      default:break;
    }
    return result;
  }

  actionsResponseHandler=(answer)=>{
    switch(this.actionChosen){
      case 'Eat':
        break;
      case 'Work':
        this.workResponseHandler(answer);
        break;
      default:break;
    }

  }


  workHandler=()=>{
    const coefStudies = this.tuilesService.getIncomeMultiplicator(this.tuileActuelle, this.persoService.perso.instructionLevel);
    const tolerance = 1-this.tuilesService.getTolerance(this.persoService.perso.localization);
    let differenceScore = Math.abs(Number(this.tuilesService.getEthnie(this.persoService.perso.localization))
      -Number(this.persoService.perso.skin));
    if(this.persoService.perso.religion!==this.tuilesService.getReligion(this.persoService.perso.localization)){
      differenceScore++;
    }
    const coefSalaire = 1-tolerance*0.2*differenceScore;
    const salaire = Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)*coefSalaire);
    this.rouletteService.setRoulette([salaire, 0, salaire*3, salaire*0.6, salaire*1.5, salaire*1.2, salaire*0.8],[0.5,0.01,0.01,0.1,0.1,0.14,0.14]);
    return 30;
  }

  workResponseHandler=(answer)=>this.persoService.perso.wallet+=answer;

  marryHandler=()=>{  }

  rentHandler=()=>{  }

  shoppingHandler=()=>{  }

  drinkHandler=()=>{
    this.persoService.perso.faim+=0.08;
    this.persoService.perso.fatigue-=0.01;
    this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5;
    return 5;
   }

  restHandler=()=>{
    let timeAdd;
    if (this.tuileActuelle==='Parc'){
      //Cest gratuit dans un parc on touche pas au wallet
      this.persoService.perso.fatigue+=0.15;
      timeAdd=2;
    }
    else if(this.tuileActuelle==='House'){
      //Cest gratuit dans un parc on touche pas au wallet
      this.persoService.perso.fatigue+=0.25;
      timeAdd=1;
    }
    else if(this.tuileActuelle==='Museum'){
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.02;
      this.persoService.perso.fatigue+=0.30;
      timeAdd=1;
    }
    else if(this.tuileActuelle==='Stadium'){
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*2;
      this.persoService.perso.fatigue+=0.40;
      timeAdd=3;
    }
    else if(this.tuileActuelle==='Empty'){
      this.persoService.perso.fatigue+=0.1;
      timeAdd=1;
    }
    return timeAdd;
   }

  studyHandler=()=>{}

  healHandler=()=>{
    switch(this.actionCity){
    case'Paris':
      this.persoService.perso.sante+=0;
      this.persoService.perso.faim+=0;
    case 'Reykjavik':
    case 'New York':
    case 'Sydney':
    case 'Rio de Janeiro':
    case 'Moscow':
    case 'New Delhi':
    case 'Ouagadougou':
    case 'Reykjavik':
    case 'Johannesburg':
    case 'Beijing':
   }
  }

  watchHandler=()=>{}

  prayHandler=()=>{
    switch(this.tuileActuelle){
    case 'Religion':
      this.persoService.perso.sante+=0.10;
      this.persoService.perso.fatigue-=0.10;
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01;
      return 3;
    case'House':
      this.persoService.perso.sante+=0.05;
      this.persoService.perso.fatigue-=0.02;
      return 2;
    }

  }

  practiceHandler=()=>{}

  depositHandler=()=>{}

  withdrawHandler=()=>{}

  travelHandler=()=>{}

  eatHandler=()=>{
    switch(this.tuileActuelle){
    case 'Bar':
      this.persoService.perso.faim+=0.1;
      this.persoService.perso.fatigue-=0.01;
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.8;
      return 3;
    case 'Farm':
      this.persoService.perso.faim+=0.5;
      this.persoService.perso.fatigue-=0.05;
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.2;
      // this.eventService.eventAccident();
      return 8;
    case 'House':
      this.persoService.perso.faim+=0.14;
      this.persoService.perso.fatigue-=0.014;
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5;
      return 5;
    case 'Restaurant':
      this.persoService.perso.faim+=0.3;
      this.persoService.perso.fatigue-=0.03;
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*1.6;
      return 3;
    }
  }


}
