/*
  사이트 내용은 전부 이 파일에서 고칩니다. (코드는 건드리지 않아도 됩니다)
  - 따옴표(")와 쉼표(,)만 지키면 됩니다.
  - sample: true 인 항목은 화면에 "예시" 라벨이 붙습니다. 실제 자료로 바꾸면 지우세요.
  - 개인정보(학생 이름·사진, 교사 연락처)는 넣지 않습니다.
*/
window.SITE = {
  site: {
    name: "디지털윤리교육연구회",
    tagline: "교실에서 바로 쓰는 디지털윤리 수업을 함께 만들고 나눕니다.",
    contact: "문의는 연구회 오픈채팅으로 받습니다.",
    contactUrl: "#",
    founded: "2026"
  },

  /* 학년군·주제 목록 — 자료실 필터에 그대로 쓰입니다 */
  grades: ["초 1~2", "초 3~4", "초 5~6", "중학교", "고등학교"],
  topics: ["개인정보", "저작권", "AI 윤리", "디지털 시민성", "사이버폭력 예방", "미디어 리터러시"],

  /* 이달의 수업 과제 — 맨 위가 진행 중인 과제 */
  tasks: [
    {
      id: "2026-11",
      month: "2026년 11월",
      title: "AI가 만든 그림, 누구의 작품일까?",
      topic: "AI 윤리",
      status: "진행 중",
      due: "2026-11-28",
      goal: "생성형 AI 결과물의 저작권과 출처 표시를 학생이 스스로 판단해 보는 1차시 수업",
      steps: [
        "AI 그림 2장과 사람이 그린 그림 1장을 보여 주고 구별해 보기",
        "'누가 만든 것인가'를 모둠별로 근거를 들어 토론하기",
        "우리 반 AI 사용 표시 규칙 한 줄 만들기"
      ],
      sample: true
    },
    {
      id: "2026-10",
      month: "2026년 10월",
      title: "내 사진, 올려도 될까?",
      topic: "개인정보",
      status: "마감",
      due: "2026-10-31",
      goal: "친구 사진을 SNS에 올리기 전 동의를 구하는 연습",
      steps: ["사진 속 개인정보 찾기", "동의 구하는 말 연습", "학급 약속 만들기"],
      shared: 12,
      sample: true
    }
  ],

  /* 자료실 */
  resources: [
    { title: "개인정보 탐정단: 사진 속 단서 찾기", grade: ["초 3~4", "초 5~6"], topic: "개인정보", type: "활동지", period: "1차시", standard: "", license: "CC BY-NC", url: "#", date: "2026-11-05", sample: true },
    { title: "출처 표시 3단계 카드", grade: ["초 5~6", "중학교"], topic: "저작권", type: "활동지", period: "1차시", standard: "", license: "CC BY", url: "#", date: "2026-11-02", sample: true },
    { title: "생성형 AI 사용 약속 만들기", grade: ["초 5~6", "중학교", "고등학교"], topic: "AI 윤리", type: "수업안", period: "2차시", standard: "", license: "CC BY-NC", url: "#", date: "2026-10-28", sample: true },
    { title: "단톡방 한마디의 무게", grade: ["초 5~6", "중학교"], topic: "사이버폭력 예방", type: "PPT", period: "1차시", standard: "", license: "CC BY-NC-ND", url: "#", date: "2026-10-20", sample: true },
    { title: "가짜 뉴스 판별 체크리스트", grade: ["중학교", "고등학교"], topic: "미디어 리터러시", type: "활동지", period: "1차시", standard: "", license: "CC BY", url: "#", date: "2026-10-15", sample: true },
    { title: "디지털 발자국 그려 보기", grade: ["초 1~2", "초 3~4"], topic: "디지털 시민성", type: "활동지", period: "1차시", standard: "", license: "CC BY", url: "#", date: "2026-10-08", sample: true },
    { title: "딥페이크 영상, 어떻게 알아볼까", grade: ["고등학교"], topic: "AI 윤리", type: "수업안", period: "2차시", standard: "", license: "CC BY-NC", url: "#", date: "2026-09-30", sample: true },
    { title: "비밀번호 지킴이 놀이", grade: ["초 1~2"], topic: "개인정보", type: "놀이 활동", period: "1차시", standard: "", license: "CC BY", url: "#", date: "2026-09-22", sample: true }
  ],

  /* 연수 일정 — date가 오늘 이후면 D-DAY로, 지났으면 '돌아보기'로 갑니다 */
  trainings: [
    { title: "11월 정기 연수: AI 시대의 저작권 수업", date: "2026-11-26", place: "온라인(줌)", kind: "정기 연수", url: "#", sample: true },
    { title: "공개 수업: 단톡방 예절 프로젝트", date: "2026-12-17", place: "연구회원 학교", kind: "공개 수업", url: "#", sample: true },
    { title: "10월 정기 연수: 개인정보 수업 나눔", date: "2026-10-22", place: "온라인(줌)", kind: "정기 연수", url: "#", recap: "참석 18명 · 수업 사례 5건 공유", sample: true }
  ],

  /* 배우기 > 시작하기 */
  start: [
    { title: "주제 하나 고르기", body: "자료실에서 우리 반에 지금 필요한 주제 하나를 고릅니다. 처음이라면 '개인정보'가 가장 쉽습니다." },
    { title: "활동지로 1차시 해 보기", body: "수업안 전체가 부담스러우면 활동지 한 장으로 20분만 해 봅니다." },
    { title: "학생 반응 한 줄 남기기", body: "이달의 과제에 학생 반응을 한 줄만 남겨도 다음 선생님께 큰 도움이 됩니다." },
    { title: "정기 연수에서 나누기", body: "한 달에 한 번 온라인 연수에서 해 본 수업을 5분 이야기합니다." }
  ],

  /* 배우기 > 꿀 링크 (공식 기관 위주) */
  links: [
    { title: "개인정보보호 포털", url: "https://www.privacy.go.kr", desc: "개인정보보호위원회 교육 자료와 법령 안내", cat: "개인정보" },
    { title: "한국저작권위원회", url: "https://www.copyright.or.kr", desc: "저작권 교육 자료, 공유마당 자유이용 저작물", cat: "저작권" },
    { title: "공유마당", url: "https://gongu.copyright.or.kr", desc: "수업에 써도 되는 이미지·음원·글꼴", cat: "저작권" },
    { title: "한국인터넷진흥원(KISA)", url: "https://www.kisa.or.kr", desc: "정보보호·사이버 보안 교육 자료", cat: "개인정보" },
    { title: "Creative Commons Korea", url: "https://ccl.cckorea.org", desc: "CC 라이선스 고르는 법", cat: "저작권" }
  ],

  /* 공지 */
  notices: [
    { date: "2026-11-10", title: "연구회 사이트를 열었습니다", body: "자료실과 연수 일정을 먼저 열고, 회원 자료 올리기는 다음 단계에서 엽니다.", pin: true },
    { date: "2026-11-03", title: "11월 이달의 과제 안내", body: "주제는 'AI가 만든 그림, 누구의 작품일까?'입니다. 11월 28일까지 사례를 나눠 주세요.", sample: true },
    { date: "2026-10-23", title: "10월 연수 자료 올림", body: "연수·배우기 > 연수 자료에서 볼 수 있습니다.", sample: true }
  ],

  /* 소개 > 운영진 (이름 대신 역할만) */
  roles: [
    { role: "회장", job: "연간 계획, 대외 연락" },
    { role: "자료 담당", job: "자료 검토·승인, 자료실 정리" },
    { role: "연수 담당", job: "정기 연수·공개 수업 운영" },
    { role: "사이트 담당", job: "사이트 갱신, 월간 링크 점검" }
  ]
};
