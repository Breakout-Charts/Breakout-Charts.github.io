!(function () {
  "use strict";
  const e = (e, t = !1) => (
    (e = e.trim()),
    t ? [...document.querySelectorAll(e)] : document.querySelector(e)
  );
  window.onload = () => {
    (document.querySelector(".main_content").style.display = "block"),
      (document.querySelector(".loader-screen").style.display = "none"),
      AOS.init({ duration: 1e3, easing: "ease-in-out", once: !0, mirror: !1 });
  };
  const t = (t, o, s, n = !1) => {
      let a = e(o, n);
      a &&
        (n
          ? a.forEach((e) => e.addEventListener(t, s))
          : a.addEventListener(t, s));
    },
    o = (e, t) => {
      e.addEventListener("scroll", t);
    };
  let s = e("#navbar .scrollto", !0);
  const n = () => {
    let t = window.scrollY + 200;
    s.forEach((o) => {
      if (!o.hash) return;
      let s = e(o.hash);
      if (s)
        if (t >= s.offsetTop && t <= s.offsetTop + s.offsetHeight) {
          if ("about" == s.id)
            if (window.counted);
            else {
              [
                new CountUp("twitter-count", 80000, { suffix: "+" }),
                new CountUp("yt-count", 2000, { suffix: "+" }),
                new CountUp("insta-count", 2700, { suffix: "+" }),
                new CountUp("tel-count", 3700, { suffix: "+" }),
              ].map((e) => {
                e.start();
              }),
                (window.counted = !0);
            }
          o.classList.add("active");
        } else o.classList.remove("active");
    });
  };
  window.addEventListener("load", n), o(document, n);
  const a = (t) => {
    let o = e("#header").offsetHeight,
      s = e(t).offsetTop;
    window.scrollTo({ top: s - o, behavior: "smooth" });
  };
  let i = e("#header");
  if (i) {
    const e = () => {
      window.scrollY > 100
        ? i.classList.add("header-scrolled")
        : i.classList.remove("header-scrolled");
    };
    window.addEventListener("load", e), o(document, e);
  }
  t("click", ".mobile-nav-toggle", function (t) {
    e("#navbar").classList.toggle("navbar-mobile"),
      this.classList.toggle("bi-list"),
      this.classList.toggle("bi-x");
  }),
    t(
      "click",
      ".navbar .dropdown > a",
      function (t) {
        e("#navbar").classList.contains("navbar-mobile") &&
          (t.preventDefault(),
          this.nextElementSibling.classList.toggle("dropdown-active"));
      },
      !0
    ),
    t(
      "click",
      ".scrollto",
      function (t) {
        if (e(this.hash)) {
          t.preventDefault();
          let o = e("#navbar");
          if (o.classList.contains("navbar-mobile")) {
            o.classList.remove("navbar-mobile");
            let t = e(".mobile-nav-toggle");
            t.classList.toggle("bi-list"), t.classList.toggle("bi-x");
          }
          a(this.hash);
        }
      },
      !0
    ),
    window.addEventListener("load", () => {
      window.location.hash &&
        e(window.location.hash) &&
        a(window.location.hash);
    });
})(),
  setTimeout(() => {
    document.getElementsByClassName("alert-above")[0].innerHTML = "";
  }, 15e3),
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let t = {},
      o = document.forms.contactForm.elements;
    o[3].disabled = !0;
    for (let e = 0; e < 3; e++) {
      const s = o[e];
      (s.disabled = !0), (t[s.name] = s.value);
    }
    fetch("https://breakout-charts-default-rtdb.firebaseio.com/messages.json", {
      method: "POST",
      body: JSON.stringify(t),
      headers: { "Content-Type": "application/json" },
    })
      .then((e) => {
        Alert("success", "Your Message Was Successfully Sent!"),
          (o[3].disabled = !1);
        for (let e = 0; e < 3; e++) {
          const t = o[e];
          (t.disabled = !1), (t.value = "");
        }
      })
      .catch((e) => {
        Alert("danger", "Something Went Wrong!"), (o[3].disabled = !1);
        for (let e = 0; e < 3; e++) {
          const t = o[e];
          (t.disabled = !1), (t.value = "");
        }
      });
  });
