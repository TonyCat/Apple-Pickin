

exports.applepickin = function(){
var window = Ti.UI.createWindow({backgroundColor:'black'});

// Obtain game module
var quicktigame2d = require('com.googlecode.quicktigame2d');

// Create view for your game.
// Note that game.screen.width and height are not yet set until the game is loaded
var game = quicktigame2d.createGameView();

// Frame rate can be changed (fps can not be changed after the game is loaded)
game.fps = 30;

// set initial background color to black
game.color(0, 0, 0);

game.debug = false;

var shapes = new Array();

var newapples = new Array();

// Create game scene
var scene = quicktigame2d.createScene();




// add the scene to game view
game.pushScene(scene);

var TOUCH_SCALE = 1;



///////////////////////////////////////////////////BUILD THE SCENES


// Create sprites and add them to the scene
var background = quicktigame2d.createSprite(
  {image:'images/gamebg.png', x:0, y:0}
);

var character = quicktigame2d.createSprite({image:'images/girl.png', x:215, y:372});

//var  playersBasket = quicktigame2d.createSpriteSheet({image:'images/basket.png', x:215, y:372});
var  playersBasket = quicktigame2d.createSpriteSheet({image:'graphics/baskets.xml', x:215, y:372});
playersBasket.selectFrame("basket");



var catchYzone = 400;
var girlsY = 372;
var basketsY = 415;
var scaleYdifferance = 0;
var basketXleft = 215;
var basketXright = 268;

//girl original is 
//differance in default basket width is 53
//default basket starts at 215 and 268
//superbasket starts at 180 and 260
//differance in superbasket width is 80


var PlayerScore = 0 ;
var applesOnLevel = 20;
var currentAppleCount = 0;
var randomx = 10;
var lowestAppleOnScreen = 1;
var numberOfApplesDropped = 0;
var Level = 1;
var superBasket = false;
var gamemusic = Ti.Media.createSound({url:"sounds/Ambler.mp3", looping:true, volume:0.7});

//////////////////////////////////////////// TOP SECTION

var lblscoretext = Ti.UI.createLabel({
  color: 'black',
  font: { fontSize:24, fontFamily: "Marker Felt" },
 // shadowColor: '#aaa',
 // shadowOffset: {x:5, y:5},
  text: 'SCORE',
  textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
  top: 5,
  right:5,
  width: 150,
  zIndex:7
});

var lblscore = Ti.UI.createLabel({
  color: '#900',
  font: { fontSize:24 },
 // shadowColor: '#aaa',
 // shadowOffset: {x:5, y:5},
  text: '0',
  textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
  top: 30,
  right:5,
  width: 150,
  zIndex:7
});

var lbllivestext = Ti.UI.createLabel({
  color: 'black',
  font: { fontSize:24, fontFamily: "Marker Felt" },
 // shadowColor: '#aaa',
 // shadowOffset: {x:5, y:5},
  text: 'LIVES',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  top: 5,
  left:5,
  width: 150,
  zIndex:7
});


var droppedApple1 = quicktigame2d.createSpriteSheet({image:'graphics/apples.xml', x:5, y:30});
droppedApple1.selectFrame("caught");
var droppedApple2 = quicktigame2d.createSpriteSheet({image:'graphics/apples.xml', x:25, y:30});
droppedApple2.selectFrame("caught");
var droppedApple3 = quicktigame2d.createSpriteSheet({image:'graphics/apples.xml', x:45, y:30});
droppedApple3.selectFrame("caught");


//////////END OF TOP SECTION


//////////////////////////////////////////////GAME OVER SECTION

var gameOverview = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		width:Ti.UI.SIZE,
  	 	height:Ti.UI.SIZE,
  	 	layout:"vertical",
  	 	top:50,
  	 	zIndex:9
});
var lblgameovermessage = Ti.UI.createLabel({
  	color: 'red',
  	font: { fontSize:30, fontFamily: "Marker Felt" },
  //shadowColor: 'yellow',
 // shadowOffset: {x:5, y:5},
  	text: 'Game Over',
  	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  	top: 5,
 	width: Ti.UI.SIZE,
  	zIndex:11
});

