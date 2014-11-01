var Leap = require('leapjs');
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: 8080});

var controllerOptions = {enableGestures: true};
var jsontosend;
var info;



Leap.loop(controllerOptions, function(frame) {
  // Body of callback function
  // 
	var frameString = "Frame ID: " + frame.id
	                + "Timestamp: " + frame.timestamp 
	                + "\nHands: " + frame.hands.length  
	                + "Fingers: " + frame.fingers.length 
	                //+ "Tools: " + frame.tools.length 
	                //+ "Gestures: " + frame.gestures.length;

	//console.log(frameString);
	//
	if (frame.hands.length > 0) {
		var palmstosend=[];
		var fingerstosend=[];
		for (var i = 0; i < frame.hands.length; i++) {
			var hand = frame.hands[i];
			
	        var position = hand.palmPosition;
	        var velocity = hand.palmVelocity;
	        var direction = hand.direction;
	        var fingers = hand.fingers;

	        for( var j = 0 ; j<fingers.length; j++)
	        {

	        	var finger = fingers[j];

	        	fingerstosend.push({type: finger.type,carp:finger.carpPosition,dip:finger.dipPosition,mcp:finger.mcpPosition,pip:finger.pipPosition});
	        }

	        palmstosend.push({type:hand.type, 
	        					position: position, 
	        					velocity: velocity,
	        					direction: direction,
	        					fingers:fingerstosend
	        				});
		}

		info = {frameid:frame.id,frametimestamp:frame.timestamp, Hands:frame.hands.length, Fingers:frame.fingers.length,hands:palmstosend};
	}
	jsontosend = JSON.stringify(info);
	console.log(jsontosend + "\n");

})

var clients = [];
wss.on('connection', function(ws) {
	ws.send('start');
	clients.push(ws);

    ws.on('message', function(message) {
    	if (message == "ok")
    	{
    		ws.send(jsontosend);	
    	};
        //console.log('received: %s', message);
    });
    
});



