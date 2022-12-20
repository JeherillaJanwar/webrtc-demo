var camAudioStream;
var list = [];
var inst = alert("Enter the shared ID");

const videoCallBtn = document.getElementById("videoCallBtn");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const humanID = document.getElementById("humanID");
const msg = document.getElementById("msg");
let remotePeerId = humanID.value;

var peer = new Peer();

peer.on("call", (call) => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    })
    .then((stream) => {
      camAudioStream = stream;
      addLocalVideo(stream);
      call.answer(stream);
      call.on("stream", (remoteStream) => {
        if (!list.includes(call.peer)) {
          addRemoteVideo(remoteStream);
          list.push(call.peer);
        }
      });
    })
    .catch((err) => console.log(err));
});

videoCallBtn.addEventListener("click", () => {
  callPeer(remotePeerId);
});

stopVideoCallBtn.addEventListener("click", () => stopVideo());

const callPeer = (id) => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    })
    .then((stream) => {
      camAudioStream = stream;
      addLocalVideo(stream);
      let call = peer.call(id, stream);

      call.on("stream", (remoteStream) => {
        if (!list.includes(call.peer)) {
          addRemoteVideo(remoteStream);
          list.push(call.peer);
        }
      });
    })
    .catch((err) => console.log(err));
};

const addRemoteVideo = (remoteStream) => (remoteVideo.srcObject = remoteStream);

const addLocalVideo = (localStream) => (localVideo.srcObject = localStream);