var restartButton = Titanium.UI.createButton({
		borderRadius:10,
  		font: { fontSize:24, fontFamily: "Marker Felt" },
   		width:150,
  	 	height:50,
  	 	bottom:5,
  	 	title: "Restart"
});



gameOverview.add(lblgameovermessage);

gameOverview.add(restartButton);


//if they beat a highscore allow them to add thier name in

var gameOverviewNewHighScore = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		layout:'vertical',
   		width:250,
  	 	height:Ti.UI.SIZE,
  	 	top:50,
  	 	zIndex:9
});

var lblgameovermessage = Ti.UI.createLabel({
  color: 'red',
  font: { fontSize:32, fontFamily: "Marker Felt" },
  //shadowColor: 'yellow',
 // shadowOffset: {x:5, y:5},
  text: 'New High Score!!!',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 5,
  width: 250,
  zIndex:11
});

var playersname = Ti.UI.createTextField({
  color: 'black',
  font: { fontSize:24, fontFamily: "Marker Felt" },
  //shadowColor: 'yellow',
 // shadowOffset: {x:5, y:5},
	hintText : 'Enter Your Name',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 5,
  width: 240,
  zIndex:11
});

var saveButton = Titanium.UI.createButton({
		borderRadius:10,
   		backgroundColor:'yellow',
   		font: { fontSize:24, fontFamily: "Marker Felt" },
   		width:150,
  	 	height:50,
  	 	top:5,
  	 	bottom:5,
  	 	title: "Save"
});



gameOverviewNewHighScore.add(lblgameovermessage);
gameOverviewNewHighScore.add(playersname);
gameOverviewNewHighScore.add(saveButton);



saveButton.addEventListener('click',function(e)
{

		///save the score in an array
		var scorearray = Ti.App.Properties.getList("playerscores");

		Ti.API.info(playersname.value);
		Ti.API.info(PlayerScore);

		Ti.API.info("score array:" + JSON.stringify(scorearray));

		scorearray.push({
			title : playersname.value,
			score : PlayerScore
		});

		//sort the array
		scorearray.sort(sortBy('score'));
		scorearray.reverse();
		//delete the last item in an array
		scorearray.splice(scorearray.length - 1, 1);

		Ti.App.Properties.setList('playerscores', scorearray);

		game.stop();
		window.close(); 

});

var sortBy = function (prop) {
    return function (a, b) {
        if( a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    };
};


//////////////END OF GAME OVER SECTION




/////////////////////////////////////GAME PAUSE START
var pause = Ti.UI.createImageView({
  image:'/images/pause.png',
  top:5,
  left:150,
  width:35,
  height:35,
  zIndex:16	  
});

var lblpaused = Ti.UI.createLabel({
  color: 'red',
  font: { fontSize:30, fontFamily: "Marker Felt" },
 // shadowColor: '#aaa',
 // shadowOffset: {x:5, y:5},
  text: 'PAUSED',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 5,
  width: 150
});


var gamepause = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		width:Ti.UI.SIZE,
  	 	height:Ti.UI.SIZE,
  	 	top:150,
  	 	zIndex:14,
  	 	layout: "vertical"
  	 	
});


var unpause = Titanium.UI.createButton({
		borderRadius:10,
   		Color:'black',
		font: { fontSize:24, fontFamily: "Marker Felt" },
   		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
   		width:150,
  	 	height:60,
  	 	bottom:5,
  	 	top:5,
  	 	right:5,
  	 	left:5,
  	 	title: "Keep Pickin'"
});

