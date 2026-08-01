!(function () {
  "use strict";
  var e = !1,
    t = !1,
    a = {},
    n = {},
    o = {},
    r = { bookmarks: "bookmarks", drawnShapes: "shapes", alertZones: "alertZones" },
    i = ["theme", "alertSound", "sidebarSettings"];
  function s(e, t, a) {
    window.WI_TOAST && "function" == typeof window.WI_TOAST.show && window.WI_TOAST.show(e, t || "info", a || 3e3);
  }
  function c(t, s) {
    if (e) {
      var c = r[t] || t;
      ((-1 === i.indexOf(t) && "worldinfoSettings" !== t) ||
        ((c = "settings"),
        (s = (function () {
          var e = {};
          try {
            e.theme = JSON.parse(localStorage.getItem("WI_theme") || "null");
          } catch (e) {}
          try {
            e.alertSound = JSON.parse(localStorage.getItem("WI_alertSound") || "null");
          } catch (e) {}
          try {
            e.sidebarSettings = JSON.parse(localStorage.getItem("WI_sidebarSettings") || "null");
          } catch (e) {}
          try {
            e.worldinfoSettings = JSON.parse(localStorage.getItem("WORLDINFO_SETTINGS") || "null");
          } catch (e) {}
          return e;
        })())),
        (a[c] = s),
        (o[c] = 0),
        n[c] && clearTimeout(n[c]),
        (n[c] = setTimeout(function () {
          l(c);
        }, 1500)));
    }
  }
  function l(t) {
    if (e) {
      var r = a[t];
      void 0 !== r &&
        fetch("/api/user/data", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ type: t, data: r }) })
          .then(function (t) {
            if (401 === t.status) throw ((e = !1), s("Session expired. Sign in again to sync.", "warning", 4e3), new Error("Unauthorized"));
            if (!t.ok) throw new Error("Save failed");
          })
          .then(function () {
            (delete a[t], delete o[t], console.log("[DataSync] saved", t));
          })
          .catch(function (e) {
            ((o[t] = (o[t] || 0) + 1),
              o[t] < 3 && "Unauthorized" !== e.message
                ? (n[t] = setTimeout(function () {
                    l(t);
                  }, 5e3))
                : (console.warn("[DataSync] Save failed for", t, "— will retry on next change"), delete o[t]));
          });
    }
  }
  ((window.WI_DATA_SYNC = {
    enable: function () {
      ((e = !0), console.log("[DataSync] enabled"));
    },
    disable: function () {
      ((e = !1),
        Object.keys(n).forEach(function (e) {
          clearTimeout(n[e]);
        }),
        (n = {}),
        (a = {}));
    },
    loadFromCloud: function () {
      return fetch("/api/user/data", { credentials: "same-origin" })
        .then(function (e) {
          return e.ok ? e.json() : null;
        })
        .then(function (e) {
          if (e && e.data) {
            var a = [];
            if (e.data.pins && Array.isArray(e.data.pins))
              try {
                (localStorage.setItem("WI_PINS_V2", JSON.stringify(e.data.pins)), a.push("pins"));
              } catch (e) {}
            if (e.data.bookmarks && Array.isArray(e.data.bookmarks))
              try {
                (localStorage.setItem("WI_bookmarks", JSON.stringify(e.data.bookmarks)), a.push("bookmarks"));
              } catch (e) {}
            if (e.data.shapes && Array.isArray(e.data.shapes))
              try {
                (localStorage.setItem("WI_drawnShapes", JSON.stringify(e.data.shapes)), a.push("shapes"));
              } catch (e) {}
            if (e.data.alertZones && Array.isArray(e.data.alertZones))
              try {
                (localStorage.setItem("WI_alertZones", JSON.stringify(e.data.alertZones)), a.push("alertZones"));
              } catch (e) {}
            if (e.data.settings && "object" == typeof e.data.settings) {
              var n = e.data.settings;
              if (n.theme)
                try {
                  localStorage.setItem("WI_theme", JSON.stringify(n.theme));
                } catch (e) {}
              if (void 0 !== n.alertSound)
                try {
                  localStorage.setItem("WI_alertSound", JSON.stringify(n.alertSound));
                } catch (e) {}
              if (n.sidebarSettings)
                try {
                  localStorage.setItem("WI_sidebarSettings", JSON.stringify(n.sidebarSettings));
                } catch (e) {}
              if (n.worldinfoSettings)
                try {
                  localStorage.setItem("WORLDINFO_SETTINGS", JSON.stringify(n.worldinfoSettings));
                } catch (e) {}
              a.push("settings");
            }
            ((t = !0),
              a.length > 0 &&
                (!(function () {
                  if (window.WI_FEATURES && window.WI_FEATURES.BookmarksPanel)
                    try {
                      window.WI_FEATURES.BookmarksPanel.items = JSON.parse(localStorage.getItem("WI_bookmarks") || "[]");
                    } catch (a) {}
                  if (window.WI_FEATURES && window.WI_FEATURES.AlertsPanel)
                    try {
                      ((window.WI_FEATURES.AlertsPanel.zones = JSON.parse(localStorage.getItem("WI_alertZones") || "[]")),
                        "function" == typeof window.WI_FEATURES.AlertsPanel.renderCircles && window.WI_FEATURES.AlertsPanel.renderCircles());
                    } catch (n) {}
                  if (window.WI_FEATURES && window.WI_FEATURES.DrawShapes) {
                    var e = window.WI_FEATURES.DrawShapes;
                    try {
                      (e.shapes &&
                        e.shapes.forEach &&
                        e.shapes.forEach(function (e) {
                          try {
                            (e.shape && window.map && window.map.removeLayer(e.shape), e.label && window.map && window.map.removeLayer(e.label));
                          } catch (e) {}
                        }),
                        (e.shapes = []),
                        (e._loaded = !1),
                        "function" == typeof e._loadFromStorage && e._loadFromStorage());
                    } catch (o) {}
                  }
                  if (window.ALERTS)
                    try {
                      ("function" == typeof window.ALERTS.clearPinMarkers && window.ALERTS.clearPinMarkers(), "function" == typeof window.ALERTS.renderChips && window.ALERTS.renderChips());
                      var t = 0;
                      function r() {
                        window.map && "function" == typeof window.ALERTS.restorePins ? window.ALERTS.restorePins() : ++t < 20 && setTimeout(r, 500);
                      }
                      r();
                    } catch (i) {}
                })(),
                s("Your data has been synced", "success", 2e3)));
          } else t = !0;
        })
        .catch(function (e) {
          console.error("[DataSync] load failed:", e);
        });
    },
    saveDebounced: c,
    savePins: function (e) {
      c("pins", e);
    },
    flushAll: function () {
      e &&
        Object.keys(n).forEach(function (e) {
          (clearTimeout(n[e]), l(e));
        });
    },
    isSyncing: function () {
      return !1;
    },
    isLoaded: function () {
      return t;
    },
    isEnabled: function () {
      return e;
    },
  }),
    window.addEventListener("beforeunload", function () {
      e &&
        Object.keys(a).forEach(function (e) {
          var t = a[e];
          if (void 0 !== t)
            try {
              fetch("/api/user/data", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", keepalive: !0, body: JSON.stringify({ type: e, data: t }) });
            } catch (e) {}
        });
    }),
    console.log("[DataSync] module loaded"));
})();
