import {Component, OnInit} from '@angular/core';
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

  public tuileHover = '';

  public currentSeason;
  public changeSeason: (month) => void;
  public snowflakes: any[];
  public fallingLeaves: any[];
  public flowers: any[];

  public position = {x:100, y:100};

  private importedTuiles;

  constructor(
    private tuiles: TuilesService,
    public persoService: PersoService,
  ) {
    this.changeSeason = (month) => {
      const seasons = ['spring', 'summer', 'autumn', 'winter'];
      const transitionDuration = [5000, 6000, 15000, 15000];
      const previousSeason = this.currentSeason;
      switch (month) {
        case 12 || 1 || 2:
          this.currentSeason = 'winter';
          break;
        case 3 || 4 || 5:
          this.currentSeason = 'spring';
          break;
        case 6 || 7 || 8:
          this.currentSeason = 'summer';
          break;
        case 9 || 10 || 11:
          this.currentSeason = 'autumn';
          break;
      }
      if (previousSeason !== this.currentSeason) {
        const div = document.getElementById(this.currentSeason);
        div.className = 'animated';
        setTimeout(() => {
          div.className = '';
        }, this.currentSeason === 'spring' ? 7000 : 15000);
        const bgElement = document.getElementById('animated-bg');
        bgElement.className = 'bg-' + this.currentSeason;
      }
    };
  }

  ngOnInit() {

    this.persoService.dev('Paris', 'judaisme', 'homme', '4', 'David Salomon');
    this.refreshAll();

    setInterval(this.changeSeason, 7000);
    this.snowflakes = new Array(200);
    this.fallingLeaves = [];
    for (let i = 1; i <= 48; i++) {
      this.fallingLeaves.push(i);
    }
    this.flowers = [];
    for (let i = 1; i <= 24; i++) {
      this.flowers.push((Math.floor(Math.random() * 100) % 9) + 1);
    }

    console.log(this.persoService.perso.localization);
    this.importedTuiles = this.tuiles.getData(this.persoService.perso.localization);
    this.type = this.tuiles.getType(this.persoService.perso.localization);

    for (let i = 0; i < 50; i++) {
      if (i === 0) {
        this.matrix.push({name: 'aeroport'});
      } else if (i === 15) {
        this.matrix.push({name: 'religion'});
      } else if (i === 26) {
        this.matrix.push({name: 'mairie'});
      } else if (i === 25) {
        this.matrix.push({name: 'aeroport'});
      } else if (i === 35) {
        this.matrix.push({name: 'justice'});
      } else {
        const retour = this.tuiles.chooseAleatTuile(this.matrix, this.importedTuiles);
        this.matrix = retour.mat;
        this.importedTuiles = retour.ref;
      }
    }
    console.log(this.persoService.perso.name);
    console.log(this.persoService.perso);
  }

  hoverEnter = (name) => {
    this.tuileHover = name;
  };

  hoverLeave = () => this.tuileHover = '';

  calendar = () => {
    this.persoService.calculAll();
    this.refreshAll();
    this.addTime(1);
  };

  pause = () => {
    if (this.paused) {
      this.paused = false;
      this.clock = setInterval(this.calendar, Math.floor(this.delay / this.speed));
    } else {
      this.paused = true;
      clearInterval(this.clock);
    }
  };

  addTime = (days) => {
    this.day += days;
    if (this.day > 30) {
      this.day -= 30;
      this.month++;
      this.changeSeason(this.month);
      this.addTime(0);
    }
    if (this.month > 12) {
      this.month -= 12;
      this.year++;
      this.addTime(0);
    }
  };

  //---------------------------------------------

  refreshAll = () => {
    this.displayFaim = this.persoService.perso.faim;
    this.displaySante = this.persoService.perso.sante;
    this.displayFatigue = this.persoService.perso.fatigue;


    const progFaim = document.getElementById('progFaim');
    const progSante = document.getElementById('progSante');
    const progFatigue = document.getElementById('progFatigue');

    let tmp;

    //Changement de couleur barre de progression Faim
    if (this.displayFaim > 0 && this.displayFaim <= 0.5) {
      tmp = 'rgb(255,' + Math.floor(this.displayFaim * 510) + ',0)';
    } else if (this.displayFaim > 0.5 && this.displayFaim <= 1) {
      tmp = 'rgb(' + (510 - Math.floor(this.displayFaim * 510)) + ',255,0)';
    }
    progFaim.style.setProperty('--progress-background', tmp);

    //Changement de couleur barre de progression Sante
    if (this.displaySante > 0 && this.displaySante <= 0.5) {
      tmp = 'rgb(255,' + Math.floor(this.displaySante * 510) + ',0)';
    } else if (this.displaySante > 0.5 && this.displaySante <= 1) {
      tmp = 'rgb(' + (510 - Math.floor(this.displaySante * 510)) + ',255,0)';
    }
    progSante.style.setProperty('--progress-background', tmp);

    //Changement de couleur barre de progression Fatigue
    //Changement de couleur barre de progression Faim
    if (this.displayFatigue > 0 && this.displayFatigue <= 0.5) {
      tmp = 'rgb(255,' + Math.floor(this.displayFatigue * 510) + ',0)';
    } else if (this.displayFatigue > 0.5 && this.displayFatigue <= 1) {
      tmp = 'rgb(' + (510 - Math.floor(this.displayFatigue * 510)) + ',255,0)';
    }
    progFatigue.style.setProperty('--progress-background', tmp);
  };


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
    if (!this.paused) {
      clearInterval(this.clock);
      this.clock = setInterval(this.calendar, Math.floor(this.delay / this.speed));
    }
  };
}