var btnquit = Titanium.UI.createButton({
		borderRadius:10,
   		Color:'black',
		font: { fontSize:24, fontFamily: "Marker Felt" },
   		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
   		width:150,
  	 	height:60,
  	 	bottom:5,
  	 	top:5,
  	 	right:5,
  	 	left:5,
  	 	title: "Quit"
});

gamepause.add(lblpaused);
gamepause.add(unpause);
gamepause.add(btnquit);
window.add(pause);


pause.addEventListener('click',function(e)
{
	window.add(gamepause);
	clearInterval(dropApples);
	clearInterval(animateApples);
});


btnquit.addEventListener('click',function(e)
{
	//gamemusic.stop();
	clearInterval(dropApples);
	clearInterval(animateApples);
	game.stop();
	window.close();
});

unpause.addEventListener('click',function(e)
{
	var pickin = Ti.Media.createSound({url:"sounds/PickTime4.wav"});
	pickin.play();
	//remove the view
   window.remove(gamepause);
   
   //start up the apples
 	animateApples = setInterval(moveapples,currentDropSpeed);
	dropApples = setInterval(dropNewapples,currentAppleDropSpeed);
});



/////////////////////////////////////GAME PAUSE END


/////////////////////////////////////CREATE FACTS PAGE


var facts = ["25 percent of an apple\'s volume is air, that\'s why they float. ",
"2500 varieties of apples are grown in the United States. ",
"7500 varieties of apples are grown around the world. ",
"A bushel of apples weight is 42 pounds and will yield 20-24 quarts of applesauce.",
"A medium apple has about 80 calories. ",
"A peck of apples weight is 10.5 pounds.",
"Americans eat 19.6 pounds of apples every year.",
"An apple tree will start bearing fruit 8-10 years after it is planted.",
"A dwarf apple tree starts bearing apples in 3-6 years.",
"Apples are a great source of pectin, a soluble fiber. One apple has 5 grams of fiber.",
"Apples are a member of the rose family of plants along with pears, peaches, plums and cherries. ",
"Apples are fat, sodium and cholesterol free. And they taste great too! ",
"Apples are grown commercially in 36 states.",
"Apples are the second most valuable fruit in the United States. Oranges are first.",
"Apples come in all shades of reds, greens and yellows.",
"Apples ripen or soften ten times faster at room temperature than if they were refrigerated.",
"Archeologists have found evidence that humans have been enjoying apples since 6500 BC.",
"In 1730 the first apple nursery was opened in Flushing, New York.",
"It takes about 36 apples to create one gallon of apple cider.",
"It takes the energy from 50 leaves to produce one apple.",
"Most apple blossoms are pink when they open but gradually fade to white.",
"Most apple trees can be grown farther north than most other fruits because they blossom late in spring, minimizing frost damage.",
"Most apples are still picked by hand in the fall.",
"Newton Pippin apples were the first apples exported from America in 1768, some were sent to Benjamin Franklin in London.",
"One of George Washington\'s hobbies was pruning his apple trees.",
"The largest U.S. apple crop was 277.3 million bushels in 1998.",
"The pilgrims planted the first US apples trees in the Massachusetts Bay Colony.",
"The science of apple growing is called pomology.",
"The worlds largest apple peel was created by Kathy Wafler Madison on October 16, 1976, in Rochester, NY. It was 172 feet, 4 inches long.",
"Two pounds of apples make one 9-inch pie."];


var factview = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		width:250,
  	 	height:Ti.UI.SIZE,
  	 	layout:'vertical',
  	 	top:40,
  	 	zIndex:17
});

var okButton = Titanium.UI.createButton({
		borderRadius:10,
   		backgroundColor:'yellow',
   		font: { fontSize:24, fontFamily: "Marker Felt" },
   		width:100,
  	 	height:50,
  	 	top:5,
  	 	bottom:5,
  	 	title: "WOW"
});


var lblgoodjob = Ti.UI.createLabel({
  color: 'red',
		font: { fontSize:30, fontFamily: "Marker Felt" },
 // shadowColor: 'yellow',
 // shadowOffset: {x:5, y:5},
  text: 'Your Doing Great!',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 10,
  width: 250,
  zIndex:11
});

