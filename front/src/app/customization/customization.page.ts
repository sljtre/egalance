import { Component, OnInit } from '@angular/core';
import {PersoService} from '../shared/services/perso.service';
import {Router} from '@angular/router';

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

  private prenom = '';
  private nom = '';
  private listeEthnie=['1','2','3','4','5'];
  private listeGenre=['homme','femme'];
  private listeReligion=['christianisme','islam','judaisme','atheisme'];

  private indEthnie=0;
  private indGenre=0;
  private indReligion=0;

  constructor(
    private persoService: PersoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ethnie = this.listeEthnie[0];
    this.genre = this.listeGenre[0];
    this.religion = this.listeReligion[0];
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

  allRand = async () => {
    this.randEthnie();
    this.randGenre();
    this.randReligion();
    await this.randFullName();
  };

  validatePerso = async () => {
    this.persoService.custom(this.religion, this.genre, this.ethnie, this.fullName);
    await this.router.navigateByUrl('/game');
  };
}
