var MY_STREAM;
        var peerList = [];

        const videoCallBtn = document.getElementById("videoCallBtn");
        const localVideo = document.getElementById("localVideo");
        const remoteVideo = document.getElementById("remoteVideo");
        const peerId = document.getElementById("peerId");
        const msg = document.getElementById("msg");

        var peer = new Peer();

        peer.on('open', (id) => msg.innerHTML = "ID: <b><u>" + id + "</u></b>");

        peer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            }).then((stream) => {
                MY_STREAM = stream;
                addLocalVideo(stream);
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    if (!peerList.includes(call.peer)) {
                        addRemoteVideo(remoteStream);
                        peerList.push(call.peer);
                    }
                })

            }).catch((err) => console.log(err))
        })

        stopVideoCallBtn.addEventListener('click', () => stopVideo())

        const addRemoteVideo = (remoteStream) => remoteVideo.srcObject = remoteStream

        const addLocalVideo = (localStream) => localVideo.srcObject = localStream
