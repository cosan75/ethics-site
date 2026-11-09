(function () {
  "use strict";
  var S = window.SITE;
  var main = document.getElementById("main");
  var B = window.BASE || "";

  /* ---------- 도구 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) {
    u = String(u || "");
    return /^(https?:\/\/|#|\.?\/)/.test(u) ? u : "";
  }
  function ext(u) {
    return /^https?:\/\//.test(u) ? ' target="_blank" rel="noopener noreferrer"' : "";
  }
  function today() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function daysLeft(s) { return Math.round((parse(s) - today()) / 86400000); }
  function fmt(s) { var d = parse(s); return d.getMonth() + 1 + "." + d.getDate(); }

  /* ---------- 아이콘 ---------- */
  function ic(id, cls) {
    return '<svg class="i' + (cls ? " " + cls : "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }
  var TOPIC = {
    "개인정보": ["t-privacy", "r"], "사이버 예절": ["t-manners", "y"], "디지털 과의존": ["t-overuse", "r"],
    "AI 윤리": ["t-ai", "b"], "미디어 리터러시": ["t-media", "y"], "디지털 안전": ["t-safety", "b"],
    "저작권": ["t-copyright", "r"], "디지털 기초": ["t-basic", "b"], "디지털 시민성": ["t-citizen", "y"]
  };
  function topic(t) { return TOPIC[t] || ["t-basic", "b"]; }
  function linkIcon(label) {
    if (/PPT/.test(label)) return "i-ppt";
    if (/학습지/.test(label)) return "i-sheet";
    if (/과정안/.test(label)) return "i-guide";
    return "i-out";
  }
  function linkShort(label) {
    if (/PPT/.test(label)) return "PPT";
    if (/과정안/.test(label)) return "과정안";
    return label;
  }

  /* ---------- 조각 ---------- */
  function head(title, ico, color, note) {
    return (
      '<header class="ph"><span class="ph-sq" data-c="' + color + '">' + ic(ico) + "</span>" +
      "<h1>" + esc(title) + "</h1>" + (note ? '<span class="ph-note">' + note + "</span>" : "") + "</header>"
    );
  }
  function sec(title, href, ico) {
    return '<div class="row"><h2>' + (ico ? ic(ico) : "") + esc(title) + "</h2>" +
      (href ? '<a class="more" href="' + href + '" aria-label="' + esc(title) + ' 전체 보기">전체 ' + ic("i-out") + "</a>" : "") + "</div>";
  }
  function empty(text) {
    return '<div class="empty"><img src="' + B + 'img/logo.png" alt="" width="36" height="37"><span>' + esc(text) + "</span></div>";
  }
  function status(s) {
    var c = s === "진행 중" ? "on" : s === "완료" ? "done" : "";
    return '<span class="st ' + c + '">' + esc(s) + "</span>";
  }

  /* 자료 카드: 주제 색 띠 · 주제 아이콘 · 제목 · 학년 · 아이콘 버튼 */
  function resCard(r) {
    var t = topic(r.topic);
    var btns = (r.links || []).map(function (l) {
      var u = safeUrl(l[1]);
      return u
        ? '<a class="ibtn" href="' + esc(u) + '"' + ext(u) + ' title="' + esc(l[0]) + ' 열기">' + ic(linkIcon(l[0])) + "<span>" + esc(linkShort(l[0])) + "</span></a>"
        : '<span class="ibtn off">' + ic(linkIcon(l[0])) + "<span>준비 중</span></span>";
    }).join("");
    return (
      '<article class="res" data-c="' + t[1] + '">' +
      '<div class="res-top"><span class="res-ico" title="' + esc(r.topic) + '">' + ic(t[0]) + "</span>" +
      '<span class="res-topic">' + esc(r.topic) + "</span></div>" +
      "<h3>" + esc(r.title) + "</h3>" +
      '<div class="chips">' + r.grade.map(function (g) { return '<span class="chip">' + esc(g) + "</span>"; }).join("") +
      (r.standard ? '<span class="chip ghost" title="관련 성취기준">' + esc(r.standard) + "</span>" : "") + "</div>" +
      '<div class="ibtns">' + btns + "</div>" +
      "</article>"
    );
  }

  /* 순위 줄 */
  function rankList(items, max) {
    return (
      '<ol class="rank">' +
      items.slice(0, max || items.length).map(function (it, i) {
        return (
          '<li><span class="rk" data-c="' + (i === 0 ? "r" : i === 1 ? "b" : i === 2 ? "y" : "") + '">' + (i + 1) + "</span>" +
          '<a class="rk-body" href="' + esc(safeUrl(it.url) || "#") + '"' + ext(it.url) + ">" +
          "<b>" + esc(it.title) + "</b>" +
          '<span class="rk-sub">' + esc(it.cat) + " · @" + esc(it.by) + "</span></a>" +
          '<span class="rk-num" title="도름(좋아요) ' + it.dorm + "개 · 댓글 " + it.comments + '개">' +
          ic("i-heart") + "<b>" + it.dorm + "</b>" + ic("i-chat", "sm") + "<span>" + it.comments + "</span></span>" +
          "</li>"
        );
      }).join("") +
      "</ol>"
    );
  }

  /* 프로젝트 카드 */
  function projectCard(p) {
    var t = topic(p.topic);
    return (
      '<article class="proj">' +
      (p.img
        ? '<div class="proj-img"><img src="' + esc(B + p.img) + '" alt="' + esc(p.title) + ' 이미지" loading="lazy"></div>'
        : '<div class="proj-img blank" data-c="' + t[1] + '">' + ic(t[0]) + "</div>") +
      '<div class="proj-body">' +
      '<div class="chips">' + status(p.status) + '<span class="chip">' + esc(p.period) + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3>" +
      '<span class="org">' + esc(p.org) + "</span>" +
      (p.steps ? '<ol class="pills">' + p.steps.map(function (s, i) { return '<li title="' + esc(s) + '"><b>' + (i + 1) + "</b>" + esc(s) + "</li>"; }).join("") + "</ol>" : "") +
      (p.now ? '<p class="now">' + ic("i-play", "sm") + esc(p.now) + "</p>" : "") +
      "</div></article>"
    );
  }

  /* 일정 카드 */
  function ddayCard(t) {
    var has = !!t.date;
    var n = has ? daysLeft(t.date) : null;
    return (
      '<div class="dday">' +
      '<div class="d" data-c="' + (has ? "r" : "y") + '">' +
      (has ? (n === 0 ? "D-DAY" : "D-" + n) + "<small>" + fmt(t.date) + "</small>" : ic("i-calendar") + "<small>공지 예정</small>") +
      "</div>" +
      '<div class="dday-body"><span class="chip">' + esc(t.kind) + "</span><h3>" + esc(t.title) + "</h3>" +
      '<span class="muted">' + esc(has ? t.place : t.when || "") + "</span></div></div>"
    );
  }

  function list(items) {
    return (
      '<ul class="list">' +
      items.map(function (n) {
        return (
          "<li>" + (n.pin ? '<span class="pin" title="고정">' + ic("i-pin") + "</span>" : '<span class="dot"></span>') +
          '<div><b>' + esc(n.title) + '</b><span class="when">' + esc(n.when) + "</span>" +
          (n.body ? "<p>" + esc(n.body) + "</p>" : "") + "</div></li>"
        );
      }).join("") +
      "</ul>"
    );
  }

  function upcoming() { return S.trainings.filter(function (t) { return !t.date || daysLeft(t.date) >= 0; }); }
  function past() {
    return S.trainings.filter(function (t) { return t.date && daysLeft(t.date) < 0; })
      .sort(function (a, b) { return parse(b.date) - parse(a.date); });
  }

  /* ---------- 화면 ---------- */
  var views = {};

  /* 홈: 몬드리안 구성 */
  views[""] = function () {
    var cur = S.projects[0];
    var res = S.resources.filter(function (r) { return r.type === "수업 PPT·학습지"; });
    var pick = [res[0], res[1], res[7], res[8]].filter(Boolean);
    var up = upcoming();
    return (
      '<section class="mond" aria-label="바로가기">' +
      '<div class="m-hero" data-c="b">' +
      '<p class="m-kicker">' + esc(S.site.badge) + "</p>" +
      "<h1>" + esc(S.site.slogan) + "</h1>" +
      '<a class="btn on-b" href="#/library">' + ic("i-library") + "수업 자료 보기</a></div>" +
      '<div class="m-mark"><img src="' + B + 'img/logo.png" alt="디지털윤리교육연구회 엠블럼" width="120" height="123">' +
      '<span class="m-num"><b>' + esc(String(S.site.members).replace(/\D/g, "")) + '</b>명</span><span class="m-cap">' + esc(S.site.membersNote) + "</span></div>" +
      tile("#/library", "i-library", "자료실", S.resources.length, "r") +
      tile("#/projects", "i-projects", "프로젝트", S.projects.length, "y") +
      tile("#/learn", "i-learn", "배우기", "", "w") +
      tile("#/notice", "i-notice", "공지", S.notices.length, "w") +
      tile("#/learn/top", "i-trophy", "TOP 10", "", "b") +
      tile("#/about", "i-about", "소개", "", "w") +
      "</section>" +

      (cur ? sec("지금 하는 연구", "#/projects", "i-projects") + '<div class="now-proj">' + projectCard(cur) + "</div>" : "") +

      sec("바로 쓰는 수업 자료", "#/library", "i-library") +
      '<div class="grid g4">' + pick.map(resCard).join("") + "</div>" +

      '<div class="split">' +
      "<section>" + sec("교사 인기 TOP 3", "#/learn/top", "i-trophy") + rankList(S.dormsTop.items, 3) + "</section>" +
      "<section>" + sec("일정 · 공지", "#/notice", "i-calendar") +
      (up.length ? up.slice(0, 1).map(ddayCard).join("") : "") + list(S.notices.slice(0, 2)) + "</section>" +
      "</div>"
    );
  };
  function tile(href, ico, label, num, c) {
    return '<a class="m-tile" data-c="' + c + '" href="' + href + '">' + ic(ico, "lg") +
      '<span class="m-label">' + esc(label) + "</span>" +
      (num !== "" ? '<span class="m-count">' + num + "</span>" : "") + "</a>";
  }

  /* 자료실 */
  var filt = { q: "", grade: "", topic: "" };
  views["library"] = function () {
    var used = S.topics.concat(["디지털 시민성"]).filter(function (t, i, a) {
      return a.indexOf(t) === i && S.resources.some(function (r) { return r.topic === t; });
    });
    var grades = '<div class="seg" role="group" aria-label="학년군">' +
      [""].concat(S.grades).map(function (g) {
        return '<button type="button" class="fchip" data-k="grade" data-v="' + esc(g) + '" aria-pressed="' + (filt.grade === g) + '">' + (g ? esc(g) : "전체") + "</button>";
      }).join("") + "</div>";
    var topics = '<div class="topics" role="group" aria-label="주제">' +
      '<button type="button" class="fchip tchip" data-k="topic" data-v="" aria-pressed="' + (filt.topic === "") + '">' + ic("i-library") + "<span>전체</span></button>" +
      used.map(function (v) {
        var t = topic(v);
        return '<button type="button" class="fchip tchip" data-c="' + t[1] + '" data-k="topic" data-v="' + esc(v) + '" aria-pressed="' + (filt.topic === v) + '">' + ic(t[0]) + "<span>" + esc(v) + "</span></button>";
      }).join("") + "</div>";
    return (
      head("자료실", "i-library", "r", '<span id="count" aria-live="polite"></span>') +
      '<div class="filters">' +
      '<div class="field">' + ic("i-search") + '<label for="q" class="vh">자료 검색</label>' +
      '<input id="q" type="search" placeholder="제목·성취기준 (예: 딥페이크, 6도)" value="' + esc(filt.q) + '"></div>' +
      grades + topics + "</div>" +
      '<div class="grid g3" id="reslist"></div>' +
      '<p class="fine">' + ic("i-source", "sm") + "서산교육지원청 × 연구회 · 2026 · PPT는 사본을 만들어 고쳐 쓰세요</p>"
    );
  };
  function drawLibrary() {
    var q = filt.q.trim().toLowerCase();
    var arr = S.resources.filter(function (r) {
      return (!filt.grade || r.grade.indexOf(filt.grade) > -1) &&
        (!filt.topic || r.topic === filt.topic) &&
        (!q || (r.title + " " + r.topic + " " + r.standard).toLowerCase().indexOf(q) > -1);
    });
    document.getElementById("count").textContent = arr.length + "개";
    document.getElementById("reslist").innerHTML = arr.length
      ? arr.map(resCard).join("")
      : '<div class="span-all">' + empty("맞는 자료가 없습니다. 조건을 줄여 보세요.") + "</div>";
  }
  function bindLibrary() {
    var q = document.getElementById("q");
    q.addEventListener("input", function () { filt.q = q.value; drawLibrary(); });
    main.querySelectorAll(".fchip").forEach(function (b) {
      b.addEventListener("click", function () {
        filt[b.dataset.k] = b.dataset.v;
        main.querySelectorAll('.fchip[data-k="' + b.dataset.k + '"]').forEach(function (x) {
          x.setAttribute("aria-pressed", x === b);
        });
        drawLibrary();
      });
    });
    drawLibrary();
  }

  /* 프로젝트 */
  views["projects"] = function () {
    var withImg = S.achievements.filter(function (a) { return a.img; });
    var years = {};
    S.achievements.forEach(function (a) { (years[a.year] = years[a.year] || []).push(a); });
    var ys = Object.keys(years).sort(function (a, b) { return b - a; });
    return (
      head("프로젝트", "i-projects", "y", S.projects.length + "개 진행") +
      '<div class="grid g2">' + S.projects.map(projectCard).join("") + "</div>" +
      sec("지난 성과", "", "i-trophy") +
      '<div class="gallery">' + withImg.map(function (a) {
        return '<figure><img src="' + esc(B + a.img) + '" alt="' + esc(a.title) + ' 표지" loading="lazy"><figcaption><span class="chip">' + esc(a.year) + "</span>" + esc(a.title) + "</figcaption></figure>";
      }).join("") + "</div>" +
      '<div class="years">' + ys.map(function (y) {
        return '<section><h3 class="yr">' + y + "</h3>" +
          list(years[y].map(function (a) { return { when: "", title: a.title, body: a.desc }; })) + "</section>";
      }).join("") + "</div>"
    );
  };

  /* 배우기 */
  var learnTabs = [["start", "i-play", "시작"], ["schedule", "i-calendar", "연수"], ["top", "i-trophy", "TOP 10"], ["links", "i-link", "링크"]];
  views["learn"] = function (sub) {
    var cur = learnTabs.some(function (t) { return t[0] === sub; }) ? sub : "start";
    var body = "";
    if (cur === "start") {
      body = '<ol class="steps">' + S.start.map(function (s, i) {
        return '<li data-c="' + ["b", "r", "y", "b"][i % 4] + '"><span class="n">' + (i + 1) + "</span><h3>" + esc(s.title) + "</h3><p>" + esc(s.body) + "</p></li>";
      }).join("") + "</ol>";
    } else if (cur === "schedule") {
      var up = upcoming(), ps = past();
      body =
        '<div class="grid g2">' + (up.length ? up.map(ddayCard).join("") : empty("예정된 일정이 없습니다.")) + "</div>" +
        sec("지난 연수", "", "i-check") +
        (ps.length ? list(ps.map(function (t) {
          return { when: t.date.replace(/-/g, "."), title: t.title, body: [t.recap, t.place].filter(Boolean).join(" · ") };
        })) : empty("아직 지난 연수가 없습니다."));
    } else if (cur === "top") {
      var T = S.dormsTop;
      body =
        '<p class="fine">' + ic("i-heart", "sm") + '<a href="' + esc(T.source) + '" target="_blank" rel="noopener noreferrer">도름스</a> 앱·자료 ' + T.total +
        "개 중 도름(좋아요) 순 · 조회수 비공개라 도름 수로 셈 · " + esc(T.checked) + "</p>" +
        rankList(T.items) +
        sec("우리가 가져온 것", "", "i-check") +
        '<ol class="lessons">' + T.lessons.map(function (l, i) {
          return '<li><span class="n">' + (i + 1) + '</span><div><p class="see">' + esc(l.see) + '</p><p class="take">' + esc(l.take) + "</p></div></li>";
        }).join("") + "</ol>";
    } else {
      body = '<div class="grid g3">' + S.links.map(function (l) {
        var t = topic(l.cat);
        return '<a class="linkcard" data-c="' + t[1] + '" href="' + esc(safeUrl(l.url) || "#") + '"' + ext(l.url) + ">" +
          '<span class="res-ico">' + ic(t[0]) + "</span><div><b>" + esc(l.title) + "</b><span>" + esc(l.desc) + "</span></div>" + ic("i-out", "sm") + "</a>";
      }).join("") + "</div>";
    }
    return (
      head("배우기", "i-learn", "b") +
      '<div class="tabs" role="tablist">' + learnTabs.map(function (t) {
        return '<button type="button" role="tab" data-tab="' + t[0] + '" aria-selected="' + (t[0] === cur) + '">' + ic(t[1]) + "<span>" + t[2] + "</span></button>";
      }).join("") + "</div>" +
      '<div role="tabpanel">' + body + "</div>"
    );
  };
  function bindLearn() {
    main.querySelectorAll("[data-tab]").forEach(function (b) {
      b.addEventListener("click", function () { location.hash = "#/learn/" + b.dataset.tab; });
    });
  }

  /* 공지 */
  views["notice"] = function () {
    var arr = S.notices.filter(function (n) { return n.pin; }).concat(S.notices.filter(function (n) { return !n.pin; }));
    return head("공지", "i-notice", "r") + list(arr);
  };

  /* 소개 */
  views["about"] = function () {
    var u = safeUrl(S.site.joinUrl);
    return (
      '<section class="about-hero">' +
      '<img src="' + B + 'img/logo.png" alt="디지털윤리교육연구회 엠블럼" width="96" height="98">' +
      "<div><h1>" + esc(S.site.name) + '</h1><p class="en" lang="en">' + esc(S.site.nameEn) + "</p>" +
      '<div class="chips"><span class="chip">' + ic("i-about", "sm") + esc(S.site.members) + '</span><span class="chip">' + ic("i-map", "sm") + S.regions.length + '개 권역</span><span class="chip">' + ic("i-team", "sm") + S.teams.length + "개 팀</span></div></div>" +
      "</section>" +
      sec("설립 목적", "", "i-target") +
      '<ol class="quad">' + S.purposes.map(function (p, i) {
        return '<li data-c="' + ["b", "r", "y", "w"][i % 4] + '"><span class="n">' + (i + 1) + "</span>" + esc(p) + "</li>";
      }).join("") + "</ol>" +
      sec("활동 방식", "", "i-map") +
      '<ul class="ways">' + S.ways.map(function (w) { return "<li>" + ic("i-check", "sm") + esc(w) + "</li>"; }).join("") +
      "<li>" + ic("i-map", "sm") + S.regions.map(esc).join(" · ") + "</li></ul>" +
      sec("운영 조직", "", "i-team") +
      '<div class="grid g4">' + S.teams.map(function (t, i) {
        return '<div class="team" data-c="' + ["b", "r", "y", "b"][i % 4] + '"><b>' + esc(t.team) + "</b><span>" + esc(t.job) + "</span></div>";
      }).join("") + "</div>" +
      '<p class="fine">' + ic("i-lock", "sm") + "운영진 이름·연락처는 개인정보 보호를 위해 싣지 않습니다</p>" +
      '<section class="join" data-c="b">' + ic("i-join", "lg") +
      "<div><h2>함께하기</h2><p>" + esc(S.site.eligibility) + "</p><p>" + esc(S.site.joinText) + "</p>" +
      (u ? '<a class="btn on-b" href="' + esc(u) + '"' + ext(u) + ">가입 신청</a>" : "") + "</div></section>"
    );
  };

  /* ---------- 라우터 ---------- */
  var titles = { "": "", library: "자료실", projects: "프로젝트", learn: "배우기", notice: "공지", about: "소개" };
  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/");
    var page = Object.prototype.hasOwnProperty.call(views, parts[0]) ? parts[0] : "";
    main.innerHTML = views[page](parts[1]);
    document.title = (titles[page] ? titles[page] + " · " : "") + S.site.name;
    document.querySelectorAll(".topnav a, .tabbar a").forEach(function (a) {
      if (a.getAttribute("href") === "#/" + page) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (page === "library") bindLibrary();
    if (page === "learn") bindLearn();
    window.scrollTo(0, 0);
    if (route.started) main.focus({ preventScroll: true });
    route.started = true;
  }
  window.addEventListener("hashchange", route);

  /* 상단 검색 → 자료실 */
  document.getElementById("topsearch").addEventListener("submit", function (e) {
    e.preventDefault();
    filt.q = document.getElementById("tq").value;
    filt.grade = ""; filt.topic = "";
    if (location.hash === "#/library") route(); else location.hash = "#/library";
  });

  /* ---------- 밝기 ---------- */
  var root = document.documentElement;
  try { var saved = localStorage.getItem("dew:theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  document.querySelector(".theme").addEventListener("click", function () {
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("dew:theme", root.dataset.theme); } catch (e) {}
  });

  document.getElementById("foot-small").textContent = "© " + new Date().getFullYear() + " " + S.site.name;

  /* 디자인 고르기: 지금 보던 쪽 유지 */
  document.querySelectorAll(".dpick a").forEach(function (l) {
    l.addEventListener("click", function (e) { e.preventDefault(); location.href = l.getAttribute("href") + location.hash; });
  });

  route();
})();
