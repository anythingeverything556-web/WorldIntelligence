function safeExecute(e, t) {
  try {
    return e();
  } catch (e) {
    return (LOG.error("Error in " + t, e), null);
  }
}
((window.LOG = {
  debug: function (e, t) {
    window.location.search.indexOf("debug=1") > -1 && console.log("[WorldIntelligence:DEBUG]", e, t || "");
  },
  info: function (e, t) {
    console.log("[WorldIntelligence:INFO]", e, t || "");
  },
  warn: function (e, t) {
    console.warn("[WorldIntelligence:WARN]", e, t || "");
  },
  error: function (e, t) {
    console.error("[WorldIntelligence:ERROR]", e, t);
  },
  perf: function (e, t) {
    console.log("[WorldIntelligence:PERF]", e, t + "ms");
  },
  network: function (e, t) {
    console.log("[WorldIntelligence:NETWORK]", e, t);
  },
}),
  (window.onerror = function (e, t, n, i, a) {
    return (LOG.error("Global error", { message: e, url: t, line: n, column: i, error: a }), !1);
  }),
  (window.PANELS = [
    {
      category: "Core",
      items: [
        "Global Situation",
        "Live News",
        "Live Webcams",
        "Windy Live Webcam",
        "Intel Feed",
        "Live Intelligence",
        "Infrastructure Cascade",
        "Force Posture",
        "Escalation Monitor",
        "Economic Warfare",
        "Disaster Cascade",
      ],
    },
    { category: "World News", items: ["United States", "Europe", "Middle East", "Africa", "Latin America", "Asia-Pacific"] },
    { category: "Energy & Resources", items: ["Energy Complex", "Oil Inventories"] },
    {
      category: "Intelligence",
      items: [
        "Country Instability",
        "Strategic Risk Overview",
        "Israel Sirens",
        "Telegram Intel",
        "Airline Intelligence",
        "Tech Readiness Index",
        "Global Debt Clock",
        "Cross-Source Signals",
        "Geopolitical Hubs",
        "Hot Tech Hubs",
      ],
    },
    { category: "Markets", items: ["Commodities", "Central Banks & Econ", "Prices & Markets", "Economy & Trade", "Metals & Materials"] },
    {
      category: "Data & Tracking",
      items: [
        "Fires",
        "BTC Regime",
        "Fear & Greed",
        "AAII Sentiment",
        "Market Breadth",
        "Macro Indicators",
        "Financial Stress",
        "Yield Curve",
        "Earnings Calendar",
        "Economic Calendar",
        "COT Positioning",
        "Liquidity Shifts",
        "Gold Intelligence",
        "Hormuz Trade Tracker",
        "Energy Crisis Tracker",
        "Gulf Economies",
        "Consumer Prices",
        "Grocery Index",
        "Real Big Mac Index",
        "Fuel Prices",
        "FAO Food Price Index",
        "BTC ETF Tracker",
        "Stablecoins",
        "Armed Conflict Events",
        "Disease Outbreaks",
        "Social Velocity",
        "Global Giving",
        "UNHCR Displacement",
        "Climate Anomalies",
        "Climate News",
        "Population Exposure",
        "Security Advisories",
        "Sanctions Pressure",
        "R&D Signal",
        "Radiation Watch",
        "Thermal Escalation",
        "World Clock",
      ],
    },
    { category: "Good News Feed", items: ["Human Progress", "Live Counters", "Today's Hero", "Breakthroughs", "5 Good Things", "Conservation Wins", "Renewable Energy"] },
    { category: "Commodity News", items: ["Gold & Silver", "Mining News", "Critical Minerals", "Base Metals", "Mining Companies"] },
    {
      category: "Regulation & Policy",
      items: [
        "Regulation & Policy",
        "GCC Investments",
        "Startups & VC",
        "VC Insights & Essays",
        "Global Startup News",
        "Unicorn Tracker",
        "Accelerators & Demo Days",
        "Cybersecurity",
        "Semiconductors & Hardware",
        "Cloud & Infrastructure",
        "Developer Community",
        "GitHub Trending",
        "IPO & SPAC",
        "Funding & VC",
        "Product Hunt",
        "Tech Events",
        "Service Status",
      ],
    },
    {
      category: "Markets News",
      items: [
        "Markets News",
        "Forex & Currencies",
        "Fixed Income",
        "Commodities News",
        "Crypto News",
        "Crypto Sectors",
        "DeFi Tokens",
        "Alt Tokens",
        "Central Bank Watch",
        "Economic News",
        "Derivatives & Options",
        "Fintech & Trading Tech",
        "Hedge Funds & PE",
        "Market Analysis",
        "GCC Business News",
        "Internet Disruptions",
        "Financial Regulation",
      ],
    },
  ]),
  (window.SOURCES = [
    {
      region: "Worldwide",
      sources: [
        "Reuters",
        "BBC World News",
        "Associated Press",
        "AFP",
        "Bloomberg",
        "Al Jazeera",
        "CNN International",
        "DW News",
        "France 24",
        "Sky News",
        "Euronews",
        "CNBC International",
        "The Economist",
        "Financial Times",
        "Time Magazine",
        "Newsweek",
        "United Nations News",
        "World Bank Data",
        "IMF News",
        "WHO Updates",
      ],
    },
    {
      region: "US",
      sources: [
        "ABC News",
        "CBS News",
        "NBC News",
        "Fox News",
        "The New York Times",
        "The Wall Street Journal",
        "The Washington Post",
        "NPR",
        "USA Today",
        "Politico",
        "The Hill",
        "Axios",
        "C-SPAN",
        "Bloomberg US",
        "Reuters US",
        "Associated Press US",
        "HuffPost",
        "Vox",
        "The Atlantic",
        "The New Yorker",
      ],
    },
    {
      region: "Europe",
      sources: [
        "The Guardian",
        "BBC News (UK)",
        "The Times",
        "The Independent",
        "The Telegraph",
        "Le Monde",
        "Le Figaro",
        "Der Spiegel",
        "Die Welt",
        "El País",
        "El Mundo",
        "La Repubblica",
        "Corriere della Sera",
        "Gazeta Wyborcza",
        "NZZ",
        "Aftonbladet",
        "NRC Handelsblad",
        "RTVE",
        "LUSA",
        "ANSA",
      ],
    },
    {
      region: "Middle East",
      sources: [
        "Al Arabiya",
        "Haaretz",
        "The Jerusalem Post",
        "Al-Monitor",
        "Asharq Al-Awsat",
        "The National (UAE)",
        "Khaleej Times",
        "Times of Israel",
        "Middle East Eye",
        "TRT World",
        "Anadolu Agency",
        "Kuwait News Agency",
        "Saudi Gazette",
        "Daily Sabah",
        "Hürriyet Daily News",
        "Jordan Times",
        "Tehran Times",
        "Gulf News",
        "Arab News",
        "The New Arab",
      ],
    },
    {
      region: "Africa",
      sources: [
        "The Mail & Guardian",
        "Daily Maverick",
        "Premium Times",
        "The EastAfrican",
        "AllAfrica",
        "Daily Trust",
        "Punch Newspapers",
        "The Standard (Kenya)",
        "Daily Graphic (Ghana)",
        "The Herald (Zimbabwe)",
        "Egypt Today",
        "Ahram Online",
        "Maghreb Arabe Presse",
        "South Africa News24",
        "The Citizen (Tanzania)",
        "The Namibian",
        "The New Observer",
        "African Business",
        "The Africa Report",
        "Jeune Afrique",
      ],
    },
    {
      region: "Latin America",
      sources: [
        "Clarín",
        "La Nación (Argentina)",
        "O Globo",
        "Folha de S.Paulo",
        "El Universal (Mexico)",
        "Reforma",
        "El Tiempo (Colombia)",
        "El Espectador",
        "La Tercera (Chile)",
        "El Mercurio",
        "El Comercio (Peru)",
        "La República",
        "El Nacional (Venezuela)",
        "Prensa Latina",
        "TeleSUR",
        "Animal Político",
        "Proceso",
        "Ojo Público",
        "IDL-Reporteros",
        "G1",
      ],
    },
    {
      region: "Asia-Pacific",
      sources: [
        "South China Morning Post",
        "The Straits Times",
        "Nikkei Asia",
        "The Times of India",
        "The Hindu",
        "The Asahi Shimbun",
        "The Japan Times",
        "The Sydney Morning Herald",
        "The Age",
        "RNZ (New Zealand)",
        "Channel News Asia",
        "The Bangkok Post",
        "Jakarta Post",
        "The Star (Malaysia)",
        "Philippine Daily Inquirer",
        "The Korea Herald",
        "Yonhap News",
        "China Daily",
        "Global Times",
        "Caixin Global",
      ],
    },
  ]),
  (window.SETTINGS = (function () {
    try {
      var e = JSON.parse(localStorage.getItem("WORLDINFO_SETTINGS") || "{}");
      if ("object" != typeof e || null === e || Array.isArray(e)) throw new Error();
      return (Array.isArray(e.enabledPanels) || (e.enabledPanels = ["Live News"]), e);
    } catch (e) {
      return { enabledPanels: ["Live News"] };
    }
  })()),
  (window.saveSettings = function () {
    localStorage.setItem("WORLDINFO_SETTINGS", JSON.stringify(window.SETTINGS));
    if (window.WI_DATA_SYNC && window.WI_DATA_SYNC.isEnabled()) {
      if (window.WI_GOOGLE_AUTH && window.WI_GOOGLE_AUTH.isSignedIn()) {
        window.WI_DATA_SYNC.saveDebounced("worldintelligenceSettings", window.SETTINGS);
      }
    }
  }),
  (window.togglePanel = function (e) {
    window.SETTINGS.enabledPanels || (window.SETTINGS.enabledPanels = []);
    const t = window.SETTINGS.enabledPanels.indexOf(e);
    if (t > -1) window.SETTINGS.enabledPanels.splice(t, 1);
    else {
      if (window.SETTINGS.enabledPanels.length >= 40) return void alert("Maximum 40 active panels allowed.");
      window.SETTINGS.enabledPanels.push(e);
    }
    window.saveSettings();
  }));
var ACTIVE = new Set(["osm_mil", "nuclear", "conflicts"]),
  subActive = {},
  resizeTimeout = null,
  osmCameraChangeHandler = null,
  throttleTimeout = null;
function _saveTransCache() {
  if (Object.keys(window._transCache).length > 5e3) {
    for (var e = Object.keys(window._transCache), t = {}, n = e.length - 4e3; n < e.length; n++) t[e[n]] = window._transCache[e[n]];
    window._transCache = t;
  }
  try {
    localStorage.setItem("_osm_trans", JSON.stringify(window._transCache));
  } catch (e) {}
}
function _isLikelyEnglish(e) {
  if (!e || e.length < 2) return !0;
  for (var t = 0, n = 0; n < e.length; n++) {
    e.charCodeAt(n) < 128 && t++;
  }
  return t / e.length > 0.75;
}
function _translateText(e, t) {
  if (e && !_isLikelyEnglish(e))
    if (void 0 === window._transCache[e])
      if (window._transPending[e]) window._transPending[e].push(t);
      else {
        window._transPending[e] = [t];
        var n = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(e.substring(0, 500)) + "&langpair=autodetect|en",
          i = new XMLHttpRequest();
        (i.open("GET", n, !0),
          (i.timeout = 5e3),
          (i.onreadystatechange = function () {
            if (4 === i.readyState) {
              var t = e;
              try {
                if (200 === i.status) {
                  var n = JSON.parse(i.responseText);
                  if (n && n.responseData && n.responseData.translatedText) {
                    var a = n.responseData.translatedText;
                    a && a !== e && a.length > 1 && a !== e.toUpperCase() && (t = a);
                  }
                }
              } catch (e) {}
              window._transCache[e] = t;
              var o = window._transPending[e];
              if ((delete window._transPending[e], o && o.length))
                for (var r = 0; r < o.length; r++)
                  try {
                    o[r](t);
                  } catch (e) {}
              (clearTimeout(window._transSaveTimer), (window._transSaveTimer = setTimeout(_saveTransCache, 3e3)));
            }
          }),
          (i.onerror = function () {
            window._transCache[e] = e;
            var t = window._transPending[e];
            if ((delete window._transPending[e], t && t.length))
              for (var n = 0; n < t.length; n++)
                try {
                  t[n](e);
                } catch (e) {}
          }),
          i.send());
      }
    else t(window._transCache[e]);
  else t(e);
}
function _translateMarker(e, t) {
  if (e && e.label && !_isLikelyEnglish(e.label) && !e._translatedLabel)
    return void 0 !== window._transCache[e.label]
      ? ((e._translatedLabel = window._transCache[e.label]), void (t && t(e._translatedLabel)))
      : void _translateText(e.label, function (n) {
          n && n !== e.label && ((e._translatedLabel = n), t && t(n));
        });
}
function _getLabel(e) {
  return e ? (e._translatedLabel ? e._translatedLabel : void 0 !== window._transCache[e.label] ? window._transCache[e.label] : e.label || "Military") : "Military";
}
function _getTooltipText(e) {
  var t = _getLabel(e),
    n = e.countryName || e.country || "";
  return t + (n ? " (" + n + ")" : "");
}
function _autoTranslateTooltip(e, t, n) {
  t &&
    !_isLikelyEnglish(t.label) &&
    _translateMarker(t, function (n) {
      try {
        if (e.getTooltip && e.getTooltip()) {
          var i = t.countryName || t.country || "";
          e.setTooltipContent(n + (i ? " (" + i + ")" : ""));
        }
      } catch (e) {}
    });
}
((window._transCache = {}),
  (window._transPending = {}),
  (window._transLoaded = !1),
  (function () {
    try {
      var e = localStorage.getItem("_osm_trans");
      e && ((window._transCache = JSON.parse(e) || {}), (window._transLoaded = !0));
    } catch (e) {}
  })(),
  (window._getLabel = _getLabel),
  (window._getTooltipText = _getTooltipText),
  (window._translateMarker = _translateMarker),
  (window._autoTranslateTooltip = _autoTranslateTooltip),
  (window._isLikelyEnglish = _isLikelyEnglish));
var map,
  tSat,
  tSt,
  tDk,
  tLi,
  SL = {
    bases_us: "undefined" != typeof BASES_US ? BASES_US : [],
    bases_intl: "undefined" != typeof BASES_INTL ? BASES_INTL : [],
    nuclear: "undefined" != typeof NUCLEAR ? NUCLEAR : [],
    conflicts: "undefined" != typeof CONFLICTS ? CONFLICTS : [],
    hotspots: "undefined" != typeof HOTSPOTS ? HOTSPOTS : [],
    apts: "undefined" != typeof APTS ? APTS : [],
    spaceports: "undefined" != typeof SPACEPORTS ? SPACEPORTS : [],
    econ: "undefined" != typeof ECON ? ECON : [],
    finance: "undefined" != typeof FINANCE ? FINANCE : [],
    minerals: "undefined" != typeof MINERALS ? MINERALS : [],
    commodity: "undefined" != typeof COMMODITY ? COMMODITY : [],
    irradiators: "undefined" != typeof IRRADIATORS ? IRRADIATORS : [],
    airports: "undefined" != typeof AIRPORTS ? AIRPORTS : [],
    ports: "undefined" != typeof PORTS ? PORTS : [],
    waterways: "undefined" != typeof WATERWAYS ? WATERWAYS : [],
    tech: "undefined" != typeof TECH ? TECH : [],
  },
  LL = { cables: "undefined" != typeof CABLES_LINES ? CABLES_LINES : [], pipelines: "undefined" != typeof PIPELINES ? PIPELINES : [] },
  LC = {
    osm_mil: "#ffffff",
    osm_naval: "#60a5fa",
    osm_air: "#ff4d6d",
    bases_us: "#60a5fa",
    bases_intl: "#f0f0f0",
    nuclear: "#4ade80",
    conflicts: "#ff4d6d",
    hotspots: "#fb923c",
    apts: "#34d399",
    spaceports: "#c084fc",
    econ: "#fcd34d",
    finance: "#fcd34d",
    minerals: "#fb923c",
    commodity: "#fb923c",
    irradiators: "#a3e635",
    airports: "#94a3b8",
    ports: "#38bdf8",
    waterways: "#38bdf8",
    tech: "#a78bfa",
  },
  GRP = {},
  LGRP = {},
  sideVis = !0,
  curView = "2d";
window.curView = "2d";
var _cIconCache = {};
function cIcon(e, t) {
  var n = e + "_" + t;
  if (_cIconCache[n]) return _cIconCache[n];
  var i = Math.max(30, Math.min(58, 22 + 2.4 * Math.sqrt(t))),
    a = i / 2,
    o = t > 9999 ? 9 : t > 999 ? 10 : t > 99 ? 11 : t > 9 ? 12.5 : 13.5,
    r = t > 9999 ? Math.round(t / 1e3) + "k" : t,
    s = i - 8,
    l = L.divIcon({
      html:
        '<div style="width:' +
        i +
        "px;height:" +
        i +
        "px;border-radius:50%;background:transparent;border:3px solid " +
        e +
        ";display:flex;align-items:center;justify-content:center;outline:1px solid " +
        e +
        '33;outline-offset:-1px;"><div style="width:' +
        s +
        "px;height:" +
        s +
        "px;border-radius:50%;background:rgba(6,8,16,0.94);border:2px solid rgba(255,255,255,0.85);display:flex;align-items:center;justify-content:center;color:" +
        e +
        ";font-size:" +
        o +
        'px;font-weight:700;font-family:Inter,sans-serif;letter-spacing:-.01em;">' +
        r +
        "</div></div>",
      className: "",
      iconSize: [i, i],
      iconAnchor: [a, a],
    });
  _cIconCache[n] = l;
  var c = Object.keys(_cIconCache);
  return (c.length > 500 && delete _cIconCache[c[0]], l);
}
var _iconCache = {},
  MAX_CACHE_SIZE = 100;
