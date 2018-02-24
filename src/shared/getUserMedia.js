
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function hasEnumerateDevices() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
}

function getUserMedia(constraints) {
  return navigator.mediaDevices.getUserMedia(constraints)
}

function enumerateDevices() {
  return navigator.mediaDevices.enumerateDevices();
}

export { hasGetUserMedia, hasEnumerateDevices, getUserMedia, enumerateDevices };