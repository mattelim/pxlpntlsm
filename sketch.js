let capture;
let pbutton;
let cbutton;
let obutton;
let rbutton;
let gbutton;
let photo;
let pixelImg;
let isPhoto;
let isOK;

let tintVal;
let tintSlider;

// let rtintVal;
// let rtintSlider;
// let gtintVal;
// let gtintSlider;
// let btintVal;
// let btintSlider;

let zoomVal;
let zoomSlider;

let porSize;
let porSlider;

let collet2DArr;

function setup() {
	pixelDensity(1);
	createCanvas(250,250);
	capture = createCapture(VIDEO);
  
	//capture.size(333,250);
	capture.hide();
	
	isPhoto = false;
	isOK = false;
	
	makePButton();
	makeCButton();
	makeOButton();
	makeRButton();
	makeGButton();

	tintVal = 0;
	// rtintVal = 255;
	// gtintVal = 255;
	// btintVal = 255;

	tintSlider = createSlider(-255, 255, tintVal);
	// tintSlider.style('display', 'block');
  tintSlider.parent("briSlider");
  //tintSlider.position(windowWidth/2-tintSlider.width/2, 330);
  // rtintSlider = createSlider(0, 255, rtintVal);
  // rtintSlider.position(50, 330);
  // gtintSlider = createSlider(0, 255, gtintVal);
  // gtintSlider.position(50, 360);
  // btintSlider = createSlider(0, 255, btintVal);
  // btintSlider.position(50, 390);

  zoomVal = 2;
  zoomSlider = createSlider(1.25, 6, zoomVal, 0.25);
  zoomSlider.parent("zomSlider");
  // zoomSlider.style('display', 'block');
  //zoomSlider.position(windowWidth/2-zoomSlider.width/2, 360);
  // slider.style('width', '80px');

  porSize = 50;
  porSlider = createSlider(10,100, porSize,5);
  //porSlider.style('display', 'block');
  porSlider.parent("denSlider");
  //porSlider.position(windowWidth/2-porSlider.width/2, 390);

  collet2DArr = [];
}

function draw() {
	tintVal = tintSlider.value();
  mTintVal = round(map(tintVal,-255,255,-100,100));
  document.getElementById("briVal").textContent=mTintVal;
  //text1.parent("briVal");
	
  // rtintVal = rtintSlider.value();
	// gtintVal = gtintSlider.value();
	// btintVal = btintSlider.value();

	zoomVal = zoomSlider.value()/2;
  mZoomVal = map(zoomVal,0.625,3,1,20);
  document.getElementById("zomVal").textContent=mZoomVal;

	porSize = porSlider.value();
  document.getElementById("denVal").textContent=porSize;

	/*
	if(!isOK) {
		// default landing page
		translate(width + ((capture.width - width)/2), 0);
		scale(-1, 1);
		image(capture, 0, 0, capture.width, capture.height);
		resetMatrix();
	} else {
		// after photo taken and accepted
		//image(photo, 250, 0, 50, 50);
		ditherImage();
	}
	*/

	if (isPhoto) {
		// after photo taken
		if(isOK) {
			// after photo accepted
			//ditherImage();
		}
	} else {
		// default landing page

		//background(0);

		//scale(zoomVal);
		translate(width + ((zoomVal* capture.width - width)/2), -((zoomVal * capture.height - height)/2));
    scale(-zoomVal,zoomVal);

		image(capture, 0, 0, capture.width, capture.height);

		if (tintVal < 0) {
			blendMode(MULTIPLY);
		} else {
			blendMode(ADD);
		}

		tint(255,abs(tintVal));
		image(capture, 0, 0, capture.width, capture.height);
		noTint();

		blendMode(BLEND);
		resetMatrix();

		photo = get(0, 0, width, height);

		resizeCanvas(porSize, porSize);
		image(photo, 0, 0, porSize, porSize);
		ditherImage();
		pixelImg = get(0, 0, porSize, porSize);
		//save();
		resizeCanvas(250, 250);
		//image(photo, 0, 0, 250, 250);
	  image(pixelImg, 0, 0, 250, 250);
		
	}

}

function saveGrid() {
	// save pic first
	//save();

	// convert table of numbers into colours
	convNumLet();
	console.table(collet2DArr);
	// draw colour letters onto grid, grid should be dots
	textSize(20);
	strokeWeight(2);
	let newSize = 2000;
	resizeCanvas(newSize, newSize);
	let unitSize = newSize/porSize;
	for (let y = 0; y < porSize; y++) {
		for (let x = 0; x < porSize; x++) {
			text(collet2DArr[y][x],x*unitSize + 15, y*unitSize + 30);
			point(x*unitSize, y*unitSize);
		}
		point(porSize*unitSize, y*unitSize);
	}
	for (let x = 0; x < porSize; x++) {
		point(x*unitSize, porSize*unitSize);
	}
	// export into an image
	save();

	resizeCanvas(250, 250);
	image(photo, 0, 0, photo.width, photo.height);
	//reinit();
}

