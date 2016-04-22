var room, token, message;
process.argv.forEach(function (val, index, array) {
    if (index >= 2 && index <= 4) {
        switch (index) {
            case 2:
                room = val;
                break;
            case 3:
                token = val;
                break;
            case 4:
                message = val;
                break;
        }
    }
});

var RtmClient = require('@slack/client').RtmClient;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

var rtm = new RtmClient(token);
rtm.start();

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage(message, room, function messageSent(err, res) {
    if (err == null) {
          console.log('Successfully notified the "' + room + '" hipchat room.');
    } else {
      console.log(err);
    }
    process.exit();
  });
});
