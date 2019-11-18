
var ioScript = document.createElement('script');
ioScript.src = "https://cdn.socket.io/socket.io-1.4.5.js";
document.getElementsByTagName('head')[0].appendChild(ioScript);

var d = document.createElement('script');
d.appendChild(document.createTextNode('var socket; setTimeout(function() {socket = io("localhost:3000s")}   , 2000)'))
document.getElementsByTagName('head')[0].appendChild(d);

