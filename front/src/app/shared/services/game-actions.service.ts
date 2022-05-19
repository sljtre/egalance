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
    public persoSerivce: PersoService,
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
        this.workResponandler();
        break;
      default:break;
    }

  }

  workHandler=()=>{  }

  workResponseHandler=()=>{
    console.log("hi");
  }

  marryHandler=()=>{  }

  rentHandler=()=>{  }

  shoppingHandler=()=>{  }

  drinkHandler=()=>{
    this.persoSerivce.perso.faim+=0.08;  
    this.persoSerivce.perso.fatigue-=0.01;      
    this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5; 
    return 5;
   }

  restHandler=()=>{
    let timeAdd;
    if (this.tuileActuelle==='Parc'){
      //Cest gratuit dans un parc on touche pas au wallet
      this.persoSerivce.perso.fatigue+=0.15;
      timeAdd=2;
    }
    else if(this.tuileActuelle==='House'){
      //Cest gratuit dans un parc on touche pas au wallet
      this.persoSerivce.perso.fatigue+=0.25;
      timeAdd=1;
    }
    else if(this.tuileActuelle==='Museum'){
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.02; 
      this.persoSerivce.perso.fatigue+=0.30;
      timeAdd=1;
    }
    else if(this.tuileActuelle==='Stadium'){
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*2; 
      this.persoSerivce.perso.fatigue+=0.40;
      timeAdd=3;
    }
    else if(this.tuileActuelle==='Empty'){
      this.persoSerivce.perso.fatigue+=0.1;
      timeAdd=1;
    }
    return timeAdd;
   }

  studyHandler=()=>{}

  healHandler=()=>{
    switch(this.actionCity){
    case'Paris':
      this.persoSerivce.perso.sante+=0;
      this.persoSerivce.perso.faim+=0;
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
      this.persoSerivce.perso.sante+=0.10;
      this.persoSerivce.perso.fatigue-=0.10;
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01; 
      return 3;
    case'House':
      this.persoSerivce.perso.sante+=0.05;
      this.persoSerivce.perso.fatigue-=0.02;
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
      this.persoSerivce.perso.faim+=0.1;  
      this.persoSerivce.perso.fatigue-=0.01;      
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.8; 
      return 3;     
    case 'Farm':
      this.persoSerivce.perso.faim+=0.5;  
      this.persoSerivce.perso.fatigue-=0.05;
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.2; 
      // this.eventService.eventAccident();
      return 8;
    case 'House':
      this.persoSerivce.perso.faim+=0.14;  
      this.persoSerivce.perso.fatigue-=0.014;
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5; 
      return 5;      
    case 'Restaurant':
      this.persoSerivce.perso.faim+=0.3;  
      this.persoSerivce.perso.fatigue-=0.03;
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*1.6; 
      return 3;      
    }    
  }


}
