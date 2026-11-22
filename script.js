(function () {
  var S = window.SITE;
  if (!S) return;
  var page = document.body.getAttribute("data-page") || "home";

  /* ---------- helpers ---------- */
  function el(tag, props, kids) {
    var e = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "text") e.textContent = props[k];
      else if (k === "class") e.className = props[k];
      else e.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) {
      if (c == null) return;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }
  function $(id) { return document.getElementById(id); }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
  var domainById = {};
  S.domains.forEach(function (d) { domainById[d.id] = d; });
  function countIn(id) { return S.projects.filter(function (p) { return p.domain === id; }).length; }

  /* ---------- shared header and footer ---------- */
  var NAV = [
    ["Research", "index.html#research", ""],
    ["Projects", "projects.html", "projects"],
    ["Achievements", "achievements.html", "achievements"],
    ["Timeline", "timeline.html", "timeline"],
    ["CV", "cv.html", "cv"],
    ["Contact", "index.html#contact", ""]
  ];
  var links = NAV.map(function (n) {
    var a = el("a", { href: n[1], text: n[0] });
    if (n[2] && n[2] === page) a.setAttribute("aria-current", "page");
    return a;
  });
  var nav = el("nav", { id: "nav-links", "aria-label": "Main" }, links);
  var btn = el("button", { class: "menu-btn", type: "button", "aria-expanded": "false", "aria-controls": "nav-links", text: "Menu" });
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  var head = el("header", { class: "site-head" }, [
    el("div", { class: "wrap bar" }, [el("a", { class: "brand", href: "index.html", text: "Sobia Noor" }), btn, nav])
  ]);
  document.body.insertBefore(el("a", { class: "skip", href: "#main", text: "Skip to content" }), document.body.firstChild);
  document.body.insertBefore(head, document.body.children[1]);

  var foot = el("footer", { class: "site-foot" }, [
    el("div", { class: "wrap" }, [el("span", { text: "© " + new Date().getFullYear() + " Sobia Noor" })])
  ]);
  document.body.appendChild(foot);

  /* ---------- contact links ---------- */
  var LINK_LABEL = { github: "GitHub", linkedin: "LinkedIn", youtube: "YouTube", lablab: "Lablab.ai", x: "X", instagram: "Instagram", facebook: "Facebook" };
  if ($("contact-list")) {
    var user = "sobianoor087", host = "gmail.com";
    var items = [el("li", {}, [el("a", { class: "btn btn-solid", href: "mailto:" + user + "@" + host, text: "Email " + user + "@" + host })])];
    Object.keys(LINK_LABEL).forEach(function (k) {
      if (S.links[k]) items.push(el("li", {}, [el("a", { class: "btn", href: S.links[k], target: "_blank", rel: "noopener", text: LINK_LABEL[k] })]));
    });
    items.forEach(function (i) { $("contact-list").appendChild(i); });
  }

  /* ---------- lightbox ---------- */
  var dlg;
  function openBox(src, alt, caption) {
    if (!dlg) {
      dlg = el("dialog", { class: "lightbox", "aria-label": "Image viewer" });
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
    }
    dlg.textContent = "";
    var close = el("button", { class: "x", type: "button", text: "Close" });
    close.addEventListener("click", function () { dlg.close(); });
    dlg.appendChild(close);
    dlg.appendChild(el("img", { src: src, alt: alt || "" }));
    if (caption) dlg.appendChild(el("p", { class: "cap", text: caption }));
    if (dlg.showModal) dlg.showModal(); else window.open(src, "_blank");
  }

  /* ---------- project rows ---------- */
  var KIND_LABEL = {
    research: "Research project", study: "Study on a public dataset", hackathon: "Hackathon team project",
    workshop: "Workshop", app: "Application", learning: "Learning roadmap", teaching: "Teaching material", prototype: "Prototype"
  };
  function projectRow(p) {
    var d = domainById[p.domain];
    var meta = el("div", { class: "work-meta" }, [
      el("p", { class: "work-domain", text: d ? d.name : "" }),
      el("p", { text: KIND_LABEL[p.kind] || "" }),
      p.data ? el("p", { text: "Data: " + p.data }) : null
    ]);
    var body = el("div", { class: "work-body" }, [
      el("h3", { text: p.title }),
      el("p", { text: p.summary }),
      p.result ? el("p", { class: "finding" }, [el("strong", { text: "Result. " }), p.result]) : null,
      (p.note || p.limits) ? el("p", { class: "finding caveat" }, [el("strong", { text: "Limits. " }), p.note || p.limits]) : null,
      el("p", { class: "tags", text: p.tags.join(", ") }),
      p.url ? el("a", { class: "work-link", href: p.url, target: "_blank", rel: "noopener", text: "Code on GitHub" })
            : el("span", { class: "tags", text: "No public repository" })
    ]);
    return el("article", { class: "work" }, [meta, body]);
  }

  /* ---------- timeline ---------- */
  var TYPE_LABEL = { education: "Education", work: "Work", teaching: "Teaching", hackathon: "Hackathon", competition: "Competition", workshop: "Workshop", milestone: "Milestone" };
  function stepItem(t) {
    return el("li", { class: "step", "data-type": t.type }, [
      el("p", { class: "when", text: t.when }),
      el("h3", { text: t.title }),
      el("p", { class: "org", text: t.org }),
      el("p", { class: "text", text: t.text }),
      t.image ? el("img", { class: "proof", src: t.image, alt: t.imageAlt || "", loading: "lazy" }) : null
    ]);
  }
  function sortedTimeline(newestFirst) {
    var arr = S.timeline.slice().sort(function (a, b) { return a.start < b.start ? -1 : a.start > b.start ? 1 : 0; });
    return newestFirst ? arr.reverse() : arr;
  }

  /* ======================= HOME ======================= */
  if (page === "home") {
    if ($("areas")) {
      S.domains.forEach(function (d) {
        var n = countIn(d.id);
        if (!n) return;
        var name = el("span", { class: "name", text: d.name }, d.primary ? [el("span", { class: "pill", text: "Main focus" })] : []);
        $("areas").appendChild(el("li", {}, [
          el("a", { href: "projects.html#" + d.id }, [name, el("span", { class: "what", text: d.blurb }), el("span", { class: "count", text: plural(n, "project") })])
        ]));
      });
    }
    if ($("featured")) {
      S.projects.filter(function (p) { return p.featured; }).forEach(function (p) { $("featured").appendChild(projectRow(p)); });
    }
    if ($("recent")) {
      sortedTimeline(true).slice(0, 4).forEach(function (t) {
        $("recent").appendChild(el("li", {}, [
          el("span", { class: "when", text: t.when }),
          el("span", { class: "what" }, [t.title, el("span", { text: t.org })])
        ]));
      });
    }
    if ($("facts")) {
      S.skills.forEach(function (s) { $("facts").appendChild(el("dt", { text: s[0] })); $("facts").appendChild(el("dd", { text: s[1] })); });
    }
    if ($("milestones")) {
      S.milestones.forEach(function (m) { $("milestones").appendChild(el("li", { text: m })); });
    }
    initShift();
  }

  /* ---------- distribution-shift demo ---------- */
  function initShift() {
    var svg = $("shift-svg");
    if (!svg) return;
    var NS = "http://www.w3.org/2000/svg";
    var W = 640, H = 240, bottom = 30, top = 18, x0 = -4, x1 = 10;
    function X(v) { return (v - x0) / (x1 - x0) * W; }
    var peak = 1 / Math.sqrt(2 * Math.PI);
    function Y(p) { return H - bottom - (p / peak) * (H - bottom - top); }
    function pdf(x, m) { return Math.exp(-0.5 * (x - m) * (x - m)) / Math.sqrt(2 * Math.PI); }
    function mk(cls) { var p = document.createElementNS(NS, "path"); p.setAttribute("class", cls); svg.appendChild(p); return p; }
    function line() { var l = document.createElementNS(NS, "line"); l.setAttribute("class", "axis"); l.setAttribute("x1", 0); l.setAttribute("x2", W); l.setAttribute("y1", H - bottom); l.setAttribute("y2", H - bottom); svg.appendChild(l); }
    line();
    var pBoth = mk("both"), pTrain = mk("train"), pNew = mk("fresh");
    function curve(fn) {
      var d = "", i, x, n = 160;
      for (i = 0; i <= n; i++) { x = x0 + (x1 - x0) * i / n; d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(fn(x)).toFixed(1); }
      return d;
    }
    function erf(x) { var t = 1 / (1 + 0.3275911 * Math.abs(x)); var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; }
    function overlap(d) { return 1 - erf(Math.abs(d) / (2 * Math.SQRT2)); } // 2*Phi(-d/2)
    var slider = $("shift-range"), out = $("shift-out");
    function draw(d) {
      pTrain.setAttribute("d", curve(function (x) { return pdf(x, 0); }) + "L" + X(x1) + " " + (H - bottom) + "L" + X(x0) + " " + (H - bottom) + "Z");
      pNew.setAttribute("d", curve(function (x) { return pdf(x, d); }) + "L" + X(x1) + " " + (H - bottom) + "L" + X(x0) + " " + (H - bottom) + "Z");
      pBoth.setAttribute("d", curve(function (x) { return Math.min(pdf(x, 0), pdf(x, d)); }) + "L" + X(x1) + " " + (H - bottom) + "L" + X(x0) + " " + (H - bottom) + "Z");
      out.textContent = Math.round(overlap(d) * 100) + "%";
      slider.value = d;
      slider.setAttribute("aria-valuetext", "overlap " + Math.round(overlap(d) * 100) + " percent");
    }
    var target = 3.2, running = false;
    slider.addEventListener("input", function () { running = false; draw(parseFloat(slider.value)); });
    draw(0.2);
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { draw(target); return; }
    // one orchestrated moment: the new network drifts away once when the page loads
    running = true;
    var start = null, from = 0.2, dur = 2600;
    setTimeout(function () {
      if (!running) return;
      requestAnimationFrame(function step(ts) {
        if (!running) return;
        if (start === null) start = ts;
        var k = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - k, 3);
        draw(from + (target - from) * e);
        if (k < 1) requestAnimationFrame(step); else running = false;
      });
    }, 500);
  }

  /* ======================= PROJECTS ======================= */
  if (page === "projects") {
    var active = (location.hash || "").replace("#", "") || "all";
    if (!domainById[active]) active = "all";
    var filters = $("filters");
    var renderProjects = function () {
      var wrap = $("groups");
      wrap.textContent = "";
      S.domains.forEach(function (d) {
        var list = S.projects.filter(function (p) { return p.domain === d.id; });
        if (!list.length || (active !== "all" && active !== d.id)) return;
        wrap.appendChild(el("section", { class: "group", id: d.id }, [
          el("h2", {}, [d.name, el("span", { text: plural(list.length, "project") })]),
          el("p", { class: "muted measure", text: d.blurb }),
          el("div", { class: "works" }, list.map(projectRow))
        ]));
      });
      Array.prototype.forEach.call(filters.children, function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-id") === active); });
    };
    var chip = function (id, label) {
      var c = el("button", { class: "chip", type: "button", "data-id": id, text: label });
      c.addEventListener("click", function () {
        active = id;
        history.replaceState(null, "", id === "all" ? "projects.html" : "#" + id);
        renderProjects();
      });
      return c;
    };
    filters.appendChild(chip("all", "All " + S.projects.length));
    S.domains.forEach(function (d) { if (countIn(d.id)) filters.appendChild(chip(d.id, d.name)); });
    renderProjects();
    window.addEventListener("hashchange", function () {
      var h = (location.hash || "").replace("#", "");
      active = domainById[h] ? h : "all";
      renderProjects();
    });
  }

  /* ======================= TIMELINE ======================= */
  if (page === "timeline") {
    var newest = false, typeFilter = "all";
    var types = ["all"];
    S.timeline.forEach(function (t) { if (types.indexOf(t.type) < 0) types.push(t.type); });
    var renderTimeline = function () {
      var box = $("years");
      box.textContent = "";
      var byYear = {}, order = [];
      sortedTimeline(newest).filter(function (t) { return typeFilter === "all" || t.type === typeFilter; }).forEach(function (t) {
        var y = t.start.slice(0, 4);
        if (!byYear[y]) { byYear[y] = []; order.push(y); }
        byYear[y].push(t);
      });
      order.forEach(function (y) {
        box.appendChild(el("section", { class: "year" }, [el("h2", { text: y }), el("ol", { class: "steps" }, byYear[y].map(stepItem))]));
      });
      Array.prototype.forEach.call($("type-filters").children, function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-id") === typeFilter); });
      $("order-btn").textContent = newest ? "Newest first. Show oldest first" : "Oldest first. Show newest first";
    };
    types.forEach(function (ty) {
      var c = el("button", { class: "chip", type: "button", "data-id": ty },
        ty === "all" ? ["All"] : [el("span", { class: "key", "data-type": ty }, [el("i"), TYPE_LABEL[ty] || ty])]);
      c.addEventListener("click", function () { typeFilter = ty; renderTimeline(); });
      $("type-filters").appendChild(c);
    });
    $("order-btn").addEventListener("click", function () { newest = !newest; renderTimeline(); });
    renderTimeline();
  }

  /* ======================= ACHIEVEMENTS ======================= */
  if (page === "achievements") {
    ["competition", "certificate"].forEach(function (g) {
      var box = $(g === "competition" ? "competitions" : "certificates");
      var all = S.awards.filter(function (a) { return a.group === g; });
      var withImg = all.filter(function (a) { return a.image; });
      var without = all.filter(function (a) { return !a.image; });
      if (withImg.length) {
        box.appendChild(el("div", { class: "gallery" }, withImg.map(function (a) {
          var b = el("button", { type: "button", "aria-label": "Enlarge: " + a.title }, [el("img", { src: a.image, alt: a.imageAlt || a.title, loading: "lazy" })]);
          b.addEventListener("click", function () { openBox(a.image, a.imageAlt || a.title, a.title + ", " + a.issuer + ", " + a.date); });
          return el("figure", { class: "doc" }, [
            b,
            el("figcaption", {}, [
              el("h3", { text: a.title }),
              el("p", { class: "meta", text: a.issuer + ", " + a.date }),
              a.text ? el("p", { text: a.text }) : null,
              a.link ? el("a", { href: a.link, target: "_blank", rel: "noopener", text: a.linkText || "View" }) : null
            ])
          ]);
        })));
      }
      if (without.length) {
        box.appendChild(el("ul", { class: "rows" }, without.map(function (a) {
          return el("li", {}, [
            el("span", { class: "when", text: a.date }),
            el("div", {}, [
              el("h3", { text: a.title }),
              el("p", { class: "meta", text: a.issuer }),
              a.text ? el("p", { text: a.text }) : null,
              a.link ? el("a", { href: a.link, target: "_blank", rel: "noopener", text: a.linkText || "View" }) : null
            ])
          ]);
        })));
      }
    });
  }

  /* ======================= CV ======================= */
  if (page === "cv") {
    $("cv-download").setAttribute("href", S.cv.pdf);
    S.cv.pages.forEach(function (src, i) {
      var b = el("button", { type: "button", "aria-label": "Enlarge CV page " + (i + 1) }, [el("img", { src: src, alt: "CV page " + (i + 1) + " of " + S.cv.pages.length, loading: "lazy" })]);
      b.addEventListener("click", function () { openBox(src, "CV page " + (i + 1), "CV, page " + (i + 1) + " of " + S.cv.pages.length); });
      $("cv-pages").appendChild(b);
    });
  }
})();
