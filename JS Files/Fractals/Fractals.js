p5.disableFriendlyErrors = true;

let maxIteration=80;
let powerOf=2;

/*let arr=["a","bi"];
let mult=["a","bi"];

let count=[];
let icount=[],img=[],real=[];
let numreal=[],numimg=[];*/
let mapColor;

const colorsRed = [];
const colorsGreen = [];
const colorsBlue = [];

let sound,amp,velx=0,vely=-1.1,dx=1.8,dy=1.1;

let isPaused=true;
function preload(){
	//sound=loadSound('JS Files/Fractals/Sound/BassBeat.mp3');
}
function setup(){
	createCanvas(500,375);
	colorMode(RGB);
	pixelDensity(1);
	background(0);
	//strokeWeight(1);
	amp=new p5.Amplitude(0.7);
	mapColor=[ color(66 , 30 , 15),// brown 3
 			color(25  , 7  ,26 ),// dark violett
			color(  9 ,  1 , 47),// darkest blue
			color(  4 ,  4 , 73),// blue 5
			color(  0 ,  7 ,100),// blue 4
			color( 12 , 44 ,138),// blue 3
			color( 24 , 82 ,177),// blue 2
			color( 57 ,125 ,209),// blue 1
			color(134 ,181 ,229),// blue 0
			color(211 ,236 ,248),// lightest blue
			color(241 ,233 ,191),// lightest yellow
			color(248 ,201 , 95),// light yellow
			color(255 ,170 ,  0),// dirty yellow
			color(204 ,128 ,  0),// brown 0
			color(153 , 87 ,  0),// brown 1
			color(106 , 52 ,  3)];// brown 2

	for(let n=0;n<maxIteration;n++){
		colorsRed[n]=red(mapColor[n%16]);
		colorsGreen[n]=green(mapColor[n%16]);
		colorsBlue[n]=blue(mapColor[n%16]);
	}
	
}
function draw(){
	//amp=Math.random(0,1)
	if(!isPaused){
		background(0);
		loadPixels();
		let level = amp.getLevel();
  		let size = map(level, 0, 1, -0.25, 1.8);
		for(let x=0;x<width;x++){
			for(let y=0;y<height;y++){
				let a=map(x,0,width-1,-2.3,1.7);
				let b=map(y,0,height-1,-1.5,1.5);

				
				//a^2-b^2 +2abi +(a+bi)
				let ca=dx*Math.cos(velx);//*Math.cos(vel);//map(mouseX,0,width,-2.3,1.7);
				let cb=dy*Math.sin(vely);//map(mouseY,0,height,-1.5,1.5);
				let a2,b2;
				let n=0;
				//let z=new Complex(0,0);
				while(n<maxIteration){
					//let a2=Math.pow(a,3)-3*a*Math.pow(b,2);
					//let a2=getReal(a, b)
					//let b2=3*a*a*b - b*b*b;
					//let b2=getImg(a, b)+
					
					let pa=a;
					let pb=b;
					for(let i=0;i<powerOf-1;i++){
						
						a2 = a * pa - b * pb;
						b2 = a * pb + b * pa;
						pa=a2;pb=b2;
					}
					
					if(Math.sqrt(a*a+b*b)>8){
						break;
					}
					a=a2+ca;
					b=b2+cb;
					n++;
				}
				//let x1=n%16;
				//let x1=map(n,0,maxIteration,0,1);
				//let bright=1-Math.pow(1-map(n,0,maxIteration,0,1),5);
				//x1=map(x1,0,100,0,1);
				//let hue=1 - Math.pow(1 - x1, 3);
				//bright=map(bright,0,1,0,100);
				//hue=map(hue,0,1,0,360);
				//let hue=40;
				//let bright=100;
				 let pix = (x + y* width) * 4;
				if(n>0 && n<maxIteration ){
					pixels[pix + 0] = colorsRed[n];
	       	 		pixels[pix + 1] = colorsGreen[n];
	        		pixels[pix + 2] = colorsBlue[n];
					//stroke(mapColor[x1]);
					//stroke(hue,100,100);
				}
				else{
					pixels[pix + 0] = 0;
	        		pixels[pix + 1] = 0;
	        		pixels[pix + 2] = 0;
					//bright=0;
					//hue=0;
					//stroke(0,0,0);
				}	
				//point(x,y);

			}
		}
		updatePixels();
		strokeWeight(3);
		stroke(255);
		translate(width/2,height/2);
		point(100*dx*Math.cos(velx),100*dy*Math.sin(vely));
		/*dx*=0.999;
		dy*=0.999;*/
		vely+=0.03;
		velx+=0.03;
	}
	//noLoop();
}
function keyPressed(){
	//console.log(keyCode);
	switch(keyCode){
		case 13,32://enter,space
			isPaused=!isPaused;	
			/*if(isPaused) sound.pause();
			else sound.loop();*/
			break;
	}
}
/*function findEquation(arr,mult){
	let index=0;
	let res=[];
	for(x of arr){
		for(y of mult){
			res[index]=x+y;
			index++;
		}
	}
	arr=res;
	return arr;
}
function sortResult(arr){
	for(let i =0;i<arr.length;i++){
		arr[i]=arr[i].split('');
		arr[i].sort();
		arr[i]=arr[i].join('');
		
	}
	
	for(let x =0;x<arr.length;x++){
		count[x]=1;
		for(let i=x+1;i<arr.length;i++){
			if(arr[x]==arr[i]){
				count[x]++;	
				//arr[x]=[count[x].toString(),arr[i]];
				arr.splice(i,1);
				count.splice(i,1);
				i--;
				
			}
		}
	}
}

function countLetter(char,str){
	let c=0;
	for(let i=0;i<str.length;i++){	
		if(str.charAt(i)==char){
			c++;
		}
	} 
	return c;
}

function calcReal(real){
	let aa=0;
	for(let i=0;i<real.length;i++){
		let anum=0,bnum=0;
		for(let j=0;j<real[i][1].length;j++){
			if(real[i][1].charAt(j)=="a"){
				anum++;
			}
			if(real[i][1].charAt(j)=="b"){
				bnum++;
			}
		}
		numreal.push([anum,bnum]);
		//aa+=real[i][0]*Math.pow(a,anum)*Math.pow(b,bnum);
	}
	//return aa;
}

function calcImg(img){
	let bb=0;
	for(let i=0;i<img.length;i++){
		let anum=0,bnum=0;
		for(let j=0;j<img[i][1].length;j++){
			if(img[i][1].charAt(j)=="a"){
				anum++;
			}
			if(img[i][1].charAt(j)=="b"){
				bnum++;
			}
		}
		numimg.push([anum,bnum]);
		//bb+=img[i][0]*Math.pow(a,anum)*Math.pow(b,bnum);

	}
	//return bb;
}
function getReal(a,b){
	let aa=0;
	for(let i=0;i<real.length;i++){
		aa+=real[i][0]*Math.pow(a,numreal[i][0])*Math.pow(b,numreal[i][1]);
	}
	return aa;
}
function getImg(a,b){
	let bb=0;
	for(let i=0;i<img.length;i++){
		bb+=img[i][0]*Math.pow(a,numimg[i][0])*Math.pow(b,numimg[i][1]);
	}
	return bb;
}
*/
/*function draw(){

}*/

