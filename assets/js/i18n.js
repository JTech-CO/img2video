// ----------------------------------------------------------------
// KO/EN 데이터 객체 및 언어 전환
// ----------------------------------------------------------------

const translations = {
    en: {
        title: "IMG TO VIDEO",
        subtitle: "Client-side Processing Unit",
        config: "CONFIGURATION",
        source_params: "SOURCE & PARAMS",
        input: "INPUT",
        select_img: "IMAGE SOURCE",
        format: "OUTPUT FORMAT",
        duration: "DURATION (SEC)",
        convert: "INITIATE CONVERSION",
        output: "OUTPUT",
        rendered_result: "RENDERED RESULT",
        preview: "PREVIEW",
        download: "DOWNLOAD FILE",
        alert_img: "Please select an image file.",
        alert_support: "MP4 mimeType not supported on this browser.",
        status_wait: "WAITING FOR INPUT...",
        status_processing: "PROCESSING...",
        footer_msg: "NO DATA IS SENT TO SERVER"
    },
    ko: {
        title: "이미지 동영상 변환기",
        subtitle: "클라이언트 기반 처리 유닛",
        config: "설정",
        source_params: "소스 & 파라미터",
        input: "입력",
        select_img: "이미지 원본",
        format: "출력 포맷",
        duration: "지속 시간 (초)",
        convert: "변환 시작",
        output: "결과물",
        rendered_result: "렌더링 결과",
        preview: "미리보기",
        download: "파일 다운로드",
        alert_img: "이미지 파일을 선택해주세요.",
        alert_support: "이 브라우저에서는 MP4 형식을 지원하지 않습니다.",
        status_wait: "입력 대기 중...",
        status_processing: "처리 중...",
        footer_msg: "데이터는 서버로 전송되지 않습니다"
    }
};

let currentLang = 'en';

function updateLanguage() {
    const t = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        langToggleBtn.textContent = currentLang === 'en' ? 'KO' : 'EN';
    }
}

function getTranslation(key) {
    return translations[currentLang][key] || key;
}

