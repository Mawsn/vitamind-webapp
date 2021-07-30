let $input, $img, imageCapture;
class Colour{
	constructor(red,green,blue){
		this.red = red;
		this.green = green;
		this.blue = blue;
	}
}
let tone1 = new Colour(255,219,172);
let tone2 = new Colour(241,194,125);
let tone3 = new Colour(224,172,105);
let tone4 = new Colour(198,134,66);
let tone5 = new Colour(141,85,36);
let tone6 = new Colour(81,50,21);

let skin_tones = [tone1,tone2,tone3,tone4,tone5,tone6];


//Wait until HTML is fully loaded
document.addEventListener('DOMContentLoaded', init, false);
//The init function firstly gets a reference to the takePictureButton and testImage. It then checks whether the user has accepted or denied camera access 
function init() {
	//alert("Page Loaded");
	$input = document.querySelector('#file');
	$img = document.querySelector('#output');

	//navigator.mediaDevices.getUserMedia({video: true})
	//.catch(error => console.error('getUserMedia() error:', error));
}


function setPic(){
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
	$img.addEventListener('load', getSwatches);
}


function getSwatches() {
	//A new ColorTheif object is created
	let colorThief = new ColorThief();
	//Based on the image taken, the colorTheif object extracts the 5 most prominent colours, these are then displayed in the console as an interactive list
	var colorArr = colorThief.getPalette($img, 5);
	/*
	console.dir(colorArr);
	console.log(colorArr.length);
	console.dir(colorArr)
    
    //document.getElementById("skin-tone-sample").style.backgroundColor = "rgb("+colorArr[0][0]+","+colorArr[0][1]+","+colorArr[0][2]+")";

    
	alert("Skin Tone Code = " + "rgb("+colorArr[0][0]+","+colorArr[0][1]+","+colorArr[0][2]+")");
	//For each of the 5 colours, set each of the swatches to the corresponding colour 
	for(var i = 0; i < colorArr.length; i++) {
		console.log("rgb("+colorArr[i][0]+","+colorArr[i][1]+","+colorArr[i][2]+")");

	}*/
	associateUserTone(colorArr[0][0],colorArr[0][1],colorArr[0][2]);
}

function associateUserTone(red,green,blue){
	var distance = 256;
	var tone = -1;
	skin_tones.forEach(function(item, index) {
  		if(Math.sqrt(Math.pow((red - item.red),2) + Math.pow((green - item.green),2) + Math.pow((blue - item.blue),2)) < distance){
  			distance = Math.sqrt(Math.pow((red - item.red),2) + Math.pow((green - item.green),2) + Math.pow((blue - item.blue),2));
  			tone = index + 1;
  		}
	});
	//Alert is used for debugging 
	alert("Distance of: " + distance + ", skin matches closest with Tone " + tone);
	sessionStorage.setItem("skin-tone-value","Type_" + tone);
	document.getElementById('file').value= null;
	location.href='tool-sun-exposure.html';

}