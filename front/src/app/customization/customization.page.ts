import { Component, OnInit } from '@angular/core';
import {PersoService} from '../shared/services/perso.service';
import {TuilesService} from '../shared/services/tuiles.service';
import {RouterService} from '../shared/services/router.service';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.page.html',
  styleUrls: ['./customization.page.scss'],
})
export class CustomizationPage implements OnInit {

  public fullName = '';
  public ethnie;
  public genre;
  public religion;
  public birthdayDay = 1;
  public birthdayMonth = 1;
  public socioEcoStart = '1';

  public majoriteReligion;
  public majoriteEthnie;

  private prenom = '';
  private nom = '';
  private listeEthnie=['1','2','3','4','5'];
  private listeGenre=['homme','femme'];
  private listeReligion=['christianisme','islam','judaisme','atheisme'];
  private listeSocioEco=['1','2','3','4','5'];

  private indEthnie=0;
  private indGenre=0;
  private indReligion=0;
  private indSocioEco=0;

  constructor(
    private persoService: PersoService,
    public tuilesService:TuilesService,
    private router: RouterService
  ) {}

  ngOnInit() {
    this.ethnie = this.listeEthnie[0];
    this.genre = this.listeGenre[0];
    this.religion = this.listeReligion[0];
    this.socioEcoStart=this.listeSocioEco[0];

    this.majoriteReligion=this.tuilesService.getReligion(this.persoService.perso.localization);
    this.majoriteEthnie=this.tuilesService.getEthnie(this.persoService.perso.localization);
  }

  funcEthnie = (move)=>{
    if(move === 'left'){
      if(this.indEthnie === 0){
        this.indEthnie=this.listeEthnie.length-1;
      } else {
        this.indEthnie-=1;
      }
    }
    if(move === 'right'){
      if(this.indEthnie === this.listeEthnie.length-1){
        this.indEthnie=0;
      } else{
        this.indEthnie+=1;
      }
    }
    this.ethnie=this.listeEthnie[this.indEthnie];
  };

  funcSocioEco = (move)=>{
    if(move === 'left'){
      if(this.indSocioEco === 0){
        this.indSocioEco=this.listeSocioEco.length-1;
      } else {
        this.indSocioEco-=1;
      }
    }
    if(move === 'right'){
      if(this.indSocioEco === this.listeSocioEco.length-1){
        this.indSocioEco=0;
      } else{
        this.indSocioEco+=1;
      }
    }
    this.socioEcoStart=this.listeSocioEco[this.indSocioEco];
  };

  funcGenre = (move)=>{
    if(move === 'left'){
      if(this.indGenre === 0){
        this.indGenre=this.listeGenre.length-1;
      } else{
        this.indGenre-=1;
      }
    }
    if(move === 'right'){
      if(this.indGenre === this.listeGenre.length-1){
        this.indGenre=0;
      } else{
        this.indGenre+=1;
      }
    }
    this.genre=this.listeGenre[this.indGenre];
  };

  funcReligion = (move) => {
    if(move === 'left'){
      if(this.indReligion === 0){
        this.indReligion=this.listeReligion.length-1;
      } else{
        this.indReligion-=1;
      }
    }
    if(move === 'right'){
      if(this.indReligion === this.listeReligion.length-1){
        this.indReligion=0;
      } else {
        this.indReligion+=1;
      }
    }
    this.religion=this.listeReligion[this.indReligion];
  };

  randEthnie=()=>{
    this.indEthnie=Math.floor(Math.random() * (this.listeEthnie.length));
    this.ethnie=this.listeEthnie[this.indEthnie];
  };

  randSocioEco=()=>{
    this.indSocioEco=Math.floor(Math.random() * (this.listeSocioEco.length));
    this.socioEcoStart=this.listeSocioEco[this.indSocioEco];
  };

  randReligion=()=>{
    this.indReligion=Math.floor(Math.random() * (this.listeReligion.length));
    this.religion=this.listeReligion[this.indReligion];
  };

  randGenre=()=>{
    this.indGenre=Math.floor(Math.random() * (this.listeGenre.length));
    this.genre=this.listeGenre[this.indGenre];
  };



  randPrenom = async () => {
    await fetch('./assets/files/prenoms.txt').then(response=>response.text()).then(resp=>{
      const data=resp.split(/\r\n|\r|\n/);
      if(this.genre === 'homme'){
        this.prenom=data[Math.floor(Math.random()*data.length)].split(',')[0];
      }
      else if(this.genre === 'femme'){
        this.prenom=data[Math.floor(Math.random()*data.length)].split(',')[1];
      }
    });
  };

  randNom = async () => {
    await fetch('./assets/files/noms.txt').then(resp=>resp.text()).then(resp=>{
      const data=resp.split(/\r\n|\r|\n/);
      this.nom=data[Math.floor(Math.random()*data.length)];
    });
  };

  randFullName = async () => {
    await this.randPrenom();
    await this.randNom();
    this.fullName = this.prenom + ' ' + this.nom;
  };

  randBirthday=()=>{
    this.birthdayDay=Math.floor(Math.random()*29+1);
    this.birthdayMonth=Math.floor(Math.random()*11+1);
  }

  allRand = async () => {
    this.randEthnie();
    this.randGenre();
    this.randReligion();
    await this.randFullName();
    this.randBirthday();
    this.randSocioEco();
  };

  validatePerso = async () => {
    this.persoService.custom(this.religion, this.genre, this.ethnie, this.fullName,this.birthdayDay,this.birthdayMonth,this.socioEcoStart);
    await this.router.redirect('game');
  };
}
