
var gamestartWindow = Ti.UI.createWindow({backgroundColor:'black'});

var gamemusic = Ti.Media.createSound({url:"sounds/Ambler.mp3", looping:true, volume:0.7});

var image = Ti.UI.createImageView({
  image:'/images/start.png',
  zIndex:0
  
});

var image2 = Ti.UI.createImageView({
  image:'/images/start2.png',
  zIndex:0
  
});



var fmback = Ti.UI.createImageView({
  image:'/images/fmback.png',
  zIndex:1,
  bottom:43,
  left:10
});


var score = Ti.UI.createImageView({
  image:'/images/scores.png',
  zIndex:1,
  bottom:125,
  right:10
});


var play = Ti.UI.createImageView({
  image:'/images/play.png',
  zIndex:1,
  bottom:247,
  // bottom:310,
  right:10
});


var helpButton = Titanium.UI.createButton({
  	 	bottom:5,
  	 	right:5,
  	 	style:Ti.UI.iPhone.SystemButton.INFO_LIGHT
});

	 Ti.UI.iPhone.SystemButton.INFO_LIGHT;
	 
var startButton = Titanium.UI.createButton({
		borderRadius:10,
   		backgroundColor:'yellow',
   		width:100,
  	 	height:50,
  	 	bottom:200,
  	 	title: "Start"
});


var gameScore = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		width:250,
  	 	height:250,
  	 	top:50,
  	 	zIndex:4
});

var instructions = Ti.UI.createImageView({
		image : '/images/instructions.png',
		zIndex:5
	});


var closeHighcore = Ti.UI.createImageView({
		image : '/images/redx.png',
		top : 5,
		right : 10,
		width : 25,
		height : 25
	});


	var lblhighscore = Ti.UI.createLabel({
		color : 'red',
  		font: { fontSize:30, fontFamily: "Marker Felt" },
		//shadowColor: 'yellow',
		// shadowOffset: {x:5, y:5},
		text : 'High Scores',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : 250,
		zIndex : 2
	});

	var lblscore1player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		// text: Ti.App.Properties.getString('highscore1player') ,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 60,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore2player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		// text: Ti.App.Properties.getString('highscore2player') ,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 90,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore3player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		// text: Ti.App.Properties.getString('highscore3player') ,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 120,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore4player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		// text: Ti.App.Properties.getString('highscore4player') ,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 150,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore5player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		//  text: Ti.App.Properties.getString('highscore5player') ,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 180,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore1 = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		//  text: Ti.App.Properties.getString('highscore1'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 60,
		right : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore2 = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		// text:  Ti.App.Properties.getString('highscore2'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 90,
		right : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore3 = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		// text: Ti.App.Properties.getString('highscore3'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 120,
		right : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore4 = Ti.UI.createLabel({
		color : '#900',
  	font: { fontSize:24, fontFamily: "Marker Felt" },
		//text:  Ti.App.Properties.getString('highscore4'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 150,
		right : 10,
		width : 150,
		zIndex : 3
	});

	var lblscore5 = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Marker Felt" },
		// text:  Ti.App.Properties.getString('highscore5'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 180,
		right : 10,
		width : 150,
		zIndex : 3
	});


	gameScore.add(lblscore1player);
	gameScore.add(lblscore2player);
	gameScore.add(lblscore3player);
	gameScore.add(lblscore4player);
	gameScore.add(lblscore5player);
	gameScore.add(lblscore1);
	gameScore.add(lblscore2);
	gameScore.add(lblscore3);
	gameScore.add(lblscore4);
	gameScore.add(lblscore5);

	gameScore.add(lblhighscore);

	gameScore.add(closeHighcore);
	
	gamestartWindow.add(gameScore);
	gameScore.hide();
	



	
if (!Ti.App.Properties.hasProperty('playerscores')) {
	var playerscores = [];
	playerscores.push({ title: "Player 1", score:"50" });
	playerscores.push({ title: "Player 2", score:"40"});
	playerscores.push({ title: "Player 3", score:"30"});
	playerscores.push({ title: "Player 4", score:"20"});
	playerscores.push({ title: "Player 5", score: "10"});
	Ti.App.Properties.setList("playerscores",playerscores);
		 
	Ti.API.info("score array:" + JSON.stringify(playerscores));	
	
}


score.addEventListener('click',function(e)
{

	
	var scorearray = Ti.App.Properties.getList("playerscores");	

	Ti.API.info("score array:" + scorearray);



	lblscore1player.text = scorearray[0].title;
	lblscore2player.text = scorearray[1].title;
	lblscore3player.text = scorearray[2].title;
	lblscore4player.text = scorearray[3].title;
	lblscore5player.text = scorearray[4].title;

	lblscore1.text = scorearray[0].score;
	lblscore2.text = scorearray[1].score;
	lblscore3.text = scorearray[2].score;
	lblscore4.text = scorearray[3].score;
	lblscore5.text = scorearray[4].score;




	gameScore.show();


});

helpButton.addEventListener('click',function(e)
{
	gamestartWindow.add(instructions);

});



closeHighcore.addEventListener('click',function(e)
{
		gameScore.hide();
});


instructions.addEventListener('click',function(e)
{
		gamestartWindow.remove(instructions);
});


play.addEventListener('click',function(e)
{
gamemusic.stop();
var player = Ti.Media.createSound({url:"sounds/PickinTime2.wav"});
player.play();

   //Call a export function
   var win = require('game').applepickin;
 
   //Create new instance
   var newgame = new win();
 
   //Open the game in a window
   newgame.open();
});

/*
fmback.addEventListener('click',function(e)
{
	gamemusic.stop();
	//go back to previous screen
	var transitionType = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT;
	//$.gamestartWindow.fullscreen=false;
	//$.gamestartWindow.navBarHidden=false;
	$.gamestartWindow.close({ transition: transitionType });
});

*/
gamestartWindow.addEventListener('close', function() {
	gamemusic.setLooping(false);
	gamemusic.stop();
	//$.destroy();
});


gamestartWindow.addEventListener('open', function() {
		gamemusic.play();
});


/*
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;
Ti.App.SCREEN_WIDTH = (pWidth > pHeight) ? pHeight : pWidth;
Ti.App.SCREEN_HEIGHT = (pWidth > pHeight) ? pWidth : pHeight;
// Add your game view
Ti.API.info(Ti.App.SCREEN_WIDTH)

Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
if(Ti.Platform.osname === 'android'){
  Ti.API.info('Ti.Platform.displayCaps.xdpi: ' + Ti.Platform.displayCaps.xdpi);
  Ti.API.info('Ti.Platform.displayCaps.ydpi: ' + Ti.Platform.displayCaps.ydpi);
  Ti.API.info('Ti.Platform.displayCaps.logicalDensityFactor: ' + Ti.Platform.displayCaps.logicalDensityFactor);
}*/



if (Titanium.Platform.displayCaps.dpi == 160){
	gamestartWindow.add(image);
}else{
	gamestartWindow.add(image2);
}

//gamestartWindow.add(fmback);
gamestartWindow.add(score);
gamestartWindow.add(helpButton);
gamestartWindow.add(play);
gamestartWindow.open({fullscreen:true, navBarHidden:true});
//startwindow.open({fullscreen:true, navBarHidden:true});