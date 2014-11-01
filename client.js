var WebSocket = require('ws')
  , ws = new WebSocket('ws://127.0.0.1:8080');
ws.on('open', function() {
    ws.send('connected');
});
ws.on('message', function(message) {

	ws.send('ok');
    console.log('%s\n', message);
});