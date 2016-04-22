var room, token, message;
process.argv.forEach(function (val, index, array) {
    if (index >= 2 && index <= 4) {
        switch (index) {
            case 2:
                // room
                room = val;
                break;
            case 3:
                // roomToken
                token = val;
                break;
            case 4:
                // message
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
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  rtm.sendMessage(message, room, function messageSent(err, res) {
    if (err == null) {
          console.log('Successfully notified the "' + room + '" hipchat room.');
    } else {
      console.log(err);
    }
    process.exit();
  });
});
