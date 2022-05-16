import {Component, OnInit, ViewChild} from '@angular/core';
import {TuilesService} from '../shared/services/tuiles.service';
import {PersoService} from '../shared/services/perso.service';
import {SaisonsComponent} from './saisons/saisons.component'
import { Animation, AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  @ViewChild(SaisonsComponent) saisonsComponent: SaisonsComponent;

  public matrix = [[], [], [], [], []];
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

  public hoverName = '';
  public hoverDescription = '';
  public hoverActions = '';

  public position = {x: 100, y: 100};

  private importedTuiles;


  //Animation déplacement
  public deplacement: Animation;

  public action = 'WalkingManPositive';
  public x = 13;
  public y = -20;

  // public xWanted = 50;
  // public yWanted = 150;

  private xOnLoad = this.x;
  private yOnLoad = this.y;
  public positionPlayer = 'top:' + this.yOnLoad + 'px; left:' + this.xOnLoad + 'px;';


  constructor(
    private tuiles: TuilesService,
    public persoService: PersoService,

    //Animation déplacement
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {

    this.persoService.dev('Paris', 'judaisme', 'homme', '4', 'David Salomon');
    this.refreshAll();

    console.log(this.persoService.perso.localization);
    this.importedTuiles = this.tuiles.getData(this.persoService.perso.localization);
    this.type = this.tuiles.getType(this.persoService.perso.localization);
    for (let k = 0; k < 5; k++) {
      for (let i = 0; i < 10; i++) {
        if (!i && !k) {
          this.matrix[k].push({name: 'aeroport', left:0, top:0});
        } else if (i === 5 && k === 1) {
          this.matrix[k].push({name: 'religion', left:401, top:64});
        } else if (i === 6 && k === 2) {
          this.matrix[k].push({name: 'mairie', left:438, top:128});
        } else if (i === 5 && k === 2) {
          this.matrix[k].push({name: 'aeroport', left:365, top:128});
        } else if (i === 5 && k === 3) {
          this.matrix[k].push({name: 'justice', left:301, top:192});
        } else {
          const retour = this.tuiles.chooseAleatTuile(this.matrix, this.importedTuiles);
          this.matrix = retour.mat;
          this.importedTuiles = retour.ref;
        }
      }
    }
    console.log(this.persoService.perso.name);
    console.log(this.persoService.perso);
  }

  hoverEnter = (name) => {
    const retour = this.tuiles.getInfo(name);
    this.hoverName = retour.name;
    this.hoverDescription = retour.description;
    this.hoverActions = 'Possible actions here : '
    for(const line of retour.actions){
      this.hoverActions+=line + ' ';
    }
  };

  hoverLeave = () => {
    this.hoverName = '';
    this.hoverDescription = '';
    this.hoverActions = '';
  }

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
      this.saisonsComponent.changeSeason(this.month);
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

  test = (top, left) => {
    console.log('coo : left = ', left, 'top = ', top);
  }

  //Animation déplacement
  deplacementPlay = (x, y) => {
    x += 13;
    y -= 20;
    this.positionPlayer = '';
    let elt = document.querySelector('#player');
    this.action = 'WalkingManPositive';

    let start = 'translateX(' + this.x + 'px) translateY(' + this.y + 'px)'
    let finish = 'translateX(' + x + 'px) translateY(' + y + 'px)';

    this.deplacement = this.animationCtrl.create()
    .addElement(elt)
    .duration(25*(Math.abs(x-this.x)+Math.abs(y-this.y)))
    .iterations(1)
    .direction('alternate')
    .keyframes([
      {offset: 0, transform: start},
      {offset: 1, transform: finish}
    ]);

    this.deplacement.play().then( () => {
      this.action = 'WalkingManPositive';
      this.x = x;
      this.y = y;
    });
  }
}
