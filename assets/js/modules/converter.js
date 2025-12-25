// ----------------------------------------------------------------
// loadImage, processMP4, processGIF 등 핵심 로직
// ----------------------------------------------------------------

const gifWorkerScript = `importScripts('https://unpkg.com/gif.js@0.2.0/dist/gif.worker.js');`;
const workerBlob = new Blob([gifWorkerScript], { type: 'application/javascript' });
const workerUrl = URL.createObjectURL(workerBlob);

const mimeTypeMp4 = [
    'video/mp4;codecs=avc1,mp4a.40.2',
    'video/mp4;codecs=vp9,opus',
    'video/mp4;codecs=vp8,opus',
    'video/webm;codecs=avc1,mp4a.40.2',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
];

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

// MP4 변환 로직
async function processMP4(img, durationSec, t, originalName) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width % 2 === 0 ? img.width : img.width - 1;
    canvas.height = img.height % 2 === 0 ? img.height : img.height - 1;
    const ctx = canvas.getContext('2d');

    const stream = canvas.captureStream(30); // 30 FPS
    let mimeType = '';
    mimeTypeMp4.some(function(e){
        if(MediaRecorder.isTypeSupported(e)) {
            mimeType = e;
            return true;
        }
    });

    if(!mimeType) {
        alert(t.alert_support);
        return;
    }

    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
        videoBitsPerSecond: 40000000 // High bitrate
    });

    const chunks = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, {type: mimeType});
        const videoUrl = URL.createObjectURL(blob);
        
        const videoElement = document.getElementById('outputVideo');
        const placeholder = document.getElementById('placeholder');
        const downloadLink = document.getElementById('downloadLink');
        const downloadContainer = document.getElementById('downloadContainer');

        videoElement.src = videoUrl;
        placeholder.style.display = 'none';
        videoElement.style.display = 'block';
        
        // 다운로드 접두사 "output_" 추가
        const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
        downloadLink.href = videoUrl;
        downloadLink.download = `output_${baseName}.mp4`;
        downloadContainer.classList.remove('hidden');
    };

    mediaRecorder.start();

    const fps = 30;
    const totalFrames = fps * durationSec;
    let frame = 0;

    const interval = setInterval(() => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        frame++;

        if (frame >= totalFrames) {
            clearInterval(interval);
            mediaRecorder.stop();
        }
    }, 1000 / fps);
}

// GIF 변환 로직
async function processGIF(img, durationSec, originalName) {
    const gif = new GIF({
        workers: 2,
        quality: 10,
        width: img.width,
        height: img.height,
        workerScript: workerUrl
    });

    // 이미지 단일 프레임 추가
    gif.addFrame(img, {delay: durationSec * 1000});

    gif.on('finished', function(blob) {
        const imgUrl = URL.createObjectURL(blob);
        
        const imgElement = document.getElementById('outputImg');
        const placeholder = document.getElementById('placeholder');
        const downloadLink = document.getElementById('downloadLink');
        const downloadContainer = document.getElementById('downloadContainer');

        imgElement.src = imgUrl;
        placeholder.style.display = 'none';
        imgElement.style.display = 'block';
        
        // 다운로드 접두사 "output_" 추가
        const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
        downloadLink.href = imgUrl;
        downloadLink.download = `output_${baseName}.gif`;
        downloadContainer.classList.remove('hidden');
    });

    gif.render();
}
