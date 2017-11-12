export function getUserMedia() {
  return navigator.mediaDevices.getUserMedia({ video: true, audio: false })
}

export function scaleCanvasToScreen(canvas, aspectRatio) {
  const small = {
    height: canvas.height < window.innerHeight,
    width: canvas.width < window.innerWidth,
  };
  
  if (small.height && small.width) {
    /** 
     * TODO: Make it so the option with the greater delta
     * is the option that is set here
     */ 
  } else if (small.height) {
    canvas.height = window.innerHeight;
    canvas.width *= aspectRatio;
  } else if (small.width) {
    canvas.width = window.innerWidth;
    canvas.height /= aspectRatio;
  } else {
    /** 
     * TODO: Make it so the option with the greater delta
     * is the option that is set here
     */ 
  }
}