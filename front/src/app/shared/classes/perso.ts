export class Perso {

  public localization = '';

  public religon = '';
  public gender = '';
  public skin = '';
  public name = '';

  constructor(loc){
    this.localization=loc;
  }

  customization = (religion, gender, skin, name) => {
    this.religon = religion;
    this.skin = skin;
    this.gender = gender;
    this.name = name;
  };
}