var lblfact = Ti.UI.createLabel({
  color: 'black',
	font: { fontSize:24, fontFamily: "Marker Felt" },
 // shadowColor: 'Yellow',
 // shadowOffset: {x:5, y:5},
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 5,
  width: 245,
  left:5,
  right:5,
  height:Ti.UI.SIZE,
  zIndex:12
});


factview.add(lblgoodjob);
factview.add(lblfact);
factview.add(okButton);

okButton.addEventListener('click',function(e)
{
	var pickin = Ti.Media.createSound({url:"sounds/PickTime4.wav"});
	pickin.play();
	//increase the drop speed
	if (currentDropSpeed != 5){
		currentDropSpeed = currentDropSpeed - 5;
	}
	
	
	//increase the amount of apples
	if (currentAppleDropSpeed != 500){
		currentAppleDropSpeed = currentAppleDropSpeed - 500;
	}
	
	//remove the view
   window.remove(factview);
   
   //start up the apples
 		animateApples = setInterval(moveapples,currentDropSpeed);
	    dropApples = setInterval(dropNewapples,currentAppleDropSpeed);
});


restartButton.addEventListener('click',function(e)
{
	//gamemusic.stop()
	game.stop();
	window.close();
});
//create a variable to break the timer and show a fact
var breakTimers = false;

var currentDropSpeed = 50;
var currentAppleDropSpeed = 4000;
var animateApples;
var dropApples;

///create the scene
window.add(lblscore);
window.add(lblscoretext);
window.add(lbllivestext);
scene.add(background);
scene.add(character);
scene.add( playersBasket);
scene.add(droppedApple1);
scene.add(droppedApple2);
scene.add(droppedApple3);


//scene.add(sheet);
//scene.add(apple);

character.center = {x:196 * TOUCH_SCALE, y:girlsY};
 playersBasket.center = {x:219 * TOUCH_SCALE, y:basketsY};

//apple.center = {x:215 * TOUCH_SCALE, y:15};
//differance in defaultbasket and character is 23x and 43y



// Z-order 
background.z = 0;
character.z = 1;
 playersBasket.z = 2;

var WINDOW_SCALE_FACTOR_X = 1;
var WINDOW_SCALE_FACTOR_Y = 1;
// Onload event is called when the game is loaded.
game.addEventListener('onload', function(e) {
	/*var screenScale = game.size.height / 640;
  
  	
  
    game.screen = {
        width : game.size.width / screenScale,
        height : game.size.height / screenScale
    };
    WINDOW_SCALE_FACTOR_X = game.screen.width / game.size.width;
    WINDOW_SCALE_FACTOR_Y = game.screen.height / game.size.height;
	 
	 
	 background.x = (game.screen.width * 0.5) - (background.width * 0.5);
     background.y = (game.screen.height * 0.5) - (background.height * 0.5);
    
    Ti.API.info("x:"+ WINDOW_SCALE_FACTOR_X + "y:" + WINDOW_SCALE_FACTOR_Y); // prints 'true'
    */
   
   
							//	gamemusic.play();
   
   
   
   Ti.API.info(game.size.width); // prints 'true'
     if (game.screen.width != 320){
    	Ti.API.info("we are in retina change the coordinates of all the stuff"); // prints 'true'
    	scene.remove(background);
    	var bg2 = quicktigame2d.createSprite(
  			{image:'images/gamebg2x.png', x:0, y:0,z:0}
			);
    	scene.add(bg2);
    scaleYdifferance = 400;
    	character.y = character.y + scaleYdifferance;
    	playersBasket.y = playersBasket.y + scaleYdifferance;
    	catchYzone = catchYzone + scaleYdifferance;
     	droppedApple1.y = 60;
     	droppedApple2.y = 60;
     	droppedApple3.y = 60;
     	droppedApple1.z = 1;
     	droppedApple2.z = 1;
     	droppedApple3.z = 1;
     }
	
	//Ti.API.info((game.screen.width  == 0)); // prints 'true'
	//Ti.API.info((game.screen.height == 0)); // prints 'true'
	// Your game screen size is set here if you did not specifiy game width and height using screen property.
    // Note: game.size.width and height may be changed due to the parent layout so check them here.
    //alert("view size: " + game.size.width + "x" + game.size.height);
    //alert("game screen size: " + game.screen.width + "x" + game.screen.height);
       
//game.size.width = game.screen.width
//game.size.height = game.screen.height

     // We should calculate the view scale because game.size.width and height may be changed due to the parent layout.
    TOUCH_SCALE = game.screen.width  / game.size.width;
    
  //  alert("game size equals " + game.screen.width + "x" + game.screen.height);
    // Enable MultiTouch support
    game.registerForMultiTouch();
    
    // Start the game
    game.start();
    
    //loop the apples
  //  startGameLoop()
});

