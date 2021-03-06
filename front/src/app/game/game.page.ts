import {Component, OnInit, ViewChild} from '@angular/core';
import {TuilesService} from '../shared/services/tuiles.service';
import {PersoService} from '../shared/services/perso.service';
import {GameEventService} from '../shared/services/game-event.service';
import {RouletteService} from '../shared/services/roulette.service';
import {GameActionsService} from '../shared/services/game-actions.service'
import {RouterService} from '../shared/services/router.service';
import {SaisonsComponent} from './saisons/saisons.component'
import {Animation, AnimationController, ModalController} from '@ionic/angular';
import {ObjectUnsubscribedError} from 'rxjs';


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
  public timeToAdd = 0;

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

  public currentName = 'Town Hall';

  private importedTuiles;
  public currentSeason;

  public deplacement: Animation;

  public birthdayPassed=false;

  public action = 'Neutral';
  public x = 430;
  public y = 111;

  public isMoving = false;

  public isRouletteOpen = false;
  public isHiddenSpin = false;
  public isHiddenValid = true;
  public isDisabledValid = true;
  public end;

  public positionPlayer = 'top:' + this.y + 'px; left:' + this.x + 'px;';

  constructor(
    public tuiles: TuilesService,
    public persoService: PersoService,
    private eventService: GameEventService,
    public roulette: RouletteService,
    public gameActions: GameActionsService,
    private animationCtrl: AnimationController,
    public modalController: ModalController,
    public router: RouterService,
  ) {
  };

  async ngOnInit() {

    // add event to prevent refresh
    window.addEventListener('beforeunload', e => {
      const confirmationMessage = '\o/';
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
    });


    // this.persoService.dev('Rio de Janeiro', 'judaisme', 'homme', '4', 'David Salomon', 5, 2, '2');

    //Initialzation du jeu au donnes du joueur
    this.day=this.persoService.perso.birthdayDay;
    this.month=this.persoService.perso.birthdayMonth;
    console.log(this.tuiles.getSalaire(this.persoService.perso.localization)*this.persoService.perso.socioEcoStart);
    this.persoService.perso.wallet=this.tuiles.getSalaire(this.persoService.perso.localization)*this.persoService.perso.socioEcoStart;

    this.refreshAll();




    this.importedTuiles = this.tuiles.getData(this.persoService.perso.localization);
    this.type = this.tuiles.getType(this.persoService.perso.localization);
    for (let k = 0; k < 5; k++) {
      for (let i = 0; i < 10; i++) {
        if (!i && !k) {
          this.matrix[k].push({name: 'aeroport', left: 0, top: 0, type: this.type});
        } else if (i === 5 && k === 1) {
          this.matrix[k].push({name: 'religion', left: 401, top: 64, type: this.type});
        } else if (i === 6 && k === 2) {
          this.matrix[k].push({name: 'mairie', left: 438, top: 128, type: this.type});
        } else if (i === 5 && k === 2) {
          this.matrix[k].push({name: this.persoService.perso.localization, left: 365, top: 128, type: 'culturel'});
        } else if (i === 5 && k === 3) {
          this.matrix[k].push({name: 'justice', left: 401, top: 192, type: this.type});
        } else {
          const retour = this.tuiles.chooseAleatTuile(this.matrix, this.importedTuiles);
          this.matrix = retour.mat;
          this.importedTuiles = retour.ref;
        }
      }
    }

    console.log(this.tuiles.getActions('Town hall').includes('Buy any House'));
  }

  actionClicked = (action) => {
    if (!this.paused) {
      this.pause();
    }
    console.log(action);
    this.action = action;
    if (action == 'Practice') {
      this.action = 'Sport';
    }
    if (action == 'Study') {
      console.log(action);
      this.action = 'Work';
    }
    this.timeToAdd=this.gameActions.actionHandler(action,this.persoService.perso.localization,this.currentName);
    if(this.timeToAdd==-99999){

    }
    else if(this.timeToAdd==0 && this.persoService.perso.wallet<0){
      this.eventService.eventNoMoney();
    }
    else if(this.timeToAdd<0){
      this.addTime(-this.timeToAdd);
    }
    else{this.isRouletteOpen=true;}
  }

  spin = () => {
    this.roulette.spin();
    this.isHiddenSpin = true;
    this.isHiddenValid = false;
    this.checkRouletteFin();
  };

  checkRouletteFin = () => {
    if (this.roulette.answer != undefined) {

      clearTimeout(this.end);
      this.isDisabledValid = false;
    } else {
      this.end = setTimeout(this.checkRouletteFin, 200);
    }
  };

  resetRoulette = () => {
    this.roulette.answer = undefined;
    this.roulette.setRoulette([], []);
    this.roulette.drawRouletteWheel();
  };

  dismissModal = () => {
    this.isRouletteOpen = false;
    this.gameActions.actionsResponseHandler(this.roulette.answer);
    this.addTime(this.timeToAdd);
    this.timeToAdd = 0;
    this.pause();
  }

  buttonReset = () => {
    this.isHiddenSpin = false;
    this.isHiddenValid = true;
    this.isDisabledValid = true;
  };


  hoverEnter = (name) => {
    const retour = this.tuiles.getInfo(name);
    this.hoverName = retour.name;
    this.hoverDescription = retour.description;
    this.hoverActions = 'Possible actions here : '
    for (const line of retour.actions) {
      this.hoverActions += line + ' ';
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
    if(this.persoService.perso.sante<=0){
      this.eventService.eventLost(0); //valeur temporaire ed score a remplacer avec une vraie
      this.pause();
    }
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
      this.birthdayPassed=false;
      this.addTime(0);
    }
    if(this.day>=this.persoService.perso.birthdayDay && this.month>=this.persoService.perso.birthdayMonth && this.birthdayPassed==false){
      this.persoService.perso.age+=1;
      this.birthdayPassed=true;
      this.eventService.eventBirthday()

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

  //Animation d??placement
  deplacementPlay = async (x, y, name) => {

    if (!this.paused) {
      if (Math.floor(Math.floor(Math.abs(this.x + 8 - x) / 73) + Math.floor(Math.abs(this.y + 12 - y) / 64)) < 2) {
        if (!this.isMoving) {
          this.isMoving = true;

          this.currentName = '';

          x -= 8;
          y -= 12;
          this.positionPlayer = '';
          let elt = document.querySelector('#player');
          if ((x - this.x) > 0) {
            this.action = 'WalkingManPositive';
          } else {
            this.action = 'WalkingManNegative';
          }

          this.persoService.perso.fatigue -= 0.02;
          this.persoService.perso.faim -= 0.017;

          let start = 'translateX(' + this.x + 'px) translateY(' + this.y + 'px)'
          let finish = 'translateX(' + x + 'px) translateY(' + y + 'px)';

          this.deplacement = this.animationCtrl.create()
            .addElement(elt)
            .duration((25 * (Math.abs(x - this.x) + Math.abs(y - this.y))) * (1 - this.speed / 10))
            .iterations(1)
            .direction('alternate')
            .keyframes([
              {offset: 0, transform: start},
              {offset: 1, transform: finish}
            ]);

          await this.deplacement.play().then(() => {
            const retour = this.tuiles.getInfo(name);
            this.currentName = retour.name;
            this.action = 'Neutral';
            this.x = x;
            this.y = y;
            this.isMoving = false;
          });
        }
      }
    }
  }
};
