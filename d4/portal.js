/* 디자인 4 · 포털형 홈: 동그라미 바로가기 → 자료실(교육자료/교사자료 탭 + 흐르는 카드, 전체 폭) → 본문 + 오른쪽 위젯 */
(function () {
  "use strict";
  var K;

  function box(title, href, ico, inner, extra) {
    return '<section class="pt-box' + (extra ? " " + extra : "") + '"><div class="pt-head"><h2>' + K.ic(ico, "sm") + K.esc(title) + "</h2>" +
      (href ? '<a class="pt-more" href="' + href + '">더보기' + K.ic("i-out", "sm") + "</a>" : "") + "</div>" + inner + "</section>";
  }

  window.HOME_VIEW = function (kit) {
    K = kit;
    var S = K.S, esc = K.esc, ic = K.ic;

    var shortcuts = [
      ["#/library", "i-library", "자료실", "r"], ["#/projects", "i-projects", "프로젝트", "y"],
      ["#/learn/start", "i-play", "시작하기", "b"], ["#/learn/schedule", "i-calendar", "연수", "g"],
      ["#/learn/top", "i-trophy", "TOP 10", "y"], ["#/notice", "i-notice", "공지", "r"],
      ["#/learn/links", "i-link", "꿀 링크", "b"], ["#/about", "i-about", "소개", "g"]
    ];
    var news = '<ul class="pt-news">' + S.projects.slice(0, 4).map(function (p) {
      var t = K.topic(p.topic);
      return '<li><a href="#/projects">' +
        (p.img ? '<img src="' + esc(K.B + p.img) + '" alt="" loading="lazy">' : '<span class="pt-thumb" data-c="' + t[1] + '">' + ic(t[0]) + "</span>") +
        '<span class="pt-news-t"><b>' + esc(p.title) + "</b><small>" + esc(p.org) + "</small>" + K.status(p.status) + "</span></a></li>";
    }).join("") + "</ul>";

    var T = S.dormsTop;
    var rank = '<ol class="pt-rank">' + T.items.map(function (it, i) {
      return '<li><span class="pt-rn' + (i < 3 ? " hi" : "") + '">' + (i + 1) + '</span><a href="' + esc(K.safeUrl(it.url) || "#") + '"' + K.ext(it.url) + ">" + esc(it.title) + '</a><span class="pt-dorm">' + ic("i-heart", "sm") + it.dorm + "</span></li>";
    }).join("") + "</ol>" +
      '<p class="pt-note">도름스 앱·자료 ' + T.total + "개 중 도름(좋아요) 순 · " + esc(T.checked) + "</p>";

    var up = K.upcoming()[0];
    var dday = up
      ? '<div class="pt-dday"><span class="pt-dd">' + (up.date ? "D-" + Math.max(0, Math.round((new Date(up.date) - new Date(new Date().toDateString())) / 86400000)) : ic("i-calendar")) + "</span>" +
        '<div><small>' + esc(up.kind) + "</small><b>" + esc(up.title) + "</b><span>" + esc(up.date ? up.place : up.when || "") + "</span></div></div>"
      : '<p class="pt-note">예정된 일정이 없습니다.</p>';

    var notices = '<ul class="pt-list">' + S.notices.slice(0, 4).map(function (n) {
      return '<li><a href="#/notice">' + (n.pin ? ic("i-pin", "sm") : "") + "<span>" + esc(n.title) + "</span></a><small>" + esc(n.when) + "</small></li>";
    }).join("") + "</ul>";

    var links = '<ul class="pt-list">' + S.links.map(function (l) {
      return '<li><a href="' + esc(K.safeUrl(l.url) || "#") + '"' + K.ext(l.url) + "><span>" + esc(l.title) + "</span>" + ic("i-out", "sm") + "</a></li>";
    }).join("") + "</ul>";

    var info = '<section class="pt-box pt-info">' +
      '<div class="pt-me"><img src="' + K.B + 'img/logo.png" alt="" width="56" height="57"><div><b>' + esc(S.site.name) + "</b><small>" + esc(S.site.badge) + "</small></div></div>" +
      '<div class="pt-stats"><span><b>' + esc(String(S.site.members).replace(/\D/g, "")) + "</b>회원</span><span><b>" + S.resources.length + "</b>자료</span><span><b>" + S.projects.length + "</b>프로젝트</span></div>" +
      '<a class="pt-cta" href="#/library">' + ic("i-library", "sm") + "수업 자료 보러 가기</a></section>";

    return (
      '<p class="pt-slogan">' + esc(S.site.slogan) + "</p>" +
      '<nav class="pt-short" aria-label="바로가기">' + shortcuts.map(function (s) {
        return '<a href="' + s[0] + '"><span class="pt-circ" data-c="' + s[3] + '">' + ic(s[1]) + "</span><span>" + s[2] + "</span></a>";
      }).join("") + "</nav>" +
      box("자료실", "#/library", "i-library", K.homeLibHTML(), "pt-wide") +
      '<div class="pt-body"><div class="pt-main">' +
      box("연구회 소식", "#/projects", "i-projects", news) +
      box("교사 인기 TOP 10", "#/learn/top", "i-trophy", rank) +
      '</div><aside class="pt-side" aria-label="연구회 안내">' + info +
      box("다가오는 일정", "#/learn/schedule", "i-calendar", dday) +
      box("공지", "#/notice", "i-notice", notices) +
      box("꿀 링크", "#/learn/links", "i-link", links) +
      "</aside></div>"
    );
  };

  /* 자료실 블록(탭·흐름)은 공용 app.js가 연결 */
})();