function takePhoto() {
	photo = get(0, 0, width, height);
	isPhoto = true;

	pbutton.hide();
	cbutton.show();
	obutton.show();
	gbutton.show();
	image(photo, 0, 0, photo.width, photo.height);

	//console.table(collet2DArr);
}

function cancelPhoto() {
	isPhoto = false;

	cbutton.hide();
	obutton.hide();
	gbutton.hide();
	pbutton.show();
}

function okPhoto() {
	//isPhoto = false;
	save();

	// cbutton.hide();
	// obutton.hide();
	// gbutton.hide();
	// pbutton.show();
	//pbutton.show();

	/*
	resizeCanvas(porSize, porSize);
	image(photo, 0, 0, porSize, porSize);
	ditherImage();
	pixelImg = get(0, 0, porSize, porSize);
	//save();
	resizeCanvas(500, 250);
	image(photo, 0, 0, 250, 250);
	image(pixelImg, 250, 0, 250, 250);
	*/
}

/*
function showImg() {
	pixelImg = get(0, 0, 50, 50);
	image(pixelImg, 250, 0, 250, 250);
}
*/

function reinit() {
	rbutton.hide();
	cbutton.hide();
	obutton.hide();
	gbutton.hide();

	isPhoto = false;
	isOK = false;

	resizeCanvas(250, 250);
	pbutton.show();
}


function makePButton() {
	pbutton = createButton('Take Photo');
  pbutton.parent("Buttons");
  //pbutton.style('display','inline');
	//pbutton.position(windowWidth/2 - pbutton.width/2,height + 40);
	pbutton.mouseClicked(takePhoto);
}

function makeCButton() {
	cbutton = createButton('Back');
	cbutton.parent("Buttons");
  //cbutton.style('display','inline');
  //cbutton.position(windowWidth/2 - cbutton.width*1.5,height + 40);
	cbutton.mouseClicked(cancelPhoto);
	cbutton.hide();
}

function makeOButton() {
	obutton = createButton('Save');
	obutton.parent("Buttons");
  //obutton.style('display','inline');
  //obutton.position(windowWidth/2 - obutton.width/2,height + 40);
	obutton.mouseClicked(okPhoto);
	obutton.hide();
}

function makeRButton() {
	rbutton = createButton('Reset');
	rbutton.parent("Buttons");
  //rbutton.style('display','inline');
  //rbutton.position(windowWidth - rbutton.width/2,height + 40);
	rbutton.mouseClicked(reinit);
	rbutton.hide();
}

function makeGButton() {
	gbutton = createButton('Save Grid');
	gbutton.parent("Buttons");
  //gbutton.style('display','inline');
  //gbutton.position(windowWidth/2 + obutton.width/2,height + 40);
	gbutton.mouseClicked(saveGrid);
	gbutton.hide();
}

function convNumLet() {
	for (const subArr of collet2DArr) {
		for (let i = 0; i < porSize; i++) {
			switch (subArr[i]) {
				case 0:
					subArr[i] = 'K';
					break;
				case 1:
					subArr[i] = 'R';
					break;
				case 2:
					subArr[i] = 'G';
					break;
				case 3:
					subArr[i] = 'B';
					break;
				case 4:
					subArr[i] = 'Y';
					break;
				case 5:
					subArr[i] = 'C';
					break;
				case 6:
					subArr[i] = 'M';
					break;
				case 7:
					subArr[i] = ' ';
					break;
			}
		}
	}
}


