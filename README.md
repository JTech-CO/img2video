# IMG to VIDEO Converter (Img2video)

이미지를 GIF 또는 MP4 동영상으로 변환하는 클라이언트 사이드 웹 애플리케이션입니다. 

## 주요 기능

- 🖼️ **이미지 변환**: 이미지 파일을 GIF 또는 MP4 동영상으로 변환
- ⚡ **클라이언트 사이드 처리**: 모든 처리가 브라우저에서 이루어지며 서버로 데이터가 전송되지 않음
- 🌐 **다국어 지원**: 한국어(KO) / 영어(EN) 지원
- ⏱️ **지속 시간 설정**: 1~10초 범위에서 동영상 지속 시간 조절 가능
- 🎨 **다크 테마**: Pure Black 스타일의 미니멀한 UI - Tesla 및 SpaceX 등 웹페이지 디자인에서 착안

## 사용 방법

1. `index.html` 파일을 브라우저에서 엽니다
2. 이미지 파일을 선택합니다
3. 출력 형식(MP4 또는 GIF)을 선택합니다
4. 지속 시간(초)을 설정합니다
5. "변환 시작" 버튼을 클릭합니다
6. 변환된 파일을 다운로드합니다

## 기술 스택

- **HTML5**: Canvas API, MediaRecorder API
- **JavaScript**: ES6+ (Vanilla JS)
- **CSS3**: CSS Variables, Grid, Flexbox
- **외부 라이브러리**: [gif.js](https://github.com/jnordberg/gif.js) (GIF 생성)

## 파일 구조

```
img2video/
├── index.html                  # 페이지 구조 및 외부 리소스 연결
└── assets/
    ├── css/
    │   └── style.css           # 스타일 정의
    └── js/
        ├── main.js             # DOM 요소 참조, 이벤트 리스너, UI 제어
        ├── i18n.js             # 다국어(KO/EN) 데이터 및 언어 전환 함수
        └── modules/
            └── converter.js    # 핵심 로직 (loadImage, processMP4, processGIF)
```

## 특징

- **완전한 클라이언트 사이드 처리**: 프라이버시 보호, 서버 부하 없음
- **반응형 디자인**: 모바일 및 데스크톱 지원
