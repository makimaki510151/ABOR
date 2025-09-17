// multi.js
const peerConnection = new RTCPeerConnection({
    iceServers: [] // シグナリングサーバーを使用しないため空にする
});

let dataChannel = null;

// ホスト側のロジック
async function setupHost() {
    dataChannel = peerConnection.createDataChannel("game-data");

    peerConnection.onicecandidate = (event) => {
        // ICE候補が生成されたら、これをゲストに伝える必要がある
        // QRコードや手動入力で共有する
        if (event.candidate) {
            console.log('ICE Candidate:', JSON.stringify(event.candidate));
            // この候補をゲストに送る
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // このofferをゲストに伝える（例：QRコードに埋め込む）
    const offerJson = JSON.stringify(peerConnection.localDescription);
    console.log('Offer (JSON):', offerJson);
    // QRコードに埋め込むか、テキストとして表示
}

// ゲスト側のロジック
async function setupGuest(hostOffer, hostCandidate) {
    peerConnection.ondatachannel = (event) => {
        dataChannel = event.channel;
        dataChannel.onmessage = (event) => {
            console.log("Received data:", event.data);
        };
    };

    const offer = new RTCSessionDescription(JSON.parse(hostOffer));
    await peerConnection.setRemoteDescription(offer);
    await peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(hostCandidate)));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // このanswerをホストに伝える
    const answerJson = JSON.stringify(peerConnection.localDescription);
    console.log('Answer (JSON):', answerJson);
    // このanswerをホストに手動で入力させる
}