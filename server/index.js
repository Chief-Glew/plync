console.log('Hello World!')


var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('plync/server.key', 'utf8');
var certificate = fs.readFileSync('plync/server.cert', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

var server = http.createServer(app);
//var server = https.createServer(credentials, app);

server.listen(3000, () => console.log(`Example app listening on port 3000!`));


const io = require('socket.io').listen(server)
io.on('connection', socket => {
    console.log('New connection! ' +socket.id)
    socket.on('latency', data =>{
     data.server = Date.now()
     console.log(data)
     socket.emit('latency', data)
    })
    
	socket.on('play', data => {
		console.log(socket.id + 'play')
		socket.broadcast.emit('play', data)
	})
	socket.on('pause', data => {
		console.log(socket.id + 'pause')
		socket.broadcast.emit('pause', data)
	})
})


app.use(express.static('../client'))

app.get('/tests', (req, res) => res.send('Hello World!'))

