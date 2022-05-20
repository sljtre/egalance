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
    this.rouletteService.resetOptionsAndChances();
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
        this.eatResponseHandler(answer);
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
    const salaire = this.tuilesService.getSalaire(this.persoService.perso.localization)*coefSalaire;
    
    this.rouletteService.setRoulette([Math.floor(salaire), 0, Math.floor(salaire*3), Math.floor(salaire*0.6), Math.floor(salaire*1.5), Math.floor(salaire*1.2), Math.floor(salaire*0.8)],[0.5,0.03,0.03,0.1,0.1,0.12,0.12]);
    return 30;
  }

  workResponseHandler=(answer)=>{
    this.persoService.perso.wallet+=answer;
    this.persoService.perso.fatigue-=this.tuilesService.getEnergyCost(this.tuileActuelle, this.persoService.perso.instructionLevel);
    if(this.persoService.perso.fatigue<0){
      this.persoService.perso.sante-=this.persoService.perso.fatigue/2;
      this.persoService.perso.fatigue=0;
    }
    this.persoService.perso.faim-=0.51
    if(this.persoService.perso.faim<0){
      this.persoService.perso.sante-=this.persoService.perso.faim/2;
      this.persoService.perso.faim=0;
    }
    if(this.persoService.perso.sante<0){
      //MORT
    }
  };

  marryHandler=()=>{  }

  rentHandler=()=>{  }

  shoppingHandler=()=>{  }

  drinkHandler=()=>{
    this.persoService.perso.faim+=0.08;
    this.persoService.perso.fatigue-=0.01;
    this.persoService.perso.wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5;
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
      this.persoService.perso.wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.02;
      this.persoService.perso.fatigue+=0.30;
      timeAdd=1;
    }
    else if(this.tuileActuelle==='Stadium'){
      this.persoService.perso.wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*2;
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
      this.persoService.perso.wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01;
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
      this.rouletteService.setRoulette(['Good meal','Bad meal','????'],[0.4,0.4,0.2]);     
      return 1;
    case 'Farm':
      this.rouletteService.setRoulette(['Bountiful harvest','Average harvest','Damaged harvest','????'],[0.4,0.2,0.1,0.3]);
      // this.eventService.eventAccident();
      return 3;
    case 'House':
      this.rouletteService.setRoulette(['Burnt Meal','Leftovers','Soup','Empty fridge','Full meal'],[0.125,0.3,0.2,0.125,0.25]);
      return 5;
    case 'Restaurant':
      this.rouletteService.setRoulette(['Five course meal','Hair in your meal','Lobster still alive'],[0.7,0.2,0.1]);
      return 3;
    }
  }

  eatResponseHandler=(answer)=>{
    switch(this.tuileActuelle){
      case 'Bar':
        switch(answer){
          case 'Good meal':
              this.persoService.perso.faim+=0.25;              
              break;
          case 'Bad meal':
              this.persoService.perso.faim+=0.25;
              break;
          case '????':
            //TODO chose a random event linked to this
            break;
          default:break;
        }
        this.persoService.perso.fatigue-=0.01;              
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.8);
        break;
      case 'Farm':
        switch(answer){
          case 'Bountiful harvest':
            this.persoService.perso.faim+=0.5;            
            break;
          case 'Average harvest':
            this.persoService.perso.faim+=0.3;            
            break;
          case 'Damaged harvest':
            this.persoService.perso.faim+=0.2;            
            break;
          case '????':
            //TODO call an event here why not
            break;
          default:console.log("Error in roulette options");break;
        }
        this.persoService.perso.fatigue-=0.1;
        this.persoService.perso.wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.2;
        break;
      case 'House':
        switch(answer){
          case 'Burnt Meal':
              this.persoService.perso.faim+=0.02;
            break;
          case 'Leftovers':
            break;
          case 'Soup':
            break;
          case 'Empty fridge':
            break;
          case 'Full meal':
            break;
          default:console.log("Error in roulette options");break;
        }
        
        this.persoService.perso.fatigue-=0.014;
        this.persoService.perso.wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5;
        break;
      case 'Restaurant':
        switch(answer){
          case 'Five course meal':
            break;
          case 'Hair in your meal':
            break;
          case 'Lobster still alive':
            break;
          default:console.log("Error in roulette options");break;
        }
        this.persoService.perso.faim+=0.3;
        this.persoService.perso.fatigue-=0.03;
        this.persoService.perso.wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*1.6;
        break;
      default:break;

    }
  }


}
