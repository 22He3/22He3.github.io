async function play(e,name,dir) {
  createRipple(e);
  if (dir == undefined){
    dir = "voices/"
  }
  else {
    dir = "voices/" + dir + "/"
  }
  if (name == "stop"){
    stopAllAudio()
  }
  else if (name == undefined){}
  else {
    const buffer = await getBuffer(dir + name + ".mp3");
    currentSource = playAudio(buffer);
  }
};

function stopvideo() { //关闭模态框时重置视频
  var allvideo = document.getElementsByTagName('video')
  for (let video of allvideo) {
    video.pause();
    video.currentTime = 0;
  }
}

function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("div");
  button.appendChild(circle);// 计算水波纹的位置和大小
  var x =
    event.pageX ||
    document.documentElement.scrollLeft +
      document.body.scrollLeft +
      event.clientX;
  var y =
    event.pageY ||
    document.documentElement.scrollTop +
      document.body.scrollTop +
      event.clientY;
  var wx = button.offsetWidth;
  const rect = button.getBoundingClientRect();
  x = event.clientX - rect.left - wx / 2;
  y = event.clientY - rect.top - wx / 2;
  circle.style.cssText =
    "width: " +
    wx +
    "px;height: " +
    wx +
    "px;top: " +
    y +
    "px;left: " +
    x +
    "px";
  // 启动动画
  circle.classList.add("ripple");
  setTimeout(() => circle.remove(), 1000);
}

let currentSource = null;

const getBuffer = function (url) {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      audioContext.decodeAudioData(request.response, (buffer) =>
        buffer ? resolve(buffer) : reject("decoding error")
      );
    };
    request.onerror = (error) => reject(error);
    request.send();
  });
};

let activeSources = [];

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const playAudio = function (buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
  activeSources.push(source); // 将此source对象添加到跟踪数组中
  source.onended = function() {
    // 当音频播放结束时，从数组中移除source对象
    const index = activeSources.indexOf(source);
    if (index > -1) {
      activeSources.splice(index, 1);
    }
    source.stop();
  };
  /*未实现的进度条功能
  var timerId = setInterval(function() {
    var currentTime = audioContext.currentTime
    var duration = source.buffer.duration;
    var progress = (currentTime / duration) * 100;
    var progressBar = document.getElementById("progress");
    progressBar.style.width = progress + "%";
    console.log("当前播放进度：" + progress.toFixed(2) + "%");
    if (progress > 100) {
      clearInterval(timerId)
    }
  }, 100);*/
};

function Chongyue(event,accent) {
  if(accent == 0 | accent == undefined) {
    rand = parseInt(Math.random()*15+1);
    if(rand <= 4) {
      play(event,rand,'Chongyue');
      stopAllAudio()
    }
    else {
      play(event)
    }
  }
  else {
    rand = parseInt(Math.random()*15+101);
    if(rand <= 104) {
      play(event,rand,'Chongyue');
      stopAllAudio()
    }
    else {
      play(event)
    }
  }
}

function stopAllAudio() {
  activeSources.forEach(source => {
    source.stop(); // 停止每个音频源
  });
  activeSources = []; // 清空数组，因为所有的音频都已停止
}

var eggcount = 0;
function egg(event) {
  let kj = event.currentTarget;
  eggcount++;
  if (eggcount%5 == 0) {
    play(event, "egg");
  }
  kj.classList.add("shaky");
  setTimeout(function () {
    kj.classList.remove("shaky");
  }, 500);
}
//Qmsg.info()