function mkIcon(e, t, n, i) {
  var a = e + "_" + t + "_" + (n ? 1 : 0) + "_" + (i ? 1 : 0);
  if (_iconCache[a]) return _iconCache[a];
  var o = Object.keys(_iconCache);
  o.length >= MAX_CACHE_SIZE &&
    o.slice(0, Math.floor(MAX_CACHE_SIZE / 2)).forEach(function (e) {
      delete _iconCache[e];
    });
  var r,
    s = t,
    l = 2 * s;
  r = i
    ? '<circle cx="' +
      s +
      '" cy="' +
      s +
      '" r="' +
      0.96 * s +
      '" fill="' +
      e +
      '" fill-opacity="0.07" stroke="' +
      e +
      '" stroke-opacity="0.22" stroke-width="1"><animate attributeName="r" values="' +
      0.38 * s +
      ";" +
      0.96 * s +
      '" dur="2.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.65;0" dur="2.1s" repeatCount="indefinite"/></circle><circle cx="' +
      s +
      '" cy="' +
      s +
      '" r="' +
      0.72 * s +
      '" fill="' +
      e +
      '" fill-opacity="0.13" stroke="' +
      e +
      '" stroke-opacity="0.4" stroke-width="1.2"><animate attributeName="r" values="' +
      0.28 * s +
      ";" +
      0.72 * s +
      '" dur="2.1s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.75;0" dur="2.1s" begin="0.5s" repeatCount="indefinite"/></circle><circle cx="' +
      s +
      '" cy="' +
      s +
      '" r="' +
      0.52 * s +
      '" fill="white" fill-opacity="0.97"/><circle cx="' +
      s +
      '" cy="' +
      s +
      '" r="' +
      0.37 * s +
      '" fill="' +
      e +
      '" fill-opacity="1"/><circle cx="' +
      0.76 * s +
      '" cy="' +
      0.76 * s +
      '" r="' +
      0.11 * s +
      '" fill="white" fill-opacity="0.65"/>'
    : n
      ? '<rect x="0.5" y="0.5" width="' +
        (l - 1) +
        '" height="' +
        (l - 1) +
        '" rx="4" fill="' +
        e +
        '" fill-opacity="0.18"/><rect x="1.5" y="1.5" width="' +
        (l - 3) +
        '" height="' +
        (l - 3) +
        '" rx="3" fill="white" fill-opacity="1"/><rect x="3" y="3" width="' +
        (l - 6) +
        '" height="' +
        (l - 6) +
        '" rx="2" fill="' +
        e +
        '" fill-opacity="1"/><rect x="3.5" y="3.5" width="' +
        0.38 * Math.max(2, l - 6) +
        '" height="' +
        0.22 * Math.max(2, l - 6) +
        '" rx="1" fill="white" fill-opacity="0.5"/>'
      : '<circle cx="' +
        s +
        '" cy="' +
        s +
        '" r="' +
        0.97 * s +
        '" fill="' +
        e +
        '" fill-opacity="0.16"/><circle cx="' +
        s +
        '" cy="' +
        s +
        '" r="' +
        0.82 * s +
        '" fill="white" fill-opacity="0.97"/><circle cx="' +
        s +
        '" cy="' +
        s +
        '" r="' +
        0.62 * s +
        '" fill="' +
        e +
        '" fill-opacity="1"/><circle cx="' +
        0.77 * s +
        '" cy="' +
        0.77 * s +
        '" r="' +
        0.15 * s +
        '" fill="white" fill-opacity="0.52"/>';
  var c = L.divIcon({
    className: "",
    html: '<svg width="' + l + '" height="' + l + '" viewBox="0 0 ' + l + " " + l + '" xmlns="http://www.w3.org/2000/svg">' + r + "</svg>",
    iconSize: [l, l],
    iconAnchor: [s, s],
  });
  return ((_iconCache[a] = c), c);
}
function asText(e, t) {
  return null == e || "" === e ? t || "" : String(e);
}
function escHtml(e) {
  return String(e || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function clearChildren(e) {
  if (e) for (; e.firstChild;) e.removeChild(e.firstChild);
}
function textEl(e, t, n) {
  var i = document.createElement(e);
  return (t && (i.className = t), void 0 !== n && (i.textContent = asText(n)), i);
}
function tooltipNode(e) {
  return textEl("span", "", e);
}
function makeDetailRow(e, t, n) {
  var i = textEl("div", "drow");
  i.appendChild(textEl("div", "dk", e));
  var a = document.createElement("div");
  return ((a.className = "dv" + (n ? " " + n : "")), t && "object" == typeof t && t.nodeType ? a.appendChild(t) : (a.textContent = asText(t, "-")), i.appendChild(a), i);
}
function makeDetailLink(e, t, n, i) {
  var a = textEl("a", "dlink " + e);
  ((a.href = t), (a.target = "_blank"), (a.rel = "noopener noreferrer"));
  var o = document.createElement("span");
  ((o.className = "dlink-icon"), (o.innerHTML = i));
  var r = document.createTextNode(n);
  return (a.appendChild(o), a.appendChild(r), a);
}
function initMap() {
  map = L.map("map", {
    center: [20, 12],
    zoom: 2,
    zoomControl: !0,
    attributionControl: !1,
    minZoom: 2,
    maxZoom: 20,
    zoomAnimation: !0,
    zoomAnimationThreshold: 4,
    fadeAnimation: !0,
    markerZoomAnimation: !0,
    preferCanvas: !0,
    wheelPxPerZoomLevel: 60,
    maxBoundsViscosity: 0,
    worldCopyJump: !1,
    maxBounds: null,
  });
  var e = { updateWhenIdle: !1, keepBuffer: 8, maxNativeZoom: 20, maxZoom: 20, noWrap: !1 },
    t = "&apistyle=s.t:4|s.e:g.s|p.c:#ffff0000,s.t:3|s.e:g.s|p.c:#ffff0000";
  ((tSat = L.tileLayer("https://mt{s}.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}" + t, Object.assign({ subdomains: "0123" }, e))),
    (tSt = L.tileLayer("https://mt{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" + t, Object.assign({ subdomains: "0123" }, e))),
    (tDk = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", Object.assign({ subdomains: "abcd" }, e))),
    (tLi = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", Object.assign({ subdomains: "abcd" }, e))),
    [tSat, tSt, tDk, tLi].forEach(function (e) {
      e.on("tileerror", function (e) {
        e.tile &&
          !e.tile._retried &&
          ((e.tile._retried = !0),
          setTimeout(function () {
            if (e.tile && e.tile.parentNode) {
              var t = e.tile.src;
              ((e.tile.src = ""), (e.tile.src = t));
            }
          }, 500));
      });
    }),
    tSat.addTo(map),
    Object.keys(SL).forEach(function (e) {
      var t;
      ((GRP[e] =
        ((t = LC[e] || "#94a3b8"),
        L.markerClusterGroup({
          maxClusterRadius: 70,
          disableClusteringAtZoom: 10,
          spiderfyOnMaxZoom: !0,
          showCoverageOnHover: !1,
          zoomToBoundsOnClick: !0,
          chunkedLoading: !0,
          chunkDelay: 4,
          chunkInterval: 8,
          animateAddingMarkers: !1,
          removeOutsideVisibleBounds: !0,
          iconCreateFunction: function (e) {
            return cIcon(t, e.getChildCount());
          },
        }))),
        ACTIVE.has(e) && map.addLayer(GRP[e]));
    }),
    (GRP.osm_mil = L.markerClusterGroup({
      maxClusterRadius: 200,
      disableClusteringAtZoom: 12,
      spiderfyOnMaxZoom: !0,
      showCoverageOnHover: !1,
      zoomToBoundsOnClick: !0,
      chunkedLoading: !0,
      chunkDelay: 0,
      chunkInterval: 0,
      animateAddingMarkers: !1,
      removeOutsideVisibleBounds: !0,
      iconCreateFunction: function (e) {
        return cIcon("#ffffff", e.getChildCount());
      },
    })),
    ACTIVE.has("osm_mil") && map.addLayer(GRP.osm_mil),
    (GRP.osm_naval = L.markerClusterGroup({
      maxClusterRadius: 200,
      disableClusteringAtZoom: 9,
      chunkedLoading: !0,
      chunkInterval: 0,
      chunkDelay: 0,
      animateAddingMarkers: !1,
      removeOutsideVisibleBounds: !0,
      maxZoom: 18,
      iconCreateFunction: function (e) {
        return cIcon("#60a5fa", e.getChildCount());
      },
    })),
    ACTIVE.has("osm_naval") && map.addLayer(GRP.osm_naval),
    (GRP.osm_air = L.markerClusterGroup({
      maxClusterRadius: 200,
      disableClusteringAtZoom: 9,
      chunkedLoading: !0,
      chunkInterval: 0,
      chunkDelay: 0,
      animateAddingMarkers: !1,
      removeOutsideVisibleBounds: !0,
      maxZoom: 18,
      iconCreateFunction: function (e) {
        return cIcon("#ff4d6d", e.getChildCount());
      },
    })),
    ACTIVE.has("osm_air") && map.addLayer(GRP.osm_air),
    (subActive = {}),
    (window.subActive = subActive),
    Object.keys(LL).forEach(function (e) {
      ((LGRP[e] = L.layerGroup()), ACTIVE.has(e) && map.addLayer(LGRP[e]));
    }),
    (GRP.earthquakes = L.markerClusterGroup({
      maxClusterRadius: 50,
      disableClusteringAtZoom: 5,
      chunkedLoading: !0,
      animateAddingMarkers: !1,
      removeOutsideVisibleBounds: !0,
      iconCreateFunction: function (e) {
        return cIcon("#a3e635", e.getChildCount());
      },
    })),
    (LC.earthquakes = "#a3e635"),
    LOG.info("Map initialized - deferring marker loading for better UX"));
  var n = !1;
  function i() {
    if (!n) {
      n = !0;
      var e = document.getElementById("wi-loader");
      e &&
        ((e.style.opacity = "0"),
        setTimeout(function () {
          e.parentNode && e.parentNode.removeChild(e);
        }, 700));
    }
  }
  (tSat.once("load", i),
    setTimeout(i, 4e3),
    setTimeout(function () {
      (LOG.info("Starting static layer rendering..."), renderAll());
    }, 100),
    (window.osmRegionsLoaded = !1),
    LOG.info("OSM regions deferred to window.load for zero landing page lag"),
    window.addEventListener("load", function () {
      var e;
      ((e = document.getElementById("rp-kv-status")),
        fetch("/api/osm-cache?id=health")
          .then(function (e) {
            return e.json();
          })
          .then(function (t) {
            e &&
              (t.kvConnected
                ? ((e.style.display = "none"), console.log("[OSM] KV health OK"))
                : ((e.textContent = "KV not connected — data may be unavailable"),
                  (e.style.display = "block"),
                  (e.style.background = "rgba(239,68,68,0.2)"),
                  (e.style.color = "#fca5a5"),
                  console.error("[OSM] KV health check failed")));
          })
          .catch(function (t) {
            (e && ((e.textContent = "/api/osm-cache unreachable"), (e.style.display = "block"), (e.style.background = "rgba(239,68,68,0.2)"), (e.style.color = "#fca5a5")),
              console.error("[OSM] Health check fetch failed:", t));
          }),
        "function" == typeof loadRegions &&
          (window.requestIdleCallback
            ? requestIdleCallback(
                function () {
                  (loadRegions(), (window.osmRegionsLoaded = !0));
                },
                { timeout: 2e3 },
              )
            : setTimeout(function () {
                (loadRegions(), (window.osmRegionsLoaded = !0));
              }, 100)));
    }),
    (resizeTimeout = null));
  var a = function () {
    (clearTimeout(resizeTimeout),
      (resizeTimeout = setTimeout(function () {
        map && "2d" === curView && map.invalidateSize();
      }, 250)));
  };
  (window.addEventListener("resize", a),
    document.addEventListener("visibilitychange", function () {
      !document.hidden &&
        map &&
        "2d" === curView &&
        setTimeout(function () {
          (map.invalidateSize(), map._renderer && map._renderer._update && map._renderer._update());
        }, 150);
    }),
    (window._eventHandlers = window._eventHandlers || {}),
    (window._eventHandlers.resize = a),
    (window.IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),
    (window.IS_TOUCH = "ontouchstart" in window || navigator.maxTouchPoints > 0),
    window.IS_MOBILE && (console.log("[WorldIntelligence] Mobile device detected - optimizing performance"), document.body.classList.add("mobile-device")));
}
var BC = { "us-nato": "#3b82f6", russia: "#ef4444", china: "#f97316", uk: "#22c55e", france: "#a855f7", india: "#eab308", italy: "#0ea5e9", uae: "#ec4899", japan: "#a855f7", turkey: "#64748b" },
  NC = { weapons: "#ef4444", enrichment: "#f97316", plant: "#22c55e" },
  NT = { weapons: "Weapons Facility", enrichment: "Enrichment Plant", plant: "Nuclear Power Plant" },
  _renderInProgress = !1,
  _renderAbortController = null;
function renderAll(e) {
  (e
    ? (GRP[e] && GRP[e].clearLayers(), LGRP[e] && LGRP[e].clearLayers())
    : (Object.keys(SL).forEach(function (e) {
        GRP[e] && GRP[e].clearLayers();
      }),
      Object.keys(LGRP).forEach(function (e) {
        LGRP[e].clearLayers();
      })),
    _renderAbortController && (_renderAbortController.abort = !0),
    (_renderAbortController = { abort: !1 }),
    (_renderInProgress = !0));
  function t(e, n, i, a) {
    if (_renderAbortController.abort) a();
    else {
      for (var o = Math.min(n + 5e3, e.length), r = performance.now(), s = n; s < o; s++) {
        if (performance.now() - r > 50) {
          o = s;
          break;
        }
        i(e[s]);
      }
      o < e.length
        ? setTimeout(function () {
            t(e, o, i, a);
          }, 0)
        : a();
    }
  }
  var n = [];
  function i(t, i, a, o, r) {
    (e && t !== e) || (ACTIVE.has(t) && GRP[t] && n.push({ type: "points", id: t, data: i, iconFn: a, tooltipFn: o, detailFn: r }));
  }
  function a(t, n, i, a, o) {
    (e && t !== e) ||
      (ACTIVE.has(t) &&
        LGRP[t] &&
        n.forEach(function (e) {
          var n = L.polyline(e.pts, { color: i(e), weight: a(e), opacity: 0.72, smoothFactor: 1.5 });
          (n.bindTooltip(o(e), { className: "mtt", sticky: !0 }), LGRP[t].addLayer(n));
        }));
  }
  (i(
    "bases_us",
    SL.bases_us,
    function () {
      return mkIcon("#3b82f6", 8, !1, !1);
    },
    function (e) {
      return e.n + (e.state ? " (" + e.state + ")" : "");
    },
    function (e) {
      det(e.n, e.state || "USA", "US Military", "Branch: " + e.branch, "#3b82f6", e.lat, e.lng);
    },
  ),
    i(
      "bases_intl",
      SL.bases_intl,
      function (e) {
        return mkIcon(BC[e.t] || "#94a3b8", 8, !1, !1);
      },
      function (e) {
        return e.n + " (" + e.c + ")";
      },
      function (e) {
        det(e.n, e.c, e.arm + " [" + e.t.toUpperCase() + "]", "", BC[e.t] || "#94a3b8", e.lat, e.lng);
      },
    ),
    i(
      "nuclear",
      SL.nuclear,
      function (e) {
        return mkIcon(NC[e.t] || "#94a3b8", 9, !0, !1);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, "Nuclear", NT[e.t] || e.t, "", NC[e.t] || "#94a3b8", e.lat, e.lng);
      },
    ),
    i(
      "conflicts",
      SL.conflicts,
      function () {
        return mkIcon("#ef4444", 14, !1, !0);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, e.loc || "—", e.d, "", "#ef4444", e.lat, e.lng);
      },
    ),
    i(
      "hotspots",
      SL.hotspots,
      function () {
        return mkIcon("#f97316", 12, !1, !0);
      },
      function (e) {
        return e.n + " · " + e.sub;
      },
      function (e) {
        det(e.n, e.sub, e.sub, "", "#f97316", e.lat, e.lng);
      },
    ),
    i(
      "apts",
      SL.apts,
      function () {
        return mkIcon("#22c55e", 11, !1, !1);
      },
      function (e) {
        return e.n + " (" + e.aka + ")";
      },
      function (e) {
        det(e.n, e.sponsor, e.aka, "", "#22c55e", e.lat, e.lng);
      },
    ),
    i(
      "spaceports",
      SL.spaceports,
      function () {
        return mkIcon("#a855f7", 11, !1, !1);
      },
      function (e) {
        return e.n + " · " + e.c;
      },
      function (e) {
        det(e.n, e.c, "Op: " + e.op, "", "#a855f7", e.lat, e.lng);
      },
    ),
    i(
      "econ",
      SL.econ,
      function () {
        return mkIcon("#f59e0b", 10, !0, !1);
      },
      function (e) {
        return e.n + " (" + e.c + ")";
      },
      function (e) {
        det(e.n, e.c, e.t || "Econ Center", "", "#f59e0b", e.lat, e.lng);
      },
    ),
    i(
      "finance",
      SL.finance,
      function () {
        return mkIcon("#f59e0b", 9, !0, !1);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, e.c || "", "Financial Institution", "", "#f59e0b", e.lat, e.lng);
      },
    ),
    i(
      "minerals",
      SL.minerals,
      function () {
        return mkIcon("#f97316", 10, !0, !1);
      },
      function (e) {
        return e.n + " · " + e.mineral;
      },
      function (e) {
        det(e.n, e.c, e.mineral, "", "#f97316", e.lat, e.lng);
      },
    ),
    i(
      "commodity",
      SL.commodity,
      function () {
        return mkIcon("#f97316", 8, !1, !1);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, e.c || "", "Commodity Hub", "", "#f97316", e.lat, e.lng);
      },
    ),
    i(
      "irradiators",
      SL.irradiators,
      function () {
        return mkIcon("#eab308", 8, !0, !1);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, e.c, "IAEA gamma irradiator", "", "#eab308", e.lat, e.lng);
      },
    ),
    i(
      "airports",
      SL.airports,
      function () {
        return mkIcon("#64748b", 8, !1, !1);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, e.c || "", "Airport", "", "#64748b", e.lat, e.lng);
      },
    ),
    i(
      "ports",
      SL.ports,
      function () {
        return mkIcon("#0ea5e9", 9, !1, !1);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, e.c || "", "Major Port", "", "#0ea5e9", e.lat, e.lng);
      },
    ),
    i(
      "waterways",
      SL.waterways,
      function () {
        return mkIcon("#0ea5e9", 12, !1, !1);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, "Waterway", e.d, "", "#0ea5e9", e.lat, e.lng);
      },
    ),
    i(
      "tech",
      SL.tech,
      function () {
        return mkIcon("#a855f7", 9, !1, !1);
      },
      function (e) {
        return e.n;
      },
      function (e) {
        det(e.n, e.c || "", "Tech hub", "", "#a855f7", e.lat, e.lng);
      },
    ),
    a(
      "cables",
      LL.cables,
      function (e) {
        return e.major ? "rgba(34,197,94,.72)" : "rgba(34,197,94,.42)";
      },
      function (e) {
        return e.major ? 2.2 : 1.3;
      },
      function (e) {
        return "Cable: " + e.n;
      },
    ),
    a(
      "pipelines",
      LL.pipelines,
      function (e) {
        return "gas" === e.t ? "rgba(249,115,22,.65)" : "rgba(132,204,22,.65)";
      },
      function () {
        return 1.8;
      },
      function (e) {
        return e.n + " (" + e.t + ")";
      },
    ));
  var o = 0;
  !(function e() {
    if (_renderAbortController.abort || o >= n.length) return ((_renderInProgress = !1), (_renderAbortController = null), syncStats(), void LOG.info("2D marker rendering complete"));
    var i = n[o++];
    (LOG.info("Rendering layer: " + i.id + " (" + i.data.length + " markers)"),
      t(
        i.data,
        0,
        function (e) {
          var t = L.marker([e.lat, e.lng], { icon: i.iconFn(e) });
          (t.bindTooltip(i.tooltipFn(e), { className: "mtt", direction: "top", offset: [0, -4] }),
            t.on("click", function () {
              i.detailFn(e);
            }),
            GRP[i.id].addLayer(t));
        },
        e,
      ));
  })();
}
function det(e, t, n, i, a, o, r) {
  var s = Math.abs(o).toFixed(5) + (o >= 0 ? " N" : " S"),
    l = Math.abs(r).toFixed(5) + (r >= 0 ? " E" : " W"),
    c = "https://www.google.com/maps?q=" + o + "," + r + "&t=k&z=17",
    d = "https://earth.google.com/web/@" + o + "," + r + ",400a,1000d,35y,0h,45t,0r",
    u = "https://earth.google.com/web/@" + o + "," + r + ",400a,1000d,35y,0h,45t,0r/data=KAI",
    m = "https://www.google.com/maps?q=" + o + "," + r + "&layer=c&cbll=" + o + "," + r,
    f = document.getElementById("det-n");
  f && (f.textContent = asText(e, "Unknown location"));
  var p = document.getElementById("det-b");
  if (p) {
    clearChildren(p);
    var g = textEl("span", "dtag", asText(n, "Unknown"));
    ((g.style.background = a + "18"), (g.style.color = a), (g.style.border = "1px solid " + a + "30"), p.appendChild(makeDetailRow("Type", g)));
    var h = [];
    (t && h.push(asText(t)), i && h.push(asText(i)), p.appendChild(makeDetailRow("Location", h.length ? h.join(" · ") : "-")));
    var w = textEl("div", "", s + "\n" + l);
    ((w.style.fontFamily = "JetBrains Mono, monospace"),
      (w.style.fontSize = "10.5px"),
      (w.style.color = "#5a6a80"),
      (w.style.letterSpacing = ".02em"),
      (w.style.whiteSpace = "pre-line"),
      p.appendChild(makeDetailRow("Coords", w)),
      p.appendChild(textEl("div", "ddiv")));
    var y = textEl("div", "dlinks");
    (y.appendChild(makeDetailLink("dl-m", c, "Maps", '<svg viewBox="0 0 16 16"><path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/><circle cx="8" cy="6" r="1.5"/></svg>')),
      y.appendChild(makeDetailLink("dl-e", d, "Earth 3D", '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><ellipse cx="8" cy="8" rx="3" ry="6"/><line x1="2" y1="8" x2="14" y2="8"/></svg>')),
      y.appendChild(makeDetailLink("dl-h", u, "Time Machine", '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><polyline points="8,5 8,8 11,10"/></svg>')),
      y.appendChild(makeDetailLink("dl-s", m, "Street", '<svg viewBox="0 0 16 16"><path d="M3 14l5-10 5 10"/><line x1="5" y1="10" x2="11" y2="10"/></svg>')),
      p.appendChild(y));
  }
  var v = document.getElementById("det");
  (v && v.classList.add("show"), document.body.classList.add("det-open"), map.flyTo([o, r], Math.max(map.getZoom(), 9), { duration: 1.1, easeLinearity: 0.4 }));
}
function closeDet() {
  var e = document.getElementById("det");
  (e && e.classList.remove("show"), document.body.classList.remove("det-open"));
}
var globeBuilt = !1,
  cesiumViewer = null;
