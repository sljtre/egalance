import { Component, OnInit } from '@angular/core';
import {PersoService} from '../shared/services/perso.service';

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

  public displayFatigue;
  public displaySante;
  public displayFaim;

  constructor(
    private persoService :PersoService
  ) {
    
   }

  ngOnInit() {
    this.persoService.dev('Paris', 'judaisme', 'homme', '4', 'David Salomon');
    this.refreshAll();
    for(let i=0;i<50;i++) {
      this.matrix.push({type: 'usine'});
    }
    this.clock = setInterval(this.calendar, this.delay);
  }

  //---------Fonctions sur l'horloge du jeu--------- 
  calendar = () => {
    this.persoService.calculAll();
    this.refreshAll();
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
  //---------------------------------------------

  refreshAll=()=>{
    this.displayFaim=this.persoService.perso.faim;
    this.displaySante=this.persoService.perso.sante;
    this.displayFatigue=this.persoService.perso.fatigue;


    let progFaim=document.getElementById("progFaim");
    let progSante=document.getElementById("progSante");
    let progFatigue=document.getElementById("progFatigue");

    let string;
    
    //Changement de couleur barre de progression Faim
    if(this.displayFaim>0 && this.displayFaim<=0.5){
      string="rgb(255,"+Math.floor(this.displayFaim*510)+",0)";  
    }    
    else if(this.displayFaim>0.5 && this.displayFaim<=1){
      string="rgb("+(510-Math.floor(this.displayFaim*510))+",255,0)";
    }
    progFaim.style.setProperty("--progress-background",string);  

    //Changement de couleur barre de progression Sante
    if(this.displaySante>0 && this.displaySante<=0.5){
      string="rgb(255,"+Math.floor(this.displaySante*510)+",0)";  
    }    
    else if(this.displaySante>0.5 && this.displaySante<=1){
      string="rgb("+(510-Math.floor(this.displaySante*510))+",255,0)";
    }
    progSante.style.setProperty("--progress-background",string);  

    //Changement de couleur barre de progression Fatigue
    if(this.displayFatigue>0 && this.displayFatigue<=0.5){
      string="rgb("+Math.floor(this.displayFatigue*510)+",255,0)";  
    }    
    else if(this.displayFatigue>0.5 && this.displayFatigue<=1){
      string="rgb(255,"+(510-Math.floor(this.displayFatigue*510))+",0)";
    }
    else if(this.displayFatigue>=1){
      string="rgb(255,0,0)";
    }
    progFatigue.style.setProperty("--progress-background",string); 
  }
 

  

  
  


}