/*
function playSound(url){
 var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,url);
 var sound = Titanium.Media.createSound({
        sound:file,
        volume:4.0,
        preload:true
    });
  sound.addEventListener('complete',function(e){
        Ti.API.info('sound played');
    });
    sound.play();
}*/





/* 
 * Listener function for 'touchstart' and 'touchstart_pointer' events.
 * Before using touch event, call registerForMultiTouch() to enable multi touch support.
 *
 * Note that ALL gesture events including 'click' and 'dblclick' are disabled on Android
 * when multi touch support is enabled
 * 
 * Use e.points to handle multiple pointers. 
 *
 * 'touchstart_pointer' is called when a non-primary pointer has gone down on Android.
 * 'touchstart_pointer' event is never used on iOS.
 * 
 * See http://developer.android.com/reference/android/view/MotionEvent.html for details about motion events on Android.
 */



window.addEventListener('close', function() {
	gamemusic.setLooping(false);
	gamemusic.stop();
});


window.addEventListener('open', function() {
		gamemusic.play();
});


var onTouchStart = function(e) {
    
    // On Android, 'touchstart_pointer' event is called right after firing 'touchstart' event when multi touch is detected.
    
   // Ti.API.info(e.type + ": " + JSON.stringify(e.points));
    
    for (var pointName in e.points) {
      
       
        if (typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
            shapes[pointName] = quicktigame2d.createSprite({width:64, height:64});
            
            if (e.type == 'touchstart') {
            //    shapes[pointName].color(1, 0, 0);  // draw red point when shape is created at touchstart
            } else if (e.type == 'touchmove') {
           //     shapes[pointName].color(0, 1, 0);  // draw green point when shape is created at touchmove
            } else {
            //    shapes[pointName].color(0, 0, 1);  // draw blue point when shape is created at touchstart__pointer
            }
            
            //scene.add(shapes[pointName]);
        }
        
      
     //  character.center = {x: e.points[pointName].x * TOUCH_SCALE, y:372 };
     	character.center = {x: e.points[pointName].x * TOUCH_SCALE, y:girlsY  +scaleYdifferance };
      // Ti.API.info("her x" + e.points[pointName].x );
       
        playersBasket.center = {x: (e.points[pointName].x * TOUCH_SCALE) + 23, y:basketsY + scaleYdifferance};
      // Ti.API.info("basket x" + e.points[pointName].x );
       
       
       //basketXleft = e.points[pointName].x * TOUCH_SCALE 
       
       if (superBasket == true){
       //	 Ti.API.info("we are using the superbasket" );
       	  basketXleft = ((e.points[pointName].x * TOUCH_SCALE) - 23 ) ;
       	 basketXright = basketXleft + 80;
       	 Ti.API.info("xleft:" + basketXleft + " xright:" + basketXright + "basket center is:" + playersBasket.center);
       	 
       }else{
       //		 Ti.API.info("we are using the regular basket" );
       		  basketXleft = e.points[pointName].x * TOUCH_SCALE ;
      		 basketXright = basketXleft + 53;
       }
      
       
       
       
       // shapes[pointName].center = {x: e.points[pointName].x * TOUCH_SCALE, y:e.points[pointName].y * TOUCH_SCALE};
    }
};

