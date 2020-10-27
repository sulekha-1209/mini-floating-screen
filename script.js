const videoElement = document.getElementById('video');
const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop');
// show option to select screen, pass it to video element and then play

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
            
        }

    } catch (error) {
        console.log(error)
    }
}

async function enablePictureInPicture() {
    //disable start button on click
    
    if (!videoElement.srcObject) {
        selectMediaStream();
    } else {
        await videoElement.requestPictureInPicture();
    }

    stopButton.disabled = false;
}

async function stop() {
    stopButton.disabled = true;
    await document.exitPictureInPicture();
    startButton.disabled = false;
    stopCapture();
}

function stopCapture() {
    let tracks = videoElement.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
}



//onLoad
selectMediaStream();