function setView(e) {
  ((curView = "3d" === e ? "3d" : "2d"), (window.curView = curView));
  var t = document.getElementById("v2d"),
    n = document.getElementById("v3d");
  (t && t.classList.toggle("on", "2d" === curView), n && n.classList.toggle("on", "3d" === curView), document.body.classList.toggle("view-3d", "3d" === curView), "3d" === curView) &&
    ((i = document.getElementById("cesiumContainer")) && (i.style.display = "block"),
    globeBuilt
      ? cesiumViewer &&
        ((cesiumViewer.useDefaultRenderLoop = !0),
        cesiumMarkersDataSource
          ? !osmPointsLoaded && window.osmData && window.osmData.length > 0
            ? (console.log("[WorldIntelligence] Loading OSM markers (viewport-culled billboards, " + window.osmData.length + ")..."), loadOsmPointPrimitives(), _syncMainLayersTo3D())
            : (syncActiveLayersToCesium(), _syncMainLayersTo3D())
          : (console.log("[WorldIntelligence] Loading 3D markers from existing data (" + window.osmTotal + " locations)..."), loadCesiumMarkers()))
      : ((globeBuilt = !0), console.log("[WorldIntelligence] Initializing 3D view..."), buildCesiumGlobe()),
    map && syncCesiumWithMap());
  if ("2d" === curView) {
    var i;
    if (
      ((i = document.getElementById("cesiumContainer")) && (i.style.display = "none"),
      cesiumViewer && (cesiumViewer.useDefaultRenderLoop = !1),
      osmCameraChangeHandler && cesiumViewer && (cesiumViewer.camera.changed.removeEventListener(osmCameraChangeHandler), (osmCameraChangeHandler = null)),
      window.osmData && window.osmData.length > 0 && GRP.osm_mil && ACTIVE.has("osm_mil"))
    ) {
      var a = GRP.osm_mil;
      if (!a.getLayers || 0 === a.getLayers().length) {
        console.log("[WorldIntelligence] Re-adding OSM markers to 2D view (" + window.osmData.length + " locations)");
        var o = { army: "#22c55e", naval: "#3b82f6", air: "#ef4444" },
          r = { army: 8, naval: 9, air: 7 },
          s = window.osmData,
          l = 0;
        !(function e() {
          for (var t = Math.min(l + 1e4, s.length), n = []; l < t; l++) {
            var i = s[l],
              c = o[i.cat] || "#f97316",
              d = r[i.cat] || 7,
              u = L.circleMarker([i.lat, i.lon], { radius: d, fillColor: c, color: c, weight: 0, opacity: 0, fillOpacity: 0.85 });
            ((u._osmData = i), n.push(u));
          }
          (a && n.length && a.addLayers(n), l < s.length ? setTimeout(e, 4) : ("function" == typeof syncStats && syncStats(), console.log("[WorldIntelligence] OSM markers re-added to 2D view")));
        })();
      }
    }
    setTimeout(function () {
      map && map.invalidateSize(!0);
    }, 50);
  }
}
function syncActiveLayersToCesium() {
  cesiumMarkersDataSource &&
    (console.log("[Cesium] Syncing active layers to 3D:", Array.from(ACTIVE)),
    cesiumMarkersDataSource.entities.removeAll(),
    osmVisibleMarkers.clear(),
    ACTIVE.forEach(function (e) {
      addCesiumLayer(e);
    }));
}
function buildCesiumGlobe() {
  document.getElementById("cesiumContainer")
    ? (console.log("[Cesium] Starting globe build..."),
      showCesiumLoading(),
      loadCesiumJS()
        .then(function () {
          (console.log("[Cesium] Library loaded, initializing viewer..."), updateCesiumLoadProgress(40, "Cesium engine loaded"), initCesiumViewer());
        })
        .catch(function (e) {
          (console.error("[Cesium] Failed to load:", e), showCesiumError("Failed to load 3D globe. Please check your connection."));
        }))
    : console.error("[Cesium] Container not found: #cesiumContainer");
}
function loadCesiumJS() {
  return new Promise(function (e, t) {
    if (window.Cesium) e();
    else {
      var n = null,
        i = !1;
      n = setTimeout(function () {
        s(new Error("Timeout after 30s"));
      }, 3e4);
      var a = document.createElement("link");
      ((a.rel = "stylesheet"),
        (a.href = "https://cesium.com/downloads/cesiumjs/releases/1.140/Build/Cesium/Widgets/widgets.css"),
        (a.onerror = function () {
          console.warn("[Cesium] CSS load failed (non-critical)");
        }),
        document.head.appendChild(a));
      var o = document.createElement("script");
      ((o.src = "https://cesium.com/downloads/cesiumjs/releases/1.140/Build/Cesium/Cesium.js"),
        (o.async = !0),
        (o.onload = function () {
          i || ((i = !0), r(), console.log("[Cesium] Library loaded successfully"), e());
        }),
        (o.onerror = function () {
          s("Script load error");
        }),
        document.head.appendChild(o));
    }
    function r() {
      n && (clearTimeout(n), (n = null));
    }
    function s(e) {
      i ||
        ((i = !0),
        r(),
        console.error("[Cesium] Failed to load library:", e),
        showCesiumError("Failed to load 3D library. Please check your internet connection and try again."),
        t(new Error("Cesium load failed")));
    }
  });
}
function initCesiumViewer() {
  fetch("/api/config")
    .then(function (e) {
      if (!e.ok) throw new Error("API returned " + e.status + ": " + e.statusText);
      return e.json();
    })
    .then(function (e) {
      if (e.error || !e.cesiumToken)
        return (console.error("[Cesium] Token not available:", e.error || "Token missing"), void showCesiumError("Cesium Ion token not configured. Please check your .env.local file."));
      ((Cesium.Ion.defaultAccessToken = e.cesiumToken), console.log("[Cesium] Token loaded, initializing viewer..."), updateCesiumLoadProgress(50, "Creating 3D viewer..."));
      try {
        var t = new Cesium.UrlTemplateImageryProvider({ url: "https://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en&scale=2", maximumLevel: 22, credit: new Cesium.Credit("© Google Maps") });
        ((cesiumViewer = new Cesium.Viewer("cesiumContainer", {
          baseLayer: new Cesium.ImageryLayer(t),
          terrainProvider: new Cesium.EllipsoidTerrainProvider(),
          geocoder: !1,
          homeButton: !1,
          sceneModePicker: !1,
          navigationHelpButton: !1,
          animation: !1,
          timeline: !1,
          fullscreenButton: !1,
          vrButton: !1,
          infoBox: !1,
          selectionIndicator: !1,
          skyAtmosphere: !1,
          skyBox: !1,
          resolutionScale: 1,
          useBrowserRecommendedResolution: !1,
          msaaSamples: 1,
          imageryProviderViewModels: [],
          requestRenderMode: !0,
          maximumRenderTimeChange: 1 / 0,
          contextOptions: { webgl: { alpha: !1, antialias: !1, preserveDrawingBuffer: !1, powerPreference: "high-performance" } },
        })).cesiumWidget &&
          cesiumViewer.cesiumWidget.creditContainer &&
          (cesiumViewer.cesiumWidget.creditContainer.style.display = "none"),
          (window.cesiumViewer = cesiumViewer),
          (window.applyCesiumTheme = applyCesiumTheme),
          console.log("[Cesium] Viewer initialized successfully"),
          updateCesiumLoadProgress(70, "Applying theme & camera..."),
          applyCesiumTheme(),
          setupCesiumCamera(),
          console.log("[Cesium] Viewer ready, loading markers..."),
          setupCesiumMarkerClicks(),
          setupCesiumTooltips(),
          updateCesiumLoadProgress(80, "Syncing map position..."),
          syncCesiumWithMap(),
          updateCesiumLoadProgress(85, "Loading markers..."),
          loadCesiumMarkers(),
          updateCesiumLoadProgress(100, "Done!"),
          setTimeout(function () {
            hideCesiumLoading();
          }, 300));
      } catch (e) {
        (console.error("[Cesium] Viewer init error:", e), showCesiumError("Failed to initialize 3D viewer: " + e.message));
      }
    })
    .catch(function (e) {
      (console.error("[Cesium] Config error:", e), showCesiumError("Failed to load Cesium configuration. Please check server logs."));
    });
}
function applyCesiumTheme() {
  cesiumViewer &&
    ((cesiumViewer.resolutionScale = 1),
    (cesiumViewer.scene.globe.maximumScreenSpaceError = 4),
    (cesiumViewer.scene.globe.tileCacheSize = 100),
    cesiumViewer.scene.context.msaaSupported && (cesiumViewer.scene.msaaSamples = 1),
    (cesiumViewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#04050a")),
    (cesiumViewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#080b14")),
    (cesiumViewer.scene.globe.enableLighting = !1),
    (cesiumViewer.scene.globe.atmosphereLightIntensity = 0),
    (cesiumViewer.scene.globe.depthTestAgainstTerrain = !0),
    (cesiumViewer.scene.fog.enabled = !1));
}
function setupCesiumCamera() {
  if (cesiumViewer) {
    var e = cesiumViewer.scene.screenSpaceCameraController;
    ((e.minimumZoomDistance = 100),
      (e.maximumZoomDistance = 4e7),
      (e.rotateFactor = 0.3),
      (e.zoomFactor = 1.0),
      (e.inertiaSpin = 0.9),
      (e.inertiaZoom = 0.88),
      (e.inertiaTranslate = 0.9),
      (cesiumViewer.scene.screenSpaceCameraController.enableTilt = !0),
      (cesiumViewer.scene.screenSpaceCameraController.enableRotate = !0),
      (cesiumViewer.scene.screenSpaceCameraController.enableZoom = !0),
      (cesiumViewer.scene.screenSpaceCameraController.enableTranslate = !0),
      (cesiumViewer.scene.screenSpaceCameraController.zoomEventType = Cesium.CameraEventType.WHEEL),
      (cesiumViewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.RIGHT_DRAG]),
      (cesiumViewer.scene.screenSpaceCameraController.rotateEventTypes = [Cesium.CameraEventType.LEFT_DRAG]),
      (cesiumViewer.camera.flyToDuration = 2));
  }
}
function syncCesiumWithMap() {
  if (cesiumViewer && map) {
    var e = map.getCenter();
    cesiumViewer.camera.setView({ destination: Cesium.Cartesian3.fromDegrees(e.lng, e.lat, 15e6), orientation: { heading: Cesium.Math.toRadians(0), pitch: Cesium.Math.toRadians(-90), roll: 0 } });
  }
}
function zoomToHeight(e) {
  return [4e7, 2e7, 1e7, 5e6, 25e5, 15e5, 75e4, 4e5, 2e5, 1e5, 5e4, 25e3, 15e3, 8e3, 4e3, 2e3, 1e3, 500, 250, 125, 100][e] || 1e7;
}
((window.CesiumLoadingModal = function () {
  ((this.element = null), (this.progressBar = null), (this.statusText = null), (this.isVisible = !1));
}),
  (window.CesiumLoadingModal.prototype.create = function () {
    if (!this.element) {
      ((this.element = document.createElement("div")),
        (this.element.id = "cesium-loading-modal"),
        (this.element.className = "cesium-loading-modal"),
        (this.element.style.cssText =
          "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(4,5,10,0.97);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity 0.3s ease,visibility 0.3s ease;"));
      var e = document.createElement("div");
      e.style.cssText =
        "background:rgba(20,22,30,0.95);border:1px solid rgba(255,255,255,0.3);border-radius:16px;padding:40px 48px;min-width:360px;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,0.5);";
      var t = document.createElement("div");
      t.style.cssText = "width:56px;height:56px;border:4px solid rgba(255,255,255,0.2);border-top-color:#ffffff;border-radius:50%;margin:0 auto 24px;animation:spin 1s linear infinite;";
      var n = document.createElement("h3");
      ((n.textContent = "Initializing 3D Globe"),
        (n.style.cssText = "color:#ffffff;font-family:Inter,sans-serif;font-size:20px;font-weight:700;margin:0 0 12px;"),
        (this.statusText = document.createElement("p")),
        (this.statusText.textContent = "Loading global military data (259,406 locations)..."),
        (this.statusText.style.cssText = "color:#e2e8f0;font-family:Inter,sans-serif;font-size:15px;margin:0 0 8px;font-weight:500;line-height:1.5;"));
      var i = document.createElement("p");
      ((i.id = "cesium-sub-status"), (i.textContent = "Building spatial index..."), (i.style.cssText = 'color:#94a3b8;font-family:"JetBrains Mono",monospace;font-size:13px;margin:0 0 24px;'));
      var a = document.createElement("div");
      ((a.style.cssText = "width:100%;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;"),
        (this.progressBar = document.createElement("div")),
        (this.progressBar.style.cssText = "width:0%;height:100%;background:linear-gradient(90deg,#ffffff,#ffd700);border-radius:3px;transition:width 0.3s ease;"),
        a.appendChild(this.progressBar),
        e.appendChild(t),
        e.appendChild(n),
        e.appendChild(this.statusText),
        e.appendChild(i),
        e.appendChild(a),
        this.element.appendChild(e),
        document.body.appendChild(this.element));
    }
  }),
  (window.CesiumLoadingModal.prototype.show = function (e, t) {
    (this.create(),
      (this.element.querySelector("h3").textContent = e || "Initializing 3D Globe"),
      (this.statusText.textContent = t || "Loading global military data (259,406 locations)..."),
      (this.progressBar.style.width = "0%"),
      (this.element.style.opacity = "1"),
      (this.element.style.visibility = "visible"),
      (this.isVisible = !0));
  }),
  (window.CesiumLoadingModal.prototype.updateProgress = function (e, t) {
    this.isVisible && ((this.progressBar.style.width = e + "%"), t && (this.statusText.textContent = t));
  }),
  (window.CesiumLoadingModal.prototype.updateSubStatus = function (e) {
    if (this.isVisible) {
      var t = this.element.querySelector("#cesium-sub-status");
      t && (t.textContent = e || "Processing...");
    }
  }),
  (window.CesiumLoadingModal.prototype.updateStatus = function (e) {
    this.isVisible && (this.statusText.textContent = e);
  }),
  (window.CesiumLoadingModal.prototype.hide = function () {
    this.element && this.isVisible && ((this.element.style.opacity = "0"), (this.element.style.visibility = "hidden"), (this.isVisible = !1));
  }),
  (window.CesiumLoadingModal.prototype.complete = function (e) {
    this.updateProgress(100, e || "Complete!");
    var t = this;
    setTimeout(function () {
      t.hide();
    }, 500);
  }),
  (window.CesiumLoadingModal.prototype.error = function (e) {
    if (this.isVisible) {
      ((this.statusText.textContent = "Error: " + e), (this.statusText.style.color = "#ff4d6d"));
      var t = this;
      setTimeout(function () {
        ((t.statusText.style.color = "#94a3b8"), t.hide());
      }, 2e3);
    }
  }),
  (window.cesiumLoadingModal = new window.CesiumLoadingModal()));
var cesiumMarkersDataSource = null,
  osmViewportBillboards = null,
  osmPointsLoaded = !1,
  osmViewportCameraHandler = null,
  osmSpatialIndex = null,
  osmLastViewport = null,
  osmLodUpdatePending = !1,
  osmVisibleMarkers = new Map(),
  OSM_LOD_LEVELS = [
    { zoom: 2, maxMarkers: 100 },
    { zoom: 4, maxMarkers: 500 },
    { zoom: 6, maxMarkers: 2e3 },
    { zoom: 8, maxMarkers: 5e3 },
    { zoom: 10, maxMarkers: 15e3 },
    { zoom: 12, maxMarkers: 5e4 },
    { zoom: 14, maxMarkers: 1e5 },
    { zoom: 16, maxMarkers: 26e4 },
  ],
  _markerImageCache = {};
function getCachedMarkerImage(e) {
  if (_markerImageCache[e]) return _markerImageCache[e];
  var t = createMarkerImage(e);
  return ((_markerImageCache[e] = t), t);
}
var _clusterAnimState = { entityToCluster: new Map(), clusterToParent: new Map() };
function loadCesiumMarkers() {
  if (cesiumViewer) {
    (cesiumMarkersDataSource && (cesiumViewer.dataSources.remove(cesiumMarkersDataSource), (cesiumMarkersDataSource = null)),
      (cesiumMarkersDataSource = new Cesium.CustomDataSource("markers")),
      cesiumViewer.dataSources.add(cesiumMarkersDataSource));
    var e = cesiumMarkersDataSource;
    ((window.cesiumMarkersDataSource = e),
      (e.clustering.enabled = !0),
      (e.clustering.pixelRange = 120),
      (e.clustering.minimumClusterSize = 3),
      (e.clustering.clusterPoints = !0),
      e.clustering.clusterEvent.addEventListener(function (e, t) {
        for (var n = e.length, i = "#ffffff", a = getCesiumMarkerColors(), o = 0; o < Math.min(e.length, 5); o++) {
          var r = e[o].markerData || (e[o].id && e[o].id.markerData);
          if (r && r.type) {
            i = a[r.type] || a.default;
            break;
          }
        }
        var s = Math.max(30, Math.min(58, 22 + 2.4 * Math.sqrt(n)));
        ((t.label.show = !1),
          (t.billboard.show = !0),
          (t.billboard.image = getCachedClusterImage(n, i)),
          (t.billboard.width = s),
          (t.billboard.height = s),
          (t.billboard.verticalOrigin = Cesium.VerticalOrigin.CENTER),
          (t.billboard.horizontalOrigin = Cesium.HorizontalOrigin.CENTER),
          (t.billboard.disableDepthTestDistance = 5e6),
          (t._markerData = { name: n + " Locations (Cluster)", data: { n: n + " Locations (Cluster)" } }));
      }),
      refreshCesiumMarkers());
  }
}
var osmBillboardImages = {};
function getOsmBillboardImage(e) {
  if (osmBillboardImages[e]) return osmBillboardImages[e];
  var t = { army: "#22c55e", naval: "#3b82f6", air: "#ef4444" }[e] || "#f97316",
    n = { army: 5, naval: 6, air: 4 }[e] || 5,
    i = 2 * n,
    a = 3 * i,
    o = 3 * i,
    r = a / 2,
    s = document.createElement("canvas");
  ((s.width = a), (s.height = o));
  var l = s.getContext("2d");
  return (
    l.clearRect(0, 0, a, o),
    l.beginPath(),
    l.arc(r, r, 0.92 * n * 3, 0, 2 * Math.PI),
    (l.fillStyle = "rgba(255,255,255,0.95)"),
    l.fill(),
    l.beginPath(),
    l.arc(r, r, 0.7 * n * 3, 0, 2 * Math.PI),
    (l.fillStyle = t),
    l.fill(),
    (osmBillboardImages[e] = s),
    s
  );
}
function initOsmBillboardImages() {
  (getOsmBillboardImage("army"), getOsmBillboardImage("naval"), getOsmBillboardImage("air"));
}
function loadOsmPointPrimitives() {
  if (!osmPointsLoaded && cesiumViewer) {
    var e = window.osmData || [];
    if (0 !== e.length) {
      console.log("[Cesium] Loading " + e.length + " OSM markers (viewport-culled BillboardCollection)...");
      try {
        var t = window.Cesium;
        (initOsmBillboardImages(),
          (osmViewportBillboards = new t.PointPrimitiveCollection()),
          cesiumViewer.scene.primitives.add(osmViewportBillboards),
          (osmViewportBillboards.show = !1),
          buildOsmSpatialIndex(),
          (osmPointsLoaded = !0),
          console.log("[Cesium] BillboardCollection ready for viewport culling"),
          buildOsmGridClusters(e),
          setupOsmClusterToggle(),
          setupOsmViewportUpdater());
        try {
          _syncMainLayersTo3D();
        } catch (e) {
          console.error("[Cesium] Main layer sync error (non-fatal):", e);
        }
        console.log("[Cesium] OSM point primitives fully loaded — clusters=" + osmClusterBillboardCollections.filter(Boolean).length + ", viewport=" + (osmViewportBillboards ? "ready" : "null"));
      } catch (e) {
        (console.error("[Cesium] CRITICAL: loadOsmPointPrimitives failed:", e), (osmPointsLoaded = !1));
      }
    } else console.warn("[Cesium] loadOsmPointPrimitives: no OSM data yet — will be called when data arrives");
  }
}
var _osmLastViewportHash = "",
  _osmCachedNearFar = null;
function updateOsmViewportBillboards() {
  if (cesiumViewer && osmViewportBillboards && osmViewportBillboards.show && osmSpatialIndex && window.osmData && 0 !== window.osmData.length) {
    var e = getViewportBounds();
    if (e) {
      var t = window.Cesium,
        n = cesiumViewer.camera.positionCartographic.height,
        i = queryMarkersInViewport(e, n < 5e4 ? 2e3 : n < 1e5 ? 1500 : n < 5e5 ? 800 : 400);
      osmViewportBillboards.removeAll();
      for (
        var a = { army: t.Color.fromCssColorString("#22c55e"), naval: t.Color.fromCssColorString("#3b82f6"), air: t.Color.fromCssColorString("#ef4444") }, o = { army: 5, naval: 6, air: 4 }, r = 0;
        r < i.length;
        r++
      ) {
        var s = i[r];
        if (s && Number.isFinite(s.lat) && Number.isFinite(s.lon)) {
          var l = s.cat || "army";
          osmViewportBillboards.add({
            position: t.Cartesian3.fromDegrees(s.lon, s.lat, 10),
            pixelSize: o[l] || 5,
            color: a[l] || t.Color.fromCssColorString("#ffffff"),
            outlineColor: t.Color.WHITE.withAlpha(0.8),
            outlineWidth: 1,
            disableDepthTestDistance: 5e6,
          })._osmData = s;
        }
      }
    }
  }
}
function setupOsmViewportUpdater() {}
var osmClusterBillboards = null,
  osmClusterData = null,
  osmClusterToggleHandler = null,
  CLUSTER_SWITCH_HEIGHT = 5e6,
  CLUSTER_GRID_SIZE = 5,
  osmClusterLevels = [null, null],
  osmClusterBillboardCollections = [null, null],
  ACTIVE_CLUSTER_LEVEL = -1,
  INDIVIDUAL_SWITCH_HEIGHT = 2e6,
  CLUSTER_THRESHOLDS = [8e6, 2e6];
function buildOsmGridClusters(e) {
  if (e && 0 !== e.length) {
    for (var t = window.Cesium, n = [15, 6], i = [42, 32], a = 0; a < 2; a++) {
      for (var o = n[a], r = {}, s = 0; s < e.length; s++) {
        var l = e[s];
        if (l && Number.isFinite(l.lat) && Number.isFinite(l.lon)) {
          var c = Math.floor(l.lat / o) * o + o / 2,
            d = Math.floor(l.lon / o) * o + o / 2,
            u = c + "_" + d;
          (r[u] || (r[u] = { lat: c, lon: d, count: 0, army: 0, naval: 0, air: 0 }), r[u].count++, "army" === l.cat ? r[u].army++ : "naval" === l.cat ? r[u].naval++ : "air" === l.cat && r[u].air++);
        }
      }
      var m = Object.values(r);
      osmClusterLevels[a] = m;
      for (var f = new t.BillboardCollection(), p = i[a], g = 0; g < m.length; g++) {
        var h = m[g],
          w = "#ffffff";
        h.naval > h.army && h.naval > h.air ? (w = "#3b82f6") : h.air > h.army && h.air > h.naval ? (w = "#ef4444") : h.army > h.naval && h.army > h.air && (w = "#22c55e");
        var y = createClusterBillboard(h.count, w),
          v = Math.max(30, Math.min(58, 22 + 2.4 * Math.sqrt(h.count)));
        f.add({
          position: t.Cartesian3.fromDegrees(h.lon, h.lat, 0),
          image: y,
          width: v,
          height: v,
          verticalOrigin: t.VerticalOrigin.CENTER,
          horizontalOrigin: t.HorizontalOrigin.CENTER,
          scaleByDistance: new t.NearFarScalar(2e5, 1.3, 3e7, 0.5),
          disableDepthTestDistance: 5e6,
        });
      }
      (cesiumViewer.scene.primitives.add(f),
        (f.show = !1),
        (osmClusterBillboardCollections[a] = f),
        console.log("[Cesium] Cluster level " + a + ": " + m.length + " clusters (" + o + "deg grid, " + p + "px)"));
    }
    ((osmClusterBillboards = osmClusterBillboardCollections[0]),
      (osmClusterData = osmClusterLevels[0]),
      (osmViewportBillboards.show = !1),
      (ACTIVE_CLUSTER_LEVEL = 0),
      osmClusterBillboardCollections[0] && (osmClusterBillboardCollections[0].show = !0));
  }
}
function createClusterBillboard(e, t) {
  var n = Math.max(30, Math.min(58, 22 + 2.4 * Math.sqrt(e))),
    i = Math.round(2 * n),
    a = document.createElement("canvas");
  ((a.width = i), (a.height = i));
  var o = a.getContext("2d");
  o.scale(2, 2);
  var r = n / 2,
    s = r - 0.5;
  (o.save(),
    o.beginPath(),
    o.arc(r, r, s, 0, 2 * Math.PI),
    (o.shadowColor = t + "66"),
    (o.shadowBlur = 20),
    (o.strokeStyle = "transparent"),
    (o.lineWidth = 0),
    o.stroke(),
    o.restore(),
    o.save(),
    o.beginPath(),
    o.arc(r, r, s, 0, 2 * Math.PI),
    (o.shadowColor = "rgba(0,0,0,0.7)"),
    (o.shadowBlur = 16),
    (o.shadowOffsetY = 4),
    (o.strokeStyle = "transparent"),
    (o.lineWidth = 0),
    o.stroke(),
    o.restore(),
    o.beginPath(),
    o.arc(r, r, s, 0, 2 * Math.PI),
    (o.fillStyle = "transparent"),
    o.fill(),
    (o.strokeStyle = t),
    (o.lineWidth = 3),
    o.stroke());
  var l = s - 4;
  (o.beginPath(), o.arc(r, r, l, 0, 2 * Math.PI), (o.fillStyle = "rgba(6,8,16,0.94)"), o.fill(), (o.strokeStyle = "rgba(255,255,255,0.85)"), (o.lineWidth = 2), o.stroke());
  var c = e > 9999 ? Math.round(e / 1e3) + "k" : String(e),
    d = e > 9999 ? 9 : e > 999 ? 10 : e > 99 ? 11 : e > 9 ? 12.5 : 13.5;
  return ((o.font = "700 " + d + "px Inter, sans-serif"), (o.fillStyle = t), (o.textAlign = "center"), (o.textBaseline = "middle"), o.fillText(c, r, r + 0.5), a);
}
function setupOsmClusterToggle() {
  if (cesiumViewer && !osmClusterToggleHandler) {
    var e = null;
    ((osmClusterToggleHandler = function () {
      e ||
        (e = setTimeout(function () {
          if (((e = null), cesiumViewer && osmViewportBillboards && cesiumViewer.scene.canvas.clientWidth)) {
            if (!ACTIVE.has("osm_mil")) {
              for (var t = 0; t < osmClusterBillboardCollections.length; t++) osmClusterBillboardCollections[t] && (osmClusterBillboardCollections[t].show = !1);
              return ((osmViewportBillboards.show = !1), (ACTIVE_CLUSTER_LEVEL = -1), void cesiumViewer.scene.requestRender());
            }
            for (var n = cesiumViewer.camera.positionCartographic.height, i = -1, a = 0; a < CLUSTER_THRESHOLDS.length; a++)
              if (n > CLUSTER_THRESHOLDS[a]) {
                i = a;
                break;
              }
            if (i >= 0 && -1 === ACTIVE_CLUSTER_LEVEL) {
              for (t = 0; t < osmClusterBillboardCollections.length; t++) osmClusterBillboardCollections[t] && (osmClusterBillboardCollections[t].show = t === i);
              return (
                (ACTIVE_CLUSTER_LEVEL = i),
                setTimeout(function () {
                  osmViewportBillboards && ((osmViewportBillboards.show = !1), osmViewportBillboards.removeAll(), cesiumViewer.scene.requestRender());
                }, 50),
                void cesiumViewer.scene.requestRender()
              );
            }
            if (-1 === i && ACTIVE_CLUSTER_LEVEL >= 0)
              return (
                (osmViewportBillboards.show = !0),
                (_osmLastViewportHash = ""),
                updateOsmViewportBillboards(),
                (ACTIVE_CLUSTER_LEVEL = -1),
                setTimeout(function () {
                  for (var e = 0; e < osmClusterBillboardCollections.length; e++) osmClusterBillboardCollections[e] && (osmClusterBillboardCollections[e].show = !1);
                  cesiumViewer.scene.requestRender();
                }, 50),
                void cesiumViewer.scene.requestRender()
              );
            if ((-1 === ACTIVE_CLUSTER_LEVEL && osmViewportBillboards.show && ((_osmLastViewportHash = ""), updateOsmViewportBillboards()), i !== ACTIVE_CLUSTER_LEVEL && i >= 0)) {
              for (t = 0; t < osmClusterBillboardCollections.length; t++) osmClusterBillboardCollections[t] && (osmClusterBillboardCollections[t].show = t === i);
              ACTIVE_CLUSTER_LEVEL = i;
            }
            cesiumViewer.scene.requestRender();
          }
        }, 300));
    }),
      cesiumViewer.camera.changed.addEventListener(osmClusterToggleHandler));
  }
}
function getCesiumZoom() {
  if (!cesiumViewer) return 2;
  var e = cesiumViewer.camera.positionCartographic.height;
  return e > 1e7 ? 2 : e > 5e6 ? 4 : e > 2e6 ? 6 : e > 5e5 ? 8 : e > 1e5 ? 10 : e > 5e4 ? 12 : e > 1e4 ? 14 : 16;
}
function getLodMaxMarkers(e) {
  for (var t = 0; t < OSM_LOD_LEVELS.length; t++) if (e <= OSM_LOD_LEVELS[t].zoom) return OSM_LOD_LEVELS[t].maxMarkers;
  return OSM_LOD_LEVELS[OSM_LOD_LEVELS.length - 1].maxMarkers;
}
function buildOsmSpatialIndex() {
  var e = window.osmData || [];
  if (0 !== e.length) {
    osmSpatialIndex = {};
    (e.forEach(function (e) {
      if (e && Number.isFinite(e.lat) && Number.isFinite(e.lon)) {
        var t = Math.floor(e.lat / 0.5) + "," + Math.floor(e.lon / 0.5);
        (osmSpatialIndex[t] || (osmSpatialIndex[t] = []), osmSpatialIndex[t].push(e));
      }
    }),
      console.log("[Cesium] OSM spatial index built with " + Object.keys(osmSpatialIndex).length + " cells (0.5° grid)"));
  }
}
function getViewportBounds() {
  if (!cesiumViewer) return null;
  var e = cesiumViewer.camera.computeViewRectangle();
  if (e) return { west: Cesium.Math.toDegrees(e.west), south: Cesium.Math.toDegrees(e.south), east: Cesium.Math.toDegrees(e.east), north: Cesium.Math.toDegrees(e.north) };
  try {
    var t = cesiumViewer.camera.positionCartographic;
    if (!t) return null;
    var n = t.height,
      i = Math.max(0.002 * n, 1e-4);
    return (
      (i = Math.min(i, 0.5)),
      { west: Cesium.Math.toDegrees(t.longitude) - i, south: Cesium.Math.toDegrees(t.latitude) - i, east: Cesium.Math.toDegrees(t.longitude) + i, north: Cesium.Math.toDegrees(t.latitude) + i }
    );
  } catch (e) {
    return null;
  }
}
function queryMarkersInViewport(e, t) {
  if (!osmSpatialIndex || !e) return [];
  var n,
    i = [],
    a = 0.5,
    o = new Set(),
    r = Math.floor(e.south / a),
    s = Math.floor(e.north / a);
  n =
    e.west <= e.east
      ? [[Math.floor(e.west / a), Math.floor(e.east / a)]]
      : [
          [Math.floor(e.west / a), Math.floor(360)],
          [Math.floor(-360), Math.floor(e.east / a)],
        ];
  for (var l = r; l <= s; l++)
    n.forEach(function (e) {
      for (var t = e[0]; t <= e[1]; t++) {
        var n = osmSpatialIndex[l + "," + t];
        n &&
          n.forEach(function (e) {
            var t = e && e.id;
            (t && o.has(t)) || (t && o.add(t), i.push(e));
          });
      }
    });
  if (i.length > t) {
    for (var c = Math.ceil(i.length / t), d = [], u = 0; u < i.length; u += c) d.push(i[u]);
    i = d;
  }
  return i;
}
function updateOsmMarkersInViewport() {
  if (cesiumMarkersDataSource && cesiumViewer && ACTIVE.has("osm_mil")) {
    var e = getViewportBounds();
    if (e) {
      var t = queryMarkersInViewport(e, getLodMaxMarkers(getCesiumZoom())),
        n = new Set();
      (t.forEach(function (e) {
        e && e.id && n.add(e.id);
      }),
        osmVisibleMarkers.forEach(function (e, t) {
          n.has(t) || (cesiumMarkersDataSource.entities.remove(e), osmVisibleMarkers.delete(t));
        }));
      var i = getCesiumMarkerColors(),
        a = 0.5,
        o = t.length > 2e3;
      (t.forEach(function (e) {
        if (e && Number.isFinite(e.lat) && Number.isFinite(e.lon) && !osmVisibleMarkers.has(e.id)) {
          var t,
            n = e.cat || "military",
            r = i[n] || i.military,
            s = Cesium.Cartesian3.fromDegrees(e.lon, e.lat);
          if (o)
            t = cesiumMarkersDataSource.entities.add({
              position: s,
              point: { pixelSize: "naval" === n ? 6 : "army" === n ? 5 : 4, color: Cesium.Color.fromCssColorString(r), outlineColor: Cesium.Color.WHITE, outlineWidth: 1, disableDepthTestDistance: 0 },
              properties: { type: n, data: e, lat: e.lat, lng: e.lon },
            });
          else {
            var l = getCachedMarkerImage(r),
              c = (Math.floor(e.lat / a) + 0.5) * a,
              d = (Math.floor(e.lon / a) + 0.5) * a,
              u = Cesium.Cartesian3.fromDegrees(d, c);
            animateEntityMovement(
              (t = cesiumMarkersDataSource.entities.add({
                position: u,
                billboard: {
                  image: l,
                  width: 32,
                  height: 32,
                  verticalOrigin: Cesium.VerticalOrigin.CENTER,
                  horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                  color: Cesium.Color.WHITE,
                  disableDepthTestDistance: 0,
                },
                properties: { type: n, data: e, lat: e.lat, lng: e.lon },
              })),
              u,
              s,
              700,
            );
          }
          ((t.markerData = { type: n, data: e, lat: e.lat, lng: e.lon }), osmVisibleMarkers.set(e.id, t));
        }
      }),
        console.log("[Cesium] Viewport updated: " + osmVisibleMarkers.size + " markers visible (points=" + (o ? "yes" : "no") + ")"));
    }
  }
}
function loadOsmMarkersLOD(e, t) {
  var n = window.osmData || [];
  if (ACTIVE.has("osm_mil") && 0 !== n.length) {
    if ((console.log("[Cesium] Loading OSM markers (" + n.length + " total, viewport-culled)..."), osmPointsLoaded && osmViewportBillboards)) {
      for (var i = cesiumViewer ? cesiumViewer.camera.positionCartographic.height : 99999999, a = 0; a < osmClusterBillboardCollections.length; a++)
        osmClusterBillboardCollections[a] && (osmClusterBillboardCollections[a].show = !1);
      osmViewportBillboards.show = !1;
      for (var o = -1, r = 0; r < CLUSTER_THRESHOLDS.length; r++)
        if (i > CLUSTER_THRESHOLDS[r]) {
          o = r;
          break;
        }
      return (
        o >= 0 && osmClusterBillboardCollections[o]
          ? ((osmClusterBillboardCollections[o].show = !0), (ACTIVE_CLUSTER_LEVEL = o))
          : osmViewportBillboards && ((osmViewportBillboards.show = !0), (ACTIVE_CLUSTER_LEVEL = -1), (_osmLastViewportHash = ""), updateOsmViewportBillboards()),
        void console.log("[Cesium] OSM markers re-shown (level=" + ACTIVE_CLUSTER_LEVEL + ")")
      );
    }
    (loadOsmPointPrimitives(), console.log("[Cesium] OSM markers ready — clusters at zoom-out, viewport-culled billboards at zoom-in"));
  }
}
function getCesiumMarkerColors() {
  return {
    military: "#ffffff",
    army: "#22c55e",
    naval: "#3b82f6",
    air: "#ef4444",
    conflict: "#ef4444",
    nuclear: "#4ade80",
    "us-base": "#60a5fa",
    cable: "#38bdf8",
    pipeline: "#a3e635",
    hotspot: "#f97316",
    "us-nato": "#3b82f6",
    russia: "#ef4444",
    china: "#f97316",
    uk: "#22c55e",
    france: "#a855f7",
    india: "#eab308",
    italy: "#0ea5e9",
    uae: "#ec4899",
    japan: "#a855f7",
    turkey: "#64748b",
    apts: "#34d399",
    spaceports: "#c084fc",
    econ: "#fcd34d",
    finance: "#fcd34d",
    minerals: "#f97316",
    commodity: "#fb923c",
    irradiators: "#a3e635",
    airports: "#94a3b8",
    ports: "#0ea5e9",
    waterways: "#0ea5e9",
    tech: "#a78bfa",
    default: "#94a3b8",
  };
}
function getCesiumLayerTypes(e) {
  if ("bases_intl" === e) return ["military", "us-nato", "russia", "china", "uk", "france", "india", "italy", "uae", "japan", "turkey"];
  return (
    {
      bases_us: ["us-base"],
      nuclear: ["nuclear"],
      conflicts: ["conflict"],
      hotspots: ["hotspot"],
      apts: ["apts"],
      spaceports: ["spaceports"],
      econ: ["econ"],
      finance: ["finance"],
      minerals: ["minerals"],
      commodity: ["commodity"],
      irradiators: ["irradiators"],
      airports: ["airports"],
      ports: ["ports"],
      waterways: ["waterways"],
      tech: ["tech"],
    }[e] || []
  );
}
function refreshCesiumMarkers() {
  if (cesiumMarkersDataSource && cesiumViewer) {
    var e = cesiumMarkersDataSource,
      t = getCesiumMarkerColors();
    (e.entities.removeAll(), osmVisibleMarkers.clear());
    var n = 0;
    (i("bases_us", "us-base", function () {
      return "#60a5fa";
    }),
      i("bases_intl", "military", function (e) {
        return BC[e.t] || "#94a3b8";
      }),
      i("nuclear", "nuclear", function (e) {
        return NC[e.t] || "#94a3b8";
      }),
      i("conflicts", "conflict", function () {
        return "#ef4444";
      }),
      i("hotspots", "hotspot", function () {
        return "#f97316";
      }),
      i("apts", "apts", function () {
        return "#34d399";
      }),
      i("spaceports", "spaceports", function () {
        return "#c084fc";
      }),
      i("econ", "econ", function () {
        return "#fcd34d";
      }),
      i("finance", "finance", function () {
        return "#fcd34d";
      }),
      i("minerals", "minerals", function () {
        return "#f97316";
      }),
      i("commodity", "commodity", function () {
        return "#fb923c";
      }),
      i("irradiators", "irradiators", function () {
        return "#a3e635";
      }),
      i("airports", "airports", function () {
        return "#94a3b8";
      }),
      i("ports", "ports", function () {
        return "#0ea5e9";
      }),
      i("waterways", "waterways", function () {
        return "#0ea5e9";
      }),
      i("tech", "tech", function () {
        return "#a78bfa";
      }),
      ACTIVE.has("cables") &&
        LL.cables &&
        LL.cables.length &&
        (LL.cables.forEach(function (t) {
          if (t.pts && t.pts.length) {
            var n = [];
            (t.pts.forEach(function (e) {
              n.push(e[1], e[0]);
            }),
              e.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArray(n),
                  width: t.major ? 2.2 : 1.3,
                  material: Cesium.Color.fromCssColorString(t.major ? "rgba(34,197,94,.72)" : "rgba(34,197,94,.42)"),
                  clampToGround: !1,
                },
                properties: { type: "cable", data: t },
              }));
          }
        }),
        (n += LL.cables.length)),
      ACTIVE.has("pipelines") &&
        LL.pipelines &&
        LL.pipelines.length &&
        (LL.pipelines.forEach(function (t) {
          if (t.pts && t.pts.length) {
            var n = [];
            t.pts.forEach(function (e) {
              n.push(e[1], e[0]);
            });
            var i = "gas" === t.t ? "rgba(249,115,22,.65)" : "rgba(132,204,22,.65)";
            e.entities.add({
              polyline: { positions: Cesium.Cartesian3.fromDegreesArray(n), width: 1.8, material: Cesium.Color.fromCssColorString(i), clampToGround: !1 },
              properties: { type: "pipeline", data: t },
            });
          }
        }),
        (n += LL.pipelines.length)),
      ACTIVE.has("osm_mil") && loadOsmMarkersLOD(e, t),
      console.log("[Cesium] Refreshed all active layers (" + n + " static + OSM viewport)"));
  }
  function i(i, a, o) {
    if (ACTIVE.has(i)) {
      var r = SL[i];
      r &&
        r.length &&
        (r.forEach(function (n) {
          o(n);
          addCesiumMarkerAnimated(e, n.lat, n.lng, a, n, t, null);
        }),
        (n += r.length));
    }
  }
}
function addCesiumMarker(e, t, n, i, a, o, r, s) {
  var l = getCachedMarkerImage(s || o[i] || o.default);
  e.entities.add({
    position: Cesium.Cartesian3.fromDegrees(n, t),
    billboard: {
      image: l,
      width: 32,
      height: 32,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      color: Cesium.Color.WHITE,
      scaleByDistance: new Cesium.NearFarScalar(100, 1.2, 5e5, 0.6),
      disableDepthTestDistance: 0,
      sizeInMeters: !1,
    },
    properties: { type: i, data: a, lat: t, lng: n },
  }).markerData = { type: i, data: a, lat: t, lng: n };
}
function setupCesiumMarkerClicks() {
  cesiumViewer &&
    new Cesium.ScreenSpaceEventHandler(cesiumViewer.scene.canvas).setInputAction(function (e) {
      if (!(window.WI_Pegman && document.getElementById("pegman-control") && document.getElementById("pegman-control").classList.contains("sv-active"))) {
        var t = cesiumViewer.scene.pick(e.position);
        if (t)
          if (t.id && t.id.markerData) {
            var n = t.id.markerData;
            showCesiumMarkerPopup(n.data, n.type, n.lat, n.lng);
          } else {
            if (t.primitive && t.primitive._osmData) {
              var i = t.primitive._osmData,
                a = { army: "#22c55e", naval: "#3b82f6", air: "#ef4444" }[i.cat] || "#f97316";
              return (
                det(_getLabel(i), i.countryName || i.country || "—", i.mil || "", i.operator || "", a, i.lat, i.lon),
                void (cesiumViewer && cesiumViewer.selectedEntity && (cesiumViewer.selectedEntity = null))
              );
            }
            if (t.id && t.id._markerData) {
              var o = t.id._markerData;
              if (o && o.name) return;
            }
          }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
function showCesiumMarkerPopup(e, t, n, i) {
  var a = e.n || e.name || "Unknown",
    o = e.c || e.state || e.loc || "—",
    r = e.d || e.branch || e.arm || "",
    s = getCesiumMarkerColors()[t] || "#ffffff",
    l = [];
  (e.branch && l.push(e.branch),
    e.arm && l.push(e.arm),
    e.t && l.push(e.t.toUpperCase()),
    e.kind && l.push(e.kind),
    e.mineral && l.push(e.mineral),
    e.aka && l.push("AKA: " + e.aka),
    e.sponsor && l.push(e.sponsor),
    e.sub && l.push(e.sub),
    l.length > 0 && (r = l.join(" • ")),
    e.s && (r += (r ? " • " : "") + "Status: " + e.s),
    det(a, o, "", r, s, n, i),
    cesiumViewer && cesiumViewer.selectedEntity && (cesiumViewer.selectedEntity = null));
}
window._addGlobeDots = function (e) {
  if ("3d" === curView && ACTIVE.has("osm_mil") && cesiumViewer)
    if (osmPointsLoaded) {
      if (e && e.length > 0 && osmSpatialIndex)
        try {
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            if (n && Number.isFinite(n.lat) && Number.isFinite(n.lon)) {
              var i = Math.floor(n.lat / 0.5) + "," + Math.floor(n.lon / 0.5);
              (osmSpatialIndex[i] || (osmSpatialIndex[i] = []), osmSpatialIndex[i].push(n));
            }
          }
          _osmLastViewportHash = "";
        } catch (e) {
          console.warn("[Cesium] Spatial index incremental update error:", e);
        }
    } else loadOsmPointPrimitives();
};
var cesiumTooltip = null;
function setupCesiumTooltips() {
  cesiumViewer &&
    (cesiumTooltip ||
      (((cesiumTooltip = document.createElement("div")).style.cssText =
        "position:fixed; pointer-events:none; background:rgba(4,5,10,0.97); border:1px solid rgba(255,255,255,0.4); color:#fff; padding:6px 12px; border-radius:6px; font-family:Inter,sans-serif; font-size:13px; font-weight:700; z-index:11000; display:none; white-space:nowrap; box-shadow:0 8px 24px rgba(0,0,0,0.6); transition: opacity 0.1s;"),
      document.body.appendChild(cesiumTooltip)),
    new Cesium.ScreenSpaceEventHandler(cesiumViewer.scene.canvas).setInputAction(function (e) {
      var t = cesiumViewer.scene.pick(e.endPosition),
        n = !1;
      if (t && t.id) {
        var i = t.id,
          a = i.markerData || i._markerData;
        if (a) {
          var o = a.name || (a.data && (a.data.n || a.data.name || a.data.label));
          o &&
            ((cesiumTooltip.textContent = o),
            (cesiumTooltip.style.display = "block"),
            (cesiumTooltip.style.opacity = "1"),
            (cesiumTooltip.style.left = e.endPosition.x + 15 + "px"),
            (cesiumTooltip.style.top = e.endPosition.y - 35 + "px"),
            (document.body.style.cursor = "pointer"),
            (n = !0));
        }
      }
      if (!n && t && t.primitive && t.primitive._osmData) {
        var r = t.primitive._osmData,
          s = _getTooltipText(r);
        ((cesiumTooltip.textContent = s),
          (cesiumTooltip.style.display = "block"),
          (cesiumTooltip.style.opacity = "1"),
          (cesiumTooltip.style.left = e.endPosition.x + 15 + "px"),
          (cesiumTooltip.style.top = e.endPosition.y - 35 + "px"),
          (document.body.style.cursor = "pointer"),
          (n = !0),
          _translateMarker(r, function (e) {
            var t = r.countryName || r.country || "";
            cesiumTooltip.textContent === s && (cesiumTooltip.textContent = e + (t ? " (" + t + ")" : ""));
          }));
      }
      n || ((cesiumTooltip.style.display = "none"), (cesiumTooltip.style.opacity = "0"), (document.body.style.cursor = "default"));
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE));
}
function createMarkerImage(e) {
  var t = document.createElement("canvas");
  ((t.width = 64), (t.height = 64));
  var n = t.getContext("2d");
  return (
    n.clearRect(0, 0, 64, 64),
    n.beginPath(),
    n.arc(32, 32, 29.44, 0, 2 * Math.PI),
    (n.fillStyle = "rgba(255, 255, 255, 0.95)"),
    n.fill(),
    n.beginPath(),
    n.arc(32, 32, 22.4, 0, 2 * Math.PI),
    (n.fillStyle = e),
    n.fill(),
    t.toDataURL()
  );
}
var _entityLastParentPos = new Map();
function animateEntityMovement(e, t, n, i) {
  var a = new Cesium.SampledPositionProperty(),
    o = Cesium.JulianDate.now(),
    r = Cesium.JulianDate.addSeconds(o, i / 1e3, new Cesium.JulianDate());
  (a.addSample(o, t),
    a.addSample(r, n),
    a.setInterpolationOptions({ interpolationDegree: 2, interpolationAlgorithm: Cesium.HermitePolynomialApproximation }),
    (e.position = a),
    setTimeout(function () {
      e && e.position && (e.position = n);
    }, i + 50));
}
function addCesiumMarkerAnimated(e, t, n, i, a, o, r) {
  var s = getCachedMarkerImage(o[i] || o.default),
    l = Cesium.Cartesian3.fromDegrees(n, t),
    c = a.id || t + "_" + n,
    d = _entityLastParentPos.get(c),
    u = r || d || l,
    m = e.entities.add({
      position: u,
      billboard: {
        image: s,
        width: 16,
        height: 16,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        color: Cesium.Color.WHITE,
        scaleByDistance: new Cesium.NearFarScalar(100, 1.5, 5e5, 0.8),
        disableDepthTestDistance: 0,
        sizeInMeters: !1,
      },
      properties: { type: i, data: a, lat: t, lng: n },
    });
  ((m.markerData = { type: i, data: a, lat: t, lng: n }), Cesium.Cartesian3.equals(u, l) || animateEntityMovement(m, u, l, 400));
}
var _clusterImageCache = {};
function getCachedClusterImage(e, t) {
  var n = e < 10 ? e : 10 * Math.round(e / 10),
    i = t || "#ffffff",
    a = (n = Math.min(n, 1e3)) + "_" + i;
  if (_clusterImageCache[a]) return _clusterImageCache[a];
  var o = createClusterImage(n, i);
  return ((_clusterImageCache[a] = o), o);
}
function createClusterImage(e, t) {
  var n = t || "#ffffff",
    i = e,
    a = Math.max(30, Math.min(58, 22 + 2.4 * Math.sqrt(i))),
    o = 2.5,
    r = a * o,
    s = a * o,
    l = r / 2,
    c = document.createElement("canvas");
  ((c.width = r), (c.height = s));
  var d = c.getContext("2d");
  (d.clearRect(0, 0, r, s),
    d.beginPath(),
    d.arc(l, l, (a / 2 - 2) * o, 0, 2 * Math.PI),
    (d.strokeStyle = n),
    (d.lineWidth = 7.5),
    (d.shadowColor = n + "66"),
    (d.shadowBlur = 25),
    d.stroke(),
    (d.shadowColor = "rgba(0,0,0,0.7)"),
    (d.shadowBlur = 20),
    d.stroke(),
    (d.shadowBlur = 0));
  var u = (a - 8) / 2;
  (d.beginPath(), d.arc(l, l, u * o, 0, 2 * Math.PI), (d.fillStyle = "rgba(6,8,16,0.94)"), d.fill(), (d.strokeStyle = "rgba(255,255,255,0.85)"), (d.lineWidth = 5), d.stroke());
  var m = i > 9999 ? 9 : i > 999 ? 10 : i > 99 ? 11 : i > 9 ? 12.5 : 13.5,
    f = i > 9999 ? Math.round(i / 1e3) + "k" : i;
  return (
    (d.font = "700 " + m * o + "px Inter, sans-serif"),
    (d.textAlign = "center"),
    (d.textBaseline = "middle"),
    (d.fillStyle = n),
    (d.letterSpacing = "-0.01em"),
    d.fillText(f, l, l),
    c.toDataURL()
  );
}
function showCesiumLoading() {
  window.cesiumLoadingModal && (window.cesiumLoadingModal.show("Initializing 3D Globe", "Preparing Cesium engine..."), window.cesiumLoadingModal.updateProgress(5, "Preparing Cesium engine..."));
}
function updateCesiumLoadProgress(e, t) {
  window.cesiumLoadingModal && window.cesiumLoadingModal.updateProgress(e, t || "");
}
function updateCesiumSubStatus(e) {
  window.cesiumLoadingModal && "function" == typeof window.cesiumLoadingModal.updateSubStatus && window.cesiumLoadingModal.updateSubStatus(e);
}
function hideCesiumLoading() {
  window.cesiumLoadingModal && window.cesiumLoadingModal.hide();
  var e = document.getElementById("cesium-loading");
  e && e.remove();
}
function showCesiumError(e) {
  var t = document.getElementById("cesiumContainer");
  if (t) {
    document.createElement("span").textContent = e;
    var n = document.createElement("div");
    ((n.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,.6);font-family:Inter,sans-serif;font-size:14px;text-align:center;padding:20px;"),
      (n.innerHTML =
        '<div><div style="font-size:32px;margin-bottom:12px;">🌍</div><div style="font-weight:600;margin-bottom:8px;">3D Globe Unavailable</div><div id="cesium-err-msg" style="font-size:12px;color:rgba(255,255,255,.4);max-width:280px;"></div><button onclick="setView(\'2d\')" style="margin-top:16px;padding:8px 16px;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#ffffff;border-radius:6px;cursor:pointer;font-family:Inter,sans-serif;font-size:12px;font-weight:600;">Switch to 2D View</button></div>'));
    var i = n.querySelector("#cesium-err-msg");
    (i && (i.textContent = e), (t.innerHTML = ""), t.appendChild(n));
  }
}
var spinStyle = document.createElement("style");
function buildGlobe() {
  buildCesiumGlobe();
}
function togL(e) {
  var t = e.dataset.id,
    n = ACTIVE.has(t);
  (n
    ? (ACTIVE.delete(t), GRP[t] && map && map.removeLayer(GRP[t]), LGRP[t] && map && map.removeLayer(LGRP[t]), "3d" === curView && cesiumMarkersDataSource && removeCesiumLayer(t))
    : (ACTIVE.add(t), GRP[t] && map && map.addLayer(GRP[t]), LGRP[t] && map && map.addLayer(LGRP[t]), "3d" === curView && cesiumMarkersDataSource && addCesiumLayer(t)),
    e.classList.toggle("on", ACTIVE.has(t)));
  var i = document.querySelector("#layers-dropdown-menu input[onchange*=\"'" + t + "'\"]");
  (i && (i.checked = ACTIVE.has(t)), SL[t] && ACTIVE.has(t) && !n ? renderAll(t) : ("osm_naval" !== t && "osm_air" !== t) || !ACTIVE.has(t) || n ? syncStats() : _loadOsmMainLayer(t));
  var a = document.getElementById("sl");
  a && (a.textContent = ACTIVE.size);
  var o = document.getElementById("sct");
  o && (o.textContent = ACTIVE.size + " active");
}
function addCesiumLayer(e) {
  if (cesiumMarkersDataSource && cesiumViewer)
    if ("osm_mil" !== e)
      if ("osm_naval" !== e)
        if ("osm_air" !== e) {
          var t = getCesiumMarkerColors();
          if ("cables" === e || "pipelines" === e) {
            if (!LL[e] || !LL[e].length) return;
            var n = "cables" === e;
            return (
              LL[e].forEach(function (e) {
                if (e.pts && e.pts.length) {
                  var t = [];
                  e.pts.forEach(function (e) {
                    t.push(e[1], e[0]);
                  });
                  var i = n ? (e.major ? "rgba(34,197,94,.72)" : "rgba(34,197,94,.42)") : "gas" === e.t ? "rgba(249,115,22,.65)" : "rgba(132,204,22,.65)",
                    a = n ? (e.major ? 2.2 : 1.3) : 1.8;
                  cesiumMarkersDataSource.entities.add({
                    polyline: { positions: Cesium.Cartesian3.fromDegreesArray(t), width: a, material: Cesium.Color.fromCssColorString(i), clampToGround: !1 },
                    properties: { type: n ? "cable" : "pipeline", data: e },
                  });
                }
              }),
              void console.log("[Cesium] Added layer:", e)
            );
          }
          if (SL[e] && SL[e].length) {
            var i =
              {
                bases_us: "us-base",
                bases_intl: "military",
                nuclear: "nuclear",
                conflicts: "conflict",
                hotspots: "hotspot",
                apts: "apts",
                spaceports: "spaceports",
                econ: "econ",
                finance: "finance",
                minerals: "minerals",
                commodity: "commodity",
                irradiators: "irradiators",
                airports: "airports",
                ports: "ports",
                waterways: "waterways",
                tech: "tech",
              }[e] || e;
            (SL[e].forEach(function (n) {
              ("bases_intl" === e && BC[n.t], "nuclear" === e && NC[n.t], addCesiumMarkerAnimated(cesiumMarkersDataSource, n.lat, n.lng, i, n, t, null));
            }),
              console.log("[Cesium] Added layer:", e));
          }
        } else _addOsmMainLayer3D("air");
      else _addOsmMainLayer3D("naval");
    else loadOsmMarkersLOD(cesiumMarkersDataSource);
}
function removeCesiumLayer(e) {
  if (cesiumMarkersDataSource)
    if ("osm_mil" !== e)
      if ("osm_naval" !== e)
        if ("osm_air" !== e) {
          if ("cables" === e || "pipelines" === e) {
            var t = "cables" === e ? "cable" : "pipeline",
              n = [];
            return (
              cesiumMarkersDataSource.entities.values.forEach(function (e) {
                e.properties && e.properties.type && e.properties.type.getValue() === t && n.push(e);
              }),
              n.forEach(function (e) {
                cesiumMarkersDataSource.entities.remove(e);
              }),
              void console.log("[Cesium] Removed layer:", e)
            );
          }
          var i = getCesiumLayerTypes(e);
          if (i.length) {
            a = [];
            (cesiumMarkersDataSource.entities.values.forEach(function (e) {
              e.properties && e.properties.type && -1 !== i.indexOf(e.properties.type.getValue()) && a.push(e);
            }),
              a.forEach(function (e) {
                cesiumMarkersDataSource.entities.remove(e);
              }));
          }
          console.log("[Cesium] Removed layer:", e);
        } else _removeOsmMainLayer3D("air");
      else _removeOsmMainLayer3D("naval");
    else {
      var a = [];
      (cesiumMarkersDataSource.entities.values.forEach(function (e) {
        e.properties && e.properties.type && "military" === e.properties.type.getValue() && a.push(e);
      }),
        a.forEach(function (e) {
          cesiumMarkersDataSource.entities.remove(e);
        }),
        osmVisibleMarkers.clear(),
        osmViewportBillboards && (osmViewportBillboards.show = !1));
      for (var o = 0; o < osmClusterBillboardCollections.length; o++) osmClusterBillboardCollections[o] && (osmClusterBillboardCollections[o].show = !1);
      ((ACTIVE_CLUSTER_LEVEL = -1), cesiumViewer && cesiumViewer.scene && cesiumViewer.scene.requestRender());
      try {
        ["naval", "air"].forEach(function (e) {
          _osmMainLayerCollections[e] && cesiumViewer && (cesiumViewer.scene.primitives.remove(_osmMainLayerCollections[e]), delete _osmMainLayerCollections[e]);
        });
      } catch (e) {
        console.warn("[Cesium] Main layer cleanup error (non-fatal):", e);
      }
      osmCameraChangeHandler && cesiumViewer && (cesiumViewer.camera.changed.removeEventListener(osmCameraChangeHandler), (osmCameraChangeHandler = null));
    }
}
function filterL(e) {
  ((e = e.toLowerCase()),
    document.querySelectorAll(".lr").forEach(function (t) {
      var n = t.querySelector(".lname");
      t.style.display = !n || n.textContent.toLowerCase().indexOf(e) >= 0 ? "" : "none";
    }));
}
function fly(e, t, n) {
  if (
    (document.querySelectorAll(".reg").forEach(function (e) {
      e.classList.remove("on");
    }),
    e.classList.add("on"),
    "3d" === curView && cesiumViewer)
  ) {
    var i = zoomToHeight(n);
    cesiumViewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(t[1], t[0], i), orientation: { heading: 0, pitch: Cesium.Math.toRadians(-90), roll: 0 }, duration: 2 });
  } else map.flyTo(t, n, { duration: 1.4, easeLinearity: 0.4 });
}
function toggleLayersDropdown() {
  var e = document.getElementById("layers-dropdown-menu"),
    t = document.querySelector("#layers-dropdown .dropdown-toggle");
  if (e && t) {
    var n = e.classList.contains("show");
    (e.classList.toggle("show", !n),
      t.classList.toggle("open", !n),
      n ||
        setTimeout(function () {
          document.addEventListener("click", closeLayersDropdownOnClickOutside, { once: !0 });
        }, 10));
  }
}
function closeLayersDropdownOnClickOutside(e) {
  var t = document.getElementById("layers-dropdown-menu"),
    n = document.querySelector("#layers-dropdown");
  if (t && n && !n.contains(e.target)) {
    t.classList.remove("show");
    var i = document.querySelector("#layers-dropdown .dropdown-toggle");
    i && i.classList.remove("open");
  }
}
function toggleLayer(e) {
  var t = document.querySelector('[data-id="' + e + '"]');
  t && togL(t);
}
function updateLayerBadge(e, t) {
  var n = document.getElementById("badge-" + e);
  n && (n.textContent = t > 999 ? Math.round(t / 1e3) + "k" : t);
}
function setT(e) {
  (document.querySelectorAll(".tb").forEach(function (e) {
    e.classList.remove("on");
  }),
    e.classList.add("on"));
}
function setTile(e, t) {
  (["bsat", "bst", "bdk", "bli", "bhi"].forEach(function (e) {
    var t = document.getElementById(e);
    t && t.classList.remove("on");
  }),
    e && e.classList.add("on"),
    "light" === t ? document.body.classList.contains("light-mode") || toggleLightMode() : "dark" === t && document.body.classList.contains("light-mode") && toggleLightMode(),
    [tSat, tSt, tDk, tLi].forEach(function (e) {
      map.hasLayer(e) && map.removeLayer(e);
    }),
    "sat" === t ? tSat.addTo(map) : "street" === t ? tSt.addTo(map) : "dark" === t ? tDk.addTo(map) : "light" === t ? tLi.addTo(map) : "hist" === t && (tSat.addTo(map), openGoogleEarthHere()));
}
function toggleSide() {
  sideVis = !sideVis;
  var e = document.getElementById("SIDE");
  (e && e.classList.toggle("off", !sideVis), document.body.classList.toggle("side-off", !sideVis));
}
function syncStats() {
  var e = 0;
  function t(e, t) {
    var n = document.getElementById(e);
    n && (n.textContent = t);
  }
  (ACTIVE.forEach(function (t) {
    (SL[t] && (e += SL[t].length),
      LL[t] && (e += (SL[t], 0)),
      "osm_mil" === t && (e += window.osmArmyTotal || 0),
      "osm_naval" === t && (e += window.osmNavalTotal || 0),
      "osm_air" === t && (e += window.osmAirTotal || 0));
  }),
    t("sm", e.toLocaleString()));
  var n = window.osmTotal || 0;
  (t("so", n.toLocaleString()),
    t("sl", ACTIVE.size),
    t("sct", ACTIVE.size + " active"),
    t("sr", (window.regDone || 0) + "/" + (window.REGIONS ? window.REGIONS.length : 0)),
    t("osm-ct", (window.osmArmyTotal || 0).toLocaleString()),
    t("rpn", n.toLocaleString()),
    t("osm-naval-ct", (window.osmNavalTotal || 0).toLocaleString()),
    t("osm-air-ct", (window.osmAirTotal || 0).toLocaleString()));
}
function tick() {
  var e = new Date(),
    t = function (e) {
      return String(e).padStart(2, "0");
    },
    n = document.getElementById("clk");
  n && (n.textContent = t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + " UTC");
}
((spinStyle.textContent = "@keyframes spin{to{transform:rotate(360deg);}}"),
  document.head.appendChild(spinStyle),
  (window.togL = togL),
  setInterval(function () {
    document.hidden || tick();
  }, 5e3),
  tick(),
  setInterval(function () {
    document.hidden || syncStats();
  }, 1e4),
  (window.toggleLightMode = function () {
    var e = !document.body.classList.contains("wi-theme-light");
    document.body.classList.toggle("wi-theme-light", e);
    try {
      localStorage.setItem("WI_theme", e ? "light" : "dark");
    } catch (e) {}
    if (window.getCesiumViewer && "function" == typeof window.applyWorldIntelligenceTheme)
      try {
        window.applyWorldIntelligenceTheme(window.getCesiumViewer());
      } catch (e) {}
  }),
  (function () {
    try {
      "light" === localStorage.getItem("WI_theme") && document.body.classList.add("wi-theme-light");
    } catch (e) {}
  })());
var _osmMainLayerCollections = {};
function _loadOsmMainLayer(e) {
  var t = "osm_naval" === e ? "naval" : "osm_air" === e ? "air" : null;
  if (t) {
    var n = GRP[e];
    if (n) {
      if (n.getLayers().length > 0) return (map && !map.hasLayer(n) && map.addLayer(n), void syncStats());
      if (window.osmData && 0 !== window.osmData.length) {
        for (
          var i = window._COL || { army: "#22c55e", naval: "#3b82f6", air: "#ef4444" }, a = window._SZ || { army: 8, naval: 9, air: 7 }, o = i[t] || "#f97316", r = a[t] || 7, s = [], l = 0, c = 0;
          c < window.osmData.length;
          c++
        ) {
          var d = window.osmData[c];
          if (d.cat === t) {
            l++;
            var u = L.circleMarker([d.lat, d.lon], { radius: r, fillColor: o, color: "#fff", weight: 1.5, opacity: 1, fillOpacity: 1, interactive: !0, bubblingMouseEvents: !1 });
            ((u._osmData = d),
              (function (e, t) {
                (e.on("mouseover", function () {
                  var t = e._osmData;
                  if (!e._ttBound) {
                    e._ttBound = !0;
                    var n = window._getTooltipText ? window._getTooltipText(t) : (t.label || "Military") + (t.countryName || t.country ? " (" + (t.countryName || t.country) + ")" : "");
                    e.bindTooltip(n, { className: "mtt", direction: "top", offset: [0, -5] }).openTooltip();
                  }
                }),
                  e.on("click", function () {
                    var n = e._osmData,
                      i = window.det;
                    "function" == typeof i && i(window._getLabel ? window._getLabel(n) : n.label, n.countryName || n.country || "Resolving…", n.mil, n.operator, t, n.lat, n.lon);
                  }));
              })(u, o),
              s.push(u),
              s.length >= 5e3 && (n.addLayers(s), (s = [])));
          }
        }
        (s.length > 0 && n.addLayers(s),
          console.log("[Layer]", t, ": added", l, "markers to", e),
          map && n && map.addLayer(n),
          n &&
            !n._osmMainEventsRegistered &&
            ((n._osmMainEventsRegistered = !0),
            n.on("mouseover", function (e) {
              if (e.layer && e.layer._osmData) {
                var t = e.layer._osmData;
                if (!e.layer._ttBound) {
                  e.layer._ttBound = !0;
                  var n = window._getTooltipText ? window._getTooltipText(t) : (t.label || "Military") + (t.countryName || t.country ? " (" + (t.countryName || t.country) + ")" : "");
                  e.layer.bindTooltip(n, { className: "mtt", direction: "top", offset: [0, -5] }).openTooltip();
                }
              }
            }),
            n.on("click", function (e) {
              if (e.layer && e.layer._osmData) {
                var t = e.layer._osmData,
                  n = window._COL || { army: "#22c55e", naval: "#3b82f6", air: "#ef4444" },
                  i = window.det;
                if ("function" != typeof i) return;
                i(window._getLabel ? window._getLabel(t) : t.label, t.countryName || t.country || "Resolving…", t.mil, t.operator, n[t.cat] || "#f97316", t.lat, t.lon);
              }
            })),
          "3d" === curView && _addOsmMainLayer3D(t),
          syncStats());
      } else syncStats();
    }
  }
}
function _addOsmMainLayer3D(e) {
  if (cesiumViewer && window.osmData && 0 !== window.osmData.length) {
    var t = window.Cesium;
    if (!_osmMainLayerCollections[e]) {
      var n = window.osmData.filter(function (t) {
        return t.cat === e;
      });
      if (0 !== n.length) {
        console.log("[Cesium] Adding 3D main layer: " + e + " (" + n.length + " markers)");
        for (
          var i = new t.PointPrimitiveCollection(),
            a = t.Color.fromCssColorString({ naval: "rgba(59,130,246,1)", air: "rgba(239,68,68,1)" }[e] || "rgba(249,115,22,1)"),
            o = { naval: 8, air: 7 }[e] || 5,
            r = t.Color.WHITE,
            s = 0;
          s < n.length;
          s++
        ) {
          var l = n[s];
          if (l && Number.isFinite(l.lat) && Number.isFinite(l.lon))
            i.add({ position: t.Cartesian3.fromDegrees(l.lon, l.lat, 10), pixelSize: o, color: a, outlineColor: r, outlineWidth: 1, disableDepthTestDistance: 5e6 })._osmData = l;
        }
        (cesiumViewer.scene.primitives.add(i), (_osmMainLayerCollections[e] = i), cesiumViewer.scene.requestRender(), console.log("[Cesium] 3D main layer ready: " + e + " (" + n.length + " points)"));
      } else console.log("[Cesium] No data for main layer: " + e);
    }
  }
}
function _removeOsmMainLayer3D(e) {
  _osmMainLayerCollections[e] &&
    cesiumViewer &&
    (cesiumViewer.scene.primitives.remove(_osmMainLayerCollections[e]), delete _osmMainLayerCollections[e], cesiumViewer.scene.requestRender(), console.log("[Cesium] Removed 3D main layer: " + e));
}
function _syncMainLayersTo3D() {
  cesiumViewer &&
    window.osmData &&
    0 !== window.osmData.length &&
    ["naval", "air"].forEach(function (e) {
      var t = "osm_" + e;
      ACTIVE.has(t) && !_osmMainLayerCollections[e] && _addOsmMainLayer3D(e);
    });
}
function togSub(e, t) {
  console.warn("[togSub] DEPRECATED - Naval and Air are now main layers. Use togL() instead.");
}
function loadChannel(e) {
  var t = window.NEWS_CHANNELS.find((t) => t.id === e) || window.NEWS_CHANNELS[0];
  window._currentChannel = t;
  var n = document.getElementById("news-player");
  (n &&
    ((n.style.opacity = "0.3"),
    (n.src = "https://www.youtube.com/embed/" + t.yt + "?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1&enablejsapi=1&origin=" + window.location.origin),
    (n.onload = function () {
      n.style.opacity = "1";
    })),
    document.querySelectorAll(".chan-card").forEach((t) => {
      t.classList.toggle("active", t.dataset.id === e);
    }));
}
((window.togSub = togSub),
  (window.NEWS_CHANNELS = [
    { id: "aljazeera", name: "Al Jazeera English", yt: "gCNeDWCI0vo" },
    { id: "dw", name: "DW News", yt: "LuKwFajn37U" },
    { id: "euronews", name: "Euronews", yt: "evbAWPmwtSE" },
    { id: "trt", name: "TRT World", yt: "1VUhRQpz_9o" },
    { id: "reuters", name: "Reuters", yt: "TGu6Sb-gFoA" },
    { id: "france24", name: "France 24 English", yt: "Ap-UM1O9RBU" },
    { id: "telesur", name: "TeleSUR", yt: "uGK8rHot0Pc" },
    { id: "skynews", name: "Sky News", yt: "YDvsBbKfLPA" },
    { id: "gbnews", name: "GB News", yt: "pMmp6K-18v0" },
    { id: "abc", name: "ABC News", yt: "iipR5yUp36o" },
    { id: "cspan", name: "C-SPAN", yt: "2FCUaGniGMA" },
    { id: "foxnews", name: "Fox News Live", yt: "C96oohpWBGw" },
    { id: "cnn18", name: "CNN News18", yt: "7ewQqNXxlhY" },
    { id: "bloomberg", name: "Bloomberg TV", yt: "iEpJwprxDdk" },
    { id: "cna", name: "Channel NewsAsia", yt: "XWq5kBlakcQ" },
    { id: "toi", name: "Times of India", yt: "UzbN63TYWPo" },
    { id: "ndtv", name: "NDTV", yt: "mCyA0DjT30E" },
    { id: "republic", name: "Republic World", yt: "VHd_S-eY9ls" },
    { id: "wion", name: "WION", yt: "BoiGBuO3k6o" },
    { id: "nhk", name: "NHK World Japan", yt: "f0lYkdA-Gtw" },
    { id: "africanews", name: "Africa News", yt: "NQjabLGdP5g" },
    { id: "arisenews", name: "Arise News", yt: "E8PRZmDUiPw" },
    { id: "alarabiya", name: "Al Arabiya English", yt: "rXnG4eiVVdM" },
  ]),
  (window._currentChannel = window.NEWS_CHANNELS[0]),
  (window.loadChannel = loadChannel),
  (window.SCREENSHOT = (function () {
    var e = !1;
    return {
      capture: function () {
        if (!e) {
          if (((e = !0), void 0 !== curView && "3d" === curView))
            return (window.ALERTS && window.ALERTS.toast({ title: "Export unavailable in 3D view", body: "Switch to 2D map first." }), void (e = !1));
          var t = document.getElementById("export-btn"),
            n = document.querySelectorAll('.tools-item[onclick*="SCREENSHOT"]'),
            i = t ? t.dataset.defaultHtml || t.innerHTML : "";
          if (
            (t && !t.dataset.defaultHtml && (t.dataset.defaultHtml = i),
            t && ((t.disabled = !0), (t.style.opacity = "0.5"), (t.textContent = "Exporting...")),
            n.forEach(function (e) {
              ((e.style.opacity = "0.5"), (e.style.pointerEvents = "none"));
            }),
            !map || "function" != typeof map.getContainer)
          )
            return (window.ALERTS && window.ALERTS.toast({ title: "Export failed", body: "Map not initialized yet. Please wait." }), void o());
          "function" == typeof leafletImage
            ? a()
            : new Promise(function (e, t) {
                if ("function" != typeof leafletImage) {
                  var n = document.createElement("script");
                  ((n.src = "https://unpkg.com/leaflet-image@0.4.0/leaflet-image.js"), (n.crossOrigin = "anonymous"));
                  var i = !1,
                    a = setTimeout(function () {
                      ((i = !0), t(new Error("leaflet-image load timed out")));
                    }, 3e4);
                  ((n.onload = function () {
                    (clearTimeout(a), i || e());
                  }),
                    (n.onerror = function () {
                      (clearTimeout(a), i || t(new Error("leaflet-image script failed")));
                    }),
                    document.head.appendChild(n));
                } else e();
              })
                .then(function () {
                  a();
                })
                .catch(function () {
                  (window.ALERTS && window.ALERTS.toast({ title: "Export failed", body: "Screenshot library failed to load. Please refresh." }), o());
                });
        }
        function a() {
          setTimeout(function () {
            try {
              leafletImage(map, function (e, t) {
                if (e)
                  return (
                    console.error("[Screenshot] Error:", e),
                    window.ALERTS && window.ALERTS.toast({ title: "Export failed", body: "Try switching to Dark or Light tile style, or wait for tiles to load." }),
                    void o()
                  );
                try {
                  (!(function (e) {
                    var t = e.getContext("2d"),
                      n = new Date(),
                      i =
                        n.getUTCFullYear() +
                        "-" +
                        String(n.getUTCMonth() + 1).padStart(2, "0") +
                        "-" +
                        String(n.getUTCDate()).padStart(2, "0") +
                        " " +
                        String(n.getUTCHours()).padStart(2, "0") +
                        ":" +
                        String(n.getUTCMinutes()).padStart(2, "0") +
                        " UTC",
                      a = map.getCenter(),
                      o = a.lat.toFixed(4) + ", " + a.lng.toFixed(4),
                      r = ["WorldIntelligence OSINT", i, o];
                    (t.save(), (t.font = "bold 13px Inter, sans-serif"), (t.fillStyle = "rgba(0,0,0,0.55)"));
                    var s = r.reduce(function (e, n) {
                      return Math.max(e, t.measureText(n).width);
                    }, 0);
                    (t.fillRect(e.width - s - 24, e.height - 68, s + 20, 60),
                      (t.fillStyle = "#ffffff"),
                      (t.font = "bold 13px Inter, sans-serif"),
                      t.fillText("WorldIntelligence OSINT", e.width - s - 14, e.height - 48),
                      (t.fillStyle = "rgba(255,255,255,0.7)"),
                      (t.font = "11px Inter, sans-serif"),
                      t.fillText(i, e.width - s - 14, e.height - 32),
                      t.fillText(o, e.width - s - 14, e.height - 16),
                      t.restore());
                  })(t),
                    (function (e) {
                      var t = new Date(),
                        n =
                          "worldintelligence-" +
                          t.getUTCFullYear() +
                          String(t.getUTCMonth() + 1).padStart(2, "0") +
                          String(t.getUTCDate()).padStart(2, "0") +
                          "-" +
                          String(t.getUTCHours()).padStart(2, "0") +
                          String(t.getUTCMinutes()).padStart(2, "0") +
                          ".png";
                      e.toBlob(function (e) {
                        var t = URL.createObjectURL(e),
                          i = document.createElement("a");
                        ((i.href = t),
                          (i.download = n),
                          document.body.appendChild(i),
                          i.click(),
                          document.body.removeChild(i),
                          setTimeout(function () {
                            URL.revokeObjectURL(t);
                          }, 1e3));
                      });
                    })(t),
                    window.ALERTS && window.ALERTS.toast({ title: "Screenshot saved!", body: "Map exported with watermark." }));
                } catch (e) {
                  (console.error("[Screenshot] Processing error:", e), window.ALERTS && window.ALERTS.toast({ title: "Export failed", body: "Error processing image. Try again." }));
                }
                o();
              });
            } catch (e) {
              (console.error("[Screenshot] Capture error:", e), window.ALERTS && window.ALERTS.toast({ title: "Export failed", body: "Capture failed. Try using keyboard shortcut E instead." }), o());
            }
          }, 500);
        }
        function o() {
          ((e = !1),
            t && ((t.disabled = !1), (t.style.opacity = ""), (t.innerHTML = t.dataset.defaultHtml || i)),
            n.forEach(function (e) {
              ((e.style.opacity = ""), (e.style.pointerEvents = ""));
            }));
        }
      },
    };
  })()),
  (window.EARTHQUAKES = (function () {
    var e = null;
    function t(e) {
      return mkIcon(e < 3 ? "#a3e635" : e < 5 ? "#f97316" : "#ef4444", e < 3 ? 5 : e < 5 ? 9 : 14, !1, e >= 5);
    }
    function n(e) {
      var t = document.getElementById("eq-badge");
      t && (t.textContent = e);
    }
    function i() {
      window
        .fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e &&
            e.features &&
            (function (e) {
              var i = GRP.earthquakes;
              if (i) {
                i.clearLayers();
                var a = 0;
                (e.forEach(function (e) {
                  var n = e.properties,
                    o = e.geometry && e.geometry.coordinates;
                  if (o && n) {
                    var r = n.mag || 0,
                      s = o[1],
                      l = o[0],
                      c = o[2] || 0;
                    if (isFinite(s) && isFinite(l)) {
                      var d = L.marker([s, l], { icon: t(r) }),
                        u = n.place || "Unknown location",
                        m = n.time ? new Date(n.time).toUTCString() : "—";
                      (d.bindTooltip("M" + r.toFixed(1) + " — " + u, { className: "mtt", direction: "top", offset: [0, -4] }),
                        d.on("click", function () {
                          det("M" + r.toFixed(1) + " Earthquake", u, "Depth: " + c.toFixed(0) + " km", "Time: " + m, r < 3 ? "#a3e635" : r < 5 ? "#f97316" : "#ef4444", s, l);
                        }),
                        i.addLayer(d),
                        a++);
                    }
                  }
                }),
                  n(a));
              }
            })(e.features);
        })
        .catch(function () {
          window.ALERTS && window.ALERTS.toast({ title: "🌍 Earthquake feed unavailable", body: "Showing last known data." });
        });
    }
    return {
      toggle: function (t) {
        0;
        var a = GRP.earthquakes;
        a && (t ? (map.addLayer(a), i(), (e = setInterval(i, 6e4))) : (map.removeLayer(a), clearInterval(e), (e = null), n(0)));
      },
      fetch: i,
    };
  })()),
  (window.TICKER = (function () {
    var e = "WI_TICKER_CACHE";
    function t(e) {
      var t = document.getElementById("ticker-inner"),
        n = document.getElementById("ticker-wrap");
      if (t && e && e.length) {
        var i = e
          .concat(e)
          .map(function (e) {
            return (
              '<a class="ticker-item" href="' +
              escHtml(e.url || "#") +
              '" target="_blank" rel="noopener noreferrer"><span class="ticker-src">' +
              escHtml(e.source || "") +
              "</span>" +
              escHtml(e.text) +
              '</a><span class="ticker-sep"></span>'
            );
          })
          .join("");
        t.innerHTML = i;
        var a = e.reduce(function (e, t) {
            return e + t.text.length;
          }, 0),
          o = Math.max(40, Math.min(120, 0.18 * a));
        ((t.style.animationDuration = o + "s"), n && n.classList.add("loaded"), document.body.classList.add("ticker-on"), window.ALERTS && window.ALERTS.checkHeadlines(e));
      }
    }
    function n() {
      window
        .fetch("/api/ticker-proxy")
        .then(function (e) {
          return e.json();
        })
        .then(function (n) {
          if (n.ok && n.items && n.items.length) {
            try {
              localStorage.setItem(e, JSON.stringify(n.items.slice(0, 50)));
            } catch (e) {
              console.warn("[Ticker] Cache save failed:", e);
            }
            t(n.items);
          } else i();
        })
        .catch(i);
    }
    function i() {
      try {
        var n = JSON.parse(localStorage.getItem(e) || "[]");
        n.length && t(n);
      } catch (e) {}
    }
    return {
      init: function () {
        (i(), n(), setInterval(n, 3e5));
      },
      fetch: n,
    };
  })()),
  (window.TIMELINE = (function () {
    var e = !1;
    return {
      toggle: function () {
        ((e = !e), window.ALERTS && window.ALERTS.toast({ title: e ? "Timeline enabled" : "Timeline disabled", body: "Timeline feature coming soon.", duration: 3e3 }));
      },
      visible: function () {
        return e;
      },
    };
  })()),
  (window.ALERTS = (function () {
    var e = "WI_PINS_V2",
      t = {};
    function n(e) {
      return (
        (e = e || {}),
        new Promise(function (t) {
          var n = document.getElementById("wi-confirm-overlay"),
            i = document.getElementById("wi-confirm-card"),
            a = document.getElementById("wi-confirm-icon"),
            o = document.getElementById("wi-confirm-title"),
            r = document.getElementById("wi-confirm-message"),
            s = document.getElementById("wi-confirm-ok-btn"),
            l = document.getElementById("wi-confirm-cancel-btn");
          if (n && i) {
            var c = {
              trash:
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',
              alert:
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            };
            ((a.innerHTML = c[e.icon] || c.alert),
              (o.textContent = e.title || "Confirm"),
              (r.textContent = e.message || "Are you sure?"),
              (s.textContent = e.okText || "Confirm"),
              (l.textContent = e.cancelText || "Cancel"),
              !1 === e.danger
                ? ((s.style.background = "rgba(255,255,255,.15)"), (s.style.borderColor = "rgba(255,255,255,.35)"), (s.style.color = "#ffffff"))
                : ((s.style.background = ""), (s.style.borderColor = ""), (s.style.color = "")),
              (n.style.display = "flex"),
              (i.style.animation = "none"),
              i.offsetWidth,
              (i.style.animation = ""),
              setTimeout(function () {
                l.focus();
              }, 50),
              s.addEventListener("click", u),
              l.addEventListener("click", m),
              document.addEventListener("keydown", f),
              (window._wiConfirmCancel = m));
          } else t(window.confirm(e.message || ""));
          function d() {
            ((n.style.display = "none"), s.removeEventListener("click", u), l.removeEventListener("click", m), document.removeEventListener("keydown", f), (window._wiConfirmCancel = null));
          }
          function u() {
            (d(), t(!0));
          }
          function m() {
            (d(), t(!1));
          }
          function f(e) {
            "Enter" === e.key ? (e.preventDefault(), u()) : "Escape" === e.key && (e.preventDefault(), m());
          }
        })
      );
    }
    var i = 6e5,
      a = {},
      o = null,
      r = null,
      s = null;
    function l() {
      try {
        var t = JSON.parse(localStorage.getItem(e) || "[]");
        return Array.isArray(t)
          ? t.filter(function (e) {
              return (
                e &&
                "string" == typeof e.id &&
                "string" == typeof e.name &&
                "number" == typeof e.lat &&
                "number" == typeof e.lng &&
                isFinite(e.lat) &&
                isFinite(e.lng) &&
                e.lat >= -90 &&
                e.lat <= 90 &&
                e.lng >= -180 &&
                e.lng <= 180
              );
            })
          : [];
      } catch (e) {
        return [];
      }
    }
    function c(t) {
      try {
        var n = t.slice(0, 20);
        return (localStorage.setItem(e, JSON.stringify(n)), window.WI_DATA_SYNC && window.WI_DATA_SYNC.isEnabled() && window.WI_DATA_SYNC.savePins(n), !0);
      } catch (e) {
        if ("QuotaExceededError" === e.name || "NS_ERROR_DOM_QUOTA_REACHED" === e.name)
          if ((console.warn("[Watchlist] Storage quota exceeded. Removing oldest pins..."), t.length > 1)) return c(t.slice(Math.ceil(0.25 * t.length)));
        return (console.error("[Watchlist] Failed to save pins:", e), !1);
      }
    }
    var d = !1,
      u = "",
      m = null,
      f = null,
      p = !1,
      g = !1;
    function h() {
      var e = document.getElementById("wl-panel-chips") || document.getElementById("watchlist-chips");
      if (e) {
        var t = l();
        if (
          ((e.innerHTML = ""),
          (function (e) {
            var t = document.getElementById("wl-count-badge"),
              n = document.getElementById("wl-panel-count-badge"),
              i = document.getElementById("wl-clear-btn"),
              a = document.getElementById("wl-search-btn"),
              o = document.getElementById("wl-sort-btn"),
              r = document.getElementById("wl-more-btn"),
              s = document.getElementById("wl-kbd-hint"),
              l = document.getElementById("wl-open-panel-btn"),
              c = function (t) {
                t && (e > 0 ? ((t.textContent = e), (t.style.display = "")) : (t.style.display = "none"));
              };
            (c(t), c(n), l && l.classList.toggle("has-pins", e > 0));
            i && (i.style.display = e > 0 ? "" : "none");
            var d = e >= 3;
            a && (a.style.display = d ? "" : "none");
            o && (o.style.display = d ? "" : "none");
            r && (r.style.display = e > 0 ? "" : "none");
            s && (s.style.display = e > 0 ? "" : "none");
            var u = document.getElementById("wl-menu-duplicate");
            u && (u.style.display = e > 0 && e < 20 ? "" : "none");
          })(t.length),
          !t.length)
        )
          return ((e.innerHTML = '<div style="font-family:Inter,sans-serif;font-size:10px;color:rgba(255,255,255,.2);padding:4px 2px;">No pins yet — click Add Pin</div>'), de(e, 0), void ue(e, 0));
        var n,
          i = (n = document.getElementById("wl-search-inp")) ? n.value.trim().toLowerCase() : u,
          o = i
            ? t.filter(function (e) {
                return e.name && -1 !== e.name.toLowerCase().indexOf(i);
              })
            : t.slice();
        if (!(o = v(o)).length) return ((e.innerHTML = '<div class="wl-no-match">No pins match "' + escHtml(i) + '"</div>'), de(e, 0), void ue(e, 0));
        if (
          (o.forEach(function (t) {
            var n = document.createElement("div");
            ((n.className = "wl-chip"),
              n.setAttribute("data-pin-id", t.id),
              t.id === m && n.classList.add("wl-chip-new"),
              t.id === f && n.classList.add("flying-to"),
              (n.title = "Click to fly to " + t.name),
              (n.innerHTML =
                '<span class="wl-chip-dot"></span><span class="wl-chip-name">' +
                escHtml(t.name) +
                '</span><span class="wl-chip-coords">' +
                escHtml(t.lat.toFixed(2)) +
                "," +
                escHtml(t.lng.toFixed(2)) +
                '</span><button class="wl-chip-share" title="Share pin link"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" style="width:9px;height:9px;"><path d="M5 7l2-2"/><circle cx="3.5" cy="3.5" r="1.5"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="3.5" r="1.5"/></svg></button><button class="wl-chip-dup" title="Duplicate pin"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" style="width:9px;height:9px;"><rect x="2" y="2" width="6" height="6" rx="1"/><path d="M4.5 8v1.5a1 1 0 0 0 1 1h3.5a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H8"/></svg></button><button class="wl-chip-rm" title="Remove pin">×</button>'),
              n.addEventListener("click", function (e) {
                e.target.classList.contains("wl-chip-rm") ||
                  e.target.classList.contains("wl-chip-dup") ||
                  e.target.classList.contains("wl-chip-share") ||
                  e.target.closest(".wl-chip-dup") ||
                  e.target.closest(".wl-chip-share") ||
                  (function (e) {
                    if (!window.map) return;
                    void 0 !== curView && "3d" === curView && setView("2d");
                    ((f = e.id), fe(), T(e.id), map.flyTo([e.lat, e.lng], 10, { duration: 1.4 }), a[e.id] && a[e.id].openPopup());
                    var t = function () {
                      ((f = null), fe(), map.off("moveend", t));
                    };
                    (map.once("moveend", t),
                      setTimeout(function () {
                        f === e.id && ((f = null), fe());
                      }, 3e3));
                  })(t);
              }),
              n.addEventListener("dblclick", function (e) {
                (e.stopPropagation(), O(t));
              }),
              n.querySelector(".wl-chip-rm").addEventListener("click", function (e) {
                (e.stopPropagation(),
                  (function (e) {
                    a[e] && window.map && (map.removeLayer(a[e]), delete a[e]);
                    var t = l().filter(function (t) {
                      return t.id !== e;
                    });
                    (c(t),
                      (function (e) {
                        var t = S();
                        if (t[e]) {
                          delete t[e];
                          try {
                            localStorage.setItem(b, JSON.stringify(t));
                          } catch (e) {}
                        }
                      })(e),
                      h());
                  })(t.id));
              }),
              n.querySelector(".wl-chip-dup").addEventListener("click", function (e) {
                (e.stopPropagation(), R(t.id));
              }),
              n.querySelector(".wl-chip-share").addEventListener("click", function (e) {
                (e.stopPropagation(), W(t.id));
              }),
              (function (e, t) {
                var n = null;
                (e.addEventListener("mouseenter", function () {
                  (n && clearTimeout(n),
                    ye && (clearTimeout(ye), (ye = null)),
                    (n = setTimeout(function () {
                      ve(e, t);
                    }, 300)));
                }),
                  e.addEventListener("mouseleave", function () {
                    (n && (clearTimeout(n), (n = null)), Ce());
                  }),
                  e.addEventListener("focus", function () {
                    ve(e, t);
                  }),
                  e.addEventListener("blur", function () {
                    Ce();
                  }));
                var i = null,
                  a = 0,
                  o = 0;
                (e.addEventListener(
                  "touchstart",
                  function (n) {
                    if (1 === n.touches.length) {
                      var r = n.touches[0];
                      ((a = r.clientX),
                        (o = r.clientY),
                        i && clearTimeout(i),
                        (i = setTimeout(function () {
                          ((i = null), ve(e, t), n.preventDefault && n.preventDefault());
                        }, 500)));
                    }
                  },
                  { passive: !0 },
                ),
                  e.addEventListener(
                    "touchmove",
                    function (e) {
                      if (i && 1 === e.touches.length) {
                        var t = e.touches[0],
                          n = t.clientX - a,
                          r = t.clientY - o;
                        n * n + r * r > 100 && (clearTimeout(i), (i = null));
                      }
                    },
                    { passive: !0 },
                  ),
                  e.addEventListener(
                    "touchend",
                    function () {
                      i && (clearTimeout(i), (i = null));
                    },
                    { passive: !0 },
                  ),
                  e.addEventListener(
                    "touchcancel",
                    function () {
                      i && (clearTimeout(i), (i = null));
                    },
                    { passive: !0 },
                  ));
              })(n, t),
              e.appendChild(n));
          }),
          m &&
            setTimeout(function () {
              m = null;
            }, 1800),
          "wl-panel-chips" === e.id)
        ) {
          e.style.maxHeight = "";
          var r = document.getElementById("wl-more-hint");
          r && (r.style.display = "none");
        } else (de(e, o.length), ue(e, o.length));
      }
    }
    var w = "WI_pinSort";
    function y() {
      try {
        var e = localStorage.getItem(w);
        return e && { newest: 1, oldest: 1, name: 1, distance: 1, recent: 1 }[e] ? e : "newest";
      } catch (e) {
        return "newest";
      }
    }
    function v(e) {
      var t = y(),
        n = document.getElementById("wl-sort-sel");
      n && n.value !== t && (n.value = t);
      var i = e.slice();
      if ("oldest" === t)
        i.sort(function (e, t) {
          return C(e) - C(t);
        });
      else if ("name" === t)
        i.sort(function (e, t) {
          return (e.name || "").localeCompare(t.name || "");
        });
      else if ("recent" === t)
        i.sort(function (e, t) {
          return I(t) - I(e);
        });
      else if ("distance" === t) {
        var a = window.map ? window.map.getCenter() : null;
        if (a) {
          var o = a.lat,
            r = a.lng;
          i.sort(function (e, t) {
            return k(o, r, e.lat, e.lng) - k(o, r, t.lat, t.lng);
          });
        }
      }
      return ("newest" === t && i.reverse(), i);
    }
    function C(e) {
      if ("number" == typeof e.ts) return e.ts;
      if ("string" == typeof e.id) {
        var t = parseInt(e.id.split("-")[0], 10);
        if (!isNaN(t)) return t;
      }
      return 0;
    }
    var b = "WI_pinFlown",
      E = null;
    function S() {
      if (E) return E;
      try {
        E = JSON.parse(localStorage.getItem(b) || "{}");
      } catch (e) {
        E = {};
      }
      return E;
    }
    function T(e) {
      var t = S();
      t[e] = Date.now();
      try {
        localStorage.setItem(b, JSON.stringify(t));
      } catch (e) {}
    }
    function I(e) {
      return S()[e.id] || 0;
    }
    function k(e, t, n, i) {
      var a = ((n - e) * Math.PI) / 180,
        o = ((i - t) * Math.PI) / 180,
        r = Math.sin(a / 2) * Math.sin(a / 2) + Math.cos((e * Math.PI) / 180) * Math.cos((n * Math.PI) / 180) * Math.sin(o / 2) * Math.sin(o / 2);
      return 12742 * Math.atan2(Math.sqrt(r), Math.sqrt(1 - r));
    }
    var x = !1;
    function M() {
      d = !d;
      var e = document.getElementById("wl-search-wrap"),
        t = document.getElementById("wl-search-btn"),
        n = document.getElementById("wl-search-inp");
      if (e)
        if (((e.style.display = d ? "flex" : "none"), t && t.classList.toggle("active", d), d))
          n &&
            ((n.value = u),
            setTimeout(function () {
              n.focus();
            }, 50));
        else {
          ((u = ""), n && (n.value = ""));
          var i = document.getElementById("wl-search-clear");
          (i && (i.style.display = "none"), h());
        }
    }
    function _() {
      u = "";
      var e = document.getElementById("wl-search-inp");
      e && (e.value = "");
      var t = document.getElementById("wl-search-clear");
      (t && (t.style.display = "none"), h());
    }
    function A() {
      p = !p;
      var e = document.getElementById("wl-sort-wrap"),
        t = document.getElementById("wl-sort-btn");
      if (e && ((e.style.display = p ? "flex" : "none"), t && t.classList.toggle("active", p), p)) {
        var n = document.getElementById("wl-sort-sel");
        (n && (n.value = y()), D(), P());
      }
    }
    function B() {
      g = !g;
      var e = document.getElementById("wl-menu"),
        t = document.getElementById("wl-more-btn");
      e && ((e.style.display = g ? "flex" : "none"), t && t.classList.toggle("active", g), g && (D(), V()));
    }
    function D() {
      if (d) {
        d = !1;
        var e = document.getElementById("wl-search-wrap"),
          t = document.getElementById("wl-search-btn");
        (e && (e.style.display = "none"), t && t.classList.remove("active"));
      }
    }
    function V() {
      if (p) {
        p = !1;
        var e = document.getElementById("wl-sort-wrap"),
          t = document.getElementById("wl-sort-btn");
        (e && (e.style.display = "none"), t && t.classList.remove("active"));
      }
    }
    function P() {
      if (g) {
        g = !1;
        var e = document.getElementById("wl-menu"),
          t = document.getElementById("wl-more-btn");
        (e && (e.style.display = "none"), t && t.classList.remove("active"));
      }
    }
    function R(e) {
      var t = l();
      if (t.length >= 20) Me({ title: "Pin limit reached (20 max)" });
      else {
        for (var n = null, i = 0; i < t.length; i++)
          if (t[i].id === e) {
            n = t[i];
            break;
          }
        if (n) {
          var a = { id: Date.now().toString() + "-" + Math.random().toString(36).slice(2), name: n.name + " (copy)", lat: n.lat, lng: n.lng };
          (t.push(a), c(t), Le(a), (m = a.id), h(), Me({ title: "Duplicated: " + a.name, duration: 2e3 }));
        } else Me({ title: "Pin not found" });
      }
    }
    var N = null;
    function O(e) {
      N = e.id;
      var t = document.getElementById("pin-rename-dialog"),
        n = document.getElementById("pin-rename-inp"),
        i = document.getElementById("pin-notes-inp");
      (t && (t.style.display = "flex"),
        n &&
          ((n.value = e.name),
          setTimeout(function () {
            (n.focus(), n.select());
          }, 50)),
        i && (i.value = e.notes || ""));
    }
    function H() {
      var e = document.getElementById("pin-rename-inp"),
        t = document.getElementById("pin-notes-inp"),
        n = e ? e.value.trim() : "",
        i = t ? t.value.trim() : "";
      if ((n || (n = "Unnamed Pin"), N)) {
        for (var o = l(), r = !1, s = 0; s < o.length; s++)
          if (o[s].id === N) {
            ((o[s].name = n), (o[s].notes = i), (r = !0));
            break;
          }
        if (r) {
          if ((c(o), a[N])) {
            var d = o.filter(function (e) {
              return e.id === N;
            })[0];
            d &&
              a[N].setPopupContent(
                '<div style="font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:#ffffff;margin-bottom:4px;">' +
                  escHtml(d.name) +
                  '</div><div style="font-family:JetBrains Mono,monospace;font-size:10px;color:#94a3b8;">' +
                  escHtml(d.lat.toFixed(5)) +
                  ", " +
                  escHtml(d.lng.toFixed(5)) +
                  "</div>" +
                  (d.notes
                    ? '<div style="font-family:Inter,sans-serif;font-size:11px;color:rgba(232,237,245,.7);margin-top:6px;max-width:180px;white-space:normal;">' + escHtml(d.notes) + "</div>"
                    : ""),
              );
          }
          (h(), Me({ title: "Renamed to: " + n, duration: 2e3 }));
        }
        G();
      } else G();
    }
    function G() {
      var e = document.getElementById("pin-rename-dialog");
      (e && (e.style.display = "none"), (N = null));
    }
    function W(e) {
      for (var t = l(), n = null, i = 0; i < t.length; i++)
        if (t[i].id === e) {
          n = t[i];
          break;
        }
      if (n) {
        var a = window.map ? window.map.getZoom() : 10,
          o = window.location.href.split("?")[0] + "?lat=" + n.lat.toFixed(6) + "&lng=" + n.lng.toFixed(6) + "&z=" + a + "&pin=" + encodeURIComponent(n.name);
        navigator.clipboard && navigator.clipboard.writeText
          ? navigator.clipboard
              .writeText(o)
              .then(function () {
                Me({ title: "Pin link copied to clipboard", duration: 2500 });
              })
              .catch(function () {
                Me({ title: o.slice(0, 50) + "…", duration: 4e3 });
              })
          : Me({ title: o.slice(0, 50) + "…", duration: 4e3 });
      } else Me({ title: "Pin not found" });
    }
    var F = !1,
      U = !1,
      z = 0,
      q = [],
      j = null,
      Z = !1,
      J = [
        { flight: 2400, dwell: 2e3, label: "0.5×" },
        { flight: 1800, dwell: 1400, label: "1×" },
        { flight: 1200, dwell: 900, label: "1.5×" },
        { flight: 800, dwell: 500, label: "2×" },
      ],
      K = (function () {
        try {
          var e = parseInt(localStorage.getItem("WI_tourSpeed"), 10);
          return !isNaN(e) && e >= 0 && e < J.length ? e : 1;
        } catch (e) {
          return 1;
        }
      })();
    function Y() {
      return J[K].flight;
    }
    var X = 0,
      Q = 0,
      $ = 0;
    function ee() {
      if (F)
        if (z >= q.length)
          !(function () {
            var e = q.length,
              t = Date.now() - X - Q;
            ((F = !1), (U = !1), (Z = !1), (q = []), (z = 0), j && (clearTimeout(j), (j = null)));
            ((f = null), fe(), se(), Me({ title: "✅ Tour complete — " + e + " pins in " + te(t), duration: 3e3 }));
          })();
        else if (!U) {
          var e = q[z];
          (!(function (e, t, n) {
            var i = document.getElementById("wl-tour-progress"),
              a = document.getElementById("wl-tour-fill"),
              o = document.getElementById("wl-tour-name");
            i && (i.textContent = e + 1 + " / " + t);
            a && (a.style.width = ((e + 1) / t) * 100 + "%");
            o && (o.textContent = n);
          })(z, q.length, e.name),
            le(),
            window.map &&
              (void 0 !== curView && "3d" === curView && setView("2d"),
              (f = e.id),
              fe(),
              T(e.id),
              (Z = !0),
              map.flyTo([e.lat, e.lng], 10, { duration: Y() / 1e3 }),
              a[e.id] && a[e.id].openPopup(),
              setTimeout(function () {
                Z = !1;
              }, Y() + 200)),
            j && clearTimeout(j),
            (j = setTimeout(function () {
              (z++, ee());
            }, Y() + J[K].dwell)));
        }
    }
    function te(e) {
      var t = Math.round(e / 1e3);
      return t < 60 ? t + "s" : Math.floor(t / 60) + "m " + (t % 60) + "s";
    }
    function ne() {
      F && (window.map && map.stop(), (F = !1), (U = !1), (Z = !1), (q = []), (z = 0), j && (clearTimeout(j), (j = null)), (f = null), fe(), se(), Me({ title: "⏹️ Tour stopped", duration: 1800 }));
    }
    function ie() {
      if (F) {
        U = !U;
        var e = document.getElementById("wl-tour-bar");
        e && e.classList.toggle("paused", U);
        var t = document.querySelector(".wl-tour-icon-pause"),
          n = document.querySelector(".wl-tour-icon-play");
        (t && (t.style.display = U ? "none" : ""), n && (n.style.display = U ? "" : "none"));
        var i = document.getElementById("wl-tour-label-text");
        (i && (i.textContent = U ? "Paused" : "Tour"),
          U
            ? (($ = Date.now()), j && (clearTimeout(j), (j = null)), window.map && map.stop(), Me({ title: "⏸️ Tour paused", duration: 1500 }))
            : ($ && ((Q += Date.now() - $), ($ = 0)), ee(), Me({ title: "▶️ Tour resumed", duration: 1500 })));
      }
    }
    function ae() {
      F && (z <= 0 ? Me({ title: "Already at the first pin", duration: 1500 }) : (z--, j && (clearTimeout(j), (j = null)), window.map && map.stop(), ee()));
    }
    function oe() {
      F && (z >= q.length - 1 ? Me({ title: "Already at the last pin", duration: 1500 }) : (z++, j && (clearTimeout(j), (j = null)), window.map && map.stop(), ee()));
    }
    function re() {
      !F || U || Z || ie();
    }
    function se() {
      var e = document.getElementById("wl-tour-bar");
      e && ((e.style.display = "none"), e.classList.remove("paused"));
      var t = document.querySelector(".wl-tour-icon-pause"),
        n = document.querySelector(".wl-tour-icon-play");
      (t && (t.style.display = ""), n && (n.style.display = "none"));
      var i = document.getElementById("wl-tour-label-text");
      i && (i.textContent = "Tour");
    }
    function le() {
      var e = document.getElementById("wl-tour-prev"),
        t = document.getElementById("wl-tour-next");
      (e && (e.disabled = z <= 0), t && (t.disabled = z >= q.length - 1));
    }
    var ce = 4;
    function de(e, t) {
      if (e) {
        if (("number" != typeof t && (t = e.querySelectorAll(".wl-chip").length), t <= ce)) return ((e.style.maxHeight = ""), void e.classList.remove("can-scroll"));
        var n = e.querySelector(".wl-chip");
        if (n) {
          var i = n.getBoundingClientRect().height;
          if (i) {
            var a = parseFloat(getComputedStyle(e).rowGap || getComputedStyle(e).gap) || 3,
              o = Math.ceil(i) * ce + a * (ce - 1);
            ((e.style.maxHeight = o + "px"), e.classList.add("can-scroll"));
          } else e.style.maxHeight = "";
        } else e.style.maxHeight = "";
      }
    }
    function ue(e, t) {
      if (e) {
        var n = e.parentElement;
        if (n) {
          var i = document.getElementById("wl-more-hint");
          t - ce <= 0
            ? i && (i.style.display = "none")
            : (i ||
                (((i = document.createElement("div")).id = "wl-more-hint"),
                (i.className = "wl-more-hint"),
                (i.title = "Scroll the pins list to see more"),
                i.addEventListener("click", function () {
                  var e = document.getElementById("wl-panel-chips") || document.getElementById("watchlist-chips");
                  e && (i.classList.contains("at-top") ? e.scrollTo({ top: 0, behavior: "smooth" }) : e.scrollBy({ top: 0.85 * e.clientHeight, behavior: "smooth" }));
                }),
                n.insertBefore(i, e.nextSibling)),
              (i.style.display = ""),
              me(e, i));
        }
      }
    }
    function me(e, t) {
      if (e && t) {
        var n = e.querySelectorAll(".wl-chip");
        if (n.length) {
          for (var i = e.getBoundingClientRect(), a = 0, o = 0; o < n.length; o++) {
            n[o].getBoundingClientRect().top >= i.bottom - 0.5 && a++;
          }
          a <= 0 ? ((t.textContent = "↑ Top"), t.classList.add("at-top")) : ((t.textContent = "↓ " + a + " more pin" + (a > 1 ? "s" : "")), t.classList.remove("at-top"));
        } else t.style.display = "none";
      }
    }
    function fe() {
      for (var e = document.querySelectorAll("#watchlist-chips .wl-chip"), t = 0; t < e.length; t++) {
        e[t].getAttribute("data-pin-id") === f ? e[t].classList.add("flying-to") : e[t].classList.remove("flying-to");
      }
    }
    function pe(e) {
      return e < 1 ? Math.round(1e3 * e) + " m" : e < 10 ? e.toFixed(1) + " km" : e < 1e3 ? Math.round(e) + " km" : 10 * Math.round(e / 10) + " km";
    }
    function ge(e) {
      if (!e) return "never";
      var t = Date.now() - e,
        n = Math.floor(t / 1e3);
      if (n < 60) return n + "s ago";
      var i = Math.floor(n / 60);
      if (i < 60) return i + "m ago";
      var a = Math.floor(i / 60);
      if (a < 24) return a + "h ago";
      var o = Math.floor(a / 24);
      return o < 30 ? o + "d ago" : new Date(e).toLocaleDateString();
    }
    function he(e) {
      if (!window.map) return null;
      var t = window.map.getCenter();
      return k(t.lat, t.lng, e.lat, e.lng);
    }
    var we = null,
      ye = null;
    function ve(e, t) {
      var n =
        we ||
        (((we = document.createElement("div")).className = "wl-pin-popover"),
        we.setAttribute("role", "tooltip"),
        (we.style.display = "none"),
        document.body.appendChild(we),
        we.addEventListener("mouseenter", function () {
          ye && (clearTimeout(ye), (ye = null));
        }),
        we.addEventListener("mouseleave", function () {
          Ce();
        }),
        we);
      n.setAttribute("data-current-pin-id", t.id);
      var i = he(t),
        a = I(t),
        o = C(t);
      ((n.innerHTML =
        '<div class="wl-pop-header"><span class="wl-pop-dot"></span><span class="wl-pop-name">' +
        escHtml(t.name) +
        '</span></div><div class="wl-pop-row"><span class="wl-pop-label">Coordinates</span><span class="wl-pop-value wl-pop-mono">' +
        t.lat.toFixed(5) +
        ", " +
        t.lng.toFixed(5) +
        "</span></div>" +
        (null !== i ? '<div class="wl-pop-row"><span class="wl-pop-label">From center</span><span class="wl-pop-value wl-pop-dist">' + pe(i) + "</span></div>" : "") +
        '<div class="wl-pop-row"><span class="wl-pop-label">Last flown</span><span class="wl-pop-value">' +
        ge(a) +
        "</span></div>" +
        (o ? '<div class="wl-pop-row"><span class="wl-pop-label">Created</span><span class="wl-pop-value">' + ge(o) + "</span></div>" : "") +
        (t.notes ? '<div class="wl-pop-notes">' + escHtml(t.notes) + "</div>" : "") +
        '<div class="wl-pop-hint">Click to fly · dbl-click to edit · × to remove</div>'),
        (n.style.display = "block"),
        n.classList.add("show"));
      var r,
        s,
        l = e.getBoundingClientRect(),
        c = n.offsetWidth,
        d = n.offsetHeight;
      if (!!e.closest("#wi-pins-panel")) {
        var u = document.getElementById("wi-pins-panel");
        ((r = (u ? u.getBoundingClientRect().left : l.left) - c - 8), (s = l.top - 4), r < 8 && ((r = Math.max(8, l.left)), (s = l.bottom + 6)));
      } else ((r = l.right + 8), (s = l.top - 4), r + c > window.innerWidth - 8 && ((r = l.left), (s = l.bottom + 6)));
      (s + d > window.innerHeight - 8 && (s = Math.max(8, window.innerHeight - d - 8)), s < 8 && (s = 8), (n.style.left = r + "px"), (n.style.top = s + "px"));
    }
    function Ce() {
      (ye && (clearTimeout(ye), (ye = null)),
        (ye = setTimeout(function () {
          we && ((we.style.display = "none"), we.classList.remove("show"));
        }, 120)));
    }
    var be = null;
    function Ee() {
      be ||
        (be = requestAnimationFrame(function () {
          if (((be = null), we && "none" !== we.style.display)) {
            for (var e = we.getAttribute("data-current-pin-id"), t = l(), n = null, i = 0; i < t.length; i++)
              if (t[i].id === e) {
                n = t[i];
                break;
              }
            if (n) {
              var a = we.querySelector(".wl-pop-dist");
              if (a) {
                var o = he(n);
                null !== o && (a.textContent = pe(o));
              }
            }
          }
        }));
    }
    function Le(e) {
      if (window.map) {
        var t = L.divIcon({
            className: "",
            html: '<div style="position:relative;width:0;height:0;"><div style="position:absolute;width:18px;height:18px;border-radius:50% 50% 50% 0;background:#ffffff;border:2px solid #fff;transform:rotate(-45deg);left:-9px;top:-18px;box-shadow:0 0 6px rgba(255,255,255,.6);"></div><div style="position:absolute;width:4px;height:4px;border-radius:50%;background:#04050a;left:-2px;top:-10px;z-index:1;"></div></div>',
            iconSize: [0, 0],
            iconAnchor: [0, 0],
          }),
          n = L.marker([e.lat, e.lng], { icon: t, zIndexOffset: 2e3 });
        (n.bindPopup(
          '<div style="font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:#ffffff;margin-bottom:4px;">' +
            escHtml(e.name) +
            '</div><div style="font-family:JetBrains Mono,monospace;font-size:10px;color:#94a3b8;">' +
            escHtml(e.lat.toFixed(5)) +
            ", " +
            escHtml(e.lng.toFixed(5)) +
            "</div>",
          { className: "wl-popup", maxWidth: 200 },
        ),
          n.addTo(map),
          (a[e.id] = n));
      }
    }
    function Se() {
      document.body.classList.remove("pin-drop-mode");
      var e = document.getElementById("wl-pin-btn");
      (e && e.classList.remove("active"), s && (map.off("click", s), (s = null)));
    }
    function Te() {
      var e = document.getElementById("pin-name-inp"),
        t = e ? e.value.trim() : "";
      if ((t || (t = "Pin " + (l().length + 1)), !Number.isFinite(o) || !Number.isFinite(r))) return (Me({ title: "Invalid pin location" }), void Ie());
      var n = { id: Date.now().toString() + "-" + Math.random().toString(36).slice(2), name: t, lat: o, lng: r },
        i = l();
      if (i.length >= 20) return (Me({ title: "Pin limit reached (20 max)" }), void Ie());
      (i.push(n), c(i), Le(n), (m = n.id), h(), Ie(), window.map && map.flyTo([n.lat, n.lng], 10, { duration: 1.2 }));
    }
    function Ie() {
      var e = document.getElementById("pin-dialog");
      (e && (e.style.display = "none"), (o = null), (r = null), Se());
    }
    function ke() {
      (Object.keys(a).forEach(function (e) {
        if (a[e] && window.map)
          try {
            map.removeLayer(a[e]);
          } catch (e) {}
      }),
        (a = {}));
    }
    function xe() {
      (ke(),
        l().forEach(function (e) {
          Le(e);
        }),
        (function () {
          try {
            var e = new URLSearchParams(window.location.search),
              t = parseFloat(e.get("lat")),
              n = parseFloat(e.get("lng")),
              i = e.get("pin");
            if (!isFinite(t) || !isFinite(n) || !i) return;
            var a = l(),
              o = a.some(function (e) {
                return e.name === i && Math.abs(e.lat - t) < 1e-4 && Math.abs(e.lng - n) < 1e-4;
              });
            if (o) return;
            if (a.length >= 20) return;
            var r = { id: Date.now().toString() + "-" + Math.random().toString(36).slice(2), name: i, lat: t, lng: n };
            (a.push(r), c(a), Le(r), (m = r.id), h(), Me({ title: "Added pin from link: " + i, duration: 3500 }));
            try {
              window.history.replaceState({}, "", window.location.pathname);
            } catch (e) {}
          } catch (e) {}
        })());
    }
    function Me(e) {
      var t = document.getElementById("toast-container");
      if (t) {
        var n = t.querySelectorAll(".wi-toast");
        n.length >= 5 && n[0].remove();
        var i = document.createElement("div");
        i.className = "wi-toast";
        var a,
          o = new Date(),
          r = o.getUTCHours().toString().padStart(2, "0") + ":" + o.getUTCMinutes().toString().padStart(2, "0") + " UTC";
        ((i.innerHTML =
          '<div class="toast-title">' +
          escHtml(e.title || "Alert") +
          "</div>" +
          (e.body ? '<div class="toast-body">' + escHtml(e.body) + "</div>" : "") +
          '<div class="toast-time">' +
          escHtml(r) +
          "</div>"),
          i.addEventListener("mouseenter", function () {
            clearTimeout(a);
          }),
          i.addEventListener("mouseleave", l),
          i.addEventListener("click", function () {
            (s(i), e.onClick && e.onClick());
          }),
          t.appendChild(i),
          l());
      }
      function s(e) {
        (e.classList.add("dismissing"),
          setTimeout(function () {
            e.parentNode && e.parentNode.removeChild(e);
          }, 220));
      }
      function l() {
        a = setTimeout(function () {
          s(i);
        }, e.duration || 8e3);
      }
    }
    return (
      document.addEventListener("DOMContentLoaded", function () {
        h();
        var e = document.getElementById("pin-name-inp");
        e &&
          e.addEventListener("keydown", function (e) {
            ("Enter" === e.key && Te(), "Escape" === e.key && Ie());
          });
        var t = document.getElementById("pin-rename-inp");
        t &&
          t.addEventListener("keydown", function (e) {
            ("Enter" === e.key && H(), "Escape" === e.key && G());
          });
        var n = document.getElementById("pin-rename-dialog");
        n &&
          n.addEventListener("click", function (e) {
            e.target === n && G();
          });
        var i = null;
        function a() {
          var e = document.getElementById("wl-panel-chips") || document.getElementById("watchlist-chips");
          if (e && "wl-panel-chips" !== e.id) {
            de(e);
            var t = document.getElementById("wl-more-hint");
            t && me(e, t);
          }
        }
        (window.addEventListener("load", function () {
          setTimeout(a, 300);
        }),
          document.fonts && document.fonts.ready && document.fonts.ready.then(a),
          window.addEventListener("resize", function () {
            (clearTimeout(i), (i = setTimeout(a, 200)));
          }));
        var o = document.getElementById("wl-panel-chips") || document.getElementById("watchlist-chips");
        if (o) {
          var r = null;
          o.addEventListener(
            "scroll",
            function () {
              r ||
                (r = requestAnimationFrame(function () {
                  r = null;
                  var e = document.getElementById("wl-more-hint");
                  e && me(o, e);
                }));
            },
            { passive: !0 },
          );
        }
        var s = document.getElementById("wl-search-inp");
        if (s) {
          var l = null;
          (s.addEventListener("input", function () {
            u = s.value.trim().toLowerCase();
            var e = document.getElementById("wl-search-clear");
            (e && (e.style.display = u ? "" : "none"), l && clearTimeout(l), (l = setTimeout(h, 120)));
          }),
            s.addEventListener("keydown", function (e) {
              "Escape" === e.key && (s.value ? _() : M(), e.preventDefault());
            }));
        }
        var c = document.getElementById("wl-sort-sel");
        (c &&
          ((c.value = y()),
          c.addEventListener("change", function () {
            (!(function (e) {
              try {
                localStorage.setItem(w, e);
              } catch (e) {}
            })(c.value),
              h());
          })),
          document.addEventListener("keydown", function (e) {
            var t = (e.target && e.target.tagName) || "";
            if ("INPUT" === t || "TEXTAREA" === t || "SELECT" === t || (e.target && e.target.isContentEditable)) "Escape" === e.key && (d ? M() : (V(), P()));
            else if (!(e.ctrlKey || e.metaKey || e.altKey)) {
              if (F) {
                if (" " === e.key || "Space" === e.code) return (e.preventDefault(), void ie());
                if ("ArrowLeft" === e.key) return (e.preventDefault(), void ae());
                if ("ArrowRight" === e.key) return (e.preventDefault(), void oe());
                if ("Escape" === e.key) return (e.preventDefault(), void ne());
              }
              "p" === e.key || "P" === e.key ? (e.preventDefault(), window.ALERTS && window.ALERTS.startPinDrop && window.ALERTS.startPinDrop()) : "Escape" === e.key && (d ? M() : p ? A() : g && B());
            }
          }),
          document.addEventListener("click", function (e) {
            if (g) {
              var t = document.getElementById("wl-menu"),
                n = document.getElementById("wl-more-btn");
              t && !t.contains(e.target) && n && !n.contains(e.target) && P();
            }
            if (p) {
              var i = document.getElementById("wl-sort-wrap"),
                a = document.getElementById("wl-sort-btn");
              i && !i.contains(e.target) && a && !a.contains(e.target) && V();
            }
          }));
      }),
      window.addEventListener("load", function () {
        setTimeout(xe, 1e3);
      }),
      window.addEventListener("load", function () {
        setTimeout(function () {
          window.map && "function" == typeof window.map.on && (window.map.on("moveend", Ee), window.map.on("dragstart", re), window.map.on("zoomstart", re));
        }, 1500);
      }),
      {
        startPinDrop: function () {
          if (window.map) {
            if (typeof window.WI_StorageChoice === "function" && typeof window.WI_StoragePopup === "function" && !window.WI_StorageChoice()) {
              window.WI_StoragePopup("Pins & Watchlist", function(choice) {
                if (choice) { window.ALERTS.startPinDrop(); }
              });
              return;
            }
            var e = document.getElementById("wl-pin-btn");
            (e && e.classList.add("active"),
              document.body.classList.add("pin-drop-mode"),
              Me({ title: "📍 Click anywhere on the map to place a pin", duration: 4e3 }),
              (s = function (e) {
                ((o = e.latlng.lat),
                  (r = e.latlng.lng),
                  Se(),
                  (function () {
                    var e = document.getElementById("pin-dialog"),
                      t = document.getElementById("pin-name-inp");
                    e && (e.style.display = "flex");
                    t &&
                      ((t.value = ""),
                      setTimeout(function () {
                        t.focus();
                      }, 100));
                  })());
              }),
              map.once("click", s));
          }
        },
        cancelPin: Ie,
        confirmPin: Te,
        toast: Me,
        checkHeadlines: function (e) {
          var n = l();
          if (n.length && e && e.length) {
            e.forEach(function (e) {
              var a = (e.text || e.title || "").toLowerCase();
              n.forEach(function (n) {
                if (-1 !== a.indexOf(n.name.toLowerCase())) {
                  var o = n.id + ":" + a.slice(0, 60),
                    r = Date.now();
                  (t[o] && r - t[o] < i) || ((t[o] = r), Me({ title: "📰 " + n.name + " — News Alert", body: e.text || e.title }));
                }
              });
            });
            var a = Date.now() - i;
            Object.keys(t).forEach(function (e) {
              t[e] < a && delete t[e];
            });
          }
        },
        checkConflicts: function (e) {
          var n = l();
          n.length &&
            e &&
            e.length &&
            e.forEach(function (e) {
              var a = (e.location || e.country || "").toLowerCase();
              n.forEach(function (n) {
                if (-1 !== a.indexOf(n.name.toLowerCase())) {
                  var o = n.id + ":" + (e.id || a),
                    r = Date.now();
                  (t[o] && r - t[o] < i) || ((t[o] = r), Me({ title: n.name + " — Conflict Alert", body: e.title || e.location }));
                }
              });
            });
        },
        load: l,
        renderChips: h,
        restorePins: xe,
        clearPinMarkers: ke,
        togglePinSearch: M,
        clearPinSearch: _,
        clearAllPins: function () {
          var e = l();
          e.length
            ? n({ icon: "trash", title: "Clear all pins?", message: "Delete all " + e.length + " pins? This cannot be undone.", okText: "Delete all", cancelText: "Cancel" }).then(function (t) {
                t &&
                  (Object.keys(a).forEach(function (e) {
                    if (a[e] && window.map)
                      try {
                        map.removeLayer(a[e]);
                      } catch (e) {}
                    delete a[e];
                  }),
                  c([]),
                  (m = null),
                  (function () {
                    E = {};
                    try {
                      localStorage.removeItem(b);
                    } catch (e) {}
                  })(),
                  h(),
                  Me({ title: "Cleared " + e.length + " pins", duration: 2500 }));
              })
            : Me({ title: "No pins to clear" });
        },
        togglePinSort: A,
        togglePinMenu: B,
        exportPins: function () {
          P();
          var e = l();
          if (e.length) {
            var t = JSON.stringify(e, null, 2),
              n = new Blob([t], { type: "application/json" }),
              i = URL.createObjectURL(n),
              a = document.createElement("a");
            ((a.href = i), (a.download = "worldintelligence-pins.json"), a.click(), URL.revokeObjectURL(i), Me({ title: "Exported " + e.length + " pins", duration: 2500 }));
          } else Me({ title: "No pins to export" });
        },
        importPins: function () {
          P();
          var e = document.createElement("input");
          ((e.type = "file"),
            (e.accept = ".json,application/json"),
            (e.onchange = function (e) {
              var t = e.target.files[0];
              if (t) {
                var n = new FileReader();
                ((n.onload = function (e) {
                  try {
                    var t = JSON.parse(e.target.result);
                    if (!Array.isArray(t)) throw new Error("Not an array");
                    var n = t.filter(function (e) {
                      return (
                        e &&
                        "string" == typeof e.id &&
                        "number" == typeof e.lat &&
                        "number" == typeof e.lng &&
                        isFinite(e.lat) &&
                        isFinite(e.lng) &&
                        e.lat >= -90 &&
                        e.lat <= 90 &&
                        e.lng >= -180 &&
                        e.lng <= 180
                      );
                    });
                    if (!n.length) throw new Error("No valid pins");
                    var i = l(),
                      a = {};
                    i.forEach(function (e) {
                      a[e.id] = !0;
                    });
                    var o = 0;
                    (n.forEach(function (e) {
                      (a[e.id] && (e.id = Date.now().toString() + "-" + Math.random().toString(36).slice(2)), (e.name && "string" == typeof e.name) || (e.name = "Imported Pin"), i.push(e), o++);
                    }),
                      i.length > 20 && (i = i.slice(i.length - 20)),
                      c(i),
                      h(),
                      n.slice(-o).forEach(function (e) {
                        Le(e);
                      }),
                      Me({ title: "Imported " + o + " pins", duration: 2500 }));
                  } catch (e) {
                    Me({ title: "Invalid file format", duration: 3e3 });
                  }
                }),
                  n.readAsText(t));
              }
            }),
            e.click());
        },
        duplicateLastPin: function () {
          P();
          var e = l();
          if (e.length)
            if (e.length >= 20) Me({ title: "Pin limit reached (20 max)" });
            else {
              var t = e[e.length - 1],
                n = { id: Date.now().toString() + "-" + Math.random().toString(36).slice(2), name: t.name + " (copy)", lat: t.lat, lng: t.lng };
              (e.push(n), c(e), Le(n), (m = n.id), h(), Me({ title: "Duplicated: " + n.name, duration: 2e3 }));
            }
          else Me({ title: "No pins to duplicate" });
        },
        duplicatePin: R,
        sharePin: W,
        startRenamePin: O,
        confirmRename: H,
        cancelRename: G,
        wiConfirm: n,
        startPinTour: function () {
          P();
          var e = l();
          e.length < 2
            ? Me({ title: "Need at least 2 pins for a tour" })
            : F
              ? ne()
              : ((q = v(e)),
                (z = 0),
                (F = !0),
                (U = !1),
                (Z = !1),
                (X = Date.now()),
                (Q = 0),
                ($ = 0),
                (function () {
                  var e = document.getElementById("wl-tour-bar");
                  e && ((e.style.display = "flex"), e.classList.remove("paused"));
                  var t = document.getElementById("wl-tour-speed");
                  t && (t.textContent = J[K].label);
                })(),
                le(),
                ee(),
                Me({ title: "🛫 Tour started — " + q.length + " pins", duration: 2e3 }));
        },
        stopPinTour: ne,
        tourTogglePause: ie,
        tourPrev: ae,
        tourNext: oe,
        tourCycleSpeed: function () {
          if (F) {
            (function (e) {
              try {
                localStorage.setItem("WI_tourSpeed", String(e));
              } catch (e) {}
            })((K = (K + 1) % J.length));
            var e = document.getElementById("wl-tour-speed");
            (e && (e.textContent = J[K].label), Me({ title: "Tour speed: " + J[K].label, duration: 1200 }), !U && j && (window.map && map.stop(), ee()));
          }
        },
        togglePinPanel: function () {
          var e = document.getElementById("wi-pins-panel");
          if (e) {
            if (!x && typeof window.WI_StorageChoice === "function" && typeof window.WI_StoragePopup === "function" && !window.WI_StorageChoice()) {
              window.WI_StoragePopup("Pins & Watchlist", function(choice) {
                if (choice) { window.ALERTS.togglePinPanel(); }
              });
              return;
            }
            (x = !x)
              ? (e.classList.add("open"), "function" == typeof _openPanelEx ? _openPanelEx(e) : document.body.classList.add("wi-panel-open"), h())
              : (e.classList.remove("open"), "function" == typeof _closePanelEx ? _closePanelEx() : document.body.classList.remove("wi-panel-open"));
            var t = document.getElementById("wl-open-panel-btn");
            t && t.classList.toggle("active", x);
          }
        },
      }
    );
  })()));
