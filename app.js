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
    "저작권": ["t-copyright", "r"], "디지털 기초": ["t-basic", "b"], "디지털 시민성": ["t-citizen", "y"], "웹앱": ["i-link", "y"]
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
  /* 웹앱 썸네일: 실제 화면 캡처(800×500, 16:10) — 누르면 앱이 열림 */
  function shot(r) {
    if (!r.shot) return "";
    var u = r.links && r.links[0] ? safeUrl(r.links[0][1]) : "";
    var img = '<img src="' + esc(B + r.shot) + '" alt="' + esc(r.title) + ' 화면" loading="lazy" width="800" height="500">';
    return u ? '<a class="res-shot" href="' + esc(u) + '"' + ext(u) + ' tabindex="-1">' + img + "</a>" : '<span class="res-shot">' + img + "</span>";
  }

  function resCard(r) {
    var t = topic(r.topic);
    var btns = (r.links || []).map(function (l) {
      var u = safeUrl(l[1]);
      return u
        ? '<a class="ibtn" href="' + esc(u) + '"' + ext(u) + ' title="' + esc(l[0]) + ' 열기">' + ic(linkIcon(l[0])) + "<span>" + esc(linkShort(l[0])) + "</span></a>"
        : '<span class="ibtn off">' + ic(linkIcon(l[0])) + "<span>준비 중</span></span>";
    }).join("");
    return (
      '<article class="res' + (r.shot ? " has-shot" : "") + '" data-c="' + t[1] + '">' +
      shot(r) +
      (r.cover ? '<img class="res-cover" src="' + esc(B + r.cover) + '" alt="" loading="lazy" width="640" height="800">' : "") +
      '<div class="res-top"><span class="res-ico" title="' + esc(r.topic) + '">' + ic(t[0]) + "</span>" +
      '<span class="res-topic">' + esc(r.topic) + "</span></div>" +
      "<h3>" + esc(r.title) + "</h3>" +
      (r.desc ? '<p class="res-desc">' + esc(r.desc) + "</p>" : "") +
      '<div class="chips">' + r.grade.map(function (g) { return '<span class="chip">' + esc(g) + "</span>"; }).join("") +
      (r.standard ? '<span class="chip ghost" title="관련 성취기준">' + esc(r.standard) + "</span>" : "") + "</div>" +
      '<div class="ibtns">' + btns + "</div>" +
      "</article>"
    );
  }

  /* ---------- 흐르는 3D 카드 (빛돌 포털 makeFlow 방식) ---------- */
  function flowCard(r) {
    var u = r.links && r.links[0] ? safeUrl(r.links[0][1]) : "";
    var app = r.type === "웹앱";
    var desc = r.desc || (r.grade.join(" · ") + (r.standard ? " · 성취기준 " + r.standard : "") + " · " + r.type);
    var open = app ? "웹앱 열기 ↗" : r.links && r.links.length > 1 ? "PPT·학습지 열기 ↗" : r.links && r.links[0] ? r.links[0][0] + " 열기 ↗" : "열기 ↗";
    return '<a class="mg-fc" href="' + esc(u || "#/library") + '"' + (u ? ext(u) : "") + ' draggable="false">' +
      '<img src="' + esc(B + (r.wide || r.shot || r.cover)) + '" alt="" width="800" height="500" draggable="false">' +
      '<span class="mg-fb"><span class="mg-fbadge">' + esc(app ? "웹앱" : r.topic) + "</span>" +
      '<b class="mg-ft">' + esc(r.title) + "</b>" +
      '<span class="mg-fp">' + esc(desc) + "</span>" +
      '<span class="mg-ff"><span>' + esc(r.grade.join(" · ")) + "</span><span>" + open + "</span></span></span></a>";
  }
  function flowHTML(items, label) {
    return '<div class="mg-flow" tabindex="0" role="region" aria-roledescription="carousel" aria-label="' + esc(label) + ' (← → 키로 넘기기)">' +
      items.map(flowCard).join("") +
      '<button type="button" class="mg-fnav l" aria-label="이전">' + ic("i-out", "sm") + "</button>" +
      '<button type="button" class="mg-fnav r" aria-label="다음">' + ic("i-out", "sm") + "</button>" +
      '<div class="mg-fcount"><span aria-live="polite"></span><button type="button" class="mg-fplay"></button></div></div>';
  }
  /* 끊김 없이 계속 흐름 · 마우스를 올리면 천천히 멈춤 · 끌기·휠·화살표·키보드 */
  function bindFlow(flow) {
    if (!flow) return;
    var cards = [].slice.call(flow.querySelectorAll(".mg-fc")), N = cards.length;
    if (!N) return;
    var cnum = flow.querySelector(".mg-fcount span"), play = flow.querySelector(".mg-fplay");
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var SPEED = reduce ? 0.2 : 0.35, pos = 0, spd = SPEED, goal = null, auto = true, hover = false, drag = null, moved = false;
    var last = 0, raf = 0, cw = 230, fx = 0.66, cur = -1;
    function measure() { cw = cards[0].offsetWidth || 230; fx = parseFloat(getComputedStyle(flow).getPropertyValue("--fx")) || 0.66; }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function offX(ad) { return ad <= 1 ? lerp(0, fx, ad) : ad <= 2 ? lerp(fx, fx * 1.6, ad - 1) : lerp(fx * 1.6, fx * 2.05, Math.min(ad - 2, 1)); }
    function wrapD(i) { var d = (i - pos) % N; if (d > N / 2) d -= N; if (d < -N / 2) d += N; return d; }
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function paint() {
      var c = ((Math.round(pos) % N) + N) % N;
      cards.forEach(function (el, i) {
        var d = wrapD(i), ad = Math.abs(d), sg = d < 0 ? -1 : 1;
        if (ad > 3.2) { el.style.visibility = "hidden"; el.style.opacity = 0; return; }
        el.style.visibility = "visible";
        el.style.transform = "translate3d(" + (sg * cw * offX(ad)).toFixed(2) + "px,0," + (-ad * 120).toFixed(2) + "px) rotateY(" + (-sg * Math.min(ad, 2) * 10).toFixed(2) + "deg)";
        el.style.opacity = ad <= 2 ? 1 : Math.max(0, 3 - ad).toFixed(3);
        el.style.zIndex = 1000 - Math.round(ad * 100);
        el.style.pointerEvents = ad > 2.4 ? "none" : "";
        var on = i === c;
        if (el.classList.contains("on") !== on) { el.classList.toggle("on", on); el.tabIndex = on ? 0 : -1; el.setAttribute("aria-hidden", on ? "false" : "true"); }
      });
      if (c !== cur) { cur = c; cnum.innerHTML = "<b>" + pad(cur + 1) + "</b> / " + pad(N); }
    }
    function tick(t) {
      if (!flow.isConnected) { cancelAnimationFrame(raf); return; }
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
      if (!drag) {
        if (goal !== null) {
          pos += (goal - pos) * (1 - Math.pow(0.0025, dt));
          if (Math.abs(goal - pos) < 0.002) { pos = goal; goal = null; spd = 0; }
        } else {
          var target = auto && !hover ? SPEED : 0;
          spd += (target - spd) * Math.min(1, dt * 2.2);
          pos += spd * dt;
        }
      }
      if (pos > N * 4 || pos < -N * 4) { var gd = goal !== null ? goal - pos : null; pos = ((pos % N) + N) % N; if (gd !== null) goal = pos + gd; }
      paint();
      raf = requestAnimationFrame(tick);
    }
    function goTo(i) { goal = pos + wrapD(i); }
    function step(n) { goal = (goal !== null ? goal : Math.round(pos)) + n; }
    flow.querySelector(".mg-fnav.l").onclick = function (e) { e.stopPropagation(); step(-1); };
    flow.querySelector(".mg-fnav.r").onclick = function (e) { e.stopPropagation(); step(1); };
    function setPlay() {
      play.textContent = auto ? "❚❚" : "▶";
      play.setAttribute("aria-label", auto ? "자동 흐름 멈추기" : "자동 흐름 시작");
      play.title = play.getAttribute("aria-label");
    }
    play.onclick = function (e) { e.stopPropagation(); auto = !auto; setPlay(); };
    setPlay();
    cards.forEach(function (el, i) {
      el.addEventListener("click", function (e) {
        if (moved) { e.preventDefault(); moved = false; return; }
        if (i !== cur) { e.preventDefault(); goTo(i); }
      });
    });
    flow.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    });
    flow.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hover = true; });
    flow.addEventListener("pointerleave", function () { hover = false; });
    flow.addEventListener("focusin", function () { hover = true; });
    flow.addEventListener("focusout", function () { hover = false; });
    flow.addEventListener("wheel", function (e) {
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (!d) return;
      e.preventDefault();
      goal = (goal !== null ? goal : pos) + d / 240;
    }, { passive: false });
    flow.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".mg-fnav,.mg-fplay")) return;
      drag = { x: e.clientX, p: pos, id: e.pointerId }; moved = false; goal = null;
    });
    flow.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (Math.abs(dx) > 6) {
        if (!moved) { moved = true; flow.classList.add("drag"); try { flow.setPointerCapture(drag.id); } catch (x) {} }
        pos = drag.p - dx / (cw * fx);
      }
    });
    function endDrag() { if (!drag) return; drag = null; flow.classList.remove("drag"); if (moved) { goal = Math.round(pos); spd = 0; } }
    flow.addEventListener("pointerup", endDrag);
    flow.addEventListener("pointercancel", endDrag);
    flow.addEventListener("lostpointercapture", endDrag);
    window.addEventListener("resize", function () { measure(); paint(); });
    measure(); paint();
    raf = requestAnimationFrame(tick);
  }
  window.bindFlow = bindFlow;

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
    var up = upcoming();
    return (
      '<section class="mond" aria-label="바로가기">' +
      '<div class="m-hero" data-c="b">' +
      '<p class="m-kicker">' + esc(S.site.badge) + "</p>" +
      "<h1>" + esc(S.site.slogan) + "</h1>" +
      '<a class="btn on-b" href="#/library">' + ic("i-library") + "수업 자료 보기</a></div>" +
      '<div class="m-mark"><img src="' + B + 'img/logo.png" alt="디지털윤리교육연구회 엠블럼" width="120" height="123">' +
      '<span class="m-num"><b>' + esc(String(S.site.members).replace(/\D/g, "")) + '</b>명</span>' +
      '<span class="m-desc">' + S.regions.length + "개 권역의 선생님들이 함께 연구합니다</span>" +
      '<span class="m-cap">' + esc(S.site.membersNote) + "</span></div>" +
      tile("#/library", "i-library", "자료실", S.resources.length, "r", "수업 PPT·학습지·과정안") +
      tile("#/projects", "i-projects", "프로젝트", S.projects.length, "y", "지금 하는 연구와 지난 성과") +
      tile("#/learn", "i-learn", "배우기", "", "w", "처음 시작하기 · 연수 일정 · 꿀 링크") +
      tile("#/notice", "i-notice", "공지", S.notices.length, "w", "회원 모집 · 연수 · 수업 소식") +
      tile("#/learn/top", "i-trophy", "TOP 10", "", "b", "선생님들이 좋아한 앱·자료 순위") +
      tile("#/about", "i-about", "소개", "", "w", "설립 목적 · 활동 방식 · 함께하기") +
      "</section>" +

      (cur ? sec("지금 하는 연구", "#/projects", "i-projects") + '<div class="now-proj">' + projectCard(cur) + "</div>" : "") +

      sec("자료실", "#/library", "i-library") + homeLibHTML() +

      '<div class="split">' +
      "<section>" + sec("교사 인기 TOP 3", "#/learn/top", "i-trophy") + rankList(S.dormsTop.items, 3) + "</section>" +
      "<section>" + sec("일정 · 공지", "#/notice", "i-calendar") +
      (up.length ? up.slice(0, 1).map(ddayCard).join("") : "") + list(S.notices.slice(0, 2)) + "</section>" +
      "</div>"
    );
  };
  function tile(href, ico, label, num, c, desc) {
    return '<a class="m-tile" data-c="' + c + '" href="' + href + '">' + ic(ico, "lg") +
      '<span class="m-txt"><span class="m-label">' + esc(label) + "</span>" +
      (desc ? '<span class="m-desc">' + esc(desc) + "</span>" : "") + "</span>" +
      (num !== "" ? '<span class="m-count">' + num + "</span>" : "") + "</a>";
  }

  /* 자료실: 교육자료/교사자료 · 흐름(기본)/목록 */
  var filt = { q: "", grade: "", topic: "" };
  var lib = { aud: "edu", view: "flow" };
  try { var lsv = JSON.parse(localStorage.getItem("dew:lib") || "null"); if (lsv) { lib.aud = lsv.aud === "teacher" ? "teacher" : "edu"; lib.view = lsv.view === "list" ? "list" : "flow"; } } catch (e) {}
  function saveLib() { try { localStorage.setItem("dew:lib", JSON.stringify(lib)); } catch (e) {} }
  var AUD = { edu: ["교육자료", "학생과 함께 쓰는 수업 PPT·학습지·참고 자료"], teacher: ["교사자료", "교사가 쓰는 과정안과 연구회원이 만든 웹앱"] };
  function aud(r) { return r.aud || (r.type === "웹앱" || r.type === "교수학습과정안" ? "teacher" : "edu"); }
  function inAud(r) { return !lib.aud || aud(r) === lib.aud; }
  var SVG_GRID = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';
  var SVG_FLOW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="7" y="4" width="10" height="16" rx="2"/><path d="M3 7v10M21 7v10"/></svg>';
  var SVG_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  views["library"] = function () {
    var segs = ["edu", "teacher"].map(function (k) {
      var n = S.resources.filter(function (r) { return aud(r) === k; }).length;
      return '<button type="button" data-aud="' + k + '" aria-pressed="' + (lib.aud === k) + '">' + AUD[k][0] + "<small>" + n + "</small></button>";
    }).join("");
    return (
      head("자료실", "i-library", "r", '<span id="count" aria-live="polite"></span>') +
      '<div class="lib-bar"><div class="lib-seg" role="group" aria-label="자료 구분">' + segs + "</div>" +
      '<div class="lib-act"><button type="button" class="lib-view"></button><button type="button" class="lib-all"></button></div></div>' +
      '<div id="libbody"></div>' +
      '<p class="fine">' + ic("i-source", "sm") + "수업 PPT·학습지: 서산교육지원청 × 연구회 · 웹앱: 연구회원 제작 · 2026 · PPT는 사본을 만들어 고쳐 쓰세요</p>"
    );
  };
  function listHTML() {
    var used = S.topics.concat(["디지털 시민성"]).filter(function (t, i, a) {
      return a.indexOf(t) === i && S.resources.some(function (r) { return inAud(r) && r.topic === t; });
    });
    if (filt.topic && used.indexOf(filt.topic) < 0) filt.topic = "";
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
    return '<div class="filters">' +
      '<div class="field">' + ic("i-search") + '<label for="q" class="vh">자료 검색</label>' +
      '<input id="q" type="search" placeholder="제목·성취기준 (예: 딥페이크, 6도)" value="' + esc(filt.q) + '"></div>' +
      grades + topics + "</div>" +
      '<div class="grid g3" id="reslist"></div>';
  }
  function drawLibrary() {
    var q = filt.q.trim().toLowerCase();
    var arr = S.resources.filter(function (r) {
      return inAud(r) && (!filt.grade || r.grade.indexOf(filt.grade) > -1) &&
        (!filt.topic || r.topic === filt.topic) &&
        (!q || (r.title + " " + r.topic + " " + r.standard + " " + (r.desc || "")).toLowerCase().indexOf(q) > -1);
    });
    document.getElementById("count").textContent = arr.length + "개";
    document.getElementById("reslist").innerHTML = arr.length
      ? arr.map(resCard).join("")
      : '<div class="span-all">' + empty("맞는 자료가 없습니다. 조건을 줄여 보세요.") + "</div>";
  }
  function drawLibBody() {
    var body = document.getElementById("libbody");
    var items = S.resources.filter(inAud);
    var vb = main.querySelector(".lib-view"), all = main.querySelector(".lib-all");
    vb.innerHTML = lib.view === "flow" ? SVG_GRID : SVG_FLOW;
    vb.setAttribute("aria-label", lib.view === "flow" ? "목록으로 보기" : "흐르는 카드로 보기");
    vb.title = vb.getAttribute("aria-label");
    all.innerHTML = (lib.view === "flow" ? "전체 " + items.length + " " + SVG_ARROW : "흐름으로 " + SVG_ARROW);
    main.querySelectorAll(".lib-seg button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.aud === lib.aud); });
    if (lib.view === "flow") {
      body.innerHTML = '<p class="lib-lede">' + (lib.aud ? AUD[lib.aud][1] + " · " : "") + "가운데 카드를 누르면 열립니다 · 끌거나 ← → 로 넘기기</p>" +
        flowHTML(items, lib.aud ? AUD[lib.aud][0] : "자료");
      document.getElementById("count").textContent = items.length + "개";
      bindFlow(body.querySelector(".mg-flow"));
    } else {
      body.innerHTML = listHTML();
      var q = document.getElementById("q");
      q.addEventListener("input", function () { filt.q = q.value; drawLibrary(); });
      body.querySelectorAll(".fchip").forEach(function (b) {
        b.addEventListener("click", function () {
          filt[b.dataset.k] = b.dataset.v;
          body.querySelectorAll('.fchip[data-k="' + b.dataset.k + '"]').forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
          drawLibrary();
        });
      });
      drawLibrary();
    }
  }
  function bindLibrary() {
    main.querySelectorAll(".lib-seg button").forEach(function (b) {
      b.addEventListener("click", function () { lib.aud = b.dataset.aud; saveLib(); drawLibBody(); });
    });
    main.querySelector(".lib-view").addEventListener("click", function () { lib.view = lib.view === "flow" ? "list" : "flow"; saveLib(); drawLibBody(); });
    main.querySelector(".lib-all").addEventListener("click", function () {
      lib.view = lib.view === "flow" ? "list" : "flow"; saveLib(); drawLibBody();
      if (lib.view === "list") { var q = document.getElementById("q"); if (q) q.focus({ preventScroll: true }); }
    });
    drawLibBody();
  }

  /* 첫 화면 자료 블록: 자료실과 같은 탭·흐름, 목록·전체 버튼은 자료실(목록)로 이동 */
  function homeLibHTML() {
    if (!lib.aud) lib.aud = "edu";
    var segs = ["edu", "teacher"].map(function (k) {
      var n = S.resources.filter(function (r) { return aud(r) === k; }).length;
      return '<button type="button" data-aud="' + k + '" aria-pressed="' + (lib.aud === k) + '">' + AUD[k][0] + "<small>" + n + "</small></button>";
    }).join("");
    return '<div class="home-lib"><div class="lib-bar"><div class="lib-seg" role="group" aria-label="자료 구분">' + segs + "</div>" +
      '<div class="lib-act"><a class="lib-view" href="#/library" aria-label="목록으로 보기" title="목록으로 보기">' + SVG_GRID + "</a>" +
      '<a class="lib-all" href="#/library"></a></div></div><div class="hl-body"></div></div>';
  }
  function bindHomeLib(root) {
    var box = root.querySelector(".home-lib");
    if (!box) return;
    function draw() {
      var items = S.resources.filter(inAud);
      box.querySelectorAll(".lib-seg button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.aud === lib.aud); });
      box.querySelector(".lib-all").innerHTML = "전체 " + items.length + " " + SVG_ARROW;
      box.querySelector(".hl-body").innerHTML = '<p class="lib-lede">' + AUD[lib.aud][1] + " · 가운데 카드를 누르면 열립니다 · 끌거나 ← → 로 넘기기</p>" +
        flowHTML(items, AUD[lib.aud][0]);
      bindFlow(box.querySelector(".mg-flow"));
    }
    box.querySelectorAll(".lib-seg button").forEach(function (b) {
      b.addEventListener("click", function () { lib.aud = b.dataset.aud; saveLib(); draw(); });
    });
    box.querySelectorAll(".lib-view, .lib-all").forEach(function (a) {
      a.addEventListener("click", function () { lib.view = "list"; saveLib(); });
    });
    draw();
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
      (u ? '<a class="btn on-b" href="' + esc(u) + '"' + ext(u) + ">가입 신청</a>" : "") + "</div>" +
      (S.site.joinPoster ? '<a class="join-poster" href="' + esc(B + S.site.joinPoster) + '" target="_blank" rel="noopener" title="연구회 가입 QR코드 크게 보기">' +
        '<img src="' + esc(B + S.site.joinPoster) + '" alt="연구회원 모집 안내 · 연구회 가입 QR코드" width="430" height="602" loading="lazy"></a>' : "") +
      "</section>"
    );
  };

  /* 다른 디자인(포털 등)이 홈 화면을 바꿀 수 있게 */
  if (typeof window.HOME_VIEW === "function") {
    var kit = { S: S, B: B, esc: esc, ic: ic, topic: topic, safeUrl: safeUrl, ext: ext, resCard: resCard, flowHTML: flowHTML, bindFlow: bindFlow, homeLibHTML: homeLibHTML, rankList: rankList,
      list: list, ddayCard: ddayCard, upcoming: upcoming, projectCard: projectCard, status: status, linkIcon: linkIcon, linkShort: linkShort };
    views[""] = function () { return window.HOME_VIEW(kit); };
  }

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
    if (page === "" && typeof window.HOME_BIND === "function") window.HOME_BIND(main);
    if (page === "") bindHomeLib(main);
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
    lib.aud = ""; lib.view = "list";
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
