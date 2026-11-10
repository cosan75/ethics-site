/* 디자인 5 · 이미지형 홈: 큰 대표 포스터 + 2×2 포스터 → 수업 자료 표지 줄 → 지난 성과 사진 → 순위·공지 */
(function () {
  "use strict";

  window.HOME_VIEW = function (K) {
    var S = K.S, esc = K.esc, ic = K.ic, B = K.B;

    function head(title, href, more) {
      return '<div class="mg-head"><h2>' + esc(title) + "</h2>" +
        (href ? '<a class="mg-more" href="' + href + '">' + esc(more || "더보기") + ic("i-out", "sm") + "</a>" : "") + "</div>";
    }

    function poster(p, big) {
      return '<a class="mg-poster' + (big ? " big" : "") + '" href="#/projects">' +
        '<img src="' + esc(B + p.img) + '" alt="" loading="' + (big ? "eager" : "lazy") + '">' +
        '<span class="mg-cap">' + K.status(p.status) +
        "<b>" + esc(p.title) + "</b>" +
        (big && p.sub ? "<span>" + esc(p.sub) + "</span>" : "") +
        "<small>" + esc(p.org) + "</small></span></a>";
    }

    var pr = S.projects.filter(function (p) { return p.img; });
    var hero = pr.length
      ? '<section class="mg-hero" aria-label="연구회 프로젝트">' + poster(pr[0], true) +
        '<a class="mg-join" href="' + B + 'img/join-poster.png" target="_blank" rel="noopener" title="연구회 가입 QR코드 크게 보기">' +
        '<img src="' + B + 'img/join-poster.png" alt="디지털윤리교육연구회 연구회원 모집 안내 · 연구회 가입 QR코드" width="430" height="602"></a>' +
        '<div class="mg-quad">' + pr.slice(1, 5).map(function (p) { return poster(p, false); }).join("") + "</div></section>"
      : "";

    var lessons = S.resources.filter(function (r) { return r.cover && r.type === "수업 PPT·학습지"; });
    var covers = '<div class="mg-flow" tabindex="0" role="region" aria-roledescription="carousel" aria-label="수업 자료 표지 (← → 키로 넘기기)">' +
      lessons.map(function (r) {
        var u = r.links && r.links[0] ? K.safeUrl(r.links[0][1]) : "";
        return '<a class="mg-fc" href="' + esc(u || "#/library") + '"' + (u ? K.ext(u) : "") + ' draggable="false">' +
          '<img src="' + esc(B + r.cover) + '" alt="" width="640" height="800" draggable="false">' +
          '<span class="mg-fct"><b>' + esc(r.title) + "</b><small>" + esc(r.grade.join(" · ")) + " · " + esc(r.topic) + "</small></span></a>";
      }).join("") +
      '<button type="button" class="mg-fnav l" aria-label="이전 자료">' + ic("i-out", "sm") + "</button>" +
      '<button type="button" class="mg-fnav r" aria-label="다음 자료">' + ic("i-out", "sm") + "</button>" +
      '<div class="mg-fcount"><span aria-live="polite"></span><button type="button" class="mg-fplay"></button></div>' +
      "</div>";

    var done = S.achievements.filter(function (a) { return a.img; });
    var work = '<div class="mg-work">' + done.map(function (a) {
      return '<a class="mg-photo" href="#/projects"><img src="' + esc(B + a.img) + '" alt="" loading="lazy">' +
        "<span><small>" + a.year + "</small><b>" + esc(a.title) + "</b></span></a>";
    }).join("") + "</div>";

    var T = S.dormsTop;
    var rank = '<ol class="mg-rank">' + T.items.map(function (it, i) {
      return '<li><span class="mg-rn">' + (i + 1) + '</span><a href="' + esc(K.safeUrl(it.url) || "#") + '"' + K.ext(it.url) + ">" + esc(it.title) + "</a></li>";
    }).join("") + "</ol>" +
      '<p class="mg-note">도름스 앱·자료 ' + T.total + "개 중 도름(좋아요) 순 · " + esc(T.checked) + "</p>";

    var up = K.upcoming();
    var news = '<ul class="mg-list">' +
      up.slice(0, 2).map(function (t) {
        return '<li><a href="#/learn/schedule"><span class="mg-tag">' + esc(t.kind) + "</span><span>" + esc(t.title) + "</span></a><small>" + esc(t.date || t.when || "") + "</small></li>";
      }).join("") +
      S.notices.slice(0, 4).map(function (n) {
        return '<li><a href="#/notice"><span class="mg-tag">공지</span><span>' + esc(n.title) + "</span></a><small>" + esc(n.when) + "</small></li>";
      }).join("") + "</ul>";

    return (
      '<h1 class="vh">' + esc(S.site.name) + "</h1>" +
      hero +
      '<section class="mg-sec">' + head("수업 자료", "#/library", "자료실 전체") +
      '<p class="mg-lede">' + esc(S.site.slogan) + " · 표지를 누르면 수업 PPT가 열립니다</p>" + covers + "</section>" +
      '<section class="mg-sec">' + head("지난 성과", "#/projects", "프로젝트 전체") + work + "</section>" +
      '<div class="mg-two">' +
      '<section class="mg-sec">' + head("교사 인기 TOP 10", "#/learn/top") + rank + "</section>" +
      '<section class="mg-sec">' + head("공지 · 연수", "#/notice") + news + "</section>" +
      "</div>"
    );
  };

  /* 수업 자료 표지: 끊김 없이 계속 흐르는 3D 카드 (빛돌 포털 '자연스러운 흐름' 방식)
     마우스를 올리면 천천히 멈추고, 떼면 다시 출발. 끌기·휠·화살표·키보드로도 넘김 */
  window.HOME_BIND = function (main) {
    var flow = main.querySelector(".mg-flow");
    if (!flow) return;
    var cards = [].slice.call(flow.querySelectorAll(".mg-fc")), N = cards.length;
    if (!N) return;
    var cnum = flow.querySelector(".mg-fcount span"), play = flow.querySelector(".mg-fplay");
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var SPEED = 0.35, pos = 0, spd = reduce ? 0 : SPEED, goal = null, auto = !reduce, hover = false, drag = null, moved = false;
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
  };
})();