function ditherImage() {
	let pwidth = porSize;
	let pheight = porSize;

	let colors = [];

	colors[0] = color(0,0,0); // black 'K'
	colors[1] = color(255,0,0); // red 'R'
	colors[2] = color(0,255,0); // green 'G'
	colors[3] = color(0,0,255); // blue 'B'
	colors[4] = color(255,255,0); // yellow 'Y'
	colors[5] = color(0,255,255); // cyan 'C'
	colors[6] = color(255,0,255); // magenta 'M'
	colors[7] = color(255,255,255); // white ' '

	/*
	//original 8
	colors[0] = color(0,0,0); // black
	colors[1] = color(255,255,255); // white
	colors[2] = color(215,43,32); // red
	colors[3] = color(43,132,74); // green
	colors[4] = color(241,112,213); // pink
	colors[5] = color(255,235,114); // yellow
	colors[6] = color(229,98,58); // orange
	colors[7] = color(98,53,129); // purple
	// colors[8] = color(205,163,9); // +yellow ochre
	// colors[9] = color(160,29,88); // +alizarin crimson 
	
	//pure
	colors[0] = color(0,0,0); // black
	colors[1] = color(255,0,0); // red
	colors[2] = color(0,255,0); // green
	colors[3] = color(0,0,255); // blue
	colors[4] = color(255,255,0); // yellow
	colors[5] = color(0,255,255); // cyan
	colors[6] = color(255,0,255); // magenta
	colors[7] = color(255,255,255); // white

	//virtual academy
	colors[0] = color(0,0,0); // black
	colors[1] = color(255,255,255); // white
	colors[2] = color(255,255,5); // cadmium yellow
	colors[3] = color(205,163,9); // yellow ochre
	colors[4] = color(255,126,14); // cadmium orange
	colors[5] = color(192,69,14); // burnt sienna
	colors[6] = color(248,23,45); // cadmium red
	colors[7] = color(160,29,88); // alizarin crimson 
	colors[8] = color(91,1,113); // dioxazine purple 
	colors[9] = color(18,1,118); // ultramarine blue 
	colors[10] = color(14,48,144); // cobalt blue 
	colors[11] = color(0,80,69); // viridian 

	//blick portrait
	colors[0] = color(252,178,181); // light pink
	colors[1] = color(237,63,0); // cadmum red light hue
	colors[2] = color(145,61,0); // burnt sienna
	colors[3] = color(53,33,42); // burnt umber
	colors[4] = color(70,59,42); // raw umber
	colors[5] = color(198,167,0); // yellow oxide
	
	//photoshop CMYK
	colors[0] = color(32,32,32); // black
	colors[1] = color(237,28,36); // red
	colors[2] = color(0,166,81); // green
	colors[3] = color(46,49,146); // blue
	colors[4] = color(255,242,0); // yellow
	colors[5] = color(0,174,239); // cyan
	colors[6] = color(236,0,140); // magenta
	colors[7] = color(242,242,242); // white

	*/

	loadPixels();

	/* color picker based on average color
	let avgR = 0, avgG = 0, avgB = 0;

	//average color
	for (let y = 0; y < pheight; y++) {
		for (let x = 0; x < pwidth; x++) {
			let index = x + (y * pwidth);
			let mindex = 4 * index;

			avgR += pixels[mindex];
			avgG += pixels[mindex + 1];
			avgB += pixels[mindex + 2];
		}
	}

	let parea = pwidth * pheight;

	let avgCol = color(avgR/parea, avgG/parea, avgB/parea)
	console.log(avgCol);

	// colors[2] = color(red(avgCol),0,0);
	// colors[3] = color(0,green(avgCol),0);
	// colors[4] = color(0,0,blue(avgCol));
	// colors[5] = color(red(avgCol),green(avgCol),0);
	// colors[6] = color(0,green(avgCol),blue(avgCol));
	// colors[7] = color(red(avgCol),0,blue(avgCol));
	*/

	collet2DArr = [];

	for (let y = 0; y < pheight; y++) {
		let collet1DArr = [];

		for (let x = 0; x < pwidth; x++) {
			//console.log(x, y);
			let index = x + (y * pwidth);
			let mindex = 4 * index;
			//color pix = pic0.pixels[index];

			let r = pixels[mindex];
			let g = pixels[mindex + 1];
			let b = pixels[mindex + 2];

			let closest = 0;
			let closeDif = 10000;
			for (let i = 0; i < colors.length; i++) {
				//let difTot, difR, difG, difB;
				let difR = r - red(colors[i]);
				let difG = g - green(colors[i]);
				let difB = b - blue(colors[i]);
				let difTot = abs(difR) + abs(difG) + abs(difB);
				if (difTot < closeDif) {
					closest = i;
					closeDif = difTot;
				}
			}

			collet1DArr.push(closest);

			pixels[mindex] = red(colors[closest]);
			pixels[mindex + 1] = green(colors[closest]);
			pixels[mindex + 2] = blue(colors[closest]);

			let errR = r - red(colors[closest]);
			let errG = g - green(colors[closest]);
			let errB = b - blue(colors[closest]);

			//Dithering happens here
			if ((index+1) % pwidth != 0) {
				pixels[mindex + 4] += (7/16.0 * errR);
				pixels[mindex + 5] += (7/16.0 * errG);
				pixels[mindex + 6] += (7/16.0 * errB);
			}
			if (index < pwidth * (pheight-1)) {
				if (index % pwidth != 0) {
					pixels[mindex + (pwidth * 4) - 4] += (3/16.0 * errR);
					pixels[mindex + (pwidth * 4) - 3] += (3/16.0 * errG);
					pixels[mindex + (pwidth * 4) - 2] += (3/16.0 * errB);
					//pic0.pixels[index + pwidth - 1] = addError(pic0.pixels[index + pwidth - 1], errR, errG, errB, 3/16.0);
				}
				pixels[mindex + (pwidth * 4)] += (5/16.0 * errR);
				pixels[mindex + (pwidth * 4) + 1] += (5/16.0 * errG);
				pixels[mindex + (pwidth * 4) + 2] += (5/16.0 * errB);
				//pic0.pixels[index + pwidth] = addError(pic0.pixels[index + pwidth], errR, errG, errB, 5/16.0);
				if ((index+1) % pwidth != 0) {
					pixels[mindex + (pwidth * 4) + 4] += (1/16.0 * errR);
					pixels[mindex + (pwidth * 4) + 5] += (1/16.0 * errG);
					pixels[mindex + (pwidth * 4) + 6] += (1/16.0 * errB);
					//pic0.pixels[index + pwidth + 1] = addError(pic0.pixels[index + pwidth + 1], errR, errG, errB, 1/16.0);
				}
			}
		}

		collet2DArr.push(collet1DArr);
	}
	updatePixels();
}

