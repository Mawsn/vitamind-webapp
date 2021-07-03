let $input, $img, imageCapture;
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
	console.log('setPic() called');
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
	$img.addEventListener('load', getSwatches);
}


function getSwatches() {
	console.log('getSwatches() called');
	//A new ColorTheif object is created
	let colorThief = new ColorThief();
	//Based on the image taken, the colorTheif object extracts the 5 most prominent colours, these are then displayed in the console as an interactive list
	var colorArr = colorThief.getPalette($img, 5);
	//console.dir(colorArr);
	console.log(colorArr.length);
	console.dir(colorArr)
	alert("Skin Tone Code = " + "rgb("+colorArr[0][0]+","+colorArr[0][1]+","+colorArr[0][2]+")");
	//For each of the 5 colours, set each of the swatches to the corresponding colour 
	for(var i = 0; i < colorArr.length; i++) {
		console.log("rgb("+colorArr[i][0]+","+colorArr[i][1]+","+colorArr[i][2]+")");

	}
}