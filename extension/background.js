var socket;

function connect(){
    console.log('connecting')
    socket.on('latency', measureLatency)
	socket.emit('latency', {client:Date.now()})
}

function measureLatency(data){
    console.log(data.server-data.client + "ms differnce")
}

chrome.runtime.onInstalled.addListener(function() {

		socket = require('socket.io-client')('http://81.136.88.120:3000')
		socket.on('play', play)
		socket.on('pause', pause)
		connect()
	
	chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
		if (typeof socket !== 'undefined' && socket !== null){
			console.log('asked to ' + msg)
			socket.emit(msg.toString(), {})
		}
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'amazon.co.uk'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
  
function play(){
	sendMsg('play')
}

function pause(){
	sendMsg('pause')
}
  
function sendMsg(msg){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // send a message to content script
        console.log(tabs)
        chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {});
    });
}

chrome.commands.onCommand.addListener(function (command) {
    if (command === "save") {
        alert("save");
    } else if (command === "play") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // send a message to content script
        console.log(tabs)
        chrome.tabs.sendMessage(tabs[0].id, "play/pause", function (response) {});
    });
    }
    console.log('got a command')
});
