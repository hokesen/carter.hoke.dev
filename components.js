(function () {
  var path = window.location.pathname;
  var inBlog = path.indexOf("/blog/") !== -1;
  var prefix = inBlog ? "../" : "";

  var filename = path.split("/").pop() || "index.html";

  // Determine which nav item is active
  var active = "";
  if (filename === "portfolio.html" ||
      filename === "barton.html" ||
      filename === "specter-inspector.html" ||
      filename === "eyes-of-the-forest.html" ||
      filename === "expansive-fantasy-survival.html") {
    active = "Portfolio";
  } else if (filename === "about.html") {
    active = "About";
  } else if (filename === "resume.html") {
    active = "Resume";
  } else if (filename === "dev-blog.html" || inBlog) {
    active = "Dev Blog";
  }

  function navLink(href, label) {
    var aria = label === active ? ' aria-current="page"' : "";
    return '<a href="' + prefix + href + '"' + aria + ">" + label + "</a>";
  }

  function navDropdown(href, label, items) {
    var aria = label === active ? ' aria-current="page"' : "";
    var links = "";
    for (var i = 0; i < items.length; i++) {
      links += '<a href="' + prefix + items[i].href + '">' + items[i].label + "</a>";
    }
    return (
      '<div class="nav-item">' +
        '<a href="' + prefix + href + '"' + aria + ">" + label + ' <span class="nav-chevron">&#9662;</span></a>' +
        '<div class="nav-dropdown">' + links + "</div>" +
      "</div>"
    );
  }

  function initHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    el.innerHTML =
      '<div class="site-shell header-inner">' +
        '<a class="brand" href="' + prefix + 'index.html">' +
          '<span class="brand-title">Carter Hoke</span>' +
          '<span class="brand-subtitle">Dev Blog, Level Design Portfolio</span>' +
        "</a>" +
        '<nav class="nav" aria-label="Main navigation">' +
          navDropdown("portfolio.html", "Portfolio", [
            { href: "eyes-of-the-forest.html", label: "Eyes of the Forest" },
            { href: "barton.html", label: "Barton" },
            { href: "specter-inspector.html", label: "Specter Inspector" },
            { href: "expansive-fantasy-survival.html", label: "Expansive Fantasy Survival" }
          ]) +
          navLink("about.html", "About") +
          navLink("resume.html", "Resume") +
          navDropdown("dev-blog.html", "Dev Blog", [
            { href: "blog/analyzing-scene-compositions-in-barton.html", label: "Analyzing Scene Compositions From Barton" }
          ]) +
        "</nav>" +
      "</div>";
  }

  function initFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    el.innerHTML =
      '<div class="site-shell footer-inner">' +
        "<span>&copy; Carter Hoke</span>" +
        '<div class="footer-contact">' +
          '<span class="footer-contact-label">Contact:</span>' +
          '<div class="footer-contact-links">' +
            '<a href="https://www.linkedin.com/in/carter-hoke-46943325a/" target="_blank" rel="noreferrer">LinkedIn</a>' +
            '<a href="mailto:carterhoke@gmail.com">carterhoke@gmail.com</a>' +
          '</div>' +
        '</div>' +
        '<nav class="footer-links">' +
          '<a href="' + prefix + 'portfolio.html">Portfolio</a>' +
          '<a href="' + prefix + 'about.html">About</a>' +
          '<a href="' + prefix + 'resume.html">Resume</a>' +
          '<a href="' + prefix + 'dev-blog.html">Dev Blog</a>' +
        "</nav>" +
      "</div>";
  }

  function initFadeIn() {
    var els = document.querySelectorAll(".fade-in");
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      els.forEach(function (el) { obs.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initFooter();
    initFadeIn();
  });
})();
