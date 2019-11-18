console.log("You're on amazon!")

var ioScript = document.createElement('script');
ioScript.src = "https://cdn.socket.io/socket.io-1.4.5.js";
document.getElementsByTagName('head')[0].appendChild(ioScript);


var pointer;


function main () {
function waitTillIo(){
    console.log('Tick')
    if (typeof io === 'undefined') {
        setTimeout(waitTillIo, 1000)
    } else {
        






const socket = io.connect('localhost:3000')

function connect(){
    console.log('connecting')
    socket.on('latency', measureLatency)
    socket.emit('latency', {client:Date.now()})
}

function measureLatency(data){
    console.log(data.server-data.client + "ms differnce")
}


connect()

function savePointer(e){if (typeof pointer === 'undefined') { pointer = e;}}//capture pointer
document.querySelector('.playIcon').addEventListener('pointerup', savePointer)

function play(){
    var icon = document.querySelector('.playIcon')
    if(typeof icon !== 'undefined'){
        icon.dispatchEvent(pointer)
    }
}

function pause(){
    var icon = document.querySelector('.pausedIcon')
    if(typeof icon !== 'undefined'){
        icon.dispatchEvent(pointer)
    }
}

socket.on('play', play)
socket.on('pause', pause)


function onPlay(e){
    socket.emit('play', {})
}

function onPaused(e){
    socket.emit('pause', {})
}


document.querySelector('.playIcon').addEventListener('pointerup', onPlay)
document.querySelector('.pausedIcon').addEventListener('pointerup', onPaused)



    }
}
waitTillIo()
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);