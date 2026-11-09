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
    u = String(u || "#");
    return /^(https?:\/\/|#|\.?\/)/.test(u) ? u : "#";
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
  function sampleTag(x) {
    return x.sample ? '<span class="tag sample">예시</span>' : "";
  }

  /* ---------- 조각 ---------- */
  function taskCard(t, big) {
    var left = daysLeft(t.due);
    var due = t.status === "마감"
      ? "마감" + (t.shared ? " · 사례 " + t.shared + "건 나눔" : "")
      : fmt(t.due) + "까지 · <span>" + (left > 0 ? left + "일 남음" : left === 0 ? "오늘 마감" : "마감") + "</span>";
    return (
      '<article class="task">' +
      (t.status === "진행 중" ? '<span class="stamp">이달의 과제</span>' : "") +
      '<div class="month">' + esc(t.month) + " · " + esc(t.topic) + " " + sampleTag(t) + "</div>" +
      "<h3>" + esc(t.title) + "</h3>" +
      '<p class="muted" style="margin:0">' + esc(t.goal) + "</p>" +
      (big || t.status === "진행 중"
        ? "<ol>" + t.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>"
        : "") +
      '<div class="due">' + due + "</div>" +
      "</article>"
    );
  }

  function resCard(r) {
    return (
      '<a class="card" href="' + esc(safeUrl(r.url)) + '"' + ext(r.url) + ">" +
      '<span class="res-type">' + esc(r.type) + " · " + esc(r.period) + "</span>" +
      "<h3>" + esc(r.title) + "</h3>" +
      (r.standard ? '<span class="muted" style="font-size:14px">' + esc(r.standard) + "</span>" : "") +
      '<div class="meta"><span class="tag topic">' + esc(r.topic) + "</span>" +
      r.grade.map(function (g) { return '<span class="tag">' + esc(g) + "</span>"; }).join("") +
      '<span class="tag" title="이용 허락 조건">' + esc(r.license) + "</span>" + sampleTag(r) +
      "</div></a>"
    );
  }

  function ddayCard(t) {
    var n = daysLeft(t.date);
    var label = n === 0 ? "D-DAY" : "D-" + n;
    return (
      '<a class="card dday" href="' + esc(safeUrl(t.url)) + '"' + ext(t.url) + ">" +
      '<div class="d' + (n === 0 ? " today" : "") + '">' + label + "<small>" + fmt(t.date) + "</small></div>" +
      "<div><span class=\"tag\">" + esc(t.kind) + "</span> " + sampleTag(t) +
      "<h3 style=\"margin-top:4px\">" + esc(t.title) + "</h3>" +
      '<span class="muted" style="font-size:14px">' + esc(t.place) + "</span></div></a>"
    );
  }

  function noticeList(items) {
    return (
      '<div class="list">' +
      items.map(function (n) {
        return (
          '<div class="list-item"><time datetime="' + esc(n.date) + '">' + esc(n.date.replace(/-/g, ".")) + "</time>" +
          "<div><b>" + (n.pin ? '<span class="pin" aria-label="고정">📌</span>' : "") + esc(n.title) + "</b> " + sampleTag(n) +
          "<p>" + esc(n.body) + "</p></div></div>"
        );
      }).join("") +
      "</div>"
    );
  }

  var upcoming = function () {
    return S.trainings.filter(function (t) { return daysLeft(t.date) >= 0; })
      .sort(function (a, b) { return parse(a.date) - parse(b.date); });
  };
  var past = function () {
    return S.trainings.filter(function (t) { return daysLeft(t.date) < 0; })
      .sort(function (a, b) { return parse(b.date) - parse(a.date); });
  };
  var byDate = function (a, b) { return parse(b.date) - parse(a.date); };

  /* ---------- 화면 ---------- */
  var views = {};

  views[""] = function () {
    var cur = S.tasks[0];
    var up = upcoming().slice(0, 2);
    var res = S.resources.slice().sort(byDate).slice(0, 4);
    return (
      '<section class="hero">' +
      '<div class="hero-text"><span class="hand">함께 만드는 디지털윤리 수업</span>' +
      "<h1>" + esc(S.site.tagline) + "</h1>" +
      '<p class="lead">학년·주제별 수업 자료를 모으고, 매달 하나의 과제를 여러 교실에서 함께 해 봅니다.</p>' +
      '<div class="hero-cta"><a class="btn primary" href="#/library">자료 찾아보기 →</a><a class="btn" href="#/learn">처음이라면</a></div></div>' +
      (cur ? taskCard(cur) : "") +
      "</section>" +
      '<div class="row"><h2>새로 올라온 자료</h2><a class="more" href="#/library">자료실 전체 →</a></div>' +
      '<div class="grid g4">' + res.map(resCard).join("") + "</div>" +
      '<div class="grid g2" style="margin-top:8px">' +
      "<section>" +
      '<div class="row"><h2>다가오는 연수</h2><a class="more" href="#/learn/schedule">일정 전체 →</a></div>' +
      '<div class="grid">' + (up.length ? up.map(ddayCard).join("") : '<div class="empty">예정된 연수가 없습니다.</div>') + "</div>" +
      "</section>" +
      "<section>" +
      '<div class="row"><h2>공지</h2><a class="more" href="#/notice">전체 →</a></div>' +
      noticeList(S.notices.slice(0, 3)) +
      "</section></div>"
    );
  };

  /* 자료실 */
  var filt = { q: "", grade: "", topic: "" };
  views["library"] = function () {
    function chips(key, list) {
      return ['<button type="button" class="fchip" data-k="' + key + '" data-v="" aria-pressed="' + (filt[key] === "") + '">전체</button>']
        .concat(list.map(function (v) {
          return '<button type="button" class="fchip" data-k="' + key + '" data-v="' + esc(v) + '" aria-pressed="' + (filt[key] === v) + '">' + esc(v) + "</button>";
        })).join("");
    }
    return (
      "<h1>자료실</h1>" +
      '<p class="lead">연구회 선생님들이 수업에 써 본 자료입니다. 이용 허락 조건(CC)을 지켜 자유롭게 쓰세요.</p>' +
      '<div class="filters">' +
      '<label class="sr" for="q" style="position:absolute;left:-999px">자료 검색</label>' +
      '<input id="q" class="search" type="search" placeholder="제목으로 찾기 (예: 출처, 단톡방)" value="' + esc(filt.q) + '">' +
      '<div class="fgroup" role="group" aria-label="학년군"><span class="lbl">학년</span>' + chips("grade", S.grades) + "</div>" +
      '<div class="fgroup" role="group" aria-label="주제"><span class="lbl">주제</span>' + chips("topic", S.topics) + "</div>" +
      "</div>" +
      '<p class="count" id="count" aria-live="polite"></p>' +
      '<div class="grid g3" id="reslist"></div>'
    );
  };
  function drawLibrary() {
    var q = filt.q.trim().toLowerCase();
    var list = S.resources.filter(function (r) {
      return (!filt.grade || r.grade.indexOf(filt.grade) > -1) &&
        (!filt.topic || r.topic === filt.topic) &&
        (!q || r.title.toLowerCase().indexOf(q) > -1 || r.topic.toLowerCase().indexOf(q) > -1);
    }).sort(byDate);
    document.getElementById("count").textContent = "자료 " + list.length + "건";
    document.getElementById("reslist").innerHTML = list.length
      ? list.map(resCard).join("")
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

  /* 이달의 과제 */
  views["tasks"] = function () {
    return (
      "<h1>이달의 과제</h1>" +
      '<p class="lead">매달 한 주제를 정해 여러 교실에서 같은 수업을 해 보고, 학생 반응을 나눕니다. 학생 이름·사진은 올리지 않습니다.</p>' +
      '<div class="grid g2">' + S.tasks.map(function (t) { return taskCard(t, true); }).join("") + "</div>" +
      '<p class="muted" style="margin-top:24px;font-size:14px">사례 올리기는 회원 기능을 여는 다음 단계에서 열립니다. 지금은 연구회 오픈채팅으로 나눠 주세요.</p>'
    );
  };

  /* 연수·배우기 */
  var learnTabs = [
    ["start", "시작하기"],
    ["schedule", "연수 일정"],
    ["links", "꿀 링크"]
  ];
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
        "<h2>다가오는 연수</h2>" +
        '<div class="grid g2">' + (up.length ? up.map(ddayCard).join("") : '<div class="empty">예정된 연수가 없습니다.</div>') + "</div>" +
        '<h2 style="margin-top:32px">연수 돌아보기</h2>' +
        (ps.length ? noticeList(ps.map(function (t) {
          return { date: t.date, title: t.title, body: (t.recap || "") + (t.place ? " · " + t.place : ""), sample: t.sample };
        })) : '<div class="empty">아직 지난 연수가 없습니다.</div>');
    } else {
      body = '<div class="grid g3">' + S.links.map(function (l) {
        return '<a class="card" href="' + esc(safeUrl(l.url)) + '"' + ext(l.url) + '><span class="tag topic" style="align-self:flex-start">' + esc(l.cat) + "</span><h3>" + esc(l.title) + ' ↗</h3><span class="muted" style="font-size:15px">' + esc(l.desc) + "</span></a>";
      }).join("") + "</div>";
    }
    return (
      "<h1>연수·배우기</h1>" +
      '<p class="lead">디지털윤리 수업이 처음인 선생님부터 연구회 정기 연수까지.</p>' +
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
    var list = S.notices.slice().sort(function (a, b) {
      return (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || byDate(a, b);
    });
    return "<h1>공지</h1>" + '<p class="lead">연구회 소식과 일정 안내입니다.</p>' + noticeList(list);
  };

  /* 소개 */
  views["about"] = function () {
    return (
      "<h1>연구회 소개</h1>" +
      '<p class="lead">' + esc(S.site.name) + "는 " + esc(S.site.founded) + "년에 모인 교사 연구 모임입니다. " + esc(S.site.tagline) + "</p>" +
      '<div class="grid g2">' +
      '<section class="about-box"><h2>우리가 다루는 주제</h2><div class="meta" style="display:flex;flex-wrap:wrap;gap:6px">' +
      S.topics.map(function (t) { return '<span class="tag topic">' + esc(t) + "</span>"; }).join("") +
      '</div><p class="muted" style="margin:14px 0 0">대상 학년: ' + S.grades.map(esc).join(" · ") + "</p></section>" +
      '<section class="card"><h2>운영진</h2>' +
      S.roles.map(function (r) { return "<div><b>" + esc(r.role) + '</b> <span class="muted">' + esc(r.job) + "</span></div>"; }).join("") +
      '<p class="muted" style="margin:8px 0 0;font-size:14px">개인정보 보호를 위해 이름과 연락처는 사이트에 싣지 않습니다.</p></section>' +
      "</div>" +
      '<div class="row"><h2>함께하기</h2></div>' +
      '<div class="card"><p style="margin:0">' + esc(S.site.contact) + '</p><a class="btn primary" style="align-self:flex-start;margin-top:10px" href="' + esc(safeUrl(S.site.contactUrl)) + '"' + ext(S.site.contactUrl) + ">연구회에 문의하기</a></div>"
    );
  };

  /* ---------- 라우터 ---------- */
  var titles = { "": "", library: "자료실", tasks: "이달의 과제", learn: "연수·배우기", notice: "공지", about: "소개" };
  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/");
    var page = views.hasOwnProperty(parts[0]) ? parts[0] : "";
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
    "© " + new Date().getFullYear() + " " + S.site.name + " · 자료마다 표시된 CC 라이선스를 따릅니다.";

  route();
})();