/* 
 * Listener function for 'touchend' and 'touchend_pointer' events.
 * Before using touch event, call registerForMultiTouch() to enable multi touch support.
 * Use e.points to handle multiple pointers
 *
 * Note that ALL gesture events including 'click' and 'dblclick' are disabled on Android
 * when multi touch support is enabled
 *
 * 'touchend_pointer' is called when a non-primary pointer has gone up on Android.
 * 'touchend_pointer' event is never used on iOS.
 * 
 * See http://developer.android.com/reference/android/view/MotionEvent.html for details about motion events on Android.
 */
var onTouchEnd = function(e) {
    
    // On Android, 'touchend_pointer' event is called before firing 'touchend' event when multi touch is detected.
    
   // Ti.API.info(e.type + ": " + JSON.stringify(e.points));
    
    for (var pointName in e.points) {
        
        if (typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
            Ti.API.info("Couldn't find touch: " + pointName);
            continue;
        }
        
        scene.remove(shapes[pointName]);
        
        shapes[pointName] = null;
        delete shapes[pointName];
    }
    
    // clear all rectangles because all poiinters are gone
    if (e.type == 'touchend') {
    	
    	//  sprite.x = e.x ;
  		//	sprite.y = e.y ;
  
  
        for (var pointName in shapes) {
            if (typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
                continue;
            }
            scene.remove(shapes[pointName]);
            shapes[pointName] = null;
        }
        shapes.length = 0;
    }
};




/* 
 * Listener function for 'touchmove' events.
 * Before using touch event, call registerForMultiTouch() to enable multi touch support.
 * Use e.points to handle multiple pointers
 *
 * Note that ALL gesture events including 'click' and 'dblclick' are disabled on Android
 * when multi touch support is enabled
 *
 */





