// ----------------------------------------------------------------
// DOM 요소 참조, 이벤트 리스너 연결, UI 제어
// ----------------------------------------------------------------

// 언어 전환 버튼 이벤트 리스너
const langToggleBtn = document.getElementById('langToggle');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ko' : 'en';
        updateLanguage();
    });
}

// 초기 언어 설정
updateLanguage();

// 변환 버튼 이벤트 리스너
document.getElementById('convertBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageInput');
    const format = document.getElementById('formatSelect').value;
    const durationSec = parseInt(document.getElementById('durationInput').value) || 1;
    const file = fileInput.files[0];
    const t = translations[currentLang];

    if (!file) {
        alert(t.alert_img);
        return;
    }

    // 파일명 추출
    const originalName = file.name;

    // UI 초기화
    const placeholder = document.getElementById('placeholder');
    const outputVideo = document.getElementById('outputVideo');
    const outputImg = document.getElementById('outputImg');
    const downloadContainer = document.getElementById('downloadContainer');
    
    outputVideo.style.display = 'none';
    outputImg.style.display = 'none';
    downloadContainer.classList.add('hidden');
    placeholder.style.display = 'block';
    placeholder.textContent = t.status_processing;

    try {
        const img = await loadImage(file);
        
        if (format === 'mp4') {
            await processMP4(img, durationSec, t, originalName);
        } else {
            await processGIF(img, durationSec, originalName);
        }
    } catch (e) {
        console.error(e);
        placeholder.textContent = "ERROR: " + e.message;
    }
});
