var camAudioStream;
var list = [];
var inst = alert("Enter the shared ID");
var peer = new Peer();

const videoCallBtn = document.getElementById("videoCallBtn");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const peerId = document.getElementById("peerId");
const msg = document.getElementById("msg");


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
    .catch((err) => console.error("Error--> ", err));
});

videoCallBtn.addEventListener("click", () => {
  let remotePeerId = peerId.value;
  callPeer(remotePeerId);
});

stopVideoCallBtn.addEventListener("click", () => {
  stopVideo();
});

const callPeer = (id) => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
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
    .catch((err) => console.error("Error--> ", err));
};

const addRemoteVideo = (remoteStream) => (remoteVideo.srcObject = remoteStream);

const addLocalVideo = (localStream) => (localVideo.srcObject = localStream);
