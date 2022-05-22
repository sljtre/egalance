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
      case 'Heal':
        result=this.healHandler();
        break;
      case 'Pray':
        result=this.prayHandler();
      case 'Study':
        result=this.studyHandler();
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
      case 'Study':
        this.studyResponseHandler(answer);
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
  };

  workResponseHandler=(answer)=>{
    this.persoService.perso.wallet+=answer;
    this.persoService.perso.fatigue-=this.tuilesService.getEnergyCost(this.tuileActuelle, this.persoService.perso.instructionLevel);
    this.persoService.perso.faim-=0.51
    //Comme c deja des nombres négatis on a besoin de farie un += pour soustraire correctement @Paul 
    if(this.persoService.perso.fatigue<0){
      this.persoService.perso.sante+=this.persoService.perso.fatigue/2;
      this.persoService.perso.fatigue=0;
    }    
    if(this.persoService.perso.faim<0){
      this.persoService.perso.sante+=this.persoService.perso.faim/2;
      this.persoService.perso.faim=0;
    }
    
  };

  marryHandler=()=>{  };

  rentHandler=()=>{  };

  shoppingHandler=()=>{  };

  drinkHandler=()=>{
    this.persoService.perso.faim+=0.08;
    this.persoService.perso.fatigue-=0.01;
    this.persoService.perso.wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5;
    return 5;
   };

  restHandler=()=>{
    switch(this.tuileActuelle){
      case'Parc':
        this.rouletteService.setRoulette(['Sunny day','Rainy day','Windy day'],[0.33,0.33,0.33]);        
        return 2;      
      case'House':
        this.rouletteService.setRoulette(['Watch your favorite show','Neighbor mowing lawn','Spill your drink','Chill vibes'],[0.3,0.2,0.1,0.4]);
        return 1;
      case 'Museum':
        this.rouletteService.setRoulette(['Enjoy the exhibition','Get lost in the museum','Talk to a statue'],[0.3,0.3,0.3]);
        return 1;
    
      case 'Stadium':
        this.rouletteService.setRoulette(['Favorite team won','Favorite team lost','Get a signed jersey','Get a signed ball'],[0.3,0.3,0.2,0.2])
        return 3;
      case'Empty':
        this.rouletteService.setRoulette(['Take a sunbath','Enjoy a drink','Take a walk','Yoga outside'],[0.25,0.25,0.25,0.25]);
        return 1;
      default:console.log("Not the right tile buckaroo");
    }
   };

   restResponseHandler=(answer)=>{
     switch(answer){
      case 'Sunny day':
        this.persoService.perso.fatigue+=0.2;
        break;
      case 'Rainy day':
        this.persoService.perso.fatigue+=0.15;
        break;
      case 'Windy day':
        this.persoService.perso.fatigue+=0.05;
        break;
      case 'Watch your favorite show':
        this.persoService.perso.fatigue+=0.2;
        break;
      case 'Neighbor mowing lawn':
        this.persoService.perso.fatigue+=0.175;
        break;
      case 'Spill your drink':
        this.persoService.perso.fatigue+=0.1;
        break;
      case 'Chill vibes':
        this.persoService.perso.fatigue+=0.15;
        break;
      case 'Enjoy the exhibition':
        this.persoService.perso.fatigue+=0.1;
        this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Get lost in the museum':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Talk to a statue':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Favorite team won':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Favorite team lost':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Get a signed jersey':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Get a signed ball':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Take a sunbath':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Enjoy a drink':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Take a walk':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;
      case 'Yoga outside':
          this.persoService.perso.fatigue+=0.1;
          this.persoService.perso.wallet-=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/100*0.05);
        break;

     }

   }

  studyHandler=()=>{
    if(this.tuileActuelle==='House'){
      this.rouletteService.setRoulette(['Success','Fail'],[0.7,0.3]);
      return 90;
    }else if(this.tuileActuelle==='Library'){
      if(this.persoService.perso.wallet>0) {
        this.rouletteService.setRoulette(['Success','Fail'],[0.65,0.35]);
        this.persoService.perso.wallet-=this.tuilesService.getSalaire(this.persoService.perso.localization)*0.03;
        return 60;
      }else{
        //TRIGGER EVENT PAS D'ARGENT
        return 0;
      }
    }else if(this.tuileActuelle==='Museum'){
      if(this.persoService.perso.wallet>0) {
        this.rouletteService.setRoulette(['Success','Fail'],[0.6,0.4]);
        this.persoService.perso.wallet-=this.tuilesService.getSalaire(this.persoService.perso.localization)*0.05;
        return 60;
      }else{
        //TRIGGER EVENT PAS D'ARGENT
        return 0;
      }
    }else{
      const tolerance = 1-this.tuilesService.getTolerance(this.persoService.perso.localization);
      let differenceScore = Math.abs(Number(this.tuilesService.getEthnie(this.persoService.perso.localization))
        -Number(this.persoService.perso.skin));
      if(this.persoService.perso.religion!==this.tuilesService.getReligion(this.persoService.perso.localization)){
        differenceScore++;
      }
      const coefPassExam = 1-tolerance*0.2*differenceScore;
      if(this.tuileActuelle==='School'){
        const critical = 0.03+this.persoService.perso.studyCriticalBoost;
        const success = 0.72*(coefPassExam)+this.persoService.perso.studyBoost;
        this.rouletteService.setRoulette(['++','Success','Fail'], [critical, success, 1-critical-success]);
      }else if(this.tuileActuelle==='College'){
        const critical = 0.01+this.persoService.perso.studyCriticalBoost;
        const success = 0.67*(coefPassExam)+this.persoService.perso.studyBoost;
        this.rouletteService.setRoulette(['++','Success','Fail'], [critical, success, 1-critical-success]);
      }
      return 360;
    }


  };

  studyResponseHandler=(answer)=>{
    switch(this.tuileActuelle){
      case 'House':
        this.persoService.perso.fatigue-=0.018*90;
        if(answer==='Success'){
          this.persoService.perso.studyBoost+=0.04;
        }
        break;
      case 'Museum':
        this.persoService.perso.faim-=0.018*90;
        this.persoService.perso.fatigue-=0.018*90;
        //ARGENT
        if(answer==='Success'){
          this.persoService.perso.studyBoost+=0.05;
          this.persoService.perso.studyCriticalBoost+=0.03;
        }
        break;
      case 'Library':
        this.persoService.perso.faim-=0.018*90;
        this.persoService.perso.fatigue-=0.018*90;
        //ARGENT
        if(answer==='Success'){
          this.persoService.perso.studyBoost+=0.03;
          this.persoService.perso.studyCriticalBoost+=0.01;
        }
        break;
      case 'School':
        
        break;
      default: break;
    }
  };

  healHandler=()=>{
    console.log("We are in healHandler");
    if(this.persoService.perso.wallet<0)return 0;
    let baseHeal=0.5;
    this.persoService.perso.sante+=baseHeal*this.tuilesService.getHealEfficiency(this.actionCity);
    this.persoService.perso.wallet-=this.tuilesService.getSalaire(this.actionCity)*this.tuilesService.getHealCost(this.actionCity);
    /*
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
    
    case 'Johannesburg':
    case 'Beijing':
   }*/

   return -6;//We return a negative to warn us taht we dont need to do a roulette spin 
   //TODO NEED TO UPDATE ADD TIME TO take the absolute value then 
  }

  /*Dont need a response handler if there isnt a roulette to spin for the answer :)
  healResponseHandler=()=>{
  }
  */

  

  watchHandler=()=>{};

  prayHandler=()=>{
    switch(this.tuileActuelle){
    case 'Religion':
      if(this.persoService.perso.wallet<0)return 0;
      switch(this.persoService.perso.religion){
        case 'christianisme':
          this.rouletteService.setRoulette(['Feel God','Feel Jesus','Feel Mary','Feel nothing'],[0.2,0.2,0.2,0.4]);
          break;
        case 'judaisme':
          this.rouletteService.setRoulette(['Meet God','Feel His presence'],[]);
          break;
        case 'islam':
          this.rouletteService.setRoulette(['1 rak\'ah','2 rak\'ah','3 rak\'ah','4 rak\'ah'],[0.2,0.3,0.3,0.2]);
          break;
        case 'atheisme':
          this.rouletteService.setRoulette(['Why you here lol'],[1]);
          break;
        default:console.log("Faute de frappe dans la religion du personnage");break;
      }      
      return 3;
    case'House':
      this.rouletteService.setRoulette(['Morning Prayer','Lunch Prayer','Afternoon Prayer','Evening Prayer'],[0.25,0.25,0.25,0.25]);      
      return 2;
    }
  }

  //TODO Balance it all out xD
  prayResponseHandler=(answer)=>{
    switch(answer){
      //For the chirstians
      case 'Feel God':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      case 'Feel Jesus':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      case 'Feel Mary':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      case 'Feel nothing':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      //For the jews
      case 'Meet God':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      case 'Feel His presence':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      //For the muslims
      case '1 rak\'ah':
        this.persoService.perso.sante+=0.10;
      this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      case '2 rak\'ah':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
      this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      case '3 rak\'ah':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      case '4 rak\'ah':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.01);  
        break;
      //For the atheists
      case 'Why you here lol':
        break;
      //For at home praying
      case 'Morning Prayer':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        break;
      case 'Lunch Prayer':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        break;
      case 'Afternoon Prayer':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        break;
      case 'Evening Prayer':
        this.persoService.perso.sante+=0.10;
        this.persoService.perso.fatigue-=0.10;
        break;
      default:console.log("I swear to god im sane");break;
    }
  }

  practiceHandler=()=>{};

  depositHandler=()=>{};

  withdrawHandler=()=>{};

  travelHandler=()=>{};

  eatHandler=()=>{
    //The return is the amount of days each action cost
    if(this.persoService.perso.wallet<0)return 0;
    switch(this.tuileActuelle){
    case 'Bar':
      this.rouletteService.setRoulette(['Good meal','Bad meal','????'],[0.4,0.4,0.2]);
      return 1;
    case 'Farm':
      this.rouletteService.setRoulette(['Bountiful harvest','Average harvest','Damaged harvest','????'],[0.4,0.2,0.1,0.3]);
      return 3;
    case 'House':
      this.rouletteService.setRoulette(['Burnt Meal','Leftovers','Soup','Empty fridge','Full meal'],[0.125,0.3,0.2,0.125,0.25]);
      return 5;
    case 'Restaurant':
      this.rouletteService.setRoulette(['Five course meal','Hair in your meal','Lobster still alive'],[0.7,0.2,0.1]);
      return 3;
    }
  };

  eatResponseHandler=(answer)=>{
    //Remember every day you lose 0.017 so build around that
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
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.2);
        break;
      case 'House':
        switch(answer){
          case 'Burnt Meal':
              this.persoService.perso.faim+=0.02;
              this.persoService.perso.sante-=0.1
            break;
          case 'Leftovers':
              this.persoService.perso.faim+=0.04;
            break;
          case 'Soup':
              this.persoService.perso.faim+=0.03;
            break;
          case 'Empty fridge':
              this.persoService.perso.faim+=0.00;
            break;
          case 'Full meal':
              this.persoService.perso.faim+=0.05;
            break;
          default:console.log("Error in roulette options");break;
        }        
        

        this.persoService.perso.fatigue-=0.014;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5);
        break;
      case 'Restaurant':
        switch(answer){
          case 'Five course meal':
              this.persoService.perso.faim+=0.3;
            break;
          case 'Hair in your meal':
              this.persoService.perso.faim+=0.2;
              this.persoService.perso.sante-=0.1
            break;
          case 'Lobster still alive':
            this.persoService.perso.faim+=0.15
            break;
          default:console.log("Error in roulette options");break;
        }        
        this.persoService.perso.fatigue-=0.01;
        this.persoService.perso.wallet-=Math.floor(Number(this.tuilesService.getSalaire(this.actionCity))/100*1.6);
        break;
      default:console.log("Error in tiles");break;

    }
  };


}
