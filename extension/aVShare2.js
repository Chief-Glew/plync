console.log("You're on amazon!")




var pointer

function savePointer(e){
    if (typeof pointer === 'undefined') { 
    pointer = e
    console.log("Captured pointer!")
    }
}//capture pointer

function getPlayIcon(){
	for (var name of ['.playIcon', '.playIcon hide', '.animatedPausedIcon']){
        var icon = document.querySelector(name)
        if(typeof icon !== 'undefined' && icon !== null){
            return icon
        }
    }
    return null
}

function getPauseIcon(){
	for (var name of ['.pausedIcon', '.hide pausedIcon']){
        var icon = document.querySelector(name)
        if(typeof icon !== 'undefined' && icon !== null){
            return icon
        }
    }
    return null
}

function getIcon(){
    for (var name of ['.playIcon', '.pausedIcon', '.playIcon hide', '.hide pausedIcon', '.animatedPausedIcon']){
        var icon = document.querySelector(name)
        if(typeof icon !== 'undefined' && icon !== null){
            return icon
        }
    }
    return null
}

function getThatPointerBoi(){
var ppIcon = getIcon()
if (typeof pointer === 'undefined'){
    if(typeof ppIcon !== 'undefined' && ppIcon !== null){
        ppIcon.addEventListener('pointerup', savePointer)
        console.log("added listener to " + ppIcon)
    } else {
        console.log("video not started")
        setTimeout(getThatPointerBoi, 1000)
    }
}
}
getThatPointerBoi()

function play(){
    var icon = getPlayIcon()
    if(icon !== null){
        icon.dispatchEvent(pointer)
    }
}

function pause(){
    var icon = getPauseIcon()
    if(icon !== null){
        icon.dispatchEvent(pointer)
    }
}

function onPlay(f){
	return e => {
	var icon = getPlayIcon()
    var msg = icon === null ? 'pause' : 'play'
	console.log('Sending ' + msg + ' from: ' + f)
	chrome.runtime.sendMessage(msg, function(response) {});
	}
}

function onPaused(f){
	return e => {
	console.log('Sending pause from: ' + f)
	chrome.runtime.sendMessage('pause', function(response) {});
	}
}

function addListener(name, funct){
	var icon = getPlayIcon()
    if(icon !== null){
        icon.addEventListener('pointerup', funct)
    } else {
		console.log('Waiting for ' + name + ' icon')
		setTimeout(addListener, 1000, name, funct)
	}
}

addListener('.playIcon', onPlay('.playIcon'))
//addListener('.pausedIcon', onPaused('.pausedIcon'))
//addListener('.playIcon hide', onPlay('.playIcon hide'))
//addListener('.hide pausedIcon', onPaused('.hide pausedIcon'))
//addListener('.animatedPausedIcon', onPlay(animatedPausedIcon))


chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
	console.log('Got a message: ' + msg)
	if ('play' === msg){
		play()
	} else if ('pause' === msg) {
		pause()
	} else {
    var icon = getPlayIcon()
    if(icon !== null){
        play()
    } else {
        pause()
    }
	}
});