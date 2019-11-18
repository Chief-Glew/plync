const socket = io('http://81.136.88.120:3000', {secure: true})

function connect(){
    console.log('connecting')
    socket.on('latency', measureLatency)
    socket.emit('latency', {client:Date.now()})
	socket.on('play', data => document.getElementById('state').innerHTML = 'Playing')
	socket.on('pause', data => document.getElementById('state').innerHTML = 'Paused')
}

function measureLatency(data){
    console.log(data.server-data.client + "ms differnce")
}

function play(){
	socket.emit('play')
	document.getElementById('state').innerHTML = 'Playing'
}

function pause(){
	socket.emit('pause')
	document.getElementById('state').innerHTML = 'Paused'
}