function moveapples(){


		//move all of the apples
		for (var i = lowestAppleOnScreen; i <= currentAppleCount; i++) {
			var newx = newapples[i].x;
			var newy = newapples[i].y + 5;

			//Ti.API.info("sprite" + i + " x:" + newx + " y:" + newy);
			newapples[i].move(newx, newy);

			if (newapples[i].y >= catchYzone) {
				//	 Ti.API.info("applex:" + newapples[i].x + "basketleft" + basketXleft + " basketright" + basketXright );
				//if its in the baskets leftx and rightx then count as points and update score
					if (newapples[i].x >= basketXleft && newapples[i].x <= basketXright) {
						Ti.API.info("update score");
						//TO DO: need to do a check to make sure that if the user never moves that the applex has the touch calculated in
	
						//Ti.API.info("apple caught is :" + newapples[i].tag);
	
						lowestAppleOnScreen = lowestAppleOnScreen + 1;
	
	
						if (newapples[i].tag == 'apple') {
							PlayerScore = PlayerScore + 10;
							Ti.API.info("apple caught is apple and its:" + newapples[i].tag);
						} else if (newapples[i].tag == 'granny') {
							PlayerScore = PlayerScore + 20;
							Ti.API.info("apple caught is granny and its:" + newapples[i].tag);
						} else if (newapples[i].tag == 'worm') {
							Ti.API.info("apple caught is worm and its:" + newapples[i].tag);
							
								var ohno2 = Ti.Media.createSound({url:"sounds/OhNo.wav"});
								ohno2.play();
							PlayerScore = PlayerScore - 100;
							//	clearInterval(dropApples)
							clearInterval(animateApples);
	
							//increase the drop speed
							if (currentDropSpeed != 5) {
								currentDropSpeed = currentDropSpeed - 5;
							}
	
							//increase the amount of apples
							if (currentAppleDropSpeed != 500) {
								currentAppleDropSpeed = currentAppleDropSpeed - 500;
							}
	
							//start up the apples
							animateApples = setInterval(moveapples, currentDropSpeed);
							//	dropApples = setInterval(dropNewapples, currentAppleDropSpeed);
	
						} else if (newapples[i].tag == 'slower') {
								var pickin = Ti.Media.createSound({url:"sounds/Yay1.wav"});
								pickin.play();
							PlayerScore = PlayerScore + 100;
							//	clearInterval(dropApples)
							clearInterval(animateApples);
							Ti.API.info("apple caught is slower and its:" + newapples[i].tag);
							//descrease the drop speed
							if (currentDropSpeed != 5) {
								currentDropSpeed = currentDropSpeed + 5;
							}
	
							//decrease the amount of apples
							if (currentAppleDropSpeed != 500) {
								currentAppleDropSpeed = currentAppleDropSpeed + 500;
							}
	
							//start up the apples
							animateApples = setInterval(moveapples, currentDropSpeed);
							//	dropApples = setInterval(dropNewapples, currentAppleDropSpeed);
	
						} else if (newapples[i].tag == 'caught') {
						//	Ti.API.info("apple caught is caught and its:" + newapples[i].tag);
	
							if (numberOfApplesDropped == 2) {
								scene.add(droppedApple2);
								numberOfApplesDropped = numberOfApplesDropped - 1;
							} else if (numberOfApplesDropped == 1) {
								scene.add(droppedApple3);
								numberOfApplesDropped = numberOfApplesDropped - 1;
							} else if (numberOfApplesDropped == 0) {
								PlayerScore = PlayerScore + 1000;
							}
						} else if (newapples[i].tag == 'newbasket') {

							if (superBasket == true){
									var laugh = Ti.Media.createSound({url:"sounds/Giggles1.wav"});
									laugh.play();
								PlayerScore = PlayerScore + 1000;
							}else{
								//playersBasket.animate([0,1],500,0);
									Ti.API.info("superbasket value2 is" + superBasket);
							var awesome = Ti.Media.createSound({url:"sounds/Awesome2.wav"});
							awesome.play();
								playersBasket.selectFrame("superbasket");
								PlayerScore = PlayerScore + 10;
								superBasket = true;
								
							}
							
						}
	
						scene.remove(newapples[i]);
						newapples[i].dispose();
						lblscore.text = PlayerScore;

						//check if player score is divisible by 100 evenly...if it is stop the timers and give a fact and increase the drop speed
						if (PlayerScore % 100 == 0) {
	
							clearInterval(dropApples);
							clearInterval(animateApples);
							Ti.API.info("I stopped the timers");
							
							if (superBasket == true){

								playersBasket.selectFrame("basket");
								superBasket = false;
							}
							//load a view on the screen and tell a fact
							window.add(factview);
							var factnumber = randomFromInterval(0, 29);
							lblfact.text = facts[factnumber];
							Level = Level + 1;
							
						
							
						} 
					
					
					} else if (newapples[i].y == catchYzone + 20) {

					//explode apple
					if (newapples[i].tag == "apple" || newapples[i].tag == "granny") {
						
							var ohno = Ti.Media.createSound({url:"sounds/OhNo3.wav"});
							ohno.play();
							
						newapples[i].selectFrame("splattered");
						numberOfApplesDropped = numberOfApplesDropped + 1;
							
							
							
						Ti.API.info("num of apples dropped" + numberOfApplesDropped);
						if (numberOfApplesDropped == 3) {
							//game is over

							clearInterval(dropApples);
							clearInterval(animateApples);
							scene.remove(droppedApple1);
//////////////////////////////////////////////////////////////////////////////////////////////DO SCORE CHECK OVER************************
							//check if score is greater then lowest score
							var scorearray = Ti.App.Properties.getList("playerscores");	
							
							if (PlayerScore >= scorearray[4].score) {
								window.add(gameOverviewNewHighScore);
							} else {
								//show gameover view
								window.add(gameOverview);
							}

						} else if (numberOfApplesDropped == 2) {
							scene.remove(droppedApple2);
						} else if (numberOfApplesDropped == 1) {
							scene.remove(droppedApple3);
						}

							var squish = Ti.Media.createSound({url:"sounds/squish.mp3"});
							squish.play();
						//	playSound("sounds/squish.mp3");
						//scene.remove(newapples[i])
						//newapples[i].dispose()
						//newapples[i].dispose()
						Ti.API.info("dont update score explode");
					}

				} else if (newapples[i].y >= catchYzone + 80) {
					//clear apples

					scene.remove(newapples[i]);
					newapples[i].dispose();
					//newapples[i].dispose()
					Ti.API.info("dont update score explode");

				}
			}

		}

		//	newapples[currentAppleCount].center = {x:newx * TOUCH_SCALE, y:applestarty};

		//currentAppleCount = currentAppleCount + 1
		}