var _gsIdx = null,
  _gsIdxSz = -1;
function gsCountryName(e, t, n) {
  var i = resolveCountry(e, t, n);
  return (i && (i[1] || CC[i[0]] || i[0])) || "";
}
function gsBuildIndex() {
  var e = window.osmData || [];
  if (_gsIdx && _gsIdxSz === e.length) return _gsIdx;
  var t = [];
  (e.forEach(function (e) {
    if (e.label) {
      var n = e.countryName || (e.country ? CC[e.country] || e.country : ""),
        i = "naval" === e.cat ? "Naval" : "air" === e.cat ? "Air Force" : "Military";
      t.push({
        name: e.label,
        sub: n || (e.mil && "military" !== e.mil ? e.mil.replace(/_/g, " ") : ""),
        search: e.search || "",
        lat: e.lat,
        lon: e.lon,
        col: (window._COL || {})[e.cat] || "#f97316",
        cat: i,
        ctry: n,
      });
    }
  }),
    ("undefined" != typeof BASES_US ? BASES_US : []).forEach(function (e) {
      var n = gsCountryName(e.lat, e.lng, "US") || "USA";
      t.push({
        name: e.n,
        sub: (e.state ? e.state + ", " : "") + " USA",
        search: e.n + " " + (e.state || "") + " usa united states " + e.branch + " military base army",
        lat: e.lat,
        lon: e.lng,
        col: "#818cf8",
        cat: "US Military",
        ctry: n,
      });
    }),
    ("undefined" != typeof BASES_INTL ? BASES_INTL : []).forEach(function (e) {
      var n = CC[e.c] || e.c || "";
      t.push({
        name: e.n,
        sub: n,
        search: e.n + " " + (e.c || "") + " " + n + " " + e.t + " " + e.arm + " military international base army",
        lat: e.lat,
        lon: e.lng,
        col: "#f97316",
        cat: "Intl Bases",
        ctry: n,
      });
    }),
    ("undefined" != typeof NUCLEAR ? NUCLEAR : []).forEach(function (e) {
      var n = gsCountryName(e.lat, e.lng, e.c);
      t.push({
        name: e.n,
        sub: e.t || "nuclear",
        search: "nuclear nuke atomic " + e.n + " " + n + " " + (e.t || "") + " weapons enrichment plant facility",
        lat: e.lat,
        lon: e.lng,
        col: "#22c55e",
        cat: "Nuclear",
        ctry: n,
      });
    }),
    ("undefined" != typeof CONFLICTS ? CONFLICTS : []).forEach(function (e) {
      t.push({
        name: e.n,
        sub: e.loc || "",
        search: e.n + " " + (e.loc || "") + " conflict war zone active front battle",
        lat: e.lat,
        lon: e.lng,
        col: "#ef4444",
        cat: "Conflict Zone",
        ctry: e.loc || "",
      });
    }),
    ("undefined" != typeof HOTSPOTS ? HOTSPOTS : []).forEach(function (e) {
      var n = gsCountryName(e.lat, e.lng, e.c);
      t.push({ name: e.n, sub: e.sub || "", search: e.n + " " + (e.sub || "") + " " + n + " hotspot intel threat", lat: e.lat, lon: e.lng, col: "#f97316", cat: "Intel Hotspot", ctry: n });
    }),
    ("undefined" != typeof APTS ? APTS : []).forEach(function (e) {
      t.push({
        name: e.n,
        sub: e.sponsor || "",
        search: e.n + " " + (e.aka || "") + " " + (e.sponsor || "") + " cyber apt hacker threat intelligence",
        lat: e.lat,
        lon: e.lng,
        col: "#22c55e",
        cat: "Cyber / APT",
        ctry: e.sponsor || "",
      });
    }),
    ("undefined" != typeof SPACEPORTS ? SPACEPORTS : []).forEach(function (e) {
      var n = gsCountryName(e.lat, e.lng, e.c);
      t.push({ name: e.n, sub: e.c || "", search: "space spaceport launch rocket " + e.n + " " + e.c + " " + n + " satellite", lat: e.lat, lon: e.lng, col: "#a855f7", cat: "Spaceport", ctry: n });
    }),
    ("undefined" != typeof AIRPORTS ? AIRPORTS : []).forEach(function (e) {
      var n = gsCountryName(e.lat, e.lng, e.c);
      t.push({ name: e.n, sub: e.c || "", search: e.n + " " + (e.c || "") + " " + n + " airport aviation strategic airfield", lat: e.lat, lon: e.lng, col: "#64748b", cat: "Airport", ctry: n });
    }),
    ("undefined" != typeof PORTS ? PORTS : []).forEach(function (e) {
      var n = gsCountryName(e.lat, e.lng, e.c);
      t.push({ name: e.n, sub: e.c || "", search: e.n + " " + (e.c || "") + " " + n + " port naval maritime shipping harbor", lat: e.lat, lon: e.lng, col: "#0ea5e9", cat: "Port", ctry: n });
    }),
    ("undefined" != typeof WATERWAYS ? WATERWAYS : []).forEach(function (e) {
      t.push({ name: e.n, sub: "Waterway", search: e.n + " " + e.d + " waterway strait chokepoint shipping naval", lat: e.lat, lon: e.lng, col: "#0ea5e9", cat: "Waterway", ctry: "" });
    }));
  var n = {
    AF: [33.9, 67.7],
    AL: [41.2, 20.2],
    DZ: [28, 2.6],
    AO: [-12.3, 17.9],
    AR: [-38.4, -63.6],
    AM: [40.1, 45],
    AU: [-25.3, 133.8],
    AT: [47.5, 14.6],
    AZ: [40.1, 47.5],
    BH: [26.1, 50.6],
    BD: [23.7, 90.4],
    BY: [53.7, 27.9],
    BE: [50.5, 4.5],
    BZ: [17.2, -88.4],
    BJ: [9.3, 2.3],
    BT: [27.5, 90.4],
    BO: [-16.3, -64.7],
    BA: [43.9, 17.7],
    BW: [-22.3, 24.7],
    BR: [-14.2, -51.9],
    BN: [4.5, 114.7],
    BG: [42.7, 25.5],
    BF: [12.2, -1.6],
    BI: [-3.4, 30],
    KH: [12.6, 104.9],
    CM: [7.4, 12.3],
    CA: [56.1, -106.3],
    CF: [6.6, 20.9],
    TD: [15.5, 18.7],
    CL: [-35.7, -71.5],
    CN: [35.9, 104.2],
    CO: [4.6, -74.3],
    CG: [-0.2, 15.8],
    HR: [45.2, 15.2],
    CU: [21.5, -80],
    CY: [35.1, 33.4],
    CZ: [49.8, 15.5],
    DK: [56.3, 9.5],
    DJ: [11.8, 42.6],
    DO: [18.7, -70.2],
    EC: [-1.8, -78],
    EG: [26.8, 30.8],
    SV: [13.7, -89.2],
    ER: [15.2, 39.8],
    EE: [58.6, 25],
    ET: [9.1, 40.5],
    FJ: [-17.7, 178],
    FI: [61.9, 25.7],
    FR: [46.6, 2.2],
    GA: [-0.8, 11.7],
    GE: [42.3, 43.4],
    DE: [51.2, 10.5],
    GH: [7.9, -1],
    GR: [39.1, 21.8],
    GT: [15.8, -90.2],
    GN: [10.8, -10.9],
    GW: [11.8, -15.2],
    HT: [18.9, -72.3],
    HN: [15.1, -86.2],
    HU: [47.2, 19.6],
    IN: [20.6, 78.9],
    ID: [-0.8, 113.9],
    IR: [32.4, 53.7],
    IQ: [33.2, 43.7],
    IE: [53.4, -8.2],
    IL: [31, 34.8],
    IT: [41.9, 12.6],
    CI: [7.5, -5.5],
    JM: [18.1, -77.3],
    JP: [36.2, 138.3],
    JO: [30.6, 36.2],
    KZ: [48, 66.9],
    KE: [-0, 37.9],
    KW: [29.3, 47.6],
    KG: [41.2, 74.8],
    LA: [19.9, 102.5],
    LV: [56.9, 24.6],
    LB: [33.9, 35.5],
    LR: [6.4, -9.4],
    LY: [26.3, 17.2],
    LT: [55.2, 23.9],
    MK: [41.5, 21.7],
    MG: [-18.9, 47.5],
    MW: [-13.3, 34],
    MY: [4.2, 101.9],
    ML: [17.6, -4],
    MR: [20.3, -10.9],
    MX: [23.6, -102.5],
    MD: [47.2, 28.5],
    MN: [46.9, 103.8],
    MA: [31.8, -7.1],
    MZ: [-18.7, 35.5],
    MM: [21.9, 96],
    NA: [-22, 17],
    NP: [28.4, 84.1],
    NL: [52.1, 5.3],
    NZ: [-40.9, 174.9],
    NI: [12.9, -85],
    NE: [17.6, 9.1],
    NG: [9.1, 8.7],
    KP: [40.3, 127.5],
    NO: [60.5, 8.5],
    OM: [21.5, 55.9],
    PK: [30.4, 69.3],
    PA: [8.5, -80.1],
    PG: [-6.3, 143.9],
    PY: [-23.4, -58.4],
    PE: [-9.2, -75],
    PH: [12.9, 122],
    PL: [51.9, 19.1],
    PT: [39.4, -8.2],
    QA: [25.3, 51.2],
    RO: [45.9, 24.9],
    RU: [61.5, 105.3],
    RW: [-1.9, 29.9],
    SA: [23.9, 45.1],
    SN: [14.5, -14.5],
    RS: [44, 21],
    SL: [8.5, -11.8],
    SO: [5.2, 46.2],
    ZA: [-30.6, 22.9],
    KR: [35.9, 127.8],
    SS: [6.9, 31.3],
    ES: [40.5, -3.7],
    LK: [7.9, 80.8],
    SD: [12.9, 30.2],
    SR: [3.9, -56],
    SE: [60.1, 18.6],
    CH: [46.8, 8.2],
    SY: [35, 38],
    TW: [23.7, 121],
    TJ: [38.9, 71.3],
    TZ: [-6.4, 34.9],
    TH: [15.9, 100.9],
    TL: [-8.9, 125.8],
    TG: [8.6, 0.8],
    TN: [33.9, 9.5],
    TR: [39, 35.2],
    TM: [38.9, 59.6],
    UG: [1.4, 32.3],
    UA: [48.4, 31.2],
    AE: [23.4, 53.8],
    GB: [55.4, -3.4],
    US: [37.1, -95.7],
    UY: [-32.5, -55.8],
    UZ: [41.4, 64.6],
    VE: [6.4, -66.6],
    VN: [14.1, 108.3],
    YE: [15.6, 48],
    ZM: [-13.1, 27.7],
    ZW: [-19, 29.2],
  };
  return (
    Object.keys(CC).forEach(function (e) {
      var i = CC[e];
      if (i) {
        var a = n[e],
          o = a ? a[0] : 0,
          r = a ? a[1] : 0;
        t.push({ name: i, sub: e, search: i.toLowerCase() + " " + e.toLowerCase() + " country nation state", lat: o, lon: r, col: "#ffffff", cat: "Country", ctry: i, iso: e });
      }
    }),
    (_gsIdx = t),
    (_gsIdxSz = e.length),
    (window.SEARCH_INDEX = t),
    t
  );
}
var _gsDeb,
  _gsActive = -1;
