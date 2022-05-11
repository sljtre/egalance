import { Component, OnInit } from '@angular/core';
import {TuilesService} from '../shared/services/tuiles.service';
import {PersoService} from '../shared/services/perso.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public matrix = [];
  public type = '';
  public clock;
  public paused = true;

  public day = 1;
  public month = 1;
  public year = 2023;
  
  public delay = 1000;
  public speed = 1;

  public displayFatigue;
  public displaySante;
  public displayFaim;

  private importedTuiles;

  private currentSeason: number;
  private changeSeason: () => void;
  private snowflakes: any[];
  private fallingLeaves: any[];
  private flowers: any[];

  constructor(
    private tuiles: TuilesService,
    public persoService: PersoService,
  ) {
    this.currentSeason = 0;
    this.changeSeason = () => {
      const seasons = ['spring', 'summer', 'autumn', 'winter'];
      const transitionDuration = [5000, 6000, 15000, 15000];
      const div = document.getElementById(seasons[this.currentSeason]);
      div.className = 'animated';
      setTimeout(() => {
        div.className = '';
      }, transitionDuration[this.currentSeason]);
      const bgElement = document.getElementById('animated-bg');
      bgElement.className = 'bg-' + seasons[this.currentSeason];
      this.currentSeason = (this.currentSeason + 1) % 4;
    };
  }

  ngOnInit() {

    this.persoService.dev('Paris', 'judaisme', 'homme', '4', 'David Salomon');
    this.refreshAll();
    setInterval(this.changeSeason, 7000);
    this.snowflakes = new Array(200);
    this.fallingLeaves = [];
    for (let i = 1; i <= 48; i++){
      this.fallingLeaves.push(i);
    }
    this.flowers = [];
    for (let i = 1; i <= 24; i++){
      this.flowers.push((Math.floor(Math.random() * 100) % 9) + 1);
    }

    console.log(this.persoService.perso.localization);
    this.importedTuiles = this.tuiles.getData(this.persoService.perso.localization);
    this.type = this.tuiles.getType(this.persoService.perso.localization);

    for(let i=0;i<50;i++) {
      if (i === 0) {
        this.matrix.push({name: 'aeroport'});
      } else if (i === 14) {
        this.matrix.push({name: 'religion'});
      } else if (i === 24) {
        this.matrix.push({name: 'mairie'});
      } else if (i === 25) {
        this.matrix.push({name: 'culturel'});
      } else if (i === 34) {
        this.matrix.push({name: 'justice'});
      } else {
        const retour = this.chooseAleatTuile(this.matrix, this.importedTuiles);
        this.matrix = retour.mat;
        this.importedTuiles = retour.ref;
      }
    }
    console.log(this.persoService.perso.name);
    console.log(this.persoService.perso);
  }

  chooseAleatTuile = (matrix, tuiles) => {
    const i = Math.floor(Math.random()*tuiles.length);
    matrix.push({name: tuiles[i].name});
    tuiles.splice(i,1);
    return {mat: matrix, ref: tuiles};
  };

  calendar = () => {
    this.persoService.calculAll();
    this.refreshAll();
    this.addTime(1);
  };

  pause = () => {
    if(this.paused){
      this.paused = false;
      this.clock = setInterval(this.calendar, Math.floor(this.delay/this.speed));
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
 

  

  
  


  clockSpeed = (sign) => {
      if (sign === '+') {
        if (this.speed < 5) {
          this.speed++;
        }
      } else {
        if (this.speed > 1) {
          this.speed--;
        }
      }
    if(!this.paused) {
      clearInterval(this.clock);
      this.clock = setInterval(this.calendar, Math.floor(this.delay / this.speed));
    }
  };

}
