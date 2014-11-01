var Leap = require('leapjs');

var controllerOptions = {enableGestures: true};

var jsontosend;

Leap.loop(controllerOptions, function(frame) {
  // Body of callback function
  // 
	var frameString = "Frame ID: " + frame.id
	                + "Timestamp: " + frame.timestamp 
	                + "\nHands: " + frame.hands.length  
	                + "Fingers: " + frame.fingers.length 
	                //+ "Tools: " + frame.tools.length 
	                //+ "Gestures: " + frame.gestures.length;

	console.log(frameString);

	if (frame.hands.length > 0) {
		for (var i = 0; i < frame.hands.length; i++) {
			var hand = frame.hands[i];
			
	        var position = hand.palmPosition;
	        var velocity = hand.palmVelocity;
	        var direction = hand.direction;
	        var handstosend=[];
	        
	        

	        var fingers = hand.fingers;
	        for( var j = 0 ; j<fingers.length; j++)
	        {
	        	var finger = fingers[j];
	        	
	        	handstosend.push({type: finger.type,carp:finger.carpPosition,dip:finger.dipPosition,mcp:finger.mcpPosition,pip:finger.pipPosition});

	        }
	        jsontosend = { type:hand.type, position: position, velocity: velocity, direction: direction,hands: handstosend};
	        //console.log(jsontosend);
		}
	}

})