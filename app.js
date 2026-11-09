(function () {
  "use strict";
  var S = window.SITE;
  var main = document.getElementById("main");

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
  function today() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  function parse(s) {
    var p = s.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function daysLeft(s) {
    return Math.round((parse(s) - today()) / 86400000);
  }
  function fmt(s) {
    var d = parse(s);
    return d.getMonth() + 1 + "월 " + d.getDate() + "일";
  }
  function statusTag(s) {
    var cls = s === "진행 중" ? "on" : s === "완료" ? "done" : "";
    return '<span class="tag status ' + cls + '">' + esc(s) + "</span>";
  }

  /* ---------- 조각 ---------- */
  function heroProject(p) {
    return (
      '<article class="task">' +
      '<span class="stamp">지금 하는 연구</span>' +
      '<div class="month">' + esc(p.org) + "</div>" +
      "<h3>" + esc(p.title) + "</h3>" +
      (p.sub ? '<p class="sub">' + esc(p.sub) + "</p>" : "") +
      (p.steps ? "<ol>" + p.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" : "") +
      (p.now ? '<div class="due"><span>●</span> ' + esc(p.now) + "</div>" : "") +
      "</article>"
    );
  }

  function projectCard(p) {
    return (
      '<article class="card">' +
      '<div class="meta top">' + statusTag(p.status) + '<span class="tag topic">' + esc(p.topic) + '</span><span class="tag">' + esc(p.period) + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3>" +
      '<span class="org">' + esc(p.org) + "</span>" +
      (p.sub ? "<p>" + esc(p.sub) + "</p>" : "") +
      (p.goal ? '<p class="muted">' + esc(p.goal) + "</p>" : "") +
      (p.steps ? '<ol class="mini">' + p.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" : "") +
      (p.now ? '<p class="now">● ' + esc(p.now) + "</p>" : "") +
      "</article>"
    );
  }

  function resCard(r) {
    var btns = (r.links || []).map(function (l) {
      var u = safeUrl(l[1]);
      return u
        ? '<a class="lbtn" href="' + esc(u) + '"' + ext(u) + ">" + esc(l[0]) + ' <span aria-hidden="true">↗</span></a>'
        : '<span class="lbtn off">' + esc(l[0]) + " 준비 중</span>";
    }).join("");
    return (
      '<article class="card res">' +
      '<span class="res-type">' + esc(r.type) + (r.standard ? ' · <span title="관련 성취기준">' + esc(r.standard) + "</span>" : "") + "</span>" +
      "<h3>" + esc(r.title) + "</h3>" +
      '<div class="meta"><span class="tag topic">' + esc(r.topic) + "</span>" +
      r.grade.map(function (g) { return '<span class="tag">' + esc(g) + "</span>"; }).join("") + "</div>" +
      '<div class="lbtns">' + btns + "</div>" +
      '<span class="src">' + esc(r.source) + (r.year ? " · " + r.year : "") + "</span>" +
      "</article>"
    );
  }

  function ddayCard(t) {
    var has = !!t.date;
    var n = has ? daysLeft(t.date) : null;
    var box = has
      ? '<div class="d' + (n === 0 ? " today" : "") + '">' + (n === 0 ? "D-DAY" : "D-" + n) + "<small>" + fmt(t.date) + "</small></div>"
      : '<div class="d tbd">일정<small>공지 예정</small></div>';
    return (
      '<div class="card dday">' + box +
      "<div><span class=\"tag\">" + esc(t.kind) + "</span>" +
      '<h3 style="margin-top:4px">' + esc(t.title) + "</h3>" +
      '<span class="muted" style="font-size:14px">' + esc(has ? t.place : t.when || "") + (has || !t.place ? "" : " · " + esc(t.place)) + "</span></div></div>"
    );
  }

  function list(items) {
    return (
      '<div class="list">' +
      items.map(function (n) {
        return (
          '<div class="list-item"><span class="when">' + esc(n.when) + "</span>" +
          "<div><b>" + (n.pin ? '<span class="pin">고정</span>' : "") + esc(n.title) + "</b>" +
          (n.body ? "<p>" + esc(n.body) + "</p>" : "") + "</div></div>"
        );
      }).join("") +
      "</div>"
    );
  }

  function upcoming() {
    return S.trainings.filter(function (t) { return !t.date || daysLeft(t.date) >= 0; });
  }
  function past() {
    return S.trainings.filter(function (t) { return t.date && daysLeft(t.date) < 0; })
      .sort(function (a, b) { return parse(b.date) - parse(a.date); });
  }
  function joinBlock() {
    var u = safeUrl(S.site.joinUrl);
    return '<p style="margin:0">' + esc(S.site.joinText) + "</p>" +
      (u ? '<a class="btn primary" style="align-self:flex-start;margin-top:10px" href="' + esc(u) + '"' + ext(u) + ">가입 신청하기</a>" : "");
  }

  /* ---------- 화면 ---------- */
  var views = {};

  views[""] = function () {
    var cur = S.projects[0];
    var res = S.resources.filter(function (r) { return r.type !== "참고 자료" && r.type !== "교수학습과정안"; });
    var pick = [res[0], res[1], res[7], res[8]].filter(Boolean);
    var up = upcoming().slice(0, 2);
    return (
      '<section class="hero">' +
      '<div class="hero-text"><span class="badge">' + esc(S.site.badge) + "</span>" +
      '<span class="hand">“' + esc(S.site.slogan) + "”</span>" +
      "<h1>디지털 윤리 수업,<br>함께 만들고 나눕니다</h1>" +
      '<p class="lead">' + esc(S.site.tagline) + "</p>" +
      '<div class="hero-cta"><a class="btn primary" href="#/library">수업 자료 ' + S.resources.length + "개 보기 →</a>" +
      '<a class="btn" href="#/about">연구회 소개</a></div>' +
      '<div class="facts"><div><b>' + esc(S.site.members) + "</b><span>" + esc(S.site.membersNote) + "</span></div>" +
      "<div><b>" + S.regions.length + "개 권역</b><span>" + S.regions.map(esc).join(" · ") + "</span></div>" +
      "<div><b>" + S.teams.length + "개 팀</b><span>기획·홍보·콘텐츠·역량강화</span></div></div>" +
      "</div>" +
      (cur ? heroProject(cur) : "") +
      "</section>" +
      '<div class="row"><h2>바로 쓰는 수업 자료</h2><a class="more" href="#/library">자료실 전체 →</a></div>' +
      '<div class="grid g4">' + pick.map(resCard).join("") + "</div>" +
      '<div class="grid g2" style="margin-top:8px">' +
      "<section>" +
      '<div class="row"><h2>다가오는 일정</h2><a class="more" href="#/learn/schedule">일정 전체 →</a></div>' +
      '<div class="grid">' + (up.length ? up.map(ddayCard).join("") : '<div class="empty">예정된 일정이 없습니다.</div>') + "</div>" +
      "</section>" +
      "<section>" +
      '<div class="row"><h2>공지</h2><a class="more" href="#/notice">전체 →</a></div>' +
      list(S.notices.slice(0, 3)) +
      "</section></div>"
    );
  };

  /* 자료실 */
  var filt = { q: "", grade: "", topic: "" };
  views["library"] = function () {
    var used = S.topics.filter(function (t) { return S.resources.some(function (r) { return r.topic === t; }); });
    function chips(key, arr) {
      return ['<button type="button" class="fchip" data-k="' + key + '" data-v="" aria-pressed="' + (filt[key] === "") + '">전체</button>']
        .concat(arr.map(function (v) {
          return '<button type="button" class="fchip" data-k="' + key + '" data-v="' + esc(v) + '" aria-pressed="' + (filt[key] === v) + '">' + esc(v) + "</button>";
        })).join("");
    }
    return (
      "<h1>자료실</h1>" +
      '<p class="lead">연구회가 서산교육지원청과 함께 만든 디지털 윤리 수업 자료입니다. 수업 PPT는 사본을 만들어 우리 반에 맞게 고쳐 쓰세요.</p>' +
      '<div class="filters">' +
      '<label for="q" class="vh">자료 검색</label>' +
      '<input id="q" class="search" type="search" placeholder="제목·성취기준으로 찾기 (예: 딥페이크, 6도)" value="' + esc(filt.q) + '">' +
      '<div class="fgroup" role="group" aria-label="학년군"><span class="lbl">학년</span>' + chips("grade", S.grades) + "</div>" +
      '<div class="fgroup" role="group" aria-label="주제"><span class="lbl">주제</span>' + chips("topic", used) + "</div>" +
      "</div>" +
      '<p class="count" id="count" aria-live="polite"></p>' +
      '<div class="grid g3" id="reslist"></div>'
    );
  };
  function drawLibrary() {
    var q = filt.q.trim().toLowerCase();
    var arr = S.resources.filter(function (r) {
      return (!filt.grade || r.grade.indexOf(filt.grade) > -1) &&
        (!filt.topic || r.topic === filt.topic) &&
        (!q || (r.title + " " + r.topic + " " + r.standard).toLowerCase().indexOf(q) > -1);
    });
    document.getElementById("count").textContent = "자료 " + arr.length + "개";
    document.getElementById("reslist").innerHTML = arr.length
      ? arr.map(resCard).join("")
      : '<div class="empty" style="grid-column:1/-1">조건에 맞는 자료가 아직 없습니다. 필터를 줄여 보세요.</div>';
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
    var years = {};
    S.achievements.forEach(function (a) { (years[a.year] = years[a.year] || []).push(a); });
    var ys = Object.keys(years).sort(function (a, b) { return b - a; });
    return (
      "<h1>프로젝트</h1>" +
      '<p class="lead">2026년 연구회가 하고 있는 연구와 사업, 그리고 지난 성과입니다.</p>' +
      '<div class="grid g2">' + S.projects.map(projectCard).join("") + "</div>" +
      '<div class="row"><h2>지난 성과</h2></div>' +
      ys.map(function (y) {
        return '<h3 class="yr">' + y + "년</h3>" +
          list(years[y].map(function (a) { return { when: a.year, title: a.title, body: a.desc }; }));
      }).join("")
    );
  };

  /* 연수·배우기 */
  var learnTabs = [["start", "시작하기"], ["schedule", "연수·모임"], ["links", "꿀 링크"]];
  views["learn"] = function (sub) {
    var cur = learnTabs.some(function (t) { return t[0] === sub; }) ? sub : "start";
    var body = "";
    if (cur === "start") {
      body = '<div class="steps">' + S.start.map(function (s) {
        return '<div class="step"><div><h3>' + esc(s.title) + "</h3><p>" + esc(s.body) + "</p></div></div>";
      }).join("") + "</div>";
    } else if (cur === "schedule") {
      var up = upcoming(), ps = past();
      body =
        '<p class="muted">' + S.ways.map(esc).join(" · ") + "</p>" +
        "<h2>다가오는 일정</h2>" +
        '<div class="grid g2">' + (up.length ? up.map(ddayCard).join("") : '<div class="empty">예정된 일정이 없습니다.</div>') + "</div>" +
        '<h2 style="margin-top:32px">지난 연수 돌아보기</h2>' +
        (ps.length ? list(ps.map(function (t) {
          return { when: t.date.replace(/-/g, "."), title: t.title, body: [t.recap, t.place].filter(Boolean).join(" · ") };
        })) : '<div class="empty">아직 지난 연수가 없습니다.</div>');
    } else {
      body = '<div class="grid g3">' + S.links.map(function (l) {
        return '<a class="card" href="' + esc(safeUrl(l.url) || "#") + '"' + ext(l.url) + '><span class="tag topic" style="align-self:flex-start">' + esc(l.cat) + "</span><h3>" + esc(l.title) + ' ↗</h3><span class="muted" style="font-size:15px">' + esc(l.desc) + "</span></a>";
      }).join("") + "</div>";
    }
    return (
      "<h1>연수·배우기</h1>" +
      '<p class="lead">디지털 윤리 수업이 처음인 선생님부터 연구회 정기 연수까지.</p>' +
      '<div class="tabs" role="tablist">' + learnTabs.map(function (t) {
        return '<button type="button" role="tab" data-tab="' + t[0] + '" aria-selected="' + (t[0] === cur) + '">' + t[1] + "</button>";
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
    return "<h1>공지</h1>" + '<p class="lead">연구회 소식과 모집 안내입니다.</p>' + list(arr);
  };

  /* 소개 */
  views["about"] = function () {
    return (
      '<div class="about-head"><img src="img/logo.png" alt="" width="88" height="90">' +
      "<div><h1>" + esc(S.site.name) + "</h1>" +
      '<p class="en">' + esc(S.site.nameEn) + "</p></div></div>" +
      '<p class="lead">“' + esc(S.site.slogan) + "” · " + esc(S.site.badge) + ", " + esc(S.site.members) + "(" + esc(S.site.membersNote) + ")</p>" +
      '<div class="grid g2">' +
      '<section class="about-box"><h2>설립 목적</h2><ol class="mini">' +
      S.purposes.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol></section>" +
      '<section class="about-box"><h2>활동 방식</h2><ul class="mini">' +
      S.ways.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
      '<p class="muted" style="margin:10px 0 0">' + S.regions.map(esc).join(" · ") + "별 모임, 전체 사업은 프로젝트 팀(TF)</p></section>" +
      "</div>" +
      '<div class="row"><h2>운영 조직</h2></div>' +
      '<div class="grid g4">' + S.teams.map(function (t) {
        return '<div class="card"><h3>' + esc(t.team) + '</h3><span class="muted" style="font-size:15px">' + esc(t.job) + "</span></div>";
      }).join("") + "</div>" +
      '<p class="muted" style="font-size:14px;margin:10px 0 0">개인정보 보호를 위해 운영진 이름과 연락처는 사이트에 싣지 않습니다.</p>' +
      '<div class="row"><h2>함께하기</h2></div>' +
      '<div class="card join"><b>지원 자격</b><p style="margin:0">' + esc(S.site.eligibility) + "</p>" + joinBlock() + "</div>"
    );
  };

  /* ---------- 라우터 ---------- */
  var titles = { "": "", library: "자료실", projects: "프로젝트", learn: "연수·배우기", notice: "공지", about: "소개" };
  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/");
    var page = Object.prototype.hasOwnProperty.call(views, parts[0]) ? parts[0] : "";
    main.innerHTML = views[page](parts[1]);
    document.title = (titles[page] ? titles[page] + " · " : "") + S.site.name;
    document.querySelectorAll(".nav a").forEach(function (a) {
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

  /* ---------- 밝기 ---------- */
  var root = document.documentElement;
  try { var saved = localStorage.getItem("dew:theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  document.querySelector(".theme").addEventListener("click", function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("dew:theme", root.dataset.theme); } catch (e) {}
  });

  document.getElementById("foot-small").textContent =
    "© " + new Date().getFullYear() + " " + S.site.name + " · " + S.site.nameEn;

  route();
})();