function gsSearch(e) {
  var t = document.getElementById("gsearch-clr"),
    n = document.getElementById("gsearch-results");
  (t && t.classList.toggle("vis", e.length > 0),
    clearTimeout(_gsDeb),
    e
      ? (_gsDeb = setTimeout(function () {
          var t = gsBuildIndex(),
            i = e.toLowerCase().trim(),
            a = i.split(/\s+/).filter(function (e) {
              return e.length > 0;
            });
          if (a.length) {
            var o = t.filter(function (e) {
              var t = e.search;
              return a.every(function (e) {
                return t.indexOf(e) >= 0;
              });
            });
            o.length ||
              (o = t.filter(function (e) {
                return a.every(function (t) {
                  return e.name.toLowerCase().indexOf(t) >= 0 || (e.ctry && e.ctry.toLowerCase().indexOf(t) >= 0) || e.search.indexOf(t) >= 0;
                });
              }));
            var r = o.length;
            o.sort(function (e, t) {
              var n = e.name.toLowerCase(),
                a = t.name.toLowerCase(),
                o = 0 === n.indexOf(i),
                r = 0 === a.indexOf(i);
              return o && !r ? -1 : r && !o ? 1 : n.localeCompare(a);
            });
            var s = o.slice(0, 8);
            if ((clearChildren(n), !s.length)) return (n.appendChild(textEl("div", "gsr-none", 'No results for "' + e + '"')), void n.classList.add("open"));
            var l = document.createElement("div");
            l.className = "gsr-hdr";
            var c = r <= 8 ? r.toLocaleString() + " found" : "Showing 8 of " + r.toLocaleString();
            if (
              (l.appendChild(textEl("span", "gsr-hdr-lbl", "Results")),
              l.appendChild(textEl("span", "gsr-hdr-ct", c)),
              n.appendChild(l),
              s.forEach(function (e, t) {
                var i = document.createElement("div");
                ((i.className = "gsr-item"), (i.dataset.idx = t));
                var a = document.createElement("div");
                ((a.className = "gsr-dot"), (a.style.background = e.col), (a.style.boxShadow = "0 0 5px " + e.col + "70"));
                var o = document.createElement("span");
                ((o.className = "gsr-name"),
                  (o.textContent = e.name),
                  _isLikelyEnglish(e.name) ||
                    _translateText(e.name, function (t) {
                      t && t !== e.name && o.textContent === e.name && (o.textContent = t);
                    }));
                var r = document.createElement("span");
                ((r.className = "gsr-badge"),
                  (r.textContent = e.cat),
                  (r.style.color = e.col),
                  (r.style.background = e.col.replace("#", "rgba(").replace(/(..)(..)(..)$/, function (e, t, n, i) {
                    return parseInt(t, 16) + "," + parseInt(n, 16) + "," + parseInt(i, 16) + ",0.12)";
                  })));
                var s,
                  l,
                  c,
                  d,
                  u,
                  m = e.sub || (e.ctry && e.ctry !== e.name ? e.ctry : "");
                if ((i.appendChild(a), i.appendChild(o), m)) {
                  var f = document.createElement("span");
                  ((f.className = "gsr-sub"), (f.textContent = m), i.appendChild(f));
                }
                (i.appendChild(r),
                  i.addEventListener(
                    "click",
                    ((s = e.lat),
                    (l = e.lon),
                    (c = e.name),
                    (d = e.iso),
                    (u = e.cat),
                    function () {
                      if ("Country" === u && d) {
                        var e = document.getElementById("gsearch-results");
                        e && e.classList.remove("open");
                        var t = document.getElementById("gsearch-inp");
                        t && (t.value = c);
                        var n = document.getElementById("gsearch-clr");
                        n && n.classList.add("vis");
                        var i =
                          CONFLICTS.find(function (e) {
                            return (e.loc || "").toLowerCase().indexOf(c.toLowerCase()) >= 0;
                          }) ||
                          BASES_US.find(function (e) {
                            return (CC.US || "").toLowerCase() === c.toLowerCase();
                          });
                        i &&
                          ("3d" === curView && cesiumViewer
                            ? cesiumViewer.camera.flyTo({
                                destination: Cesium.Cartesian3.fromDegrees(i.lng, i.lat, 3e6),
                                orientation: { heading: 0, pitch: Cesium.Math.toRadians(-90), roll: 0 },
                                duration: 2,
                              })
                            : map.flyTo([i.lat, i.lng], 5, { duration: 1.4 }));
                      } else gsGo(s, l, c);
                    }),
                  ),
                  n.appendChild(i));
              }),
              r > 8)
            ) {
              var d = textEl("div", "gsr-more", "+ " + (r - 8) + " more results — type more to narrow");
              n.appendChild(d);
            }
            (n.classList.add("open"), (_gsActive = -1));
          } else n.classList.remove("open");
        }, 160))
      : n.classList.remove("open"));
}
function gsGo(e, t, n) {
  var i = document.getElementById("gsearch-results");
  i && i.classList.remove("open");
  var a = document.getElementById("gsearch-inp");
  a && (a.value = n);
  var o = document.getElementById("gsearch-clr");
  (o && o.classList.add("vis"),
    "3d" === curView && cesiumViewer
      ? cesiumViewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(t, e, 3e3), orientation: { heading: 0, pitch: Cesium.Math.toRadians(-90), roll: 0 }, duration: 2 })
      : map.flyTo([e, t], 14, { duration: 1.4 }));
}
var _SICO = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="6.5" cy="6.5" r="4.5"/><line x1="10" y1="10" x2="14" y2="14"/></svg>';
function gsToggle() {
  var e = document.getElementById("gsearch-group");
  if (e) {
    var t = e.classList.toggle("hidden"),
      n = document.getElementById("gsearch-tog-desk"),
      i = document.getElementById("gsearch-tog-mob");
    if ((n && (n.classList.toggle("active", !t), (n.innerHTML = _SICO + (t ? " Search" : " Hide"))), i && (i.classList.toggle("active", !t), (i.innerHTML = _SICO)), t)) {
      var a = document.getElementById("gsearch-results");
      a && a.classList.remove("open");
    }
  }
}
function gsClear() {
  var e = document.getElementById("gsearch-inp");
  e && (e.value = "");
  var t = document.getElementById("gsearch-results");
  t && t.classList.remove("open");
  var n = document.getElementById("gsearch-clr");
  n && n.classList.remove("vis");
}
function openMobSide() {
  var e = document.getElementById("SIDE"),
    t = document.getElementById("mob-backdrop");
  (e && e.classList.add("mob-open"), t && t.classList.add("show"));
}
function closeMobSide() {
  var e = document.getElementById("SIDE"),
    t = document.getElementById("mob-backdrop");
  (e && e.classList.remove("mob-open"), t && t.classList.remove("show"));
}
(document.addEventListener("DOMContentLoaded", function () {
  var e = document.getElementById("gsearch-inp");
  e &&
    (e.addEventListener("input", function () {
      gsSearch(this.value.trim());
    }),
    e.addEventListener("keydown", function (e) {
      var t = document.querySelectorAll(".gsr-item");
      t.length &&
        ("ArrowDown" === e.key
          ? (e.preventDefault(),
            (_gsActive = Math.min(_gsActive + 1, t.length - 1)),
            t.forEach(function (e, t) {
              e.classList.toggle("active", t === _gsActive);
            }))
          : "ArrowUp" === e.key
            ? (e.preventDefault(),
              (_gsActive = Math.max(_gsActive - 1, 0)),
              t.forEach(function (e, t) {
                e.classList.toggle("active", t === _gsActive);
              }))
            : "Enter" === e.key && _gsActive >= 0
              ? t[_gsActive].click()
              : "Escape" === e.key && gsClear());
    }),
    document.addEventListener("mousedown", function (e) {
      var t = document.getElementById("gsearch-wrap"),
        n = document.getElementById("gsearch-results");
      t && !t.contains(e.target) && n && n.classList.remove("open");
    }));
}),
  document.addEventListener("DOMContentLoaded", function () {
    var e = document.getElementById("map");
    (e && ((e.style.position = "fixed"), (e.style.top = "0"), (e.style.left = "0"), (e.style.width = window.innerWidth + "px"), (e.style.height = window.innerHeight + "px")),
      initMap(),
      window.TICKER && window.TICKER.init());
    var t = "function" == typeof toggleSide ? toggleSide : null;
    window.toggleSide = function () {
      if (window.innerWidth <= 640) {
        var e = document.getElementById("SIDE");
        e && e.classList.contains("mob-open") ? closeMobSide() : openMobSide();
      } else t && t();
    };
  }),
  window.addEventListener("load", function () {
    var e = document.getElementById("map");
    (e && ((e.style.width = ""), (e.style.height = "")),
      [50, 150, 400, 800, 1500, 3e3].forEach(function (e) {
        setTimeout(function () {
          window.map && "function" == typeof window.map.invalidateSize && window.map.invalidateSize(!0);
        }, e);
      }),
      "serviceWorker" in navigator &&
        navigator.serviceWorker
          .register("/sw.js")
          .then(function (e) {
            e.addEventListener("updatefound", function () {
              var t = e.installing;
              t.addEventListener("statechange", function () {
                if ("installed" === t.state && navigator.serviceWorker.controller) {
                  window.ALERTS && window.ALERTS.toast({
                    title: "🔄 Update available",
                    body: "Tap to reload for the latest version.",
                    onClick: function () {
                      location.reload();
                    },
                  });
                }
              });
            });
          })
          .catch(function (e) {
            console.warn("[SW] Registration failed:", e);
          }));
  }));
