// Variables
var fretsNumber;
var fretboardWidth;
var stringsMargin;

// Arrays
var inlayPoints;
var stringY;
var fretX;
var tunning = new Array('e','B','G','D','A','E');
var scale = new Array(1, 2, 2, 1, 2, 2, 2, 1);
// Constants
var offsetFretboard = 30;
var offsetFretboardY = 30;
var stringsNumber = 6;
var fretboardHeight = 200;
var fretAux = new Array(0, 0, 0, 0, 0, 0);

$(document).ready(function (){
	send();
});

function send() {
	var scaleType = document.getElementById('scaleType').value;
	switch (scaleType) {
		case "ionian" :
			fretAux = new Array(0, -7, -3, -10, -5, 0); // Ionian
			break;
		case "dorian" :
			fretAux = new Array(-3, -10, -6, -1, -8, -3); // Dorian
			break;
		case "lydian" :
			fretAux = new Array(-6, -1, -9, -4, -11, -6); // Lydian
			break;
		case "mixolydian" :
			fretAux = new Array(-8, -3, -11, -6, -1, -8); // Mixolydian
			break;
		case "ionan2" :
			fretAux = new Array(-10, -5, -1, -8, -3, -10); // Mixolydian
			break;
		default : break;
	}
	//fretAux = new Array(0, -7, -3, -10, -5, 0); // Mixolydian
	inlayPoints = new Array();
	stringY = new Array();
	fretX = new Array();
	
	fretsNumber = document.getElementById('fretsNumber').value;
		
	var canvas = document.getElementById('myCanvas');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	
	fretboardWidth = canvas.width - offsetFretboard * 2;
	stringsMargin = fretboardHeight/stringsNumber;
	
	var fretboard = new paper.Path.Rectangle(offsetFretboard + 20, canvas.height - offsetFretboardY - fretboardHeight, fretboardWidth - 20, fretboardHeight);
	var fretboardBridge = new paper.Path.Rectangle(offsetFretboard + 20, canvas.height - offsetFretboardY - fretboardHeight, 10, fretboardHeight);
	// Width of each fret
	var fretWidth = (fretboardWidth - offsetFretboard)/fretsNumber;
	
	fretboard.fillColor = '#0F0801';
	fretboard.strokeColor = '#000';
	fretboardBridge.strokeColor = '#000';
	fretboardBridge.fillColor = '#FFF';
	
	// Create frets and inlaysPosition
	for (i=1; i<=fretsNumber; i++) {
		var myPath = new paper.Path();
		var posX = (offsetFretboard * 2);
		myPath.add(new paper.Point(posX + (fretWidth * i), canvas.height - offsetFretboardY - fretboardHeight));
		myPath.add(new paper.Point(posX + (fretWidth * i), canvas.height - offsetFretboardY));
		myPath.strokeColor = '#FAFAFA';
		
		inlayPoints[i-1] = new paper.Point((posX + (fretWidth * i)) - (fretWidth/2), canvas.height - offsetFretboardY - fretboardHeight/2);
		fretX[i-1] = (posX + (fretWidth * i)) - (fretWidth/2);
	}
	
	// Create strings
	for (i=0; i<stringsNumber; i++) {
		var myPath = new paper.Path();
		var posX = (offsetFretboard * 2);
		var posY = canvas.height - fretboardHeight - offsetFretboardY + 18;
		
		myPath.add(new paper.Point(posX, posY + (stringsMargin * i)));
		myPath.add(new paper.Point(fretboardWidth + offsetFretboard, posY + (stringsMargin * i)));
	
		stringY[i] = posY + (stringsMargin * i);
		myPath.strokeColor = '#363636';
	}
	// Create tunning
	createTunning();
	// Create inlays
	createInlays();
	// Create scale
	createScale();
	paper.view.draw();
	//TweenLite.to(canvas.circle, 1, {css:{scaleX:"-=0.5", scaleY:"-=0.5"}, ease:Power3.easeOut});
	//alert(fretWidth);
}

function createTunning() {
	for (i=0; i<stringY.length; i++) {
	var fontSize = 12;
	var text = new paper.PointText(new paper.Point(offsetFretboard, stringY[i] + fontSize/2));
		text.content = tunning[i];
		text.characterStyle = {
			fontSize: fontSize,
			fillColor: 'black',
		};
	}
}

function createInlays() {
	var doubleInlays = 0;
	// Create inlays
	for (i=1; i<inlayPoints.length; i++) {
		// Inlays 2
		if (!(i%(11 + doubleInlays))) {
			doubleInlays += 12;
			var positions = new paper.Path.Circle(new paper.Point(inlayPoints[i].x, inlayPoints[i].y - 32), 7);
			var positions2 = new paper.Path.Circle(new paper.Point(inlayPoints[i].x, inlayPoints[i].y + 32), 7);
			positions.fillColor = '#696969';
			positions2.fillColor = '#696969';
			//positions.opacity = 0.5;
			//positions2.opacity = 0.5;
		} else 
		// Inlays positions
		if (!(i%2) && (i%11) && (i%10) && (i%12) || !(i%20)) {
			var positions = new paper.Path.Circle(inlayPoints[i], 7);
			positions.fillColor = '#696969';
			//positions.opacity = 0.5;
		}
	}
}

function createScale() {	
	// Create scale
	for (var i=0; i<stringY.length; i++) {
		var indexAux = 0;
		var indexFret = 0;
		for (var j=0; j<fretX.length; j++) {
			switch (tunning[i]) {
			case 'e':
				indexFret = 0;
				break;
			case 'B':
				indexFret = 1;
				break;
			case 'G':
				indexFret = 2;
				break;
			case 'D':
				indexFret = 3;
				break;
			case 'A':
				indexFret = 4;
				break;
			case 'E':
				indexFret = 5;
				break;
			default: 
				result = false;
				break;
			}
			var index = indexAux + scale.length - 1;
			fretAux[indexFret] += (scale[index%scale.length]);
			var positions = new paper.Path.Circle(new paper.Point(fretX[fretAux[indexFret]], stringY[i]), 10);
			positions.fillColor = '#DFE0F5';
			if (indexAux < (scale.length)) {
				indexAux++;
			} else {
				indexAux = 2;
			}
		}
	}
}

function dumpProps(obj, parent) {
   for (var i in obj) {
      if (parent) { var msg = parent + "." + i + "\n" + obj[i]; } else { var msg = i + "\n" + obj[i]; }
      if (!confirm(msg)) { return; }
      if (typeof obj[i] == "object") { 
         if (parent) { dumpProps(obj[i], parent + "." + i); } else { dumpProps(obj[i], i); }
      }
   }
}