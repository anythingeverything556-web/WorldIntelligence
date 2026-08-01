!(function () {
  "use strict";
  var e = null,
    o = !1,
    n = !1,
    t = null,
    i = !1,
    l = 0;
  function r(e, o, n) {
    ((o = o || "info"), (n = n || 3e3), window.WI_TOAST && "function" == typeof window.WI_TOAST.show ? window.WI_TOAST.show(e, o, n) : console.log("[GoogleAuth]", o + ":", e));
  }
  function c() {
    var e = document.getElementById("wi-auth-container");
    e && (e.style.display = "flex");
  }
  function a() {
    var n = document.getElementById("wi-auth-container"),
      i = document.getElementById("wi-google-signin"),
      l = document.getElementById("wi-google-user");
    if (n) {
      if ((c(), t)) {
        var r = document.getElementById("wi-google-avatar"),
          a = document.getElementById("wi-google-name");
        (r &&
          t.picture &&
          ((r.src = t.picture),
          (r.onerror = function () {
            r.style.display = "none";
          }),
          (r.style.display = "")),
          a && t.name && ((a.textContent = t.name), (a.title = t.email)),
          i && (i.style.display = "none"),
          l && (l.style.display = "flex"));
      } else if ((i && (i.style.display = "flex"), l && (l.style.display = "none"), o && e)) console.log("[GoogleAuth] GSI ready — custom button will trigger prompt()");
      else if (!e) {
        var s = document.getElementById("wi-google-signin-btn");
        s && !s.getAttribute("data-fallback") && ((s.style.opacity = "0.5"), (s.style.cursor = "default"), s.setAttribute("data-fallback", "1"));
      }
    } else console.warn("[GoogleAuth] Container element not found");
  }
  function s(e) {
    e && e.credential
      ? fetch("/api/auth/google", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ credential: e.credential }) })
          .then(function (e) {
            return e.ok
              ? e.json()
              : e.json().then(function (e) {
                  throw new Error(e.error || "Sign-in failed");
                });
          })
          .then(function (e) {
            if (!e.user) throw new Error("No user in response");
            ((t = e.user), a(), r("Signed in as " + e.user.email, "success", 2500), window.WI_DATA_SYNC && (window.WI_DATA_SYNC.enable(), window.WI_DATA_SYNC.loadFromCloud()));
          })
          .catch(function (e) {
            (console.error("[GoogleAuth] Sign-in error:", e), r(e.message || "Sign-in failed. Please try again.", "error", 3500));
          })
      : r("Sign-in failed. No credential received.", "error", 3e3);
  }
  function u() {
    fetch("/api/auth/signout", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" } })
      .then(function () {
        ((t = null),
          window.WI_DATA_SYNC && window.WI_DATA_SYNC.disable(),
          navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({ type: "CLEAR_API_CACHE" }),
          a());
        try {
          o && window.google && window.google.accounts && window.google.accounts.id && window.google.accounts.id.disableAutoSelect();
        } catch (e) {}
        var e = document.getElementById("wi-google-signin-btn");
        (e && (e.removeAttribute("data-rendered"), e.removeAttribute("data-fallback"), (e.innerHTML = "")), r("Signed out successfully", "success", 2e3));
      })
      .catch(function (e) {
        (console.error("[GoogleAuth] Sign-out error:", e), r("Sign-out failed. Please try again.", "error", 3e3));
      });
  }
  function d() {
    return (
      l++,
      window.google && window.google.accounts && window.google.accounts.id
        ? (console.log("[GoogleAuth] GSI SDK detected after " + l + " polls"),
          void (function () {
            if (n) return;
            if (!e) return void console.warn("[GoogleAuth] Cannot init GSI — no client ID");
            if (!window.google || !window.google.accounts || !window.google.accounts.id) return void console.warn("[GoogleAuth] Cannot init GSI — SDK not loaded");
            n = !0;
            try {
              (window.google.accounts.id.initialize({ client_id: e, callback: s, auto_select: !1, cancel_on_tap_outside: !0 }),
                (o = !0),
                console.log("[GoogleAuth] GSI SDK initialized with client ID:", e.substring(0, 20) + "..."),
                a());
            } catch (e) {
              (console.error("[GoogleAuth] Failed to initialize GSI:", e), a());
            }
          })())
        : l >= 100
          ? (console.warn("[GoogleAuth] GSI SDK not loaded after 10s — giving up"), void a())
          : void setTimeout(d, 100)
    );
  }
  function g() {
    if (!i) {
      ((i = !0),
        console.log("[GoogleAuth] Initializing..."),
        (function () {
          try {
            (localStorage.removeItem("WI_username"), localStorage.removeItem("WI_jwt_token"));
          } catch (e) {}
        })());
      var o = document.getElementById("wi-google-signout");
      (o &&
        o.addEventListener("click", function (e) {
          (e.stopPropagation(), u());
        }),
        document.addEventListener("click", function (e) {
          var o = document.getElementById("wi-google-user"),
            n = document.getElementById("wi-google-user-menu");
          n && o && !o.contains(e.target) && (n.style.display = "none");
        }),
        fetch("/api/config")
          .then(function (e) {
            if (!e.ok) throw new Error("HTTP " + e.status);
            return e.json();
          })
          .then(function (o) {
            (e = o.googleClientId || null)
              ? console.log("[GoogleAuth] Client ID fetched:", e.substring(0, 20) + "...")
              : console.warn("[GoogleAuth] No googleClientId in /api/config response. Check GOOGLE_CLIENT_ID env var.");
          })
          .catch(function (e) {
            console.error("[GoogleAuth] Failed to fetch config:", e);
          })
          .then(function () {
            return fetch("/api/auth/session", { credentials: "same-origin" })
              .then(function (e) {
                return e.json();
              })
              .then(function (e) {
                e && e.user
                  ? ((t = e.user), console.log("[GoogleAuth] Session found:", t.email), window.WI_DATA_SYNC && (window.WI_DATA_SYNC.enable(), window.WI_DATA_SYNC.loadFromCloud()))
                  : console.log("[GoogleAuth] No active session");
              })
              .catch(function (e) {
                console.warn("[GoogleAuth] Session check failed:", e);
              });
          })
          .then(function () {
            (d(), a());
          })
          .catch(function (e) {
            (console.error("[GoogleAuth] Init error:", e), a());
          }),
        setTimeout(function () {
          document.getElementById("wi-auth-container") &&
            "none" === document.getElementById("wi-auth-container").style.display &&
            (console.warn("[GoogleAuth] Container still hidden after 3s — forcing show"), c(), a());
        }, 3e3));
    }
  }
  ("loading" === document.readyState ? document.addEventListener("DOMContentLoaded", g) : g(),
    (window.WI_GOOGLE_AUTH = {
      signOut: u,
      getCurrentUser: function () {
        return t;
      },
      isSignedIn: function () {
        return !!t;
      },
      init: g,
    }));
})();
