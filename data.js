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
      org: "한국과학창의재단 2026 AI·융합교육 교사연구회", img: "img/biz/aistem.jpg",
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
      org: "시청자미디어재단 2026 디지털 미디어 문해교육 교사연구회", img: "img/biz/media.jpg",
      topic: "미디어 리터러시", status: "진행 중", period: "2026"
    },
    {
      title: "MBL 센서 연계 AISW 교육자료",
      org: "교사학습공동체(MSG) 연계 · 과학 STEAM", img: "img/biz/mbl.jpg",
      topic: "AI 윤리", status: "진행 중", period: "2026",
      goal: "코더블 MBL 센서를 활용한 데이터 기반 과학 탐구 PPT·학습지 (예: 이산화탄소 센서로 연소 후 생기는 물질 확인하기)"
    },
    {
      title: "디지털윤리교육 플랫폼",
      org: "연구회 자체 사업", img: "img/biz/platform.jpg",
      topic: "디지털 기초", status: "진행 중", period: "2026",
      goal: "연구회가 만든 디지털 윤리 교육자료를 한곳에 모으는 이 사이트, 유튜브·인디스쿨로 홍보"
    },
    {
      title: "권역별 모임 운영",
      org: "서부 · 동북부 · 동남부 권역", img: "img/biz/regions.jpg",
      topic: "디지털 시민성", status: "진행 중", period: "2026",
      goal: "권역별로 모여 지역 사업을 추진하고, 전체 사업은 프로젝트 팀(TF)으로 진행"
    },
    {
      title: "연구회 도서 집필",
      org: "연구회 자체 사업", img: "img/biz/book.jpg",
      topic: "디지털 시민성", status: "준비 중", period: "2026",
      goal: "디지털 윤리에 대한 연구 사례를 담은 도서"
    }
  ],

  /* 지난 성과 */
  achievements: [
    { year: 2026, title: "학교 밖 교사 전문적 학습공동체 선정", desc: "전신인 ‘AIDL 학습공동체’ 우수 사례에 이어 디지털윤리교육연구회 이름으로 선정" },
    { year: 2025, title: "‘세계 속 디지털 시민’ 교과서 집필", img: "img/biz/textbook.jpg", desc: "충남교육청 인정도서, 학교자율시간 32차시. 충남 최초 교사 주도 인정도서" },
    { year: 2025, title: "디지털 윤리 수업안 12종 개발", img: "img/biz/deepfake.jpg", desc: "서산교육지원청 연계. 저학년·고학년 각 6종 PPT와 학습지 (자료실에 모두 있음)" },
    { year: 2025, title: "‘자꾸자꾸 플래너’ 개발", img: "img/biz/planner.jpg", desc: "디지털 자기조절력과 자기주도적 학습 습관을 기르는 플래너" },
    { year: 2025, title: "‘어휘랑 나랑 사고도구어 일력 365’ 제작", img: "img/biz/ilryeok.jpg", desc: "충남 온생각 사고도구어와 연계, 매일 익히며 문해력 높이기" },
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

  /* 도름스(dorms.school) 앱·자료 랭킹 TOP 10 — '받은 도름(좋아요)' 순, 2026-11-10 조사.
     도름스는 조회수를 공개하지 않아 '도름' 수를 인기 지표로 씀. comments = 댓글 수 */
  dormsTop: {
    checked: "2026-11-10",
    total: 961,
    source: "https://dorms.school/apps?rank=1",
    items: [
      { title: "수시지원상담카드 수합앱", by: "보드라운고슴도치", cat: "진로·입시", dorm: 312, comments: 67, desc: "학생 수시 상담카드를 실시간으로 모으고 상담·변경까지", url: "https://dorms.school/apps/d851406e-d292-434c-bb25-7109922541d1" },
      { title: "모두의 면접 준비기 pro", by: "보드라운고슴도치", cat: "진로·입시", dorm: 260, comments: 80, desc: "생기부 분석 결과를 대입 면접 준비로 잇는 도구", url: "https://dorms.school/apps/7873d600-05e8-4ed6-9015-8657cdb1a6d3" },
      { title: "생기부 분석기 pro", by: "보드라운고슴도치", cat: "생활기록부", dorm: 168, comments: 67, desc: "생기부 분석기의 인터랙티브 설명서", url: "https://dorms.school/apps/85d1481d-3e11-47f9-ac10-b9251c730b35" },
      { title: "수시지원상담카드 수합앱 (전문대 포함)", by: "보드라운고슴도치", cat: "진로·입시", dorm: 129, comments: 33, desc: "1위 앱에 전문대 카드까지 더한 버전", url: "https://dorms.school/apps/02b39569-a622-40d5-9d58-3b51353a32e3" },
      { title: "입사관 시점 생기부 평가기", by: "보드라운고슴도치", cat: "생활기록부", dorm: 99, comments: 14, desc: "대학 서류평가 관점으로 생기부를 살펴보기", url: "https://dorms.school/apps/44cae67a-13a1-4566-94e8-d8eb6d0f2edd" },
      { title: "정시 2021~2026 입결 뷰어", by: "보드라운고슴도치", cat: "진로·입시", dorm: 81, comments: 15, desc: "공개 입결 자료를 보기 편하게 정리", url: "https://dorms.school/apps/bfe0f887-994e-4e5e-b63e-c6aad86d1d0a" },
      { title: "이음오피스", by: "듀이언", cat: "업무", dorm: 70, comments: 42, desc: "한컴·MS오피스·PDF·마인드맵을 한 창에서 편집", url: "https://dorms.school/apps/a123f5ca-732e-402c-9a7a-c4f63bccd833" },
      { title: "9월 원서상담 루틴", by: "보드라운고슴도치", cat: "진로·입시 · 자료", dorm: 70, comments: 6, desc: "고3 담임의 입결 읽기와 원서 배치 판단 틀", url: "https://dorms.school/apps/ed107e08-6ebe-4d6a-a594-242866a20bfb" },
      { title: "쌤핀(ssampin)", by: "듀이언", cat: "학급경영", dorm: 63, comments: 12, desc: "학급·수업·업무를 한 화면에서 관리하는 대시보드", url: "https://dorms.school/apps/a4fa757c-7d74-45dd-802d-193a3365e02d" },
      { title: "살아있는 생기부 - 갈피 AI", by: "홍창욱", cat: "생활기록부", dorm: 57, comments: 37, desc: "줄글 생기부를 사람과 AI가 읽기 좋게 재구성", url: "https://dorms.school/apps/8cab0b6c-35f9-4bd9-83d2-b5c6625084df" }
    ],
    /* 순위에서 읽은 점 → 우리 사이트에 가져온 것 */
    lessons: [
      { see: "10개 중 9개가 생기부·입시 상담처럼 교사 업무 시간을 줄여 주는 실무 도구", take: "자료 카드에 ‘몇 차시·무엇이 들어 있는지’를 먼저 보여 줘 바로 쓸 수 있게 함" },
      { see: "한 선생님이 같은 도구를 버전업하며 시리즈로 키움 (TOP 10 중 7개가 한 사람)", take: "프로젝트를 해마다 이어 붙이고, 자료에 연도를 표시해 최신판을 알 수 있게 함" },
      { see: "앱 자체 대신 ‘설명서’만 올려도 3위 — 쓰는 법을 친절히 알려 주는 글이 인기", take: "연수·배우기 ‘시작하기’에 PPT·학습지·과정안 쓰는 순서를 안내" },
      { see: "도름(좋아요)·댓글 수가 곧 순위 — 반응이 쌓이는 구조", take: "②단계 회원 기능에서 ‘도움됐어요’와 활용 후기를 붙여 우리 자료 순위를 만들 예정" }
    ]
  },

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
