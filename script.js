(function () {
  var S = window.SITE;
  if (!S) return;

  function el(tag, props, children) {
    var e = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "text") e.textContent = props[k];
      else if (k === "class") e.className = props[k];
      else e.setAttribute(k, props[k]);
    });
    (children || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function $(id) { return document.getElementById(id); }
  var domainById = {};
  S.domains.forEach(function (d) { domainById[d.id] = d; });

  /* ---------- shared ---------- */
  if ($("year")) $("year").textContent = new Date().getFullYear();

  var btn = document.querySelector(".menu-btn");
  var nav = $("nav-links");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  if ($("email-link")) {
    var user = "sobianoor087", host = "gmail.com"; // assembled here to deter scrapers
    $("email-link").href = "mailto:" + user + "@" + host;
  }
  ["github", "linkedin", "youtube"].forEach(function (k) {
    if ($("link-" + k)) $("link-" + k).href = S.links[k];
  });

  /* ---------- cards ---------- */
  var KIND_LABEL = {
    research: "Research project", study: "Public-dataset study", hackathon: "Hackathon · team project",
    workshop: "Workshop", app: "Application", learning: "Learning roadmap", teaching: "Teaching material",
    prototype: "Prototype"
  };
  function projectCard(p) {
    var d = domainById[p.domain];
    var meta = (KIND_LABEL[p.kind] || "") + (p.data ? " · Data: " + p.data : "");
    return el("article", { class: "card" }, [
      el("span", { class: "badge", text: d ? d.name : "" }),
      el("h3", { text: p.title }),
      meta ? el("p", { class: "meta", text: meta }) : null,
      el("p", { text: p.summary }),
      p.result ? el("p", { class: "result", text: "Result: " + p.result }) : null,
      p.limits ? el("p", { class: "result", text: "Limitations: " + p.limits }) : null,
      p.note ? el("p", { class: "result", text: "Limitations: " + p.note }) : null,
      el("ul", { class: "tags" }, p.tags.map(function (t) { return el("li", { text: t }); })),
      p.url
        ? el("a", { class: "more", href: p.url, target: "_blank", rel: "noopener", text: "View on GitHub →" })
        : el("span", { class: "more muted", text: "No public repository" })
    ]);
  }
  function domainCard(d) {
    var count = S.projects.filter(function (p) { return p.domain === d.id; }).length;
    var label = d.status === "exploring" ? "Exploring" : count + (count === 1 ? " project" : " projects");
    return el("article", { class: "card" + (d.primary ? " primary" : "") }, [
      el("span", { class: "badge" + (d.status === "exploring" ? " soft" : ""), text: d.primary ? "Primary focus · " + label : label }),
      el("h3", { text: d.name }),
      el("p", { text: d.blurb }),
      d.status === "projects" ? el("a", { class: "more", href: "projects.html#" + d.id, text: "See projects →" }) : null
    ]);
  }

  /* ---------- timeline ---------- */
  var TYPE_LABEL = { education: "Education", work: "Work", teaching: "Teaching", hackathon: "Hackathon", competition: "Competition", workshop: "Workshop", milestone: "Milestone" };
  function tlItem(t) {
    return el("div", { class: "item", "data-type": t.type }, [
      el("div", { class: "when", text: t.when }),
      el("h3", { text: t.title }),
      el("p", { class: "org", text: t.org }),
      el("p", { class: "text", text: t.text }),
      t.image ? el("img", { class: "proof", src: t.image, alt: t.imageAlt || "", loading: "lazy" }) : null,
      el("span", { class: "type", text: TYPE_LABEL[t.type] || t.type })
    ]);
  }
  function sortedTimeline(newestFirst) {
    var arr = S.timeline.slice().sort(function (a, b) { return a.start < b.start ? -1 : a.start > b.start ? 1 : 0; });
    return newestFirst ? arr.reverse() : arr;
  }

  /* ---------- home ---------- */
  if ($("domain-grid")) {
    S.domains.filter(function (d) { return d.id !== "teaching"; })
      .forEach(function (d) { $("domain-grid").appendChild(domainCard(d)); });
  }
  if ($("featured-grid")) {
    S.projects.filter(function (p) { return p.featured; })
      .forEach(function (p) { $("featured-grid").appendChild(projectCard(p)); });
  }
  if ($("recent-timeline")) {
    sortedTimeline(true).slice(0, 4).forEach(function (t) { $("recent-timeline").appendChild(tlItem(t)); });
  }
  if ($("skills")) {
    S.skills.forEach(function (s) {
      $("skills").appendChild(el("dt", { text: s[0] }));
      $("skills").appendChild(el("dd", { text: s[1] }));
    });
  }
  if ($("milestones")) {
    S.milestones.forEach(function (m) { $("milestones").appendChild(el("li", { text: m })); });
  }

  /* ---------- projects page ---------- */
  if ($("project-groups")) {
    var active = (location.hash || "").replace("#", "") || "all";
    var filters = $("filters");

    function renderProjects() {
      var wrap = $("project-groups");
      wrap.textContent = "";
      S.domains.forEach(function (d) {
        var items = S.projects.filter(function (p) { return p.domain === d.id; });
        if (!items.length) return;
        if (active !== "all" && active !== d.id) return;
        var sec = el("section", { class: "group", id: d.id }, [
          el("h2", {}, [document.createTextNode(d.name), el("small", { text: items.length + (items.length === 1 ? " project" : " projects") })]),
          el("p", { class: "muted", text: d.blurb }),
          el("div", { class: "grid" }, items.map(projectCard))
        ]);
        wrap.appendChild(sec);
      });
      Array.prototype.forEach.call(filters.children, function (c) {
        c.setAttribute("aria-pressed", c.getAttribute("data-id") === active);
      });
    }
    function chip(id, label) {
      var c = el("button", { class: "chip", type: "button", "data-id": id, text: label });
      c.addEventListener("click", function () {
        active = id;
        history.replaceState(null, "", id === "all" ? "projects.html" : "#" + id);
        renderProjects();
      });
      return c;
    }
    filters.appendChild(chip("all", "All"));
    S.domains.forEach(function (d) {
      if (S.projects.some(function (p) { return p.domain === d.id; })) filters.appendChild(chip(d.id, d.name));
    });
    renderProjects();

    var exploring = S.domains.filter(function (d) { return d.status === "exploring"; });
    if (exploring.length && $("exploring")) {
      $("exploring-wrap").hidden = false;
      exploring.forEach(function (d) {
        $("exploring").appendChild(el("article", { class: "card" }, [
          el("span", { class: "badge soft", text: "Exploring" }),
          el("h3", { text: d.name }),
          el("p", { text: d.blurb })
        ]));
      });
    }
  }

  /* ---------- timeline page ---------- */
  if ($("full-timeline")) {
    var newest = false, typeFilter = "all";
    function renderTimeline() {
      var box = $("full-timeline");
      box.textContent = "";
      sortedTimeline(newest)
        .filter(function (t) { return typeFilter === "all" || t.type === typeFilter; })
        .forEach(function (t) { box.appendChild(tlItem(t)); });
      Array.prototype.forEach.call($("type-filters").children, function (c) {
        c.setAttribute("aria-pressed", c.getAttribute("data-id") === typeFilter);
      });
      $("order-btn").textContent = newest ? "Showing newest first. Switch to oldest first" : "Showing oldest first. Switch to newest first";
    }
    var types = ["all"];
    S.timeline.forEach(function (t) { if (types.indexOf(t.type) < 0) types.push(t.type); });
    types.forEach(function (ty) {
      var c = el("button", { class: "chip", type: "button", "data-id": ty, text: ty === "all" ? "All" : TYPE_LABEL[ty] || ty });
      c.addEventListener("click", function () { typeFilter = ty; renderTimeline(); });
      $("type-filters").appendChild(c);
    });
    $("order-btn").addEventListener("click", function () { newest = !newest; renderTimeline(); });
    renderTimeline();
  }
})();
