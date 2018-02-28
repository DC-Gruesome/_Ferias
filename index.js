var RtmClient = require('@slack/client').RtmClient; // Will serve as the object for Ferias which references the RTM API.
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS; // Events Ferias will be listening for.

var rtm = new RtmClient('');// Insert Access Token between parentheses.
rtm.start(); // Initialize Ferias's session.

let channel;

// The following block of code listens for the authentication event.
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    for (const c of rtmStartData.channels) {
        if (c.is_member && c.name ==='test') { channel = c.id }
    }
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
  });

// The following block of code sends a greeting once the connection is open
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    rtm.sendMessage("I am risen", channel);
});


