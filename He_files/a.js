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
  else {
    const buffer = await getBuffer(dir + name + ".mp3");
    currentSource = playAudio(buffer);
  }
  
};
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

let activeSources = [];

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const playAudio = function (buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.onended = function() {
    // 当音频播放结束时，从数组中移除source对象
    const index = activeSources.indexOf(source);
    if (index > -1) {
      activeSources.splice(index, 1);
    }
  };
  source.start();
  activeSources.push(source); // 将此source对象添加到跟踪数组中
};

let currentSource = null;

function stopAllAudio() {
  activeSources.forEach(source => {
    source.stop(); // 停止每个音频源
  });
  activeSources = []; // 清空数组，因为所有的音频都已停止
}

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

var ottocount = 1;
function otto(event) {
  let kj = event.currentTarget;
  if (ottocount == 5) {
    play(event, "otto");
  }
  kj.classList.add("shaky");
    setTimeout(function () {
      kj.classList.remove("shaky");
    }, 500);
    ottocount++;
}
//Qmsg.info()
