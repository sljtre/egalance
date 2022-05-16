import {Component, OnInit, ViewChild} from '@angular/core';
import {TuilesService} from '../shared/services/tuiles.service';
import {PersoService} from '../shared/services/perso.service';
import {RouletteService} from '../shared/services/roulette.service';
import {SaisonsComponent} from './saisons/saisons.component'
import { Animation, AnimationController,ModalController } from '@ionic/angular';
import { ObjectUnsubscribedError } from 'rxjs';


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

  private importedTuiles;
  public currentSeason;

  public deplacement: Animation;

  public action = 'WalkingManPositive';
  public x = 13;
  public y = -20;

  public isMoving = false;

<<<<<<< HEAD
  public isHiddenSpin =false;
  public isHiddenValid = true;
  public isDisabledValid=true;
  public end;

=======
  public positionPlayer = 'top:' + this.y + 'px; left:' + this.x+ 'px;';
>>>>>>> dee92aaf8d81241b6b48c6777a711c60d3ec2750

  constructor(
    private tuiles: TuilesService,
    public persoService: PersoService,
    public roulette:RouletteService,
    private animationCtrl: AnimationController,
    public modalController:ModalController
  ) {};

  async ngOnInit() {

    //this.persoService.dev('Rio de Janeiro', 'judaisme', 'homme', '4', 'David Salomon');
    this.refreshAll();

    this.importedTuiles = this.tuiles.getData(this.persoService.perso.localization);
    this.type = this.tuiles.getType(this.persoService.perso.localization);
    for (let k = 0; k < 5; k++) {
      for (let i = 0; i < 10; i++) {
        if (!i && !k) {
          this.matrix[k].push({name: 'aeroport', left:0, top:0, type: this.type});
        } else if (i === 5 && k === 1) {
          this.matrix[k].push({name: 'religion', left:401, top:64, type: this.type});
        } else if (i === 6 && k === 2) {
          this.matrix[k].push({name: 'mairie', left:438, top:128, type: this.type});
        } else if (i === 5 && k === 2) {
          this.matrix[k].push({name: this.persoService.perso.localization, left:365, top:128, type: 'culturel'});
        } else if (i === 5 && k === 3) {
          this.matrix[k].push({name: 'justice', left:401, top:192, type: this.type});
        } else {
          const retour = this.tuiles.chooseAleatTuile(this.matrix, this.importedTuiles);
          this.matrix = retour.mat;
          this.importedTuiles = retour.ref;
        }
      }
    }
    this.roulette.setRoulette(["Test","These","Nuts","Jhonny"],[0.3,0.2,0.4,0.1]);

  }

  test=()=>{
    console.log("Fonction test appele");
    this.roulette.setRoulette(["Edgar","Simon","CJ","Paul","Nathan"],[0.1,0.1,0.1,0.6,0.1])
    //this.roulette.drawRouletteWheel();
  }

  spin=()=>{    
    this.roulette.spin();
    this.isHiddenSpin=true;
    this.isHiddenValid=false;  
    this.checkRouletteFin();
  }

  checkRouletteFin=()=>{
    if(this.roulette.answer!=undefined){      
      clearTimeout(this.end);
      this.isDisabledValid=false;
    }
    else{
      this.end =setTimeout(this.checkRouletteFin,200);
    }
  }

  resetRoulette=()=>{
    this.roulette.answer=undefined;    
    this.roulette.drawRouletteWheel();
  }

  dismissModal=()=>{
    this.modalController.dismiss({
      'dismissed':true
    });
    
  }

  buttonReset=()=>{
    console.log("hello we left the modal !");
    this.isHiddenSpin=false;
    this.isHiddenValid=true;
    this.isDisabledValid=true;
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

  //Animation déplacement
  deplacementPlay = (x, y, name) => {

    if(Math.floor(Math.abs(this.x-13-x)/73)<2 && Math.floor(Math.abs(this.y+20-y)/64)<2
      && Math.floor(Math.abs(this.x-13-x)/73)+Math.floor(Math.abs(this.y+20-y)/64)!== 2) {
      if (!this.isMoving) {
        this.isMoving = true;
        x += 13;
        y -= 20;
        this.positionPlayer = '';
        let elt = document.querySelector('#player');
        this.action = 'WalkingManPositive';

        let start = 'translateX(' + this.x + 'px) translateY(' + this.y + 'px)'
        let finish = 'translateX(' + x + 'px) translateY(' + y + 'px)';

        this.deplacement = this.animationCtrl.create()
          .addElement(elt)
          .duration(25 * (Math.abs(x - this.x) + Math.abs(y - this.y)))
          .iterations(1)
          .direction('alternate')
          .keyframes([
            {offset: 0, transform: start},
            {offset: 1, transform: finish}
          ]);

        this.deplacement.play().then(() => {
          this.action = 'WalkingManPositive';
          this.x = x;
          this.y = y;
          this.isMoving = false;
        });
      }
    }
  }
}