function dropNewapples(){
	Ti.API.info("in dropnew");
	//create a new apple
	var newapple = currentAppleCount + 1;
	
	var newx = randomFromInterval(5,315);
	Ti.API.info("new x:" + newx);
	//old apple way
	//newapples[newapple] =  quicktigame2d.createSprite({image:'images/apple.png', x:newx, y:15});
	
		newapples[newapple] =  quicktigame2d.createSpriteSheet({image:'graphics/apples.xml', x:newx, y:15});
		
		
		var items = Array('apple','apple','apple','apple','apple','granny','apple','worm','granny','slower','newbasket','caught','apple','apple','granny','apple','granny','apple','apple','granny','apple','worm','granny');
		
		//var items = Array('worm','worm','worm','newbasket','newbasket','newbasket','caught','caught')
	
		
		var item = items[Math.floor(Math.random()*items.length)];
			//Ti.API.info("new item being served up:" + item);
		
		if (item == 'apple'){
				newapples[newapple].selectFrame("apple");
				newapples[newapple].tag = "apple";	
		}else if(item == 'granny'){
				newapples[newapple].selectFrame("granny");
				newapples[newapple].tag = "granny";
		}else if(item == 'worm'){
				newapples[newapple].selectFrame("worm");
				newapples[newapple].tag = "worm";	
		}else if(item == 'slower'){
				newapples[newapple].selectFrame("slower");
				newapples[newapple].tag = "slower";	
		}else if(item == 'caught'){
				newapples[newapple].selectFrame("caught");
				newapples[newapple].tag = "caught";
		}else if(item == 'newbasket'){
				newapples[newapple].selectFrame("newbasket");
				newapples[newapple].tag = "newbasket";	
		};

	
	
	
	scene.add(newapples[newapple]);
	newapples[newapple].z = 4;
	 	//newapples[currentAppleCount].center = {x:newx * TOUCH_SCALE, y:15};

	currentAppleCount = newapple;
	Ti.API.info(currentAppleCount);

}


function startRound(){
		dropNewapples();		
		
		animateApples = setInterval(moveapples,currentDropSpeed);
	    dropApples = setInterval(dropNewapples,currentAppleDropSpeed);

}

startRound();


function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}


game.addEventListener('touchstart', onTouchStart);
game.addEventListener('touchmove',  onTouchStart);
game.addEventListener('touchstart_pointer', onTouchStart); // Called only on Android

game.addEventListener('touchend', onTouchEnd);
game.addEventListener('touchend_pointer', onTouchEnd); // Called only on Android

// Add your game view
window.add(game);
window.zIndex = 1;
//window.open({fullscreen:true, navBarHidden:true});

window.fullscreen= true;
window.navBarHidden = true;
return window;

};