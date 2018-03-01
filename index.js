// Time Zone, Date, Time 
let today = new Date();
let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
let hours = today.getHours();
let minutes = today.getMinutes();
let seconds = today.getSeconds();

let tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;

// The following code adds '0' before hour/minute/second which is < 10.
if(hours < 10) {
    hours = '0' + hours;
};

if(minutes < 10) {
    minutes = '0' + minutes;
};

if(seconds < 10) {
    seconds = '0' + seconds;
};

let currentTime = hours + ':' + minutes + ':' + seconds;

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
    rtm.sendMessage('I am risen', channel);
});

// The following block of code sends the current time zone information once the connection is open
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    rtm.sendMessage('Your current timezone is: ' + tzid + '.', channel);
});

// The following block of code sends the current date information once the connection is open
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    rtm.sendMessage('Today\'s date is: ' + date + '.', channel);
});

// The following block of code sends the current time information once the connection is open
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    rtm.sendMessage('The current time is: ' + currentTime + '.', channel);
});