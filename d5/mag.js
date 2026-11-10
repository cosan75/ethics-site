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
      '<section class="mg-sec">' + head("자료실", "#/library", "자료실 전체") + K.homeLibHTML() + "</section>" +
      '<section class="mg-sec">' + head("지난 성과", "#/projects", "프로젝트 전체") + work + "</section>" +
      '<div class="mg-two">' +
      '<section class="mg-sec">' + head("교사 인기 TOP 10", "#/learn/top") + rank + "</section>" +
      '<section class="mg-sec">' + head("공지 · 연수", "#/notice") + news + "</section>" +
      "</div>"
    );
  };

  /* 첫 화면 자료 블록(탭·흐름)은 공용 app.js가 연결 */
})();
