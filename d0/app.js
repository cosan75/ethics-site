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
  var MARK = "../img/logo.png";
  /* 페이지별 아이콘 (선 아이콘, 직접 그림) */
  var ICONS = {
    library: '<path d="M2 5.5C4.5 4 7.5 4 12 6.5c4.5-2.5 7.5-2.5 10-1v13c-2.5-1.5-5.5-1.5-10 1-4.5-2.5-7.5-2.5-10-1z"/><path d="M12 6.5v13"/>',
    projects: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    learn: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.2V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.8"/><path d="M22 9v6"/>',
    notice: '<path d="M3 10v4h3l7 5V5L6 10z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19.5 6a8.5 8.5 0 0 1 0 12"/>',
    about: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16 14.2c3 .2 5 2.6 5 5.8"/>'
  };
  function icon(name) {
    return '<span class="ph-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + "</svg></span>";
  }
  function head(title, lead, ico) {
    return (
      '<header class="ph">' + icon(ico) +
      "<div><h1>" + esc(title) + "</h1>" + (lead ? '<p class="lead">' + esc(lead) + "</p>" : "") + "</div></header>"
    );
  }
  function empty(text) {
    return '<div class="empty"><img src="' + MARK + '" alt="" width="40" height="41"><span>' + esc(text) + "</span></div>";
  }

  /* 사업 이미지 카드 (프로젝트·성과 공통) */
  function bizCard(x) {
    var tag = x.status ? statusTag(x.status) : '<span class="tag">' + esc(x.year) + "년</span>";
    return (
      '<figure class="biz">' +
      '<div class="biz-img"><img src="' + esc("../" + x.img) + '" alt="' + esc(x.title) + ' 표지 이미지" loading="lazy"></div>' +
      "<figcaption>" + tag +
      "<b>" + esc(x.title) + "</b>" +
      '<span class="muted">' + esc(x.org || x.desc || "") + "</span></figcaption></figure>"
    );
  }
  function bizItems() {
    return S.projects.filter(function (p) { return p.img; })
      .concat(S.achievements.filter(function (a) { return a.img; }));
  }

  /* 도름스 인기 순위 */
  function rankList(items, max) {
    var top = items[0] ? items[0].dorm : 1;
    return (
      '<ol class="rank">' +
      items.map(function (it, i) {
        return (
          '<li><span class="rk' + (i < 3 ? " hi" : "") + '">' + (i + 1) + "</span>" +
          '<a class="rk-body" href="' + esc(safeUrl(it.url) || "#") + '"' + ext(it.url) + ">" +
          "<b>" + esc(it.title) + ' <span aria-hidden="true">↗</span></b>' +
          '<span class="muted">' + esc(it.desc) + "</span>" +
          '<span class="rk-meta"><span class="tag">' + esc(it.cat) + "</span> @" + esc(it.by) + "</span></a>" +
          '<span class="rk-num"><b>' + it.dorm + '</b><small>도름</small><span class="bar" style="width:' + Math.round(it.dorm / top * 100) + '%"></span></span>' +
          "</li>"
        );
      }).slice(0, max || items.length).join("") +
      "</ol>"
    );
  }
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
      '<article class="card' + (p.img ? " has-img" : "") + '">' +
      (p.img ? '<div class="pc-img"><img src="' + esc("../" + p.img) + '" alt="' + esc(p.title) + ' 이미지" loading="lazy"></div>' : "") +
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
      (r.shot ? (function () { var u = r.links && r.links[0] ? safeUrl(r.links[0][1]) : ""; var im = '<img src="../' + esc(r.shot) + '" alt="' + esc(r.title) + ' 화면" loading="lazy" width="800" height="500">'; return u ? '<a class="res-shot" href="' + esc(u) + '"' + ext(u) + ' tabindex="-1">' + im + "</a>" : '<span class="res-shot">' + im + "</span>"; })() : "") +
      '<span class="res-type">' + esc(r.type) + (r.standard ? ' · <span title="관련 성취기준">' + esc(r.standard) + "</span>" : "") + "</span>" +
      "<h3>" + esc(r.title) + "</h3>" +
      (r.desc ? '<p class="res-desc">' + esc(r.desc) + "</p>" : "") +
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
      (u ? '<a class="btn primary" style="align-self:flex-start;margin-top:10px" href="' + esc(u) + '"' + ext(u) + ">가입 신청하기</a>" : "") +
      (S.site.joinPoster ? '<a class="join-poster" href="../' + esc(S.site.joinPoster) + '" target="_blank" rel="noopener" title="연구회 가입 QR코드 크게 보기">' +
        '<img src="../' + esc(S.site.joinPoster) + '" alt="연구회원 모집 안내 · 연구회 가입 QR코드" width="430" height="602" loading="lazy"></a>' : "");
  }

  /* ---------- 화면 ---------- */
  var views = {};

  views[""] = function () {
    var cur = S.projects[0];
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
      '<div class="row"><h2 class="mk">연구회 사업 한눈에</h2><a class="more" href="#/projects">프로젝트 전체 →</a></div>' +
      '<div class="biz-strip">' + bizItems().map(bizCard).join("") + "</div>" +
      '<div class="row"><h2 class="mk">자료실</h2><a class="more" href="#/library">자료실 전체 →</a></div>' + homeLibHTML() +
      '<div class="row"><h2 class="mk">교사들이 많이 찾은 자료 TOP 10</h2><a class="more" href="#/learn/top">순위 전체 →</a></div>' +
      '<div class="card top-teaser"><p class="muted" style="margin:0 0 8px;font-size:14px">교사 커뮤니티 도름스(dorms.school) 앱·자료 ' + S.dormsTop.total + "개 가운데 ‘도름(좋아요)’을 가장 많이 받은 순서 · " + esc(S.dormsTop.checked) + " 기준</p>" +
      rankList(S.dormsTop.items, 3) + "</div>" +
      '<div class="grid g2" style="margin-top:8px">' +
      "<section>" +
      '<div class="row"><h2>다가오는 일정</h2><a class="more" href="#/learn/schedule">일정 전체 →</a></div>' +
      '<div class="grid">' + (up.length ? up.map(ddayCard).join("") : empty("예정된 일정이 없습니다.")) + "</div>" +
      "</section>" +
      "<section>" +
      '<div class="row"><h2>공지</h2><a class="more" href="#/notice">전체 →</a></div>' +
      list(S.notices.slice(0, 3)) +
      "</section></div>"
    );
  };

  /* 자료실: 교육자료/교사자료 · 흐르는 카드(기본)/목록 — 디자인 1~5와 같은 동작 */
  function flowCard(r) {
    var u = r.links && r.links[0] ? safeUrl(r.links[0][1]) : "";
    var app = r.type === "웹앱";
    var desc = r.desc || (r.grade.join(" · ") + (r.standard ? " · 성취기준 " + r.standard : "") + " · " + r.type);
    var open = app ? "웹앱 열기 ↗" : r.links && r.links.length > 1 ? "PPT·학습지 열기 ↗" : r.links && r.links[0] ? r.links[0][0] + " 열기 ↗" : "열기 ↗";
    return '<a class="mg-fc" href="' + esc(u || "#/library") + '"' + (u ? ext(u) : "") + ' draggable="false">' +
      '<img src="../' + esc(r.wide || r.shot || r.cover) + '" alt="" width="800" height="500" draggable="false">' +
      '<span class="mg-fb"><span class="mg-fbadge">' + esc(app ? "웹앱" : r.topic) + "</span>" +
      '<b class="mg-ft">' + esc(r.title) + "</b>" +
      '<span class="mg-fp">' + esc(desc) + "</span>" +
      '<span class="mg-ff"><span>' + esc(r.grade.join(" · ")) + "</span><span>" + open + "</span></span></span></a>";
  }
  function flowHTML(items, label) {
    return '<div class="mg-flow" tabindex="0" role="region" aria-roledescription="carousel" aria-label="' + esc(label) + ' (← → 키로 넘기기)">' +
      items.map(flowCard).join("") +
      '<button type="button" class="mg-fnav l" aria-label="이전">‹</button>' +
      '<button type="button" class="mg-fnav r" aria-label="다음">›</button>' +
      '<div class="mg-fcount"><span aria-live="polite"></span><button type="button" class="mg-fplay"></button></div></div>';
  }
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
      head("자료실", "연구회가 서산교육지원청과 함께 만든 수업 자료와 연구회원이 만든 웹앱입니다. 수업 PPT는 사본을 만들어 우리 반에 맞게 고쳐 쓰세요.", "library") +
      '<div class="lib-bar"><div class="lib-seg" role="group" aria-label="자료 구분">' + segs + "</div>" +
      '<div class="lib-act"><button type="button" class="lib-view"></button><button type="button" class="lib-all"></button></div></div>' +
      '<div id="libbody"></div>'
    );
  };
  function listHTML() {
    var used = S.topics.filter(function (t) { return S.resources.some(function (r) { return inAud(r) && r.topic === t; }); });
    if (filt.topic && used.indexOf(filt.topic) < 0) filt.topic = "";
    function chips(key, arr) {
      return ['<button type="button" class="fchip" data-k="' + key + '" data-v="" aria-pressed="' + (filt[key] === "") + '">전체</button>']
        .concat(arr.map(function (v) {
          return '<button type="button" class="fchip" data-k="' + key + '" data-v="' + esc(v) + '" aria-pressed="' + (filt[key] === v) + '">' + esc(v) + "</button>";
        })).join("");
    }
    return '<div class="filters">' +
      '<label for="q" class="vh">자료 검색</label>' +
      '<input id="q" class="search" type="search" placeholder="제목·성취기준으로 찾기 (예: 딥페이크, 6도)" value="' + esc(filt.q) + '">' +
      '<div class="fgroup" role="group" aria-label="학년군"><span class="lbl">학년</span>' + chips("grade", S.grades) + "</div>" +
      '<div class="fgroup" role="group" aria-label="주제"><span class="lbl">주제</span>' + chips("topic", used) + "</div>" +
      "</div>" +
      '<p class="count" id="count" aria-live="polite"></p>' +
      '<div class="grid g3" id="reslist"></div>';
  }
  function drawLibrary() {
    var q = filt.q.trim().toLowerCase();
    var arr = S.resources.filter(function (r) {
      return inAud(r) && (!filt.grade || r.grade.indexOf(filt.grade) > -1) &&
        (!filt.topic || r.topic === filt.topic) &&
        (!q || (r.title + " " + r.topic + " " + r.standard + " " + (r.desc || "")).toLowerCase().indexOf(q) > -1);
    });
    document.getElementById("count").textContent = "자료 " + arr.length + "개";
    document.getElementById("reslist").innerHTML = arr.length
      ? arr.map(resCard).join("")
      : '<div style="grid-column:1/-1">' + empty("조건에 맞는 자료가 아직 없습니다. 필터를 줄여 보세요.") + "</div>";
  }
  function drawLibBody() {
    var body = document.getElementById("libbody");
    var items = S.resources.filter(inAud);
    var vb = main.querySelector(".lib-view"), all = main.querySelector(".lib-all");
    vb.innerHTML = lib.view === "flow" ? SVG_GRID : SVG_FLOW;
    vb.setAttribute("aria-label", lib.view === "flow" ? "목록으로 보기" : "흐르는 카드로 보기");
    vb.title = vb.getAttribute("aria-label");
    all.innerHTML = lib.view === "flow" ? "전체 " + items.length + " " + SVG_ARROW : "흐름으로 " + SVG_ARROW;
    main.querySelectorAll(".lib-seg button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.aud === lib.aud); });
    if (lib.view === "flow") {
      body.innerHTML = '<p class="lib-lede">' + (lib.aud ? AUD[lib.aud][1] + " · " : "") + "가운데 카드를 누르면 열립니다 · 끌거나 ← → 로 넘기기</p>" +
        flowHTML(items, lib.aud ? AUD[lib.aud][0] : "자료");
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
    function flip() { lib.view = lib.view === "flow" ? "list" : "flow"; saveLib(); drawLibBody(); }
    main.querySelector(".lib-view").addEventListener("click", flip);
    main.querySelector(".lib-all").addEventListener("click", flip);
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
    var years = {};
    S.achievements.forEach(function (a) { (years[a.year] = years[a.year] || []).push(a); });
    var ys = Object.keys(years).sort(function (a, b) { return b - a; });
    return (
      head("프로젝트", "2026년 연구회가 하고 있는 연구와 사업, 그리고 지난 성과입니다.", "projects") +
      '<div class="grid g2">' + S.projects.map(projectCard).join("") + "</div>" +
      '<div class="row"><h2 class="mk">지난 성과</h2></div>' +
      '<div class="biz-grid">' + S.achievements.filter(function (a) { return a.img; }).map(bizCard).join("") + "</div>" +
      ys.map(function (y) {
        return '<h3 class="yr">' + y + "년</h3>" +
          list(years[y].map(function (a) { return { when: a.year, title: a.title, body: a.desc }; }));
      }).join("")
    );
  };

  /* 연수·배우기 */
  var learnTabs = [["start", "시작하기"], ["schedule", "연수·모임"], ["top", "인기 TOP 10"], ["links", "꿀 링크"]];
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
        '<div class="grid g2">' + (up.length ? up.map(ddayCard).join("") : empty("예정된 일정이 없습니다.")) + "</div>" +
        '<h2 style="margin-top:32px">지난 연수 돌아보기</h2>' +
        (ps.length ? list(ps.map(function (t) {
          return { when: t.date.replace(/-/g, "."), title: t.title, body: [t.recap, t.place].filter(Boolean).join(" · ") };
        })) : empty("아직 지난 연수가 없습니다."));
    } else if (cur === "top") {
      var T = S.dormsTop;
      body =
        '<p class="muted">교사 커뮤니티 <a href="' + esc(T.source) + '" target="_blank" rel="noopener noreferrer">도름스(dorms.school)</a> 앱·자료 ' + T.total +
        "개 가운데 ‘도름(좋아요)’을 가장 많이 받은 10개입니다. 도름스는 조회수를 공개하지 않아 도름 수를 인기 지표로 썼습니다. (" + esc(T.checked) + " 기준)</p>" +
        rankList(T.items) +
        '<h2 class="mk" style="margin-top:32px">순위에서 배운 점, 우리 사이트에 가져온 것</h2>' +
        '<div class="lessons">' + T.lessons.map(function (l, i) {
          return '<div class="lesson"><span class="ln">' + (i + 1) + '</span><div><p class="see">' + esc(l.see) + '</p><p class="take">→ ' + esc(l.take) + "</p></div></div>";
        }).join("") + "</div>";
    } else {
      body = '<div class="grid g3">' + S.links.map(function (l) {
        return '<a class="card" href="' + esc(safeUrl(l.url) || "#") + '"' + ext(l.url) + '><span class="tag topic" style="align-self:flex-start">' + esc(l.cat) + "</span><h3>" + esc(l.title) + ' ↗</h3><span class="muted" style="font-size:15px">' + esc(l.desc) + "</span></a>";
      }).join("") + "</div>";
    }
    return (
      head("연수·배우기", "디지털 윤리 수업이 처음인 선생님부터 연구회 정기 연수까지.", "learn") +
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
    return head("공지", "연구회 소식과 모집 안내입니다.", "notice") + list(arr);
  };

  /* 소개 */
  views["about"] = function () {
    return (
      '<div class="about-head">' + icon("about") +
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
    if (page === "") bindHomeLib(main);
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
