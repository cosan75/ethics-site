/*
  사이트 내용은 전부 이 파일에서 고칩니다. (코드는 건드리지 않아도 됩니다)
  - 따옴표(")와 쉼표(,)만 지키면 됩니다.
  - 개인정보(학생 이름·사진, 교사 이름·전화번호)는 넣지 않습니다.
  - 출처: 「디지털윤리교육연구회 소개자료」(2026), 「2026 연구계획서」,
          「2026 디지털 윤리 교육 수업자료 목록(서산교육지원청)」
*/
window.SITE = {
  site: {
    name: "디지털윤리교육연구회",
    nameEn: "Digital Ethics Education Research Association",
    slogan: "디지털과 교육, 바른 생각으로 연결하다",
    tagline: "학생의 디지털 시민성과 교사의 디지털 윤리 교육 전문성을 함께 키우는 충남 교사 연구회입니다.",
    badge: "충남교육청 학교 밖 교사 전문적 학습공동체",
    members: "정회원 43명",
    membersNote: "2026. 3. 기준",
    /* 가입 신청 폼 주소가 생기면 아래 joinUrl에 넣으세요. 비어 있으면 버튼 대신 안내문만 나옵니다. */
    joinUrl: "",
    joinText: "상시 모집 중입니다. 연구회 모집 안내문의 QR코드로 신청하거나 가까운 연구회원에게 문의해 주세요."
  },

  purposes: [
    "학생의 디지털 시민성 함양",
    "교사의 디지털 윤리 교육 전문성 강화",
    "AI, SW, 디지털 교육 관련 연구",
    "지속 가능한 디지털 교육 체계 구축"
  ],
  ways: [
    "학기별 1회 정기 모임 및 연수",
    "수업 사례 연구 및 나눔",
    "AI 및 디지털 교육자료 공동 개발"
  ],
  eligibility: "디지털과 인공지능 교육에 관심이 있는 선생님이면 누구나",

  /* 운영 조직 — 이름은 싣지 않고 팀과 하는 일만 */
  teams: [
    { team: "기획운영팀", job: "찾아가는 학교 컨설팅, 연구회 사업 기획, 교사 대상 강의" },
    { team: "홍보미디어팀", job: "유튜브 활동 아카이빙, 홍보 영상 제작, 부스 운영" },
    { team: "콘텐츠 개발팀", job: "교과서·수업안·학습지 등 디지털 윤리 교육자료 개발" },
    { team: "역량강화팀", job: "연구회원 연수·워크숍·스터디, 기관 연계 답사" }
  ],
  regions: ["서부 권역", "동북부 권역", "동남부 권역"],

  /* 자료실 필터 */
  grades: ["초 3~4", "초 5~6", "교사용"],
  topics: ["개인정보", "사이버 예절", "디지털 과의존", "AI 윤리", "미디어 리터러시", "디지털 안전", "저작권", "디지털 기초"],

  /* 자료실 — links에 [이름, 주소] 묶음을 여러 개 넣을 수 있습니다 */
  resources: [
    { title: "소중한 개인정보 보호하기", grade: ["초 3~4"], topic: "개인정보", type: "수업 PPT·학습지",
      standard: "[4도03-02]", links: [["수업 PPT", "https://zrr.kr/Hppq0L"], ["학습지", "https://zrr.kr/Dffrll"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "서로 존중하는 사이버 세상 만들기", grade: ["초 3~4"], topic: "사이버 예절", type: "수업 PPT·학습지",
      standard: "[4도01-04]", links: [["수업 PPT", "https://zrr.kr/5pwO1t"], ["학습지", "https://zrr.kr/cf3lxH"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "디지털 에티켓 교육", grade: ["초 3~4"], topic: "사이버 예절", type: "수업 PPT·학습지",
      standard: "[4도03-02]", links: [["수업 PPT", "https://zrr.kr/DxoKjl"], ["학습지", "https://zrr.kr/JqjwKm"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "핸드폰으로 남긴 발자국?", grade: ["초 3~4"], topic: "개인정보", type: "수업 PPT·학습지",
      standard: "[4도03-02]", links: [["수업 PPT", "https://zrr.kr/Q1WCSh"], ["학습지", "https://zrr.kr/6j1ClR"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "즐거운 게임, 똑똑하게 즐겨요", grade: ["초 3~4"], topic: "디지털 과의존", type: "수업 PPT·학습지",
      standard: "[4도01-03]", links: [["수업 PPT", "https://zrr.kr/jSLb6X"], ["학습지", "https://zrr.kr/dSnAtN"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "스마트폰 과의존을 예방해요", grade: ["초 3~4"], topic: "디지털 과의존", type: "수업 PPT·학습지",
      standard: "[4도01-03]", links: [["수업 PPT", "https://zrr.kr/7gC7nK"], ["학습지", "https://zrr.kr/OOK6Sl"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "태블릿 기초 활용 교육", grade: ["초 3~4"], topic: "디지털 기초", type: "참고 자료",
      standard: "[4국06-01]", links: [["자료", "https://zrr.kr/Kmexrz"]], source: "서산교육지원청 × 연구회", year: 2026 },

    { title: "인공지능을 올바르게 사용하기", grade: ["초 5~6"], topic: "AI 윤리", type: "수업 PPT·학습지",
      standard: "[6실05-05]", links: [["수업 PPT", "https://zrr.kr/c1S1Nt"], ["학습지", "https://zrr.kr/n6a5bQ"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "딥페이크의 두 얼굴, 스스로 예방하기", grade: ["초 5~6"], topic: "AI 윤리", type: "수업 PPT·학습지",
      standard: "[6실05-05]", links: [["수업 PPT", "https://zrr.kr/yrGS1s"], ["학습지", "https://zrr.kr/3iKfo8"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "디지털 유해 환경에서 나를 지키기", grade: ["초 5~6"], topic: "미디어 리터러시", type: "수업 PPT·학습지",
      standard: "[6국06-02]", links: [["수업 PPT", "https://zrr.kr/CIe7cL"], ["학습지", "https://zrr.kr/w2sjoZ"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "SNS, 올바르게 활용하기", grade: ["초 5~6"], topic: "미디어 리터러시", type: "수업 PPT·학습지",
      standard: "[6국06-04]", links: [["수업 PPT", "https://zrr.kr/3lQiOm"], ["학습지", "https://zrr.kr/YTVstn"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "디지털 성범죄, 미리 알고 안전하게", grade: ["초 5~6"], topic: "디지털 안전", type: "수업 PPT·학습지",
      standard: "[6도03-01]", links: [["수업 PPT", "https://zrr.kr/0iONpC"], ["학습지", "https://zrr.kr/zl0Z8f"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "우리 모두가 지키는 저작권", grade: ["초 5~6"], topic: "저작권", type: "수업 PPT·학습지",
      standard: "[6도01-02]", links: [["수업 PPT", "https://zrr.kr/NT5hch"], ["학습지", "https://zrr.kr/yDw3wJ"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "컴퓨터 기초 활용 교육", grade: ["초 5~6"], topic: "디지털 기초", type: "참고 자료",
      standard: "[6실04-03]", links: [["자료", "https://zrr.kr/68wjA6"]], source: "서산교육지원청 × 연구회", year: 2026 },

    { title: "교수학습과정안 모음 (3~4학년군)", grade: ["교사용", "초 3~4"], topic: "디지털 기초", type: "교수학습과정안",
      standard: "", links: [["과정안 내려받기", "https://zrr.kr/bdy2JY"]], source: "서산교육지원청 × 연구회", year: 2026 },
    { title: "교수학습과정안 모음 (5~6학년군)", grade: ["교사용", "초 5~6"], topic: "디지털 기초", type: "교수학습과정안",
      standard: "", links: [["과정안 내려받기", "https://zrr.kr/ggCvd0"]], source: "서산교육지원청 × 연구회", year: 2026 }
  ],

  /* 프로젝트 — status: "진행 중" / "준비 중" / "완료". 맨 위가 홈에 크게 나옵니다 */
  projects: [
    {
      title: "팩트를 찾아라!",
      sub: "생성형 AI 정보를 ‘수평적 읽기’로 확인하고 출처를 밝혀 나누기",
      org: "한국과학창의재단 2026 AI·융합교육 교사연구회",
      topic: "AI 윤리", status: "진행 중", period: "2026. 6. ~ 2027. 1.",
      goal: "초등 5~6학년 국어·도덕·실과 융합 8차시. 생성형 AI 검색 결과를 그대로 옮기지 않고, 다른 믿을 만한 곳에서 확인한 뒤 출처를 밝혀 나누는 수업",
      steps: [
        "1~2차시 · AI가 알려준 게 다 사실일까?",
        "3~5차시 · 수평적 읽기로 사실 확인하기",
        "6~7차시 · 출처를 밝혀 발표 자료 만들기",
        "8차시 · 책임 있게 나누는 디지털 시민"
      ],
      now: "11월 2~4주 · 2차 수업 적용 중"
    },
    {
      title: "디지털 미디어 문해교육 자료 개발",
      org: "시청자미디어재단 2026 디지털 미디어 문해교육 교사연구회",
      topic: "미디어 리터러시", status: "진행 중", period: "2026"
    },
    {
      title: "MBL 센서 연계 AISW 교육자료",
      org: "교사학습공동체(MSG) 연계 · 과학 STEAM",
      topic: "AI 윤리", status: "진행 중", period: "2026",
      goal: "코더블 MBL 센서를 활용한 데이터 기반 과학 탐구 PPT·학습지 (예: 이산화탄소 센서로 연소 후 생기는 물질 확인하기)"
    },
    {
      title: "디지털윤리교육 플랫폼",
      org: "연구회 자체 사업",
      topic: "디지털 기초", status: "진행 중", period: "2026",
      goal: "연구회가 만든 디지털 윤리 교육자료를 한곳에 모으는 이 사이트, 유튜브·인디스쿨로 홍보"
    },
    {
      title: "권역별 모임 운영",
      org: "서부 · 동북부 · 동남부 권역",
      topic: "디지털 시민성", status: "진행 중", period: "2026",
      goal: "권역별로 모여 지역 사업을 추진하고, 전체 사업은 프로젝트 팀(TF)으로 진행"
    },
    {
      title: "연구회 도서 집필",
      org: "연구회 자체 사업",
      topic: "디지털 시민성", status: "준비 중", period: "2026",
      goal: "디지털 윤리에 대한 연구 사례를 담은 도서"
    }
  ],

  /* 지난 성과 */
  achievements: [
    { year: 2026, title: "학교 밖 교사 전문적 학습공동체 선정", desc: "전신인 ‘AIDL 학습공동체’ 우수 사례에 이어 디지털윤리교육연구회 이름으로 선정" },
    { year: 2025, title: "‘세계 속 디지털 시민’ 교과서 집필", desc: "충남교육청 인정도서, 학교자율시간 32차시. 충남 최초 교사 주도 인정도서" },
    { year: 2025, title: "디지털 윤리 수업안 12종 개발", desc: "서산교육지원청 연계. 저학년·고학년 각 6종 PPT와 학습지 (자료실에 모두 있음)" },
    { year: 2025, title: "‘자꾸자꾸 플래너’ 개발", desc: "디지털 자기조절력과 자기주도적 학습 습관을 기르는 플래너" },
    { year: 2025, title: "‘어휘랑 나랑 사고도구어 일력 365’ 제작", desc: "충남 온생각 사고도구어와 연계, 매일 익히며 문해력 높이기" },
    { year: 2025, title: "서산 AI교육 한마당 부스 운영", desc: "AI 윤리 부스 4개: 윤리 톡톡 스토리북, AI 숏폼 영상, AI 싱어송라이터, AI 버추얼 셀프 스튜디오" },
    { year: 2025, title: "충청남도교육청 마이크로러닝 연수 선정", desc: "회원들과 함께 마이크로러닝 공모전 참여" },
    { year: 2025, title: "교육활동 침해 예방 영상 제작 참여", desc: "SNS를 통한 교사 정보 공유 문제를 다룬 도교육청 예방 영상" },
    { year: 2025, title: "찾아가는 학교 컨설팅", desc: "5개교 운영, 교사 대상 강의" }
  ],

  /* 연수·모임 — date(YYYY-MM-DD)가 없으면 when 글자가 대신 나옵니다 */
  trainings: [
    { title: "‘팩트를 찾아라!’ 공개수업 및 참관 교사 협의회", date: "", when: "2026년 2학기 · 날짜는 공지로 안내", kind: "공개수업", place: "연구회원 학교" },
    { title: "2학기 연수: 온생각 활용법", date: "2025-11-13", kind: "정기 연수", place: "", recap: "2학기 정기 모임과 함께 진행" }
  ],

  /* 배우기 > 시작하기 */
  start: [
    { title: "학년군 고르기", body: "자료실에서 ‘초 3~4’ 또는 ‘초 5~6’을 누르면 그 학년에 맞는 수업 6가지가 나옵니다." },
    { title: "PPT로 한 차시", body: "카드의 ‘수업 PPT’를 열어 사본을 만든 뒤 우리 반에 맞게 고쳐 씁니다." },
    { title: "학습지로 정리", body: "‘학습지’ 링크로 활동지를 받아 수업 끝에 학생 생각을 정리합니다." },
    { title: "과정안으로 흐름 확인", body: "처음이라면 ‘교사용’의 교수학습과정안을 먼저 훑어보면 수업 흐름이 보입니다." }
  ],

  /* 배우기 > 꿀 링크 (공식 기관) */
  links: [
    { title: "개인정보보호 포털", url: "https://www.privacy.go.kr", desc: "개인정보보호위원회 교육 자료와 법령 안내", cat: "개인정보" },
    { title: "한국저작권위원회", url: "https://www.copyright.or.kr", desc: "저작권 교육 자료와 상담", cat: "저작권" },
    { title: "공유마당", url: "https://gongu.copyright.or.kr", desc: "수업에 써도 되는 이미지·음원·글꼴", cat: "저작권" },
    { title: "한국인터넷진흥원(KISA)", url: "https://www.kisa.or.kr", desc: "정보보호·사이버 보안 교육 자료", cat: "개인정보" },
    { title: "시청자미디어재단", url: "https://kcmf.or.kr", desc: "미디어 리터러시 교육과 교사연구회 지원", cat: "미디어 리터러시" },
    { title: "Creative Commons Korea", url: "https://ccl.cckorea.org", desc: "CC 라이선스 고르는 법", cat: "저작권" }
  ],

  /* 공지 — when은 자유롭게, pin: true는 맨 위 고정. 순서는 적은 순서대로 */
  notices: [
    { when: "상시", title: "연구회원을 모집합니다", body: "디지털과 인공지능 교육에 관심이 있는 선생님이면 누구나 함께할 수 있습니다. 학기별 1회 정기 모임과 연수, 수업 사례 나눔, 교육자료 공동 개발을 합니다.", pin: true },
    { when: "2026. 11.", title: "‘팩트를 찾아라!’ 2차 수업 적용", body: "AI·융합교육 교사연구회 8차시 수업을 1차 피드백을 반영해 다시 적용하고 있습니다." },
    { when: "2026", title: "2026년 선정 소식", body: "한국과학창의재단 AI·융합교육 교사연구회, 시청자미디어재단 디지털 미디어 문해교육 교사연구회, 충남교육청 학교 밖 교사 전문적 학습공동체로 선정되었습니다." },
    { when: "2026", title: "디지털 윤리 수업자료 12종 모음", body: "서산교육지원청과 함께 만든 3~4학년군·5~6학년군 수업 PPT와 학습지를 자료실에 모았습니다." }
  ]
};
