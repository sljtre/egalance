export class Perso {

  public localization = '';
  public socioEcoStart = '';




  public religion = '';
  public gender = '';
  public skin = '';
  public name = '';
  public birthdayDay = 1;
  public birthdayMonth = 1;
  public age = 0;
  public currentSickness=0;   //Facteur entre 0 et 1 qui vient affecter la sante

  public instructionLevel=0;
  public studyCriticalBoost=0;
  public studyBoost=0;
  public grade='None';

  public monthlyIncome=0;
  public wallet=0;


  public fatigue = 1;
  public sante = 1;
  public faim = 1;

  public scoreFatigue=0;
  public scoreSante=0;
  public scoreFaim=0;

  constructor(loc) {
    this.localization = loc;
  }

  customization = (religion, gender, skin, name, birthdayDay, birthdayMonth, socioECoStart) => {
    this.religion = religion;
    this.skin = skin;
    this.gender = gender;
    this.name = name;
    this.birthdayDay = birthdayDay;
    this.birthdayMonth = birthdayMonth;
    this.socioEcoStart = socioECoStart;
  };

  /*
  isBirthday = (day, month) => {
    if (this.birthdayDay === day && this.birthdayMonth === month) {
      this.age += 1;

      const event = Math.floor(Math.random() * 4); //c 4 mais faut le changer au max d'event possibles
      switch (event) {
        case 1:
          console.log('Mamie et Papi ont donne un cadeau !');
          break;
        case 2:
          console.log('Papa et Maman ont donne un cadeau !');
          break;
        case 3:
          console.log('Tes amis t\'ont fait un cadeau !');
          break;
        case 4:
          console.log('Tu te prends un resto tout seul...');
          break;
        default:
          break;
      }
    }
  };*/

  //On plus de faim a partir de 60 jours sans rien faire
  calculFaim=()=>{
    if(this.faim>0){
      //this.faim-=0.017;
    }

    //Pour eviter de faire des dépassements de borne
    if(this.faim>1){
      this.faim=1;
    }    
    if (this.faim < 0) {
      this.faim = 0;
    }
  };

  //On perd de la fatigue seuelemnt au cours des actions
  calculFatigue=()=>{
    /*
    if(this.fatigue<1){
      this.fatigue+=(1-this.faim)+this.age/1000;
    }*/

    //Dépassements de borne
    if(this.fatigue>1){
      this.fatigue=1;
    }
    if(this.fatigue<=0){
      this.fatigue=0;
    }
  };

  //On perd de la sante seulement si on a plus d'energie ou de faim ou si on est malade
  calculSante=()=>{
    if(this.sante>0){
      if(this.faim<=0){
        this.sante-=0.008;
      }
      if(this.fatigue<=0){
        this.sante-=0.008;
      }
    }
    //Pour eviter de faire des dépassements de borne
    if(this.sante>1){
      this.sante=1;
    }
    if(this.sante<=0){
      this.sante=0;
    }
    /*
    if(this.sante>0){
      this.sante-= 0.01 - this.fatigue*this.age/1000 - this.currentSickness;
    }

    //Dépassement de borne
    if(this.sante<0){
      this.sante=0;
    }*/
  };

  fallSick = () => {
    //Si le joueur n'est pas actuellement malade
    if (this.currentSickness === 0) {
      const sickness = Math.floor(Math.random() * 9999 + 1);
      if (sickness === 1) {
        this.currentSickness = 0.3;
      } else if (sickness >= 2 && sickness <= 11) {
        this.currentSickness = 0.3;
      } else if (sickness >= 12 && sickness <= 31) {
        this.currentSickness = 0.3;
      } else if (sickness >= 32 && sickness <= 81) {
        this.currentSickness = 0.3;
      }
    }
  };
}
