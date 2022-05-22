import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouletteService {

  constructor() { }
  public options = [];
  public chances = [];
  public arcs=[];
  public colors=[];

  public answer;
  private startAngle = 0;

  private spinTimeout = null;

  private spinArcStart = 10;
  private spinTime = 0;
  private spinTimeTotal = 0;
  private spinAngleStart;
  private ctx;


setOptions=(Noptions)=>{
  
  for(let i=0;i<Noptions.length;i++){
    this.options[i]=Noptions[i];
  }
  
}

setChances=(Nchances)=>{  
  for(let i=0;i<Nchances.length;i++){
    this.chances[i]=Nchances[i];
  }
  
}

resetOptionsAndChances=()=>{
  this.options=[];
  this.chances=[];
}

setColor=()=> {
  let phase = 0;
  let center = 128;
  let width = 127;
  let frequency = Math.PI*2/this.options.length;  
  for(let i=0;i<this.options.length;i++){
    let red   = Math.sin(frequency*i+2+phase) * width + center;
    let green = Math.sin(frequency*i+0+phase) * width + center;
    let blue  = Math.sin(frequency*i+4+phase) * width + center;    
    let data=this.hexToRgb(this.RGB2Color(red,green,blue));
    this.colors[i]='rgb('+data[0]+','+data[1]+','+data[2]+')';    
    //console.log(this.colors[i]);
  }  
  
}

setArcs=()=>{
  for(let i=0;i<this.chances.length;i++){
    this.arcs[i]=this.chances[i]*Math.PI*2;  
  }  
}

//Options et chances sont deux tableau de meme longueur, chances prend des valeurs entre 0 et 1 dont le somme fait 1
setRoulette=(options,chances)=>{  
  this.setOptions(options);
  this.setChances(chances);
  this.setColor();
  this.setArcs();  

}



byte2Hex=(n)=> {
  let nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}
RGB2Color=(r,g,b)=>{
	return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
}

getColor = (item, maxitem)=> {
  let phase = 0;
  let center = 128;
  let width = 127;
  let frequency = Math.PI*2/maxitem;
  
  let red   = Math.sin(frequency*item+2+phase) * width + center;
  let green = Math.sin(frequency*item+0+phase) * width + center;
  let blue  = Math.sin(frequency*item+4+phase) * width + center;

  return this.RGB2Color(red,green,blue);
}



  drawRouletteWheel=()=> {
  let canvas = <HTMLCanvasElement>document.getElementById("canvas");
  if (canvas.getContext) {
    let outsideRadius = 200;
    let textRadius = 160;
    let insideRadius = 125;

    this.ctx = canvas.getContext("2d");
    this.ctx.clearRect(0,0,500,500);

    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;

    this.ctx.font = 'bold 12px Helvetica, Arial';
    let angle = this.startAngle;
    for(let i = 0; i < this.options.length; i++) {
      this.ctx.fillStyle = this.getColor(i, this.options.length);

      this.ctx.beginPath();
      this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arcs[i], false);
      this.ctx.arc(250, 250, insideRadius, angle+this.arcs[i], angle, true);
      this.ctx.stroke();
      this.ctx.fill();

      this.ctx.save();
      /*
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      */
     this.ctx.fillStyle = "white";
     this.ctx.translate(250 + Math.cos(angle + this.arcs[i] / 2) * textRadius, 
                        250 + Math.sin(angle + this.arcs[i] / 2) * textRadius);
      this.ctx.rotate(angle + this.arcs[i] / 2 + Math.PI / 2);
      let text = this.options[i];
      this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
      this.ctx.restore();     
      angle=angle+this.arcs[i];      
    } 

    //Arrow
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    this.ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    this.ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    this.ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    this.ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    this.ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    this.ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    this.ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    this.ctx.fill();
  }
}
spin=()=> {
  this.spinAngleStart = Math.random() * 10 + 10;
  this.spinTime = 0;
  this.spinTimeTotal = Math.random() * 3 + 4 * 1000;    
  this.rotateWheel();
 
}

rotateWheel=()=>{
  this.spinTime += 30;  
  if(this.spinTime >= this.spinTimeTotal) {
    this.stopRotateWheel();
    return;
  }
  let spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
  this.startAngle += (spinAngle * Math.PI / 180);
  this.drawRouletteWheel();
  this.spinTimeout = setTimeout(this.rotateWheel, 30);
}




stopRotateWheel=()=> {
  clearTimeout(this.spinTimeout);
  let pixel=this.ctx.getImageData(250,250-(200-13),1,1);  
  let data=pixel.data;
  const rgba = 'rgb('+data[0]+','+data[1]+','+data[2]+')';
  let ind=this.colors.indexOf(rgba);
  
  this.ctx.save();
  this.ctx.font = 'bold 30px Helvetica, Arial';
  let text = this.options[ind];
  this.answer=text;
  this.ctx.fillText(text, 250 - this.ctx.measureText(text).width / 2, 250 + 10);
  this.ctx.restore();
}

easeOut=(t, b, c, d)=> {
  let ts = (t/=d)*t;
  let tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

hexToRgb=(hex)=>{
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
}




}
