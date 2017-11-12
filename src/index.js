import { videoEl, cameraCaptureEl } from './elements.js';
import { getUserMedia, scaleCanvasToScreen } from "./media.js";
import { clips } from "./stopmotion.js";

let videoSettings = {};

getUserMedia()
  .then(stream => {
    videoEl.srcObject = stream;
    const [track] = stream.getVideoTracks();
    videoSettings = track.getSettings(); 
  });

cameraCaptureEl.addEventListener('click', evt => {
  const rawCanvas = document.createElement('canvas');
  rawCanvas.width = videoSettings.width;
  rawCanvas.height = videoSettings.height;
  scaleCanvasToScreen(rawCanvas, rawCanvas.width / rawCanvas.height);
  rawCanvas.getContext("2d").drawImage(videoEl, 0, 0, rawCanvas.width, rawCanvas.height);


  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = window.innerWidth;
  croppedCanvas.height = window.innerHeight;
  
  if (rawCanvas.width > window.innerHeight) {
    croppedCanvas.getContext('2d').drawImage(rawCanvas, (rawCanvas.width - window.innerWidth) / -2, 0);
  } else if (rawCanvas.height > window.innerWidth) {
    croppedCanvas.getContext('2d').drawImage(rawCanvas, 0, (rawCanvas.height - window.innerHeight) / -2);
  } else {
    croppedCanvas.getContext('2d').drawImage(rawCanvas, 0, 0);
  }

  clips.push(croppedCanvas);
});

window.watchVideo = () => {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  videoEl.srcObject = canvas.captureStream();

  const CLIP_DURATION = 150;
  clips.forEach((clip, idx) => {
    setTimeout(() => {
      canvas.getContext("2d").drawImage(clip, 0, 0, canvas.width, canvas.height);
    }, CLIP_DURATION * idx);
  });

};