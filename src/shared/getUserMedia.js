
function hasMediaDevicesGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function hasMediaDevicesEnumerateDevices() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
}

function getMediaDevicesUserMedia(constraints) {
  return navigator.mediaDevices.getUserMedia(constraints)
}

function mediaDevicesEnumerateDevices() {
  return navigator.mediaDevices.enumerateDevices();
}

// support for older browsers
const getMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

function getAudioContext() {
  let context = null;
  try {
    const audioContext = (
      window.AudioContext || 
      window.webkitAudioContext || 
      window.mozAudioContext);  
    context = new audioContext();
  }
  catch(error) {
    console.log('getAudioContext fails with ', error)
  }
  return context;
}

function startUserMedia(stream, volumeLevel = 0) {
  let context;
  let input;
  let volume;
  try {
    const audioContext = (
      window.AudioContext || 
      window.webkitAudioContext || 
      window.mozAudioContext);  
    context = new audioContext();
    input = context.createMediaStreamSource(stream);
    console.log('Media stream created.');
    volume = context.createGain();
    volume.gain.value = volumeLevel;
    input.connect(volume);
    volume.connect(context.destination);
    console.log('Input connected to audio context destination.');
    
    // const recorder = new Recorder(input);
    // console.log('Recorder initialised.');
    // return recorder;
  }
  catch(error) {
    console.log('startUserMedia fails with ', error)
    return null;
  }

}


export { 
  hasMediaDevicesGetUserMedia, 
  hasMediaDevicesEnumerateDevices, 
  getMediaDevicesUserMedia, 
  mediaDevicesEnumerateDevices,
  getMedia,
  getAudioContext
};