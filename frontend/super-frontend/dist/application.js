(function () {

  var n = window.Document.prototype.createElement,
    p = window.Document.prototype.createElementNS,
    aa = window.Document.prototype.importNode,
    ba = window.Document.prototype.prepend,
    ca = window.Document.prototype.append,
    da = window.DocumentFragment.prototype.prepend,
    ea = window.DocumentFragment.prototype.append,
    q = window.Node.prototype.cloneNode,
    r = window.Node.prototype.appendChild,
    t = window.Node.prototype.insertBefore,
    u = window.Node.prototype.removeChild,
    v = window.Node.prototype.replaceChild,
    w = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
    y = window.Element.prototype.attachShadow,
    z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
    A = window.Element.prototype.getAttribute,
    B = window.Element.prototype.setAttribute,
    C = window.Element.prototype.removeAttribute,
    D = window.Element.prototype.toggleAttribute,
    E = window.Element.prototype.getAttributeNS,
    F = window.Element.prototype.setAttributeNS,
    G = window.Element.prototype.removeAttributeNS,
    H = window.Element.prototype.insertAdjacentElement,
    fa = window.Element.prototype.insertAdjacentHTML,
    ha = window.Element.prototype.prepend,
    ia = window.Element.prototype.append,
    ja = window.Element.prototype.before,
    ka = window.Element.prototype.after,
    la = window.Element.prototype.replaceWith,
    ma = window.Element.prototype.remove,
    na = window.HTMLElement,
    I = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
    oa = window.HTMLElement.prototype.insertAdjacentElement,
    pa = window.HTMLElement.prototype.insertAdjacentHTML;
  var qa = new Set();
  "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function (a) {
    return qa.add(a);
  });
  function ra(a) {
    var b = qa.has(a);
    a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
    return !b && a;
  }
  var sa = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
  function J(a) {
    var b = a.isConnected;
    if (void 0 !== b) return b;
    if (sa(a)) return !0;
    for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
    return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }
  function K(a) {
    var b = a.children;
    if (b) return Array.prototype.slice.call(b);
    b = [];
    for (a = a.firstChild; a; a = a.nextSibling) a.nodeType === Node.ELEMENT_NODE && b.push(a);
    return b;
  }
  function L(a, b) {
    for (; b && b !== a && !b.nextSibling;) b = b.parentNode;
    return b && b !== a ? b.nextSibling : null;
  }
  function M(a, b, d) {
    for (var f = a; f;) {
      if (f.nodeType === Node.ELEMENT_NODE) {
        var c = f;
        b(c);
        var e = c.localName;
        if ("link" === e && "import" === c.getAttribute("rel")) {
          f = c.import;
          void 0 === d && (d = new Set());
          if (f instanceof Node && !d.has(f)) for (d.add(f), f = f.firstChild; f; f = f.nextSibling) M(f, b, d);
          f = L(a, c);
          continue;
        } else if ("template" === e) {
          f = L(a, c);
          continue;
        }
        if (c = c.__CE_shadowRoot) for (c = c.firstChild; c; c = c.nextSibling) M(c, b, d);
      }
      f = f.firstChild ? f.firstChild : L(a, f);
    }
  }
  function N() {
    var a = !(null === O || void 0 === O || !O.noDocumentConstructionObserver),
      b = !(null === O || void 0 === O || !O.shadyDomFastWalk);
    this.m = [];
    this.g = [];
    this.j = !1;
    this.shadyDomFastWalk = b;
    this.I = !a;
  }
  function P(a, b, d, f) {
    var c = window.ShadyDOM;
    if (a.shadyDomFastWalk && c && c.inUse) {
      if (b.nodeType === Node.ELEMENT_NODE && d(b), b.querySelectorAll) for (a = c.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) d(a[b]);
    } else M(b, d, f);
  }
  function ta(a, b) {
    a.j = !0;
    a.m.push(b);
  }
  function ua(a, b) {
    a.j = !0;
    a.g.push(b);
  }
  function Q(a, b) {
    a.j && P(a, b, function (d) {
      return R(a, d);
    });
  }
  function R(a, b) {
    if (a.j && !b.__CE_patched) {
      b.__CE_patched = !0;
      for (var d = 0; d < a.m.length; d++) a.m[d](b);
      for (d = 0; d < a.g.length; d++) a.g[d](b);
    }
  }
  function S(a, b) {
    var d = [];
    P(a, b, function (c) {
      return d.push(c);
    });
    for (b = 0; b < d.length; b++) {
      var f = d[b];
      1 === f.__CE_state ? a.connectedCallback(f) : T(a, f);
    }
  }
  function U(a, b) {
    var d = [];
    P(a, b, function (c) {
      return d.push(c);
    });
    for (b = 0; b < d.length; b++) {
      var f = d[b];
      1 === f.__CE_state && a.disconnectedCallback(f);
    }
  }
  function V(a, b, d) {
    d = void 0 === d ? {} : d;
    var f = d.J,
      c = d.upgrade || function (g) {
        return T(a, g);
      },
      e = [];
    P(a, b, function (g) {
      a.j && R(a, g);
      if ("link" === g.localName && "import" === g.getAttribute("rel")) {
        var h = g.import;
        h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);
        h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function () {
          var k = g.import;
          if (!k.__CE_documentLoadHandled) {
            k.__CE_documentLoadHandled = !0;
            var l = new Set();
            f && (f.forEach(function (m) {
              return l.add(m);
            }), l.delete(k));
            V(a, k, {
              J: l,
              upgrade: c
            });
          }
        });
      } else e.push(g);
    }, f);
    for (b = 0; b < e.length; b++) c(e[b]);
  }
  function T(a, b) {
    try {
      var d = b.ownerDocument,
        f = d.__CE_registry;
      var c = f && (d.defaultView || d.__CE_isImportDocument) ? W(f, b.localName) : void 0;
      if (c && void 0 === b.__CE_state) {
        c.constructionStack.push(b);
        try {
          try {
            if (new c.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
          } finally {
            c.constructionStack.pop();
          }
        } catch (k) {
          throw b.__CE_state = 2, k;
        }
        b.__CE_state = 1;
        b.__CE_definition = c;
        if (c.attributeChangedCallback && b.hasAttributes()) {
          var e = c.observedAttributes;
          for (c = 0; c < e.length; c++) {
            var g = e[c],
              h = b.getAttribute(g);
            null !== h && a.attributeChangedCallback(b, g, null, h, null);
          }
        }
        J(b) && a.connectedCallback(b);
      }
    } catch (k) {
      X(k);
    }
  }
  N.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;
    if (b.connectedCallback) try {
      b.connectedCallback.call(a);
    } catch (d) {
      X(d);
    }
  };
  N.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;
    if (b.disconnectedCallback) try {
      b.disconnectedCallback.call(a);
    } catch (d) {
      X(d);
    }
  };
  N.prototype.attributeChangedCallback = function (a, b, d, f, c) {
    var e = a.__CE_definition;
    if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
      e.attributeChangedCallback.call(a, b, d, f, c);
    } catch (g) {
      X(g);
    }
  };
  function va(a, b, d, f) {
    var c = b.__CE_registry;
    if (c && (null === f || "http://www.w3.org/1999/xhtml" === f) && (c = W(c, d))) try {
      var e = new c.constructorFunction();
      if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + d + "': The returned value was not constructed with the HTMLElement constructor.");
      if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + d + "': The constructed element's namespace must be the HTML namespace.");
      if (e.hasAttributes()) throw Error("Failed to construct '" + d + "': The constructed element must not have any attributes.");
      if (null !== e.firstChild) throw Error("Failed to construct '" + d + "': The constructed element must not have any children.");
      if (null !== e.parentNode) throw Error("Failed to construct '" + d + "': The constructed element must not have a parent node.");
      if (e.ownerDocument !== b) throw Error("Failed to construct '" + d + "': The constructed element's owner document is incorrect.");
      if (e.localName !== d) throw Error("Failed to construct '" + d + "': The constructed element's local name is incorrect.");
      return e;
    } catch (g) {
      return X(g), b = null === f ? n.call(b, d) : p.call(b, f, d), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, R(a, b), b;
    }
    b = null === f ? n.call(b, d) : p.call(b, f, d);
    R(a, b);
    return b;
  }
  function X(a) {
    var b = "",
      d = "",
      f = 0,
      c = 0;
    a instanceof Error ? (b = a.message, d = a.sourceURL || a.fileName || "", f = a.line || a.lineNumber || 0, c = a.column || a.columnNumber || 0) : b = "Uncaught " + String(a);
    var e = void 0;
    void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", {
      cancelable: !0,
      message: b,
      filename: d,
      lineno: f,
      colno: c,
      error: a
    }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, d, f), e.preventDefault = function () {
      Object.defineProperty(this, "defaultPrevented", {
        configurable: !0,
        get: function () {
          return !0;
        }
      });
    });
    void 0 === e.error && Object.defineProperty(e, "error", {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return a;
      }
    });
    window.dispatchEvent(e);
    e.defaultPrevented || console.error(a);
  }
  function wa() {
    var a = this;
    this.g = void 0;
    this.F = new Promise(function (b) {
      a.l = b;
    });
  }
  wa.prototype.resolve = function (a) {
    if (this.g) throw Error("Already resolved.");
    this.g = a;
    this.l(a);
  };
  function xa(a) {
    var b = document;
    this.l = void 0;
    this.h = a;
    this.g = b;
    V(this.h, this.g);
    "loading" === this.g.readyState && (this.l = new MutationObserver(this.G.bind(this)), this.l.observe(this.g, {
      childList: !0,
      subtree: !0
    }));
  }
  function ya(a) {
    a.l && a.l.disconnect();
  }
  xa.prototype.G = function (a) {
    var b = this.g.readyState;
    "interactive" !== b && "complete" !== b || ya(this);
    for (b = 0; b < a.length; b++) for (var d = a[b].addedNodes, f = 0; f < d.length; f++) V(this.h, d[f]);
  };
  function Y(a) {
    this.s = new Map();
    this.u = new Map();
    this.C = new Map();
    this.A = !1;
    this.B = new Map();
    this.o = function (b) {
      return b();
    };
    this.i = !1;
    this.v = [];
    this.h = a;
    this.D = a.I ? new xa(a) : void 0;
  }
  Y.prototype.H = function (a, b) {
    var d = this;
    if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");
    za(this, a);
    this.s.set(a, b);
    this.v.push(a);
    this.i || (this.i = !0, this.o(function () {
      return Aa(d);
    }));
  };
  Y.prototype.define = function (a, b) {
    var d = this;
    if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
    za(this, a);
    Ba(this, a, b);
    this.v.push(a);
    this.i || (this.i = !0, this.o(function () {
      return Aa(d);
    }));
  };
  function za(a, b) {
    if (!ra(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
    if (W(a, b)) throw Error("A custom element with name '" + (b + "' has already been defined."));
    if (a.A) throw Error("A custom element is already being defined.");
  }
  function Ba(a, b, d) {
    a.A = !0;
    var f;
    try {
      var c = d.prototype;
      if (!(c instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
      var e = function (m) {
        var x = c[m];
        if (void 0 !== x && !(x instanceof Function)) throw Error("The '" + m + "' callback must be a function.");
        return x;
      };
      var g = e("connectedCallback");
      var h = e("disconnectedCallback");
      var k = e("adoptedCallback");
      var l = (f = e("attributeChangedCallback")) && d.observedAttributes || [];
    } catch (m) {
      throw m;
    } finally {
      a.A = !1;
    }
    d = {
      localName: b,
      constructorFunction: d,
      connectedCallback: g,
      disconnectedCallback: h,
      adoptedCallback: k,
      attributeChangedCallback: f,
      observedAttributes: l,
      constructionStack: []
    };
    a.u.set(b, d);
    a.C.set(d.constructorFunction, d);
    return d;
  }
  Y.prototype.upgrade = function (a) {
    V(this.h, a);
  };
  function Aa(a) {
    if (!1 !== a.i) {
      a.i = !1;
      for (var b = [], d = a.v, f = new Map(), c = 0; c < d.length; c++) f.set(d[c], []);
      V(a.h, document, {
        upgrade: function (k) {
          if (void 0 === k.__CE_state) {
            var l = k.localName,
              m = f.get(l);
            m ? m.push(k) : a.u.has(l) && b.push(k);
          }
        }
      });
      for (c = 0; c < b.length; c++) T(a.h, b[c]);
      for (c = 0; c < d.length; c++) {
        for (var e = d[c], g = f.get(e), h = 0; h < g.length; h++) T(a.h, g[h]);
        (e = a.B.get(e)) && e.resolve(void 0);
      }
      d.length = 0;
    }
  }
  Y.prototype.get = function (a) {
    if (a = W(this, a)) return a.constructorFunction;
  };
  Y.prototype.whenDefined = function (a) {
    if (!ra(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
    var b = this.B.get(a);
    if (b) return b.F;
    b = new wa();
    this.B.set(a, b);
    var d = this.u.has(a) || this.s.has(a);
    a = -1 === this.v.indexOf(a);
    d && a && b.resolve(void 0);
    return b.F;
  };
  Y.prototype.polyfillWrapFlushCallback = function (a) {
    this.D && ya(this.D);
    var b = this.o;
    this.o = function (d) {
      return a(function () {
        return b(d);
      });
    };
  };
  function W(a, b) {
    var d = a.u.get(b);
    if (d) return d;
    if (d = a.s.get(b)) {
      a.s.delete(b);
      try {
        return Ba(a, b, d());
      } catch (f) {
        X(f);
      }
    }
  }
  Y.prototype.define = Y.prototype.define;
  Y.prototype.upgrade = Y.prototype.upgrade;
  Y.prototype.get = Y.prototype.get;
  Y.prototype.whenDefined = Y.prototype.whenDefined;
  Y.prototype.polyfillDefineLazy = Y.prototype.H;
  Y.prototype.polyfillWrapFlushCallback = Y.prototype.polyfillWrapFlushCallback;
  function Z(a, b, d) {
    function f(c) {
      return function (e) {
        for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
        h = [];
        for (var k = [], l = 0; l < g.length; l++) {
          var m = g[l];
          m instanceof Element && J(m) && k.push(m);
          if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) h.push(m);else h.push(m);
        }
        c.apply(this, g);
        for (g = 0; g < k.length; g++) U(a, k[g]);
        if (J(this)) for (g = 0; g < h.length; g++) k = h[g], k instanceof Element && S(a, k);
      };
    }
    void 0 !== d.prepend && (b.prepend = f(d.prepend));
    void 0 !== d.append && (b.append = f(d.append));
  }
  function Ca(a) {
    Document.prototype.createElement = function (b) {
      return va(a, this, b, null);
    };
    Document.prototype.importNode = function (b, d) {
      b = aa.call(this, b, !!d);
      this.__CE_registry ? V(a, b) : Q(a, b);
      return b;
    };
    Document.prototype.createElementNS = function (b, d) {
      return va(a, this, d, b);
    };
    Z(a, Document.prototype, {
      prepend: ba,
      append: ca
    });
  }
  function Da(a) {
    function b(f) {
      return function (c) {
        for (var e = [], g = 0; g < arguments.length; ++g) e[g] = arguments[g];
        g = [];
        for (var h = [], k = 0; k < e.length; k++) {
          var l = e[k];
          l instanceof Element && J(l) && h.push(l);
          if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) g.push(l);else g.push(l);
        }
        f.apply(this, e);
        for (e = 0; e < h.length; e++) U(a, h[e]);
        if (J(this)) for (e = 0; e < g.length; e++) h = g[e], h instanceof Element && S(a, h);
      };
    }
    var d = Element.prototype;
    void 0 !== ja && (d.before = b(ja));
    void 0 !== ka && (d.after = b(ka));
    void 0 !== la && (d.replaceWith = function (f) {
      for (var c = [], e = 0; e < arguments.length; ++e) c[e] = arguments[e];
      e = [];
      for (var g = [], h = 0; h < c.length; h++) {
        var k = c[h];
        k instanceof Element && J(k) && g.push(k);
        if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) e.push(k);else e.push(k);
      }
      h = J(this);
      la.apply(this, c);
      for (c = 0; c < g.length; c++) U(a, g[c]);
      if (h) for (U(a, this), c = 0; c < e.length; c++) g = e[c], g instanceof Element && S(a, g);
    });
    void 0 !== ma && (d.remove = function () {
      var f = J(this);
      ma.call(this);
      f && U(a, this);
    });
  }
  function Ea(a) {
    function b(c, e) {
      Object.defineProperty(c, "innerHTML", {
        enumerable: e.enumerable,
        configurable: !0,
        get: e.get,
        set: function (g) {
          var h = this,
            k = void 0;
          J(this) && (k = [], P(a, this, function (x) {
            x !== h && k.push(x);
          }));
          e.set.call(this, g);
          if (k) for (var l = 0; l < k.length; l++) {
            var m = k[l];
            1 === m.__CE_state && a.disconnectedCallback(m);
          }
          this.ownerDocument.__CE_registry ? V(a, this) : Q(a, this);
          return g;
        }
      });
    }
    function d(c, e) {
      c.insertAdjacentElement = function (g, h) {
        var k = J(h);
        g = e.call(this, g, h);
        k && U(a, h);
        J(g) && S(a, h);
        return g;
      };
    }
    function f(c, e) {
      function g(h, k) {
        for (var l = []; h !== k; h = h.nextSibling) l.push(h);
        for (k = 0; k < l.length; k++) V(a, l[k]);
      }
      c.insertAdjacentHTML = function (h, k) {
        h = h.toLowerCase();
        if ("beforebegin" === h) {
          var l = this.previousSibling;
          e.call(this, h, k);
          g(l || this.parentNode.firstChild, this);
        } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      };
    }
    y && (Element.prototype.attachShadow = function (c) {
      c = y.call(this, c);
      if (a.j && !c.__CE_patched) {
        c.__CE_patched = !0;
        for (var e = 0; e < a.m.length; e++) a.m[e](c);
      }
      return this.__CE_shadowRoot = c;
    });
    z && z.get ? b(Element.prototype, z) : I && I.get ? b(HTMLElement.prototype, I) : ua(a, function (c) {
      b(c, {
        enumerable: !0,
        configurable: !0,
        get: function () {
          return q.call(this, !0).innerHTML;
        },
        set: function (e) {
          var g = "template" === this.localName,
            h = g ? this.content : this,
            k = p.call(document, this.namespaceURI, this.localName);
          for (k.innerHTML = e; 0 < h.childNodes.length;) u.call(h, h.childNodes[0]);
          for (e = g ? k.content : k; 0 < e.childNodes.length;) r.call(h, e.childNodes[0]);
        }
      });
    });
    Element.prototype.setAttribute = function (c, e) {
      if (1 !== this.__CE_state) return B.call(this, c, e);
      var g = A.call(this, c);
      B.call(this, c, e);
      e = A.call(this, c);
      a.attributeChangedCallback(this, c, g, e, null);
    };
    Element.prototype.setAttributeNS = function (c, e, g) {
      if (1 !== this.__CE_state) return F.call(this, c, e, g);
      var h = E.call(this, c, e);
      F.call(this, c, e, g);
      g = E.call(this, c, e);
      a.attributeChangedCallback(this, e, h, g, c);
    };
    Element.prototype.removeAttribute = function (c) {
      if (1 !== this.__CE_state) return C.call(this, c);
      var e = A.call(this, c);
      C.call(this, c);
      null !== e && a.attributeChangedCallback(this, c, e, null, null);
    };
    D && (Element.prototype.toggleAttribute = function (c, e) {
      if (1 !== this.__CE_state) return D.call(this, c, e);
      var g = A.call(this, c),
        h = null !== g;
      e = D.call(this, c, e);
      h !== e && a.attributeChangedCallback(this, c, g, e ? "" : null, null);
      return e;
    });
    Element.prototype.removeAttributeNS = function (c, e) {
      if (1 !== this.__CE_state) return G.call(this, c, e);
      var g = E.call(this, c, e);
      G.call(this, c, e);
      var h = E.call(this, c, e);
      g !== h && a.attributeChangedCallback(this, e, g, h, c);
    };
    oa ? d(HTMLElement.prototype, oa) : H && d(Element.prototype, H);
    pa ? f(HTMLElement.prototype, pa) : fa && f(Element.prototype, fa);
    Z(a, Element.prototype, {
      prepend: ha,
      append: ia
    });
    Da(a);
  }
  var Fa = {};
  function Ga(a) {
    function b() {
      var d = this.constructor;
      var f = document.__CE_registry.C.get(d);
      if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
      var c = f.constructionStack;
      if (0 === c.length) return c = n.call(document, f.localName), Object.setPrototypeOf(c, d.prototype), c.__CE_state = 1, c.__CE_definition = f, R(a, c), c;
      var e = c.length - 1,
        g = c[e];
      if (g === Fa) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
      c[e] = Fa;
      Object.setPrototypeOf(g, d.prototype);
      R(a, g);
      return g;
    }
    b.prototype = na.prototype;
    Object.defineProperty(HTMLElement.prototype, "constructor", {
      writable: !0,
      configurable: !0,
      enumerable: !1,
      value: b
    });
    window.HTMLElement = b;
  }
  function Ha(a) {
    function b(d, f) {
      Object.defineProperty(d, "textContent", {
        enumerable: f.enumerable,
        configurable: !0,
        get: f.get,
        set: function (c) {
          if (this.nodeType === Node.TEXT_NODE) f.set.call(this, c);else {
            var e = void 0;
            if (this.firstChild) {
              var g = this.childNodes,
                h = g.length;
              if (0 < h && J(this)) {
                e = Array(h);
                for (var k = 0; k < h; k++) e[k] = g[k];
              }
            }
            f.set.call(this, c);
            if (e) for (c = 0; c < e.length; c++) U(a, e[c]);
          }
        }
      });
    }
    Node.prototype.insertBefore = function (d, f) {
      if (d instanceof DocumentFragment) {
        var c = K(d);
        d = t.call(this, d, f);
        if (J(this)) for (f = 0; f < c.length; f++) S(a, c[f]);
        return d;
      }
      c = d instanceof Element && J(d);
      f = t.call(this, d, f);
      c && U(a, d);
      J(this) && S(a, d);
      return f;
    };
    Node.prototype.appendChild = function (d) {
      if (d instanceof DocumentFragment) {
        var f = K(d);
        d = r.call(this, d);
        if (J(this)) for (var c = 0; c < f.length; c++) S(a, f[c]);
        return d;
      }
      f = d instanceof Element && J(d);
      c = r.call(this, d);
      f && U(a, d);
      J(this) && S(a, d);
      return c;
    };
    Node.prototype.cloneNode = function (d) {
      d = q.call(this, !!d);
      this.ownerDocument.__CE_registry ? V(a, d) : Q(a, d);
      return d;
    };
    Node.prototype.removeChild = function (d) {
      var f = d instanceof Element && J(d),
        c = u.call(this, d);
      f && U(a, d);
      return c;
    };
    Node.prototype.replaceChild = function (d, f) {
      if (d instanceof DocumentFragment) {
        var c = K(d);
        d = v.call(this, d, f);
        if (J(this)) for (U(a, f), f = 0; f < c.length; f++) S(a, c[f]);
        return d;
      }
      c = d instanceof Element && J(d);
      var e = v.call(this, d, f),
        g = J(this);
      g && U(a, f);
      c && U(a, d);
      g && S(a, d);
      return e;
    };
    w && w.get ? b(Node.prototype, w) : ta(a, function (d) {
      b(d, {
        enumerable: !0,
        configurable: !0,
        get: function () {
          for (var f = [], c = this.firstChild; c; c = c.nextSibling) c.nodeType !== Node.COMMENT_NODE && f.push(c.textContent);
          return f.join("");
        },
        set: function (f) {
          for (; this.firstChild;) u.call(this, this.firstChild);
          null != f && "" !== f && r.call(this, document.createTextNode(f));
        }
      });
    });
  }
  var O = window.customElements;
  function Ia() {
    var a = new N();
    Ga(a);
    Ca(a);
    Z(a, DocumentFragment.prototype, {
      prepend: da,
      append: ea
    });
    Ha(a);
    Ea(a);
    window.CustomElementRegistry = Y;
    a = new Y(a);
    document.__CE_registry = a;
    Object.defineProperty(window, "customElements", {
      configurable: !0,
      enumerable: !0,
      value: a
    });
  }
  O && !O.forcePolyfill && "function" == typeof O.define && "function" == typeof O.get || Ia();
  window.__CE_installPolyfill = Ia;
}).call(self);

/*
Details Element Polyfill 2.4.0
Copyright © 2019 Javan Makhmali
 */
(function () {

  var element = document.createElement("details");
  var elementIsNative = typeof HTMLDetailsElement != "undefined" && element instanceof HTMLDetailsElement;
  var support = {
    open: "open" in element || elementIsNative,
    toggle: "ontoggle" in element
  };
  var styles = '\ndetails, summary {\n  display: block;\n}\ndetails:not([open]) > *:not(summary) {\n  display: none;\n}\nsummary::before {\n  content: "►";\n  padding-right: 0.3rem;\n  font-size: 0.6rem;\n  cursor: default;\n}\n[open] > summary::before {\n  content: "▼";\n}\n';
  var _ref = [],
    forEach = _ref.forEach,
    slice = _ref.slice;
  if (!support.open) {
    polyfillStyles();
    polyfillProperties();
    polyfillToggle();
    polyfillAccessibility();
  }
  if (support.open && !support.toggle) {
    polyfillToggleEvent();
  }
  function polyfillStyles() {
    document.head.insertAdjacentHTML("afterbegin", "<style>" + styles + "</style>");
  }
  function polyfillProperties() {
    var prototype = document.createElement("details").constructor.prototype;
    var setAttribute = prototype.setAttribute,
      removeAttribute = prototype.removeAttribute;
    var open = Object.getOwnPropertyDescriptor(prototype, "open");
    Object.defineProperties(prototype, {
      open: {
        get: function get() {
          if (this.tagName == "DETAILS") {
            return this.hasAttribute("open");
          } else {
            if (open && open.get) {
              return open.get.call(this);
            }
          }
        },
        set: function set(value) {
          if (this.tagName == "DETAILS") {
            return value ? this.setAttribute("open", "") : this.removeAttribute("open");
          } else {
            if (open && open.set) {
              return open.set.call(this, value);
            }
          }
        }
      },
      setAttribute: {
        value: function value(name, _value) {
          var _this = this;
          var call = function call() {
            return setAttribute.call(_this, name, _value);
          };
          if (name == "open" && this.tagName == "DETAILS") {
            var wasOpen = this.hasAttribute("open");
            var result = call();
            if (!wasOpen) {
              var summary = this.querySelector("summary");
              if (summary) summary.setAttribute("aria-expanded", true);
              triggerToggle(this);
            }
            return result;
          }
          return call();
        }
      },
      removeAttribute: {
        value: function value(name) {
          var _this2 = this;
          var call = function call() {
            return removeAttribute.call(_this2, name);
          };
          if (name == "open" && this.tagName == "DETAILS") {
            var wasOpen = this.hasAttribute("open");
            var result = call();
            if (wasOpen) {
              var summary = this.querySelector("summary");
              if (summary) summary.setAttribute("aria-expanded", false);
              triggerToggle(this);
            }
            return result;
          }
          return call();
        }
      }
    });
  }
  function polyfillToggle() {
    onTogglingTrigger(function (element) {
      element.hasAttribute("open") ? element.removeAttribute("open") : element.setAttribute("open", "");
    });
  }
  function polyfillToggleEvent() {
    if (window.MutationObserver) {
      new MutationObserver(function (mutations) {
        forEach.call(mutations, function (mutation) {
          var target = mutation.target,
            attributeName = mutation.attributeName;
          if (target.tagName == "DETAILS" && attributeName == "open") {
            triggerToggle(target);
          }
        });
      }).observe(document.documentElement, {
        attributes: true,
        subtree: true
      });
    } else {
      onTogglingTrigger(function (element) {
        var wasOpen = element.getAttribute("open");
        setTimeout(function () {
          var isOpen = element.getAttribute("open");
          if (wasOpen != isOpen) {
            triggerToggle(element);
          }
        }, 1);
      });
    }
  }
  function polyfillAccessibility() {
    setAccessibilityAttributes(document);
    if (window.MutationObserver) {
      new MutationObserver(function (mutations) {
        forEach.call(mutations, function (mutation) {
          forEach.call(mutation.addedNodes, setAccessibilityAttributes);
        });
      }).observe(document.documentElement, {
        subtree: true,
        childList: true
      });
    } else {
      document.addEventListener("DOMNodeInserted", function (event) {
        setAccessibilityAttributes(event.target);
      });
    }
  }
  function setAccessibilityAttributes(root) {
    findElementsWithTagName(root, "SUMMARY").forEach(function (summary) {
      var details = findClosestElementWithTagName(summary, "DETAILS");
      summary.setAttribute("aria-expanded", details.hasAttribute("open"));
      if (!summary.hasAttribute("tabindex")) summary.setAttribute("tabindex", "0");
      if (!summary.hasAttribute("role")) summary.setAttribute("role", "button");
    });
  }
  function eventIsSignificant(event) {
    return !(event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.target.isContentEditable);
  }
  function onTogglingTrigger(callback) {
    addEventListener("click", function (event) {
      if (eventIsSignificant(event)) {
        if (event.which <= 1) {
          var element = findClosestElementWithTagName(event.target, "SUMMARY");
          if (element && element.parentNode && element.parentNode.tagName == "DETAILS") {
            callback(element.parentNode);
          }
        }
      }
    }, false);
    addEventListener("keydown", function (event) {
      if (eventIsSignificant(event)) {
        if (event.keyCode == 13 || event.keyCode == 32) {
          var element = findClosestElementWithTagName(event.target, "SUMMARY");
          if (element && element.parentNode && element.parentNode.tagName == "DETAILS") {
            callback(element.parentNode);
            event.preventDefault();
          }
        }
      }
    }, false);
  }
  function triggerToggle(element) {
    var event = document.createEvent("Event");
    event.initEvent("toggle", false, false);
    element.dispatchEvent(event);
  }
  function findElementsWithTagName(root, tagName) {
    return (root.tagName == tagName ? [root] : []).concat(typeof root.getElementsByTagName == "function" ? slice.call(root.getElementsByTagName(tagName)) : []);
  }
  function findClosestElementWithTagName(element, tagName) {
    if (typeof element.closest == "function") {
      return element.closest(tagName);
    } else {
      while (element) {
        if (element.tagName == tagName) {
          return element;
        } else {
          element = element.parentNode;
        }
      }
    }
  }
})();

const CLOSE_ATTR = 'data-close-dialog';
const CLOSE_SELECTOR = `[${CLOSE_ATTR}]`;
function autofocus(el) {
  let autofocusElement = Array.from(el.querySelectorAll('[autofocus]')).filter(focusable)[0];
  if (!autofocusElement) {
    autofocusElement = el;
    el.setAttribute('tabindex', '-1');
  }
  autofocusElement.focus();
}
function keydown(event) {
  const details = event.currentTarget;
  if (!(details instanceof Element)) return;
  if (event.key === 'Escape' || event.key === 'Esc') {
    toggleDetails(details, false);
    event.stopPropagation();
  } else if (event.key === 'Tab') {
    restrictTabBehavior(event);
  }
}
function focusable(el) {
  return el.tabIndex >= 0 && !el.disabled && visible(el);
}
function visible(el) {
  return !el.hidden && (!el.type || el.type !== 'hidden') && (el.offsetWidth > 0 || el.offsetHeight > 0);
}
function restrictTabBehavior(event) {
  if (!(event.currentTarget instanceof Element)) return;
  const dialog = event.currentTarget.querySelector('details-dialog');
  if (!dialog) return;
  event.preventDefault();
  const elements = Array.from(dialog.querySelectorAll('*')).filter(focusable);
  if (elements.length === 0) return;
  const movement = event.shiftKey ? -1 : 1;
  const root = dialog.getRootNode();
  const currentFocus = dialog.contains(root.activeElement) ? root.activeElement : null;
  let targetIndex = movement === -1 ? -1 : 0;
  if (currentFocus instanceof HTMLElement) {
    const currentIndex = elements.indexOf(currentFocus);
    if (currentIndex !== -1) {
      targetIndex = currentIndex + movement;
    }
  }
  if (targetIndex < 0) {
    targetIndex = elements.length - 1;
  } else {
    targetIndex = targetIndex % elements.length;
  }
  elements[targetIndex].focus();
}
function allowClosingDialog(details) {
  const dialog = details.querySelector('details-dialog');
  if (!(dialog instanceof DetailsDialogElement)) return true;
  return dialog.dispatchEvent(new CustomEvent('details-dialog-close', {
    bubbles: true,
    cancelable: true
  }));
}
function onSummaryClick(event) {
  if (!(event.currentTarget instanceof Element)) return;
  const details = event.currentTarget.closest('details');
  if (!details || !details.hasAttribute('open')) return;
  if (!allowClosingDialog(details)) {
    event.preventDefault();
    event.stopPropagation();
  }
}
function toggle(event) {
  const details = event.currentTarget;
  if (!(details instanceof Element)) return;
  const dialog = details.querySelector('details-dialog');
  if (!(dialog instanceof DetailsDialogElement)) return;
  if (details.hasAttribute('open')) {
    const root = 'getRootNode' in dialog ? dialog.getRootNode() : document;
    if (root.activeElement instanceof HTMLElement) {
      initialized.set(dialog, {
        details,
        activeElement: root.activeElement
      });
    }
    autofocus(dialog);
    details.addEventListener('keydown', keydown);
  } else {
    for (const form of dialog.querySelectorAll('form')) {
      form.reset();
    }
    const focusElement = findFocusElement(details, dialog);
    if (focusElement) focusElement.focus();
    details.removeEventListener('keydown', keydown);
  }
}
function findFocusElement(details, dialog) {
  const state = initialized.get(dialog);
  if (state && state.activeElement instanceof HTMLElement) {
    return state.activeElement;
  } else {
    return details.querySelector('summary');
  }
}
function toggleDetails(details, open) {
  if (open === details.hasAttribute('open')) return;
  if (open) {
    details.setAttribute('open', '');
  } else if (allowClosingDialog(details)) {
    details.removeAttribute('open');
  }
}
function loadIncludeFragment(event) {
  const details = event.currentTarget;
  if (!(details instanceof Element)) return;
  const dialog = details.querySelector('details-dialog');
  if (!(dialog instanceof DetailsDialogElement)) return;
  const loader = dialog.querySelector('include-fragment:not([src])');
  if (!loader) return;
  const src = dialog.src;
  if (src === null) return;
  loader.addEventListener('loadend', () => {
    if (details.hasAttribute('open')) autofocus(dialog);
  });
  loader.setAttribute('src', src);
  removeIncludeFragmentEventListeners(details);
}
function updateIncludeFragmentEventListeners(details, src, preload) {
  removeIncludeFragmentEventListeners(details);
  if (src) {
    details.addEventListener('toggle', loadIncludeFragment, {
      once: true
    });
  }
  if (src && preload) {
    details.addEventListener('mouseover', loadIncludeFragment, {
      once: true
    });
  }
}
function removeIncludeFragmentEventListeners(details) {
  details.removeEventListener('toggle', loadIncludeFragment);
  details.removeEventListener('mouseover', loadIncludeFragment);
}
const initialized = new WeakMap();
class DetailsDialogElement extends HTMLElement {
  static get CLOSE_ATTR() {
    return CLOSE_ATTR;
  }
  static get CLOSE_SELECTOR() {
    return CLOSE_SELECTOR;
  }
  constructor() {
    super();
    initialized.set(this, {
      details: null,
      activeElement: null
    });
    this.addEventListener('click', function ({
      target
    }) {
      if (!(target instanceof Element)) return;
      const details = target.closest('details');
      if (details && target.closest(CLOSE_SELECTOR)) {
        toggleDetails(details, false);
      }
    });
    this.addEventListener('submit', function (event) {
      if (!(event.target instanceof HTMLFormElement)) return;
      const {
        target
      } = event;
      const submitEvent = 'submitter' in event ? event : null;
      const submitter = submitEvent === null || submitEvent === void 0 ? void 0 : submitEvent.submitter;
      const method = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute('formmethod')) || target.getAttribute('method');
      if (method == 'dialog') {
        event.preventDefault();
        const details = target.closest('details');
        if (details) {
          toggleDetails(details, false);
        }
      }
    });
  }
  get src() {
    return this.getAttribute('src');
  }
  set src(value) {
    this.setAttribute('src', value || '');
  }
  get preload() {
    return this.hasAttribute('preload');
  }
  set preload(value) {
    value ? this.setAttribute('preload', '') : this.removeAttribute('preload');
  }
  connectedCallback() {
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');
    const state = initialized.get(this);
    if (!state) return;
    const details = this.parentElement;
    if (!details) return;
    const summary = details.querySelector('summary');
    if (summary) {
      if (!summary.hasAttribute('role')) summary.setAttribute('role', 'button');
      summary.addEventListener('click', onSummaryClick, {
        capture: true
      });
    }
    details.addEventListener('toggle', toggle);
    state.details = details;
    updateIncludeFragmentEventListeners(details, this.src, this.preload);
  }
  disconnectedCallback() {
    const state = initialized.get(this);
    if (!state) return;
    const {
      details
    } = state;
    if (!details) return;
    details.removeEventListener('toggle', toggle);
    removeIncludeFragmentEventListeners(details);
    const summary = details.querySelector('summary');
    if (summary) {
      summary.removeEventListener('click', onSummaryClick, {
        capture: true
      });
    }
    state.details = null;
  }
  toggle(open) {
    const state = initialized.get(this);
    if (!state) return;
    const {
      details
    } = state;
    if (!details) return;
    toggleDetails(details, open);
  }
  static get observedAttributes() {
    return ['src', 'preload'];
  }
  attributeChangedCallback() {
    const state = initialized.get(this);
    if (!state) return;
    const {
      details
    } = state;
    if (!details) return;
    updateIncludeFragmentEventListeners(details, this.src, this.preload);
  }
}
if (!window.customElements.get('details-dialog')) {
  window.DetailsDialogElement = DetailsDialogElement;
  window.customElements.define('details-dialog', DetailsDialogElement);
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/******/
createCommonjsModule(function (module) {
  (() => {
    // webpackBootstrap
    /******/
    var __webpack_modules__ = [
      /* 0 */
    , /* 1 */
    /***/() => {
      window.up = {
        version: '3.3.0'
      };

      /***/
    }, /* 2 */
    /***/() => {
      up.mockable = function (originalFn) {
        if (window.jasmine) {
          let name = originalFn.name;
          let obj = {
            [name]: originalFn
          };
          let mockableFn = function () {
            return obj[name].apply(this, arguments);
          };
          mockableFn.mock = () => spyOn(obj, name);
          return mockableFn;
        } else {
          return originalFn;
        }
      };

      /***/
    }, /* 3 */
    /***/() => {
      up.util = function () {
        function noop() {}
        function asyncNoop() {
          return Promise.resolve();
        }
        function memoize(func) {
          let cachedValue, cached;
          return function (...args) {
            if (cached) {
              return cachedValue;
            } else {
              cached = true;
              return cachedValue = func.apply(this, args);
            }
          };
        }
        const NORMALIZE_URL_DEFAULTS = {
          host: 'cross-domain'
        };
        function normalizeURL(url, options) {
          options = newOptions(options, NORMALIZE_URL_DEFAULTS);
          const parts = parseURL(url);
          let normalized = '';
          if (options.host === 'cross-domain') {
            options.host = isCrossOrigin(parts);
          }
          if (options.host) {
            normalized += parts.protocol + "//" + parts.host;
          }
          let {
            pathname
          } = parts;
          if (options.trailingSlash === false && pathname !== '/') {
            pathname = pathname.replace(/\/$/, '');
          }
          normalized += pathname;
          if (options.search !== false) {
            normalized += parts.search;
          }
          if (options.hash !== false) {
            normalized += parts.hash;
          }
          return normalized;
        }
        function matchURLs(leftURL, rightURL) {
          return normalizeURL(leftURL) === normalizeURL(rightURL);
        }
        const APP_PROTOCOL = location.protocol;
        const APP_HOSTNAME = location.hostname;
        function isCrossOrigin(urlOrAnchor) {
          if (isString(urlOrAnchor) && urlOrAnchor.indexOf('//') === -1) {
            return false;
          }
          const parts = parseURL(urlOrAnchor);
          return APP_HOSTNAME !== parts.hostname || APP_PROTOCOL !== parts.protocol;
        }
        function parseURL(url) {
          if (url.pathname) {
            return url;
          }
          let link = document.createElement('a');
          link.href = url;
          return link;
        }
        function normalizeMethod(method) {
          return method ? method.toUpperCase() : 'GET';
        }
        function methodAllowsPayload(method) {
          return method !== 'GET' && method !== 'HEAD';
        }
        function iteratee(block) {
          if (isString(block)) {
            return item => item[block];
          } else {
            return block;
          }
        }
        function map(list, block) {
          if (list.length === 0) {
            return [];
          }
          block = iteratee(block);
          let mapped = [];
          let i = 0;
          for (let item of list) {
            mapped.push(block(item, i++));
          }
          return mapped;
        }
        function mapObject(array, pairer) {
          const merger = function (object, pair) {
            object[pair[0]] = pair[1];
            return object;
          };
          return map(array, pairer).reduce(merger, {});
        }
        function each(array, block) {
          let i = 0;
          for (let item of array) {
            block(item, i++);
          }
        }
        function isNull(object) {
          return object === null;
        }
        function isUndefined(object) {
          return object === undefined;
        }
        const isDefined = negate(isUndefined);
        function isMissing(object) {
          return isUndefined(object) || isNull(object);
        }
        const isGiven = negate(isMissing);
        function isBlank(value) {
          if (isMissing(value)) {
            return true;
          }
          if (isObject(value) && value[isBlank.key]) {
            return value[isBlank.key]();
          }
          if (isString(value) || isList(value)) {
            return value.length === 0;
          }
          if (isOptions(value)) {
            return Object.keys(value).length === 0;
          }
          return false;
        }
        isBlank.key = 'up.util.isBlank';
        function presence(value, tester = isPresent) {
          if (tester(value)) {
            return value;
          }
        }
        const isPresent = negate(isBlank);
        function isFunction(object) {
          return typeof object === 'function';
        }
        function isString(object) {
          return typeof object === 'string' || object instanceof String;
        }
        function isBoolean(object) {
          return typeof object === 'boolean' || object instanceof Boolean;
        }
        function isNumber(object) {
          return typeof object === 'number' || object instanceof Number;
        }
        function isOptions(object) {
          return typeof object === 'object' && !isNull(object) && (isUndefined(object.constructor) || object.constructor === Object);
        }
        function isObject(object) {
          const typeOfResult = typeof object;
          return typeOfResult === 'object' && !isNull(object) || typeOfResult === 'function';
        }
        function isElement(object) {
          return object instanceof Element;
        }
        function isRegExp(object) {
          return object instanceof RegExp;
        }
        function isError(object) {
          return object instanceof Error;
        }
        function isJQuery(object) {
          return up.browser.canJQuery() && object instanceof jQuery;
        }
        function isElementish(object) {
          return !!(object && (object.addEventListener || object[0]?.addEventListener));
        }
        function isPromise(object) {
          return isObject(object) && isFunction(object.then);
        }
        const {
          isArray
        } = Array;
        function isFormData(object) {
          return object instanceof FormData;
        }
        function toArray(value) {
          return isArray(value) ? value : copyArrayLike(value);
        }
        function isList(value) {
          return isArray(value) || isNodeList(value) || isArguments(value) || isJQuery(value) || isHTMLCollection(value);
        }
        function isNodeList(value) {
          return value instanceof NodeList;
        }
        function isHTMLCollection(value) {
          return value instanceof HTMLCollection;
        }
        function isArguments(value) {
          return Object.prototype.toString.call(value) === '[object Arguments]';
        }
        function nullToUndefined(value) {
          if (!isNull(value)) {
            return value;
          }
        }
        function wrapList(value) {
          if (isList(value)) {
            return value;
          } else if (isMissing(value)) {
            return [];
          } else {
            return [value];
          }
        }
        function copy(value) {
          if (isObject(value) && value[copy.key]) {
            value = value[copy.key]();
          } else if (isList(value)) {
            value = copyArrayLike(value);
          } else if (isOptions(value)) {
            value = Object.assign({}, value);
          }
          return value;
        }
        function copyArrayLike(arrayLike) {
          return Array.prototype.slice.call(arrayLike);
        }
        copy.key = 'up.util.copy';
        Date.prototype[copy.key] = function () {
          return new Date(+this);
        };
        function merge(...sources) {
          return Object.assign({}, ...sources);
        }
        function mergeDefined(...sources) {
          const result = {};
          for (let source of sources) {
            if (source) {
              for (let key in source) {
                const value = source[key];
                if (isDefined(value)) {
                  result[key] = value;
                }
              }
            }
          }
          return result;
        }
        function newOptions(object, defaults) {
          if (defaults) {
            return merge(defaults, object);
          } else if (object) {
            return copy(object);
          } else {
            return {};
          }
        }
        function parseArgIntoOptions(args, argKey) {
          let options = extractOptions(args);
          if (isDefined(args[0])) {
            options = copy(options);
            options[argKey] = args[0];
          }
          return options;
        }
        function findInList(list, tester) {
          tester = iteratee(tester);
          let match;
          for (let element of list) {
            if (tester(element)) {
              match = element;
              break;
            }
          }
          return match;
        }
        function some(list, tester) {
          return !!findResult(list, tester);
        }
        function findResult(list, tester) {
          tester = iteratee(tester);
          let i = 0;
          for (let item of list) {
            const result = tester(item, i++);
            if (result) {
              return result;
            }
          }
        }
        function every(list, tester) {
          tester = iteratee(tester);
          let match = true;
          let i = 0;
          for (let item of list) {
            if (!tester(item, i++)) {
              match = false;
              break;
            }
          }
          return match;
        }
        function compact(array) {
          return filterList(array, isGiven);
        }
        function filterMap(list, mapping) {
          return filterList(map(list, mapping), isDefined);
        }
        function compactObject(object) {
          return pickBy(object, isGiven);
        }
        function uniq(array) {
          if (array.length < 2) {
            return array;
          }
          return Array.from(new Set(array));
        }
        function uniqBy(array, mapper) {
          if (array.length < 2) {
            return array;
          }
          mapper = iteratee(mapper);
          const seenElements = new Set();
          return filterList(array, function (elem, index) {
            const mapped = mapper(elem, index);
            if (seenElements.has(mapped)) {
              return false;
            } else {
              seenElements.add(mapped);
              return true;
            }
          });
        }
        function filterList(list, tester) {
          tester = iteratee(tester);
          const matches = [];
          each(list, function (element, index) {
            if (tester(element, index)) {
              return matches.push(element);
            }
          });
          return matches;
        }
        function reject(list, tester) {
          tester = negate(iteratee(tester));
          return filterList(list, tester);
        }
        function intersect(array1, array2) {
          return filterList(array1, element => contains(array2, element));
        }
        function scheduleTimer(millis, callback) {
          return setTimeout(callback, millis);
        }
        function queueTask(task) {
          return setTimeout(task);
        }
        function queueMicrotask(task) {
          return Promise.resolve().then(task);
        }
        function last(value) {
          return value[value.length - 1];
        }
        function contains(value, subValue) {
          return value.indexOf(subValue) >= 0;
        }
        function objectContains(object, subObject) {
          const reducedValue = pick(object, Object.keys(subObject));
          return isEqual(subObject, reducedValue);
        }
        function pick(object, keys) {
          const filtered = {};
          for (let key of keys) {
            if (key in object) {
              filtered[key] = object[key];
            }
          }
          return filtered;
        }
        function pickBy(object, tester) {
          tester = iteratee(tester);
          const filtered = {};
          for (let key in object) {
            const value = object[key];
            if (tester(value, key, object)) {
              filtered[key] = object[key];
            }
          }
          return filtered;
        }
        function omit(object, keys) {
          return pickBy(object, (_value, key) => !contains(keys, key));
        }
        function unresolvablePromise() {
          return new Promise(noop);
        }
        function remove(array, element) {
          const index = array.indexOf(element);
          if (index >= 0) {
            array.splice(index, 1);
            return element;
          }
        }
        function evalOption(value, ...args) {
          return isFunction(value) ? value(...args) : value;
        }
        function evalAutoOption(value, autoMeans, ...args) {
          value = evalOption(value, ...args);
          if (value === 'auto') {
            value = evalOption(autoMeans, ...args);
          }
          return value;
        }
        const ESCAPE_HTML_ENTITY_MAP = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': '&quot;',
          "'": '&#x27;'
        };
        function escapeHTML(string) {
          return string.replace(/[&<>"']/g, char => ESCAPE_HTML_ENTITY_MAP[char]);
        }
        function escapeRegExp(string) {
          return string.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        function pluckKey(object, key) {
          const value = object[key];
          delete object[key];
          return value;
        }
        function renameKey(object, oldKey, newKey) {
          return object[newKey] = pluckKey(object, oldKey);
        }
        function extractLastArg(args, tester) {
          if (tester(last(args))) {
            return args.pop();
          }
        }
        function extractCallback(args) {
          return extractLastArg(args, isFunction);
        }
        function extractOptions(args) {
          return extractLastArg(args, isOptions) || {};
        }
        function identity(arg) {
          return arg;
        }
        function sequence(functions) {
          functions = compact(functions);
          return (...args) => map(functions, fn => fn(...args));
        }
        function flatten(array) {
          const flattened = [];
          for (let object of array) {
            if (isList(object)) {
              flattened.push(...object);
            } else {
              flattened.push(object);
            }
          }
          return flattened;
        }
        function flatMap(array, block) {
          return flatten(map(array, block));
        }
        function always(promise, callback = identity) {
          return promise.then(callback, callback);
        }
        function newDeferred() {
          let resolveFn;
          let rejectFn;
          const nativePromise = new Promise(function (givenResolve, givenReject) {
            resolveFn = givenResolve;
            rejectFn = givenReject;
          });
          nativePromise.resolve = resolveFn;
          nativePromise.reject = rejectFn;
          return nativePromise;
        }
        function isBasicObjectProperty(k) {
          return Object.prototype.hasOwnProperty(k);
        }
        function isEqual(a, b) {
          if (a?.valueOf) {
            a = a.valueOf();
          }
          if (b?.valueOf) {
            b = b.valueOf();
          }
          if (typeof a !== typeof b) {
            return false;
          } else if (isList(a) && isList(b)) {
            return isEqualList(a, b);
          } else if (isObject(a) && a[isEqual.key]) {
            return a[isEqual.key](b);
          } else if (isOptions(a) && isOptions(b)) {
            const aKeys = Object.keys(a);
            const bKeys = Object.keys(b);
            if (isEqualList(aKeys, bKeys)) {
              return every(aKeys, aKey => isEqual(a[aKey], b[aKey]));
            } else {
              return false;
            }
          } else {
            return a === b;
          }
        }
        isEqual.key = 'up.util.isEqual';
        function isEqualList(a, b) {
          return a.length === b.length && every(a, (elem, index) => isEqual(elem, b[index]));
        }
        const PARSE_TOKEN_PATTERNS = {
          'space/or': /\s+(?:or\s+)?/,
          'or': /\s+or\s+/,
          'comma': /\s*,\s*/
        };
        function parseTokens(value, options = {}) {
          if (isString(value)) {
            value = value.trim();
            if (options.json && /^\[.*]$/.test(value)) {
              return JSON.parse(value);
            } else {
              let separator = options.separator || 'space/or';
              let pattern = PARSE_TOKEN_PATTERNS[separator];
              return value.split(pattern);
            }
          } else {
            return wrapList(value);
          }
        }
        function wrapValue(constructor, ...args) {
          return args[0] instanceof constructor ? args[0] : new constructor(...args);
        }
        let nextUid = 0;
        function uid() {
          return nextUid++;
        }
        function reverse(list) {
          return copy(list).reverse();
        }
        function renameKeys(object, renameKeyFn) {
          const renamed = {};
          for (let key in object) {
            renamed[renameKeyFn(key)] = object[key];
          }
          return renamed;
        }
        function camelToKebabCase(str) {
          return str.replace(/[A-Z]/g, char => '-' + char.toLowerCase());
        }
        function lowerCaseFirst(str) {
          return str[0].toLowerCase() + str.slice(1);
        }
        function upperCaseFirst(str) {
          return str[0].toUpperCase() + str.slice(1);
        }
        function defineGetter(object, prop, get) {
          Object.defineProperty(object, prop, {
            get
          });
        }
        function defineDelegates(object, props, targetProvider) {
          for (let prop of props) {
            Object.defineProperty(object, prop, {
              get() {
                const target = targetProvider.call(this);
                let value = target[prop];
                if (isFunction(value)) {
                  value = value.bind(target);
                }
                return value;
              },
              set(newValue) {
                const target = targetProvider.call(this);
                target[prop] = newValue;
              }
            });
          }
        }
        function stringifyArg(arg, placeholder = '%o') {
          let string;
          const maxLength = 200;
          if (placeholder === '%c') {
            return '';
          }
          if (placeholder === '%s' && isGiven(arg)) {
            arg = arg.toString();
          }
          if (isString(arg)) {
            string = arg.trim().replace(/[\n\r\t ]+/g, ' ');
            if (placeholder === '%o') {
              string = JSON.stringify(string);
            }
          } else if (isUndefined(arg)) {
            string = 'undefined';
          } else if (isNumber(arg) || isFunction(arg)) {
            string = arg.toString();
          } else if (isArray(arg)) {
            string = `[${map(arg, stringifyArg).join(', ')}]`;
          } else if (isJQuery(arg)) {
            string = `$(${map(arg, stringifyArg).join(', ')})`;
          } else if (isElement(arg)) {
            string = `<${arg.tagName.toLowerCase()}`;
            for (let attr of ['id', 'up-id', 'name', 'class']) {
              let value = arg.getAttribute(attr);
              if (value) {
                string += ` ${attr}="${value}"`;
              }
            }
            string += ">";
          } else if (isRegExp(arg) || isError(arg)) {
            string = arg.toString();
          } else {
            try {
              string = JSON.stringify(arg);
            } catch (error) {
              if (error.name === 'TypeError') {
                string = '(circular structure)';
              } else {
                throw error;
              }
            }
          }
          if (string.length > maxLength) {
            string = `${string.substr(0, maxLength)}…${last(string)}`;
          }
          return string;
        }
        const SPRINTF_PLACEHOLDERS = /%[oOdisfc]/g;
        function sprintf(message, ...args) {
          return message.replace(SPRINTF_PLACEHOLDERS, placeholder => stringifyArg(args.shift(), placeholder));
        }
        function negate(fn) {
          return function (...args) {
            return !fn(...args);
          };
        }
        function useMemoizeCacheEntry(cacheEntry) {
          if (cacheEntry.error) {
            throw cacheEntry.error;
          } else {
            return cacheEntry.value;
          }
        }
        function buildMemoizeCacheEntry(oldImpl, self, args) {
          try {
            return {
              value: oldImpl.apply(self, args)
            };
          } catch (e) {
            return {
              error: e
            };
          }
        }
        function memoizeMethod(object, propOrProps) {
          for (let prop of wrapList(propOrProps)) {
            let oldImpl = object[prop];
            object[prop] = function (...args) {
              var _a;
              let cache = this[_a = `__${prop}MemoizeCache`] || (this[_a] = {});
              let cacheKey = JSON.stringify(args);
              cache[cacheKey] || (cache[cacheKey] = buildMemoizeCacheEntry(oldImpl, this, args));
              return useMemoizeCacheEntry(cache[cacheKey]);
            };
          }
        }
        function safeStringifyJSON(value) {
          let json = JSON.stringify(value);
          return escapeHighASCII(json);
        }
        function escapeHighASCII(string) {
          let unicodeEscape = char => "\\u" + char.charCodeAt(0).toString(16).padStart(4, '0');
          return string.replace(/[^\x00-\x7F]/g, unicodeEscape);
        }
        function variant(source, changes = {}) {
          let variant = Object.create(source);
          Object.assign(variant, changes);
          return variant;
        }
        return {
          parseURL,
          normalizeURL,
          matchURLs,
          normalizeMethod,
          methodAllowsPayload,
          copy,
          copyArrayLike,
          merge,
          mergeDefined,
          options: newOptions,
          parseArgIntoOptions,
          each,
          map,
          flatMap,
          mapObject,
          findResult,
          some,
          every,
          find: findInList,
          filter: filterList,
          filterMap: filterMap,
          reject,
          intersect,
          compact,
          compactObject,
          uniq,
          uniqBy,
          last,
          isNull,
          isDefined,
          isUndefined,
          isGiven,
          isMissing,
          isPresent,
          isBlank,
          presence,
          isObject,
          isFunction,
          isString,
          isBoolean,
          isNumber,
          isElement,
          isJQuery,
          isElementish,
          isPromise,
          isOptions,
          isArray,
          isFormData,
          isList,
          isRegExp,
          timer: scheduleTimer,
          contains,
          objectContains,
          toArray,
          pick,
          pickBy,
          omit,
          unresolvablePromise,
          remove,
          memoize,
          pluckKey,
          renameKey,
          extractOptions,
          extractCallback,
          noop,
          asyncNoop,
          identity,
          escapeHTML,
          escapeRegExp,
          sequence,
          evalOption,
          evalAutoOption,
          flatten,
          newDeferred,
          always,
          isBasicObjectProperty,
          isCrossOrigin,
          task: queueTask,
          microtask: queueMicrotask,
          isEqual,
          parseTokens,
          wrapList,
          wrapValue,
          uid,
          upperCaseFirst,
          lowerCaseFirst,
          getter: defineGetter,
          delegate: defineDelegates,
          reverse,
          camelToKebabCase,
          nullToUndefined,
          sprintf,
          renameKeys,
          negate,
          memoizeMethod,
          safeStringifyJSON,
          variant
        };
      }();

      /***/
    }, /* 4 */
    /***/() => {
      up.error = function () {
        function fail(...args) {
          throw new up.Error(args);
        }
        function isCritical(error) {
          return typeof error !== 'object' || error.name !== 'AbortError' && !(error instanceof up.RenderResult) && !(error instanceof up.Response);
        }
        function muteUncriticalRejection(promise) {
          return promise.catch(rethrowCritical);
        }
        function muteUncriticalSync(block) {
          try {
            return block();
          } catch (e) {
            rethrowCritical(e);
          }
        }
        function rethrowCritical(value) {
          if (isCritical(value)) {
            throw value;
          }
        }
        return {
          fail,
          rethrowCritical,
          isCritical,
          muteUncriticalRejection,
          muteUncriticalSync
        };
      }();
      up.fail = up.error.fail;

      /***/
    }, /* 5 */
    /***/() => {
      up.migrate = {
        config: {}
      };

      /***/
    }, /* 6 */
    /***/() => {
      up.browser = function () {
        const u = up.util;
        function submitForm(form) {
          form.submit();
        }
        function canPushState() {
          return up.protocol.initialRequestMethod() === 'GET';
        }
        function canJQuery() {
          return !!window.jQuery;
        }
        const canEval = u.memoize(function () {
          try {
            return new Function('return true')();
          } catch {
            return false;
          }
        });
        function popCookie(name) {
          let value = document.cookie.match(new RegExp(name + "=(\\w+)"))?.[1];
          if (value) {
            document.cookie = name + '=;Max-Age=0;Path=/';
            return value;
          }
        }
        function assertConfirmed(options) {
          const confirmed = !options.confirm || window.confirm(options.confirm);
          if (!confirmed) {
            throw new up.Aborted('User canceled action');
          }
          return true;
        }
        return {
          submitForm,
          canPushState,
          canJQuery,
          canEval,
          assertConfirmed,
          popCookie
        };
      }();

      /***/
    }, /* 7 */
    /***/(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      __webpack_require__(8);
      up.element = function () {
        const u = up.util;
        function first(...args) {
          const selector = args.pop();
          const root = args[0] || document;
          return root.querySelector(selector);
        }
        function subtree(root, selector) {
          const results = [];
          if (root.matches(selector)) {
            results.push(root);
          }
          results.push(...root.querySelectorAll(selector));
          return results;
        }
        function contains(root, selectorOrElement) {
          const element = getOne(selectorOrElement);
          return Node.prototype.contains.call(root, element);
        }
        function ancestor(element, selector) {
          let parentElement = element.parentElement;
          if (parentElement) {
            if (parentElement.matches(selector)) {
              return parentElement;
            } else {
              return ancestor(parentElement, selector);
            }
          }
        }
        function around(element, selector) {
          return getList(element.closest(selector), subtree(element, selector));
        }
        function getOne(...args) {
          const value = args.pop();
          if (u.isElement(value)) {
            return value;
          } else if (u.isString(value)) {
            return first(...args, value);
          } else if (u.isList(value)) {
            if (value.length > 1) {
              up.fail('up.element.get(): Cannot cast multiple elements (%o) to a single element', value);
            }
            return value[0];
          } else {
            return value;
          }
        }
        function getList(...args) {
          return u.flatMap(args, valueToList);
        }
        function valueToList(value) {
          if (u.isString(value)) {
            return document.querySelectorAll(value);
          } else {
            return u.wrapList(value);
          }
        }
        function hide(element) {
          element.setAttribute('hidden', '');
        }
        function show(element) {
          element.removeAttribute('hidden');
          if (element.style.display === 'none') {
            element.style.display = '';
          }
        }
        function toggle(element, newVisible) {
          if (newVisible == null) {
            newVisible = !isVisible(element);
          }
          (newVisible ? show : hide)(element);
        }
        function toggleAttr(element, attr, value, newPresent) {
          if (newPresent == null) {
            newPresent = !element.hasAttribute(attr);
          }
          if (newPresent) {
            return element.setAttribute(attr, value);
          } else {
            return element.removeAttribute(attr);
          }
        }
        function setAttrs(element, attrs) {
          for (let key in attrs) {
            const value = attrs[key];
            if (u.isGiven(value)) {
              element.setAttribute(key, value);
            } else {
              element.removeAttribute(key);
            }
          }
        }
        function setTemporaryAttrs(element, attrs) {
          const oldAttrs = {};
          for (let key of Object.keys(attrs)) {
            oldAttrs[key] = element.getAttribute(key);
          }
          setAttrs(element, attrs);
          return () => setAttrs(element, oldAttrs);
        }
        function metaContent(name) {
          const selector = "meta" + attrSelector('name', name);
          return first(selector)?.getAttribute('content');
        }
        function insertBefore(existingElement, newElement) {
          existingElement.insertAdjacentElement('beforebegin', newElement);
        }
        function createFromSelector(selector, attrs) {
          let {
            includePath
          } = parseSelector(selector);
          let rootElement;
          let depthElement;
          let previousElement;
          for (let includeSegment of includePath) {
            let {
              tagName,
              id,
              classNames,
              attributes
            } = includeSegment;
            if (!tagName || tagName === '*') {
              tagName = 'div';
            }
            depthElement = document.createElement(tagName);
            if (!rootElement) {
              rootElement = depthElement;
            }
            if (id) {
              depthElement.id = id;
            }
            for (let className of classNames) {
              depthElement.classList.add(className);
            }
            for (let attributeName in attributes) {
              let attributeValue = attributes[attributeName];
              depthElement.setAttribute(attributeName, attributeValue || '');
            }
            previousElement?.appendChild(depthElement);
            previousElement = depthElement;
          }
          if (attrs) {
            let value;
            if (value = u.pluckKey(attrs, 'class')) {
              for (let klass of u.wrapList(value)) {
                rootElement.classList.add(klass);
              }
            }
            if (value = u.pluckKey(attrs, 'style')) {
              setInlineStyle(rootElement, value);
            }
            if (value = u.pluckKey(attrs, 'text')) {
              rootElement.textContent = value;
            }
            if (value = u.pluckKey(attrs, 'content')) {
              rootElement.innerHTML = value;
            }
            setAttrs(rootElement, attrs);
          }
          return rootElement;
        }
        function parseSelector(selector) {
          let excludeRaw;
          const includeRaw = selector.replace(/:not\([^)]+\)/, function (match) {
            excludeRaw = match;
            return '';
          });
          const [includeSelectorWithoutAttrValues, attrValues] = removeAttrSelectorValues(includeRaw);
          const includeSegments = includeSelectorWithoutAttrValues.split(/[ >]+/);
          let includePath = includeSegments.map(function (depthSelector) {
            let parsed = {
              tagName: null,
              classNames: [],
              id: null,
              attributes: {}
            };
            depthSelector = depthSelector.replace(/^[\w-*]+/, function (match) {
              parsed.tagName = match;
              return '';
            });
            depthSelector = depthSelector.replace(/#([\w-]+)/, function (_match, id) {
              parsed.id = id;
              return '';
            });
            depthSelector = depthSelector.replace(/\.([\w-]+)/g, function (_match, className) {
              parsed.classNames.push(className);
              return '';
            });
            if (attrValues.length) {
              depthSelector = replaceAttrSelectors(depthSelector, function ({
                name
              }) {
                parsed.attributes[name] = attrValues.shift();
                return '';
              });
            }
            if (depthSelector) {
              up.fail('Cannot parse selector: ' + selector);
            }
            return parsed;
          });
          return {
            includePath,
            includeRaw,
            excludeRaw
          };
        }
        const ATTR_SELECTOR_PATTERN = /\[([\w-]+)(?:([~|^$*]?=)(["'])?([^\3\]]*?)\3)?]/g;
        function replaceAttrSelectors(string, replacement) {
          return string.replace(ATTR_SELECTOR_PATTERN, function (_match, name, operator, quote, value) {
            if (value) {
              value = value.replace(/\\([\\"'])/, '$1');
            }
            return replacement({
              name,
              operator,
              quote,
              value
            });
          });
        }
        function removeAttrSelectorValues(selector) {
          let values = [];
          selector = replaceAttrSelectors(selector, function ({
            name,
            value
          }) {
            values.push(value);
            return `[${name}]`;
          });
          return [selector, values];
        }
        function affix(parent, ...args) {
          let position, selector;
          const attributes = u.extractOptions(args);
          if (args.length === 2) {
            [position, selector] = args;
          } else {
            position = 'beforeend';
            selector = args[0];
          }
          const element = createFromSelector(selector, attributes);
          parent.insertAdjacentElement(position, element);
          return element;
        }
        const SINGLETON_TAG_NAMES = ['HTML', 'BODY', 'HEAD', 'TITLE'];
        const isSingleton = up.mockable(element => element.matches(SINGLETON_TAG_NAMES.join(',')));
        function elementTagName(element) {
          return element.tagName.toLowerCase();
        }
        function attrSelector(attribute, value) {
          if (u.isGiven(value)) {
            value = value.replace(/"/g, '\\"');
            return `[${attribute}="${value}"]`;
          } else {
            return `[${attribute}]`;
          }
        }
        function idSelector(id) {
          if (id.match(/^[a-z0-9\-_]+$/i)) {
            return `#${id}`;
          } else {
            return attrSelector('id', id);
          }
        }
        function classSelector(klass) {
          klass = klass.replace(/[^\w-]/g, '\\$&');
          return `.${klass}`;
        }
        function createBrokenDocumentFromHTML(html) {
          return new DOMParser().parseFromString(html, 'text/html');
        }
        function fixScriptish(scriptish) {
          let clone = document.createElement(scriptish.tagName);
          for (let {
            name,
            value
          } of scriptish.attributes) {
            clone.setAttribute(name, value);
          }
          clone.textContent = scriptish.innerHTML;
          scriptish.replaceWith(clone);
        }
        function createFromHTML(html) {
          const range = document.createRange();
          range.setStart(document.body, 0);
          const fragment = range.createContextualFragment(html.trim());
          let elements = fragment.childNodes;
          if (elements.length !== 1) {
            throw new Error('HTML must have a single root element');
          }
          return elements[0];
        }
        function getRoot() {
          return document.documentElement;
        }
        function paint(element) {
          element.offsetHeight;
        }
        function concludeCSSTransition(element) {
          const undo = setTemporaryStyle(element, {
            transition: 'none'
          });
          paint(element);
          return undo;
        }
        function hasCSSTransition(elementOrStyleHash) {
          let styleHash;
          if (u.isOptions(elementOrStyleHash)) {
            styleHash = elementOrStyleHash;
          } else {
            styleHash = computedStyle(elementOrStyleHash);
          }
          const prop = styleHash.transitionProperty;
          const duration = styleHash.transitionDuration;
          const noTransition = prop === 'none' || prop === 'all' && duration === 0;
          return !noTransition;
        }
        function fixedToAbsolute(element) {
          const elementRectAsFixed = element.getBoundingClientRect();
          element.style.position = 'absolute';
          const offsetParentRect = element.offsetParent.getBoundingClientRect();
          setInlineStyle(element, {
            left: elementRectAsFixed.left - computedStyleNumber(element, 'margin-left') - offsetParentRect.left,
            top: elementRectAsFixed.top - computedStyleNumber(element, 'margin-top') - offsetParentRect.top,
            right: '',
            bottom: ''
          });
        }
        function setMissingAttrs(element, attrs) {
          for (let key in attrs) {
            setMissingAttr(element, key, attrs[key]);
          }
        }
        function setMissingAttr(element, key, value) {
          if (u.isMissing(element.getAttribute(key))) {
            element.setAttribute(key, value);
          }
        }
        function unwrap(wrapper) {
          preservingFocus(function () {
            const parent = wrapper.parentNode;
            const wrappedNodes = u.toArray(wrapper.childNodes);
            u.each(wrappedNodes, wrappedNode => parent.insertBefore(wrappedNode, wrapper));
            parent.removeChild(wrapper);
          });
        }
        function wrapChildren(element) {
          let childNode;
          const wrapper = document.createElement('up-wrapper');
          while (childNode = element.firstChild) {
            wrapper.appendChild(childNode);
          }
          element.appendChild(wrapper);
          return wrapper;
        }
        function isWrapper(element) {
          return element.matches('up-wrapper');
        }
        function preservingFocus(fn) {
          const oldFocusElement = document.activeElement;
          try {
            return fn();
          } finally {
            if (oldFocusElement && oldFocusElement !== document.activeElement) {
              oldFocusElement.focus({
                preventScroll: true
              });
            }
          }
        }
        function stringAttr(element, attribute) {
          return u.nullToUndefined(element.getAttribute(attribute));
        }
        function booleanAttr(element, attribute, pass) {
          if (!element.hasAttribute(attribute)) return;
          const value = stringAttr(element, attribute);
          switch (value) {
            case 'false':
              {
                return false;
              }
            case 'true':
            case '':
            case attribute:
              {
                return true;
              }
            default:
              {
                if (pass) {
                  return value;
                } else {
                  return true;
                }
              }
          }
        }
        function booleanOrStringAttr(element, attribute) {
          return booleanAttr(element, attribute, true);
        }
        function numberAttr(element, attribute) {
          let value = element.getAttribute(attribute);
          if (value) {
            value = value.replace(/_/g, '');
            if (value.match(/^[\d.]+$/)) {
              return parseFloat(value);
            }
          }
        }
        function jsonAttr(element, attribute) {
          let json = element.getAttribute?.(attribute)?.trim();
          if (json) {
            return JSON.parse(json);
          }
        }
        function callbackAttr(link, attr, {
          exposedKeys = [],
          mainKey = 'event'
        } = {}) {
          let code = link.getAttribute(attr);
          if (code) {
            const callback = up.NonceableCallback.fromString(code).toFunction(mainKey, ...exposedKeys);
            return function (event) {
              const exposedValues = Object.values(u.pick(event, exposedKeys));
              return callback.call(link, event, ...exposedValues);
            };
          }
        }
        function closestAttr(element, attr, parseFn = stringAttr) {
          let match = element.closest('[' + attr + ']');
          if (match) {
            return parseFn(match, attr);
          }
        }
        function setTemporaryStyle(element, newStyles) {
          const oldStyles = inlineStyle(element, Object.keys(newStyles));
          setInlineStyle(element, newStyles);
          return () => setInlineStyle(element, oldStyles);
        }
        function addTemporaryClass(element, klass) {
          element.classList.add(klass);
          return () => element.classList.remove(klass);
        }
        function setTemporaryAttr(element, attr, value) {
          element.setAttribute(attr, value);
          return () => element.removeAttribute(element, attr);
        }
        function computedStyle(element, props) {
          const style = window.getComputedStyle(element);
          return extractFromStyleObject(style, props);
        }
        function computedStyleNumber(element, prop) {
          const rawValue = computedStyle(element, prop);
          if (u.isGiven(rawValue)) {
            return parseFloat(rawValue);
          }
        }
        function inlineStyle(element, props) {
          const {
            style
          } = element;
          return extractFromStyleObject(style, props);
        }
        function extractFromStyleObject(style, keyOrKeys) {
          if (u.isString(keyOrKeys)) {
            return style[keyOrKeys];
          } else {
            return u.pick(style, keyOrKeys);
          }
        }
        function setInlineStyle(element, props) {
          if (u.isString(props)) {
            element.setAttribute('style', props);
          } else {
            const {
              style
            } = element;
            for (let key in props) {
              let value = props[key];
              value = normalizeStyleValueForWrite(key, value);
              style[key] = value;
            }
          }
        }
        function normalizeStyleValueForWrite(key, value) {
          if (u.isMissing(value)) {
            value = '';
          } else if (CSS_LENGTH_PROPS.has(key.toLowerCase().replace(/-/, ''))) {
            value = cssLength(value);
          }
          return value;
        }
        const CSS_LENGTH_PROPS = new Set(['top', 'right', 'bottom', 'left', 'padding', 'paddingtop', 'paddingright', 'paddingbottom', 'paddingleft', 'margin', 'margintop', 'marginright', 'marginbottom', 'marginleft', 'borderwidth', 'bordertopwidth', 'borderrightwidth', 'borderbottomwidth', 'borderleftwidth', 'width', 'height', 'maxwidth', 'maxheight', 'minwidth', 'minheight']);
        function cssLength(obj) {
          if (u.isNumber(obj) || u.isString(obj) && /^\d+$/.test(obj)) {
            return obj.toString() + "px";
          } else {
            return obj;
          }
        }
        function isVisible(element) {
          return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
        }
        function upAttrs(element) {
          const upAttributePattern = /^up-/;
          const attrs = {};
          for (let attribute of element.attributes) {
            const {
              name
            } = attribute;
            if (name.match(upAttributePattern)) {
              attrs[name] = attribute.value;
            }
          }
          return attrs;
        }
        function cleanJQuery(element) {
          if (up.browser.canJQuery()) {
            jQuery(element).remove();
          }
        }
        return {
          subtree,
          contains,
          closestAttr,
          ancestor,
          around,
          get: getOne,
          list: getList,
          toggle,
          hide,
          show,
          metaContent,
          insertBefore,
          createFromSelector,
          setAttrs,
          setTemporaryAttrs,
          affix,
          idSelector,
          classSelector,
          isSingleton,
          attrSelector,
          tagName: elementTagName,
          createBrokenDocumentFromHTML,
          fixScriptish,
          createFromHTML,
          get root() {
            return getRoot();
          },
          paint,
          concludeCSSTransition,
          hasCSSTransition,
          fixedToAbsolute,
          setMissingAttrs,
          setMissingAttr,
          unwrap,
          wrapChildren,
          isWrapper,
          attr: stringAttr,
          booleanAttr,
          numberAttr,
          jsonAttr,
          callbackAttr,
          booleanOrStringAttr,
          setTemporaryStyle,
          style: computedStyle,
          styleNumber: computedStyleNumber,
          inlineStyle,
          setStyle: setInlineStyle,
          isVisible,
          upAttrs,
          toggleAttr,
          addTemporaryClass,
          setTemporaryAttr,
          cleanJQuery,
          parseSelector
        };
      }();

      /***/
    }, /* 8 */
    /***/(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      // extracted by mini-css-extract-plugin

      /***/
    }, /* 9 */
    /***/() => {
      up.Error = class Error extends window.Error {
        constructor(message, props = {}) {
          if (Array.isArray(message)) {
            message = up.util.sprintf(...message);
          }
          super(message);
          let name = 'up.' + this.constructor.name;
          Object.assign(this, {
            name
          }, props);
        }
      };

      /***/
    }, /* 10 */
    /***/() => {
      up.NotImplemented = class NotImplemented extends up.Error {};

      /***/
    }, /* 11 */
    /***/() => {
      up.Aborted = class Aborted extends up.Error {
        constructor(message) {
          super(message, {
            name: 'AbortError'
          });
        }
      };

      /***/
    }, /* 12 */
    /***/() => {
      up.CannotCompile = class CannotCompile extends up.Error {};

      /***/
    }, /* 13 */
    /***/() => {
      up.CannotMatch = class CannotMatch extends up.Error {};

      /***/
    }, /* 14 */
    /***/() => {
      up.CannotParse = class CannotParse extends up.Error {};

      /***/
    }, /* 15 */
    /***/() => {
      up.CannotTarget = class CannotTarget extends up.Error {};

      /***/
    }, /* 16 */
    /***/() => {
      up.Offline = class Offline extends up.Error {};

      /***/
    }, /* 17 */
    /***/() => {
      const u = up.util;
      up.Record = class Record {
        keys() {
          throw 'Return an array of keys';
        }
        defaults(_options) {
          return {};
        }
        constructor(options) {
          Object.assign(this, this.defaults(options), this.attributes(options));
        }
        attributes(source = this) {
          return u.pick(source, this.keys());
        }
        [u.copy.key]() {
          return u.variant(this);
        }
        [u.isEqual.key](other) {
          return this.constructor === other.constructor && u.isEqual(this.attributes(), other.attributes());
        }
      };

      /***/
    }, /* 18 */
    /***/() => {
      up.Config = class Config {
        constructor(blueprintFn = () => ({})) {
          this.blueprintFn = blueprintFn;
          this.reset();
        }
        reset() {
          Object.assign(this, this.blueprintFn());
        }
      };

      /***/
    }, /* 19 */
    /***/() => {
      let enabledKey = 'up.log.enabled';
      let enabled = false;
      try {
        enabled = !!sessionStorage?.getItem(enabledKey);
      } catch {}
      up.LogConfig = class LogConfig extends up.Config {
        constructor() {
          super(() => ({
            banner: true,
            format: true
          }));
        }
        get enabled() {
          return enabled;
        }
        set enabled(newEnabled) {
          enabled = newEnabled;
          try {
            sessionStorage?.setItem(enabledKey, newEnabled ? '1' : '');
          } catch {}
        }
      };

      /***/
    }, /* 20 */
    /***/() => {
      const u = up.util;
      up.FIFOCache = class FIFOCache {
        constructor({
          capacity = 10,
          normalizeKey = u.identity
        } = {}) {
          this.map = new Map();
          this.capacity = capacity;
          this.normalizeKey = normalizeKey;
        }
        get(key) {
          key = this.normalizeKey(key);
          return this.map.get(key);
        }
        set(key, value) {
          if (this.map.size === this.capacity) {
            let oldestKey = this.map.keys().next().value;
            this.map.delete(oldestKey);
          }
          key = this.normalizeKey(key);
          this.map.set(key, value);
        }
        clear() {
          this.map.clear();
        }
      };

      /***/
    }, /* 21 */
    /***/() => {
      up.Rect = class Rect extends up.Record {
        keys() {
          return ['left', 'top', 'width', 'height'];
        }
        get bottom() {
          return this.top + this.height;
        }
        get right() {
          return this.left + this.width;
        }
        static fromElement(element) {
          return new this(element.getBoundingClientRect());
        }
      };

      /***/
    }, /* 22 */
    /***/() => {
      const e = up.element;
      up.BodyShifter = class BodyShifter {
        constructor() {
          this.unshiftFns = [];
          this.reset();
        }
        reset() {
          this.unshiftNow();
          this.shiftCount = 0;
        }
        shift() {
          this.shiftCount++;
          if (this.shiftCount > 1) {
            return;
          }
          const scrollbarTookSpace = up.viewport.rootHasReducedWidthFromScrollbar();
          const overflowElement = up.viewport.rootOverflowElement();
          this.changeStyle(overflowElement, {
            overflowY: 'hidden'
          });
          if (!scrollbarTookSpace) {
            return;
          }
          const {
            body
          } = document;
          const scrollbarWidth = up.viewport.scrollbarWidth();
          const bodyRightPadding = e.styleNumber(body, 'paddingRight');
          const bodyRightShift = scrollbarWidth + bodyRightPadding;
          this.changeStyle(body, {
            paddingRight: bodyRightShift
          });
          for (let anchor of up.viewport.anchoredRight()) {
            const elementRight = e.styleNumber(anchor, 'right');
            const elementRightShift = scrollbarWidth + elementRight;
            this.changeStyle(anchor, {
              right: elementRightShift
            });
          }
        }
        changeStyle(element, styles) {
          this.unshiftFns.push(e.setTemporaryStyle(element, styles));
        }
        unshift() {
          this.shiftCount--;
          if (this.shiftCount == 0) {
            this.unshiftNow();
          }
        }
        unshiftNow() {
          let unshiftFn;
          while (unshiftFn = this.unshiftFns.pop()) {
            unshiftFn();
          }
        }
      };

      /***/
    }, /* 23 */
    /***/() => {
      const u = up.util;
      up.Change = class Change {
        constructor(options) {
          this.options = options;
        }
        execute() {
          throw new up.NotImplemented();
        }
        onFinished(renderResult) {
          return this.options.onFinished?.(renderResult);
        }
        improveHistoryValue(existingValue, newValue) {
          if (existingValue === false || u.isString(existingValue)) {
            return existingValue;
          } else {
            return newValue;
          }
        }
        deriveFailOptions() {
          return up.RenderOptions.deriveFailOptions(this.options);
        }
      };

      /***/
    }, /* 24 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.Change.Addition = class Addition extends up.Change {
        constructor(options) {
          super(options);
          this.responseDoc = options.responseDoc;
          this.acceptLayer = options.acceptLayer;
          this.dismissLayer = options.dismissLayer;
          this.eventPlans = options.eventPlans || [];
          this.response = options.meta?.response;
        }
        handleLayerChangeRequests() {
          if (this.layer.isOverlay()) {
            this.tryAcceptLayerFromServer();
            this.abortWhenLayerClosed();
            this.layer.tryAcceptForLocation(this.responseOption());
            this.abortWhenLayerClosed();
            this.tryDismissLayerFromServer();
            this.abortWhenLayerClosed();
            this.layer.tryDismissForLocation(this.responseOption());
            this.abortWhenLayerClosed();
          }
          this.layer.asCurrent(() => {
            for (let eventPlan of this.eventPlans) {
              up.emit({
                ...eventPlan,
                ...this.responseOption()
              });
              this.abortWhenLayerClosed();
            }
          });
        }
        tryAcceptLayerFromServer() {
          if (u.isDefined(this.acceptLayer) && this.layer.isOverlay()) {
            this.layer.accept(this.acceptLayer, this.responseOption());
          }
        }
        tryDismissLayerFromServer() {
          if (u.isDefined(this.dismissLayer) && this.layer.isOverlay()) {
            this.layer.dismiss(this.dismissLayer, this.responseOption());
          }
        }
        abortWhenLayerClosed(layer = this.layer) {
          if (layer.isClosed()) {
            throw new up.Aborted('Layer was closed');
          }
        }
        setSource({
          oldElement,
          newElement,
          source
        }) {
          if (source === 'keep') {
            source = oldElement && up.fragment.source(oldElement);
          }
          if (source) {
            e.setMissingAttr(newElement, 'up-source', u.normalizeURL(source, {
              hash: false
            }));
          }
        }
        setTime({
          newElement,
          time
        }) {
          e.setMissingAttr(newElement, 'up-time', time ? time.toUTCString() : false);
        }
        setETag({
          newElement,
          etag
        }) {
          e.setMissingAttr(newElement, 'up-etag', etag || false);
        }
        setReloadAttrs(options) {
          this.setSource(options);
          this.setTime(options);
          this.setETag(options);
        }
        responseOption() {
          return {
            response: this.response
          };
        }
      };

      /***/
    }, /* 25 */
    /***/() => {
      var _a;
      const u = up.util;
      up.RenderJob = (_a = class RenderJob {
        constructor(options) {
          this.options = up.RenderOptions.preprocess(options);
          this.rendered = this.execute();
        }
        async execute() {
          try {
            let result = await this.makeChange();
            this.runResultCallbacks(result);
            return result;
          } catch (error) {
            this.runResultCallbacks(error) || this.options.onError?.(error);
            throw error;
          }
        }
        runResultCallbacks(result) {
          if (result instanceof up.RenderResult) {
            if (!result.none) result.options.onRendered?.(result);
            result.finished.then(result.options.onFinished, u.noop);
            return true;
          }
        }
        get finished() {
          return this.awaitFinished();
        }
        async awaitFinished() {
          try {
            let result = await this.rendered;
            return await result.finished;
          } catch (error) {
            if (error instanceof up.RenderResult) {
              throw await error.finished;
            } else {
              throw error;
            }
          }
        }
        makeChange() {
          this.guardRender();
          if (this.options.url) {
            let onRequest = request => this.handleAbortOption(request);
            this.change = new up.Change.FromURL({
              ...this.options,
              onRequest
            });
          } else if (this.options.response) {
            this.change = new up.Change.FromResponse(this.options);
            this.handleAbortOption(null);
          } else {
            this.change = new up.Change.FromContent(this.options);
            this.handleAbortOption(null);
          }
          return this.change.execute();
        }
        guardRender() {
          up.browser.assertConfirmed(this.options);
          let guardEvent = u.pluckKey(this.options, 'guardEvent');
          if (guardEvent) {
            guardEvent.renderOptions = this.options;
            if (up.emit(guardEvent, {
              target: this.options.origin
            }).defaultPrevented) {
              let message = `Rendering was prevented by ${guardEvent.type} listener`;
              up.puts('up.render()', message);
              throw new up.Aborted(message);
            }
          }
          up.RenderOptions.assertContentGiven(this.options);
        }
        handleAbortOption(request) {
          let {
            abort
          } = this.options;
          if (!abort || !up.network.isBusy()) return;
          let {
            fragments,
            layer,
            origin
          } = this.change.getPreflightProps();
          let abortOptions = {
            except: request,
            logOnce: ['up.render()', 'Change with { abort } option will abort other requests']
          };
          if (abort === 'target') {
            up.fragment.abort(fragments, abortOptions);
          } else if (abort === 'layer') {
            up.fragment.abort({
              ...abortOptions,
              layer
            });
          } else if (abort === 'all' || abort === true) {
            up.fragment.abort({
              ...abortOptions,
              layer: 'any'
            });
          } else if (u.isFunction(abort)) {
            abort(abortOptions);
          } else {
            up.fragment.abort(abort, {
              ...abortOptions,
              layer,
              origin
            });
          }
        }
      }, (() => {
        u.delegate(_a.prototype, ['then', 'catch', 'finally'], function () {
          return this.rendered;
        });
      })(), _a);

      /***/
    }, /* 26 */
    /***/() => {
      up.Change.Removal = class Removal extends up.Change {};

      /***/
    }, /* 27 */
    /***/() => {
      up.Change.DestroyFragment = class DestroyFragment extends up.Change.Removal {
        constructor(options) {
          super(options);
          this.layer = up.layer.get(options) || up.layer.current;
          this.element = this.options.element;
          this.animation = this.options.animation;
          this.log = this.options.log;
        }
        async execute() {
          this.parent = this.element.parentNode;
          up.fragment.markAsDestroying(this.element);
          if (up.motion.willAnimate(this.element, this.animation, this.options)) {
            this.emitDestroyed();
            await this.animate();
            this.wipe();
            this.onFinished();
          } else {
            this.wipe();
            this.emitDestroyed();
            this.onFinished();
          }
        }
        animate() {
          return up.motion.animate(this.element, this.animation, this.options);
        }
        wipe() {
          this.layer.asCurrent(() => {
            up.fragment.abort(this.element);
            up.syntax.clean(this.element, {
              layer: this.layer
            });
            up.element.cleanJQuery(this.element);
            this.element.remove();
          });
        }
        emitDestroyed() {
          up.fragment.emitDestroyed(this.element, {
            parent: this.parent,
            log: this.log
          });
        }
      };

      /***/
    }, /* 28 */
    /***/() => {
      let u = up.util;
      up.Change.OpenLayer = class OpenLayer extends up.Change.Addition {
        constructor(options) {
          super(options);
          this.target = options.target;
          this.origin = options.origin;
          this.baseLayer = options.baseLayer;
        }
        getPreflightProps() {
          return {
            mode: this.options.mode,
            context: this.buildLayer().context,
            origin: this.options.origin,
            target: this.target,
            layer: this.baseLayer,
            fragments: u.compact([up.fragment.get(':main', {
              layer: this.baseLayer
            })])
          };
        }
        execute(responseDoc, onApplicable) {
          if (this.target === ':none') {
            this.content = document.createElement('up-none');
          } else {
            this.content = responseDoc.select(this.target);
          }
          if (!this.content || this.baseLayer.isClosed()) {
            throw new up.CannotMatch();
          }
          onApplicable();
          up.puts('up.render()', `Opening element "${this.target}" in new overlay`);
          this.options.title = this.improveHistoryValue(this.options.title, responseDoc.getTitle());
          if (this.emitOpenEvent().defaultPrevented) {
            throw new up.Aborted('Open event was prevented');
          }
          this.layer = this.buildLayer();
          this.baseLayer.peel({
            history: !this.layer.history
          });
          up.layer.stack.push(this.layer);
          this.layer.createElements(this.content);
          this.layer.setupHandlers();
          this.handleHistory();
          this.setReloadAttrs({
            newElement: this.content,
            source: this.options.source
          });
          responseDoc.finalizeElement(this.content);
          up.hello(this.layer.element, {
            ...this.options,
            layer: this.layer
          });
          this.handleLayerChangeRequests();
          this.handleScroll();
          this.renderResult = new up.RenderResult({
            layer: this.layer,
            fragments: [this.content],
            target: this.target
          });
          this.renderResult.finished = this.finish();
          this.layer.opening = false;
          this.emitOpenedEvent();
          this.abortWhenLayerClosed();
          return this.renderResult;
        }
        async finish() {
          await this.layer.startOpenAnimation();
          this.abortWhenLayerClosed();
          this.handleFocus();
          return this.renderResult;
        }
        buildLayer() {
          const buildOptions = {
            ...this.options,
            opening: true
          };
          const beforeNew = optionsWithLayerDefaults => {
            return this.options = up.RenderOptions.finalize(optionsWithLayerDefaults);
          };
          return up.layer.build(buildOptions, beforeNew);
        }
        handleHistory() {
          if (this.layer.history === 'auto') {
            this.layer.history = up.fragment.hasAutoHistory(this.content);
          }
          this.layer.parent.saveHistory();
          this.layer.updateHistory(this.options);
        }
        handleFocus() {
          this.baseLayer.overlayFocus?.moveToBack();
          this.layer.overlayFocus.moveToFront();
          const fragmentFocus = new up.FragmentFocus({
            fragment: this.content,
            layer: this.layer,
            autoMeans: ['autofocus', 'layer']
          });
          fragmentFocus.process(this.options.focus);
        }
        handleScroll() {
          const scrollingOptions = {
            ...this.options,
            fragment: this.content,
            layer: this.layer,
            autoMeans: ['hash', 'layer']
          };
          const scrolling = new up.FragmentScrolling(scrollingOptions);
          scrolling.process(this.options.scroll);
        }
        emitOpenEvent() {
          return up.emit('up:layer:open', {
            origin: this.origin,
            baseLayer: this.baseLayer,
            layerOptions: this.options,
            log: "Opening new overlay"
          });
        }
        emitOpenedEvent() {
          return this.layer.emit('up:layer:opened', {
            origin: this.origin,
            callback: this.layer.callback('onOpened'),
            log: `Opened new ${this.layer}`
          });
        }
        getHungrySteps() {
          return up.radio.hungrySteps({
            layer: null,
            history: this.layer && this.layer.isHistoryVisible(),
            origin: this.options.origin
          });
        }
      };

      /***/
    }, /* 29 */
    /***/() => {
      var _a;
      const u = up.util;
      up.Change.UpdateLayer = (_a = class UpdateLayer extends up.Change.Addition {
        constructor(options) {
          options = up.RenderOptions.finalize(options);
          super(options);
          this.layer = options.layer;
          this.target = options.target;
          this.context = options.context;
          this.useKeep = options.useKeep;
          this.steps = up.fragment.parseTargetSteps(this.target, this.options);
        }
        getPreflightProps() {
          this.matchPreflight();
          return {
            layer: this.layer,
            mode: this.layer.mode,
            context: u.merge(this.layer.context, this.context),
            origin: this.options.origin,
            target: this.bestPreflightSelector(),
            fragments: this.getFragments()
          };
        }
        bestPreflightSelector() {
          this.matchPreflight();
          return up.fragment.targetForSteps(this.steps);
        }
        getFragments() {
          this.matchPreflight();
          return u.map(this.steps, 'oldElement');
        }
        execute(responseDoc, onApplicable) {
          this.responseDoc = responseDoc;
          this.matchPostflight();
          onApplicable();
          if (this.steps.length) {
            up.puts('up.render()', `Updating "${this.bestPreflightSelector()}" in ${this.layer}`);
          } else {
            up.puts('up.render()', 'Nothing was rendered');
          }
          this.options.title = this.improveHistoryValue(this.options.title, this.responseDoc.getTitle());
          this.setScrollAndFocusOptions();
          if (this.options.saveScroll) {
            up.viewport.saveScroll({
              layer: this.layer
            });
          }
          if (this.options.saveFocus) {
            up.viewport.saveFocus({
              layer: this.layer
            });
          }
          if (this.options.peel) {
            this.layer.peel({
              history: !this.hasHistory()
            });
          }
          if (this.options.abort !== false) {
            up.fragment.abort(this.getFragments(), {
              reason: 'Fragment is being replaced'
            });
          }
          Object.assign(this.layer.context, this.context);
          if (this.hasHistory()) {
            this.layer.updateHistory(this.options);
          }
          this.handleLayerChangeRequests();
          let renderResult = new up.Change.UpdateSteps({
            steps: this.steps,
            noneOptions: this.options
          }).execute(responseDoc);
          return renderResult;
        }
        matchPreflight() {
          this.steps = this.steps.filter(step => {
            const finder = new up.FragmentFinder(step);
            step.oldElement || (step.oldElement = finder.find());
            if (step.oldElement) {
              return true;
            } else if (!step.maybe) {
              throw new up.CannotMatch();
            }
          });
          this.steps = up.fragment.compressNestedSteps(this.steps);
        }
        matchPostflight() {
          this.matchPreflight();
          this.steps = this.responseDoc.selectSteps(this.steps);
        }
        getHungrySteps() {
          return up.radio.hungrySteps({
            layer: this.layer,
            history: this.hasHistory(),
            origin: this.options.origin
          });
        }
        setScrollAndFocusOptions() {
          let focusCapsule = up.FocusCapsule.preserve(this.layer);
          this.steps.forEach((step, i) => {
            step.focusCapsule = focusCapsule;
            if (i > 0) {
              step.scroll = false;
              step.focus = false;
            }
            if (step.placement === 'swap' || step.placement === 'content') {
              step.scrollBehavior = 'instant';
            }
          });
        }
        hasHistory() {
          return u.evalAutoOption(this.options.history, this.hasAutoHistory.bind(this));
        }
        hasAutoHistory() {
          const oldFragments = u.map(this.steps, 'oldElement');
          return u.some(oldFragments, up.fragment.hasAutoHistory);
        }
      }, (() => {
        u.memoizeMethod(_a.prototype, ['matchPreflight', 'matchPostflight', 'hasHistory']);
      })(), _a);

      /***/
    }, /* 30 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.Change.UpdateSteps = class UpdateSteps extends up.Change.Addition {
        constructor(options) {
          super(options);
          this.noneOptions = options.noneOptions || {};
          this.steps = u.copy(options.steps);
        }
        execute(responseDoc) {
          this.responseDoc = responseDoc;
          this.steps = responseDoc.selectSteps(this.steps);
          if (!this.steps.length) {
            return this.executeNone();
          }
          this.renderResult = new up.RenderResult({
            layer: this.steps[0]?.layer,
            target: up.fragment.targetForSteps(this.steps)
          });
          this.steps.reverse();
          const motionEndPromises = this.steps.map(step => this.executeStep(step));
          this.renderResult.finished = this.finish(motionEndPromises);
          return this.renderResult;
        }
        executeNone() {
          this.handleFocus(null, this.noneOptions);
          this.handleScroll(null, this.noneOptions);
          return up.RenderResult.buildNone();
        }
        async finish(motionEndPromises) {
          await Promise.all(motionEndPromises);
          for (let step of this.steps) {
            this.abortWhenLayerClosed(step.layer);
          }
          return this.renderResult;
        }
        addToResult(fragment) {
          let newFragments = fragment.matches('up-wrapper') ? fragment.children : [fragment];
          this.renderResult.fragments.unshift(...newFragments);
        }
        executeStep(step) {
          this.setReloadAttrs(step);
          switch (step.placement) {
            case 'swap':
              {
                let keepPlan = this.findKeepPlan(step);
                if (keepPlan) {
                  this.handleFocus(step.oldElement, step);
                  this.handleScroll(step.oldElement, step);
                  return Promise.resolve();
                } else {
                  this.preserveKeepables(step);
                  const parent = step.oldElement.parentNode;
                  const morphOptions = {
                    ...step,
                    beforeStart() {
                      up.fragment.markAsDestroying(step.oldElement);
                    },
                    afterInsert: () => {
                      this.responseDoc.finalizeElement(step.newElement);
                      this.restoreKeepables(step);
                      up.hello(step.newElement, step);
                      this.addToResult(step.newElement);
                    },
                    beforeDetach: () => {
                      up.syntax.clean(step.oldElement, {
                        layer: step.layer
                      });
                    },
                    afterDetach() {
                      up.element.cleanJQuery();
                      up.fragment.emitDestroyed(step.oldElement, {
                        parent,
                        log: false
                      });
                    },
                    scrollNew: () => {
                      this.handleFocus(step.newElement, step);
                      this.handleScroll(step.newElement, step);
                    }
                  };
                  return up.morph(step.oldElement, step.newElement, step.transition, morphOptions);
                }
              }
            case 'content':
              {
                let oldWrapper = e.wrapChildren(step.oldElement);
                let newWrapper = e.wrapChildren(step.newElement);
                let wrapperStep = {
                  ...step,
                  placement: 'swap',
                  oldElement: oldWrapper,
                  newElement: newWrapper,
                  focus: false
                };
                return this.executeStep(wrapperStep).then(() => {
                  e.unwrap(newWrapper);
                  this.handleFocus(step.oldElement, step);
                });
              }
            case 'before':
            case 'after':
              {
                let wrapper = e.wrapChildren(step.newElement);
                let position = step.placement === 'before' ? 'afterbegin' : 'beforeend';
                step.oldElement.insertAdjacentElement(position, wrapper);
                this.responseDoc.finalizeElement(wrapper);
                up.hello(wrapper, step);
                this.addToResult(wrapper);
                this.handleFocus(wrapper, step);
                this.handleScroll(wrapper, step);
                return up.animate(wrapper, step.transition, step).then(() => e.unwrap(wrapper));
              }
            default:
              {
                up.fail('Unknown placement: %o', step.placement);
              }
          }
        }
        findKeepPlan(options) {
          if (!options.useKeep) {
            return;
          }
          const {
            oldElement,
            newElement
          } = options;
          let doKeep = e.booleanAttr(oldElement, 'up-keep');
          if (!doKeep) {
            return;
          }
          let partner;
          let partnerSelector = up.fragment.toTarget(oldElement);
          const lookupOpts = {
            layer: options.layer
          };
          if (options.descendantsOnly) {
            partner = up.fragment.get(newElement, partnerSelector, lookupOpts);
          } else {
            partner = up.fragment.subtree(newElement, partnerSelector, lookupOpts)[0];
          }
          if (partner && e.booleanAttr(partner, 'up-keep')) {
            const plan = {
              oldElement,
              newElement: partner,
              newData: up.syntax.data(partner)
            };
            if (!up.fragment.emitKeep(plan).defaultPrevented) {
              return plan;
            }
          }
        }
        preserveKeepables(step) {
          const keepPlans = [];
          if (step.useKeep) {
            for (let keepable of step.oldElement.querySelectorAll('[up-keep]')) {
              let keepPlan = this.findKeepPlan({
                ...step,
                oldElement: keepable,
                descendantsOnly: true
              });
              if (keepPlan) {
                const keepableClone = keepable.cloneNode(true);
                keepable.insertAdjacentElement('beforebegin', keepableClone);
                let viewports = up.viewport.subtree(keepPlan.oldElement);
                keepPlan.revivers = viewports.map(function (viewport) {
                  let cursorProps = up.viewport.copyCursorProps(viewport);
                  return () => up.viewport.copyCursorProps(cursorProps, viewport);
                });
                if (this.willChangeElement(document.body)) {
                  keepPlan.newElement.replaceWith(keepable);
                } else {
                  document.body.append(keepable);
                }
                keepPlans.push(keepPlan);
              }
            }
          }
          step.keepPlans = keepPlans;
        }
        restoreKeepables(step) {
          for (let keepPlan of step.keepPlans) {
            keepPlan.newElement.replaceWith(keepPlan.oldElement);
            for (let reviver of keepPlan.revivers) {
              reviver();
            }
          }
        }
        willChangeElement(element) {
          return u.some(this.steps, step => step.oldElement.contains(element));
        }
        handleFocus(fragment, options) {
          const fragmentFocus = new up.FragmentFocus({
            ...options,
            fragment,
            autoMeans: up.fragment.config.autoFocus
          });
          return fragmentFocus.process(options.focus);
        }
        handleScroll(fragment, options) {
          const scrolling = new up.FragmentScrolling({
            ...options,
            fragment,
            autoMeans: up.fragment.config.autoScroll
          });
          return scrolling.process(options.scroll);
        }
      };

      /***/
    }, /* 31 */
    /***/() => {
      const u = up.util;
      up.Change.CloseLayer = class CloseLayer extends up.Change.Removal {
        constructor(options) {
          super(options);
          this.verb = options.verb;
          this.layer = up.layer.get(options);
          this.origin = options.origin;
          this.value = options.value;
          this.preventable = options.preventable ?? true;
          this.response = options.response;
          this.history = options.history ?? true;
        }
        execute() {
          if (!this.layer.isOpen()) {
            return Promise.resolve();
          }
          up.browser.assertConfirmed(this.options);
          if (this.emitCloseEvent().defaultPrevented && this.preventable) {
            throw new up.Aborted('Close event was prevented');
          }
          up.fragment.abort({
            reason: 'Layer is closing',
            layer: this.layer
          });
          const {
            parent
          } = this.layer;
          this.layer.peel();
          this.layer.stack.remove(this.layer);
          if (this.history) {
            parent.restoreHistory();
          }
          this.handleFocus(parent);
          this.layer.teardownHandlers();
          this.layer.destroyElements(this.options);
          this.emitClosedEvent(parent);
        }
        emitCloseEvent() {
          let event = this.layer.emit(this.buildEvent(`up:layer:${this.verb}`), {
            callback: this.layer.callback(`on${u.upperCaseFirst(this.verb)}`),
            log: [`Will ${this.verb} ${this.layer} with value %o`, this.value]
          });
          this.value = event.value;
          return event;
        }
        emitClosedEvent(formerParent) {
          const verbPast = `${this.verb}ed`;
          const verbPastUpperCaseFirst = u.upperCaseFirst(verbPast);
          return this.layer.emit(this.buildEvent(`up:layer:${verbPast}`), {
            baseLayer: formerParent,
            callback: this.layer.callback(`on${verbPastUpperCaseFirst}`),
            ensureBubbles: true,
            log: [`${verbPastUpperCaseFirst} ${this.layer} with value %o`, this.value]
          });
        }
        buildEvent(name) {
          return up.event.build(name, {
            layer: this.layer,
            value: this.value,
            origin: this.origin,
            response: this.response
          });
        }
        handleFocus(formerParent) {
          this.layer.overlayFocus.teardown();
          formerParent.overlayFocus?.moveToFront();
          let newFocusElement = this.layer.origin || formerParent.element;
          newFocusElement.focus({
            preventScroll: true
          });
        }
      };

      /***/
    }, /* 32 */
    /***/() => {
      var _a;
      const u = up.util;
      up.Change.FromURL = (_a = class FromURL extends up.Change {
        constructor(options) {
          super(options);
          this.options.layer = up.layer.getAll(this.options);
          this.options.normalizeLayerOptions = false;
        }
        execute() {
          let newPageReason = this.newPageReason();
          if (newPageReason) {
            up.puts('up.render()', newPageReason);
            up.network.loadPage(this.options);
            return u.unresolvablePromise();
          }
          this.request = up.request(this.getRequestAttrs());
          this.options.onRequest?.(this.request);
          up.feedback.showAroundRequest(this.request, this.options);
          up.form.disableWhile(this.request, this.options);
          if (this.options.preload) {
            return this.request;
          }
          return u.always(this.request, responseOrError => this.onRequestSettled(responseOrError));
        }
        newPageReason() {
          if (u.isCrossOrigin(this.options.url)) {
            return 'Loading cross-origin content in new page';
          }
          if (!up.browser.canPushState()) {
            return 'Loading content in new page to restore history support';
          }
        }
        getRequestAttrs() {
          const successAttrs = this.preflightPropsForRenderOptions(this.options);
          const failAttrs = this.preflightPropsForRenderOptions(this.deriveFailOptions(), {
            optional: true
          });
          return {
            ...this.options,
            ...successAttrs,
            ...u.renameKeys(failAttrs, up.fragment.failKey)
          };
        }
        getPreflightProps() {
          return this.getRequestAttrs();
        }
        preflightPropsForRenderOptions(renderOptions, requestAttributesOptions) {
          const preview = new up.Change.FromContent({
            ...renderOptions,
            preview: true
          });
          return preview.getPreflightProps(requestAttributesOptions);
        }
        onRequestSettled(response) {
          if (response instanceof up.Response) {
            return this.onRequestSettledWithResponse(response);
          } else {
            return this.onRequestSettledWithError(response);
          }
        }
        onRequestSettledWithResponse(response) {
          return new up.Change.FromResponse({
            ...this.options,
            response
          }).execute();
        }
        onRequestSettledWithError(error) {
          if (error instanceof up.Offline) {
            this.request.emit('up:fragment:offline', {
              callback: this.options.onOffline,
              renderOptions: this.options,
              retry: retryOptions => up.render({
                ...this.options,
                ...retryOptions
              }),
              log: ['Cannot load fragment from %s: %s', this.request.description, error.reason]
            });
          }
          throw error;
        }
      }, (() => {
        u.memoizeMethod(_a.prototype, ['getRequestAttrs']);
      })(), _a);

      /***/
    }, /* 33 */
    /***/() => {
      var _a;
      const u = up.util;
      up.Change.FromResponse = (_a = class FromResponse extends up.Change {
        constructor(options) {
          super(options);
          this.response = options.response;
          this.request = this.response.request;
        }
        execute() {
          if (up.fragment.config.skipResponse(this.loadedEventProps())) {
            this.skip();
          } else {
            this.request.assertEmitted('up:fragment:loaded', {
              ...this.loadedEventProps(),
              callback: this.options.onLoaded,
              log: ['Loaded fragment from %s', this.response.description],
              skip: () => this.skip()
            });
          }
          let fail = u.evalOption(this.options.fail, this.response) ?? !this.response.ok;
          if (fail) {
            throw this.updateContentFromResponse(this.deriveFailOptions());
          }
          return this.updateContentFromResponse(this.options);
        }
        skip() {
          up.puts('up.render()', 'Skipping ' + this.response.description);
          this.options.target = ':none';
          this.options.failTarget = ':none';
        }
        updateContentFromResponse(finalRenderOptions) {
          if (finalRenderOptions.failPrefixForced) {
            up.puts('up.render()', 'Rendering failed response using fail-prefixed options (https://unpoly.com/failed-responses)');
          }
          this.augmentOptionsFromResponse(finalRenderOptions);
          finalRenderOptions.meta = this.compilerPassMeta();
          let result = new up.Change.FromContent(finalRenderOptions).execute();
          result.finished = this.finish(result, finalRenderOptions);
          return result;
        }
        async finish(renderResult, originalRenderOptions) {
          renderResult = await renderResult.finished;
          if (up.fragment.shouldRevalidate(this.request, this.response, originalRenderOptions)) {
            renderResult = await this.revalidate(renderResult, originalRenderOptions);
          }
          return renderResult;
        }
        async revalidate(renderResult, originalRenderOptions) {
          let target = originalRenderOptions.target;
          if (/:(before|after)/.test(target)) {
            up.warn('up.render()', 'Cannot revalidate cache when prepending/appending (target %s)', target);
          } else {
            up.puts('up.render()', 'Revalidating cached response for target "%s"', target);
            let verifyResult = await up.reload(renderResult.target, {
              ...originalRenderOptions,
              layer: renderResult.layer,
              onFinished: null,
              scroll: false,
              focus: 'keep',
              transition: false,
              cache: false,
              confirm: false,
              feedback: false,
              abort: false,
              expiredResponse: this.response
            });
            if (!verifyResult.none) {
              renderResult = verifyResult;
            }
          }
          return renderResult;
        }
        loadedEventProps() {
          const {
            expiredResponse
          } = this.options;
          return {
            request: this.request,
            response: this.response,
            renderOptions: this.options,
            revalidating: !!expiredResponse,
            expiredResponse
          };
        }
        compilerPassMeta() {
          return u.pick(this.loadedEventProps(), ['revalidating', 'response']);
        }
        augmentOptionsFromResponse(renderOptions) {
          const responseURL = this.response.url;
          let serverLocation = responseURL;
          let hash = this.request.hash;
          if (hash) {
            renderOptions.hash = hash;
            serverLocation += hash;
          }
          const isReloadable = this.response.method === 'GET';
          if (isReloadable) {
            renderOptions.source = this.improveHistoryValue(renderOptions.source, responseURL);
          } else {
            renderOptions.source = this.improveHistoryValue(renderOptions.source, 'keep');
            renderOptions.history = !!renderOptions.location;
          }
          renderOptions.location = this.improveHistoryValue(renderOptions.location, serverLocation);
          renderOptions.title = this.improveHistoryValue(renderOptions.title, this.response.title);
          renderOptions.eventPlans = this.response.eventPlans;
          let serverTarget = this.response.target;
          if (serverTarget) {
            renderOptions.target = serverTarget;
          }
          renderOptions.acceptLayer = this.response.acceptLayer;
          renderOptions.dismissLayer = this.response.dismissLayer;
          renderOptions.document = this.response.text;
          if (this.response.none) {
            renderOptions.target = ':none';
          }
          renderOptions.context = u.merge(renderOptions.context, this.response.context);
          renderOptions.cspNonces = this.response.cspNonces;
          renderOptions.time ?? (renderOptions.time = this.response.lastModified);
          renderOptions.etag ?? (renderOptions.etag = this.response.etag);
        }
      }, (() => {
        u.memoizeMethod(_a.prototype, ['loadedEventProps']);
      })(), _a);

      /***/
    }, /* 34 */
    /***/() => {
      var _a;
      const u = up.util;
      up.Change.FromContent = (_a = class FromContent extends up.Change {
        constructor(options) {
          super(options);
          this.layers = u.filter(up.layer.getAll(this.options), this.isRenderableLayer);
          this.origin = this.options.origin;
          this.preview = this.options.preview;
          this.mode = this.options.mode;
          if (this.origin) {
            this.originLayer = up.layer.get(this.origin);
          }
        }
        isRenderableLayer(layer) {
          return layer === 'new' || layer.isOpen();
        }
        getPlans() {
          var _a;
          let plans = [];
          if (this.options.fragment) {
            (_a = this.options).target || (_a.target = this.getResponseDoc().rootSelector());
          }
          this.expandIntoPlans(plans, this.layers, this.options.target);
          this.expandIntoPlans(plans, this.layers, this.options.fallback);
          return plans;
        }
        expandIntoPlans(plans, layers, targets) {
          for (let layer of layers) {
            for (let target of this.expandTargets(targets, layer)) {
              const props = {
                ...this.options,
                target,
                layer,
                defaultPlacement: this.defaultPlacement()
              };
              const change = layer === 'new' ? new up.Change.OpenLayer(props) : new up.Change.UpdateLayer(props);
              plans.push(change);
            }
          }
        }
        expandTargets(targets, layer) {
          return up.fragment.expandTargets(targets, {
            layer,
            mode: this.mode,
            origin: this.origin
          });
        }
        execute() {
          if (this.options.preload) {
            return Promise.resolve();
          }
          return this.seekPlan(this.executePlan.bind(this)) || this.cannotMatchPostflightTarget();
        }
        executePlan(matchedPlan) {
          let result;
          try {
            result = matchedPlan.execute(this.getResponseDoc(), this.onPlanApplicable.bind(this, matchedPlan));
            result.options = this.options;
            this.executeHungry(matchedPlan, result);
            return result;
          } catch (error) {
            if (this.isApplicablePlanError(error)) {
              this.executeHungry(matchedPlan, result);
            }
            throw error;
          }
        }
        isApplicablePlanError(error) {
          return !(error instanceof up.CannotMatch);
        }
        executeHungry(plan, originalResult) {
          if (!this.options.useHungry) return;
          let hungrySteps = plan.getHungrySteps();
          let hungryResult = new up.Change.UpdateSteps({
            steps: hungrySteps
          }).execute(this.getResponseDoc());
          if (originalResult) {
            originalResult.fragments.push(...hungryResult.fragments);
          }
        }
        onPlanApplicable(plan) {
          let primaryPlan = this.getPlans()[0];
          if (plan !== primaryPlan) {
            up.puts('up.render()', 'Could not match primary target "%s". Updating a fallback target "%s".', primaryPlan.target, plan.target);
          }
        }
        getResponseDoc() {
          if (this.preview) return;
          const docOptions = u.pick(this.options, ['target', 'content', 'fragment', 'document', 'html', 'cspNonces', 'origin']);
          up.migrate.handleResponseDocOptions?.(docOptions);
          if (this.defaultPlacement() === 'content') {
            docOptions.target = this.firstExpandedTarget(docOptions.target);
          }
          return new up.ResponseDoc(docOptions);
        }
        defaultPlacement() {
          if (!this.options.document && !this.options.fragment) {
            return 'content';
          }
        }
        firstExpandedTarget(target) {
          return this.expandTargets(target || ':main', this.layers[0])[0];
        }
        getPreflightProps(opts = {}) {
          const getPlanProps = plan => plan.getPreflightProps();
          return this.seekPlan(getPlanProps) || opts.optional || this.cannotMatchPreflightTarget();
        }
        cannotMatchPreflightTarget() {
          this.cannotMatchTarget('Could not find target in current page');
        }
        cannotMatchPostflightTarget() {
          this.cannotMatchTarget('Could not find common target in current page and response');
        }
        cannotMatchTarget(reason) {
          let message;
          if (this.getPlans().length) {
            const planTargets = u.uniq(u.map(this.getPlans(), 'target'));
            const humanizedLayerOption = up.layer.optionToString(this.options.layer);
            message = [reason + " (tried selectors %o in %s)", planTargets, humanizedLayerOption];
          } else if (this.layers.length) {
            if (this.options.failPrefixForced) {
              message = 'No target selector given for failed responses (https://unpoly.com/failed-responses)';
            } else {
              message = 'No target selector given';
            }
          } else {
            message = 'Could not find a layer to render in. You may have passed a non-existing layer reference, or a detached element.';
          }
          throw new up.CannotMatch(message);
        }
        seekPlan(fn) {
          for (let plan of this.getPlans()) {
            try {
              return fn(plan);
            } catch (error) {
              if (this.isApplicablePlanError(error)) {
                throw error;
              }
            }
          }
        }
      }, (() => {
        u.memoizeMethod(_a.prototype, ['getPlans', 'getResponseDoc', 'getPreflightProps']);
      })(), _a);

      /***/
    }, /* 35 */
    /***/() => {
      const u = up.util;
      up.CompilerPass = class CompilerPass {
        constructor(root, compilers, {
          layer,
          data,
          dataMap,
          meta
        }) {
          layer || (layer = up.layer.get(root) || up.layer.current);
          this.root = root;
          this.compilers = compilers;
          this.layer = layer;
          this.data = data;
          this.dataMap = dataMap;
          this.meta = {
            layer,
            ...meta
          };
          this.errors = [];
        }
        run() {
          this.layer.asCurrent(() => {
            this.setCompileData();
            for (let compiler of this.compilers) {
              this.runCompiler(compiler);
            }
          });
          if (this.errors.length) {
            throw new up.CannotCompile('Errors while compiling', {
              errors: this.errors
            });
          }
        }
        setCompileData() {
          if (this.data) {
            this.root.upCompileData = this.data;
          }
          if (this.dataMap) {
            for (let selector in this.dataMap) {
              for (let match of this.select(selector)) {
                match.upCompileData = this.dataMap[selector];
              }
            }
          }
        }
        runCompiler(compiler) {
          const matches = this.selectOnce(compiler);
          if (!matches.length) {
            return;
          }
          if (!compiler.isDefault) {
            up.puts('up.hello()', 'Compiling %d× "%s" on %s', matches.length, compiler.selector, this.layer);
          }
          if (compiler.batch) {
            this.compileBatch(compiler, matches);
          } else {
            for (let match of matches) {
              this.compileOneElement(compiler, match);
            }
          }
          return up.migrate.postCompile?.(matches, compiler);
        }
        compileOneElement(compiler, element) {
          const compileArgs = [element];
          if (compiler.length !== 1) {
            const data = up.syntax.data(element);
            compileArgs.push(data, this.meta);
          }
          const result = this.applyCompilerFunction(compiler, element, compileArgs);
          let destructorOrDestructors = this.destructorPresence(result);
          if (destructorOrDestructors) {
            up.destructor(element, destructorOrDestructors);
          }
        }
        compileBatch(compiler, elements) {
          const compileArgs = [elements];
          if (compiler.length !== 1) {
            const dataList = u.map(elements, up.syntax.data);
            compileArgs.push(dataList, this.meta);
          }
          const result = this.applyCompilerFunction(compiler, elements, compileArgs);
          if (this.destructorPresence(result)) {
            up.fail('Compilers with { batch: true } cannot return destructors');
          }
        }
        applyCompilerFunction(compiler, elementOrElements, compileArgs) {
          try {
            return compiler.apply(elementOrElements, compileArgs);
          } catch (error) {
            this.errors.push(error);
            up.log.error('up.hello()', 'While compiling %o: %o', elementOrElements, error);
          }
        }
        destructorPresence(result) {
          if (u.isFunction(result) || u.isArray(result) && u.every(result, u.isFunction)) {
            return result;
          }
        }
        select(selector) {
          return up.fragment.subtree(this.root, u.evalOption(selector), {
            layer: this.layer
          });
        }
        selectOnce(compiler) {
          let matches = this.select(compiler.selector);
          return u.filter(matches, element => {
            let appliedCompilers = element.upAppliedCompilers || (element.upAppliedCompilers = new Set());
            if (!appliedCompilers.has(compiler)) {
              appliedCompilers.add(compiler);
              return true;
            }
          });
        }
      };

      /***/
    }, /* 36 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.CSSTransition = class CSSTransition {
        constructor(element, lastFrameKebab, options) {
          this.element = element;
          this.lastFrameKebab = lastFrameKebab;
          this.lastFrameKeysKebab = Object.keys(this.lastFrameKebab);
          if (u.some(this.lastFrameKeysKebab, key => key.match(/A-Z/))) {
            up.fail('Animation keys must be kebab-case');
          }
          this.finishEvent = options.finishEvent;
          this.duration = options.duration;
          this.easing = options.easing;
          this.finished = false;
        }
        start() {
          if (this.lastFrameKeysKebab.length === 0) {
            this.finished = true;
            return Promise.resolve();
          }
          this.deferred = u.newDeferred();
          this.pauseOldTransition();
          this.startTime = new Date();
          this.startFallbackTimer();
          this.listenToFinishEvent();
          this.listenToTransitionEnd();
          this.startMotion();
          return this.deferred;
        }
        listenToFinishEvent() {
          if (this.finishEvent) {
            this.stopListenToFinishEvent = up.on(this.element, this.finishEvent, this.onFinishEvent.bind(this));
          }
        }
        onFinishEvent(event) {
          event.stopPropagation();
          this.finish();
        }
        startFallbackTimer() {
          const timingTolerance = 100;
          this.fallbackTimer = u.timer(this.duration + timingTolerance, () => {
            this.finish();
          });
        }
        stopFallbackTimer() {
          clearTimeout(this.fallbackTimer);
        }
        listenToTransitionEnd() {
          this.stopListenToTransitionEnd = up.on(this.element, 'transitionend', this.onTransitionEnd.bind(this));
        }
        onTransitionEnd(event) {
          if (event.target !== this.element) {
            return;
          }
          const elapsed = new Date() - this.startTime;
          if (elapsed <= 0.25 * this.duration) {
            return;
          }
          const completedPropertyKebab = event.propertyName;
          if (!u.contains(this.lastFrameKeysKebab, completedPropertyKebab)) {
            return;
          }
          this.finish();
        }
        finish() {
          if (this.finished) {
            return;
          }
          this.finished = true;
          this.stopFallbackTimer();
          this.stopListenToFinishEvent?.();
          this.stopListenToTransitionEnd?.();
          e.concludeCSSTransition(this.element);
          this.resumeOldTransition();
          this.deferred.resolve();
        }
        pauseOldTransition() {
          const oldTransition = e.style(this.element, ['transitionProperty', 'transitionDuration', 'transitionDelay', 'transitionTimingFunction']);
          if (e.hasCSSTransition(oldTransition)) {
            if (oldTransition.transitionProperty !== 'all') {
              const oldTransitionProperties = oldTransition.transitionProperty.split(/\s*,\s*/);
              const oldTransitionFrameKebab = e.style(this.element, oldTransitionProperties);
              this.setOldTransitionTargetFrame = e.setTemporaryStyle(this.element, oldTransitionFrameKebab);
            }
            this.setOldTransition = e.concludeCSSTransition(this.element);
          }
        }
        resumeOldTransition() {
          this.setOldTransitionTargetFrame?.();
          this.setOldTransition?.();
        }
        startMotion() {
          e.setStyle(this.element, {
            transitionProperty: Object.keys(this.lastFrameKebab).join(', '),
            transitionDuration: `${this.duration}ms`,
            transitionTimingFunction: this.easing
          });
          e.setStyle(this.element, this.lastFrameKebab);
        }
      };

      /***/
    }, /* 37 */
    /***/() => {
      const u = up.util;
      up.DestructorPass = class DestructorPass {
        constructor(fragment, options) {
          this.fragment = fragment;
          this.options = options;
          this.errors = [];
        }
        run() {
          for (let cleanable of this.selectCleanables()) {
            let destructors = u.pluckKey(cleanable, 'upDestructors');
            if (destructors) {
              for (let destructor of destructors) {
                this.applyDestructorFunction(destructor, cleanable);
              }
            }
            cleanable.classList.remove('up-can-clean');
          }
          if (this.errors.length) {
            throw new up.Error('Errors while destroying', {
              errors: this.errors
            });
          }
        }
        selectCleanables() {
          const selectOptions = {
            ...this.options,
            destroying: true
          };
          return up.fragment.subtree(this.fragment, '.up-can-clean', selectOptions);
        }
        applyDestructorFunction(destructor, element) {
          try {
            destructor();
          } catch (error) {
            this.errors.push(error);
            up.log.error('up.destroy()', 'While destroying %o: %o', element, error);
          }
        }
      };

      /***/
    }, /* 38 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.EventEmitter = class EventEmitter extends up.Record {
        keys() {
          return ['target', 'event', 'baseLayer', 'callback', 'log', 'ensureBubbles'];
        }
        emit() {
          this.logEmission();
          if (this.baseLayer) {
            this.baseLayer.asCurrent(() => this.dispatchEvent());
          } else {
            this.dispatchEvent();
          }
          return this.event;
        }
        dispatchEvent() {
          this.target.dispatchEvent(this.event);
          if (this.ensureBubbles && !this.target.isConnected) {
            document.dispatchEvent(this.event);
          }
          this.callback?.(this.event);
        }
        assertEmitted() {
          const event = this.emit();
          if (event.defaultPrevented) {
            throw new up.Aborted(`Event ${event.type} was prevented`);
          }
        }
        logEmission() {
          if (!up.log.config.enabled) {
            return;
          }
          let message = this.log;
          let messageArgs;
          if (u.isArray(message)) {
            [message, ...messageArgs] = message;
          } else {
            messageArgs = [];
          }
          const {
            type
          } = this.event;
          if (u.isString(message)) {
            up.puts(type, message, ...messageArgs);
          } else if (message !== false) {
            up.puts(type, `Event ${type}`);
          }
        }
        static fromEmitArgs(args, defaults = {}) {
          let options = u.extractOptions(args);
          options = u.merge(defaults, options);
          if (u.isElementish(args[0])) {
            options.target = e.get(args.shift());
          } else if (args[0] instanceof up.Layer) {
            options.layer = args.shift();
          }
          let layer;
          if (u.isGiven(options.layer)) {
            layer = up.layer.get(options.layer);
            options.target || (options.target = layer.element);
            options.baseLayer || (options.baseLayer = layer);
          }
          if (options.baseLayer) {
            options.baseLayer = up.layer.get(options.baseLayer);
          }
          if (u.isString(options.target)) {
            options.target = up.fragment.get(options.target, {
              layer: options.layer
            });
          } else if (!options.target) {
            options.target = document;
          }
          if (args[0]?.preventDefault) {
            options.event = args[0];
            options.log ?? (options.log = args[0].log);
          } else if (u.isString(args[0])) {
            options.event = up.event.build(args[0], options);
          } else {
            options.event = up.event.build(options);
          }
          return new this(options);
        }
      };

      /***/
    }, /* 39 */
    /***/() => {
      const u = up.util;
      up.EventListener = class EventListener extends up.Record {
        keys() {
          return ['element', 'eventType', 'selector', 'callback', 'guard', 'baseLayer', 'passive', 'once', 'beforeBoot'];
        }
        constructor(attributes) {
          super(attributes);
          this.key = this.constructor.buildKey(attributes);
          this.isDefault = up.framework.evaling;
          this.beforeBoot ?? (this.beforeBoot = this.eventType.indexOf('up:framework:') === 0);
          this.nativeCallback = this.nativeCallback.bind(this);
        }
        bind() {
          var _a;
          const map = (_a = this.element).upEventListeners || (_a.upEventListeners = {});
          if (map[this.key]) {
            up.fail('up.on(): The %o callback %o cannot be registered more than once', this.eventType, this.callback);
          }
          map[this.key] = this;
          this.element.addEventListener(...this.addListenerArgs());
        }
        addListenerArgs() {
          let options = u.compactObject(u.pick(this, ['once', 'passive']));
          return [this.eventType, this.nativeCallback, options];
        }
        unbind() {
          let map = this.element.upEventListeners;
          if (map) {
            delete map[this.key];
          }
          this.element.removeEventListener(...this.addListenerArgs());
        }
        nativeCallback(event) {
          if (up.framework.beforeBoot && !this.beforeBoot) {
            return;
          }
          let element = event.target;
          if (this.selector) {
            element = element.closest(u.evalOption(this.selector));
          }
          if (this.guard && !this.guard(event)) {
            return;
          }
          if (element) {
            const args = [event, element];
            const expectedArgCount = this.callback.length;
            if (expectedArgCount !== 1 && expectedArgCount !== 2) {
              const data = up.syntax.data(element);
              args.push(data);
            }
            if (this.eventType === 'click' && element.disabled) {
              return;
            }
            const applyCallback = this.callback.bind(element, ...args);
            if (this.baseLayer) {
              this.baseLayer.asCurrent(applyCallback);
            } else {
              applyCallback();
            }
          }
        }
        static fromElement(attributes) {
          let map = attributes.element.upEventListeners;
          if (map) {
            const key = this.buildKey(attributes);
            return map[key];
          }
        }
        static buildKey(attributes) {
          var _a;
          (_a = attributes.callback).upUid || (_a.upUid = u.uid());
          return [attributes.eventType, attributes.selector, attributes.callback.upUid].join('|');
        }
        static allNonDefault(element) {
          let map = element.upEventListeners;
          if (map) {
            const listeners = Object.values(map);
            return u.reject(listeners, 'isDefault');
          } else {
            return [];
          }
        }
      };

      /***/
    }, /* 40 */
    /***/() => {
      const u = up.util;
      up.EventListenerGroup = class EventListenerGroup extends up.Record {
        keys() {
          return ['elements', 'eventTypes', 'selector', 'callback', 'guard', 'baseLayer', 'passive', 'once', 'beforeBoot'];
        }
        bind() {
          const unbindFns = [];
          this.eachListenerAttributes(function (attrs) {
            const listener = new up.EventListener(attrs);
            listener.bind();
            return unbindFns.push(listener.unbind.bind(listener));
          });
          return u.sequence(unbindFns);
        }
        eachListenerAttributes(fn) {
          for (let element of this.elements) {
            for (let eventType of this.eventTypes) {
              fn(this.listenerAttributes(element, eventType));
            }
          }
        }
        listenerAttributes(element, eventType) {
          return {
            ...this.attributes(),
            element,
            eventType
          };
        }
        unbind() {
          this.eachListenerAttributes(function (attrs) {
            let listener = up.EventListener.fromElement(attrs);
            if (listener) {
              listener.unbind();
            }
          });
        }
        static fromBindArgs(args, defaults) {
          args = u.copy(args);
          const callback = args.pop();
          let elements;
          if (args[0].addEventListener) {
            elements = [args.shift()];
          } else if (u.isJQuery(args[0]) || u.isList(args[0]) && args[0][0].addEventListener) {
            elements = args.shift();
          } else {
            elements = [document];
          }
          let eventTypes = u.parseTokens(args.shift());
          let fixTypes = up.migrate.fixEventTypes;
          if (fixTypes) {
            eventTypes = fixTypes(eventTypes);
          }
          const options = u.extractOptions(args);
          const selector = args[0];
          const attributes = {
            elements,
            eventTypes,
            selector,
            callback,
            ...options,
            ...defaults
          };
          return new this(attributes);
        }
      };

      /***/
    }, /* 41 */
    /***/() => {
      const u = up.util;
      up.FieldWatcher = class FieldWatcher {
        constructor(form, fields, options, callback) {
          this.callback = callback;
          this.form = form;
          this.fields = fields;
          this.options = options;
          this.batch = options.batch;
          this.unbindFns = [];
        }
        fieldOptions(field) {
          let options = u.copy(this.options);
          return up.form.watchOptions(field, options, {
            defaults: {
              event: 'input'
            }
          });
        }
        start() {
          this.scheduledValues = null;
          this.processedValues = this.readFieldValues();
          this.currentTimer = null;
          this.callbackRunning = false;
          for (let field of this.fields) {
            this.watchField(field);
          }
        }
        watchField(field) {
          let fieldOptions = this.fieldOptions(field);
          this.unbindFns.push(up.on(field, fieldOptions.event, event => this.check(event, fieldOptions)));
          this.unbindFns.push(up.fragment.onAborted(field, () => this.cancelTimer()));
        }
        stop() {
          for (let unbindFn of this.unbindFns) unbindFn();
          this.cancelTimer();
        }
        cancelTimer() {
          clearTimeout(this.currentTimer);
          this.currentTimer = null;
        }
        isAnyFieldAttached() {
          return u.some(this.fields, 'isConnected');
        }
        scheduleValues(values, event, fieldOptions) {
          this.cancelTimer();
          this.scheduledValues = values;
          let delay = u.evalOption(fieldOptions.delay, event);
          this.currentTimer = u.timer(delay, () => {
            this.currentTimer = null;
            if (this.isAnyFieldAttached()) {
              this.scheduledFieldOptions = fieldOptions;
              this.requestCallback();
            } else {
              this.scheduledValues = null;
            }
          });
        }
        isNewValues(values) {
          return !u.isEqual(values, this.processedValues) && !u.isEqual(this.scheduledValues, values);
        }
        async requestCallback() {
          let fieldOptions = this.scheduledFieldOptions;
          if (this.scheduledValues !== null && !this.currentTimer && !this.callbackRunning) {
            const diff = this.changedValues(this.processedValues, this.scheduledValues);
            this.processedValues = this.scheduledValues;
            this.scheduledValues = null;
            this.callbackRunning = true;
            this.scheduledFieldOptions = null;
            let callbackOptions = {
              ...fieldOptions,
              disable: false
            };
            const callbackReturnValues = [];
            if (this.batch) {
              callbackReturnValues.push(this.callback(diff, callbackOptions));
            } else {
              for (let name in diff) {
                const value = diff[name];
                callbackReturnValues.push(this.callback(value, name, callbackOptions));
              }
            }
            if (u.some(callbackReturnValues, u.isPromise)) {
              let callbackDone = Promise.allSettled(callbackReturnValues);
              up.form.disableWhile(callbackDone, fieldOptions);
              await callbackDone;
            }
            this.callbackRunning = false;
            this.requestCallback();
          }
        }
        changedValues(previous, next) {
          const changes = {};
          let keys = Object.keys(previous);
          keys = keys.concat(Object.keys(next));
          keys = u.uniq(keys);
          for (let key of keys) {
            const previousValue = previous[key];
            const nextValue = next[key];
            if (!u.isEqual(previousValue, nextValue)) {
              changes[key] = nextValue;
            }
          }
          return changes;
        }
        readFieldValues() {
          return up.Params.fromFields(this.fields).toObject();
        }
        check(event, fieldOptions) {
          const values = this.readFieldValues();
          if (this.isNewValues(values)) {
            this.scheduleValues(values, event, fieldOptions);
          }
        }
      };

      /***/
    }, /* 42 */
    /***/() => {
      const u = up.util;
      up.FormValidator = class FormValidator {
        constructor(form) {
          this.form = form;
          this.dirtySolutions = [];
          this.nextRenderTimer = null;
          this.rendering = false;
          this.resetNextRenderPromise();
          this.honorAbort();
        }
        honorAbort() {
          up.fragment.onAborted(this.form, {
            around: true
          }, ({
            target
          }) => this.unscheduleSolutionsWithin(target));
        }
        unscheduleSolutionsWithin(container) {
          this.dirtySolutions = u.reject(this.dirtySolutions, ({
            element
          }) => container.contains(element));
        }
        resetNextRenderPromise() {
          this.nextRenderPromise = u.newDeferred();
        }
        watchContainer(fieldOrForm) {
          let {
            event
          } = this.originOptions(fieldOrForm);
          let guard = () => up.fragment.isAlive(fieldOrForm);
          let callback = () => up.error.muteUncriticalRejection(this.validate({
            origin: fieldOrForm
          }));
          up.on(fieldOrForm, event, {
            guard
          }, callback);
        }
        validate(options = {}) {
          let solutions = this.getSolutions(options);
          this.dirtySolutions.push(...solutions);
          this.scheduleNextRender();
          return this.nextRenderPromise;
        }
        getSolutions(options) {
          let solutions = this.getTargetSelectorSolutions(options) || this.getFieldSolutions(options) || this.getElementSolutions(options.origin);
          for (let solution of solutions) {
            solution.renderOptions = this.originOptions(solution.origin, options);
            solution.target = up.fragment.resolveOrigin(solution.target, solution);
          }
          return solutions;
        }
        getFieldSolutions({
          origin,
          ...options
        }) {
          if (up.form.isField(origin)) {
            return this.getValidateAttrSolutions(origin) || this.getFormGroupSolutions(origin, options);
          }
        }
        getFormGroupSolutions(field, {
          formGroup = true
        }) {
          if (!formGroup) return;
          let solution = up.form.groupSolution(field);
          if (solution) {
            up.puts('up.validate()', 'Validating form group of field %o', field);
            return [solution];
          }
        }
        getTargetSelectorSolutions({
          target,
          origin
        }) {
          if (u.isString(target) && target) {
            up.puts('up.validate()', 'Validating target "%s"', target);
            let simpleSelectors = up.fragment.splitTarget(target);
            return u.compact(simpleSelectors.map(function (simpleSelector) {
              let element = up.fragment.get(simpleSelector, {
                origin
              });
              if (element) {
                return {
                  element,
                  target: simpleSelector,
                  origin
                };
              } else {
                up.fail('Validation target "%s" does not match an element', simpleSelector);
              }
            }));
          }
        }
        getElementSolutions(element) {
          up.puts('up.validate()', 'Validating element %o', element);
          return [{
            element,
            target: up.fragment.toTarget(element),
            origin: element
          }];
        }
        getValidateAttrSolutions(field) {
          let containerWithAttr = field.closest('[up-validate]');
          if (containerWithAttr) {
            let target = containerWithAttr.getAttribute('up-validate');
            return this.getTargetSelectorSolutions({
              target,
              origin: field
            });
          }
        }
        originOptions(element, overrideOptions) {
          return up.form.watchOptions(element, overrideOptions, {
            defaults: {
              event: 'change'
            }
          });
        }
        scheduleNextRender() {
          let solutionDelays = this.dirtySolutions.map(solution => solution.renderOptions.delay);
          let shortestDelay = Math.min(...solutionDelays) || 0;
          this.unscheduleNextRender();
          this.nextRenderTimer = u.timer(shortestDelay, () => this.renderDirtySolutions());
        }
        unscheduleNextRender() {
          clearTimeout(this.nextRenderTimer);
        }
        renderDirtySolutions() {
          up.error.muteUncriticalRejection(this.doRenderDirtySolutions());
        }
        async doRenderDirtySolutions() {
          this.dirtySolutions = u.filter(this.dirtySolutions, ({
            element,
            origin
          }) => up.fragment.isAlive(element) && up.fragment.isAlive(origin));
          if (!this.dirtySolutions.length || this.rendering) {
            return;
          }
          let dirtySolutions = this.dirtySolutions;
          this.dirtySolutions = [];
          let dirtyOrigins = u.map(dirtySolutions, 'origin');
          let dirtyFields = u.flatMap(dirtyOrigins, up.form.fields);
          let dirtyNames = u.uniq(u.map(dirtyFields, 'name'));
          let dataMap = this.buildDataMap(dirtySolutions);
          let dirtyRenderOptionsList = u.map(dirtySolutions, 'renderOptions');
          let options = u.mergeDefined(...dirtyRenderOptionsList, {
            dataMap
          }, up.form.destinationOptions(this.form));
          options.target = u.map(dirtySolutions, 'target').join(', ');
          options.feedback = u.some(dirtyRenderOptionsList, 'feedback');
          options.origin = this.form;
          options.focus ?? (options.focus = 'keep');
          options.failOptions = false;
          options.params = up.Params.merge(options.params, ...u.map(dirtyRenderOptionsList, 'params'));
          options.headers = u.merge(...u.map(dirtyRenderOptionsList, 'headers'));
          options.headers[up.protocol.headerize('validate')] = dirtyNames.join(' ') || ':unknown';
          options.guardEvent = up.event.build('up:form:validate', {
            fields: dirtyFields,
            log: 'Validating form',
            params: options.params
          });
          this.rendering = true;
          let renderingPromise = this.nextRenderPromise;
          this.resetNextRenderPromise();
          options.disable = false;
          for (let solution of dirtySolutions) {
            up.form.disableWhile(renderingPromise, {
              disable: solution.renderOptions.disable,
              origin: solution.origin
            });
          }
          try {
            renderingPromise.resolve(up.render(options));
            await renderingPromise;
          } finally {
            this.rendering = false;
            this.renderDirtySolutions();
          }
        }
        buildDataMap(solutions) {
          let dataMap = {};
          for (let solution of solutions) {
            let data = u.pluckKey(solution.renderOptions, 'data');
            let keepData = u.pluckKey(solution.renderOptions, 'keepData');
            if (keepData) {
              data = up.data(solution.element);
            }
            if (data) {
              dataMap[solution.target] = data;
            }
          }
          return dataMap;
        }
        static forElement(element) {
          let form = up.form.get(element);
          return form.upFormValidator || (form.upFormValidator = new this(form));
        }
      };

      /***/
    }, /* 43 */
    /***/() => {
      up.FocusCapsule = class FocusCapsule {
        constructor(target, cursorProps) {
          this.target = target;
          this.cursorProps = cursorProps;
        }
        restore(layer, options) {
          let rediscoveredElement = up.fragment.get(this.target, {
            layer
          });
          if (rediscoveredElement) {
            up.viewport.copyCursorProps(this.cursorProps, rediscoveredElement);
            up.focus(rediscoveredElement, options);
            return true;
          }
        }
        static preserve(layer) {
          let focusedElement = up.viewport.focusedElementWithin(layer.element);
          if (!focusedElement) return;
          let target = up.fragment.tryToTarget(focusedElement);
          if (!target) return;
          const cursorProps = up.viewport.copyCursorProps(focusedElement);
          return new this(target, cursorProps);
        }
      };

      /***/
    }, /* 44 */
    /***/() => {
      const u = up.util;
      up.FragmentProcessor = class FragmentProcessor extends up.Record {
        keys() {
          return ['fragment', 'autoMeans', 'origin', 'layer'];
        }
        process(opt) {
          let preprocessed = this.preprocess(opt);
          return this.tryProcess(preprocessed);
        }
        preprocess(opt) {
          return u.parseTokens(opt, {
            separator: 'or'
          });
        }
        tryProcess(opt) {
          if (u.isArray(opt)) {
            return this.processArray(opt);
          }
          if (u.isFunction(opt)) {
            return this.tryProcess(opt(this.fragment, this.attributes()));
          }
          if (u.isElement(opt)) {
            return this.processElement(opt);
          }
          if (u.isString(opt)) {
            if (opt === 'auto') {
              return this.tryProcess(this.autoMeans);
            }
            let match = opt.match(/^(.+?)-if-(.+?)$/);
            if (match) {
              return this.resolveCondition(match[2]) && this.process(match[1]);
            }
          }
          return this.processPrimitive(opt);
        }
        processArray(array) {
          return u.find(array, opt => this.tryProcess(opt));
        }
        resolveCondition(condition) {
          if (condition === 'main') {
            return this.fragment && up.fragment.contains(this.fragment, ':main');
          }
        }
        findSelector(selector) {
          const lookupOpts = {
            layer: this.layer,
            origin: this.origin
          };
          let matchWithinFragment = this.fragment && up.fragment.get(this.fragment, selector, lookupOpts);
          let match = matchWithinFragment || up.fragment.get(selector, lookupOpts);
          if (match) {
            return match;
          } else {
            up.warn('up.render()', 'Could not find an element matching "%s"', selector);
          }
        }
      };

      /***/
    }, /* 45 */
    /***/() => {
      const DESCENDANT_SELECTOR = /^([^ >+(]+) (.+)$/;
      up.FragmentFinder = class FragmentFinder {
        constructor(options) {
          this.options = options;
          this.origin = options.origin;
          this.selector = options.selector;
          this.externalRoot = options.externalRoot;
        }
        find() {
          return this.findAroundOrigin() || this.findInLayer();
        }
        findAroundOrigin() {
          if (this.origin && up.fragment.config.matchAroundOrigin && this.origin.isConnected) {
            return this.findClosest() || this.findInVicinity();
          }
        }
        findClosest() {
          return up.fragment.closest(this.origin, this.selector, this.options);
        }
        findInVicinity() {
          let parts = this.selector.match(DESCENDANT_SELECTOR);
          if (parts) {
            let parent = up.fragment.closest(this.origin, parts[1], this.options);
            if (parent) {
              return up.fragment.getDumb(parent, parts[2]);
            }
          }
        }
        findInLayer() {
          if (this.externalRoot) {
            return up.fragment.subtree(this.externalRoot, this.selector, this.options)[0];
          } else {
            return up.fragment.getDumb(this.selector, this.options);
          }
        }
      };

      /***/
    }, /* 46 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      const PREVENT_SCROLL_OPTIONS = {
        preventScroll: true
      };
      up.FragmentFocus = class FragmentFocus extends up.FragmentProcessor {
        keys() {
          return super.keys().concat(['hash', 'focusCapsule']);
        }
        processPrimitive(opt) {
          switch (opt) {
            case 'keep':
              return this.restoreLostFocus();
            case 'restore':
              return this.restorePreviousFocusForLocation();
            case 'target':
            case true:
              return this.focusElement(this.fragment);
            case 'layer':
              return this.focusElement(this.layer.getFocusElement());
            case 'main':
              return this.focusSelector(':main');
            case 'hash':
              return this.focusHash();
            case 'autofocus':
              return this.autofocus();
            default:
              if (u.isString(opt)) {
                return this.focusSelector(opt);
              }
          }
        }
        processElement(element) {
          return this.focusElement(element);
        }
        resolveCondition(condition) {
          if (condition === 'lost') {
            return this.wasFocusLost();
          } else {
            return super.resolveCondition(condition);
          }
        }
        focusSelector(selector) {
          let match = this.findSelector(selector);
          return this.focusElement(match);
        }
        restoreLostFocus() {
          if (this.wasFocusLost()) {
            return this.focusCapsule?.restore(this.layer, PREVENT_SCROLL_OPTIONS);
          }
        }
        restorePreviousFocusForLocation() {
          return up.viewport.restoreFocus({
            layer: this.layer
          });
        }
        autofocus() {
          let autofocusElement = this.fragment && e.subtree(this.fragment, '[autofocus]')[0];
          if (autofocusElement) {
            return this.focusElement(autofocusElement);
          }
        }
        focusElement(element) {
          if (element) {
            up.focus(element, {
              force: true,
              ...PREVENT_SCROLL_OPTIONS
            });
            return true;
          }
        }
        focusHash() {
          let hashTarget = up.viewport.firstHashTarget(this.hash, {
            layer: this.layer
          });
          if (hashTarget) {
            return this.focusElement(hashTarget);
          }
        }
        wasFocusLost() {
          return !this.layer.hasFocus();
        }
      };

      /***/
    }, /* 47 */
    /***/() => {
      const e = up.element;
      up.FragmentPolling = class FragmentPolling {
        constructor(fragment) {
          this.options = {};
          this.state = 'initialized';
          this.setFragment(fragment);
          this.abortable = true;
        }
        static forFragment(fragment) {
          return fragment.upPolling || (fragment.upPolling = new this(fragment));
        }
        onPollAttributeObserved() {
          this.start();
        }
        onFragmentDestroyed() {
          this.stop();
        }
        onFragmentAborted() {
          if (this.abortable) {
            this.stop();
          }
        }
        start() {
          if (this.state !== 'started') {
            this.state = 'started';
            this.scheduleReload();
          }
        }
        stop() {
          if (this.state === 'started') {
            clearTimeout(this.reloadTimer);
            this.state = 'stopped';
          }
        }
        forceStart(options) {
          Object.assign(this.options, options);
          this.forceStarted = true;
          this.start();
        }
        forceStop() {
          this.stop();
          this.forceStarted = false;
        }
        scheduleReload(delay = this.getInterval()) {
          this.reloadTimer = setTimeout(() => this.reload(), delay);
        }
        reload() {
          if (this.state !== 'started') {
            return;
          }
          let issue = up.radio.pollIssue(this.fragment);
          if (issue) {
            up.puts('[up-poll]', `Will not poll: ${issue}`);
            let reconsiderDisabledDelay = Math.min(10 * 1000, this.getInterval());
            this.scheduleReload(reconsiderDisabledDelay);
          } else {
            this.reloadNow();
          }
        }
        reloadNow() {
          let reloadOptions = {
            url: this.options.url,
            fail: false,
            background: true
          };
          let oldAbortable = this.abortable;
          this.abortable = false;
          up.reload(this.fragment, reloadOptions).then(this.onReloadSuccess.bind(this), this.onReloadFailure.bind(this));
          this.abortable = oldAbortable;
        }
        onReloadSuccess({
          fragment
        }) {
          if (fragment) {
            this.onFragmentSwapped(fragment);
          } else {
            this.scheduleReload();
          }
        }
        onReloadFailure(reason) {
          this.scheduleReload();
          up.error.rethrowCritical(reason);
        }
        onFragmentSwapped(newFragment) {
          this.stop();
          if (this.forceStarted && up.fragment.matches(this.fragment, newFragment)) {
            this.constructor.forFragment(newFragment).forceStart(this.options);
          }
        }
        setFragment(newFragment) {
          this.fragment = newFragment;
          up.destructor(newFragment, () => this.onFragmentDestroyed());
          up.fragment.onAborted(newFragment, () => this.onFragmentAborted());
        }
        getInterval() {
          let interval = this.options.interval ?? e.numberAttr(this.fragment, 'up-interval') ?? up.radio.config.pollInterval;
          return up.radio.config.stretchPollInterval(interval);
        }
      };

      /***/
    }, /* 48 */
    /***/() => {
      const u = up.util;
      up.FragmentScrolling = class FragmentScrolling extends up.FragmentProcessor {
        keys() {
          return super.keys().concat(['hash', 'mode', 'revealTop', 'revealMax', 'revealSnap', 'scrollBehavior']);
        }
        processPrimitive(opt) {
          switch (opt) {
            case 'reset':
              return this.reset();
            case 'layer':
              return this.revealLayer();
            case 'main':
              return this.revealSelector(':main');
            case 'restore':
              return this.restore();
            case 'hash':
              return this.hash && up.viewport.revealHash(this.hash, this.attributes());
            case 'target':
            case 'reveal':
            case true:
              return this.revealElement(this.fragment);
            default:
              if (u.isString(opt)) {
                return this.revealSelector(opt);
              }
          }
        }
        processElement(element) {
          return this.revealElement(element);
        }
        revealElement(element) {
          if (element) {
            up.reveal(element, this.attributes());
            return true;
          }
        }
        revealSelector(selector) {
          let match = this.findSelector(selector);
          return this.revealElement(match);
        }
        revealLayer() {
          return this.revealElement(this.layer.getBoxElement());
        }
        reset() {
          up.viewport.resetScroll({
            ...this.attributes(),
            around: this.fragment
          });
          return true;
        }
        restore() {
          return up.viewport.restoreScroll({
            ...this.attributes(),
            around: this.fragment
          });
        }
      };

      /***/
    }, /* 49 */
    /***/() => {
      const e = up.element;
      const u = up.util;
      up.Layer = class Layer extends up.Record {
        keys() {
          return ['element', 'stack', 'history', 'mode', 'context', 'lastScrollTops', 'lastFocusCapsules'];
        }
        defaults() {
          return {
            context: {},
            lastScrollTops: up.viewport.newStateCache(),
            lastFocusCapsules: up.viewport.newStateCache()
          };
        }
        constructor(options = {}) {
          super(options);
          if (!this.mode) {
            throw "missing { mode } option";
          }
        }
        setupHandlers() {
          up.link.convertClicks(this);
        }
        teardownHandlers() {}
        mainTargets() {
          return up.layer.mainTargets(this.mode);
        }
        sync() {}
        accept() {
          throw new up.NotImplemented();
        }
        dismiss() {
          throw new up.NotImplemented();
        }
        peel(options) {
          this.stack.peel(this, options);
        }
        evalOption(option) {
          return u.evalOption(option, this);
        }
        isCurrent() {
          return this.stack.isCurrent(this);
        }
        isFront() {
          return this.stack.isFront(this);
        }
        isRoot() {
          return this.stack.isRoot(this);
        }
        isOverlay() {
          return this.stack.isOverlay(this);
        }
        isOpen() {
          return this.stack.isOpen(this);
        }
        isClosed() {
          return this.stack.isClosed(this);
        }
        get parent() {
          return this.stack.parentOf(this);
        }
        get child() {
          return this.stack.childOf(this);
        }
        get ancestors() {
          return this.stack.ancestorsOf(this);
        }
        get descendants() {
          return this.stack.descendantsOf(this);
        }
        get index() {
          return this.stack.indexOf(this);
        }
        getContentElement() {
          return this.contentElement || this.element;
        }
        getBoxElement() {
          return this.boxElement || this.element;
        }
        getFocusElement() {
          return this.getBoxElement();
        }
        getFirstSwappableElement() {
          throw new up.NotImplemented();
        }
        contains(element) {
          return element.closest(up.layer.anySelector()) === this.element;
        }
        on(...args) {
          return this.buildEventListenerGroup(args).bind();
        }
        off(...args) {
          return this.buildEventListenerGroup(args).unbind();
        }
        buildEventListenerGroup(args) {
          return up.EventListenerGroup.fromBindArgs(args, {
            guard: event => this.containsEventTarget(event),
            elements: [this.element],
            baseLayer: this
          });
        }
        containsEventTarget(event) {
          return this.contains(event.target);
        }
        wasHitByMouseEvent(event) {
          const hittableElement = document.elementFromPoint(event.clientX, event.clientY);
          return !hittableElement || this.contains(hittableElement);
        }
        buildEventEmitter(args) {
          return up.EventEmitter.fromEmitArgs(args, {
            layer: this
          });
        }
        emit(...args) {
          return this.buildEventEmitter(args).emit();
        }
        isDetached() {
          return !this.element.isConnected;
        }
        saveHistory() {
          if (this.isHistoryVisible()) {
            this.savedTitle = document.title;
            this.savedLocation = up.history.location;
          }
        }
        restoreHistory() {
          if (!this.showsLiveHistory()) {
            return;
          }
          if (this.savedLocation) {
            up.history.push(this.savedLocation);
          }
          if (this.savedTitle) {
            document.title = this.savedTitle;
          }
        }
        asCurrent(fn) {
          return this.stack.asCurrent(this, fn);
        }
        updateHistory(options) {
          if (u.isString(options.location)) {
            this.location = options.location;
          }
          if (u.isString(options.title)) {
            this.title = options.title;
          }
        }
        isHistoryVisible() {
          return this.history && (this.isRoot() || this.parent.isHistoryVisible());
        }
        showsLiveHistory() {
          return this.isHistoryVisible() && this.isFront() && (up.history.config.enabled || this.isRoot());
        }
        get title() {
          if (this.showsLiveHistory()) {
            return document.title;
          } else {
            return this.savedTitle;
          }
        }
        set title(title) {
          this.savedTitle = title;
          if (this.showsLiveHistory()) {
            document.title = title;
          }
        }
        get location() {
          if (this.showsLiveHistory()) {
            return up.history.location;
          } else {
            return this.savedLocation;
          }
        }
        set location(location) {
          const previousLocation = this.location;
          location = up.history.normalizeURL(location);
          if (previousLocation !== location || this.opening) {
            this.savedLocation = location;
            if (this.showsLiveHistory()) {
              up.history.push(location);
            }
            if (!this.opening) {
              this.emit('up:layer:location:changed', {
                location
              });
            }
          }
        }
        selector(part) {
          return this.constructor.selector(part);
        }
        static selector(_part) {
          throw new up.NotImplemented();
        }
        toString() {
          throw new up.NotImplemented();
        }
        affix(...args) {
          return e.affix(this.getFirstSwappableElement(), ...args);
        }
        [u.isEqual.key](other) {
          return this.constructor === other.constructor && this.element === other.element;
        }
        hasFocus() {
          let focusedElement = document.activeElement;
          return focusedElement !== document.body && this.element.contains(focusedElement);
        }
        reset() {
          Object.assign(this, this.defaults());
        }
      };

      /***/
    }, /* 50 */
    /***/() => {
      const e = up.element;
      const u = up.util;
      up.Layer.Overlay = class Overlay extends up.Layer {
        keys() {
          return super.keys().concat(['position', 'align', 'size', 'origin', 'class', 'backdrop', 'openAnimation', 'closeAnimation', 'openDuration', 'closeDuration', 'openEasing', 'closeEasing', 'backdropOpenAnimation', 'backdropCloseAnimation', 'dismissable', 'dismissLabel', 'dismissAriaLabel', 'onOpened', 'onAccept', 'onAccepted', 'onDismiss', 'onDismissed', 'acceptEvent', 'dismissEvent', 'acceptLocation', 'dismissLocation', 'opening']);
        }
        constructor(options) {
          super(options);
          if (this.dismissable === true) {
            this.dismissable = ['button', 'key', 'outside'];
          } else if (this.dismissable === false) {
            this.dismissable = [];
          } else {
            this.dismissable = u.parseTokens(this.dismissable);
          }
          if (this.acceptLocation) {
            this.acceptLocation = new up.URLPattern(this.acceptLocation);
          }
          if (this.dismissLocation) {
            this.dismissLocation = new up.URLPattern(this.dismissLocation);
          }
        }
        callback(name) {
          let fn = this[name];
          if (fn) {
            return fn.bind(this);
          }
        }
        createElement(parentElement) {
          this.nesting || (this.nesting = this.suggestVisualNesting());
          const elementAttrs = u.compactObject(u.pick(this, ['align', 'position', 'size', 'class', 'nesting']));
          this.element = this.affixPart(parentElement, null, elementAttrs);
        }
        createBackdropElement(parentElement) {
          this.backdropElement = this.affixPart(parentElement, 'backdrop');
        }
        createViewportElement(parentElement) {
          this.viewportElement = this.affixPart(parentElement, 'viewport', {
            'up-viewport': ''
          });
        }
        createBoxElement(parentElement) {
          this.boxElement = this.affixPart(parentElement, 'box');
        }
        createContentElement(parentElement, content) {
          this.contentElement = this.affixPart(parentElement, 'content');
          this.contentElement.appendChild(content);
        }
        createDismissElement(parentElement) {
          this.dismissElement = this.affixPart(parentElement, 'dismiss', {
            'up-dismiss': '":button"',
            'aria-label': this.dismissAriaLabel
          });
          return e.affix(this.dismissElement, 'span[aria-hidden="true"]', {
            text: this.dismissLabel
          });
        }
        affixPart(parentElement, part, options = {}) {
          return e.affix(parentElement, this.selector(part), options);
        }
        static selector(part) {
          return u.compact(['up', this.mode, part]).join('-');
        }
        suggestVisualNesting() {
          const {
            parent
          } = this;
          if (this.mode === parent.mode) {
            return 1 + parent.suggestVisualNesting();
          } else {
            return 0;
          }
        }
        setupHandlers() {
          super.setupHandlers();
          this.overlayFocus = new up.OverlayFocus(this);
          if (this.supportsDismissMethod('button')) {
            this.createDismissElement(this.getBoxElement());
          }
          if (this.supportsDismissMethod('outside')) {
            if (this.viewportElement) {
              up.on(this.viewportElement, 'up:click', event => {
                if (event.target === this.viewportElement) {
                  this.onOutsideClicked(event, true);
                }
              });
            } else {
              this.unbindParentClicked = this.parent.on('up:click', (event, element) => {
                if (!up.layer.isWithinForeignOverlay(element)) {
                  const originClicked = this.origin && this.origin.contains(element);
                  this.onOutsideClicked(event, originClicked);
                }
              });
            }
          }
          if (this.supportsDismissMethod('key')) {
            this.unbindEscapePressed = up.event.onEscape(event => this.onEscapePressed(event));
          }
          this.registerClickCloser('up-accept', (value, closeOptions) => {
            this.accept(value, closeOptions);
          });
          this.registerClickCloser('up-dismiss', (value, closeOptions) => {
            this.dismiss(value, closeOptions);
          });
          up.migrate.registerLayerCloser?.(this);
          this.registerEventCloser(this.acceptEvent, this.accept);
          this.registerEventCloser(this.dismissEvent, this.dismiss);
          this.on('up:click', 'label[for]', (event, label) => this.onLabelClicked(event, label));
        }
        onLabelClicked(event, label) {
          let id = label.getAttribute('for');
          let fieldSelector = up.form.fieldSelector(e.idSelector(id));
          let fieldsAnywhere = up.fragment.all(fieldSelector, {
            layer: 'any'
          });
          let fieldsInLayer = up.fragment.all(fieldSelector, {
            layer: this
          });
          if (fieldsAnywhere.length > 1 && fieldsInLayer[0] !== fieldsAnywhere[0]) {
            event.preventDefault();
            const field = fieldsInLayer[0];
            field.focus();
            if (field.matches('input[type=checkbox], input[type=radio]')) {
              field.click();
            }
          }
        }
        onOutsideClicked(event, halt) {
          up.log.putsEvent(event);
          if (halt) up.event.halt(event);
          this.dismiss(':outside', {
            origin: event.target
          });
        }
        onEscapePressed(event) {
          if (this.isFront()) {
            let field = up.form.focusedField();
            if (field) {
              field.blur();
            } else if (this.supportsDismissMethod('key')) {
              up.event.halt(event, {
                log: true
              });
              this.dismiss(':key');
            }
          }
        }
        registerClickCloser(attribute, closeFn) {
          let selector = `[${attribute}]`;
          this.on('up:click', selector, function (event) {
            up.event.halt(event, {
              log: true
            });
            const origin = event.target.closest(selector);
            const value = e.jsonAttr(origin, attribute);
            const closeOptions = {
              origin
            };
            const parser = new up.OptionsParser(origin, closeOptions);
            parser.booleanOrString('animation');
            parser.string('easing');
            parser.number('duration');
            parser.string('confirm');
            up.error.muteUncriticalSync(() => closeFn(value, closeOptions));
          });
        }
        registerEventCloser(eventTypes, closeFn) {
          if (!eventTypes) {
            return;
          }
          return this.on(eventTypes, event => {
            event.preventDefault();
            closeFn.call(this, event, {
              response: event.response
            });
          });
        }
        tryAcceptForLocation(options) {
          this.tryCloseForLocation(this.acceptLocation, this.accept, options);
        }
        tryDismissForLocation(options) {
          this.tryCloseForLocation(this.dismissLocation, this.dismiss, options);
        }
        tryCloseForLocation(urlPattern, closeFn, options) {
          let location, resolution;
          if (urlPattern && (location = this.location) && (resolution = urlPattern.recognize(location))) {
            const closeValue = {
              ...resolution,
              location
            };
            closeFn.call(this, closeValue, options);
          }
        }
        teardownHandlers() {
          super.teardownHandlers();
          this.unbindParentClicked?.();
          this.unbindEscapePressed?.();
          this.overlayFocus.teardown();
        }
        destroyElements(options) {
          const animation = () => {
            return this.startCloseAnimation(options);
          };
          const onFinished = () => {
            this.onElementsRemoved();
            options.onFinished?.();
          };
          const destroyOptions = {
            ...options,
            animation,
            onFinished,
            log: false
          };
          up.destroy(this.element, destroyOptions);
        }
        onElementsRemoved() {}
        startAnimation(options = {}) {
          const boxDone = up.animate(this.getBoxElement(), options.boxAnimation, options);
          let backdropDone;
          if (this.backdrop && !up.motion.isNone(options.boxAnimation)) {
            backdropDone = up.animate(this.backdropElement, options.backdropAnimation, options);
          }
          return Promise.all([boxDone, backdropDone]);
        }
        startOpenAnimation(options = {}) {
          return this.startAnimation({
            boxAnimation: options.animation ?? this.evalOption(this.openAnimation),
            backdropAnimation: 'fade-in',
            easing: options.easing || this.openEasing,
            duration: options.duration || this.openDuration
          }).then(() => {
            return this.wasEverVisible = true;
          });
        }
        startCloseAnimation(options = {}) {
          const boxAnimation = this.wasEverVisible && (options.animation ?? this.evalOption(this.closeAnimation));
          return this.startAnimation({
            boxAnimation,
            backdropAnimation: 'fade-out',
            easing: options.easing || this.closeEasing,
            duration: options.duration || this.closeDuration
          });
        }
        accept(value = null, options = {}) {
          return this.executeCloseChange('accept', value, options);
        }
        dismiss(value = null, options = {}) {
          return this.executeCloseChange('dismiss', value, options);
        }
        supportsDismissMethod(method) {
          return u.contains(this.dismissable, method);
        }
        executeCloseChange(verb, value, options) {
          options = {
            ...options,
            verb,
            value,
            layer: this
          };
          return new up.Change.CloseLayer(options).execute();
        }
        getFirstSwappableElement() {
          return this.getContentElement().children[0];
        }
        toString() {
          return `${this.mode} overlay`;
        }
      };

      /***/
    }, /* 51 */
    /***/() => {
      up.Layer.OverlayWithTether = class OverlayWithTether extends up.Layer.Overlay {
        createElements(content) {
          if (!this.origin) {
            up.fail('Missing { origin } option');
          }
          this.tether = new up.Tether({
            anchor: this.origin,
            align: this.align,
            position: this.position
          });
          this.createElement(this.tether.parent);
          this.createContentElement(this.element, content);
          this.tether.start(this.element);
        }
        onElementsRemoved() {
          this.tether.stop();
        }
        sync() {
          if (this.isOpen()) {
            if (this.isDetached() || this.tether.isDetached()) {
              this.dismiss(':detached', {
                animation: false,
                preventable: false
              });
            } else {
              this.tether.sync();
            }
          }
        }
      };

      /***/
    }, /* 52 */
    /***/() => {
      var _a;
      up.Layer.OverlayWithViewport = (_a = class OverlayWithViewport extends up.Layer.Overlay {
        static getParentElement() {
          return document.body;
        }
        createElements(content) {
          this.shiftBody();
          this.createElement(this.constructor.getParentElement());
          if (this.backdrop) {
            this.createBackdropElement(this.element);
          }
          this.createViewportElement(this.element);
          this.createBoxElement(this.viewportElement);
          this.createContentElement(this.boxElement, content);
        }
        onElementsRemoved() {
          this.unshiftBody();
        }
        shiftBody() {
          this.constructor.bodyShifter.shift();
        }
        unshiftBody() {
          this.constructor.bodyShifter.unshift();
        }
        sync() {
          if (this.isDetached() && this.isOpen()) {
            this.constructor.getParentElement().appendChild(this.element);
          }
        }
      }, _a.bodyShifter = new up.BodyShifter(), _a);

      /***/
    }, /* 53 */
    /***/() => {
      var _a;
      const e = up.element;
      up.Layer.Root = (_a = class Root extends up.Layer {
        get element() {
          return e.root;
        }
        constructor(options) {
          super(options);
          this.setupHandlers();
        }
        getFirstSwappableElement() {
          return document.body;
        }
        static selector() {
          return 'html';
        }
        setupHandlers() {
          if (!this.element.upHandlersApplied) {
            this.element.upHandlersApplied = true;
            super.setupHandlers();
          }
        }
        sync() {
          this.setupHandlers();
        }
        accept() {
          this.cannotCloseRoot();
        }
        dismiss() {
          this.cannotCloseRoot();
        }
        cannotCloseRoot() {
          up.fail('Cannot close the root layer');
        }
        toString() {
          return "root layer";
        }
      }, _a.mode = 'root', _a);

      /***/
    }, /* 54 */
    /***/() => {
      var _a;
      up.Layer.Modal = (_a = class Modal extends up.Layer.OverlayWithViewport {}, _a.mode = 'modal', _a);

      /***/
    }, /* 55 */
    /***/() => {
      var _a;
      up.Layer.Popup = (_a = class Popup extends up.Layer.OverlayWithTether {}, _a.mode = 'popup', _a);

      /***/
    }, /* 56 */
    /***/() => {
      var _a;
      up.Layer.Drawer = (_a = class Drawer extends up.Layer.OverlayWithViewport {}, _a.mode = 'drawer', _a);

      /***/
    }, /* 57 */
    /***/() => {
      var _a;
      up.Layer.Cover = (_a = class Cover extends up.Layer.OverlayWithViewport {}, _a.mode = 'cover', _a);

      /***/
    }, /* 58 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.LayerLookup = class LayerLookup {
        constructor(stack, ...args) {
          this.stack = stack;
          const options = u.parseArgIntoOptions(args, 'layer');
          if (options.normalizeLayerOptions !== false) {
            up.layer.normalizeOptions(options);
          }
          this.values = u.parseTokens(options.layer);
          this.origin = options.origin;
          this.baseLayer = options.baseLayer || this.originLayer() || this.stack.current;
          if (u.isString(this.baseLayer)) {
            const recursiveOptions = {
              ...options,
              baseLayer: this.stack.current,
              normalizeLayerOptions: false
            };
            this.baseLayer = new this.constructor(this.stack, this.baseLayer, recursiveOptions).first();
          }
        }
        originLayer() {
          if (this.origin) {
            return this.forElement(this.origin);
          }
        }
        first() {
          return this.all()[0];
        }
        all() {
          let results = u.flatMap(this.values, value => this.resolveValue(value));
          results = u.compact(results);
          results = u.uniq(results);
          return results;
        }
        forElement(element) {
          element = e.get(element);
          return u.find(this.stack.reversed(), layer => layer.contains(element));
        }
        forIndex(value) {
          return this.stack[value];
        }
        resolveValue(value) {
          if (value instanceof up.Layer) {
            return value;
          }
          if (u.isNumber(value)) {
            return this.forIndex(value);
          }
          if (/^\d+$/.test(value)) {
            return this.forIndex(Number(value));
          }
          if (u.isElementish(value)) {
            return this.forElement(value);
          }
          switch (value) {
            case 'any':
              return [this.baseLayer, ...this.stack.reversed()];
            case 'current':
              return this.baseLayer;
            case 'closest':
              return this.stack.selfAndAncestorsOf(this.baseLayer);
            case 'parent':
              return this.baseLayer.parent;
            case 'ancestor':
            case 'ancestors':
              return this.baseLayer.ancestors;
            case 'child':
              return this.baseLayer.child;
            case 'descendant':
            case 'descendants':
              return this.baseLayer.descendants;
            case 'new':
              return 'new';
            case 'root':
              return this.stack.root;
            case 'overlay':
            case 'overlays':
              return u.reverse(this.stack.overlays);
            case 'front':
              return this.stack.front;
            case 'origin':
              return this.originLayer();
            default:
              return up.fail("Unknown { layer } option: %o", value);
          }
        }
      };

      /***/
    }, /* 59 */
    /***/() => {
      const u = up.util;
      up.LayerStack = class LayerStack extends Array {
        constructor() {
          super();
          Object.setPrototypeOf(this, up.LayerStack.prototype);
          this.currentOverrides = [];
          this.push(this.buildRoot());
        }
        buildRoot() {
          return up.layer.build({
            mode: 'root',
            stack: this
          });
        }
        remove(layer) {
          u.remove(this, layer);
        }
        peel(layer, options) {
          const descendants = u.reverse(layer.descendants);
          const dismissOptions = {
            ...options,
            preventable: false
          };
          for (let descendant of descendants) {
            descendant.dismiss(':peel', dismissOptions);
          }
        }
        reset() {
          this.peel(this.root, {
            animation: false
          });
          this.currentOverrides = [];
          this.root.reset();
        }
        isOpen(layer) {
          return layer.index >= 0;
        }
        isClosed(layer) {
          return !this.isOpen(layer);
        }
        parentOf(layer) {
          return this[layer.index - 1];
        }
        childOf(layer) {
          return this[layer.index + 1];
        }
        ancestorsOf(layer) {
          return u.reverse(this.slice(0, layer.index));
        }
        selfAndAncestorsOf(layer) {
          return [layer, ...layer.ancestors];
        }
        descendantsOf(layer) {
          return this.slice(layer.index + 1);
        }
        isRoot(layer) {
          return this[0] === layer;
        }
        isOverlay(layer) {
          return !this.isRoot(layer);
        }
        isCurrent(layer) {
          return this.current === layer;
        }
        isFront(layer) {
          return this.front === layer;
        }
        get(...args) {
          return this.getAll(...args)[0];
        }
        getAll(...args) {
          return new up.LayerLookup(this, ...args).all();
        }
        sync() {
          for (let layer of this) {
            layer.sync();
          }
        }
        asCurrent(layer, fn) {
          try {
            this.currentOverrides.push(layer);
            return fn();
          } finally {
            this.currentOverrides.pop();
          }
        }
        reversed() {
          return u.reverse(this);
        }
        dismissOverlays(value = null, options = {}) {
          options.dismissable = false;
          for (let overlay of u.reverse(this.overlays)) {
            overlay.dismiss(value, options);
          }
        }
        [u.copy.key]() {
          return u.copyArrayLike(this);
        }
        get count() {
          return this.length;
        }
        get root() {
          return this[0];
        }
        get overlays() {
          return this.root.descendants;
        }
        get current() {
          return u.last(this.currentOverrides) || this.front;
        }
        get front() {
          return u.last(this);
        }
      };

      /***/
    }, /* 60 */
    /***/() => {
      up.LinkFeedbackURLs = class LinkFeedbackURLs {
        constructor(link) {
          const normalize = up.feedback.normalizeURL;
          this.isSafe = up.link.isSafe(link);
          if (this.isSafe) {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
              this.href = normalize(href);
            }
            const upHREF = link.getAttribute('up-href');
            if (upHREF) {
              this.upHREF = normalize(upHREF);
            }
            const alias = link.getAttribute('up-alias');
            if (alias) {
              this.aliasPattern = new up.URLPattern(alias, normalize);
            }
          }
        }
        isCurrent(normalizedLocation) {
          return this.isSafe && !!(this.href && this.href === normalizedLocation || this.upHREF && this.upHREF === normalizedLocation || this.aliasPattern && this.aliasPattern.test(normalizedLocation, false));
        }
      };

      /***/
    }, /* 61 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.LinkPreloader = class LinkPreloader {
        constructor() {
          this.considerPreload = this.considerPreload.bind(this);
        }
        watchLink(link) {
          if (up.link.isSafe(link)) {
            this.on(link, 'mouseenter', event => this.considerPreload(event, true));
            this.on(link, 'mousedown touchstart', event => this.considerPreload(event));
            this.on(link, 'mouseleave', event => this.stopPreload(event));
          }
        }
        on(link, eventTypes, callback) {
          up.on(link, eventTypes, {
            passive: true
          }, callback);
        }
        considerPreload(event, applyDelay) {
          const link = event.target;
          if (link !== this.currentLink) {
            this.reset();
            this.currentLink = link;
            if (up.link.shouldFollowEvent(event, link)) {
              if (applyDelay) {
                this.preloadAfterDelay(event, link);
              } else {
                this.preloadNow(event, link);
              }
            }
          }
        }
        stopPreload(event) {
          if (event.target === this.currentLink) {
            return this.reset();
          }
        }
        reset() {
          if (!this.currentLink) {
            return;
          }
          clearTimeout(this.timer);
          if (this.currentRequest?.background) {
            this.currentRequest.abort();
          }
          this.currentLink = undefined;
          this.currentRequest = undefined;
        }
        preloadAfterDelay(event, link) {
          const delay = e.numberAttr(link, 'up-preload-delay') ?? up.link.config.preloadDelay;
          this.timer = u.timer(delay, () => this.preloadNow(event, link));
        }
        preloadNow(event, link) {
          if (!link.isConnected) {
            this.reset();
            return;
          }
          const onQueued = request => {
            return this.currentRequest = request;
          };
          up.log.putsEvent(event);
          up.error.muteUncriticalRejection(up.link.preload(link, {
            onQueued
          }));
          this.queued = true;
        }
      };

      /***/
    }, /* 62 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.MotionController = class MotionController {
        constructor(name) {
          this.activeClass = `up-${name}`;
          this.selector = `.${this.activeClass}`;
          this.finishEvent = `up:${name}:finish`;
          this.finishCount = 0;
          this.clusterCount = 0;
        }
        startFunction(cluster, startMotion, memory = {}) {
          cluster = e.list(cluster);
          const mutedAnimator = () => up.error.muteUncriticalRejection(startMotion());
          memory.trackMotion = memory.trackMotion ?? up.motion.isEnabled();
          if (memory.trackMotion === false) {
            return mutedAnimator();
          } else {
            memory.trackMotion = false;
            this.finish(cluster);
            this.markCluster(cluster);
            let promise = this.whileForwardingFinishEvent(cluster, mutedAnimator);
            promise = promise.then(() => this.unmarkCluster(cluster));
            return promise;
          }
        }
        finish(elements) {
          this.finishCount++;
          if (this.clusterCount === 0 || !up.motion.isEnabled()) {
            return;
          }
          elements = this.expandFinishRequest(elements);
          for (let element of elements) {
            this.finishOneElement(element);
          }
          return up.migrate.formerlyAsync?.('up.motion.finish()');
        }
        expandFinishRequest(elements) {
          if (elements) {
            return u.flatMap(elements, el => e.list(el.closest(this.selector), el.querySelectorAll(this.selector)));
          } else {
            return document.querySelectorAll(this.selector);
          }
        }
        isActive(element) {
          return element.classList.contains(this.activeClass);
        }
        finishOneElement(element) {
          this.emitFinishEvent(element);
        }
        emitFinishEvent(element, eventAttrs = {}) {
          eventAttrs = {
            target: element,
            log: false,
            ...eventAttrs
          };
          return up.emit(this.finishEvent, eventAttrs);
        }
        markCluster(cluster) {
          this.clusterCount++;
          this.toggleActive(cluster, true);
        }
        unmarkCluster(cluster) {
          this.clusterCount--;
          this.toggleActive(cluster, false);
        }
        toggleActive(cluster, isActive) {
          for (let element of cluster) {
            element.classList.toggle(this.activeClass, isActive);
          }
        }
        whileForwardingFinishEvent(cluster, fn) {
          if (cluster.length < 2) {
            return fn();
          }
          const doForward = event => {
            if (!event.forwarded) {
              for (let element of cluster) {
                if (element !== event.target && this.isActive(element)) {
                  this.emitFinishEvent(element, {
                    forwarded: true
                  });
                }
              }
            }
          };
          const unbindFinish = up.on(cluster, this.finishEvent, doForward);
          return fn().then(unbindFinish);
        }
        async reset() {
          await this.finish();
          this.finishCount = 0;
          this.clusterCount = 0;
        }
      };

      /***/
    }, /* 63 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.NonceableCallback = class NonceableCallback {
        constructor(script, nonce) {
          this.script = script;
          this.nonce = nonce;
        }
        static fromString(string) {
          let match = string.match(/^(nonce-([^\s]+)\s)?(.*)$/);
          return new this(match[3], match[2]);
        }
        toFunction(...argNames) {
          if (up.browser.canEval()) {
            return new Function(...argNames, this.script);
          } else if (this.nonce) {
            let callbackThis = this;
            return function (...args) {
              return callbackThis.runAsNoncedFunction(this, argNames, args);
            };
          } else {
            return this.cannotRun.bind(this);
          }
        }
        toString() {
          return `nonce-${this.nonce} ${this.script}`;
        }
        cannotRun() {
          throw new Error(`Your Content Security Policy disallows inline JavaScript (${this.script}). See https://unpoly.com/csp for solutions.`);
        }
        runAsNoncedFunction(thisArg, argNames, args) {
          let wrappedScript = `
      try {
        up.noncedEval.value = (function(${argNames.join(',')}) {
          ${this.script}
        }).apply(up.noncedEval.thisArg, up.noncedEval.args)
      } catch (error) {
        up.noncedEval.error = error
      }
    `;
          let script;
          try {
            up.noncedEval = {
              args,
              thisArg: thisArg
            };
            script = up.element.affix(document.body, 'script', {
              nonce: this.nonce,
              text: wrappedScript
            });
            if (up.noncedEval.error) {
              throw up.noncedEval.error;
            } else {
              return up.noncedEval.value;
            }
          } finally {
            up.noncedEval = undefined;
            if (script) {
              script.remove();
            }
          }
        }
        allowedBy(allowedNonces) {
          return this.nonce && u.contains(allowedNonces, this.nonce);
        }
        static adoptNonces(element, allowedNonces) {
          if (!allowedNonces?.length) {
            return;
          }
          const getPageNonce = u.memoize(up.protocol.cspNonce);
          u.each(up.protocol.config.nonceableAttributes, attribute => {
            let matches = e.subtree(element, `[${attribute}^="nonce-"]`);
            u.each(matches, match => {
              let attributeValue = match.getAttribute(attribute);
              let callback = this.fromString(attributeValue);
              let warn = (message, ...args) => up.log.warn('up.render()', `Cannot use callback [${attribute}="${attributeValue}"]: ${message}`, ...args);
              if (!callback.allowedBy(allowedNonces)) {
                return warn("Callback's CSP nonce (%o) does not match response header (%o)", callback.nonce, allowedNonces);
              }
              let pageNonce = getPageNonce();
              if (!pageNonce) {
                return warn("Current page's CSP nonce is unknown");
              }
              callback.nonce = pageNonce;
              match.setAttribute(attribute, callback.toString());
            });
          });
        }
      };

      /***/
    }, /* 64 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.OptionsParser = class OptionsParser {
        constructor(element, options, parserOptions = {}) {
          this.options = options;
          this.element = element;
          this.fail = parserOptions.fail;
          this.closest = parserOptions.closest;
          this.attrPrefix = parserOptions.attrPrefix || 'up-';
          this.defaults = parserOptions.defaults || {};
        }
        string(key, keyOptions) {
          this.parse(e.attr, key, keyOptions);
        }
        boolean(key, keyOptions) {
          this.parse(e.booleanAttr, key, keyOptions);
        }
        number(key, keyOptions) {
          this.parse(e.numberAttr, key, keyOptions);
        }
        booleanOrString(key, keyOptions) {
          this.parse(e.booleanOrStringAttr, key, keyOptions);
        }
        json(key, keyOptions) {
          this.parse(e.jsonAttr, key, keyOptions);
        }
        callback(key, keyOptions = {}) {
          let parser = (link, attr) => e.callbackAttr(link, attr, keyOptions);
          this.parse(parser, key, keyOptions);
        }
        parse(attrValueFn, key, keyOptions = {}) {
          const attrNames = u.wrapList(keyOptions.attr ?? this.attrNameForKey(key));
          let value = this.options[key];
          for (let attrName of attrNames) {
            value ?? (value = this.parseFromAttr(attrValueFn, this.element, attrName));
          }
          value ?? (value = keyOptions.default ?? this.defaults[key]);
          let normalizeFn = keyOptions.normalize;
          if (normalizeFn) {
            value = normalizeFn(value);
          }
          if (u.isDefined(value)) {
            this.options[key] = value;
          }
          let failKey;
          if (this.fail && (failKey = up.fragment.failKey(key))) {
            const failAttrNames = u.compact(u.map(attrNames, attrName => this.deriveFailAttrName(attrName)));
            this.parse(attrValueFn, failKey, {
              ...keyOptions,
              attr: failAttrNames
            });
          }
        }
        parseFromAttr(attrValueFn, element, attrName) {
          if (this.closest) {
            return e.closestAttr(element, attrName, attrValueFn);
          } else {
            return attrValueFn(element, attrName);
          }
        }
        deriveFailAttrName(attr) {
          return this.deriveFailAttrNameForPrefix(attr, this.attrPrefix + 'on-') || this.deriveFailAttrNameForPrefix(attr, this.attrPrefix);
        }
        deriveFailAttrNameForPrefix(attr, prefix) {
          if (attr.startsWith(prefix)) {
            return `${prefix}fail-${attr.substring(prefix.length)}`;
          }
        }
        attrNameForKey(option) {
          return `${this.attrPrefix}${u.camelToKebabCase(option)}`;
        }
      };

      /***/
    }, /* 65 */
    /***/() => {
      const e = up.element;
      const u = up.util;
      up.OverlayFocus = class OverlayFocus {
        constructor(layer) {
          this.layer = layer;
          this.focusElement = this.layer.getFocusElement();
        }
        moveToFront() {
          if (this.enabled) {
            return;
          }
          this.enabled = true;
          this.untrapFocus = up.on('focusin', event => this.onFocus(event));
          this.unsetAttrs = e.setTemporaryAttrs(this.focusElement, {
            'tabindex': '0',
            'role': 'dialog',
            'aria-modal': 'true'
          });
          this.focusTrapBefore = e.affix(this.focusElement, 'beforebegin', 'up-focus-trap[tabindex=0]');
          this.focusTrapAfter = e.affix(this.focusElement, 'afterend', 'up-focus-trap[tabindex=0]');
        }
        moveToBack() {
          this.teardown();
        }
        teardown() {
          if (!this.enabled) {
            return;
          }
          this.enabled = false;
          this.untrapFocus();
          this.unsetAttrs();
          this.focusTrapBefore.remove();
          this.focusTrapAfter.remove();
        }
        onFocus(event) {
          const {
            target
          } = event;
          if (this.processingFocusEvent || up.layer.isWithinForeignOverlay(target)) {
            return;
          }
          this.processingFocusEvent = true;
          if (target === this.focusTrapBefore) {
            this.focusEnd();
          } else if (target === this.focusTrapAfter || !this.layer.contains(target)) {
            this.focusStart();
          }
          this.processingFocusEvent = false;
        }
        focusStart(focusOptions) {
          up.focus(this.focusElement, focusOptions);
        }
        focusEnd() {
          this.focusLastDescendant(this.layer.getBoxElement()) || this.focusStart();
        }
        focusLastDescendant(element) {
          for (let child of u.reverse(element.children)) {
            if (up.viewport.tryFocus(child) || this.focusLastDescendant(child)) {
              return true;
            }
          }
        }
      };

      /***/
    }, /* 66 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.Params = class Params {
        constructor(raw) {
          this.clear();
          this.addAll(raw);
        }
        clear() {
          this.entries = [];
        }
        [u.copy.key]() {
          return new up.Params(this);
        }
        toObject() {
          const obj = {};
          for (let entry of this.entries) {
            const {
              name,
              value
            } = entry;
            if (!u.isBasicObjectProperty(name)) {
              if (this.isArrayKey(name)) {
                obj[name] || (obj[name] = []);
                obj[name].push(value);
              } else {
                obj[name] = value;
              }
            }
          }
          return obj;
        }
        toArray() {
          return this.entries;
        }
        toFormData() {
          const formData = new FormData();
          for (let entry of this.entries) {
            formData.append(entry.name, entry.value);
          }
          if (!formData.entries) {
            formData.originalArray = this.entries;
          }
          return formData;
        }
        toQuery() {
          let parts = u.map(this.entries, this.arrayEntryToQuery.bind(this));
          parts = u.compact(parts);
          return parts.join('&');
        }
        arrayEntryToQuery(entry) {
          const {
            value
          } = entry;
          if (this.isBinaryValue(value)) {
            return;
          }
          let query = encodeURIComponent(entry.name);
          if (u.isGiven(value)) {
            query += "=";
            query += encodeURIComponent(value);
          }
          return query;
        }
        isBinaryValue(value) {
          return value instanceof Blob;
        }
        hasBinaryValues() {
          const values = u.map(this.entries, 'value');
          return u.some(values, this.isBinaryValue);
        }
        toURL(base) {
          let parts = [base, this.toQuery()];
          parts = u.filter(parts, u.isPresent);
          const separator = u.contains(base, '?') ? '&' : '?';
          return parts.join(separator);
        }
        add(name, value) {
          this.entries.push({
            name,
            value
          });
        }
        addAll(raw) {
          if (u.isMissing(raw)) ; else if (raw instanceof this.constructor) {
            this.entries.push(...raw.entries);
          } else if (u.isArray(raw)) {
            this.entries.push(...raw);
          } else if (u.isString(raw)) {
            this.addAllFromQuery(raw);
          } else if (u.isFormData(raw)) {
            this.addAllFromFormData(raw);
          } else if (u.isObject(raw)) {
            this.addAllFromObject(raw);
          } else {
            up.fail("Unsupport params type: %o", raw);
          }
        }
        addAllFromObject(object) {
          for (let key in object) {
            const value = object[key];
            const valueElements = u.isArray(value) ? value : [value];
            for (let valueElement of valueElements) {
              this.add(key, valueElement);
            }
          }
        }
        addAllFromQuery(query) {
          for (let part of query.split('&')) {
            if (part) {
              let [name, value] = part.split('=');
              name = decodeURIComponent(name);
              if (u.isGiven(value)) {
                value = decodeURIComponent(value);
              } else {
                value = null;
              }
              this.add(name, value);
            }
          }
        }
        addAllFromFormData(formData) {
          for (let value of formData.entries()) {
            this.add(...value);
          }
        }
        set(name, value) {
          this.delete(name);
          this.add(name, value);
        }
        delete(name) {
          this.entries = u.reject(this.entries, this.matchEntryFn(name));
        }
        matchEntryFn(name) {
          return entry => entry.name === name;
        }
        get(name) {
          if (this.isArrayKey(name)) {
            return this.getAll(name);
          } else {
            return this.getFirst(name);
          }
        }
        getFirst(name) {
          const entry = u.find(this.entries, this.matchEntryFn(name));
          return entry?.value;
        }
        getAll(name) {
          if (this.isArrayKey(name)) {
            return this.getAll(name);
          } else {
            const entries = u.map(this.entries, this.matchEntryFn(name));
            return u.map(entries, 'value');
          }
        }
        isArrayKey(key) {
          return key.endsWith('[]');
        }
        [u.isBlank.key]() {
          return this.entries.length === 0;
        }
        static fromForm(form) {
          form = up.fragment.get(form);
          return this.fromFields(up.form.fields(form));
        }
        static fromFields(fields) {
          const params = new this();
          for (let field of u.wrapList(fields)) {
            params.addField(field);
          }
          return params;
        }
        addField(field) {
          field = e.get(field);
          let name = field.name;
          if (name && !field.disabled) {
            const {
              tagName
            } = field;
            const {
              type
            } = field;
            if (tagName === 'SELECT') {
              for (let option of field.querySelectorAll('option')) {
                if (option.selected) {
                  this.add(name, option.value);
                }
              }
            } else if (type === 'checkbox' || type === 'radio') {
              if (field.checked) {
                this.add(name, field.value);
              }
            } else if (type === 'file') {
              for (let file of field.files) {
                this.add(name, file);
              }
            } else {
              return this.add(name, field.value);
            }
          }
        }
        [u.isEqual.key](other) {
          return this.constructor === other.constructor && u.isEqual(this.entries, other.entries);
        }
        static fromURL(url) {
          const params = new this();
          const urlParts = u.parseURL(url);
          let query = urlParts.search;
          if (query) {
            query = query.replace(/^\?/, '');
            params.addAll(query);
          }
          return params;
        }
        static stripURL(url) {
          return u.normalizeURL(url, {
            search: false
          });
        }
        static merge(...objects) {
          return objects.reduce(function (allParams, params) {
            allParams.addAll(params);
            return allParams;
          }, new up.Params());
        }
      };

      /***/
    }, /* 67 */
    /***/() => {
      const e = up.element;
      const TRANSITION_DELAY = 300;
      up.ProgressBar = class ProgressBar {
        constructor() {
          this.step = 0;
          this.element = e.affix(document.body, 'up-progress-bar');
          this.element.style.transition = `width ${TRANSITION_DELAY}ms ease-out`;
          this.moveTo(0);
          up.element.paint(this.element);
          this.width = 31;
          this.nextStep();
        }
        nextStep() {
          let diff;
          if (this.width < 80) {
            if (Math.random() < 0.15) {
              diff = 7 + 5 * Math.random();
            } else {
              diff = 1.5 + 0.5 * Math.random();
            }
          } else {
            diff = 0.13 * (100 - this.width) * Math.random();
          }
          this.moveTo(this.width + diff);
          this.step++;
          const nextStepDelay = TRANSITION_DELAY + this.step * 40;
          this.timeout = setTimeout(this.nextStep.bind(this), nextStepDelay);
        }
        moveTo(width) {
          this.width = width;
          this.element.style.width = `${width}vw`;
        }
        destroy() {
          clearTimeout(this.timeout);
          this.element.remove();
        }
        conclude() {
          clearTimeout(this.timeout);
          this.moveTo(100);
          setTimeout(this.destroy.bind(this), TRANSITION_DELAY);
        }
      };

      /***/
    }, /* 68 */
    /***/() => {
      const u = up.util;
      up.RenderOptions = function () {
        const GLOBAL_DEFAULTS = {
          useHungry: true,
          useKeep: true,
          source: true,
          saveScroll: true,
          saveFocus: true,
          focus: 'keep',
          abort: 'target',
          failOptions: true
        };
        const PRELOAD_OVERRIDES = {
          abort: false,
          confirm: false,
          feedback: false,
          cache: true,
          background: true
        };
        const PREFLIGHT_KEYS = ['url', 'method', 'origin', 'headers', 'params', 'cache', 'fallback', 'abort', 'abortable', 'confirm', 'feedback', 'origin', 'baseLayer', 'fail', 'onError'];
        const SHARED_KEYS = PREFLIGHT_KEYS.concat(['keep', 'hungry', 'history', 'source', 'saveScroll', 'navigate']);
        const CONTENT_KEYS = ['url', 'response', 'content', 'fragment', 'document'];
        const LATE_KEYS = ['history', 'focus', 'scroll'];
        function navigateDefaults(options) {
          if (options.navigate) {
            return up.fragment.config.navigateOptions;
          }
        }
        function preloadOverrides(options) {
          if (options.preload) {
            return PRELOAD_OVERRIDES;
          }
        }
        function preprocess(options) {
          up.migrate.preprocessRenderOptions?.(options);
          const defaults = u.merge(GLOBAL_DEFAULTS, navigateDefaults(options));
          return u.merge(u.omit(defaults, LATE_KEYS), {
            defaults
          }, options, preloadOverrides(options));
        }
        function finalize(preprocessedOptions, lateDefaults) {
          return u.merge(preprocessedOptions.defaults, lateDefaults, preprocessedOptions);
        }
        function assertContentGiven(options) {
          if (!u.some(CONTENT_KEYS, contentKey => u.isGiven(options[contentKey]))) {
            if (options.defaultToEmptyContent) {
              options.content = '';
            } else {
              up.fail('up.render() needs either { ' + CONTENT_KEYS.join(', ') + ' } option');
            }
          }
        }
        function failOverrides(options) {
          const overrides = {};
          for (let key in options) {
            const value = options[key];
            let unprefixed = up.fragment.successKey(key);
            if (unprefixed) {
              overrides[unprefixed] = value;
            }
          }
          return overrides;
        }
        function deriveFailOptions(preprocessedOptions) {
          if (preprocessedOptions.failOptions) {
            return {
              ...preprocessedOptions.defaults,
              ...u.pick(preprocessedOptions, SHARED_KEYS),
              ...failOverrides(preprocessedOptions),
              ...{
                failPrefixForced: true
              }
            };
          } else {
            return {
              ...preprocessedOptions,
              ...failOverrides(preprocessedOptions)
            };
          }
        }
        return {
          preprocess,
          finalize,
          assertContentGiven,
          deriveFailOptions
        };
      }();

      /***/
    }, /* 69 */
    /***/() => {
      up.RenderResult = class RenderResult extends up.Record {
        keys() {
          return ['fragments', 'layer', 'target', 'options', 'finished'];
        }
        defaults() {
          return {
            fragments: []
          };
        }
        get none() {
          return !this.fragments.length;
        }
        get fragment() {
          return this.fragments[0];
        }
        static buildNone() {
          return new this({
            target: ':none',
            finished: Promise.resolve()
          });
        }
      };

      /***/
    }, /* 70 */
    /***/() => {
      var _a;
      const u = up.util;
      up.Request = (_a = class Request extends up.Record {
        keys() {
          return ['method', 'url', 'hash', 'params', 'target', 'failTarget', 'headers', 'timeout', 'background', 'cache', 'expireCache', 'evictCache', 'layer', 'mode', 'context', 'failLayer', 'failMode', 'failContext', 'origin', 'fragments', 'builtAt', 'wrapMethod', 'contentType', 'payload', 'onQueued', 'onLoading', 'fail', 'abortable', 'badResponseTime'];
        }
        defaults() {
          return {
            state: 'new',
            abortable: true,
            headers: {},
            timeout: up.network.config.timeout,
            builtAt: new Date()
          };
        }
        constructor(options) {
          super(options);
          this.params = new up.Params(this.params);
          if (this.wrapMethod == null) {
            this.wrapMethod = up.network.config.wrapMethod;
          }
          this.normalize();
          if ((this.target || this.layer || this.origin) && !options.basic) {
            const layerLookupOptions = {
              origin: this.origin
            };
            this.layer = up.layer.get(this.layer, layerLookupOptions);
            this.failLayer = up.layer.get(this.failLayer || this.layer, layerLookupOptions);
            this.context || (this.context = this.layer.context || {});
            this.failContext || (this.failContext = this.failLayer.context || {});
            this.mode || (this.mode = this.layer.mode);
            this.failMode || (this.failMode = this.failLayer.mode);
          }
          this.deferred = u.newDeferred();
          this.badResponseTime ?? (this.badResponseTime = u.evalOption(up.network.config.badResponseTime, this));
          this.addAutoHeaders();
        }
        get xhr() {
          return this._xhr ?? (this._xhr = new XMLHttpRequest());
        }
        get fragments() {
          if (this._fragments) {
            return this._fragments;
          } else if (this.target) {
            let steps = up.fragment.parseTargetSteps(this.target);
            let selectors = u.map(steps, 'selector');
            let lookupOpts = {
              origin: this.origin,
              layer: this.layer
            };
            return u.compact(u.map(selectors, selector => up.fragment.get(selector, lookupOpts)));
          }
        }
        set fragments(value) {
          this._fragments = value;
        }
        get fragment() {
          return this.fragments?.[0];
        }
        normalize() {
          this.method = u.normalizeMethod(this.method);
          this.extractHashFromURL();
          this.transferParamsToURL();
          this.url = u.normalizeURL(this.url);
        }
        evictExpensiveAttrs() {
          u.task(() => {
            this.layer = undefined;
            this.failLayer = undefined;
            this.origin = undefined;
            this.fragments = undefined;
          });
        }
        extractHashFromURL() {
          let match = this.url?.match(/^([^#]*)(#.+)$/);
          if (match) {
            this.url = match[1];
            return this.hash = match[2];
          }
        }
        transferParamsToURL() {
          if (!this.url || this.allowsPayload() || u.isBlank(this.params)) {
            return;
          }
          this.url = this.params.toURL(this.url);
          this.params.clear();
        }
        isSafe() {
          return up.network.isSafeMethod(this.method);
        }
        allowsPayload() {
          return u.methodAllowsPayload(this.method);
        }
        will302RedirectWithGET() {
          return this.isSafe() || this.method === 'POST';
        }
        willCache() {
          return u.evalAutoOption(this.cache, up.network.config.autoCache, this);
        }
        runQueuedCallbacks() {
          u.always(this, () => this.evictExpensiveAttrs());
          this.onQueued?.(this);
        }
        load() {
          if (this.state !== 'new') return;
          if (this.emitLoad()) {
            this.state = 'loading';
            this.normalize();
            this.onLoading?.();
            this.expired = false;
            new up.Request.XHRRenderer(this).buildAndSend({
              onload: () => this.onXHRLoad(),
              onerror: () => this.onXHRError(),
              ontimeout: () => this.onXHRTimeout(),
              onabort: () => this.onXHRAbort()
            });
            return true;
          } else {
            this.abort({
              reason: 'Prevented by event listener'
            });
          }
        }
        emitLoad() {
          let event = this.emit('up:request:load', {
            log: ['Loading %s', this.description]
          });
          return !event.defaultPrevented;
        }
        loadPage() {
          up.network.abort();
          new up.Request.FormRenderer(this).buildAndSubmit();
        }
        onXHRLoad() {
          const response = this.extractResponseFromXHR();
          const log = 'Loaded ' + response.description;
          this.emit('up:request:loaded', {
            request: response.request,
            response,
            log
          });
          this.respondWith(response);
        }
        onXHRError() {
          this.setOfflineState('Network error');
        }
        onXHRTimeout() {
          this.setOfflineState('Timeout');
        }
        onXHRAbort() {
          this.setAbortedState();
        }
        abort({
          reason
        } = {}) {
          if (this.setAbortedState(reason) && this._xhr) {
            this._xhr.abort();
          }
        }
        setAbortedState(reason) {
          if (this.isSettled()) return;
          let message = 'Aborted request to ' + this.description + (reason ? ': ' + reason : '');
          this.state = 'aborted';
          this.deferred.reject(new up.Aborted(message));
          this.emit('up:request:aborted', {
            log: message
          });
          return true;
        }
        setOfflineState(reason) {
          if (this.isSettled()) return;
          let message = 'Cannot load request to ' + this.description + (reason ? ': ' + reason : '');
          this.state = 'offline';
          this.deferred.reject(new up.Offline(message));
          this.emit('up:request:offline', {
            log: message
          });
        }
        respondWith(response) {
          this.response = response;
          if (this.isSettled()) return;
          this.state = 'loaded';
          if (response.ok) {
            this.deferred.resolve(response);
          } else {
            this.deferred.reject(response);
          }
        }
        isSettled() {
          return this.state !== 'new' && this.state !== 'loading' && this.state !== 'tracking';
        }
        csrfHeader() {
          return up.protocol.csrfHeader();
        }
        csrfParam() {
          return up.protocol.csrfParam();
        }
        csrfToken() {
          if (!this.isSafe() && !this.isCrossOrigin()) {
            return up.protocol.csrfToken();
          }
        }
        isCrossOrigin() {
          return u.isCrossOrigin(this.url);
        }
        extractResponseFromXHR() {
          const responseAttrs = {
            method: this.method,
            url: this.url,
            request: this,
            xhr: this.xhr,
            text: this.xhr.responseText,
            status: this.xhr.status,
            title: up.protocol.titleFromXHR(this.xhr),
            target: up.protocol.targetFromXHR(this.xhr),
            acceptLayer: up.protocol.acceptLayerFromXHR(this.xhr),
            dismissLayer: up.protocol.dismissLayerFromXHR(this.xhr),
            eventPlans: up.protocol.eventPlansFromXHR(this.xhr),
            context: up.protocol.contextFromXHR(this.xhr),
            expireCache: up.protocol.expireCacheFromXHR(this.xhr),
            evictCache: up.protocol.evictCacheFromXHR(this.xhr),
            fail: this.fail
          };
          let methodFromResponse = up.protocol.methodFromXHR(this.xhr);
          let urlFromResponse = up.protocol.locationFromXHR(this.xhr);
          if (urlFromResponse) {
            if (!u.matchURLs(this.url, urlFromResponse)) {
              methodFromResponse || (methodFromResponse = 'GET');
            }
            responseAttrs.url = urlFromResponse;
          }
          if (methodFromResponse) {
            responseAttrs.method = methodFromResponse;
          }
          return new up.Response(responseAttrs);
        }
        buildEventEmitter(args) {
          return up.EventEmitter.fromEmitArgs(args, {
            layer: this.layer,
            request: this,
            origin: this.origin
          });
        }
        emit(...args) {
          return this.buildEventEmitter(args).emit();
        }
        assertEmitted(...args) {
          this.buildEventEmitter(args).assertEmitted();
        }
        get description() {
          return this.method + ' ' + this.url;
        }
        isPartOfSubtree(subtreeElements) {
          if (!this.fragments || !subtreeElements) {
            return false;
          }
          subtreeElements = u.wrapList(subtreeElements);
          return u.some(this.fragments, function (fragment) {
            return u.some(subtreeElements, subtreeElement => subtreeElement.contains(fragment));
          });
        }
        get age() {
          return new Date() - this.builtAt;
        }
        header(name) {
          return this.headers[name];
        }
        addAutoHeaders() {
          for (let key of ['target', 'failTarget', 'mode', 'failMode', 'context', 'failContext']) {
            this.addAutoHeader(up.protocol.headerize(key), this[key]);
          }
          let csrfHeader, csrfToken;
          if ((csrfHeader = this.csrfHeader()) && (csrfToken = this.csrfToken())) {
            this.addAutoHeader(csrfHeader, csrfToken);
          }
          this.addAutoHeader(up.protocol.headerize('version'), up.version);
        }
        addAutoHeader(name, value) {
          if (u.isMissing(value)) {
            return;
          }
          if (u.isOptions(value) || u.isArray(value)) {
            value = u.safeStringifyJSON(value);
          }
          this.headers[name] = value;
        }
        static tester(condition, {
          except
        } = {}) {
          let testFn;
          if (u.isFunction(condition)) {
            testFn = condition;
          } else if (condition instanceof this) {
            testFn = request => condition === request;
          } else if (u.isString(condition)) {
            let pattern = new up.URLPattern(condition);
            testFn = request => pattern.test(request.url);
          } else {
            testFn = _request => condition;
          }
          if (except) {
            return request => !up.cache.willHaveSameResponse(request, except) && testFn(request);
          } else {
            return testFn;
          }
        }
      }, (() => {
        u.delegate(_a.prototype, ['then', 'catch', 'finally'], function () {
          return this.deferred;
        });
      })(), _a);

      /***/
    }, /* 71 */
    /***/() => {
      const u = up.util;
      up.Request.Cache = class Cache {
        constructor() {
          this.reset();
        }
        reset() {
          this.varyInfo = {};
          this.map = new Map();
        }
        cacheKey(request) {
          let influencingHeaders = this.getPreviousInfluencingHeaders(request);
          let varyPart = u.flatMap(influencingHeaders, headerName => [headerName, request.header(headerName)]);
          return [request.description, ...varyPart].join(':');
        }
        getPreviousInfluencingHeaders(request) {
          var _a, _b;
          return (_a = this.varyInfo)[_b = request.description] || (_a[_b] = new Set());
        }
        get(request) {
          request = this.wrap(request);
          let cacheKey = this.cacheKey(request);
          let cachedRequest = this.map.get(cacheKey);
          if (cachedRequest) {
            if (this.isUsable(cachedRequest)) {
              return cachedRequest;
            } else {
              this.map.delete(cacheKey);
            }
          }
        }
        get capacity() {
          return up.network.config.cacheSize;
        }
        isUsable(request) {
          return request.age < up.network.config.cacheEvictAge;
        }
        async put(request) {
          request = this.wrap(request);
          this.makeRoom();
          let cacheKey = this.updateCacheKey(request);
          this.map.set(cacheKey, request);
        }
        updateCacheKey(request) {
          let oldCacheKey = this.cacheKey(request);
          let {
            response
          } = request;
          if (response) {
            this.mergePreviousHeaderNames(request, response);
            let newCacheKey = this.cacheKey(request);
            this.renameMapKey(oldCacheKey, newCacheKey);
            return newCacheKey;
          } else {
            return oldCacheKey;
          }
        }
        renameMapKey(oldKey, newKey) {
          if (oldKey !== newKey && this.map.has(oldKey)) {
            this.map.set(newKey, this.map.get(oldKey));
            this.map.delete(oldKey);
          }
        }
        mergePreviousHeaderNames(request, response) {
          let headersInfluencingResponse = response.ownInfluncingHeaders;
          if (headersInfluencingResponse.length) {
            let previousInfluencingHeaders = this.getPreviousInfluencingHeaders(request);
            for (let headerName of headersInfluencingResponse) {
              previousInfluencingHeaders.add(headerName);
            }
          }
        }
        alias(existingCachedRequest, newRequest) {
          existingCachedRequest = this.get(existingCachedRequest);
          if (!existingCachedRequest) return;
          newRequest = this.wrap(newRequest);
          this.track(existingCachedRequest, newRequest, {
            force: true
          });
          this.put(newRequest);
          return newRequest;
        }
        async track(existingRequest, newRequest, options = {}) {
          newRequest.trackedRequest = existingRequest;
          newRequest.state = 'tracking';
          let value = await u.always(existingRequest);
          if (value instanceof up.Response) {
            if (options.force || this.isCacheCompatible(existingRequest, newRequest)) {
              newRequest.fromCache = true;
              value = u.variant(value, {
                request: newRequest
              });
              newRequest.respondWith(value);
              u.delegate(newRequest, ['expired', 'state'], () => existingRequest);
            } else {
              delete newRequest.trackedRequest;
              newRequest.state = 'new';
              options.onIncompatible?.(newRequest);
            }
          } else {
            newRequest.state = existingRequest.state;
            newRequest.deferred.reject(value);
          }
        }
        willHaveSameResponse(existingRequest, newRequest) {
          return existingRequest === newRequest || existingRequest === newRequest.trackedRequest;
        }
        delete(request) {
          request = this.wrap(request);
          let cacheKey = this.cacheKey(request);
          this.map.delete(cacheKey);
        }
        evict(condition = true, testerOptions) {
          this.eachMatch(condition, testerOptions, request => this.delete(request));
        }
        expire(condition = true, testerOptions) {
          this.eachMatch(condition, testerOptions, request => request.expired = true);
        }
        makeRoom() {
          while (this.map.size >= this.capacity) {
            let oldestKey = this.map.keys().next().value;
            this.map.delete(oldestKey);
          }
        }
        eachMatch(condition = true, testerOptions, fn) {
          let tester = up.Request.tester(condition, testerOptions);
          let results = u.filter(this.map.values(), tester);
          u.each(results, fn);
        }
        isCacheCompatible(request1, request2) {
          return this.cacheKey(request1) === this.cacheKey(request2);
        }
        wrap(requestOrOptions) {
          return u.wrapValue(up.Request, requestOrOptions);
        }
      };

      /***/
    }, /* 72 */
    /***/() => {
      const u = up.util;
      up.Request.Queue = class Queue {
        constructor() {
          this.reset();
        }
        reset() {
          this.queuedRequests = [];
          this.currentRequests = [];
          this.emittedLate = false;
        }
        get allRequests() {
          return this.currentRequests.concat(this.queuedRequests);
        }
        asap(request) {
          request.runQueuedCallbacks();
          u.always(request, responseOrError => this.onRequestSettled(request, responseOrError));
          this.scheduleSlowTimer(request);
          this.queueRequest(request);
          u.microtask(() => this.poke());
        }
        promoteToForeground(request) {
          if (request.background) {
            request.background = false;
            this.scheduleSlowTimer(request);
          }
        }
        scheduleSlowTimer(request) {
          let timeUntilLate = Math.max(request.badResponseTime - request.age, 0);
          u.timer(timeUntilLate, () => this.checkLate());
        }
        getMaxConcurrency() {
          return u.evalOption(up.network.config.concurrency);
        }
        hasConcurrencyLeft() {
          const maxConcurrency = this.getMaxConcurrency();
          return maxConcurrency === -1 || this.currentRequests.length < maxConcurrency;
        }
        isBusy() {
          return this.currentRequests.length > 0 || this.queuedRequests.length > 0;
        }
        queueRequest(request) {
          this.queuedRequests.push(request);
        }
        pluckNextRequest() {
          let request = u.find(this.queuedRequests, request => !request.background);
          request || (request = this.queuedRequests[0]);
          return u.remove(this.queuedRequests, request);
        }
        sendRequestNow(request) {
          if (request.load()) {
            this.currentRequests.push(request);
          }
        }
        onRequestSettled(request, responseOrError) {
          u.remove(this.currentRequests, request) || u.remove(this.queuedRequests, request);
          if (responseOrError instanceof up.Response && responseOrError.ok) {
            up.network.registerAliasForRedirect(request, responseOrError);
          }
          this.checkLate();
          u.microtask(() => this.poke());
        }
        poke() {
          let request;
          if (this.hasConcurrencyLeft() && (request = this.pluckNextRequest())) {
            return this.sendRequestNow(request);
          }
        }
        abort(...args) {
          let options = u.extractOptions(args);
          let {
            except,
            reason,
            logOnce
          } = options;
          let conditions = args[0] ?? true;
          let tester = up.Request.tester(conditions, {
            except
          });
          for (let list of [this.currentRequests, this.queuedRequests]) {
            const abortableRequests = u.filter(list, tester);
            for (let abortableRequest of abortableRequests) {
              if (logOnce) {
                up.puts(...logOnce);
                logOnce = null;
              }
              abortableRequest.abort({
                reason
              });
              u.remove(list, abortableRequest);
            }
          }
        }
        checkLate() {
          const currentLate = this.isLate();
          if (this.emittedLate !== currentLate) {
            this.emittedLate = currentLate;
            if (currentLate) {
              up.emit('up:network:late', {
                log: 'Server is slow to respond'
              });
            } else {
              up.emit('up:network:recover', {
                log: 'Slow requests were loaded'
              });
            }
          }
        }
        isLate() {
          const allForegroundRequests = u.reject(this.allRequests, 'background');
          const timerTolerance = 1;
          return u.some(allForegroundRequests, request => request.age >= request.badResponseTime - timerTolerance);
        }
      };

      /***/
    }, /* 73 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      const HTML_FORM_METHODS = ['GET', 'POST'];
      up.Request.FormRenderer = class FormRenderer {
        constructor(request) {
          this.request = request;
        }
        buildAndSubmit() {
          this.params = u.copy(this.request.params);
          let action = this.request.url;
          let {
            method
          } = this.request;
          const paramsFromQuery = up.Params.fromURL(action);
          this.params.addAll(paramsFromQuery);
          action = up.Params.stripURL(action);
          if (!u.contains(HTML_FORM_METHODS, method)) {
            method = up.protocol.wrapMethod(method, this.params);
          }
          this.form = e.affix(document.body, 'form.up-request-loader', {
            method,
            action
          });
          let contentType = this.request.contentType;
          if (contentType) {
            this.form.setAttribute('enctype', contentType);
          }
          let csrfParam, csrfToken;
          if ((csrfParam = this.request.csrfParam()) && (csrfToken = this.request.csrfToken())) {
            this.params.add(csrfParam, csrfToken);
          }
          u.each(this.params.toArray(), this.addField.bind(this));
          up.browser.submitForm(this.form);
        }
        addField(attrs) {
          e.affix(this.form, 'input[type=hidden]', attrs);
        }
      };

      /***/
    }, /* 74 */
    /***/() => {
      var _a;
      const CONTENT_TYPE_URL_ENCODED = 'application/x-www-form-urlencoded';
      const CONTENT_TYPE_FORM_DATA = 'multipart/form-data';
      const u = up.util;
      up.Request.XHRRenderer = (_a = class XHRRenderer {
        constructor(request) {
          this.request = request;
        }
        buildAndSend(handlers) {
          const xhr = this.request.xhr;
          this.params = u.copy(this.request.params);
          if (this.request.timeout) {
            xhr.timeout = this.request.timeout;
          }
          xhr.open(this.getMethod(), this.request.url);
          let contentType = this.getContentType();
          if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
          }
          for (let headerName in this.request.headers) {
            let headerValue = this.request.headers[headerName];
            xhr.setRequestHeader(headerName, headerValue);
          }
          Object.assign(xhr, handlers);
          xhr.send(this.getPayload());
        }
        getMethod() {
          if (!this.method) {
            this.method = this.request.method;
            if (this.request.wrapMethod && !this.request.will302RedirectWithGET()) {
              this.method = up.protocol.wrapMethod(this.method, this.params);
            }
          }
          return this.method;
        }
        getContentType() {
          this.finalizePayload();
          return this.contentType;
        }
        getPayload() {
          this.finalizePayload();
          return this.payload;
        }
        finalizePayload() {
          this.payload = this.request.payload;
          this.contentType = this.request.contentType;
          if (!this.payload && this.request.allowsPayload()) {
            if (!this.contentType) {
              this.contentType = this.params.hasBinaryValues() ? CONTENT_TYPE_FORM_DATA : CONTENT_TYPE_URL_ENCODED;
            }
            if (this.contentType === CONTENT_TYPE_FORM_DATA) {
              this.contentType = null;
              this.payload = this.params.toFormData();
            } else {
              this.payload = this.params.toQuery().replace(/%20/g, '+');
            }
          }
        }
      }, (() => {
        u.memoizeMethod(_a.prototype, ['finalizePayload']);
      })(), _a);

      /***/
    }, /* 75 */
    /***/() => {
      const u = up.util;
      up.Response = class Response extends up.Record {
        keys() {
          return ['method', 'url', 'text', 'status', 'request', 'xhr', 'target', 'title', 'acceptLayer', 'dismissLayer', 'eventPlans', 'context', 'expireCache', 'evictCache', 'headers', 'loadedAt', 'fail'];
        }
        defaults() {
          return {
            headers: {},
            loadedAt: new Date()
          };
        }
        get ok() {
          return !u.evalOption(this.fail ?? up.network.config.fail, this);
        }
        get none() {
          return !this.text;
        }
        isCacheable() {
          return this.ok && !this.none;
        }
        header(name) {
          return this.headers[name] || this.xhr?.getResponseHeader(name);
        }
        get ownInfluncingHeaders() {
          let influencingHeaders = up.protocol.influencingHeadersFromResponse(this);
          return u.filter(influencingHeaders, headerName => this.request.header(headerName));
        }
        get contentType() {
          return this.header('Content-Type');
        }
        get cspNonces() {
          return up.protocol.cspNoncesFromHeader(this.header('Content-Security-Policy'));
        }
        get lastModified() {
          let header = this.header('Last-Modified');
          if (header) {
            return new Date(header);
          }
        }
        get etag() {
          return this.header('ETag');
        }
        get json() {
          return this.parsedJSON || (this.parsedJSON = JSON.parse(this.text));
        }
        get age() {
          let now = new Date();
          return now - this.loadedAt;
        }
        get expired() {
          return this.age > up.network.config.cacheExpireAge || this.request.expired;
        }
        get description() {
          return `HTTP ${this.status} response to ${this.request.description}`;
        }
      };

      /***/
    }, /* 76 */
    /***/() => {
      var _a;
      const u = up.util;
      const e = up.element;
      up.ResponseDoc = (_a = class ResponseDoc {
        constructor(options) {
          this.root = this.parseDocument(options) || this.parseFragment(options) || this.parseContent(options);
          if (!up.fragment.config.runScripts) {
            this.root.querySelectorAll('script').forEach(e => e.remove());
          }
          this.cspNonces = options.cspNonces;
          if (options.origin) {
            let originSelector = up.fragment.tryToTarget(options.origin);
            if (originSelector) {
              this.rediscoveredOrigin = this.select(originSelector);
            }
          }
        }
        parseDocument(options) {
          let document = this.parse(options.document, e.createBrokenDocumentFromHTML);
          if (document) {
            this.scriptishNeedFix = true;
            return document;
          }
        }
        parseContent(options) {
          let content = options.content || '';
          let target = options.target || up.fail("must pass a { target } when passing { content }");
          target = u.map(up.fragment.parseTargetSteps(target), 'selector').join(',');
          const matchingElement = e.createFromSelector(target);
          if (u.isString(content)) {
            matchingElement.innerHTML = content;
          } else {
            matchingElement.appendChild(content);
          }
          return matchingElement;
        }
        parseFragment(options) {
          return this.parse(options.fragment);
        }
        parse(value, parseFn = e.createFromHTML) {
          if (u.isString(value)) {
            value = parseFn(value);
          }
          return value;
        }
        rootSelector() {
          return up.fragment.toTarget(this.root);
        }
        getTitle() {
          return this.root.querySelector('head title')?.textContent;
        }
        select(selector) {
          let finder = new up.FragmentFinder({
            selector: selector,
            origin: this.rediscoveredOrigin,
            externalRoot: this.root
          });
          return finder.find();
        }
        selectSteps(steps) {
          return steps.filter(step => {
            step.newElement || (step.newElement = this.select(step.selector));
            if (step.newElement) {
              return true;
            } else if (!step.maybe) {
              throw new up.CannotMatch();
            }
          });
        }
        finalizeElement(element) {
          up.NonceableCallback.adoptNonces(element, this.cspNonces);
          if (this.scriptishNeedFix) {
            element.querySelectorAll('noscript, script').forEach(e.fixScriptish);
          }
        }
      }, (() => {
        u.memoizeMethod(_a.prototype, 'getTitle');
      })(), _a);

      /***/
    }, /* 77 */
    /***/() => {
      const e = up.element;
      const u = up.util;
      up.RevealMotion = class RevealMotion {
        constructor(element, options = {}) {
          this.element = element;
          this.options = options;
          this.viewport = e.get(this.options.viewport) || up.viewport.get(this.element);
          this.obstructionsLayer = up.layer.get(this.viewport);
          const viewportConfig = up.viewport.config;
          this.snap = this.options.snap ?? this.options.revealSnap ?? viewportConfig.revealSnap;
          this.padding = this.options.padding ?? this.options.revealPadding ?? viewportConfig.revealPadding;
          this.top = this.options.top ?? this.options.revealTop ?? viewportConfig.revealTop;
          this.max = this.options.max ?? this.options.revealMax ?? viewportConfig.revealMax;
          this.topObstructions = viewportConfig.fixedTop;
          this.bottomObstructions = viewportConfig.fixedBottom;
        }
        start() {
          const viewportRect = this.getViewportRect(this.viewport);
          const elementRect = up.Rect.fromElement(this.element);
          if (this.max) {
            const maxPixels = u.evalOption(this.max, this.element);
            elementRect.height = Math.min(elementRect.height, maxPixels);
          }
          this.addPadding(elementRect);
          this.substractObstructions(viewportRect);
          if (viewportRect.height < 0) {
            up.fail('Viewport has no visible area');
          }
          const originalScrollTop = this.viewport.scrollTop;
          let newScrollTop = originalScrollTop;
          if (this.top || elementRect.height > viewportRect.height) {
            const diff = elementRect.top - viewportRect.top;
            newScrollTop += diff;
          } else if (elementRect.top < viewportRect.top) {
            newScrollTop -= viewportRect.top - elementRect.top;
          } else if (elementRect.bottom > viewportRect.bottom) {
            newScrollTop += elementRect.bottom - viewportRect.bottom;
          } else ;
          if (u.isNumber(this.snap) && newScrollTop < this.snap && elementRect.top < 0.5 * viewportRect.height) {
            newScrollTop = 0;
          }
          if (newScrollTop !== originalScrollTop) {
            this.viewport.scrollTo({
              ...this.options,
              top: newScrollTop
            });
          }
        }
        getViewportRect() {
          if (up.viewport.isRoot(this.viewport)) {
            return new up.Rect({
              left: 0,
              top: 0,
              width: up.viewport.rootWidth(),
              height: up.viewport.rootHeight()
            });
          } else {
            return up.Rect.fromElement(this.viewport);
          }
        }
        addPadding(elementRect) {
          elementRect.top -= this.padding;
          elementRect.height += 2 * this.padding;
        }
        selectObstructions(selectors) {
          let elements = up.fragment.all(selectors.join(','), {
            layer: this.obstructionsLayer
          });
          return u.filter(elements, e.isVisible);
        }
        substractObstructions(viewportRect) {
          for (let obstruction of this.selectObstructions(this.topObstructions)) {
            let obstructionRect = up.Rect.fromElement(obstruction);
            let diff = obstructionRect.bottom - viewportRect.top;
            if (diff > 0) {
              viewportRect.top += diff;
              viewportRect.height -= diff;
            }
          }
          for (let obstruction of this.selectObstructions(this.bottomObstructions)) {
            let obstructionRect = up.Rect.fromElement(obstruction);
            let diff = viewportRect.bottom - obstructionRect.top;
            if (diff > 0) {
              viewportRect.height -= diff;
            }
          }
        }
      };

      /***/
    }, /* 78 */
    /***/() => {
      const u = up.util;
      up.Selector = class Selector {
        constructor(selectors, filters = []) {
          this.selectors = selectors;
          this.filters = filters;
          this.unionSelector = this.selectors.join(',') || 'match-none';
        }
        matches(element) {
          return element.matches(this.unionSelector) && this.passesFilter(element);
        }
        closest(element) {
          let parentElement;
          if (this.matches(element)) {
            return element;
          } else if (parentElement = element.parentElement) {
            return this.closest(parentElement);
          }
        }
        passesFilter(element) {
          return u.every(this.filters, filter => filter(element));
        }
        descendants(root) {
          const results = u.flatMap(this.selectors, selector => root.querySelectorAll(selector));
          return u.filter(results, element => this.passesFilter(element));
        }
        subtree(root) {
          const results = [];
          if (!(root instanceof Document) && this.matches(root)) {
            results.push(root);
          }
          results.push(...this.descendants(root));
          return results;
        }
      };

      /***/
    }, /* 79 */
    /***/() => {
      const u = up.util;
      const e = up.element;
      up.Tether = class Tether {
        constructor(options) {
          up.migrate.handleTetherOptions?.(options);
          this.anchor = options.anchor;
          this.align = options.align;
          this.position = options.position;
          this.alignAxis = this.position === 'top' || this.position === 'bottom' ? 'horizontal' : 'vertical';
          this.viewport = up.viewport.get(this.anchor);
          this.parent = this.viewport === e.root ? document.body : this.viewport;
          this.syncOnScroll = !this.viewport.contains(this.anchor.offsetParent);
        }
        start(element) {
          this.element = element;
          this.element.style.position = 'absolute';
          this.setOffset(0, 0);
          this.sync();
          this.changeEventSubscription('on');
        }
        stop() {
          this.changeEventSubscription('off');
        }
        changeEventSubscription(fn) {
          let doScheduleSync = this.scheduleSync.bind(this);
          up[fn](window, 'resize', doScheduleSync);
          if (this.syncOnScroll) {
            up[fn](this.viewport, 'scroll', doScheduleSync);
          }
        }
        scheduleSync() {
          clearTimeout(this.syncTimer);
          return this.syncTimer = u.task(this.sync.bind(this));
        }
        isDetached() {
          return !this.parent.isConnected || !this.anchor.isConnected;
        }
        sync() {
          const elementBox = this.element.getBoundingClientRect();
          const elementMargin = {
            top: e.styleNumber(this.element, 'marginTop'),
            right: e.styleNumber(this.element, 'marginRight'),
            bottom: e.styleNumber(this.element, 'marginBottom'),
            left: e.styleNumber(this.element, 'marginLeft')
          };
          const anchorBox = this.anchor.getBoundingClientRect();
          let left;
          let top;
          switch (this.alignAxis) {
            case 'horizontal':
              {
                switch (this.position) {
                  case 'top':
                    top = anchorBox.top - elementMargin.bottom - elementBox.height;
                    break;
                  case 'bottom':
                    top = anchorBox.top + anchorBox.height + elementMargin.top;
                    break;
                }
                switch (this.align) {
                  case 'left':
                    left = anchorBox.left + elementMargin.left;
                    break;
                  case 'center':
                    left = anchorBox.left + 0.5 * (anchorBox.width - elementBox.width);
                    break;
                  case 'right':
                    left = anchorBox.left + anchorBox.width - elementBox.width - elementMargin.right;
                    break;
                }
                break;
              }
            case 'vertical':
              {
                switch (this.align) {
                  case 'top':
                    top = anchorBox.top + elementMargin.top;
                    break;
                  case 'center':
                    top = anchorBox.top + 0.5 * (anchorBox.height - elementBox.height);
                    break;
                  case 'bottom':
                    top = anchorBox.top + anchorBox.height - elementBox.height - elementMargin.bottom;
                    break;
                }
                switch (this.position) {
                  case 'left':
                    left = anchorBox.left - elementMargin.right - elementBox.width;
                    break;
                  case 'right':
                    left = anchorBox.left + anchorBox.width + elementMargin.left;
                    break;
                }
                break;
              }
          }
          if (u.isDefined(left) || u.isDefined(top)) {
            this.moveTo(left, top);
          } else {
            up.fail('Invalid tether constraints: %o', this.describeConstraints());
          }
        }
        describeConstraints() {
          return {
            position: this.position,
            align: this.align
          };
        }
        moveTo(targetLeft, targetTop) {
          const elementBox = this.element.getBoundingClientRect();
          this.setOffset(targetLeft - elementBox.left + this.offsetLeft, targetTop - elementBox.top + this.offsetTop);
        }
        setOffset(left, top) {
          this.offsetLeft = left;
          this.offsetTop = top;
          e.setStyle(this.element, {
            left,
            top
          });
        }
      };

      /***/
    }, /* 80 */
    /***/() => {
      const u = up.util;
      up.URLPattern = class URLPattern {
        constructor(fullPattern, normalizeURL = u.normalizeURL) {
          this.normalizeURL = normalizeURL;
          this.groups = [];
          const positiveList = [];
          const negativeList = [];
          for (let pattern of u.parseTokens(fullPattern)) {
            if (pattern[0] === '-') {
              negativeList.push(pattern.substring(1));
            } else {
              positiveList.push(pattern);
            }
          }
          this.positiveRegexp = this.buildRegexp(positiveList, true);
          this.negativeRegexp = this.buildRegexp(negativeList, false);
        }
        buildRegexp(list, capture) {
          if (!list.length) {
            return;
          }
          list = list.map(url => {
            if (url[0] === '*') {
              url = '/' + url;
            }
            url = this.normalizeURL(url);
            url = u.escapeRegExp(url);
            return url;
          });
          let reCode = list.join('|');
          reCode = reCode.replace(/\\\*/g, '.*?');
          reCode = reCode.replace(/(:|\\\$)([a-z][\w-]*)/ig, (match, type, name) => {
            if (type === '\\$') {
              if (capture) {
                this.groups.push({
                  name,
                  cast: Number
                });
              }
              return '(\\d+)';
            } else {
              if (capture) {
                this.groups.push({
                  name,
                  cast: String
                });
              }
              return '([^/?#]+)';
            }
          });
          return new RegExp('^(?:' + reCode + ')$');
        }
        test(url, doNormalize = true) {
          if (doNormalize) {
            url = this.normalizeURL(url);
          }
          return this.positiveRegexp.test(url) && !this.isExcluded(url);
        }
        recognize(url, doNormalize = true) {
          if (doNormalize) {
            url = this.normalizeURL(url);
          }
          let match = this.positiveRegexp.exec(url);
          if (match && !this.isExcluded(url)) {
            const resolution = {};
            this.groups.forEach((group, groupIndex) => {
              let value = match[groupIndex + 1];
              if (value) {
                return resolution[group.name] = group.cast(value);
              }
            });
            return resolution;
          }
        }
        isExcluded(url) {
          return this.negativeRegexp?.test(url);
        }
      };

      /***/
    }, /* 81 */
    /***/() => {
      up.framework = function () {
        let readyState = 'evaling';
        function emitReset() {
          up.emit('up:framework:reset', {
            log: false
          });
        }
        function boot() {
          if (readyState !== 'configuring') {
            console.error('Unpoly has already booted');
            return;
          }
          let issue = supportIssue();
          if (!issue) {
            readyState = 'booting';
            up.emit('up:framework:boot', {
              log: false
            });
            readyState = 'booted';
            up.emit('up:framework:booted', {
              log: false
            });
          } else {
            console.error("Unpoly cannot boot: %s", issue);
          }
        }
        function mustBootManually() {
          let unpolyScript = document.currentScript;
          if (unpolyScript?.async) {
            return true;
          }
          if (unpolyScript?.getAttribute('up-boot') === 'manual') {
            return true;
          }
          if (document.readyState === 'complete') {
            return true;
          }
        }
        function onEvaled() {
          up.emit('up:framework:evaled', {
            log: false
          });
          if (mustBootManually()) {
            console.debug('Call up.boot() after you have configured Unpoly');
          } else {
            document.addEventListener('DOMContentLoaded', boot);
          }
          readyState = 'configuring';
        }
        function startExtension() {
          if (readyState !== 'configuring') {
            throw new Error('Unpoly extensions must be loaded before booting');
          }
          readyState = 'evaling';
        }
        function stopExtension() {
          readyState = 'configuring';
        }
        function isSupported() {
          return !supportIssue();
        }
        function supportIssue() {
          for (let feature of ['URL', 'Proxy', 'Promise', 'DOMParser', 'FormData']) {
            if (!window[feature]) {
              return `Browser doesn't support the ${feature} API`;
            }
          }
          if (document.compatMode === 'BackCompat') {
            return 'Browser is in quirks mode (missing DOCTYPE?)';
          }
        }
        return {
          onEvaled,
          boot,
          startExtension,
          stopExtension,
          reset: emitReset,
          get evaling() {
            return readyState === 'evaling';
          },
          get booted() {
            return readyState === 'booted';
          },
          get beforeBoot() {
            return readyState !== 'booting' && readyState !== 'booted';
          },
          isSupported
        };
      }();
      up.boot = up.framework.boot;

      /***/
    }, /* 82 */
    /***/() => {
      up.event = function () {
        const u = up.util;
        const e = up.element;
        function reset() {
          for (let globalElement of [window, document, e.root, document.body]) {
            for (let listener of up.EventListener.allNonDefault(globalElement)) {
              listener.unbind();
            }
          }
        }
        function on(...args) {
          return buildListenerGroup(args).bind();
        }
        function off(...args) {
          return buildListenerGroup(args).unbind();
        }
        function buildListenerGroup(args, options) {
          return up.EventListenerGroup.fromBindArgs(args, options);
        }
        function buildEmitter(args) {
          return up.EventEmitter.fromEmitArgs(args);
        }
        function emit(...args) {
          return buildEmitter(args).emit();
        }
        function build(...args) {
          const props = u.extractOptions(args);
          const type = args[0] || props.type || up.fail('Expected event type to be passed as string argument or { type } property');
          const event = document.createEvent('Event');
          event.initEvent(type, true, true);
          Object.assign(event, u.omit(props, ['type', 'target']));
          return event;
        }
        function assertEmitted(...args) {
          return buildEmitter(args).assertEmitted();
        }
        function onEscape(listener) {
          return on('keydown', function (event) {
            if (event.key === 'Escape') {
              return listener(event);
            }
          });
        }
        function halt(event, options = {}) {
          if (options.log) up.log.putsEvent(event);
          event.stopImmediatePropagation();
          event.preventDefault();
        }
        const keyModifiers = ['metaKey', 'shiftKey', 'ctrlKey', 'altKey'];
        function isUnmodified(event) {
          return (u.isUndefined(event.button) || event.button === 0) && !u.some(keyModifiers, modifier => event[modifier]);
        }
        function fork(originalEvent, newType, copyKeys = []) {
          const newEvent = up.event.build(newType, u.pick(originalEvent, copyKeys));
          newEvent.originalEvent = originalEvent;
          ['stopPropagation', 'stopImmediatePropagation', 'preventDefault'].forEach(function (key) {
            const originalMethod = newEvent[key];
            return newEvent[key] = function () {
              originalEvent[key]();
              return originalMethod.call(newEvent);
            };
          });
          if (originalEvent.defaultPrevented) {
            newEvent.preventDefault();
          }
          return newEvent;
        }
        function executeEmitAttr(event, element) {
          if (!isUnmodified(event)) {
            return;
          }
          const eventType = e.attr(element, 'up-emit');
          const eventProps = e.jsonAttr(element, 'up-emit-props');
          const forkedEvent = fork(event, eventType);
          Object.assign(forkedEvent, eventProps);
          up.emit(element, forkedEvent);
        }
        on('up:click', 'a[up-emit]', executeEmitAttr);
        on('up:framework:reset', reset);
        return {
          on,
          off,
          build,
          emit,
          assertEmitted,
          onEscape,
          halt,
          isUnmodified,
          fork,
          keyModifiers
        };
      }();
      up.on = up.event.on;
      up.off = up.event.off;
      up.emit = up.event.emit;

      /***/
    }, /* 83 */
    /***/() => {
      up.protocol = function () {
        const u = up.util;
        const e = up.element;
        const headerize = function (camel) {
          const header = camel.replace(/(^.|[A-Z])/g, char => '-' + char.toUpperCase());
          return 'X-Up' + header;
        };
        const extractHeader = function (xhr, shortHeader, parseFn = u.identity) {
          let value = xhr.getResponseHeader(headerize(shortHeader));
          if (value) {
            return parseFn(value);
          }
        };
        function targetFromXHR(xhr) {
          return extractHeader(xhr, 'target');
        }
        function parseModifyCacheValue(value) {
          if (value === 'false') {
            return false;
          } else {
            return value;
          }
        }
        function evictCacheFromXHR(xhr) {
          return extractHeader(xhr, 'evictCache', parseModifyCacheValue);
        }
        function expireCacheFromXHR(xhr) {
          return extractHeader(xhr, 'expireCache') || up.migrate.clearCacheFromXHR?.(xhr);
        }
        function contextFromXHR(xhr) {
          return extractHeader(xhr, 'context', JSON.parse);
        }
        function methodFromXHR(xhr) {
          return extractHeader(xhr, 'method', u.normalizeMethod);
        }
        function titleFromXHR(xhr) {
          return up.migrate.titleFromXHR?.(xhr) ?? extractHeader(xhr, 'title', JSON.parse);
        }
        function eventPlansFromXHR(xhr) {
          return extractHeader(xhr, 'events', JSON.parse);
        }
        function acceptLayerFromXHR(xhr) {
          return extractHeader(xhr, 'acceptLayer', JSON.parse);
        }
        function dismissLayerFromXHR(xhr) {
          return extractHeader(xhr, 'dismissLayer', JSON.parse);
        }
        const initialRequestMethod = u.memoize(function () {
          return u.normalizeMethod(up.browser.popCookie('_up_method'));
        });
        function locationFromXHR(xhr) {
          return extractHeader(xhr, 'location') || xhr.responseURL;
        }
        function influencingHeadersFromResponse(response) {
          let varyHeaderValue = response.header('Vary');
          return u.parseTokens(varyHeaderValue, {
            separator: 'comma'
          });
        }
        const config = new up.Config(() => ({
          methodParam: '_method',
          csrfParam() {
            return e.metaContent('csrf-param');
          },
          csrfToken() {
            return e.metaContent('csrf-token');
          },
          cspNonce() {
            return e.metaContent('csp-nonce');
          },
          csrfHeader: 'X-CSRF-Token',
          nonceableAttributes: ['up-watch', 'up-on-accepted', 'up-on-dismissed', 'up-on-loaded', 'up-on-rendered', 'up-on-finished', 'up-on-error', 'up-on-offlne']
        }));
        function csrfHeader() {
          return u.evalOption(config.csrfHeader);
        }
        function csrfParam() {
          return u.evalOption(config.csrfParam);
        }
        function csrfToken() {
          return u.evalOption(config.csrfToken);
        }
        function cspNonce() {
          return u.evalOption(config.cspNonce);
        }
        function cspNoncesFromHeader(cspHeader) {
          let nonces = [];
          if (cspHeader) {
            let parts = cspHeader.split(/\s*;\s*/);
            for (let part of parts) {
              if (part.indexOf('script-src') === 0) {
                let noncePattern = /'nonce-([^']+)'/g;
                let match;
                while (match = noncePattern.exec(part)) {
                  nonces.push(match[1]);
                }
              }
            }
          }
          return nonces;
        }
        function wrapMethod(method, params) {
          params.add(config.methodParam, method);
          return 'POST';
        }
        function reset() {
          config.reset();
        }
        up.on('up:framework:reset', reset);
        return {
          config,
          reset,
          locationFromXHR,
          titleFromXHR,
          targetFromXHR,
          methodFromXHR,
          acceptLayerFromXHR,
          contextFromXHR,
          dismissLayerFromXHR,
          eventPlansFromXHR,
          expireCacheFromXHR,
          evictCacheFromXHR,
          csrfHeader,
          csrfParam,
          csrfToken,
          cspNonce,
          initialRequestMethod,
          headerize,
          wrapMethod,
          cspNoncesFromHeader,
          influencingHeadersFromResponse
        };
      }();

      /***/
    }, /* 84 */
    /***/() => {
      up.log = function () {
        const u = up.util;
        const config = new up.LogConfig();
        function reset() {
          config.reset();
        }
        function printToStandard(...args) {
          if (config.enabled) {
            printToStream('log', ...args);
          }
        }
        const printToWarn = (...args) => printToStream('warn', ...args);
        const printToError = (...args) => printToStream('error', ...args);
        function printToStream(stream, trace, message, ...args) {
          printToStreamStyled(stream, trace, '', message, ...args);
        }
        function printToStreamStyled(stream, trace, customStyles, message, ...args) {
          if (message) {
            if (config.format) {
              console[stream](`%c${trace}%c ${message}`, 'color: #666666; padding: 1px 3px; border: 1px solid #bbbbbb; border-radius: 2px; font-size: 90%; display: inline-block;' + customStyles, '', ...args);
            } else {
              console[stream](`[${trace}] ${u.sprintf(message, ...args)}`);
            }
          }
        }
        function printUserEvent(event) {
          if (config.enabled) {
            event = event.originalEvent || event;
            let color = '#5566cc';
            printToStreamStyled('log', event.type, `color: white; border-color: ${color}; background-color: ${color}`, 'Interaction on %o', event.target);
          }
        }
        function printBanner() {
          if (!config.banner) {
            return;
          }
          const logo = " __ _____  ___  ___  / /_ __\n" + `/ // / _ \\/ _ \\/ _ \\/ / // /  ${up.version}\n` + "\\___/_//_/ .__/\\___/_/\\_. / \n" + "        / /            / /\n\n";
          let text = "";
          if (!up.migrate.loaded) {
            text += "Load unpoly-migrate.js to enable deprecated APIs.\n\n";
          }
          if (config.enabled) {
            text += "Call `up.log.disable()` to disable logging for this session.";
          } else {
            text += "Call `up.log.enable()` to enable logging for this session.";
          }
          const color = 'color: #777777';
          if (config.format) {
            console.log('%c' + logo + '%c' + text, 'font-family: monospace;' + color, color);
          } else {
            console.log(logo + text);
          }
        }
        up.on('up:framework:boot', printBanner);
        up.on('up:framework:reset', reset);
        function enable() {
          config.enabled = true;
        }
        function disable() {
          config.enabled = false;
        }
        return {
          puts: printToStandard,
          putsEvent: printUserEvent,
          error: printToError,
          warn: printToWarn,
          config,
          enable,
          disable
        };
      }();
      up.puts = up.log.puts;
      up.warn = up.log.warn;

      /***/
    }, /* 85 */
    /***/() => {
      up.syntax = function () {
        const u = up.util;
        const SYSTEM_MACRO_PRIORITIES = {
          '[up-back]': -100,
          '[up-content]': -200,
          '[up-drawer]': -200,
          '[up-modal]': -200,
          '[up-cover]': -200,
          '[up-popup]': -200,
          '[up-tooltip]': -200,
          '[up-dash]': -200,
          '[up-expand]': -300,
          '[data-method]': -400,
          '[data-confirm]': -400
        };
        let registeredCompilers = [];
        let registeredMacros = [];
        function registerCompiler(...args) {
          const compiler = buildCompiler(args);
          return insertCompiler(registeredCompilers, compiler);
        }
        function registerMacro(...args) {
          const macro = buildCompiler(args);
          if (up.framework.evaling) {
            macro.priority || (macro.priority = detectSystemMacroPriority(macro.selector) || up.fail('Unregistered priority for system macro %o', macro.selector));
          }
          return insertCompiler(registeredMacros, macro);
        }
        function detectSystemMacroPriority(macroSelector) {
          macroSelector = u.evalOption(macroSelector);
          for (let substr in SYSTEM_MACRO_PRIORITIES) {
            const priority = SYSTEM_MACRO_PRIORITIES[substr];
            if (macroSelector.indexOf(substr) >= 0) {
              return priority;
            }
          }
        }
        const parseCompilerArgs = function (args) {
          const defaults = u.extractOptions(args);
          const selector = args.shift();
          const callback = args.pop();
          const options = {
            ...defaults,
            ...u.extractOptions(args)
          };
          return [selector, options, callback];
        };
        function buildCompiler(args) {
          let [selector, options, callback] = parseCompilerArgs(args);
          options = u.options(options, {
            selector,
            isDefault: up.framework.evaling,
            priority: 0,
            batch: false
          });
          return Object.assign(callback, options);
        }
        function insertCompiler(queue, newCompiler) {
          let existingCompiler;
          let index = 0;
          while ((existingCompiler = queue[index]) && existingCompiler.priority >= newCompiler.priority) {
            index += 1;
          }
          queue.splice(index, 0, newCompiler);
          if (up.framework.booted) {
            if (newCompiler.priority === 0) {
              for (let layer of up.layer.stack) {
                compile(layer.element, {
                  layer,
                  compilers: [newCompiler]
                });
              }
            } else {
              up.puts('up.compiler()', 'Compiler %s was registered after booting Unpoly. Compiler will run for future fragments only.', newCompiler.selector);
            }
          }
          return newCompiler;
        }
        function compile(fragment, options) {
          let compilers = options.compilers || registeredMacros.concat(registeredCompilers);
          const pass = new up.CompilerPass(fragment, compilers, options);
          pass.run();
        }
        function registerDestructor(element, destructor) {
          let destructors = element.upDestructors;
          if (!destructors) {
            destructors = [];
            element.upDestructors = destructors;
            element.classList.add('up-can-clean');
          }
          if (u.isArray(destructor)) {
            destructors.push(...destructor);
          } else {
            destructors.push(destructor);
          }
        }
        function hello(element, options = {}) {
          element = up.fragment.get(element, options);
          up.puts('up.hello()', "Compiling fragment %o", element);
          compile(element, options);
          up.fragment.emitInserted(element);
          return element;
        }
        function clean(fragment, options = {}) {
          new up.DestructorPass(fragment, options).run();
        }
        function readData(element) {
          element = up.fragment.get(element);
          return element.upData || (element.upData = buildData(element));
        }
        function buildData(element) {
          if (!element.getAttribute) {
            return {};
          }
          let rawJSON = element.getAttribute('up-data');
          let parsedJSON;
          if (rawJSON) {
            parsedJSON = JSON.parse(rawJSON);
            if (!u.isOptions(parsedJSON)) {
              return parsedJSON;
            }
          }
          return {
            ...element.dataset,
            ...parsedJSON,
            ...element.upCompileData
          };
        }
        function reset() {
          registeredCompilers = u.filter(registeredCompilers, 'isDefault');
          registeredMacros = u.filter(registeredMacros, 'isDefault');
        }
        up.on('up:framework:reset', reset);
        return {
          compiler: registerCompiler,
          macro: registerMacro,
          destructor: registerDestructor,
          hello,
          clean,
          data: readData
        };
      }();
      up.compiler = up.syntax.compiler;
      up.destructor = up.syntax.destructor;
      up.macro = up.syntax.macro;
      up.data = up.syntax.data;
      up.hello = up.syntax.hello;

      /***/
    }, /* 86 */
    /***/() => {
      up.history = function () {
        const u = up.util;
        const e = up.element;
        const config = new up.Config(() => ({
          enabled: true,
          restoreTargets: ['body']
        }));
        let previousLocation;
        let nextPreviousLocation;
        function reset() {
          config.reset();
          previousLocation = undefined;
          nextPreviousLocation = undefined;
          trackCurrentLocation();
        }
        const DEFAULT_NORMALIZE_OPTIONS = {
          hash: true
        };
        function normalizeURL(url, options) {
          options = u.merge(DEFAULT_NORMALIZE_OPTIONS, options);
          return u.normalizeURL(url, options);
        }
        function currentLocation(normalizeOptions) {
          return normalizeURL(location.href, normalizeOptions);
        }
        function trackCurrentLocation() {
          const url = currentLocation();
          if (nextPreviousLocation !== url) {
            previousLocation = nextPreviousLocation;
            nextPreviousLocation = url;
          }
        }
        trackCurrentLocation();
        const ADDITIONAL_NORMALIZE_OPTIONS_FOR_COMPARISON = {
          trailingSlash: false
        };
        function isLocation(url, options) {
          options = u.merge(ADDITIONAL_NORMALIZE_OPTIONS_FOR_COMPARISON, options);
          return normalizeURL(url, options) === currentLocation(options);
        }
        function replace(location, options = {}) {
          location = normalizeURL(location);
          if (manipulate('replaceState', location) && options.event !== false) {
            emitLocationChanged({
              location,
              reason: 'replace',
              log: `Replaced state for ${location}`
            });
          }
        }
        function push(location) {
          location = normalizeURL(location);
          if (!isLocation(location) && manipulate('pushState', location)) {
            emitLocationChanged({
              location,
              reason: 'push',
              log: `Advanced to location ${location}`
            });
          }
        }
        function emitLocationChanged(props) {
          let event = up.event.build('up:location:changed', props);
          up.migrate?.renamedProperty?.(event, 'url', 'location');
          up.emit(event);
        }
        function manipulate(method, url) {
          if (config.enabled) {
            const state = buildState();
            window.history[method](state, '', url);
            trackCurrentLocation();
            return true;
          }
        }
        function buildState() {
          return {
            up: {}
          };
        }
        function restoreStateOnPop(state) {
          if (!state?.up) {
            up.puts('popstate', 'Ignoring a history state not owned by Unpoly');
            return;
          }
          let location = currentLocation();
          if (up.emit('up:location:restore', {
            location,
            log: `Restoring location ${location}`
          }).defaultPrevented) {
            return;
          }
          up.render({
            url: location,
            target: config.restoreTargets,
            fail: false,
            history: true,
            location,
            peel: true,
            layer: 'root',
            cache: true,
            saveScroll: false,
            scroll: ['restore', 'auto'],
            saveFocus: false,
            focus: ['restore', 'auto']
          });
        }
        function onPop(event) {
          trackCurrentLocation();
          let location = currentLocation();
          emitLocationChanged({
            location,
            reason: 'pop',
            log: `Navigated to history entry ${location}`
          });
          up.viewport.saveFocus({
            location: previousLocation
          });
          up.viewport.saveScroll({
            location: previousLocation
          });
          restoreStateOnPop(event.state);
        }
        function register() {
          window.addEventListener('popstate', onPop);
          if (up.protocol.initialRequestMethod() === 'GET') {
            replace(currentLocation(), {
              event: false
            });
          }
        }
        up.on('up:framework:boot', function () {
          if ('jasmine' in window) {
            register();
          } else {
            setTimeout(register, 100);
          }
        });
        up.macro('a[up-back], [up-href][up-back]', function (link) {
          if (previousLocation) {
            e.setMissingAttrs(link, {
              'up-href': previousLocation,
              'up-scroll': 'restore'
            });
            link.removeAttribute('up-back');
            up.link.makeFollowable(link);
          }
        });
        up.on('up:framework:reset', reset);
        return {
          config,
          push,
          replace,
          get location() {
            return currentLocation();
          },
          get previousLocation() {
            return previousLocation;
          },
          normalizeURL,
          isLocation
        };
      }();

      /***/
    }, /* 87 */
    /***/(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      __webpack_require__(88);
      const u = up.util;
      const e = up.element;
      up.fragment = function () {
        function upTagName(element) {
          let tagName = e.tagName(element);
          if (tagName.startsWith('up-')) {
            return tagName;
          }
        }
        const config = new up.Config(() => ({
          badTargetClasses: [/^up-/],
          targetDerivers: ['[up-id]', '[id]', 'html', 'head', 'body', 'main', '[up-main]', upTagName, 'link[rel][type]', 'link[rel=preload][href]', 'link[rel=preconnect][href]', 'link[rel=prefetch][href]', 'link[rel]', 'meta[property]', '*[name]', 'form[action]', 'a[href]', '[class]', 'form'],
          verifyDerivedTarget: true,
          navigateOptions: {
            cache: 'auto',
            revalidate: 'auto',
            feedback: true,
            fallback: true,
            focus: 'auto',
            scroll: 'auto',
            history: 'auto',
            peel: true
          },
          matchAroundOrigin: true,
          runScripts: true,
          autoHistoryTargets: [':main'],
          autoFocus: ['hash', 'autofocus', 'main-if-main', 'keep', 'target-if-lost'],
          autoScroll: ['hash', 'layer-if-main'],
          autoRevalidate: response => response.expired,
          skipResponse: defaultSkipResponse
        }));
        u.delegate(config, ['mainTargets'], () => up.layer.config.any);
        function reset() {
          config.reset();
        }
        function defaultSkipResponse({
          response,
          expiredResponse
        }) {
          return !response.text || response.text === expiredResponse?.text;
        }
        function sourceOf(element, options = {}) {
          element = getSmart(element, options);
          return e.closestAttr(element, 'up-source');
        }
        function timeOf(element) {
          let value = e.closestAttr(element, 'up-time');
          if (value && value !== 'false') {
            if (/^\d+$/.test(value)) {
              value = Number(value) * 1000;
            }
            return new Date(value);
          }
        }
        function etagOf(element) {
          let value = e.closestAttr(element, 'up-etag');
          if (value && value !== 'false') {
            return value;
          }
        }
        const render = up.mockable((...args) => {
          let options = parseTargetAndOptions(args);
          return new up.RenderJob(options);
        });
        const navigate = up.mockable((...args) => {
          const options = parseTargetAndOptions(args);
          return render({
            ...options,
            navigate: true
          });
        });
        function emitFragmentInserted(element) {
          return up.emit(element, 'up:fragment:inserted', {
            log: ['Inserted fragment %o', element]
          });
        }
        function emitFragmentKeep(keepPlan) {
          const log = ['Keeping fragment %o', keepPlan.oldElement];
          const callback = e.callbackAttr(keepPlan.oldElement, 'up-on-keep', {
            exposedKeys: ['newFragment', 'newData']
          });
          return emitFromKeepPlan(keepPlan, 'up:fragment:keep', {
            log,
            callback
          });
        }
        function emitFromKeepPlan(keepPlan, eventType, emitDetails) {
          const keepable = keepPlan.oldElement;
          const event = up.event.build(eventType, {
            newFragment: keepPlan.newElement,
            newData: keepPlan.newData
          });
          return up.emit(keepable, event, emitDetails);
        }
        function emitFragmentDestroyed(fragment, options) {
          const log = options.log ?? ['Destroyed fragment %o', fragment];
          const parent = options.parent || document;
          return up.emit(parent, 'up:fragment:destroyed', {
            fragment,
            parent,
            log
          });
        }
        function isNotDestroying(element) {
          return !element.closest('.up-destroying');
        }
        function isAlive(fragment) {
          return fragment.isConnected && isNotDestroying(fragment);
        }
        function getSmart(...args) {
          const options = u.extractOptions(args);
          const selector = args.pop();
          const root = args[0];
          if (u.isElementish(selector)) {
            return e.get(selector);
          }
          if (root) {
            return getDumb(root, selector, options);
          }
          return new up.FragmentFinder({
            selector,
            origin: options.origin,
            layer: options.layer
          }).find();
        }
        function getDumb(...args) {
          return getAll(...args)[0];
        }
        const CSS_HAS_SUFFIX_PATTERN = /:has\(([^)]+)\)$/;
        function getAll(...args) {
          const options = u.extractOptions(args);
          let selectorString = args.pop();
          const root = args[0];
          if (u.isElement(selectorString)) {
            return [selectorString];
          }
          if (u.isList(selectorString)) {
            return selectorString;
          }
          let selector = buildSelector(selectorString, root, options);
          return selector.descendants(root || document);
        }
        function getSubtree(element, selector, options = {}) {
          selector = buildSelector(selector, element, options);
          return selector.subtree(element);
        }
        function contains(root, selectorOrElement) {
          if (u.isElement(selectorOrElement)) {
            return e.contains(root, selectorOrElement) && up.layer.get(root).contains(selectorOrElement);
          } else {
            return getSubtree(root, selectorOrElement).length > 0;
          }
        }
        function closest(element, selector, options) {
          element = e.get(element);
          selector = buildSelector(selector, element, options);
          return selector.closest(element);
        }
        function destroy(...args) {
          const options = parseTargetAndOptions(args);
          if (options.element = getSmart(options.target, options)) {
            new up.Change.DestroyFragment(options).execute();
          }
          return up.migrate.formerlyAsync?.('up.destroy()');
        }
        function parseTargetAndOptions(args) {
          const options = u.parseArgIntoOptions(args, 'target');
          if (u.isElement(options.target)) {
            options.origin || (options.origin = options.target);
          }
          return options;
        }
        function markFragmentAsDestroying(element) {
          element.classList.add('up-destroying');
          element.setAttribute('aria-hidden', 'true');
        }
        function reload(...args) {
          const options = parseTargetAndOptions(args);
          options.target || (options.target = ':main');
          const element = getSmart(options.target, options);
          options.url || (options.url = sourceOf(element));
          options.headers = u.merge(options.headers, conditionalHeaders(element));
          if (options.keepData || e.booleanAttr(element, 'up-keep-data')) {
            options.data = up.data(element);
          }
          up.migrate.postprocessReloadOptions?.(options);
          return render(options);
        }
        function conditionalHeaders(element) {
          let headers = {};
          let time = timeOf(element);
          if (time) {
            headers['If-Modified-Since'] = time.toUTCString();
          }
          let etag = etagOf(element);
          if (etag) {
            headers['If-None-Match'] = etag;
          }
          return headers;
        }
        function visit(url, options) {
          return navigate({
            ...options,
            url
          });
        }
        const KEY_PATTERN = /^(onFail|on|fail)?(.+)$/;
        function successKey(key) {
          let match = KEY_PATTERN.exec(key);
          if (match) {
            let [_, prefix, suffix] = match;
            switch (prefix) {
              case 'onFail':
                return 'on' + u.upperCaseFirst(suffix);
              case 'fail':
                return u.lowerCaseFirst(suffix);
            }
          }
        }
        function failKey(key) {
          let match = KEY_PATTERN.exec(key);
          if (match) {
            let [_, prefix, suffix] = match;
            switch (prefix) {
              case 'on':
                return 'onFail' + u.upperCaseFirst(suffix);
              case undefined:
                return 'fail' + u.upperCaseFirst(suffix);
            }
          }
        }
        function toTarget(element, options) {
          return u.presence(element, u.isString) || tryToTarget(element, options) || cannotTarget(element);
        }
        function isTargetable(element) {
          return !!tryToTarget(element);
        }
        function untargetableMessage(element) {
          return `Cannot derive good target selector from a <${e.tagName(element)}> element without identifying attributes. Try setting an [id] or configure up.fragment.config.targetDerivers.`;
        }
        function cannotTarget(element) {
          throw new up.CannotTarget(untargetableMessage(element));
        }
        function tryToTarget(element, options) {
          return u.findResult(config.targetDerivers, function (deriver) {
            let target = deriveTarget(element, deriver);
            if (target && isGoodTarget(target, element, options)) {
              return target;
            }
          });
        }
        function deriveTarget(element, deriver) {
          if (u.isFunction(deriver)) {
            return deriver(element);
          } else if (element.matches(deriver)) {
            try {
              return deriveTargetFromPattern(element, deriver);
            } catch (e) {
              if (e instanceof up.CannotParse) {
                return deriver;
              } else {
                throw e;
              }
            }
          }
        }
        function deriveTargetFromPattern(element, deriver) {
          let {
            includePath,
            excludeRaw
          } = up.element.parseSelector(deriver);
          if (includePath.length !== 1) {
            throw new up.CannotParse(deriver);
          }
          let {
            tagName,
            id,
            classNames,
            attributes
          } = includePath[0];
          let result = '';
          if (tagName === '*') {
            result += e.tagName(element);
          } else if (tagName) {
            result += tagName;
          }
          for (let className of classNames) {
            result += e.classSelector(className);
          }
          if (id) {
            result += e.idSelector(id);
          }
          for (let attributeName in attributes) {
            let attributeValue = attributes[attributeName] || element.getAttribute(attributeName);
            if (attributeName === 'id') {
              result += e.idSelector(attributeValue);
            } else if (attributeName === 'class') {
              for (let goodClass of goodClassesForTarget(element)) {
                result += e.classSelector(goodClass);
              }
            } else {
              result += e.attrSelector(attributeName, attributeValue);
            }
          }
          if (excludeRaw) {
            result += excludeRaw;
          }
          return result;
        }
        function isGoodTarget(target, element, options = {}) {
          return !element.isConnected || !config.verifyDerivedTarget || up.fragment.get(target, {
            layer: element,
            ...options
          }) === element;
        }
        function matchesPattern(pattern, str) {
          if (u.isRegExp(pattern)) {
            return pattern.test(str);
          } else {
            return pattern === str;
          }
        }
        function goodClassesForTarget(element) {
          let isGood = klass => !u.some(config.badTargetClasses, badTargetClass => matchesPattern(badTargetClass, klass));
          return u.filter(element.classList, isGood);
        }
        function modernResolveOrigin(target, {
          origin
        } = {}) {
          return target.replace(/:origin\b/, function (match) {
            if (origin) {
              return toTarget(origin);
            } else {
              up.fail('Missing { origin } element to resolve "%s" reference (found in %s)', match, target);
            }
          });
        }
        function resolveOrigin(...args) {
          return (up.migrate.resolveOrigin || modernResolveOrigin)(...args);
        }
        function expandTargets(targets, options = {}) {
          const {
            layer
          } = options;
          if (layer !== 'new' && !(layer instanceof up.Layer)) {
            up.fail('Must pass an up.Layer as { layer } option, but got %o', layer);
          }
          targets = u.copy(u.wrapList(targets));
          const expanded = [];
          while (targets.length) {
            const target = targets.shift();
            if (target === ':main' || target === true) {
              const mode = layer === 'new' ? options.mode : layer.mode;
              targets.unshift(...up.layer.mainTargets(mode));
            } else if (target === ':layer') {
              if (layer !== 'new' && !layer.opening) {
                targets.unshift(layer.getFirstSwappableElement());
              }
            } else if (u.isElementish(target)) {
              expanded.push(toTarget(target, options));
            } else if (u.isString(target)) {
              expanded.push(resolveOrigin(target, options));
            } else ;
          }
          return u.uniq(expanded);
        }
        function buildSelector(selector, element, options = {}) {
          const filters = [];
          if (!options.destroying) {
            filters.push(isNotDestroying);
          }
          let elementOutsideDocumentGiven = element && !document.contains(element);
          let expandTargetLayer;
          if (elementOutsideDocumentGiven || options.layer === 'any') {
            expandTargetLayer = up.layer.root;
          } else {
            options.layer ?? (options.layer = element);
            const layers = up.layer.getAll(options);
            filters.push(match => u.some(layers, layer => layer.contains(match)));
            expandTargetLayer = layers[0];
          }
          let expandedTargets = up.fragment.expandTargets(selector, {
            ...options,
            layer: expandTargetLayer
          });
          expandedTargets = expandedTargets.map(function (target) {
            target = target.replace(CSS_HAS_SUFFIX_PATTERN, function (match, descendantSelector) {
              filters.push(element => element.querySelector(descendantSelector));
              return '';
            });
            return target || '*';
          });
          return new up.Selector(expandedTargets, filters);
        }
        function splitTarget(target) {
          return u.parseTokens(target, {
            separator: 'comma'
          });
        }
        function parseTargetSteps(target, options = {}) {
          let defaultPlacement = options.defaultPlacement || 'swap';
          let steps = [];
          let simpleSelectors = splitTarget(target);
          for (let selector of simpleSelectors) {
            if (selector === ':none') continue;
            let placement = defaultPlacement;
            let maybe = false;
            selector = selector.replace(/\b::?(before|after)\b/, (_match, customPlacement) => {
              placement = customPlacement;
              return '';
            });
            selector = selector.replace(/\b:maybe\b/, () => {
              maybe = true;
              return '';
            });
            const step = {
              ...options,
              selector,
              placement,
              maybe
            };
            steps.push(step);
          }
          return steps;
        }
        function hasAutoHistory(fragment) {
          if (contains(fragment, config.autoHistoryTargets)) {
            return true;
          } else {
            up.puts('up.render()', "Will not auto-update history because fragment doesn't contain a selector from up.fragment.config.autoHistoryTargets");
            return false;
          }
        }
        function matches(element, selector, options = {}) {
          element = e.get(element);
          if (u.isElement(selector)) {
            let target = tryToTarget(selector);
            return target && element.matches(target);
          } else {
            selector = buildSelector(selector, element, options);
            return selector.matches(element);
          }
        }
        function shouldRevalidate(request, response, options = {}) {
          return request.fromCache && u.evalAutoOption(options.revalidate, config.autoRevalidate, response);
        }
        function targetForSteps(steps) {
          return u.map(steps, 'selector').join(', ') || ':none';
        }
        function isContainedByRivalStep(steps, candidateStep) {
          return u.some(steps, function (rivalStep) {
            return rivalStep !== candidateStep && (rivalStep.placement === 'swap' || rivalStep.placement === 'content') && rivalStep.oldElement.contains(candidateStep.oldElement);
          });
        }
        function compressNestedSteps(steps) {
          let compressed = u.uniqBy(steps, 'oldElement');
          compressed = u.reject(compressed, step => isContainedByRivalStep(compressed, step));
          return compressed;
        }
        function abort(...args) {
          let options = parseTargetAndOptions(args);
          let testFn;
          let {
            reason
          } = options;
          let elements;
          if (options.target) {
            elements = getAll(options.target, options);
            testFn = request => request.isPartOfSubtree(elements);
            reason || (reason = 'Aborting requests within fragment');
          } else {
            let layers = up.layer.getAll(options);
            elements = u.map(layers, 'element');
            testFn = request => u.contains(layers, request.layer);
            reason || (reason = 'Aborting requests within ' + layers.join(', '));
          }
          let testFnWithAbortable = request => request.abortable && testFn(request);
          up.network.abort(testFnWithAbortable, {
            ...options,
            reason
          });
          for (let element of elements) {
            up.emit(element, 'up:fragment:aborted', {
              log: false
            });
          }
        }
        function onAborted(fragment, ...args) {
          let callback = u.extractCallback(args);
          let options = u.extractOptions(args);
          let guard = event => event.target.contains(fragment) || options.around && fragment.contains(event.target);
          let unsubscribe = up.on('up:fragment:aborted', {
            guard
          }, callback);
          up.destructor(fragment, unsubscribe);
          return unsubscribe;
        }
        up.on('up:framework:boot', function () {
          const {
            documentElement
          } = document;
          documentElement.setAttribute('up-source', u.normalizeURL(location.href, {
            hash: false
          }));
          up.hello(documentElement);
          if (!up.browser.canPushState()) {
            return up.warn('Cannot push history changes. Next fragment update will load in a new page.');
          }
        });
        up.on('up:framework:reset', reset);
        return {
          config,
          reload,
          destroy,
          render,
          navigate,
          get: getSmart,
          getDumb,
          all: getAll,
          subtree: getSubtree,
          contains,
          closest,
          source: sourceOf,
          visit,
          markAsDestroying: markFragmentAsDestroying,
          emitInserted: emitFragmentInserted,
          emitDestroyed: emitFragmentDestroyed,
          emitKeep: emitFragmentKeep,
          successKey,
          failKey,
          expandTargets,
          resolveOrigin,
          toTarget,
          tryToTarget,
          isTargetable,
          matches,
          hasAutoHistory,
          time: timeOf,
          etag: etagOf,
          shouldRevalidate,
          abort,
          onAborted,
          splitTarget,
          parseTargetSteps,
          isAlive,
          targetForSteps,
          compressNestedSteps
        };
      }();
      up.reload = up.fragment.reload;
      up.destroy = up.fragment.destroy;
      up.render = up.fragment.render;
      up.navigate = up.fragment.navigate;
      up.visit = up.fragment.visit;
      u.delegate(up, ['context'], () => up.layer.current);

      /***/
    }, /* 88 */
    /***/(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      // extracted by mini-css-extract-plugin

      /***/
    }, /* 89 */
    /***/(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      __webpack_require__(90);
      up.viewport = function () {
        const u = up.util;
        const e = up.element;
        const f = up.fragment;
        const config = new up.Config(() => ({
          viewportSelectors: ['[up-viewport]', '[up-fixed]'],
          fixedTop: ['[up-fixed~=top]'],
          fixedBottom: ['[up-fixed~=bottom]'],
          anchoredRight: ['[up-anchored~=right]', '[up-fixed~=top]', '[up-fixed~=bottom]', '[up-fixed~=right]'],
          revealSnap: 200,
          revealPadding: 0,
          revealTop: false,
          revealMax() {
            return 0.5 * window.innerHeight;
          }
        }));
        function reset() {
          config.reset();
        }
        function anchoredRight() {
          const selector = config.anchoredRight.join(',');
          return f.all(selector, {
            layer: 'root'
          });
        }
        function reveal(element, options) {
          options = u.options(options);
          element = f.get(element, options);
          if (!(options.layer = up.layer.get(element))) {
            up.fail('Cannot reveal a detached element');
          }
          if (options.peel) {
            options.layer.peel();
          }
          const motion = new up.RevealMotion(element, options);
          motion.start();
          return up.migrate.formerlyAsync?.('up.reveal()') || true;
        }
        function doFocus(element, options = {}) {
          if (options.force) {
            makeFocusable(element);
          }
          element.focus({
            preventScroll: true
          });
          if (!options.preventScroll) {
            return reveal(element);
          }
        }
        function tryFocus(element, options) {
          doFocus(element, options);
          return element === document.activeElement;
        }
        function makeFocusable(element) {
          if (!element.hasAttribute('tabindex') && element.tabIndex === -1) {
            element.setAttribute('tabindex', '-1');
            element.classList.add('up-focusable-content');
          }
        }
        function revealHash(hash = location.hash, options) {
          let match = firstHashTarget(hash, options);
          if (match) {
            return up.reveal(match, {
              top: true
            });
          }
        }
        function allSelector() {
          return [rootSelector(), ...config.viewportSelectors].join(',');
        }
        function closest(target, options = {}) {
          const element = f.get(target, options);
          return element.closest(allSelector());
        }
        function getSubtree(element, options = {}) {
          element = f.get(element, options);
          return e.subtree(element, allSelector());
        }
        function getAround(element, options = {}) {
          element = f.get(element, options);
          return e.around(element, allSelector());
        }
        function getAll(options = {}) {
          return f.all(allSelector(), options);
        }
        function rootSelector() {
          return getRoot().tagName;
        }
        function getRoot() {
          return document.scrollingElement;
        }
        function rootWidth() {
          return e.root.clientWidth;
        }
        function rootHeight() {
          return e.root.clientHeight;
        }
        function isRoot(element) {
          return element === getRoot();
        }
        function rootHasReducedWidthFromScrollbar() {
          return window.innerWidth > document.documentElement.offsetWidth;
        }
        function rootOverflowElement() {
          const {
            body
          } = document;
          const html = document.documentElement;
          const element = u.find([html, body], wasChosenAsOverflowingElement);
          return element || getRoot();
        }
        function wasChosenAsOverflowingElement(element) {
          const overflowY = e.style(element, 'overflow-y');
          return overflowY === 'auto' || overflowY === 'scroll';
        }
        const scrollbarWidth = u.memoize(function () {
          const outerStyle = {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100px',
            height: '100px',
            overflowY: 'scroll'
          };
          const outer = up.element.affix(document.body, '[up-viewport]', {
            style: outerStyle
          });
          const width = outer.offsetWidth - outer.clientWidth;
          outer.remove();
          return width;
        });
        function scrollTopKey(viewport) {
          return up.fragment.tryToTarget(viewport);
        }
        function fixedElements(root = document) {
          const queryParts = ['[up-fixed]'].concat(config.fixedTop).concat(config.fixedBottom);
          return root.querySelectorAll(queryParts.join(','));
        }
        function saveScroll(...args) {
          const [viewports, options] = parseOptions(args);
          const location = options.location || options.layer.location;
          if (location) {
            const tops = getScrollTopsForSave(viewports);
            options.layer.lastScrollTops.set(location, tops);
          }
        }
        function getScrollTopsForSave(viewports) {
          let tops = {};
          for (let viewport of viewports) {
            let key = scrollTopKey(viewport);
            if (key) {
              tops[key] = viewport.scrollTop;
            } else {
              up.warn('up.viewport.saveScroll()', 'Cannot save scroll positions for untargetable viewport %o', viewport);
            }
          }
          return tops;
        }
        function restoreScroll(...args) {
          const [viewports, options] = parseOptions(args);
          const {
            location
          } = options.layer;
          const locationScrollTops = options.layer.lastScrollTops.get(location);
          if (locationScrollTops) {
            setScrollTops(viewports, locationScrollTops);
            up.puts('up.viewport.restoreScroll()', 'Restored scroll positions to %o', locationScrollTops);
            return true;
          } else {
            return false;
          }
        }
        function saveFocus(options = {}) {
          const layer = up.layer.get(options);
          const location = options.location || layer.location;
          if (location) {
            const focusCapsule = up.FocusCapsule.preserve(layer);
            layer.lastFocusCapsules.set(location, focusCapsule);
          }
        }
        function restoreFocus(options = {}) {
          const layer = up.layer.get(options);
          const location = options.location || layer.location;
          const locationCapsule = options.layer.lastFocusCapsules.get(location);
          if (locationCapsule && locationCapsule.restore(layer)) {
            up.puts('up.viewport.restoreFocus()', 'Restored focus to "%s"', locationCapsule.target);
            return true;
          } else {
            return false;
          }
        }
        function newStateCache() {
          return new up.FIFOCache({
            capacity: 30,
            normalizeKey: up.history.normalizeURL
          });
        }
        function parseOptions(args) {
          const options = u.copy(u.extractOptions(args));
          options.layer = up.layer.get(options);
          let viewports;
          if (args[0]) {
            viewports = [closest(args[0], options)];
          } else if (options.around) {
            viewports = getAround(options.around, options);
          } else {
            viewports = getAll(options);
          }
          return [viewports, options];
        }
        function resetScroll(...args) {
          const [viewports, _options] = parseOptions(args);
          setScrollTops(viewports, {});
        }
        function setScrollTops(viewports, tops) {
          for (let viewport of viewports) {
            const key = scrollTopKey(viewport);
            viewport.scrollTop = tops[key] || 0;
          }
        }
        function absolutize(element, options = {}) {
          const viewport = closest(element);
          const viewportRect = viewport.getBoundingClientRect();
          const originalRect = element.getBoundingClientRect();
          const boundsRect = new up.Rect({
            left: originalRect.left - viewportRect.left,
            top: originalRect.top - viewportRect.top,
            width: originalRect.width,
            height: originalRect.height
          });
          options.afterMeasure?.();
          e.setStyle(element, {
            position: element.style.position === 'static' ? 'static' : 'relative',
            top: 'auto',
            right: 'auto',
            bottom: 'auto',
            left: 'auto',
            width: '100%',
            height: '100%'
          });
          const bounds = e.createFromSelector('up-bounds');
          e.insertBefore(element, bounds);
          bounds.appendChild(element);
          const moveBounds = function (diffX, diffY) {
            boundsRect.left += diffX;
            boundsRect.top += diffY;
            return e.setStyle(bounds, boundsRect);
          };
          moveBounds(0, 0);
          const newElementRect = element.getBoundingClientRect();
          moveBounds(originalRect.left - newElementRect.left, originalRect.top - newElementRect.top);
          u.each(fixedElements(element), e.fixedToAbsolute);
          return {
            bounds,
            moveBounds
          };
        }
        function firstHashTarget(hash, options = {}) {
          if (hash = pureHash(hash)) {
            const selector = [e.attrSelector('id', hash), 'a' + e.attrSelector('name', hash)].join(',');
            return f.get(selector, options);
          }
        }
        function pureHash(value) {
          return value?.replace(/^#/, '');
        }
        function focusedElementWithin(scopeElement) {
          const focusedElement = document.activeElement;
          if (up.fragment.contains(scopeElement, focusedElement)) {
            return focusedElement;
          }
        }
        const CURSOR_PROPS = ['selectionStart', 'selectionEnd', 'scrollLeft', 'scrollTop'];
        function copyCursorProps(from, to = {}) {
          for (let key of CURSOR_PROPS) {
            try {
              to[key] = from[key];
            } catch (error) {}
          }
          return to;
        }
        let userScrolled = false;
        up.on('scroll', {
          once: true,
          beforeBoot: true
        }, () => userScrolled = true);
        up.on('up:framework:boot', function () {
          u.task(function () {
            if (!userScrolled) {
              return revealHash();
            }
          });
        });
        up.on(window, 'hashchange', () => revealHash());
        up.on('up:framework:reset', reset);
        return {
          reveal,
          revealHash,
          firstHashTarget,
          config,
          get: closest,
          subtree: getSubtree,
          around: getAround,
          get root() {
            return getRoot();
          },
          rootWidth,
          rootHeight,
          rootHasReducedWidthFromScrollbar,
          rootOverflowElement,
          isRoot,
          scrollbarWidth,
          saveScroll,
          restoreScroll,
          resetScroll,
          saveFocus,
          restoreFocus,
          anchoredRight,
          absolutize,
          focus: doFocus,
          tryFocus,
          newStateCache,
          focusedElementWithin,
          copyCursorProps
        };
      }();
      up.focus = up.viewport.focus;
      up.reveal = up.viewport.reveal;

      /***/
    }, /* 90 */
    /***/(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      // extracted by mini-css-extract-plugin

      /***/
    }, /* 91 */
    /***/() => {
      up.motion = function () {
        const u = up.util;
        const e = up.element;
        let namedAnimations = {};
        let namedTransitions = {};
        const motionController = new up.MotionController('motion');
        const config = new up.Config(() => ({
          duration: 175,
          easing: 'ease',
          enabled: !matchMedia('(prefers-reduced-motion: reduce)').matches
        }));
        function pickDefault(registry) {
          return u.pickBy(registry, value => value.isDefault);
        }
        function reset() {
          motionController.reset();
          namedAnimations = pickDefault(namedAnimations);
          namedTransitions = pickDefault(namedTransitions);
          config.reset();
        }
        function isEnabled() {
          return config.enabled;
        }
        function animate(element, animation, options) {
          element = up.fragment.get(element);
          options = u.options(options);
          const animationFn = findAnimationFn(animation);
          const willRun = willAnimate(element, animation, options);
          if (willRun) {
            const runNow = () => animationFn(element, options);
            return motionController.startFunction(element, runNow, options);
          } else {
            return skipAnimate(element, animation);
          }
        }
        function willAnimate(element, animationOrTransition, options) {
          applyConfig(options);
          return isEnabled() && !isNone(animationOrTransition) && options.duration > 0 && !e.isSingleton(element);
        }
        function skipAnimate(element, animation) {
          if (u.isOptions(animation)) {
            e.setStyle(element, animation);
          }
          return Promise.resolve();
        }
        function animateNow(element, lastFrame, options) {
          options = {
            ...options,
            finishEvent: motionController.finishEvent
          };
          const cssTransition = new up.CSSTransition(element, lastFrame, options);
          return cssTransition.start();
        }
        function applyConfig(options) {
          options.easing || (options.easing = config.easing);
          options.duration || (options.duration = config.duration);
        }
        function findNamedAnimation(name) {
          return namedAnimations[name] || up.fail("Unknown animation %o", name);
        }
        function finish(element) {
          return motionController.finish(element);
        }
        function morph(oldElement, newElement, transitionObject, options) {
          options = u.options(options);
          applyConfig(options);
          oldElement = up.fragment.get(oldElement);
          newElement = up.fragment.get(newElement);
          const transitionFn = findTransitionFn(transitionObject);
          const willMorph = willAnimate(oldElement, transitionFn, options);
          const beforeStart = u.pluckKey(options, 'beforeStart') || u.noop;
          const afterInsert = u.pluckKey(options, 'afterInsert') || u.noop;
          const beforeDetach = u.pluckKey(options, 'beforeDetach') || u.noop;
          const afterDetach = u.pluckKey(options, 'afterDetach') || u.noop;
          const scrollNew = u.pluckKey(options, 'scrollNew') || u.noop;
          beforeStart();
          if (willMorph) {
            if (motionController.isActive(oldElement) && options.trackMotion === false) {
              return transitionFn(oldElement, newElement, options);
            }
            up.puts('up.morph()', 'Morphing %o to %o with transition %O', oldElement, newElement, transitionObject);
            const viewport = up.viewport.get(oldElement);
            const scrollTopBeforeReveal = viewport.scrollTop;
            const oldRemote = up.viewport.absolutize(oldElement, {
              afterMeasure() {
                e.insertBefore(oldElement, newElement);
                afterInsert();
              }
            });
            const trackable = async function () {
              scrollNew();
              const scrollTopAfterReveal = viewport.scrollTop;
              oldRemote.moveBounds(0, scrollTopAfterReveal - scrollTopBeforeReveal);
              await transitionFn(oldElement, newElement, options);
              beforeDetach();
              oldRemote.bounds.remove();
              afterDetach();
            };
            return motionController.startFunction([oldElement, newElement], trackable, options);
          } else {
            beforeDetach();
            swapElementsDirectly(oldElement, newElement);
            afterInsert();
            afterDetach();
            scrollNew();
            return Promise.resolve();
          }
        }
        function findTransitionFn(object) {
          if (isNone(object)) {
            return undefined;
          } else if (u.isFunction(object)) {
            return object;
          } else if (u.isArray(object)) {
            return composeTransitionFn(...object);
          } else if (u.isString(object)) {
            let namedTransition;
            if (object.indexOf('/') >= 0) {
              return composeTransitionFn(...object.split('/'));
            } else if (namedTransition = namedTransitions[object]) {
              return findTransitionFn(namedTransition);
            }
          } else {
            return up.fail("Unknown transition %o", object);
          }
        }
        function composeTransitionFn(oldAnimation, newAnimation) {
          if (!isNone(oldAnimation) && !isNone(newAnimation)) {
            const oldAnimationFn = findAnimationFn(oldAnimation) || u.asyncNoop;
            const newAnimationFn = findAnimationFn(newAnimation) || u.asyncNoop;
            return (oldElement, newElement, options) => Promise.all([oldAnimationFn(oldElement, options), newAnimationFn(newElement, options)]);
          }
        }
        function findAnimationFn(object) {
          if (isNone(object)) {
            return undefined;
          } else if (u.isFunction(object)) {
            return object;
          } else if (u.isString(object)) {
            return findNamedAnimation(object);
          } else if (u.isOptions(object)) {
            return (element, options) => animateNow(element, object, options);
          } else {
            return up.fail('Unknown animation %o', object);
          }
        }
        const swapElementsDirectly = up.mockable(function (oldElement, newElement) {
          oldElement.replaceWith(newElement);
        });
        function registerTransition(name, transition) {
          const fn = findTransitionFn(transition);
          fn.isDefault = up.framework.evaling;
          namedTransitions[name] = fn;
        }
        function registerAnimation(name, animation) {
          const fn = findAnimationFn(animation);
          fn.isDefault = up.framework.evaling;
          namedAnimations[name] = fn;
        }
        up.on('up:framework:boot', function () {
          if (!isEnabled()) {
            up.puts('up.motion', 'Animations are disabled');
          }
        });
        function isNone(animationOrTransition) {
          return !animationOrTransition || animationOrTransition === 'none';
        }
        function registerOpacityAnimation(name, from, to) {
          registerAnimation(name, function (element, options) {
            element.style.opacity = 0;
            e.setStyle(element, {
              opacity: from
            });
            return animateNow(element, {
              opacity: to
            }, options);
          });
        }
        registerOpacityAnimation('fade-in', 0, 1);
        registerOpacityAnimation('fade-out', 1, 0);
        function translateCSS(dx, dy) {
          return {
            transform: `translate(${dx}px, ${dy}px)`
          };
        }
        function noTranslateCSS() {
          return {
            transform: null
          };
        }
        function untranslatedBox(element) {
          e.setStyle(element, noTranslateCSS());
          return element.getBoundingClientRect();
        }
        function registerMoveAnimations(direction, boxToTransform) {
          const animationToName = `move-to-${direction}`;
          const animationFromName = `move-from-${direction}`;
          registerAnimation(animationToName, function (element, options) {
            const box = untranslatedBox(element);
            const transform = boxToTransform(box);
            return animateNow(element, transform, options);
          });
          registerAnimation(animationFromName, function (element, options) {
            const box = untranslatedBox(element);
            const transform = boxToTransform(box);
            e.setStyle(element, transform);
            return animateNow(element, noTranslateCSS(), options);
          });
        }
        registerMoveAnimations('top', function (box) {
          const travelDistance = box.top + box.height;
          return translateCSS(0, -travelDistance);
        });
        registerMoveAnimations('bottom', function (box) {
          const travelDistance = up.viewport.rootHeight() - box.top;
          return translateCSS(0, travelDistance);
        });
        registerMoveAnimations('left', function (box) {
          const travelDistance = box.left + box.width;
          return translateCSS(-travelDistance, 0);
        });
        registerMoveAnimations('right', function (box) {
          const travelDistance = up.viewport.rootWidth() - box.left;
          return translateCSS(travelDistance, 0);
        });
        registerTransition('cross-fade', ['fade-out', 'fade-in']);
        registerTransition('move-left', ['move-to-left', 'move-from-right']);
        registerTransition('move-right', ['move-to-right', 'move-from-left']);
        registerTransition('move-up', ['move-to-top', 'move-from-bottom']);
        registerTransition('move-down', ['move-to-bottom', 'move-from-top']);
        up.on('up:framework:reset', reset);
        return {
          morph,
          animate,
          finish,
          finishCount() {
            return motionController.finishCount;
          },
          transition: registerTransition,
          animation: registerAnimation,
          config,
          isEnabled,
          isNone,
          willAnimate,
          swapElementsDirectly
        };
      }();
      up.transition = up.motion.transition;
      up.animation = up.motion.animation;
      up.morph = up.motion.morph;
      up.animate = up.motion.animate;

      /***/
    }, /* 92 */
    /***/(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      __webpack_require__(93);
      const u = up.util;
      up.network = function () {
        const config = new up.Config(() => ({
          concurrency() {
            return shouldReduceRequests() ? 3 : 6;
          },
          wrapMethod: true,
          cacheSize: 70,
          cacheExpireAge: 15 * 1000,
          cacheEvictAge: 90 * 60 * 1000,
          badDownlink: 0.6,
          badRTT: 750,
          badResponseTime: 400,
          fail(response) {
            return (response.status < 200 || response.status > 299) && response.status !== 304;
          },
          autoCache(request) {
            return request.isSafe();
          },
          expireCache(request, _response) {
            return !request.isSafe();
          },
          evictCache: false,
          progressBar: true,
          timeout: 90000
        }));
        const queue = new up.Request.Queue();
        const cache = new up.Request.Cache();
        let progressBar = null;
        function reset() {
          abortRequests();
          queue.reset();
          config.reset();
          cache.reset();
          progressBar?.destroy();
          progressBar = null;
        }
        function makeRequest(...args) {
          const options = parseRequestOptions(args);
          const request = new up.Request(options);
          processRequest(request);
          return request;
        }
        function parseRequestOptions(args) {
          const options = u.extractOptions(args);
          if (!options.url) {
            options.url = args[0];
          }
          up.migrate.handleRequestOptions?.(options);
          return options;
        }
        function processRequest(request) {
          useCachedRequest(request) || queueRequest(request);
        }
        function useCachedRequest(newRequest) {
          let cachedRequest;
          if (newRequest.willCache() && (cachedRequest = cache.get(newRequest))) {
            up.puts('up.request()', 'Re-using previous request to %s', newRequest.description);
            if (!newRequest.background) {
              queue.promoteToForeground(cachedRequest);
            }
            cache.track(cachedRequest, newRequest, {
              onIncompatible: processRequest
            });
            return true;
          }
        }
        function queueRequest(request) {
          handleCaching(request);
          queue.asap(request);
          return true;
        }
        function handleCaching(request) {
          if (request.willCache()) {
            cache.put(request);
            request.onLoading = () => cache.put(request);
          }
          u.always(request, function (responseOrError) {
            let expireCache = responseOrError.expireCache ?? request.expireCache ?? u.evalOption(config.expireCache, request, responseOrError);
            if (expireCache) {
              cache.expire(expireCache, {
                except: request
              });
            }
            let evictCache = responseOrError.evictCache ?? request.evictCache ?? u.evalOption(config.evictCache, request, responseOrError);
            if (evictCache) {
              cache.evict(evictCache, {
                except: request
              });
            }
            if (cache.get(request)) {
              cache.put(request);
            }
            if (!responseOrError.isCacheable?.()) {
              cache.evict(request);
            }
          });
        }
        function isBusy() {
          return queue.isBusy();
        }
        function loadPage(requestsAttrs) {
          new up.Request(requestsAttrs).loadPage();
        }
        function shouldReduceRequests() {
          let netInfo = navigator.connection;
          if (netInfo) {
            return netInfo.rtt && netInfo.rtt > config.badRTT || netInfo.downlink && netInfo.downlink < config.badDownlink;
          }
        }
        function abortRequests(...args) {
          up.migrate.preprocessAbortArgs?.(args);
          queue.abort(...args);
        }
        function registerAliasForRedirect(request, response) {
          if (request.cache && response.url && request.url !== response.url) {
            const newRequest = u.variant(request, {
              method: response.method,
              url: response.url
            });
            cache.alias(request, newRequest);
          }
        }
        function isSafeMethod(method) {
          return u.contains(['GET', 'OPTIONS', 'HEAD'], u.normalizeMethod(method));
        }
        function onLate() {
          if (u.evalOption(config.progressBar)) {
            progressBar = new up.ProgressBar();
          }
        }
        function onRecover() {
          progressBar?.conclude();
        }
        up.on('up:network:late', onLate);
        up.on('up:network:recover', onRecover);
        up.on('up:framework:reset', reset);
        return {
          request: makeRequest,
          cache,
          isBusy,
          isSafeMethod,
          config,
          abort: abortRequests,
          registerAliasForRedirect,
          queue,
          shouldReduceRequests,
          loadPage
        };
      }();
      up.request = up.network.request;
      up.cache = up.network.cache;

      /***/
    }, /* 93 */
    /***/(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      // extracted by mini-css-extract-plugin

      /***/
    }, /* 94 */
    /***/(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      __webpack_require__(95);
      const u = up.util;
      const e = up.element;
      up.layer = function () {
        const LAYER_CLASSES = [up.Layer.Root, up.Layer.Modal, up.Layer.Popup, up.Layer.Drawer, up.Layer.Cover];
        const config = new up.Config(function () {
          const newConfig = {
            mode: 'modal',
            any: {
              mainTargets: ["[up-main='']", 'main', ':layer']
            },
            root: {
              mainTargets: ['[up-main~=root]'],
              history: true
            },
            overlay: {
              mainTargets: ['[up-main~=overlay]'],
              openAnimation: 'fade-in',
              closeAnimation: 'fade-out',
              dismissLabel: '×',
              dismissAriaLabel: 'Dismiss dialog',
              dismissable: true,
              history: 'auto'
            },
            cover: {
              mainTargets: ['[up-main~=cover]']
            },
            drawer: {
              mainTargets: ['[up-main~=drawer]'],
              backdrop: true,
              position: 'left',
              size: 'medium',
              openAnimation(layer) {
                switch (layer.position) {
                  case 'left':
                    return 'move-from-left';
                  case 'right':
                    return 'move-from-right';
                }
              },
              closeAnimation(layer) {
                switch (layer.position) {
                  case 'left':
                    return 'move-to-left';
                  case 'right':
                    return 'move-to-right';
                }
              }
            },
            modal: {
              mainTargets: ['[up-main~=modal]'],
              backdrop: true,
              size: 'medium'
            },
            popup: {
              mainTargets: ['[up-main~=popup]'],
              position: 'bottom',
              size: 'medium',
              align: 'left',
              dismissable: 'outside key'
            },
            foreignOverlaySelectors: ['dialog']
          };
          for (let Class of LAYER_CLASSES) {
            newConfig[Class.mode].Class = Class;
          }
          return newConfig;
        });
        let stack = null;
        let handlers = [];
        function mainTargets(mode) {
          return u.flatMap(modeConfigs(mode), 'mainTargets');
        }
        function modeConfigs(mode) {
          if (mode === 'root') {
            return [config.root, config.any];
          } else {
            return [config[mode], config.overlay, config.any];
          }
        }
        function normalizeOptions(options) {
          up.migrate.handleLayerOptions?.(options);
          if (u.isGiven(options.layer)) {
            let match = String(options.layer).match(/^(new|shatter|swap)( (\w+))?/);
            if (match) {
              options.layer = 'new';
              const openMethod = match[1];
              const shorthandMode = match[3];
              options.mode || (options.mode = shorthandMode || config.mode);
              if (openMethod === 'swap') {
                if (up.layer.isOverlay()) {
                  options.baseLayer = 'parent';
                }
              } else if (openMethod === 'shatter') {
                options.baseLayer = 'root';
              }
            }
          } else {
            if (options.mode) {
              options.layer = 'new';
            } else if (u.isElementish(options.target)) {
              options.layer = stack.get(options.target, {
                normalizeLayerOptions: false
              });
            } else if (options.origin) {
              options.layer = 'origin';
            } else {
              options.layer = 'current';
            }
          }
          if (!options.context) {
            options.context = {};
          }
          options.baseLayer = stack.get('current', {
            ...options,
            normalizeLayerOptions: false
          });
        }
        function build(options, beforeNew) {
          const {
            mode
          } = options;
          const {
            Class
          } = config[mode];
          const configs = u.reverse(modeConfigs(mode));
          let handleDeprecatedConfig = up.migrate.handleLayerConfig;
          if (handleDeprecatedConfig) {
            configs.forEach(handleDeprecatedConfig);
          }
          options.openAnimation ?? (options.openAnimation = u.pluckKey(options, 'animation'));
          options = u.mergeDefined(...configs, {
            mode,
            stack
          }, options);
          if (beforeNew) {
            options = beforeNew(options);
          }
          return new Class(options);
        }
        function openCallbackAttr(link, attr) {
          return e.callbackAttr(link, attr, {
            exposedKeys: ['layer']
          });
        }
        function closeCallbackAttr(link, attr) {
          return e.callbackAttr(link, attr, {
            exposedKeys: ['layer', 'value', 'response']
          });
        }
        function reset() {
          config.reset();
          stack.reset();
          handlers = u.filter(handlers, 'isDefault');
        }
        async function open(options) {
          options = u.options(options, {
            layer: 'new',
            defaultToEmptyContent: true,
            navigate: true
          });
          let result = await up.render(options);
          return result.layer;
        }
        function ask(options) {
          return new Promise(function (resolve, reject) {
            options = {
              ...options,
              onAccepted: event => resolve(event.value),
              onDismissed: event => reject(event.value)
            };
            open(options);
          });
        }
        function anySelector() {
          return u.map(LAYER_CLASSES, Class => Class.selector()).join(',');
        }
        function optionToString(option) {
          if (u.isString(option)) {
            return `layer "${option}"`;
          } else {
            return option.toString();
          }
        }
        function isWithinForeignOverlay(element) {
          let selector = config.foreignOverlaySelectors.join(',');
          return !!(selector && element.closest(selector));
        }
        up.on('up:fragment:destroyed', function () {
          stack.sync();
        });
        up.on('up:framework:evaled', function () {
          stack = new up.LayerStack();
        });
        up.on('up:framework:reset', reset);
        const api = {
          config,
          mainTargets,
          open,
          build,
          ask,
          normalizeOptions,
          openCallbackAttr,
          closeCallbackAttr,
          anySelector,
          optionToString,
          get stack() {
            return stack;
          },
          isWithinForeignOverlay
        };
        u.delegate(api, ['get', 'getAll', 'root', 'overlays', 'current', 'front', 'sync', 'count', 'dismissOverlays'], () => stack);
        u.delegate(api, ['accept', 'dismiss', 'isRoot', 'isOverlay', 'isFront', 'on', 'off', 'emit', 'parent', 'history', 'location', 'mode', 'context', 'element', 'contains', 'size', 'affix'], () => stack.current);
        return api;
      }();

      /***/
    }, /* 95 */
    /***/(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      // extracted by mini-css-extract-plugin

      /***/
    }, /* 96 */
    /***/(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      __webpack_require__(97);
      up.link = function () {
        const u = up.util;
        const e = up.element;
        const linkPreloader = new up.LinkPreloader();
        let lastMousedownTarget = null;
        const LINKS_WITH_LOCAL_HTML = ['a[up-content]', 'a[up-fragment]', 'a[up-document]'];
        const LINKS_WITH_REMOTE_HTML = ['a[href]', '[up-href]'];
        const ATTRIBUTES_SUGGESTING_FOLLOW = ['[up-follow]', '[up-target]', '[up-layer]', '[up-transition]', '[up-preload]', '[up-instant]', '[up-href]'];
        function combineFollowableSelectors(elementSelectors, attributeSelectors) {
          return u.flatMap(elementSelectors, elementSelector => attributeSelectors.map(attrSelector => elementSelector + attrSelector));
        }
        const config = new up.Config(() => ({
          followSelectors: combineFollowableSelectors(LINKS_WITH_REMOTE_HTML, ATTRIBUTES_SUGGESTING_FOLLOW).concat(LINKS_WITH_LOCAL_HTML),
          noFollowSelectors: ['[up-follow=false]', 'a[download]', 'a[target]', 'a[href^="#"]:not([up-content]):not([up-fragment]):not([up-document])', 'a[href^="javascript:"]'],
          instantSelectors: ['[up-instant]'],
          noInstantSelectors: ['[up-instant=false]', '[onclick]'],
          preloadSelectors: combineFollowableSelectors(LINKS_WITH_REMOTE_HTML, ['[up-preload]']),
          noPreloadSelectors: ['[up-preload=false]'],
          clickableSelectors: LINKS_WITH_LOCAL_HTML.concat(['[up-emit]', '[up-accept]', '[up-dismiss]', '[up-clickable]']),
          preloadDelay: 90,
          preloadEnabled: 'auto'
        }));
        function fullFollowSelector() {
          return config.followSelectors.join(',');
        }
        function fullPreloadSelector() {
          return config.preloadSelectors.join(',');
        }
        function fullInstantSelector() {
          return config.instantSelectors.join(',');
        }
        function fullClickableSelector() {
          return config.clickableSelectors.join(',');
        }
        function isFollowDisabled(link) {
          return link.matches(config.noFollowSelectors.join(',')) || u.isCrossOrigin(link);
        }
        function isPreloadDisabled(link) {
          return !up.browser.canPushState() || link.matches(config.noPreloadSelectors.join(',')) || isFollowDisabled(link) || !willCache(link);
        }
        function willCache(link) {
          const options = parseRequestOptions(link);
          if (options.url) {
            if (options.cache == null) {
              options.cache = 'auto';
            }
            options.basic = true;
            const request = new up.Request(options);
            return request.willCache();
          }
        }
        function isInstantDisabled(link) {
          return link.matches(config.noInstantSelectors.join(',')) || isFollowDisabled(link);
        }
        function reset() {
          lastMousedownTarget = null;
          config.reset();
          linkPreloader.reset();
        }
        const follow = up.mockable(function (link, options) {
          return up.render(followOptions(link, options));
        });
        function parseRequestOptions(link, options, parserOptions) {
          options = u.options(options);
          const parser = new up.OptionsParser(link, options, parserOptions);
          options.url = followURL(link, options);
          options.method = followMethod(link, options);
          parser.json('headers');
          parser.json('params');
          parser.booleanOrString('cache');
          parser.booleanOrString('expireCache');
          parser.booleanOrString('evictCache');
          parser.booleanOrString('revalidate');
          parser.booleanOrString('abort');
          parser.boolean('abortable');
          parser.boolean('background');
          parser.string('contentType');
          parser.number('badResponseTime');
          parser.number('timeout');
          return options;
        }
        function followOptions(link, options, parserOptions) {
          link = up.fragment.get(link);
          options = parseRequestOptions(link, options, parserOptions);
          const parser = new up.OptionsParser(link, options, {
            fail: true,
            ...parserOptions
          });
          parser.boolean('feedback');
          parser.boolean('fail');
          options.origin || (options.origin = link);
          parser.boolean('navigate', {
            default: true
          });
          parser.string('confirm', {
            attr: ['up-confirm', 'data-confirm']
          });
          parser.string('target');
          parser.booleanOrString('fallback');
          parser.string('content');
          parser.string('fragment');
          parser.string('document');
          parser.boolean('useKeep');
          parser.boolean('useHungry');
          parser.callback('onLoaded');
          parser.callback('onRendered', {
            mainKey: 'result'
          });
          parser.callback('onFinished', {
            mainKey: 'result'
          });
          parser.callback('onOffline', {
            mainKey: 'error'
          });
          parser.callback('onError', {
            mainKey: 'error'
          });
          parser.boolean('peel');
          parser.string('layer');
          parser.string('baseLayer');
          parser.json('context');
          parser.string('mode');
          parser.string('align');
          parser.string('position');
          parser.string('class');
          parser.string('size');
          parser.booleanOrString('dismissable');
          parser.parse(up.layer.openCallbackAttr, 'onOpened');
          parser.parse(up.layer.closeCallbackAttr, 'onAccepted');
          parser.parse(up.layer.closeCallbackAttr, 'onDismissed');
          parser.string('acceptEvent');
          parser.string('dismissEvent');
          parser.string('acceptLocation');
          parser.string('dismissLocation');
          parser.booleanOrString('history');
          parser.booleanOrString('focus');
          parser.boolean('saveScroll');
          parser.boolean('saveFocus');
          parser.booleanOrString('scroll');
          parser.boolean('revealTop');
          parser.number('revealMax');
          parser.number('revealPadding');
          parser.number('revealSnap');
          parser.string('scrollBehavior');
          parser.booleanOrString('history');
          parser.booleanOrString('location');
          parser.booleanOrString('title');
          parser.booleanOrString('animation');
          parser.booleanOrString('transition');
          parser.string('easing');
          parser.number('duration');
          if (!options.guardEvent) {
            options.guardEvent = up.event.build('up:link:follow', {
              log: 'Following link'
            });
          }
          return options;
        }
        function preload(link, options) {
          link = up.fragment.get(link);
          let issue = preloadIssue(link);
          if (issue) {
            return Promise.reject(new up.Error(issue));
          }
          const guardEvent = up.event.build('up:link:preload', {
            log: ['Preloading link %o', link]
          });
          return follow(link, {
            abortable: false,
            ...options,
            guardEvent,
            preload: true
          });
        }
        function preloadIssue(link) {
          if (!u.evalAutoOption(config.preloadEnabled, autoPreloadEnabled, link)) {
            return 'Preloading is disabled';
          } else if (!isSafe(link)) {
            return 'Will not preload an unsafe link';
          }
        }
        const autoPreloadEnabled = u.negate(up.network.shouldReduceRequests);
        function followMethod(link, options = {}) {
          return u.normalizeMethod(options.method || link.getAttribute('up-method') || link.getAttribute('data-method'));
        }
        function followURL(link, options = {}) {
          const url = options.url || link.getAttribute('up-href') || link.getAttribute('href');
          if (url !== '#') {
            return url;
          }
        }
        function isFollowable(link) {
          link = up.fragment.get(link);
          return link.matches(fullFollowSelector()) && !isFollowDisabled(link);
        }
        function makeFollowable(link) {
          if (!isFollowable(link)) {
            link.setAttribute('up-follow', '');
          }
        }
        function makeClickable(link) {
          if (link.matches('a[href], button')) {
            return;
          }
          e.setMissingAttrs(link, {
            tabindex: '0',
            role: 'link',
            'up-clickable': ''
          });
          link.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === 'Space') {
              return forkEventAsUpClick(event);
            }
          });
        }
        up.macro(fullClickableSelector, makeClickable);
        function shouldFollowEvent(event, link) {
          if (event.defaultPrevented || isFollowDisabled(link)) {
            return false;
          }
          const betterTargetSelector = `a, [up-href], ${up.form.fieldSelector()}`;
          const betterTarget = event.target.closest(betterTargetSelector);
          return !betterTarget || betterTarget === link;
        }
        function isInstant(linkOrDescendant) {
          const element = linkOrDescendant.closest(fullInstantSelector());
          return element && !isInstantDisabled(element);
        }
        function convertClicks(layer) {
          layer.on('click', function (event, element) {
            if (!up.event.isUnmodified(event)) {
              return;
            }
            if (isInstant(element) && lastMousedownTarget) {
              up.event.halt(event);
            } else if (layer.wasHitByMouseEvent(event) && !didUserDragAway(event)) {
              forkEventAsUpClick(event);
            }
            return lastMousedownTarget = null;
          });
          layer.on('mousedown', function (event, element) {
            if (!up.event.isUnmodified(event)) {
              return;
            }
            lastMousedownTarget = event.target;
            if (isInstant(element)) {
              forkEventAsUpClick(event);
            }
          });
        }
        function didUserDragAway(clickEvent) {
          return lastMousedownTarget && lastMousedownTarget !== clickEvent.target;
        }
        function forkEventAsUpClick(originalEvent) {
          let forwardedProps = ['clientX', 'clientY', 'button', ...up.event.keyModifiers];
          const newEvent = up.event.fork(originalEvent, 'up:click', forwardedProps);
          up.emit(originalEvent.target, newEvent, {
            log: false
          });
        }
        function isSafe(link) {
          const method = followMethod(link);
          return up.network.isSafeMethod(method);
        }
        up.on('up:click', fullFollowSelector, function (event, link) {
          if (shouldFollowEvent(event, link)) {
            up.event.halt(event, {
              log: true
            });
            up.focus(link, {
              preventScroll: true
            });
            up.error.muteUncriticalRejection(follow(link));
          }
        });
        up.macro('[up-expand]', function (area) {
          const selector = area.getAttribute('up-expand') || 'a, [up-href]';
          let childLink = e.get(area, selector);
          if (childLink) {
            const areaAttrs = e.upAttrs(childLink);
            if (!areaAttrs['up-href']) {
              areaAttrs['up-href'] = childLink.getAttribute('href');
            }
            e.setMissingAttrs(area, areaAttrs);
            makeFollowable(area);
          }
        });
        up.compiler(fullPreloadSelector, function (link) {
          if (!isPreloadDisabled(link)) {
            linkPreloader.watchLink(link);
          }
        });
        up.on('up:framework:reset', reset);
        return {
          follow,
          followOptions,
          preload,
          makeFollowable,
          makeClickable,
          isSafe,
          isFollowable,
          shouldFollowEvent,
          followMethod,
          convertClicks,
          config,
          combineFollowableSelectors,
          preloadSelector: fullPreloadSelector,
          followSelector: fullFollowSelector
        };
      }();
      up.follow = up.link.follow;

      /***/
    }, /* 97 */
    /***/(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      // extracted by mini-css-extract-plugin

      /***/
    }, /* 98 */
    /***/() => {
      up.form = function () {
        const u = up.util;
        const e = up.element;
        const ATTRIBUTES_SUGGESTING_SUBMIT = ['[up-submit]', '[up-target]', '[up-layer]', '[up-transition]'];
        const config = new up.Config(() => ({
          groupSelectors: ['[up-form-group]', 'fieldset', 'label', 'form'],
          fieldSelectors: ['select', 'input:not([type=submit]):not([type=image])', 'button[type]:not([type=submit])', 'textarea'],
          submitSelectors: up.link.combineFollowableSelectors(['form'], ATTRIBUTES_SUGGESTING_SUBMIT),
          noSubmitSelectors: ['[up-submit=false]', '[target]'],
          submitButtonSelectors: ['input[type=submit]', 'input[type=image]', 'button[type=submit]', 'button:not([type])'],
          watchInputEvents: ['input', 'change'],
          watchInputDelay: 0,
          watchChangeEvents: ['change']
        }));
        function fullSubmitSelector() {
          return config.submitSelectors.join(',');
        }
        function reset() {
          config.reset();
        }
        function fieldSelector(suffix = '') {
          return config.fieldSelectors.map(field => field + suffix).join(',');
        }
        function isField(element) {
          return element.matches(fieldSelector());
        }
        function findFields(root) {
          root = e.get(root);
          let fields = e.subtree(root, fieldSelector());
          if (root.matches('form[id]')) {
            const outsideFieldSelector = fieldSelector(e.attrSelector('form', root.getAttribute('id')));
            const outsideFields = up.fragment.all(outsideFieldSelector, {
              layer: root
            });
            fields.push(...outsideFields);
            fields = u.uniq(fields);
          }
          return fields;
        }
        function findSubmitButtons(root) {
          return e.subtree(root, submitButtonSelector());
        }
        function submittingButton(form) {
          const selector = submitButtonSelector();
          const focusedElement = document.activeElement;
          if (focusedElement && focusedElement.form === form) {
            if (focusedElement.matches(selector)) {
              return focusedElement;
            }
          }
          return e.get(form, selector);
        }
        function submitButtonSelector() {
          return config.submitButtonSelectors.join(',');
        }
        const submit = up.mockable((form, options) => {
          return up.render(submitOptions(form, options));
        });
        function submitOptions(form, options, parserOptions) {
          form = getForm(form);
          options = destinationOptions(form, options, parserOptions);
          let parser = new up.OptionsParser(form, options, parserOptions);
          parser.string('failTarget', {
            default: up.fragment.tryToTarget(form)
          });
          parser.booleanOrString('disable');
          options.guardEvent || (options.guardEvent = up.event.build('up:form:submit', {
            submitButton: options.submitButton,
            log: 'Submitting form',
            params: options.params
          }));
          options.origin || (options.origin = up.viewport.focusedElementWithin(form) || options.submitButton || form);
          Object.assign(options, up.link.followOptions(form, options, parserOptions));
          return options;
        }
        function watchOptions(field, options, parserOptions = {}) {
          options = u.options(options);
          let parser = new up.OptionsParser(field, options, {
            ...parserOptions,
            closest: true,
            attrPrefix: 'up-watch-'
          });
          parser.boolean('feedback');
          parser.booleanOrString('disable');
          parser.string('event');
          parser.number('delay');
          let config = up.form.config;
          if (options.event === 'input') {
            options.event = u.evalOption(config.watchInputEvents, field);
            options.delay ?? (options.delay = config.watchInputDelay);
          } else if (options.event === 'change') {
            options.event = u.evalOption(config.watchChangeEvents, field);
          }
          options.origin || (options.origin = field);
          return options;
        }
        function disableContainer(container) {
          let focusedElement = document.activeElement;
          let focusFallback;
          let controls = [...findFields(container), ...findSubmitButtons(container)];
          for (let control of controls) {
            if (control === focusedElement) {
              focusFallback = findGroup(focusedElement);
            }
            raiseDisableStack(control);
          }
          if (focusFallback) {
            up.focus(focusFallback, {
              force: true,
              preventScroll: true
            });
          }
          return function () {
            controls.forEach(lowerDisableStack);
          };
        }
        function raiseDisableStack(control) {
          if (!control.upDisableCount) {
            control.upDisableCount || (control.upDisableCount = 0);
            control.upOriginalDisabled = control.disabled;
          }
          control.upDisableCount++;
          control.disabled = true;
        }
        function lowerDisableStack(control) {
          if (control.upDisableCount) {
            if (!control.disabled) {
              control.upDisableCount = 0;
            } else {
              control.upDisableCount--;
              if (!control.upDisableCount) {
                control.disabled = control.upOriginalDisabled;
              }
            }
          }
        }
        function disableWhile(promise, options) {
          let undoDisable = handleDisableOption(options);
          u.always(promise, undoDisable);
        }
        function handleDisableOption({
          disable,
          origin
        }) {
          if (!disable) return u.noop;
          let missingOption = key => {
            up.fail("Cannot process { disable: '%s' } option without { %s }", disable, key);
          };
          let getOrigin = () => origin || missingOption('origin');
          let getOriginForm = () => getContainer(getOrigin());
          let containers;
          if (disable === true) {
            containers = [getOriginForm()];
          } else if (u.isString(disable)) {
            containers = up.fragment.subtree(getOriginForm(), disable, {
              origin
            });
          }
          return u.sequence(containers.map(disableContainer));
        }
        function destinationOptions(form, options, parserOptions) {
          options = u.options(options);
          form = getForm(form);
          const parser = new up.OptionsParser(form, options, parserOptions);
          parser.string('contentType', {
            attr: ['enctype', 'up-content-type']
          });
          parser.json('headers');
          const params = up.Params.fromForm(form);
          const submitButton = submittingButton(form);
          if (submitButton) {
            options.submitButton = submitButton;
            params.addField(submitButton);
            options.method || (options.method = submitButton.getAttribute('formmethod'));
            options.url || (options.url = submitButton.getAttribute('formaction'));
          }
          params.addAll(options.params);
          options.params = params;
          parser.string('url', {
            attr: 'action',
            default: up.fragment.source(form)
          });
          parser.string('method', {
            attr: ['up-method', 'data-method', 'method'],
            default: 'GET',
            normalize: u.normalizeMethod
          });
          if (options.method === 'GET') {
            options.url = up.Params.stripURL(options.url);
          }
          return options;
        }
        up.on('up:click', submitButtonSelector, function (event, button) {
          const form = getForm(button);
          if (form && isSubmittable(form)) {
            button.focus();
          }
        });
        function watch(container, ...args) {
          let form = getForm(container);
          const fields = findFields(container);
          const unnamedFields = u.reject(fields, 'name');
          if (unnamedFields.length) {
            up.puts('up.watch()', 'Will not watch fields without a [name]: %o', unnamedFields);
          }
          const callback = u.extractCallback(args) || watchCallbackFromElement(container) || up.fail('No callback given for up.watch()');
          let options = u.extractOptions(args);
          const watch = new up.FieldWatcher(form, fields, options, callback);
          watch.start();
          return () => watch.stop();
        }
        function watchCallbackFromElement(element) {
          let rawCallback = element.getAttribute('up-watch');
          if (rawCallback) {
            return up.NonceableCallback.fromString(rawCallback).toFunction('value', 'name').bind(element);
          }
        }
        function autosubmit(target, options) {
          return watch(target, options, (_value, _name, renderOptions) => submit(target, renderOptions));
        }
        function getGroupSelectors() {
          return up.migrate.migratedFormGroupSelectors?.() || config.groupSelectors;
        }
        function findGroup(field) {
          return findGroupSolution(field).element;
        }
        function findGroupSolution(field) {
          return u.findResult(getGroupSelectors(), function (groupSelector) {
            let group = field.closest(groupSelector);
            if (group) {
              let goodDerivedGroupTarget = up.fragment.tryToTarget(group);
              let goodDerivedFieldTarget = up.fragment.tryToTarget(field);
              let groupHasFieldTarget = goodDerivedFieldTarget && group !== field && `${groupSelector}:has(${goodDerivedFieldTarget})`;
              let target = goodDerivedGroupTarget || groupHasFieldTarget;
              if (target) {
                return {
                  target,
                  element: group,
                  origin: field
                };
              }
            }
          });
        }
        function validate(...args) {
          let options = parseValidateArgs(...args);
          let validator = up.FormValidator.forElement(options.origin);
          return validator.validate(options);
        }
        function parseValidateArgs(originOrTarget, ...args) {
          const options = u.extractOptions(args);
          if (options.origin) {
            options.target || (options.target = up.fragment.toTarget(originOrTarget));
          } else {
            options.origin || (options.origin = up.fragment.get(originOrTarget));
          }
          return options;
        }
        function switcherValues(field) {
          let value;
          let meta;
          if (field.matches('input[type=checkbox]')) {
            if (field.checked) {
              value = field.value;
              meta = ':checked';
            } else {
              meta = ':unchecked';
            }
          } else if (field.matches('input[type=radio]')) {
            const form = getContainer(field);
            const groupName = field.getAttribute('name');
            const checkedButton = form.querySelector(`input[type=radio]${e.attrSelector('name', groupName)}:checked`);
            if (checkedButton) {
              meta = ':checked';
              value = checkedButton.value;
            } else {
              meta = ':unchecked';
            }
          } else {
            value = field.value;
          }
          const values = [];
          if (u.isPresent(value)) {
            values.push(value);
            values.push(':present');
          } else {
            values.push(':blank');
          }
          if (u.isPresent(meta)) {
            values.push(meta);
          }
          return values;
        }
        function switchTargets(switcher, options = {}) {
          const targetSelector = options.target || options.target || switcher.getAttribute('up-switch');
          const form = getContainer(switcher);
          targetSelector || up.fail("No switch target given for %o", switcher);
          const fieldValues = switcherValues(switcher);
          for (let target of up.fragment.all(form, targetSelector)) {
            switchTarget(target, fieldValues);
          }
        }
        const switchTarget = up.mockable(function (target, fieldValues) {
          let show;
          fieldValues || (fieldValues = switcherValues(findSwitcherForTarget(target)));
          let hideValues = target.getAttribute('up-hide-for');
          if (hideValues) {
            hideValues = parseSwitchTokens(hideValues);
            show = u.intersect(fieldValues, hideValues).length === 0;
          } else {
            let showValues = target.getAttribute('up-show-for');
            showValues = showValues ? parseSwitchTokens(showValues) : [':present', ':checked'];
            show = u.intersect(fieldValues, showValues).length > 0;
          }
          e.toggle(target, show);
          target.classList.add('up-switched');
        });
        function parseSwitchTokens(str) {
          return u.parseTokens(str, {
            json: true
          });
        }
        function findSwitcherForTarget(target) {
          const form = getContainer(target);
          const switchers = form.querySelectorAll('[up-switch]');
          const switcher = u.find(switchers, function (switcher) {
            const targetSelector = switcher.getAttribute('up-switch');
            return target.matches(targetSelector);
          });
          return switcher || up.fail('Could not find [up-switch] field for %o', target);
        }
        function getForm(elementOrSelector, options = {}) {
          const element = up.fragment.get(elementOrSelector, options);
          return element.form || element.closest('form');
        }
        function getContainer(element, options) {
          return getForm(element, options) || up.layer.get(element).element;
        }
        function focusedField() {
          return u.presence(document.activeElement, isField);
        }
        function isSubmittable(form) {
          form = up.fragment.get(form);
          return form.matches(fullSubmitSelector()) && !isSubmitDisabled(form);
        }
        function isSubmitDisabled(form) {
          return form.matches(config.noSubmitSelectors.join(','));
        }
        up.on('submit', fullSubmitSelector, function (event, form) {
          if (event.defaultPrevented || isSubmitDisabled(form)) {
            return;
          }
          up.event.halt(event, {
            log: true
          });
          up.error.muteUncriticalRejection(submit(form));
        });
        up.compiler(validatingFieldSelector, function (fieldOrForm) {
          let validator = up.FormValidator.forElement(fieldOrForm);
          validator.watchContainer(fieldOrForm);
        });
        function validatingFieldSelector() {
          return config.fieldSelectors.map(selector => `${selector}[up-validate], [up-validate] ${selector}`).join(', ');
        }
        up.compiler('[up-switch]', switcher => {
          switchTargets(switcher);
        });
        up.on('change', '[up-switch]', (_event, switcher) => {
          switchTargets(switcher);
        });
        up.compiler('[up-show-for]:not(.up-switched), [up-hide-for]:not(.up-switched)', element => {
          switchTarget(element);
        });
        up.compiler('[up-watch]', formOrField => watch(formOrField));
        up.compiler('[up-autosubmit]', formOrField => autosubmit(formOrField));
        up.on('up:framework:reset', reset);
        return {
          config,
          submit,
          submitOptions,
          destinationOptions,
          watchOptions,
          isSubmittable,
          watch,
          validate,
          autosubmit,
          fieldSelector,
          fields: findFields,
          isField,
          submitButtons: findSubmitButtons,
          focusedField,
          switchTarget,
          disableWhile,
          disable: disableContainer,
          group: findGroup,
          groupSolution: findGroupSolution,
          groupSelectors: getGroupSelectors,
          get: getForm
        };
      }();
      up.submit = up.form.submit;
      up.watch = up.form.watch;
      up.autosubmit = up.form.autosubmit;
      up.validate = up.form.validate;

      /***/
    }, /* 99 */
    /***/() => {
      up.feedback = function () {
        const u = up.util;
        const e = up.element;
        const config = new up.Config(() => ({
          currentClasses: ['up-current'],
          navSelectors: ['[up-nav]', 'nav']
        }));
        function reset() {
          config.reset();
          up.layer.root.feedbackLocation = null;
        }
        const CLASS_ACTIVE = 'up-active';
        const CLASS_LOADING = 'up-loading';
        const SELECTOR_LINK = 'a, [up-href]';
        function navSelector() {
          return config.navSelectors.join(',');
        }
        function normalizeURL(url) {
          if (url) {
            return u.normalizeURL(url, {
              trailingSlash: false,
              hash: false
            });
          }
        }
        function linkURLs(link) {
          return link.upFeedbackURLs || (link.upFeedbackURLs = new up.LinkFeedbackURLs(link));
        }
        function updateFragment(fragment) {
          const layerOption = {
            layer: up.layer.get(fragment)
          };
          if (up.fragment.closest(fragment, navSelector(), layerOption)) {
            const links = up.fragment.subtree(fragment, SELECTOR_LINK, layerOption);
            updateLinks(links, layerOption);
          } else {
            updateLinksWithinNavs(fragment, layerOption);
          }
        }
        function updateLinksWithinNavs(fragment, options) {
          const navs = up.fragment.subtree(fragment, navSelector(), options);
          const links = u.flatMap(navs, nav => e.subtree(nav, SELECTOR_LINK));
          updateLinks(links, options);
        }
        function getNormalizedLayerLocation(layer) {
          return layer.feedbackLocation || normalizeURL(layer.location);
        }
        function updateLinks(links, options = {}) {
          if (!links.length) {
            return;
          }
          const layer = options.layer || up.layer.get(links[0]);
          let layerLocation = getNormalizedLayerLocation(layer);
          if (layerLocation) {
            for (let link of links) {
              const isCurrent = linkURLs(link).isCurrent(layerLocation);
              for (let currentClass of config.currentClasses) {
                link.classList.toggle(currentClass, isCurrent);
              }
              e.toggleAttr(link, 'aria-current', 'page', isCurrent);
            }
          }
        }
        function findActivatableArea(element) {
          return e.ancestor(element, SELECTOR_LINK) || element;
        }
        function showAroundRequest(request, options) {
          if (!options.feedback) {
            return;
          }
          let clean = fn => u.always(request, fn);
          let activeElement = getActiveElementFromRenderOptions(request);
          if (activeElement) {
            clean(e.addTemporaryClass(activeElement, CLASS_ACTIVE));
          }
          for (let fragment of request.fragments) {
            clean(e.addTemporaryClass(fragment, CLASS_LOADING));
          }
        }
        function getActiveElementFromRenderOptions(request) {
          let activeElement = request.origin;
          if (activeElement) {
            return findActivatableArea(activeElement);
          }
        }
        function updateLayerIfLocationChanged(layer) {
          const processedLocation = layer.feedbackLocation;
          const layerLocation = getNormalizedLayerLocation(layer.location);
          if (!processedLocation || processedLocation !== layerLocation) {
            layer.feedbackLocation = layerLocation;
            updateLinksWithinNavs(layer.element, {
              layer
            });
          }
        }
        function onBrowserLocationChanged() {
          const frontLayer = up.layer.front;
          if (frontLayer.showsLiveHistory()) {
            updateLayerIfLocationChanged(frontLayer);
          }
        }
        up.on('up:location:changed', _event => {
          onBrowserLocationChanged();
        });
        up.on('up:fragment:inserted', (_event, newFragment) => {
          updateFragment(newFragment);
        });
        up.on('up:layer:location:changed', event => {
          updateLayerIfLocationChanged(event.layer);
        });
        up.on('up:framework:reset', reset);
        return {
          config,
          showAroundRequest,
          normalizeURL
        };
      }();

      /***/
    }, /* 100 */
    /***/() => {
      up.radio = function () {
        const u = up.util;
        const e = up.element;
        const config = new up.Config(() => ({
          hungrySelectors: ['[up-hungry]'],
          pollInterval: 30000,
          stretchPollInterval: interval => interval * (up.network.shouldReduceRequests() ? 2 : 1),
          pollEnabled: 'auto'
        }));
        function reset() {
          config.reset();
        }
        function hungrySteps({
          layer,
          history,
          origin
        }) {
          let hungrySelector = config.hungrySelectors.join(', ');
          let hungries = up.fragment.all(hungrySelector, {
            layer: 'any'
          });
          return u.filterMap(hungries, element => {
            let target = up.fragment.tryToTarget(element, {
              origin
            });
            if (!target) {
              up.warn('[up-hungry]', 'Ignoring untargetable fragment %o', element);
              return;
            }
            let ifHistory = e.booleanAttr(element, 'up-if-history');
            if (ifHistory && !history) {
              return;
            }
            let ifLayer = e.attr(element, 'up-if-layer');
            let elementLayer = up.layer.get(element);
            if (ifLayer !== 'any' && layer !== elementLayer) {
              return;
            }
            let transition = e.booleanOrStringAttr(element, 'up-transition');
            return {
              selector: target,
              oldElement: element,
              layer: elementLayer,
              origin,
              transition,
              placement: 'swap',
              useKeep: true,
              maybe: true
            };
          });
        }
        function startPolling(fragment, options = {}) {
          up.FragmentPolling.forFragment(fragment).forceStart(options);
        }
        function stopPolling(element) {
          up.FragmentPolling.forFragment(element).forceStop();
        }
        function pollIssue(fragment) {
          let enabled = config.pollEnabled;
          if (enabled === false) {
            return 'User has disabled polling';
          }
          if (enabled === 'auto') {
            if (document.hidden) {
              return 'Tab is hidden';
            }
            if (!up.layer.get(fragment)?.isFront?.()) {
              return 'Fragment is on a background layer';
            }
          }
          if (up.emit(fragment, 'up:fragment:poll', {
            log: ['Polling fragment', fragment]
          }).defaultPrevented) {
            return 'User prevented up:fragment:poll event';
          }
        }
        up.compiler('[up-poll]', function (fragment) {
          if (!up.fragment.isTargetable(fragment)) {
            up.warn('[up-poll]', 'Ignoring untargetable fragment %o', fragment);
            return;
          }
          up.FragmentPolling.forFragment(fragment).onPollAttributeObserved();
        });
        up.on('up:framework:reset', reset);
        return {
          config,
          hungrySteps,
          startPolling,
          stopPolling,
          pollIssue
        };
      }();

      /***/
    }, /* 101 */
    /***/() => {
      (function () {
        const e = up.element;
        function isRails() {
          return window.Rails || window.jQuery?.rails;
        }
        for (let feature of ['method', 'confirm']) {
          const upAttribute = `up-${feature}`;
          const dataAttribute = `data-${feature}`;
          up.macro(`a[${dataAttribute}]`, function (link) {
            if (isRails() && up.link.isFollowable(link)) {
              e.setMissingAttr(link, upAttribute, link.getAttribute(dataAttribute));
              link.removeAttribute(dataAttribute);
            }
          });
        }
      })();

      /***/
    }
    /******/];
    /************************************************************************/
    /******/ // The module cache
    /******/
    var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/var cachedModule = __webpack_module_cache__[moduleId];
      /******/
      if (cachedModule !== undefined) {
        /******/return cachedModule.exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/
      var module = __webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/exports: {}
        /******/
      };
      /******/
      /******/ // Execute the module function
      /******/
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      /******/
      /******/ // Return the exports of the module
      /******/
      return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/make namespace object */
    /******/
    (() => {
      /******/ // define __esModule on exports
      /******/__webpack_require__.r = exports => {
        /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/
    })();
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
      __webpack_require__(1);
      __webpack_require__(2);
      __webpack_require__(3);
      __webpack_require__(4);
      __webpack_require__(5);
      __webpack_require__(6);
      __webpack_require__(7);
      __webpack_require__(9);
      __webpack_require__(10);
      __webpack_require__(11);
      __webpack_require__(12);
      __webpack_require__(13);
      __webpack_require__(14);
      __webpack_require__(15);
      __webpack_require__(16);
      __webpack_require__(17);
      __webpack_require__(18);
      __webpack_require__(19);
      __webpack_require__(20);
      __webpack_require__(21);
      __webpack_require__(22);
      __webpack_require__(23);
      __webpack_require__(24);
      __webpack_require__(25);
      __webpack_require__(26);
      __webpack_require__(27);
      __webpack_require__(28);
      __webpack_require__(29);
      __webpack_require__(30);
      __webpack_require__(31);
      __webpack_require__(32);
      __webpack_require__(33);
      __webpack_require__(34);
      __webpack_require__(35);
      __webpack_require__(36);
      __webpack_require__(37);
      __webpack_require__(38);
      __webpack_require__(39);
      __webpack_require__(40);
      __webpack_require__(41);
      __webpack_require__(42);
      __webpack_require__(43);
      __webpack_require__(44);
      __webpack_require__(45);
      __webpack_require__(46);
      __webpack_require__(47);
      __webpack_require__(48);
      __webpack_require__(49);
      __webpack_require__(50);
      __webpack_require__(51);
      __webpack_require__(52);
      __webpack_require__(53);
      __webpack_require__(54);
      __webpack_require__(55);
      __webpack_require__(56);
      __webpack_require__(57);
      __webpack_require__(58);
      __webpack_require__(59);
      __webpack_require__(60);
      __webpack_require__(61);
      __webpack_require__(62);
      __webpack_require__(63);
      __webpack_require__(64);
      __webpack_require__(65);
      __webpack_require__(66);
      __webpack_require__(67);
      __webpack_require__(68);
      __webpack_require__(69);
      __webpack_require__(70);
      __webpack_require__(71);
      __webpack_require__(72);
      __webpack_require__(73);
      __webpack_require__(74);
      __webpack_require__(75);
      __webpack_require__(76);
      __webpack_require__(77);
      __webpack_require__(78);
      __webpack_require__(79);
      __webpack_require__(80);
      __webpack_require__(81);
      __webpack_require__(82);
      __webpack_require__(83);
      __webpack_require__(84);
      __webpack_require__(85);
      __webpack_require__(86);
      __webpack_require__(87);
      __webpack_require__(89);
      __webpack_require__(91);
      __webpack_require__(92);
      __webpack_require__(94);
      __webpack_require__(96);
      __webpack_require__(98);
      __webpack_require__(99);
      __webpack_require__(100);
      __webpack_require__(101);
      up.framework.onEvaled();
    })();

    /******/
  })();
});

up.compiler(".up-batch", function (element, data, meta) {
  var directMethods = ["get", "post"];
  var postMethods = ["put", "patch", "delete"];
  var form = element.closest("form");
  var batchMethod = data.batchMethod;
  if (typeof batchMethod === "string") {
    batchMethod = batchMethod.toLowerCase();
  }
  if (directMethods.includes(batchMethod)) {
    form.method = batchMethod;
  } else if (postMethods.includes(batchMethod)) {
    form.method = "post";
    var methodInput = document.createElement("input");
    methodInput.type = "hidden";
    methodInput.name = "_method";
    methodInput.value = batchMethod;
    form.appendChild(methodInput);
  } else {
    form.method = "get";
  }
  form.action = data.batchHref;
  if (batchMethod === "get") {
    return;
  }
  var authenticityTokenInput = document.createElement("input");
  authenticityTokenInput.type = "hidden";
  authenticityTokenInput.name = document.querySelector("meta[name='csrf-param']").content;
  authenticityTokenInput.value = document.querySelector("meta[name='csrf-token']").content;
  form.appendChild(authenticityTokenInput);
});

up.compiler(".up-delete-invoke", function (element, data, meta) {
  up.on(element, "click", function (event) {
    var target = element.closest(".up-delete");
    target.remove();
    up.event.halt(event);
  });
});

var HOOKS = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"];
var defaults = {
  _disable: [],
  allowInput: false,
  allowInvalidPreload: false,
  altFormat: "F j, Y",
  altInput: false,
  altInputClass: "form-control input",
  animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
  ariaDateFormat: "F j, Y",
  autoFillDefaultTime: true,
  clickOpens: true,
  closeOnSelect: true,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultSeconds: 0,
  disable: [],
  disableMobile: false,
  enableSeconds: false,
  enableTime: false,
  errorHandler: function (err) {
    return typeof console !== "undefined" && console.warn(err);
  },
  getWeek: function (givenDate) {
    var date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  },
  hourIncrement: 1,
  ignoredFocusElements: [],
  inline: false,
  locale: "default",
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "dropdown",
  nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
  noCalendar: false,
  now: new Date(),
  onChange: [],
  onClose: [],
  onDayCreate: [],
  onDestroy: [],
  onKeyDown: [],
  onMonthChange: [],
  onOpen: [],
  onParseConfig: [],
  onReady: [],
  onValueUpdate: [],
  onYearChange: [],
  onPreCalendarPosition: [],
  plugins: [],
  position: "auto",
  positionElement: undefined,
  prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
  shorthandCurrentMonth: false,
  showMonths: 1,
  static: false,
  time_24hr: false,
  weekNumbers: false,
  wrap: false
};

var english = {
  weekdays: {
    shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  months: {
    shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: function (nth) {
    var s = nth % 100;
    if (s > 3 && s < 21) return "th";
    switch (s % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  time_24hr: false
};

var pad = function (number, length) {
  if (length === void 0) {
    length = 2;
  }
  return ("000" + number).slice(length * -1);
};
var int = function (bool) {
  return bool === true ? 1 : 0;
};
function debounce(fn, wait) {
  var t;
  return function () {
    var _this = this;
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function () {
      return fn.apply(_this, args);
    }, wait);
  };
}
var arrayify = function (obj) {
  return obj instanceof Array ? obj : [obj];
};

function toggleClass(elem, className, bool) {
  if (bool === true) return elem.classList.add(className);
  elem.classList.remove(className);
}
function createElement(tag, className, content) {
  var e = window.document.createElement(tag);
  className = className || "";
  content = content || "";
  e.className = className;
  if (content !== undefined) e.textContent = content;
  return e;
}
function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}
function findParent(node, condition) {
  if (condition(node)) return node;else if (node.parentNode) return findParent(node.parentNode, condition);
  return undefined;
}
function createNumberInput(inputClassName, opts) {
  var wrapper = createElement("div", "numInputWrapper"),
    numInput = createElement("input", "numInput " + inputClassName),
    arrowUp = createElement("span", "arrowUp"),
    arrowDown = createElement("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
    numInput.type = "number";
  } else {
    numInput.type = "text";
    numInput.pattern = "\\d*";
  }
  if (opts !== undefined) for (var key in opts) numInput.setAttribute(key, opts[key]);
  wrapper.appendChild(numInput);
  wrapper.appendChild(arrowUp);
  wrapper.appendChild(arrowDown);
  return wrapper;
}
function getEventTarget(event) {
  try {
    if (typeof event.composedPath === "function") {
      var path = event.composedPath();
      return path[0];
    }
    return event.target;
  } catch (error) {
    return event.target;
  }
}

var doNothing = function () {
  return undefined;
};
var monthToStr = function (monthNumber, shorthand, locale) {
  return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
};
var revFormat = {
  D: doNothing,
  F: function (dateObj, monthName, locale) {
    dateObj.setMonth(locale.months.longhand.indexOf(monthName));
  },
  G: function (dateObj, hour) {
    dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
  },
  H: function (dateObj, hour) {
    dateObj.setHours(parseFloat(hour));
  },
  J: function (dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  K: function (dateObj, amPM, locale) {
    dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
  },
  M: function (dateObj, shortMonth, locale) {
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
  },
  S: function (dateObj, seconds) {
    dateObj.setSeconds(parseFloat(seconds));
  },
  U: function (_, unixSeconds) {
    return new Date(parseFloat(unixSeconds) * 1000);
  },
  W: function (dateObj, weekNum, locale) {
    var weekNumber = parseInt(weekNum);
    var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
    return date;
  },
  Y: function (dateObj, year) {
    dateObj.setFullYear(parseFloat(year));
  },
  Z: function (_, ISODate) {
    return new Date(ISODate);
  },
  d: function (dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  h: function (dateObj, hour) {
    dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
  },
  i: function (dateObj, minutes) {
    dateObj.setMinutes(parseFloat(minutes));
  },
  j: function (dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  l: doNothing,
  m: function (dateObj, month) {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  n: function (dateObj, month) {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  s: function (dateObj, seconds) {
    dateObj.setSeconds(parseFloat(seconds));
  },
  u: function (_, unixMillSeconds) {
    return new Date(parseFloat(unixMillSeconds));
  },
  w: doNothing,
  y: function (dateObj, year) {
    dateObj.setFullYear(2000 + parseFloat(year));
  }
};
var tokenRegex = {
  D: "",
  F: "",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})"
};
var formats = {
  Z: function (date) {
    return date.toISOString();
  },
  D: function (date, locale, options) {
    return locale.weekdays.shorthand[formats.w(date, locale, options)];
  },
  F: function (date, locale, options) {
    return monthToStr(formats.n(date, locale, options) - 1, false, locale);
  },
  G: function (date, locale, options) {
    return pad(formats.h(date, locale, options));
  },
  H: function (date) {
    return pad(date.getHours());
  },
  J: function (date, locale) {
    return locale.ordinal !== undefined ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
  },
  K: function (date, locale) {
    return locale.amPM[int(date.getHours() > 11)];
  },
  M: function (date, locale) {
    return monthToStr(date.getMonth(), true, locale);
  },
  S: function (date) {
    return pad(date.getSeconds());
  },
  U: function (date) {
    return date.getTime() / 1000;
  },
  W: function (date, _, options) {
    return options.getWeek(date);
  },
  Y: function (date) {
    return pad(date.getFullYear(), 4);
  },
  d: function (date) {
    return pad(date.getDate());
  },
  h: function (date) {
    return date.getHours() % 12 ? date.getHours() % 12 : 12;
  },
  i: function (date) {
    return pad(date.getMinutes());
  },
  j: function (date) {
    return date.getDate();
  },
  l: function (date, locale) {
    return locale.weekdays.longhand[date.getDay()];
  },
  m: function (date) {
    return pad(date.getMonth() + 1);
  },
  n: function (date) {
    return date.getMonth() + 1;
  },
  s: function (date) {
    return date.getSeconds();
  },
  u: function (date) {
    return date.getTime();
  },
  w: function (date) {
    return date.getDay();
  },
  y: function (date) {
    return String(date.getFullYear()).substring(2);
  }
};

var createDateFormatter = function (_a) {
  var _b = _a.config,
    config = _b === void 0 ? defaults : _b,
    _c = _a.l10n,
    l10n = _c === void 0 ? english : _c,
    _d = _a.isMobile,
    isMobile = _d === void 0 ? false : _d;
  return function (dateObj, frmt, overrideLocale) {
    var locale = overrideLocale || l10n;
    if (config.formatDate !== undefined && !isMobile) {
      return config.formatDate(dateObj, frmt, locale);
    }
    return frmt.split("").map(function (c, i, arr) {
      return formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "";
    }).join("");
  };
};
var createDateParser = function (_a) {
  var _b = _a.config,
    config = _b === void 0 ? defaults : _b,
    _c = _a.l10n,
    l10n = _c === void 0 ? english : _c;
  return function (date, givenFormat, timeless, customLocale) {
    if (date !== 0 && !date) return undefined;
    var locale = customLocale || l10n;
    var parsedDate;
    var dateOrig = date;
    if (date instanceof Date) parsedDate = new Date(date.getTime());else if (typeof date !== "string" && date.toFixed !== undefined) parsedDate = new Date(date);else if (typeof date === "string") {
      var format = givenFormat || (config || defaults).dateFormat;
      var datestr = String(date).trim();
      if (datestr === "today") {
        parsedDate = new Date();
        timeless = true;
      } else if (config && config.parseDate) {
        parsedDate = config.parseDate(date, format);
      } else if (/Z$/.test(datestr) || /GMT$/.test(datestr)) {
        parsedDate = new Date(date);
      } else {
        var matched = void 0,
          ops = [];
        for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
          var token = format[i];
          var isBackSlash = token === "\\";
          var escaped = format[i - 1] === "\\" || isBackSlash;
          if (tokenRegex[token] && !escaped) {
            regexStr += tokenRegex[token];
            var match = new RegExp(regexStr).exec(date);
            if (match && (matched = true)) {
              ops[token !== "Y" ? "push" : "unshift"]({
                fn: revFormat[token],
                val: match[++matchIndex]
              });
            }
          } else if (!isBackSlash) regexStr += ".";
        }
        parsedDate = !config || !config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
        ops.forEach(function (_a) {
          var fn = _a.fn,
            val = _a.val;
          return parsedDate = fn(parsedDate, val, locale) || parsedDate;
        });
        parsedDate = matched ? parsedDate : undefined;
      }
    }
    if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
      config.errorHandler(new Error("Invalid date provided: " + dateOrig));
      return undefined;
    }
    if (timeless === true) parsedDate.setHours(0, 0, 0, 0);
    return parsedDate;
  };
};
function compareDates(date1, date2, timeless) {
  if (timeless === void 0) {
    timeless = true;
  }
  if (timeless !== false) {
    return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
  }
  return date1.getTime() - date2.getTime();
}
var isBetween = function (ts, ts1, ts2) {
  return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
  return hours * 3600 + minutes * 60 + seconds;
};
var parseSeconds = function (secondsSinceMidnight) {
  var hours = Math.floor(secondsSinceMidnight / 3600),
    minutes = (secondsSinceMidnight - hours * 3600) / 60;
  return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
};
var duration = {
  DAY: 86400000
};
function getDefaultHours(config) {
  var hours = config.defaultHour;
  var minutes = config.defaultMinute;
  var seconds = config.defaultSeconds;
  if (config.minDate !== undefined) {
    var minHour = config.minDate.getHours();
    var minMinutes = config.minDate.getMinutes();
    var minSeconds = config.minDate.getSeconds();
    if (hours < minHour) {
      hours = minHour;
    }
    if (hours === minHour && minutes < minMinutes) {
      minutes = minMinutes;
    }
    if (hours === minHour && minutes === minMinutes && seconds < minSeconds) seconds = config.minDate.getSeconds();
  }
  if (config.maxDate !== undefined) {
    var maxHr = config.maxDate.getHours();
    var maxMinutes = config.maxDate.getMinutes();
    hours = Math.min(hours, maxHr);
    if (hours === maxHr) minutes = Math.min(maxMinutes, minutes);
    if (hours === maxHr && minutes === maxMinutes) seconds = config.maxDate.getSeconds();
  }
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

if (typeof Object.assign !== "function") {
  Object.assign = function (target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (!target) {
      throw TypeError("Cannot convert undefined or null to object");
    }
    var _loop_1 = function (source) {
      if (source) {
        Object.keys(source).forEach(function (key) {
          return target[key] = source[key];
        });
      }
    };
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
      var source = args_1[_a];
      _loop_1(source);
    }
    return target;
  };
}

var __assign = window && window.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays$4 = window && window.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
  var self = {
    config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
    l10n: english
  };
  self.parseDate = createDateParser({
    config: self.config,
    l10n: self.l10n
  });
  self._handlers = [];
  self.pluginElements = [];
  self.loadedPlugins = [];
  self._bind = bind;
  self._setHoursFromDate = setHoursFromDate;
  self._positionCalendar = positionCalendar;
  self.changeMonth = changeMonth;
  self.changeYear = changeYear;
  self.clear = clear;
  self.close = close;
  self.onMouseOver = onMouseOver;
  self._createElement = createElement;
  self.createDay = createDay;
  self.destroy = destroy;
  self.isEnabled = isEnabled;
  self.jumpToDate = jumpToDate;
  self.updateValue = updateValue;
  self.open = open;
  self.redraw = redraw;
  self.set = set;
  self.setDate = setDate;
  self.toggle = toggle;
  function setupHelperFunctions() {
    self.utils = {
      getDaysInMonth: function (month, yr) {
        if (month === void 0) {
          month = self.currentMonth;
        }
        if (yr === void 0) {
          yr = self.currentYear;
        }
        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;
        return self.l10n.daysInMonth[month];
      }
    };
  }
  function init() {
    self.element = self.input = element;
    self.isOpen = false;
    parseConfig();
    setupLocale();
    setupInputs();
    setupDates();
    setupHelperFunctions();
    if (!self.isMobile) build();
    bindEvents();
    if (self.selectedDates.length || self.config.noCalendar) {
      if (self.config.enableTime) {
        setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
      }
      updateValue(false);
    }
    setCalendarWidth();
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!self.isMobile && isSafari) {
      positionCalendar();
    }
    triggerEvent("onReady");
  }
  function getClosestActiveElement() {
    var _a;
    return ((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
  }
  function bindToInstance(fn) {
    return fn.bind(self);
  }
  function setCalendarWidth() {
    var config = self.config;
    if (config.weekNumbers === false && config.showMonths === 1) {
      return;
    } else if (config.noCalendar !== true) {
      window.requestAnimationFrame(function () {
        if (self.calendarContainer !== undefined) {
          self.calendarContainer.style.visibility = "hidden";
          self.calendarContainer.style.display = "block";
        }
        if (self.daysContainer !== undefined) {
          var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
          self.daysContainer.style.width = daysWidth + "px";
          self.calendarContainer.style.width = daysWidth + (self.weekWrapper !== undefined ? self.weekWrapper.offsetWidth : 0) + "px";
          self.calendarContainer.style.removeProperty("visibility");
          self.calendarContainer.style.removeProperty("display");
        }
      });
    }
  }
  function updateTime(e) {
    if (self.selectedDates.length === 0) {
      var defaultDate = self.config.minDate === undefined || compareDates(new Date(), self.config.minDate) >= 0 ? new Date() : new Date(self.config.minDate.getTime());
      var defaults = getDefaultHours(self.config);
      defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
      self.selectedDates = [defaultDate];
      self.latestSelectedDateObj = defaultDate;
    }
    if (e !== undefined && e.type !== "blur") {
      timeWrapper(e);
    }
    var prevValue = self._input.value;
    setHoursFromInputs();
    updateValue();
    if (self._input.value !== prevValue) {
      self._debouncedChange();
    }
  }
  function ampm2military(hour, amPM) {
    return hour % 12 + 12 * int(amPM === self.l10n.amPM[1]);
  }
  function military2ampm(hour) {
    switch (hour % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return hour % 12;
    }
  }
  function setHoursFromInputs() {
    if (self.hourElement === undefined || self.minuteElement === undefined) return;
    var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24,
      minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60,
      seconds = self.secondElement !== undefined ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
    if (self.amPM !== undefined) {
      hours = ampm2military(hours, self.amPM.textContent);
    }
    var limitMinHours = self.config.minTime !== undefined || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.minDate, true) === 0;
    var limitMaxHours = self.config.maxTime !== undefined || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.maxDate, true) === 0;
    if (self.config.maxTime !== undefined && self.config.minTime !== undefined && self.config.minTime > self.config.maxTime) {
      var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
      var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
      var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
      if (currentTime > maxBound && currentTime < minBound) {
        var result = parseSeconds(minBound);
        hours = result[0];
        minutes = result[1];
        seconds = result[2];
      }
    } else {
      if (limitMaxHours) {
        var maxTime = self.config.maxTime !== undefined ? self.config.maxTime : self.config.maxDate;
        hours = Math.min(hours, maxTime.getHours());
        if (hours === maxTime.getHours()) minutes = Math.min(minutes, maxTime.getMinutes());
        if (minutes === maxTime.getMinutes()) seconds = Math.min(seconds, maxTime.getSeconds());
      }
      if (limitMinHours) {
        var minTime = self.config.minTime !== undefined ? self.config.minTime : self.config.minDate;
        hours = Math.max(hours, minTime.getHours());
        if (hours === minTime.getHours() && minutes < minTime.getMinutes()) minutes = minTime.getMinutes();
        if (minutes === minTime.getMinutes()) seconds = Math.max(seconds, minTime.getSeconds());
      }
    }
    setHours(hours, minutes, seconds);
  }
  function setHoursFromDate(dateObj) {
    var date = dateObj || self.latestSelectedDateObj;
    if (date && date instanceof Date) {
      setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }
  function setHours(hours, minutes, seconds) {
    if (self.latestSelectedDateObj !== undefined) {
      self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
    }
    if (!self.hourElement || !self.minuteElement || self.isMobile) return;
    self.hourElement.value = pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * int(hours % 12 === 0) : hours);
    self.minuteElement.value = pad(minutes);
    if (self.amPM !== undefined) self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
    if (self.secondElement !== undefined) self.secondElement.value = pad(seconds);
  }
  function onYearInput(event) {
    var eventTarget = getEventTarget(event);
    var year = parseInt(eventTarget.value) + (event.delta || 0);
    if (year / 1000 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
      changeYear(year);
    }
  }
  function bind(element, event, handler, options) {
    if (event instanceof Array) return event.forEach(function (ev) {
      return bind(element, ev, handler, options);
    });
    if (element instanceof Array) return element.forEach(function (el) {
      return bind(el, event, handler, options);
    });
    element.addEventListener(event, handler, options);
    self._handlers.push({
      remove: function () {
        return element.removeEventListener(event, handler, options);
      }
    });
  }
  function triggerChange() {
    triggerEvent("onChange");
  }
  function bindEvents() {
    if (self.config.wrap) {
      ["open", "close", "toggle", "clear"].forEach(function (evt) {
        Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
          return bind(el, "click", self[evt]);
        });
      });
    }
    if (self.isMobile) {
      setupMobile();
      return;
    }
    var debouncedResize = debounce(onResize, 50);
    self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
    if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) bind(self.daysContainer, "mouseover", function (e) {
      if (self.config.mode === "range") onMouseOver(getEventTarget(e));
    });
    bind(self._input, "keydown", onKeyDown);
    if (self.calendarContainer !== undefined) {
      bind(self.calendarContainer, "keydown", onKeyDown);
    }
    if (!self.config.inline && !self.config.static) bind(window, "resize", debouncedResize);
    if (window.ontouchstart !== undefined) bind(window.document, "touchstart", documentClick);else bind(window.document, "mousedown", documentClick);
    bind(window.document, "focus", documentClick, {
      capture: true
    });
    if (self.config.clickOpens === true) {
      bind(self._input, "focus", self.open);
      bind(self._input, "click", self.open);
    }
    if (self.daysContainer !== undefined) {
      bind(self.monthNav, "click", onMonthNavClick);
      bind(self.monthNav, ["keyup", "increment"], onYearInput);
      bind(self.daysContainer, "click", selectDate);
    }
    if (self.timeContainer !== undefined && self.minuteElement !== undefined && self.hourElement !== undefined) {
      var selText = function (e) {
        return getEventTarget(e).select();
      };
      bind(self.timeContainer, ["increment"], updateTime);
      bind(self.timeContainer, "blur", updateTime, {
        capture: true
      });
      bind(self.timeContainer, "click", timeIncrement);
      bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
      if (self.secondElement !== undefined) bind(self.secondElement, "focus", function () {
        return self.secondElement && self.secondElement.select();
      });
      if (self.amPM !== undefined) {
        bind(self.amPM, "click", function (e) {
          updateTime(e);
        });
      }
    }
    if (self.config.allowInput) {
      bind(self._input, "blur", onBlur);
    }
  }
  function jumpToDate(jumpDate, triggerChange) {
    var jumpTo = jumpDate !== undefined ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
    var oldYear = self.currentYear;
    var oldMonth = self.currentMonth;
    try {
      if (jumpTo !== undefined) {
        self.currentYear = jumpTo.getFullYear();
        self.currentMonth = jumpTo.getMonth();
      }
    } catch (e) {
      e.message = "Invalid date supplied: " + jumpTo;
      self.config.errorHandler(e);
    }
    if (triggerChange && self.currentYear !== oldYear) {
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    if (triggerChange && (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
      triggerEvent("onMonthChange");
    }
    self.redraw();
  }
  function timeIncrement(e) {
    var eventTarget = getEventTarget(e);
    if (~eventTarget.className.indexOf("arrow")) incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
  }
  function incrementNumInput(e, delta, inputElem) {
    var target = e && getEventTarget(e);
    var input = inputElem || target && target.parentNode && target.parentNode.firstChild;
    var event = createEvent("increment");
    event.delta = delta;
    input && input.dispatchEvent(event);
  }
  function build() {
    var fragment = window.document.createDocumentFragment();
    self.calendarContainer = createElement("div", "flatpickr-calendar");
    self.calendarContainer.tabIndex = -1;
    if (!self.config.noCalendar) {
      fragment.appendChild(buildMonthNav());
      self.innerContainer = createElement("div", "flatpickr-innerContainer");
      if (self.config.weekNumbers) {
        var _a = buildWeeks(),
          weekWrapper = _a.weekWrapper,
          weekNumbers = _a.weekNumbers;
        self.innerContainer.appendChild(weekWrapper);
        self.weekNumbers = weekNumbers;
        self.weekWrapper = weekWrapper;
      }
      self.rContainer = createElement("div", "flatpickr-rContainer");
      self.rContainer.appendChild(buildWeekdays());
      if (!self.daysContainer) {
        self.daysContainer = createElement("div", "flatpickr-days");
        self.daysContainer.tabIndex = -1;
      }
      buildDays();
      self.rContainer.appendChild(self.daysContainer);
      self.innerContainer.appendChild(self.rContainer);
      fragment.appendChild(self.innerContainer);
    }
    if (self.config.enableTime) {
      fragment.appendChild(buildTime());
    }
    toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
    toggleClass(self.calendarContainer, "animate", self.config.animate === true);
    toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
    self.calendarContainer.appendChild(fragment);
    var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType !== undefined;
    if (self.config.inline || self.config.static) {
      self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
      if (self.config.inline) {
        if (!customAppend && self.element.parentNode) self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);else if (self.config.appendTo !== undefined) self.config.appendTo.appendChild(self.calendarContainer);
      }
      if (self.config.static) {
        var wrapper = createElement("div", "flatpickr-wrapper");
        if (self.element.parentNode) self.element.parentNode.insertBefore(wrapper, self.element);
        wrapper.appendChild(self.element);
        if (self.altInput) wrapper.appendChild(self.altInput);
        wrapper.appendChild(self.calendarContainer);
      }
    }
    if (!self.config.static && !self.config.inline) (self.config.appendTo !== undefined ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
  }
  function createDay(className, date, _dayNumber, i) {
    var dateIsEnabled = isEnabled(date, true),
      dayElement = createElement("span", className, date.getDate().toString());
    dayElement.dateObj = date;
    dayElement.$i = i;
    dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
    if (className.indexOf("hidden") === -1 && compareDates(date, self.now) === 0) {
      self.todayDateElem = dayElement;
      dayElement.classList.add("today");
      dayElement.setAttribute("aria-current", "date");
    }
    if (dateIsEnabled) {
      dayElement.tabIndex = -1;
      if (isDateSelected(date)) {
        dayElement.classList.add("selected");
        self.selectedDateElem = dayElement;
        if (self.config.mode === "range") {
          toggleClass(dayElement, "startRange", self.selectedDates[0] && compareDates(date, self.selectedDates[0], true) === 0);
          toggleClass(dayElement, "endRange", self.selectedDates[1] && compareDates(date, self.selectedDates[1], true) === 0);
          if (className === "nextMonthDay") dayElement.classList.add("inRange");
        }
      }
    } else {
      dayElement.classList.add("flatpickr-disabled");
    }
    if (self.config.mode === "range") {
      if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");
    }
    if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && i % 7 === 6) {
      self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
    }
    triggerEvent("onDayCreate", dayElement);
    return dayElement;
  }
  function focusOnDayElem(targetNode) {
    targetNode.focus();
    if (self.config.mode === "range") onMouseOver(targetNode);
  }
  function getFirstAvailableDay(delta) {
    var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
    var endMonth = delta > 0 ? self.config.showMonths : -1;
    for (var m = startMonth; m != endMonth; m += delta) {
      var month = self.daysContainer.children[m];
      var startIndex = delta > 0 ? 0 : month.children.length - 1;
      var endIndex = delta > 0 ? month.children.length : -1;
      for (var i = startIndex; i != endIndex; i += delta) {
        var c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj)) return c;
      }
    }
    return undefined;
  }
  function getNextAvailableDay(current, delta) {
    var givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
    var endMonth = delta > 0 ? self.config.showMonths : -1;
    var loopDelta = delta > 0 ? 1 : -1;
    for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
      var month = self.daysContainer.children[m];
      var startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
      var numMonthDays = month.children.length;
      for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
        var c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta)) return focusOnDayElem(c);
      }
    }
    self.changeMonth(loopDelta);
    focusOnDay(getFirstAvailableDay(loopDelta), 0);
    return undefined;
  }
  function focusOnDay(current, offset) {
    var activeElement = getClosestActiveElement();
    var dayFocused = isInView(activeElement || document.body);
    var startElem = current !== undefined ? current : dayFocused ? activeElement : self.selectedDateElem !== undefined && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== undefined && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
    if (startElem === undefined) {
      self._input.focus();
    } else if (!dayFocused) {
      focusOnDayElem(startElem);
    } else {
      getNextAvailableDay(startElem, offset);
    }
  }
  function buildMonthDays(year, month) {
    var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
    var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
    var daysInMonth = self.utils.getDaysInMonth(month, year),
      days = window.document.createDocumentFragment(),
      isMultiMonth = self.config.showMonths > 1,
      prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay",
      nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
    var dayNumber = prevMonthDays + 1 - firstOfMonth,
      dayIndex = 0;
    for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
      days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
    }
    for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
      days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
    }
    for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
      days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
    }
    var dayContainer = createElement("div", "dayContainer");
    dayContainer.appendChild(days);
    return dayContainer;
  }
  function buildDays() {
    if (self.daysContainer === undefined) {
      return;
    }
    clearNode(self.daysContainer);
    if (self.weekNumbers) clearNode(self.weekNumbers);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < self.config.showMonths; i++) {
      var d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
    }
    self.daysContainer.appendChild(frag);
    self.days = self.daysContainer.firstChild;
    if (self.config.mode === "range" && self.selectedDates.length === 1) {
      onMouseOver();
    }
  }
  function buildMonthSwitch() {
    if (self.config.showMonths > 1 || self.config.monthSelectorType !== "dropdown") return;
    var shouldBuildMonth = function (month) {
      if (self.config.minDate !== undefined && self.currentYear === self.config.minDate.getFullYear() && month < self.config.minDate.getMonth()) {
        return false;
      }
      return !(self.config.maxDate !== undefined && self.currentYear === self.config.maxDate.getFullYear() && month > self.config.maxDate.getMonth());
    };
    self.monthsDropdownContainer.tabIndex = -1;
    self.monthsDropdownContainer.innerHTML = "";
    for (var i = 0; i < 12; i++) {
      if (!shouldBuildMonth(i)) continue;
      var month = createElement("option", "flatpickr-monthDropdown-month");
      month.value = new Date(self.currentYear, i).getMonth().toString();
      month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
      month.tabIndex = -1;
      if (self.currentMonth === i) {
        month.selected = true;
      }
      self.monthsDropdownContainer.appendChild(month);
    }
  }
  function buildMonth() {
    var container = createElement("div", "flatpickr-month");
    var monthNavFragment = window.document.createDocumentFragment();
    var monthElement;
    if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
      monthElement = createElement("span", "cur-month");
    } else {
      self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
      self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
      bind(self.monthsDropdownContainer, "change", function (e) {
        var target = getEventTarget(e);
        var selectedMonth = parseInt(target.value, 10);
        self.changeMonth(selectedMonth - self.currentMonth);
        triggerEvent("onMonthChange");
      });
      buildMonthSwitch();
      monthElement = self.monthsDropdownContainer;
    }
    var yearInput = createNumberInput("cur-year", {
      tabindex: "-1"
    });
    var yearElement = yearInput.getElementsByTagName("input")[0];
    yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
    if (self.config.minDate) {
      yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
    }
    if (self.config.maxDate) {
      yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
      yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
    }
    var currentMonth = createElement("div", "flatpickr-current-month");
    currentMonth.appendChild(monthElement);
    currentMonth.appendChild(yearInput);
    monthNavFragment.appendChild(currentMonth);
    container.appendChild(monthNavFragment);
    return {
      container: container,
      yearElement: yearElement,
      monthElement: monthElement
    };
  }
  function buildMonths() {
    clearNode(self.monthNav);
    self.monthNav.appendChild(self.prevMonthNav);
    if (self.config.showMonths) {
      self.yearElements = [];
      self.monthElements = [];
    }
    for (var m = self.config.showMonths; m--;) {
      var month = buildMonth();
      self.yearElements.push(month.yearElement);
      self.monthElements.push(month.monthElement);
      self.monthNav.appendChild(month.container);
    }
    self.monthNav.appendChild(self.nextMonthNav);
  }
  function buildMonthNav() {
    self.monthNav = createElement("div", "flatpickr-months");
    self.yearElements = [];
    self.monthElements = [];
    self.prevMonthNav = createElement("span", "flatpickr-prev-month");
    self.prevMonthNav.innerHTML = self.config.prevArrow;
    self.nextMonthNav = createElement("span", "flatpickr-next-month");
    self.nextMonthNav.innerHTML = self.config.nextArrow;
    buildMonths();
    Object.defineProperty(self, "_hidePrevMonthArrow", {
      get: function () {
        return self.__hidePrevMonthArrow;
      },
      set: function (bool) {
        if (self.__hidePrevMonthArrow !== bool) {
          toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
          self.__hidePrevMonthArrow = bool;
        }
      }
    });
    Object.defineProperty(self, "_hideNextMonthArrow", {
      get: function () {
        return self.__hideNextMonthArrow;
      },
      set: function (bool) {
        if (self.__hideNextMonthArrow !== bool) {
          toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
          self.__hideNextMonthArrow = bool;
        }
      }
    });
    self.currentYearElement = self.yearElements[0];
    updateNavigationCurrentMonth();
    return self.monthNav;
  }
  function buildTime() {
    self.calendarContainer.classList.add("hasTime");
    if (self.config.noCalendar) self.calendarContainer.classList.add("noCalendar");
    var defaults = getDefaultHours(self.config);
    self.timeContainer = createElement("div", "flatpickr-time");
    self.timeContainer.tabIndex = -1;
    var separator = createElement("span", "flatpickr-time-separator", ":");
    var hourInput = createNumberInput("flatpickr-hour", {
      "aria-label": self.l10n.hourAriaLabel
    });
    self.hourElement = hourInput.getElementsByTagName("input")[0];
    var minuteInput = createNumberInput("flatpickr-minute", {
      "aria-label": self.l10n.minuteAriaLabel
    });
    self.minuteElement = minuteInput.getElementsByTagName("input")[0];
    self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
    self.hourElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.time_24hr ? defaults.hours : military2ampm(defaults.hours));
    self.minuteElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : defaults.minutes);
    self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
    self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
    self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
    self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
    self.hourElement.setAttribute("maxlength", "2");
    self.minuteElement.setAttribute("min", "0");
    self.minuteElement.setAttribute("max", "59");
    self.minuteElement.setAttribute("maxlength", "2");
    self.timeContainer.appendChild(hourInput);
    self.timeContainer.appendChild(separator);
    self.timeContainer.appendChild(minuteInput);
    if (self.config.time_24hr) self.timeContainer.classList.add("time24hr");
    if (self.config.enableSeconds) {
      self.timeContainer.classList.add("hasSeconds");
      var secondInput = createNumberInput("flatpickr-second");
      self.secondElement = secondInput.getElementsByTagName("input")[0];
      self.secondElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : defaults.seconds);
      self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
      self.secondElement.setAttribute("min", "0");
      self.secondElement.setAttribute("max", "59");
      self.secondElement.setAttribute("maxlength", "2");
      self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
      self.timeContainer.appendChild(secondInput);
    }
    if (!self.config.time_24hr) {
      self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11)]);
      self.amPM.title = self.l10n.toggleTitle;
      self.amPM.tabIndex = -1;
      self.timeContainer.appendChild(self.amPM);
    }
    return self.timeContainer;
  }
  function buildWeekdays() {
    if (!self.weekdayContainer) self.weekdayContainer = createElement("div", "flatpickr-weekdays");else clearNode(self.weekdayContainer);
    for (var i = self.config.showMonths; i--;) {
      var container = createElement("div", "flatpickr-weekdaycontainer");
      self.weekdayContainer.appendChild(container);
    }
    updateWeekdays();
    return self.weekdayContainer;
  }
  function updateWeekdays() {
    if (!self.weekdayContainer) {
      return;
    }
    var firstDayOfWeek = self.l10n.firstDayOfWeek;
    var weekdays = __spreadArrays$4(self.l10n.weekdays.shorthand);
    if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
      weekdays = __spreadArrays$4(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
    }
    for (var i = self.config.showMonths; i--;) {
      self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
    }
  }
  function buildWeeks() {
    self.calendarContainer.classList.add("hasWeeks");
    var weekWrapper = createElement("div", "flatpickr-weekwrapper");
    weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
    var weekNumbers = createElement("div", "flatpickr-weeks");
    weekWrapper.appendChild(weekNumbers);
    return {
      weekWrapper: weekWrapper,
      weekNumbers: weekNumbers
    };
  }
  function changeMonth(value, isOffset) {
    if (isOffset === void 0) {
      isOffset = true;
    }
    var delta = isOffset ? value : value - self.currentMonth;
    if (delta < 0 && self._hidePrevMonthArrow === true || delta > 0 && self._hideNextMonthArrow === true) return;
    self.currentMonth += delta;
    if (self.currentMonth < 0 || self.currentMonth > 11) {
      self.currentYear += self.currentMonth > 11 ? 1 : -1;
      self.currentMonth = (self.currentMonth + 12) % 12;
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    buildDays();
    triggerEvent("onMonthChange");
    updateNavigationCurrentMonth();
  }
  function clear(triggerChangeEvent, toInitial) {
    if (triggerChangeEvent === void 0) {
      triggerChangeEvent = true;
    }
    if (toInitial === void 0) {
      toInitial = true;
    }
    self.input.value = "";
    if (self.altInput !== undefined) self.altInput.value = "";
    if (self.mobileInput !== undefined) self.mobileInput.value = "";
    self.selectedDates = [];
    self.latestSelectedDateObj = undefined;
    if (toInitial === true) {
      self.currentYear = self._initialDate.getFullYear();
      self.currentMonth = self._initialDate.getMonth();
    }
    if (self.config.enableTime === true) {
      var _a = getDefaultHours(self.config),
        hours = _a.hours,
        minutes = _a.minutes,
        seconds = _a.seconds;
      setHours(hours, minutes, seconds);
    }
    self.redraw();
    if (triggerChangeEvent) triggerEvent("onChange");
  }
  function close() {
    self.isOpen = false;
    if (!self.isMobile) {
      if (self.calendarContainer !== undefined) {
        self.calendarContainer.classList.remove("open");
      }
      if (self._input !== undefined) {
        self._input.classList.remove("active");
      }
    }
    triggerEvent("onClose");
  }
  function destroy() {
    if (self.config !== undefined) triggerEvent("onDestroy");
    for (var i = self._handlers.length; i--;) {
      self._handlers[i].remove();
    }
    self._handlers = [];
    if (self.mobileInput) {
      if (self.mobileInput.parentNode) self.mobileInput.parentNode.removeChild(self.mobileInput);
      self.mobileInput = undefined;
    } else if (self.calendarContainer && self.calendarContainer.parentNode) {
      if (self.config.static && self.calendarContainer.parentNode) {
        var wrapper = self.calendarContainer.parentNode;
        wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
        if (wrapper.parentNode) {
          while (wrapper.firstChild) wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
      } else self.calendarContainer.parentNode.removeChild(self.calendarContainer);
    }
    if (self.altInput) {
      self.input.type = "text";
      if (self.altInput.parentNode) self.altInput.parentNode.removeChild(self.altInput);
      delete self.altInput;
    }
    if (self.input) {
      self.input.type = self.input._type;
      self.input.classList.remove("flatpickr-input");
      self.input.removeAttribute("readonly");
    }
    ["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function (k) {
      try {
        delete self[k];
      } catch (_) {}
    });
  }
  function isCalendarElem(elem) {
    return self.calendarContainer.contains(elem);
  }
  function documentClick(e) {
    if (self.isOpen && !self.config.inline) {
      var eventTarget_1 = getEventTarget(e);
      var isCalendarElement = isCalendarElem(eventTarget_1);
      var isInput = eventTarget_1 === self.input || eventTarget_1 === self.altInput || self.element.contains(eventTarget_1) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
      var lostFocus = !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
      var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
        return elem.contains(eventTarget_1);
      });
      if (lostFocus && isIgnored) {
        if (self.config.allowInput) {
          self.setDate(self._input.value, false, self.config.altInput ? self.config.altFormat : self.config.dateFormat);
        }
        if (self.timeContainer !== undefined && self.minuteElement !== undefined && self.hourElement !== undefined && self.input.value !== "" && self.input.value !== undefined) {
          updateTime();
        }
        self.close();
        if (self.config && self.config.mode === "range" && self.selectedDates.length === 1) self.clear(false);
      }
    }
  }
  function changeYear(newYear) {
    if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear()) return;
    var newYearNum = newYear,
      isNewYear = self.currentYear !== newYearNum;
    self.currentYear = newYearNum || self.currentYear;
    if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
      self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
    } else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
      self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
    }
    if (isNewYear) {
      self.redraw();
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
  }
  function isEnabled(date, timeless) {
    var _a;
    if (timeless === void 0) {
      timeless = true;
    }
    var dateToCheck = self.parseDate(date, undefined, timeless);
    if (self.config.minDate && dateToCheck && compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0) return false;
    if (!self.config.enable && self.config.disable.length === 0) return true;
    if (dateToCheck === undefined) return false;
    var bool = !!self.config.enable,
      array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
    for (var i = 0, d = void 0; i < array.length; i++) {
      d = array[i];
      if (typeof d === "function" && d(dateToCheck)) return bool;else if (d instanceof Date && dateToCheck !== undefined && d.getTime() === dateToCheck.getTime()) return bool;else if (typeof d === "string") {
        var parsed = self.parseDate(d, undefined, true);
        return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
      } else if (typeof d === "object" && dateToCheck !== undefined && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime()) return bool;
    }
    return !bool;
  }
  function isInView(elem) {
    if (self.daysContainer !== undefined) return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self.daysContainer.contains(elem);
    return false;
  }
  function onBlur(e) {
    var isInput = e.target === self._input;
    var valueChanged = self._input.value.trimEnd() !== getDateStr();
    if (isInput && valueChanged && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
      self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
    }
  }
  function onKeyDown(e) {
    var eventTarget = getEventTarget(e);
    var isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
    var allowInput = self.config.allowInput;
    var allowKeydown = self.isOpen && (!allowInput || !isInput);
    var allowInlineKeydown = self.config.inline && isInput && !allowInput;
    if (e.keyCode === 13 && isInput) {
      if (allowInput) {
        self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
        self.close();
        return eventTarget.blur();
      } else {
        self.open();
      }
    } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
      var isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);
      switch (e.keyCode) {
        case 13:
          if (isTimeObj) {
            e.preventDefault();
            updateTime();
            focusAndClose();
          } else selectDate(e);
          break;
        case 27:
          e.preventDefault();
          focusAndClose();
          break;
        case 8:
        case 46:
          if (isInput && !self.config.allowInput) {
            e.preventDefault();
            self.clear();
          }
          break;
        case 37:
        case 39:
          if (!isTimeObj && !isInput) {
            e.preventDefault();
            var activeElement = getClosestActiveElement();
            if (self.daysContainer !== undefined && (allowInput === false || activeElement && isInView(activeElement))) {
              var delta_1 = e.keyCode === 39 ? 1 : -1;
              if (!e.ctrlKey) focusOnDay(undefined, delta_1);else {
                e.stopPropagation();
                changeMonth(delta_1);
                focusOnDay(getFirstAvailableDay(1), 0);
              }
            }
          } else if (self.hourElement) self.hourElement.focus();
          break;
        case 38:
        case 40:
          e.preventDefault();
          var delta = e.keyCode === 40 ? 1 : -1;
          if (self.daysContainer && eventTarget.$i !== undefined || eventTarget === self.input || eventTarget === self.altInput) {
            if (e.ctrlKey) {
              e.stopPropagation();
              changeYear(self.currentYear - delta);
              focusOnDay(getFirstAvailableDay(1), 0);
            } else if (!isTimeObj) focusOnDay(undefined, delta * 7);
          } else if (eventTarget === self.currentYearElement) {
            changeYear(self.currentYear - delta);
          } else if (self.config.enableTime) {
            if (!isTimeObj && self.hourElement) self.hourElement.focus();
            updateTime(e);
            self._debouncedChange();
          }
          break;
        case 9:
          if (isTimeObj) {
            var elems = [self.hourElement, self.minuteElement, self.secondElement, self.amPM].concat(self.pluginElements).filter(function (x) {
              return x;
            });
            var i = elems.indexOf(eventTarget);
            if (i !== -1) {
              var target = elems[i + (e.shiftKey ? -1 : 1)];
              e.preventDefault();
              (target || self._input).focus();
            }
          } else if (!self.config.noCalendar && self.daysContainer && self.daysContainer.contains(eventTarget) && e.shiftKey) {
            e.preventDefault();
            self._input.focus();
          }
          break;
      }
    }
    if (self.amPM !== undefined && eventTarget === self.amPM) {
      switch (e.key) {
        case self.l10n.amPM[0].charAt(0):
        case self.l10n.amPM[0].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[0];
          setHoursFromInputs();
          updateValue();
          break;
        case self.l10n.amPM[1].charAt(0):
        case self.l10n.amPM[1].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[1];
          setHoursFromInputs();
          updateValue();
          break;
      }
    }
    if (isInput || isCalendarElem(eventTarget)) {
      triggerEvent("onKeyDown", e);
    }
  }
  function onMouseOver(elem, cellClass) {
    if (cellClass === void 0) {
      cellClass = "flatpickr-day";
    }
    if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains(cellClass) || elem.classList.contains("flatpickr-disabled"))) return;
    var hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(),
      initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(),
      rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()),
      rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
    var containsDisabled = false;
    var minRange = 0,
      maxRange = 0;
    for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
      if (!isEnabled(new Date(t), true)) {
        containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
        if (t < initialDate && (!minRange || t > minRange)) minRange = t;else if (t > initialDate && (!maxRange || t < maxRange)) maxRange = t;
      }
    }
    var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
    hoverableCells.forEach(function (dayElem) {
      var date = dayElem.dateObj;
      var timestamp = date.getTime();
      var outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
      if (outOfRange) {
        dayElem.classList.add("notAllowed");
        ["inRange", "startRange", "endRange"].forEach(function (c) {
          dayElem.classList.remove(c);
        });
        return;
      } else if (containsDisabled && !outOfRange) return;
      ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
        dayElem.classList.remove(c);
      });
      if (elem !== undefined) {
        elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
        if (initialDate < hoverDate && timestamp === initialDate) dayElem.classList.add("startRange");else if (initialDate > hoverDate && timestamp === initialDate) dayElem.classList.add("endRange");
        if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate)) dayElem.classList.add("inRange");
      }
    });
  }
  function onResize() {
    if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
  }
  function open(e, positionElement) {
    if (positionElement === void 0) {
      positionElement = self._positionElement;
    }
    if (self.isMobile === true) {
      if (e) {
        e.preventDefault();
        var eventTarget = getEventTarget(e);
        if (eventTarget) {
          eventTarget.blur();
        }
      }
      if (self.mobileInput !== undefined) {
        self.mobileInput.focus();
        self.mobileInput.click();
      }
      triggerEvent("onOpen");
      return;
    } else if (self._input.disabled || self.config.inline) {
      return;
    }
    var wasOpen = self.isOpen;
    self.isOpen = true;
    if (!wasOpen) {
      self.calendarContainer.classList.add("open");
      self._input.classList.add("active");
      triggerEvent("onOpen");
      positionCalendar(positionElement);
    }
    if (self.config.enableTime === true && self.config.noCalendar === true) {
      if (self.config.allowInput === false && (e === undefined || !self.timeContainer.contains(e.relatedTarget))) {
        setTimeout(function () {
          return self.hourElement.select();
        }, 50);
      }
    }
  }
  function minMaxDateSetter(type) {
    return function (date) {
      var dateObj = self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat);
      var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
      if (dateObj !== undefined) {
        self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
      }
      if (self.selectedDates) {
        self.selectedDates = self.selectedDates.filter(function (d) {
          return isEnabled(d);
        });
        if (!self.selectedDates.length && type === "min") setHoursFromDate(dateObj);
        updateValue();
      }
      if (self.daysContainer) {
        redraw();
        if (dateObj !== undefined) self.currentYearElement[type] = dateObj.getFullYear().toString();else self.currentYearElement.removeAttribute(type);
        self.currentYearElement.disabled = !!inverseDateObj && dateObj !== undefined && inverseDateObj.getFullYear() === dateObj.getFullYear();
      }
    };
  }
  function parseConfig() {
    var boolOpts = ["wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"];
    var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
    var formats = {};
    self.config.parseDate = userConfig.parseDate;
    self.config.formatDate = userConfig.formatDate;
    Object.defineProperty(self.config, "enable", {
      get: function () {
        return self.config._enable;
      },
      set: function (dates) {
        self.config._enable = parseDateRules(dates);
      }
    });
    Object.defineProperty(self.config, "disable", {
      get: function () {
        return self.config._disable;
      },
      set: function (dates) {
        self.config._disable = parseDateRules(dates);
      }
    });
    var timeMode = userConfig.mode === "time";
    if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
      var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
      formats.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
    }
    if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
      var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
      formats.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(self.config, "minDate", {
      get: function () {
        return self.config._minDate;
      },
      set: minMaxDateSetter("min")
    });
    Object.defineProperty(self.config, "maxDate", {
      get: function () {
        return self.config._maxDate;
      },
      set: minMaxDateSetter("max")
    });
    var minMaxTimeSetter = function (type) {
      return function (val) {
        self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
      };
    };
    Object.defineProperty(self.config, "minTime", {
      get: function () {
        return self.config._minTime;
      },
      set: minMaxTimeSetter("min")
    });
    Object.defineProperty(self.config, "maxTime", {
      get: function () {
        return self.config._maxTime;
      },
      set: minMaxTimeSetter("max")
    });
    if (userConfig.mode === "time") {
      self.config.noCalendar = true;
      self.config.enableTime = true;
    }
    Object.assign(self.config, formats, userConfig);
    for (var i = 0; i < boolOpts.length; i++) self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
    HOOKS.filter(function (hook) {
      return self.config[hook] !== undefined;
    }).forEach(function (hook) {
      self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
    });
    self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var i = 0; i < self.config.plugins.length; i++) {
      var pluginConf = self.config.plugins[i](self) || {};
      for (var key in pluginConf) {
        if (HOOKS.indexOf(key) > -1) {
          self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
        } else if (typeof userConfig[key] === "undefined") self.config[key] = pluginConf[key];
      }
    }
    if (!userConfig.altInputClass) {
      self.config.altInputClass = getInputElem().className + " " + self.config.altInputClass;
    }
    triggerEvent("onParseConfig");
  }
  function getInputElem() {
    return self.config.wrap ? element.querySelector("[data-input]") : element;
  }
  function setupLocale() {
    if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined") self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
    self.l10n = __assign(__assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : undefined);
    tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
    tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
    tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
    tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
    tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
    var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
    if (userConfig.time_24hr === undefined && flatpickr.defaultConfig.time_24hr === undefined) {
      self.config.time_24hr = self.l10n.time_24hr;
    }
    self.formatDate = createDateFormatter(self);
    self.parseDate = createDateParser({
      config: self.config,
      l10n: self.l10n
    });
  }
  function positionCalendar(customPositionElement) {
    if (typeof self.config.position === "function") {
      return void self.config.position(self, customPositionElement);
    }
    if (self.calendarContainer === undefined) return;
    triggerEvent("onPreCalendarPosition");
    var positionElement = customPositionElement || self._positionElement;
    var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, function (acc, child) {
        return acc + child.offsetHeight;
      }, 0),
      calendarWidth = self.calendarContainer.offsetWidth,
      configPos = self.config.position.split(" "),
      configPosVertical = configPos[0],
      configPosHorizontal = configPos.length > 1 ? configPos[1] : null,
      inputBounds = positionElement.getBoundingClientRect(),
      distanceFromBottom = window.innerHeight - inputBounds.bottom,
      showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
    var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
    toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
    toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
    if (self.config.inline) return;
    var left = window.pageXOffset + inputBounds.left;
    var isCenter = false;
    var isRight = false;
    if (configPosHorizontal === "center") {
      left -= (calendarWidth - inputBounds.width) / 2;
      isCenter = true;
    } else if (configPosHorizontal === "right") {
      left -= calendarWidth - inputBounds.width;
      isRight = true;
    }
    toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
    toggleClass(self.calendarContainer, "arrowCenter", isCenter);
    toggleClass(self.calendarContainer, "arrowRight", isRight);
    var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
    var rightMost = left + calendarWidth > window.document.body.offsetWidth;
    var centerMost = right + calendarWidth > window.document.body.offsetWidth;
    toggleClass(self.calendarContainer, "rightMost", rightMost);
    if (self.config.static) return;
    self.calendarContainer.style.top = top + "px";
    if (!rightMost) {
      self.calendarContainer.style.left = left + "px";
      self.calendarContainer.style.right = "auto";
    } else if (!centerMost) {
      self.calendarContainer.style.left = "auto";
      self.calendarContainer.style.right = right + "px";
    } else {
      var doc = getDocumentStyleSheet();
      if (doc === undefined) return;
      var bodyWidth = window.document.body.offsetWidth;
      var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
      var centerBefore = ".flatpickr-calendar.centerMost:before";
      var centerAfter = ".flatpickr-calendar.centerMost:after";
      var centerIndex = doc.cssRules.length;
      var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
      toggleClass(self.calendarContainer, "rightMost", false);
      toggleClass(self.calendarContainer, "centerMost", true);
      doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
      self.calendarContainer.style.left = centerLeft + "px";
      self.calendarContainer.style.right = "auto";
    }
  }
  function getDocumentStyleSheet() {
    var editableSheet = null;
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i];
      if (!sheet.cssRules) continue;
      try {
        sheet.cssRules;
      } catch (err) {
        continue;
      }
      editableSheet = sheet;
      break;
    }
    return editableSheet != null ? editableSheet : createStyleSheet();
  }
  function createStyleSheet() {
    var style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
  }
  function redraw() {
    if (self.config.noCalendar || self.isMobile) return;
    buildMonthSwitch();
    updateNavigationCurrentMonth();
    buildDays();
  }
  function focusAndClose() {
    self._input.focus();
    if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== undefined) {
      setTimeout(self.close, 0);
    } else {
      self.close();
    }
  }
  function selectDate(e) {
    e.preventDefault();
    e.stopPropagation();
    var isSelectable = function (day) {
      return day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
    };
    var t = findParent(getEventTarget(e), isSelectable);
    if (t === undefined) return;
    var target = t;
    var selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
    var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
    self.selectedDateElem = target;
    if (self.config.mode === "single") self.selectedDates = [selectedDate];else if (self.config.mode === "multiple") {
      var selectedIndex = isDateSelected(selectedDate);
      if (selectedIndex) self.selectedDates.splice(parseInt(selectedIndex), 1);else self.selectedDates.push(selectedDate);
    } else if (self.config.mode === "range") {
      if (self.selectedDates.length === 2) {
        self.clear(false, false);
      }
      self.latestSelectedDateObj = selectedDate;
      self.selectedDates.push(selectedDate);
      if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort(function (a, b) {
        return a.getTime() - b.getTime();
      });
    }
    setHoursFromInputs();
    if (shouldChangeMonth) {
      var isNewYear = self.currentYear !== selectedDate.getFullYear();
      self.currentYear = selectedDate.getFullYear();
      self.currentMonth = selectedDate.getMonth();
      if (isNewYear) {
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      triggerEvent("onMonthChange");
    }
    updateNavigationCurrentMonth();
    buildDays();
    updateValue();
    if (!shouldChangeMonth && self.config.mode !== "range" && self.config.showMonths === 1) focusOnDayElem(target);else if (self.selectedDateElem !== undefined && self.hourElement === undefined) {
      self.selectedDateElem && self.selectedDateElem.focus();
    }
    if (self.hourElement !== undefined) self.hourElement !== undefined && self.hourElement.focus();
    if (self.config.closeOnSelect) {
      var single = self.config.mode === "single" && !self.config.enableTime;
      var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
      if (single || range) {
        focusAndClose();
      }
    }
    triggerChange();
  }
  var CALLBACKS = {
    locale: [setupLocale, updateWeekdays],
    showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
    minDate: [jumpToDate],
    maxDate: [jumpToDate],
    positionElement: [updatePositionElement],
    clickOpens: [function () {
      if (self.config.clickOpens === true) {
        bind(self._input, "focus", self.open);
        bind(self._input, "click", self.open);
      } else {
        self._input.removeEventListener("focus", self.open);
        self._input.removeEventListener("click", self.open);
      }
    }]
  };
  function set(option, value) {
    if (option !== null && typeof option === "object") {
      Object.assign(self.config, option);
      for (var key in option) {
        if (CALLBACKS[key] !== undefined) CALLBACKS[key].forEach(function (x) {
          return x();
        });
      }
    } else {
      self.config[option] = value;
      if (CALLBACKS[option] !== undefined) CALLBACKS[option].forEach(function (x) {
        return x();
      });else if (HOOKS.indexOf(option) > -1) self.config[option] = arrayify(value);
    }
    self.redraw();
    updateValue(true);
  }
  function setSelectedDate(inputDate, format) {
    var dates = [];
    if (inputDate instanceof Array) dates = inputDate.map(function (d) {
      return self.parseDate(d, format);
    });else if (inputDate instanceof Date || typeof inputDate === "number") dates = [self.parseDate(inputDate, format)];else if (typeof inputDate === "string") {
      switch (self.config.mode) {
        case "single":
        case "time":
          dates = [self.parseDate(inputDate, format)];
          break;
        case "multiple":
          dates = inputDate.split(self.config.conjunction).map(function (date) {
            return self.parseDate(date, format);
          });
          break;
        case "range":
          dates = inputDate.split(self.l10n.rangeSeparator).map(function (date) {
            return self.parseDate(date, format);
          });
          break;
      }
    } else self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
    self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter(function (d) {
      return d instanceof Date && isEnabled(d, false);
    });
    if (self.config.mode === "range") self.selectedDates.sort(function (a, b) {
      return a.getTime() - b.getTime();
    });
  }
  function setDate(date, triggerChange, format) {
    if (triggerChange === void 0) {
      triggerChange = false;
    }
    if (format === void 0) {
      format = self.config.dateFormat;
    }
    if (date !== 0 && !date || date instanceof Array && date.length === 0) return self.clear(triggerChange);
    setSelectedDate(date, format);
    self.latestSelectedDateObj = self.selectedDates[self.selectedDates.length - 1];
    self.redraw();
    jumpToDate(undefined, triggerChange);
    setHoursFromDate();
    if (self.selectedDates.length === 0) {
      self.clear(false);
    }
    updateValue(triggerChange);
    if (triggerChange) triggerEvent("onChange");
  }
  function parseDateRules(arr) {
    return arr.slice().map(function (rule) {
      if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
        return self.parseDate(rule, undefined, true);
      } else if (rule && typeof rule === "object" && rule.from && rule.to) return {
        from: self.parseDate(rule.from, undefined),
        to: self.parseDate(rule.to, undefined)
      };
      return rule;
    }).filter(function (x) {
      return x;
    });
  }
  function setupDates() {
    self.selectedDates = [];
    self.now = self.parseDate(self.config.now) || new Date();
    var preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
    if (preloadedDate) setSelectedDate(preloadedDate, self.config.dateFormat);
    self._initialDate = self.selectedDates.length > 0 ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now.getTime() ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now.getTime() ? self.config.maxDate : self.now;
    self.currentYear = self._initialDate.getFullYear();
    self.currentMonth = self._initialDate.getMonth();
    if (self.selectedDates.length > 0) self.latestSelectedDateObj = self.selectedDates[0];
    if (self.config.minTime !== undefined) self.config.minTime = self.parseDate(self.config.minTime, "H:i");
    if (self.config.maxTime !== undefined) self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
    self.minDateHasTime = !!self.config.minDate && (self.config.minDate.getHours() > 0 || self.config.minDate.getMinutes() > 0 || self.config.minDate.getSeconds() > 0);
    self.maxDateHasTime = !!self.config.maxDate && (self.config.maxDate.getHours() > 0 || self.config.maxDate.getMinutes() > 0 || self.config.maxDate.getSeconds() > 0);
  }
  function setupInputs() {
    self.input = getInputElem();
    if (!self.input) {
      self.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    self.input._type = self.input.type;
    self.input.type = "text";
    self.input.classList.add("flatpickr-input");
    self._input = self.input;
    if (self.config.altInput) {
      self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
      self._input = self.altInput;
      self.altInput.placeholder = self.input.placeholder;
      self.altInput.disabled = self.input.disabled;
      self.altInput.required = self.input.required;
      self.altInput.tabIndex = self.input.tabIndex;
      self.altInput.type = "text";
      self.input.setAttribute("type", "hidden");
      if (!self.config.static && self.input.parentNode) self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
    }
    if (!self.config.allowInput) self._input.setAttribute("readonly", "readonly");
    updatePositionElement();
  }
  function updatePositionElement() {
    self._positionElement = self.config.positionElement || self._input;
  }
  function setupMobile() {
    var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
    self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
    self.mobileInput.tabIndex = 1;
    self.mobileInput.type = inputType;
    self.mobileInput.disabled = self.input.disabled;
    self.mobileInput.required = self.input.required;
    self.mobileInput.placeholder = self.input.placeholder;
    self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
    if (self.selectedDates.length > 0) {
      self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
    }
    if (self.config.minDate) self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
    if (self.config.maxDate) self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
    if (self.input.getAttribute("step")) self.mobileInput.step = String(self.input.getAttribute("step"));
    self.input.type = "hidden";
    if (self.altInput !== undefined) self.altInput.type = "hidden";
    try {
      if (self.input.parentNode) self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
    } catch (_a) {}
    bind(self.mobileInput, "change", function (e) {
      self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
      triggerEvent("onChange");
      triggerEvent("onClose");
    });
  }
  function toggle(e) {
    if (self.isOpen === true) return self.close();
    self.open(e);
  }
  function triggerEvent(event, data) {
    if (self.config === undefined) return;
    var hooks = self.config[event];
    if (hooks !== undefined && hooks.length > 0) {
      for (var i = 0; hooks[i] && i < hooks.length; i++) hooks[i](self.selectedDates, self.input.value, self, data);
    }
    if (event === "onChange") {
      self.input.dispatchEvent(createEvent("change"));
      self.input.dispatchEvent(createEvent("input"));
    }
  }
  function createEvent(name) {
    var e = document.createEvent("Event");
    e.initEvent(name, true, true);
    return e;
  }
  function isDateSelected(date) {
    for (var i = 0; i < self.selectedDates.length; i++) {
      var selectedDate = self.selectedDates[i];
      if (selectedDate instanceof Date && compareDates(selectedDate, date) === 0) return "" + i;
    }
    return false;
  }
  function isDateInRange(date) {
    if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
    return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
  }
  function updateNavigationCurrentMonth() {
    if (self.config.noCalendar || self.isMobile || !self.monthNav) return;
    self.yearElements.forEach(function (yearElement, i) {
      var d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
        self.monthElements[i].textContent = monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
      } else {
        self.monthsDropdownContainer.value = d.getMonth().toString();
      }
      yearElement.value = d.getFullYear().toString();
    });
    self._hidePrevMonthArrow = self.config.minDate !== undefined && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());
    self._hideNextMonthArrow = self.config.maxDate !== undefined && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
  }
  function getDateStr(specificFormat) {
    var format = specificFormat || (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
    return self.selectedDates.map(function (dObj) {
      return self.formatDate(dObj, format);
    }).filter(function (d, i, arr) {
      return self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i;
    }).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
  }
  function updateValue(triggerChange) {
    if (triggerChange === void 0) {
      triggerChange = true;
    }
    if (self.mobileInput !== undefined && self.mobileFormatStr) {
      self.mobileInput.value = self.latestSelectedDateObj !== undefined ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
    }
    self.input.value = getDateStr(self.config.dateFormat);
    if (self.altInput !== undefined) {
      self.altInput.value = getDateStr(self.config.altFormat);
    }
    if (triggerChange !== false) triggerEvent("onValueUpdate");
  }
  function onMonthNavClick(e) {
    var eventTarget = getEventTarget(e);
    var isPrevMonth = self.prevMonthNav.contains(eventTarget);
    var isNextMonth = self.nextMonthNav.contains(eventTarget);
    if (isPrevMonth || isNextMonth) {
      changeMonth(isPrevMonth ? -1 : 1);
    } else if (self.yearElements.indexOf(eventTarget) >= 0) {
      eventTarget.select();
    } else if (eventTarget.classList.contains("arrowUp")) {
      self.changeYear(self.currentYear + 1);
    } else if (eventTarget.classList.contains("arrowDown")) {
      self.changeYear(self.currentYear - 1);
    }
  }
  function timeWrapper(e) {
    e.preventDefault();
    var isKeyDown = e.type === "keydown",
      eventTarget = getEventTarget(e),
      input = eventTarget;
    if (self.amPM !== undefined && eventTarget === self.amPM) {
      self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
    }
    var min = parseFloat(input.getAttribute("min")),
      max = parseFloat(input.getAttribute("max")),
      step = parseFloat(input.getAttribute("step")),
      curValue = parseInt(input.value, 10),
      delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
    var newValue = curValue + step * delta;
    if (typeof input.value !== "undefined" && input.value.length === 2) {
      var isHourElem = input === self.hourElement,
        isMinuteElem = input === self.minuteElement;
      if (newValue < min) {
        newValue = max + newValue + int(!isHourElem) + (int(isHourElem) && int(!self.amPM));
        if (isMinuteElem) incrementNumInput(undefined, -1, self.hourElement);
      } else if (newValue > max) {
        newValue = input === self.hourElement ? newValue - max - int(!self.amPM) : min;
        if (isMinuteElem) incrementNumInput(undefined, 1, self.hourElement);
      }
      if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) {
        self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
      }
      input.value = pad(newValue);
    }
  }
  init();
  return self;
}
function _flatpickr(nodeList, config) {
  var nodes = Array.prototype.slice.call(nodeList).filter(function (x) {
    return x instanceof HTMLElement;
  });
  var instances = [];
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    try {
      if (node.getAttribute("data-fp-omit") !== null) continue;
      if (node._flatpickr !== undefined) {
        node._flatpickr.destroy();
        node._flatpickr = undefined;
      }
      node._flatpickr = FlatpickrInstance(node, config || {});
      instances.push(node._flatpickr);
    } catch (e) {
      console.error(e);
    }
  }
  return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
  HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
    return _flatpickr(this, config);
  };
  HTMLElement.prototype.flatpickr = function (config) {
    return _flatpickr([this], config);
  };
}
var flatpickr = function (selector, config) {
  if (typeof selector === "string") {
    return _flatpickr(window.document.querySelectorAll(selector), config);
  } else if (selector instanceof Node) {
    return _flatpickr([selector], config);
  } else {
    return _flatpickr(selector, config);
  }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
  en: __assign({}, english),
  default: __assign({}, english)
};
flatpickr.localize = function (l10n) {
  flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = function (config) {
  flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
  jQuery.fn.flatpickr = function (config) {
    return _flatpickr(this, config);
  };
}
Date.prototype.fp_incr = function (days) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
  window.flatpickr = flatpickr;
}

up.compiler(".up-flatpickr", function (element, data, meta) {
  var flatpickrOptions = up.element.jsonAttr(element, "data-up-flatpickr-options");
  var flatpickrInstance = flatpickr(element, flatpickrOptions);
  return function () {
    flatpickrInstance.destroy();
  };
});

up.compiler(".up-form-field--destroy", function (element, data, meta) {
  up.on(element, "change", function (event) {
    var target = element.closest(".up-form-field--destroy-target");
    if (!target) {
      return;
    }
    if (element.checked) {
      target.classList.add("opacity-75", "bg-gray-100");
    } else {
      target.classList.remove("opacity-75", "bg-gray-100");
    }
  });
});

up.compiler(".up-template-invoke", function (element, data, meta) {
  up.on(element, "click", function (event) {
    var container = element.closest(".up-template");
    var templateSource = container.querySelector("template.up-template-source");
    if (!(container && templateSource)) {
      return;
    }
    up.event.halt(event);
    var unixtime = new Date().getTime();
    var content = templateSource.innerHTML.replace(/TEMPLATEINDEX/g, unixtime.toString());
    var newElement = up.element.createFromHTML(content);
    up.hello(newElement);
    templateSource.insertAdjacentElement("beforebegin", newElement);
  });
});

var EventListener = /** @class */function () {
  function EventListener(eventTarget, eventName, eventOptions) {
    this.eventTarget = eventTarget;
    this.eventName = eventName;
    this.eventOptions = eventOptions;
    this.unorderedBindings = new Set();
  }
  EventListener.prototype.connect = function () {
    this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
  };
  EventListener.prototype.disconnect = function () {
    this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
  };
  // Binding observer delegate
  /** @hidden */
  EventListener.prototype.bindingConnected = function (binding) {
    this.unorderedBindings.add(binding);
  };
  /** @hidden */
  EventListener.prototype.bindingDisconnected = function (binding) {
    this.unorderedBindings.delete(binding);
  };
  EventListener.prototype.handleEvent = function (event) {
    var extendedEvent = extendEvent(event);
    for (var _i = 0, _a = this.bindings; _i < _a.length; _i++) {
      var binding = _a[_i];
      if (extendedEvent.immediatePropagationStopped) {
        break;
      } else {
        binding.handleEvent(extendedEvent);
      }
    }
  };
  Object.defineProperty(EventListener.prototype, "bindings", {
    get: function () {
      return Array.from(this.unorderedBindings).sort(function (left, right) {
        var leftIndex = left.index,
          rightIndex = right.index;
        return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
      });
    },
    enumerable: false,
    configurable: true
  });
  return EventListener;
}();
function extendEvent(event) {
  if ("immediatePropagationStopped" in event) {
    return event;
  } else {
    var stopImmediatePropagation_1 = event.stopImmediatePropagation;
    return Object.assign(event, {
      immediatePropagationStopped: false,
      stopImmediatePropagation: function () {
        this.immediatePropagationStopped = true;
        stopImmediatePropagation_1.call(this);
      }
    });
  }
}

var Dispatcher = /** @class */function () {
  function Dispatcher(application) {
    this.application = application;
    this.eventListenerMaps = new Map();
    this.started = false;
  }
  Dispatcher.prototype.start = function () {
    if (!this.started) {
      this.started = true;
      this.eventListeners.forEach(function (eventListener) {
        return eventListener.connect();
      });
    }
  };
  Dispatcher.prototype.stop = function () {
    if (this.started) {
      this.started = false;
      this.eventListeners.forEach(function (eventListener) {
        return eventListener.disconnect();
      });
    }
  };
  Object.defineProperty(Dispatcher.prototype, "eventListeners", {
    get: function () {
      return Array.from(this.eventListenerMaps.values()).reduce(function (listeners, map) {
        return listeners.concat(Array.from(map.values()));
      }, []);
    },
    enumerable: false,
    configurable: true
  });
  // Binding observer delegate
  /** @hidden */
  Dispatcher.prototype.bindingConnected = function (binding) {
    this.fetchEventListenerForBinding(binding).bindingConnected(binding);
  };
  /** @hidden */
  Dispatcher.prototype.bindingDisconnected = function (binding) {
    this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
  };
  // Error handling
  Dispatcher.prototype.handleError = function (error, message, detail) {
    if (detail === void 0) {
      detail = {};
    }
    this.application.handleError(error, "Error " + message, detail);
  };
  Dispatcher.prototype.fetchEventListenerForBinding = function (binding) {
    var eventTarget = binding.eventTarget,
      eventName = binding.eventName,
      eventOptions = binding.eventOptions;
    return this.fetchEventListener(eventTarget, eventName, eventOptions);
  };
  Dispatcher.prototype.fetchEventListener = function (eventTarget, eventName, eventOptions) {
    var eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
    var cacheKey = this.cacheKey(eventName, eventOptions);
    var eventListener = eventListenerMap.get(cacheKey);
    if (!eventListener) {
      eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
      eventListenerMap.set(cacheKey, eventListener);
    }
    return eventListener;
  };
  Dispatcher.prototype.createEventListener = function (eventTarget, eventName, eventOptions) {
    var eventListener = new EventListener(eventTarget, eventName, eventOptions);
    if (this.started) {
      eventListener.connect();
    }
    return eventListener;
  };
  Dispatcher.prototype.fetchEventListenerMapForEventTarget = function (eventTarget) {
    var eventListenerMap = this.eventListenerMaps.get(eventTarget);
    if (!eventListenerMap) {
      eventListenerMap = new Map();
      this.eventListenerMaps.set(eventTarget, eventListenerMap);
    }
    return eventListenerMap;
  };
  Dispatcher.prototype.cacheKey = function (eventName, eventOptions) {
    var parts = [eventName];
    Object.keys(eventOptions).sort().forEach(function (key) {
      parts.push("" + (eventOptions[key] ? "" : "!") + key);
    });
    return parts.join(":");
  };
  return Dispatcher;
}();

// capture nos.:            12   23 4               43   1 5   56 7      768 9  98
var descriptorPattern = /^((.+?)(@(window|document))?->)?(.+?)(#([^:]+?))(:(.+))?$/;
function parseActionDescriptorString(descriptorString) {
  var source = descriptorString.trim();
  var matches = source.match(descriptorPattern) || [];
  return {
    eventTarget: parseEventTarget(matches[4]),
    eventName: matches[2],
    eventOptions: matches[9] ? parseEventOptions(matches[9]) : {},
    identifier: matches[5],
    methodName: matches[7]
  };
}
function parseEventTarget(eventTargetName) {
  if (eventTargetName == "window") {
    return window;
  } else if (eventTargetName == "document") {
    return document;
  }
}
function parseEventOptions(eventOptions) {
  return eventOptions.split(":").reduce(function (options, token) {
    var _a;
    return Object.assign(options, (_a = {}, _a[token.replace(/^!/, "")] = !/^!/.test(token), _a));
  }, {});
}
function stringifyEventTarget(eventTarget) {
  if (eventTarget == window) {
    return "window";
  } else if (eventTarget == document) {
    return "document";
  }
}

var Action = /** @class */function () {
  function Action(element, index, descriptor) {
    this.element = element;
    this.index = index;
    this.eventTarget = descriptor.eventTarget || element;
    this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
    this.eventOptions = descriptor.eventOptions || {};
    this.identifier = descriptor.identifier || error("missing identifier");
    this.methodName = descriptor.methodName || error("missing method name");
  }
  Action.forToken = function (token) {
    return new this(token.element, token.index, parseActionDescriptorString(token.content));
  };
  Action.prototype.toString = function () {
    var eventNameSuffix = this.eventTargetName ? "@" + this.eventTargetName : "";
    return "" + this.eventName + eventNameSuffix + "->" + this.identifier + "#" + this.methodName;
  };
  Object.defineProperty(Action.prototype, "eventTargetName", {
    get: function () {
      return stringifyEventTarget(this.eventTarget);
    },
    enumerable: false,
    configurable: true
  });
  return Action;
}();
var defaultEventNames = {
  "a": function (e) {
    return "click";
  },
  "button": function (e) {
    return "click";
  },
  "form": function (e) {
    return "submit";
  },
  "input": function (e) {
    return e.getAttribute("type") == "submit" ? "click" : "input";
  },
  "select": function (e) {
    return "change";
  },
  "textarea": function (e) {
    return "input";
  }
};
function getDefaultEventNameForElement(element) {
  var tagName = element.tagName.toLowerCase();
  if (tagName in defaultEventNames) {
    return defaultEventNames[tagName](element);
  }
}
function error(message) {
  throw new Error(message);
}

var Binding = /** @class */function () {
  function Binding(context, action) {
    this.context = context;
    this.action = action;
  }
  Object.defineProperty(Binding.prototype, "index", {
    get: function () {
      return this.action.index;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Binding.prototype, "eventTarget", {
    get: function () {
      return this.action.eventTarget;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Binding.prototype, "eventOptions", {
    get: function () {
      return this.action.eventOptions;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Binding.prototype, "identifier", {
    get: function () {
      return this.context.identifier;
    },
    enumerable: false,
    configurable: true
  });
  Binding.prototype.handleEvent = function (event) {
    if (this.willBeInvokedByEvent(event)) {
      this.invokeWithEvent(event);
    }
  };
  Object.defineProperty(Binding.prototype, "eventName", {
    get: function () {
      return this.action.eventName;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Binding.prototype, "method", {
    get: function () {
      var method = this.controller[this.methodName];
      if (typeof method == "function") {
        return method;
      }
      throw new Error("Action \"" + this.action + "\" references undefined method \"" + this.methodName + "\"");
    },
    enumerable: false,
    configurable: true
  });
  Binding.prototype.invokeWithEvent = function (event) {
    try {
      this.method.call(this.controller, event);
    } catch (error) {
      var _a = this,
        identifier = _a.identifier,
        controller = _a.controller,
        element = _a.element,
        index = _a.index;
      var detail = {
        identifier: identifier,
        controller: controller,
        element: element,
        index: index,
        event: event
      };
      this.context.handleError(error, "invoking action \"" + this.action + "\"", detail);
    }
  };
  Binding.prototype.willBeInvokedByEvent = function (event) {
    var eventTarget = event.target;
    if (this.element === eventTarget) {
      return true;
    } else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
      return this.scope.containsElement(eventTarget);
    } else {
      return this.scope.containsElement(this.action.element);
    }
  };
  Object.defineProperty(Binding.prototype, "controller", {
    get: function () {
      return this.context.controller;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Binding.prototype, "methodName", {
    get: function () {
      return this.action.methodName;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Binding.prototype, "element", {
    get: function () {
      return this.scope.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Binding.prototype, "scope", {
    get: function () {
      return this.context.scope;
    },
    enumerable: false,
    configurable: true
  });
  return Binding;
}();

var ElementObserver = /** @class */function () {
  function ElementObserver(element, delegate) {
    var _this = this;
    this.element = element;
    this.started = false;
    this.delegate = delegate;
    this.elements = new Set();
    this.mutationObserver = new MutationObserver(function (mutations) {
      return _this.processMutations(mutations);
    });
  }
  ElementObserver.prototype.start = function () {
    if (!this.started) {
      this.started = true;
      this.mutationObserver.observe(this.element, {
        attributes: true,
        childList: true,
        subtree: true
      });
      this.refresh();
    }
  };
  ElementObserver.prototype.stop = function () {
    if (this.started) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.started = false;
    }
  };
  ElementObserver.prototype.refresh = function () {
    if (this.started) {
      var matches = new Set(this.matchElementsInTree());
      for (var _i = 0, _a = Array.from(this.elements); _i < _a.length; _i++) {
        var element = _a[_i];
        if (!matches.has(element)) {
          this.removeElement(element);
        }
      }
      for (var _b = 0, _c = Array.from(matches); _b < _c.length; _b++) {
        var element = _c[_b];
        this.addElement(element);
      }
    }
  };
  // Mutation record processing
  ElementObserver.prototype.processMutations = function (mutations) {
    if (this.started) {
      for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
        var mutation = mutations_1[_i];
        this.processMutation(mutation);
      }
    }
  };
  ElementObserver.prototype.processMutation = function (mutation) {
    if (mutation.type == "attributes") {
      this.processAttributeChange(mutation.target, mutation.attributeName);
    } else if (mutation.type == "childList") {
      this.processRemovedNodes(mutation.removedNodes);
      this.processAddedNodes(mutation.addedNodes);
    }
  };
  ElementObserver.prototype.processAttributeChange = function (node, attributeName) {
    var element = node;
    if (this.elements.has(element)) {
      if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
        this.delegate.elementAttributeChanged(element, attributeName);
      } else {
        this.removeElement(element);
      }
    } else if (this.matchElement(element)) {
      this.addElement(element);
    }
  };
  ElementObserver.prototype.processRemovedNodes = function (nodes) {
    for (var _i = 0, _a = Array.from(nodes); _i < _a.length; _i++) {
      var node = _a[_i];
      var element = this.elementFromNode(node);
      if (element) {
        this.processTree(element, this.removeElement);
      }
    }
  };
  ElementObserver.prototype.processAddedNodes = function (nodes) {
    for (var _i = 0, _a = Array.from(nodes); _i < _a.length; _i++) {
      var node = _a[_i];
      var element = this.elementFromNode(node);
      if (element && this.elementIsActive(element)) {
        this.processTree(element, this.addElement);
      }
    }
  };
  // Element matching
  ElementObserver.prototype.matchElement = function (element) {
    return this.delegate.matchElement(element);
  };
  ElementObserver.prototype.matchElementsInTree = function (tree) {
    if (tree === void 0) {
      tree = this.element;
    }
    return this.delegate.matchElementsInTree(tree);
  };
  ElementObserver.prototype.processTree = function (tree, processor) {
    for (var _i = 0, _a = this.matchElementsInTree(tree); _i < _a.length; _i++) {
      var element = _a[_i];
      processor.call(this, element);
    }
  };
  ElementObserver.prototype.elementFromNode = function (node) {
    if (node.nodeType == Node.ELEMENT_NODE) {
      return node;
    }
  };
  ElementObserver.prototype.elementIsActive = function (element) {
    if (element.isConnected != this.element.isConnected) {
      return false;
    } else {
      return this.element.contains(element);
    }
  };
  // Element tracking
  ElementObserver.prototype.addElement = function (element) {
    if (!this.elements.has(element)) {
      if (this.elementIsActive(element)) {
        this.elements.add(element);
        if (this.delegate.elementMatched) {
          this.delegate.elementMatched(element);
        }
      }
    }
  };
  ElementObserver.prototype.removeElement = function (element) {
    if (this.elements.has(element)) {
      this.elements.delete(element);
      if (this.delegate.elementUnmatched) {
        this.delegate.elementUnmatched(element);
      }
    }
  };
  return ElementObserver;
}();

var AttributeObserver = /** @class */function () {
  function AttributeObserver(element, attributeName, delegate) {
    this.attributeName = attributeName;
    this.delegate = delegate;
    this.elementObserver = new ElementObserver(element, this);
  }
  Object.defineProperty(AttributeObserver.prototype, "element", {
    get: function () {
      return this.elementObserver.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AttributeObserver.prototype, "selector", {
    get: function () {
      return "[" + this.attributeName + "]";
    },
    enumerable: false,
    configurable: true
  });
  AttributeObserver.prototype.start = function () {
    this.elementObserver.start();
  };
  AttributeObserver.prototype.stop = function () {
    this.elementObserver.stop();
  };
  AttributeObserver.prototype.refresh = function () {
    this.elementObserver.refresh();
  };
  Object.defineProperty(AttributeObserver.prototype, "started", {
    get: function () {
      return this.elementObserver.started;
    },
    enumerable: false,
    configurable: true
  });
  // Element observer delegate
  AttributeObserver.prototype.matchElement = function (element) {
    return element.hasAttribute(this.attributeName);
  };
  AttributeObserver.prototype.matchElementsInTree = function (tree) {
    var match = this.matchElement(tree) ? [tree] : [];
    var matches = Array.from(tree.querySelectorAll(this.selector));
    return match.concat(matches);
  };
  AttributeObserver.prototype.elementMatched = function (element) {
    if (this.delegate.elementMatchedAttribute) {
      this.delegate.elementMatchedAttribute(element, this.attributeName);
    }
  };
  AttributeObserver.prototype.elementUnmatched = function (element) {
    if (this.delegate.elementUnmatchedAttribute) {
      this.delegate.elementUnmatchedAttribute(element, this.attributeName);
    }
  };
  AttributeObserver.prototype.elementAttributeChanged = function (element, attributeName) {
    if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
      this.delegate.elementAttributeValueChanged(element, attributeName);
    }
  };
  return AttributeObserver;
}();

var StringMapObserver = /** @class */function () {
  function StringMapObserver(element, delegate) {
    var _this = this;
    this.element = element;
    this.delegate = delegate;
    this.started = false;
    this.stringMap = new Map();
    this.mutationObserver = new MutationObserver(function (mutations) {
      return _this.processMutations(mutations);
    });
  }
  StringMapObserver.prototype.start = function () {
    if (!this.started) {
      this.started = true;
      this.mutationObserver.observe(this.element, {
        attributes: true
      });
      this.refresh();
    }
  };
  StringMapObserver.prototype.stop = function () {
    if (this.started) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.started = false;
    }
  };
  StringMapObserver.prototype.refresh = function () {
    if (this.started) {
      for (var _i = 0, _a = this.knownAttributeNames; _i < _a.length; _i++) {
        var attributeName = _a[_i];
        this.refreshAttribute(attributeName);
      }
    }
  };
  // Mutation record processing
  StringMapObserver.prototype.processMutations = function (mutations) {
    if (this.started) {
      for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
        var mutation = mutations_1[_i];
        this.processMutation(mutation);
      }
    }
  };
  StringMapObserver.prototype.processMutation = function (mutation) {
    var attributeName = mutation.attributeName;
    if (attributeName) {
      this.refreshAttribute(attributeName);
    }
  };
  // State tracking
  StringMapObserver.prototype.refreshAttribute = function (attributeName) {
    var key = this.delegate.getStringMapKeyForAttribute(attributeName);
    if (key != null) {
      if (!this.stringMap.has(attributeName)) {
        this.stringMapKeyAdded(key, attributeName);
      }
      var value = this.element.getAttribute(attributeName);
      if (this.stringMap.get(attributeName) != value) {
        this.stringMapValueChanged(value, key);
      }
      if (value == null) {
        this.stringMap.delete(attributeName);
        this.stringMapKeyRemoved(key, attributeName);
      } else {
        this.stringMap.set(attributeName, value);
      }
    }
  };
  StringMapObserver.prototype.stringMapKeyAdded = function (key, attributeName) {
    if (this.delegate.stringMapKeyAdded) {
      this.delegate.stringMapKeyAdded(key, attributeName);
    }
  };
  StringMapObserver.prototype.stringMapValueChanged = function (value, key) {
    if (this.delegate.stringMapValueChanged) {
      this.delegate.stringMapValueChanged(value, key);
    }
  };
  StringMapObserver.prototype.stringMapKeyRemoved = function (key, attributeName) {
    if (this.delegate.stringMapKeyRemoved) {
      this.delegate.stringMapKeyRemoved(key, attributeName);
    }
  };
  Object.defineProperty(StringMapObserver.prototype, "knownAttributeNames", {
    get: function () {
      return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StringMapObserver.prototype, "currentAttributeNames", {
    get: function () {
      return Array.from(this.element.attributes).map(function (attribute) {
        return attribute.name;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StringMapObserver.prototype, "recordedAttributeNames", {
    get: function () {
      return Array.from(this.stringMap.keys());
    },
    enumerable: false,
    configurable: true
  });
  return StringMapObserver;
}();

function add(map, key, value) {
  fetch(map, key).add(value);
}
function del(map, key, value) {
  fetch(map, key).delete(value);
  prune(map, key);
}
function fetch(map, key) {
  var values = map.get(key);
  if (!values) {
    values = new Set();
    map.set(key, values);
  }
  return values;
}
function prune(map, key) {
  var values = map.get(key);
  if (values != null && values.size == 0) {
    map.delete(key);
  }
}

var Multimap = /** @class */function () {
  function Multimap() {
    this.valuesByKey = new Map();
  }
  Object.defineProperty(Multimap.prototype, "values", {
    get: function () {
      var sets = Array.from(this.valuesByKey.values());
      return sets.reduce(function (values, set) {
        return values.concat(Array.from(set));
      }, []);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Multimap.prototype, "size", {
    get: function () {
      var sets = Array.from(this.valuesByKey.values());
      return sets.reduce(function (size, set) {
        return size + set.size;
      }, 0);
    },
    enumerable: false,
    configurable: true
  });
  Multimap.prototype.add = function (key, value) {
    add(this.valuesByKey, key, value);
  };
  Multimap.prototype.delete = function (key, value) {
    del(this.valuesByKey, key, value);
  };
  Multimap.prototype.has = function (key, value) {
    var values = this.valuesByKey.get(key);
    return values != null && values.has(value);
  };
  Multimap.prototype.hasKey = function (key) {
    return this.valuesByKey.has(key);
  };
  Multimap.prototype.hasValue = function (value) {
    var sets = Array.from(this.valuesByKey.values());
    return sets.some(function (set) {
      return set.has(value);
    });
  };
  Multimap.prototype.getValuesForKey = function (key) {
    var values = this.valuesByKey.get(key);
    return values ? Array.from(values) : [];
  };
  Multimap.prototype.getKeysForValue = function (value) {
    return Array.from(this.valuesByKey).filter(function (_a) {
      _a[0];
        var values = _a[1];
      return values.has(value);
    }).map(function (_a) {
      var key = _a[0];
        _a[1];
      return key;
    });
  };
  return Multimap;
}();

var __extends$1 = window && window.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/** @class */(function (_super) {
  __extends$1(IndexedMultimap, _super);
  function IndexedMultimap() {
    var _this = _super.call(this) || this;
    _this.keysByValue = new Map();
    return _this;
  }
  Object.defineProperty(IndexedMultimap.prototype, "values", {
    get: function () {
      return Array.from(this.keysByValue.keys());
    },
    enumerable: false,
    configurable: true
  });
  IndexedMultimap.prototype.add = function (key, value) {
    _super.prototype.add.call(this, key, value);
    add(this.keysByValue, value, key);
  };
  IndexedMultimap.prototype.delete = function (key, value) {
    _super.prototype.delete.call(this, key, value);
    del(this.keysByValue, value, key);
  };
  IndexedMultimap.prototype.hasValue = function (value) {
    return this.keysByValue.has(value);
  };
  IndexedMultimap.prototype.getKeysForValue = function (value) {
    var set = this.keysByValue.get(value);
    return set ? Array.from(set) : [];
  };
  return IndexedMultimap;
})(Multimap);

var TokenListObserver = /** @class */function () {
  function TokenListObserver(element, attributeName, delegate) {
    this.attributeObserver = new AttributeObserver(element, attributeName, this);
    this.delegate = delegate;
    this.tokensByElement = new Multimap();
  }
  Object.defineProperty(TokenListObserver.prototype, "started", {
    get: function () {
      return this.attributeObserver.started;
    },
    enumerable: false,
    configurable: true
  });
  TokenListObserver.prototype.start = function () {
    this.attributeObserver.start();
  };
  TokenListObserver.prototype.stop = function () {
    this.attributeObserver.stop();
  };
  TokenListObserver.prototype.refresh = function () {
    this.attributeObserver.refresh();
  };
  Object.defineProperty(TokenListObserver.prototype, "element", {
    get: function () {
      return this.attributeObserver.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(TokenListObserver.prototype, "attributeName", {
    get: function () {
      return this.attributeObserver.attributeName;
    },
    enumerable: false,
    configurable: true
  });
  // Attribute observer delegate
  TokenListObserver.prototype.elementMatchedAttribute = function (element) {
    this.tokensMatched(this.readTokensForElement(element));
  };
  TokenListObserver.prototype.elementAttributeValueChanged = function (element) {
    var _a = this.refreshTokensForElement(element),
      unmatchedTokens = _a[0],
      matchedTokens = _a[1];
    this.tokensUnmatched(unmatchedTokens);
    this.tokensMatched(matchedTokens);
  };
  TokenListObserver.prototype.elementUnmatchedAttribute = function (element) {
    this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
  };
  TokenListObserver.prototype.tokensMatched = function (tokens) {
    var _this = this;
    tokens.forEach(function (token) {
      return _this.tokenMatched(token);
    });
  };
  TokenListObserver.prototype.tokensUnmatched = function (tokens) {
    var _this = this;
    tokens.forEach(function (token) {
      return _this.tokenUnmatched(token);
    });
  };
  TokenListObserver.prototype.tokenMatched = function (token) {
    this.delegate.tokenMatched(token);
    this.tokensByElement.add(token.element, token);
  };
  TokenListObserver.prototype.tokenUnmatched = function (token) {
    this.delegate.tokenUnmatched(token);
    this.tokensByElement.delete(token.element, token);
  };
  TokenListObserver.prototype.refreshTokensForElement = function (element) {
    var previousTokens = this.tokensByElement.getValuesForKey(element);
    var currentTokens = this.readTokensForElement(element);
    var firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(function (_a) {
      var previousToken = _a[0],
        currentToken = _a[1];
      return !tokensAreEqual(previousToken, currentToken);
    });
    if (firstDifferingIndex == -1) {
      return [[], []];
    } else {
      return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
    }
  };
  TokenListObserver.prototype.readTokensForElement = function (element) {
    var attributeName = this.attributeName;
    var tokenString = element.getAttribute(attributeName) || "";
    return parseTokenString(tokenString, element, attributeName);
  };
  return TokenListObserver;
}();
function parseTokenString(tokenString, element, attributeName) {
  return tokenString.trim().split(/\s+/).filter(function (content) {
    return content.length;
  }).map(function (content, index) {
    return {
      element: element,
      attributeName: attributeName,
      content: content,
      index: index
    };
  });
}
function zip(left, right) {
  var length = Math.max(left.length, right.length);
  return Array.from({
    length: length
  }, function (_, index) {
    return [left[index], right[index]];
  });
}
function tokensAreEqual(left, right) {
  return left && right && left.index == right.index && left.content == right.content;
}

var ValueListObserver = /** @class */function () {
  function ValueListObserver(element, attributeName, delegate) {
    this.tokenListObserver = new TokenListObserver(element, attributeName, this);
    this.delegate = delegate;
    this.parseResultsByToken = new WeakMap();
    this.valuesByTokenByElement = new WeakMap();
  }
  Object.defineProperty(ValueListObserver.prototype, "started", {
    get: function () {
      return this.tokenListObserver.started;
    },
    enumerable: false,
    configurable: true
  });
  ValueListObserver.prototype.start = function () {
    this.tokenListObserver.start();
  };
  ValueListObserver.prototype.stop = function () {
    this.tokenListObserver.stop();
  };
  ValueListObserver.prototype.refresh = function () {
    this.tokenListObserver.refresh();
  };
  Object.defineProperty(ValueListObserver.prototype, "element", {
    get: function () {
      return this.tokenListObserver.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ValueListObserver.prototype, "attributeName", {
    get: function () {
      return this.tokenListObserver.attributeName;
    },
    enumerable: false,
    configurable: true
  });
  ValueListObserver.prototype.tokenMatched = function (token) {
    var element = token.element;
    var value = this.fetchParseResultForToken(token).value;
    if (value) {
      this.fetchValuesByTokenForElement(element).set(token, value);
      this.delegate.elementMatchedValue(element, value);
    }
  };
  ValueListObserver.prototype.tokenUnmatched = function (token) {
    var element = token.element;
    var value = this.fetchParseResultForToken(token).value;
    if (value) {
      this.fetchValuesByTokenForElement(element).delete(token);
      this.delegate.elementUnmatchedValue(element, value);
    }
  };
  ValueListObserver.prototype.fetchParseResultForToken = function (token) {
    var parseResult = this.parseResultsByToken.get(token);
    if (!parseResult) {
      parseResult = this.parseToken(token);
      this.parseResultsByToken.set(token, parseResult);
    }
    return parseResult;
  };
  ValueListObserver.prototype.fetchValuesByTokenForElement = function (element) {
    var valuesByToken = this.valuesByTokenByElement.get(element);
    if (!valuesByToken) {
      valuesByToken = new Map();
      this.valuesByTokenByElement.set(element, valuesByToken);
    }
    return valuesByToken;
  };
  ValueListObserver.prototype.parseToken = function (token) {
    try {
      var value = this.delegate.parseValueForToken(token);
      return {
        value: value
      };
    } catch (error) {
      return {
        error: error
      };
    }
  };
  return ValueListObserver;
}();

var BindingObserver = /** @class */function () {
  function BindingObserver(context, delegate) {
    this.context = context;
    this.delegate = delegate;
    this.bindingsByAction = new Map();
  }
  BindingObserver.prototype.start = function () {
    if (!this.valueListObserver) {
      this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
      this.valueListObserver.start();
    }
  };
  BindingObserver.prototype.stop = function () {
    if (this.valueListObserver) {
      this.valueListObserver.stop();
      delete this.valueListObserver;
      this.disconnectAllActions();
    }
  };
  Object.defineProperty(BindingObserver.prototype, "element", {
    get: function () {
      return this.context.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BindingObserver.prototype, "identifier", {
    get: function () {
      return this.context.identifier;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BindingObserver.prototype, "actionAttribute", {
    get: function () {
      return this.schema.actionAttribute;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BindingObserver.prototype, "schema", {
    get: function () {
      return this.context.schema;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BindingObserver.prototype, "bindings", {
    get: function () {
      return Array.from(this.bindingsByAction.values());
    },
    enumerable: false,
    configurable: true
  });
  BindingObserver.prototype.connectAction = function (action) {
    var binding = new Binding(this.context, action);
    this.bindingsByAction.set(action, binding);
    this.delegate.bindingConnected(binding);
  };
  BindingObserver.prototype.disconnectAction = function (action) {
    var binding = this.bindingsByAction.get(action);
    if (binding) {
      this.bindingsByAction.delete(action);
      this.delegate.bindingDisconnected(binding);
    }
  };
  BindingObserver.prototype.disconnectAllActions = function () {
    var _this = this;
    this.bindings.forEach(function (binding) {
      return _this.delegate.bindingDisconnected(binding);
    });
    this.bindingsByAction.clear();
  };
  // Value observer delegate
  BindingObserver.prototype.parseValueForToken = function (token) {
    var action = Action.forToken(token);
    if (action.identifier == this.identifier) {
      return action;
    }
  };
  BindingObserver.prototype.elementMatchedValue = function (element, action) {
    this.connectAction(action);
  };
  BindingObserver.prototype.elementUnmatchedValue = function (element, action) {
    this.disconnectAction(action);
  };
  return BindingObserver;
}();

var ValueObserver = /** @class */function () {
  function ValueObserver(context, receiver) {
    this.context = context;
    this.receiver = receiver;
    this.stringMapObserver = new StringMapObserver(this.element, this);
    this.valueDescriptorMap = this.controller.valueDescriptorMap;
    this.invokeChangedCallbacksForDefaultValues();
  }
  ValueObserver.prototype.start = function () {
    this.stringMapObserver.start();
  };
  ValueObserver.prototype.stop = function () {
    this.stringMapObserver.stop();
  };
  Object.defineProperty(ValueObserver.prototype, "element", {
    get: function () {
      return this.context.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ValueObserver.prototype, "controller", {
    get: function () {
      return this.context.controller;
    },
    enumerable: false,
    configurable: true
  });
  // String map observer delegate
  ValueObserver.prototype.getStringMapKeyForAttribute = function (attributeName) {
    if (attributeName in this.valueDescriptorMap) {
      return this.valueDescriptorMap[attributeName].name;
    }
  };
  ValueObserver.prototype.stringMapValueChanged = function (attributeValue, name) {
    this.invokeChangedCallbackForValue(name);
  };
  ValueObserver.prototype.invokeChangedCallbacksForDefaultValues = function () {
    for (var _i = 0, _a = this.valueDescriptors; _i < _a.length; _i++) {
      var _b = _a[_i],
        key = _b.key,
        name_1 = _b.name,
        defaultValue = _b.defaultValue;
      if (defaultValue != undefined && !this.controller.data.has(key)) {
        this.invokeChangedCallbackForValue(name_1);
      }
    }
  };
  ValueObserver.prototype.invokeChangedCallbackForValue = function (name) {
    var methodName = name + "Changed";
    var method = this.receiver[methodName];
    if (typeof method == "function") {
      var value = this.receiver[name];
      method.call(this.receiver, value);
    }
  };
  Object.defineProperty(ValueObserver.prototype, "valueDescriptors", {
    get: function () {
      var valueDescriptorMap = this.valueDescriptorMap;
      return Object.keys(valueDescriptorMap).map(function (key) {
        return valueDescriptorMap[key];
      });
    },
    enumerable: false,
    configurable: true
  });
  return ValueObserver;
}();

var Context = /** @class */function () {
  function Context(module, scope) {
    this.module = module;
    this.scope = scope;
    this.controller = new module.controllerConstructor(this);
    this.bindingObserver = new BindingObserver(this, this.dispatcher);
    this.valueObserver = new ValueObserver(this, this.controller);
    try {
      this.controller.initialize();
    } catch (error) {
      this.handleError(error, "initializing controller");
    }
  }
  Context.prototype.connect = function () {
    this.bindingObserver.start();
    this.valueObserver.start();
    try {
      this.controller.connect();
    } catch (error) {
      this.handleError(error, "connecting controller");
    }
  };
  Context.prototype.disconnect = function () {
    try {
      this.controller.disconnect();
    } catch (error) {
      this.handleError(error, "disconnecting controller");
    }
    this.valueObserver.stop();
    this.bindingObserver.stop();
  };
  Object.defineProperty(Context.prototype, "application", {
    get: function () {
      return this.module.application;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Context.prototype, "identifier", {
    get: function () {
      return this.module.identifier;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Context.prototype, "schema", {
    get: function () {
      return this.application.schema;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Context.prototype, "dispatcher", {
    get: function () {
      return this.application.dispatcher;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Context.prototype, "element", {
    get: function () {
      return this.scope.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Context.prototype, "parentElement", {
    get: function () {
      return this.element.parentElement;
    },
    enumerable: false,
    configurable: true
  });
  // Error handling
  Context.prototype.handleError = function (error, message, detail) {
    if (detail === void 0) {
      detail = {};
    }
    var _a = this,
      identifier = _a.identifier,
      controller = _a.controller,
      element = _a.element;
    detail = Object.assign({
      identifier: identifier,
      controller: controller,
      element: element
    }, detail);
    this.application.handleError(error, "Error " + message, detail);
  };
  return Context;
}();

function readInheritableStaticArrayValues(constructor, propertyName) {
  var ancestors = getAncestorsForConstructor(constructor);
  return Array.from(ancestors.reduce(function (values, constructor) {
    getOwnStaticArrayValues(constructor, propertyName).forEach(function (name) {
      return values.add(name);
    });
    return values;
  }, new Set()));
}
function readInheritableStaticObjectPairs(constructor, propertyName) {
  var ancestors = getAncestorsForConstructor(constructor);
  return ancestors.reduce(function (pairs, constructor) {
    pairs.push.apply(pairs, getOwnStaticObjectPairs(constructor, propertyName));
    return pairs;
  }, []);
}
function getAncestorsForConstructor(constructor) {
  var ancestors = [];
  while (constructor) {
    ancestors.push(constructor);
    constructor = Object.getPrototypeOf(constructor);
  }
  return ancestors.reverse();
}
function getOwnStaticArrayValues(constructor, propertyName) {
  var definition = constructor[propertyName];
  return Array.isArray(definition) ? definition : [];
}
function getOwnStaticObjectPairs(constructor, propertyName) {
  var definition = constructor[propertyName];
  return definition ? Object.keys(definition).map(function (key) {
    return [key, definition[key]];
  }) : [];
}

var __extends = window && window.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __spreadArrays$3 = window && window.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
/** @hidden */
function bless(constructor) {
  return shadow(constructor, getBlessedProperties(constructor));
}
function shadow(constructor, properties) {
  var shadowConstructor = extend(constructor);
  var shadowProperties = getShadowProperties(constructor.prototype, properties);
  Object.defineProperties(shadowConstructor.prototype, shadowProperties);
  return shadowConstructor;
}
function getBlessedProperties(constructor) {
  var blessings = readInheritableStaticArrayValues(constructor, "blessings");
  return blessings.reduce(function (blessedProperties, blessing) {
    var properties = blessing(constructor);
    for (var key in properties) {
      var descriptor = blessedProperties[key] || {};
      blessedProperties[key] = Object.assign(descriptor, properties[key]);
    }
    return blessedProperties;
  }, {});
}
function getShadowProperties(prototype, properties) {
  return getOwnKeys(properties).reduce(function (shadowProperties, key) {
    var _a;
    var descriptor = getShadowedDescriptor(prototype, properties, key);
    if (descriptor) {
      Object.assign(shadowProperties, (_a = {}, _a[key] = descriptor, _a));
    }
    return shadowProperties;
  }, {});
}
function getShadowedDescriptor(prototype, properties, key) {
  var shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
  var shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
  if (!shadowedByValue) {
    var descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
    if (shadowingDescriptor) {
      descriptor.get = shadowingDescriptor.get || descriptor.get;
      descriptor.set = shadowingDescriptor.set || descriptor.set;
    }
    return descriptor;
  }
}
var getOwnKeys = function () {
  if (typeof Object.getOwnPropertySymbols == "function") {
    return function (object) {
      return __spreadArrays$3(Object.getOwnPropertyNames(object), Object.getOwnPropertySymbols(object));
    };
  } else {
    return Object.getOwnPropertyNames;
  }
}();
var extend = function () {
  function extendWithReflect(constructor) {
    function extended() {
      var _newTarget = this && this instanceof extended ? this.constructor : void 0;
      return Reflect.construct(constructor, arguments, _newTarget);
    }
    extended.prototype = Object.create(constructor.prototype, {
      constructor: {
        value: extended
      }
    });
    Reflect.setPrototypeOf(extended, constructor);
    return extended;
  }
  function testReflectExtension() {
    var a = function () {
      this.a.call(this);
    };
    var b = extendWithReflect(a);
    b.prototype.a = function () {};
    return new b();
  }
  try {
    testReflectExtension();
    return extendWithReflect;
  } catch (error) {
    return function (constructor) {
      return (/** @class */function (_super) {
          __extends(extended, _super);
          function extended() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          return extended;
        }(constructor)
      );
    };
  }
}();

/** @hidden */
function blessDefinition(definition) {
  return {
    identifier: definition.identifier,
    controllerConstructor: bless(definition.controllerConstructor)
  };
}

var Module = /** @class */function () {
  function Module(application, definition) {
    this.application = application;
    this.definition = blessDefinition(definition);
    this.contextsByScope = new WeakMap();
    this.connectedContexts = new Set();
  }
  Object.defineProperty(Module.prototype, "identifier", {
    get: function () {
      return this.definition.identifier;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Module.prototype, "controllerConstructor", {
    get: function () {
      return this.definition.controllerConstructor;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Module.prototype, "contexts", {
    get: function () {
      return Array.from(this.connectedContexts);
    },
    enumerable: false,
    configurable: true
  });
  Module.prototype.connectContextForScope = function (scope) {
    var context = this.fetchContextForScope(scope);
    this.connectedContexts.add(context);
    context.connect();
  };
  Module.prototype.disconnectContextForScope = function (scope) {
    var context = this.contextsByScope.get(scope);
    if (context) {
      this.connectedContexts.delete(context);
      context.disconnect();
    }
  };
  Module.prototype.fetchContextForScope = function (scope) {
    var context = this.contextsByScope.get(scope);
    if (!context) {
      context = new Context(this, scope);
      this.contextsByScope.set(scope, context);
    }
    return context;
  };
  return Module;
}();

var ClassMap = /** @class */function () {
  function ClassMap(scope) {
    this.scope = scope;
  }
  ClassMap.prototype.has = function (name) {
    return this.data.has(this.getDataKey(name));
  };
  ClassMap.prototype.get = function (name) {
    return this.data.get(this.getDataKey(name));
  };
  ClassMap.prototype.getAttributeName = function (name) {
    return this.data.getAttributeNameForKey(this.getDataKey(name));
  };
  ClassMap.prototype.getDataKey = function (name) {
    return name + "-class";
  };
  Object.defineProperty(ClassMap.prototype, "data", {
    get: function () {
      return this.scope.data;
    },
    enumerable: false,
    configurable: true
  });
  return ClassMap;
}();

function camelize(value) {
  return value.replace(/(?:[_-])([a-z0-9])/g, function (_, char) {
    return char.toUpperCase();
  });
}
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function dasherize(value) {
  return value.replace(/([A-Z])/g, function (_, char) {
    return "-" + char.toLowerCase();
  });
}

var DataMap = /** @class */function () {
  function DataMap(scope) {
    this.scope = scope;
  }
  Object.defineProperty(DataMap.prototype, "element", {
    get: function () {
      return this.scope.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataMap.prototype, "identifier", {
    get: function () {
      return this.scope.identifier;
    },
    enumerable: false,
    configurable: true
  });
  DataMap.prototype.get = function (key) {
    var name = this.getAttributeNameForKey(key);
    return this.element.getAttribute(name);
  };
  DataMap.prototype.set = function (key, value) {
    var name = this.getAttributeNameForKey(key);
    this.element.setAttribute(name, value);
    return this.get(key);
  };
  DataMap.prototype.has = function (key) {
    var name = this.getAttributeNameForKey(key);
    return this.element.hasAttribute(name);
  };
  DataMap.prototype.delete = function (key) {
    if (this.has(key)) {
      var name_1 = this.getAttributeNameForKey(key);
      this.element.removeAttribute(name_1);
      return true;
    } else {
      return false;
    }
  };
  DataMap.prototype.getAttributeNameForKey = function (key) {
    return "data-" + this.identifier + "-" + dasherize(key);
  };
  return DataMap;
}();

var Guide = /** @class */function () {
  function Guide(logger) {
    this.warnedKeysByObject = new WeakMap();
    this.logger = logger;
  }
  Guide.prototype.warn = function (object, key, message) {
    var warnedKeys = this.warnedKeysByObject.get(object);
    if (!warnedKeys) {
      warnedKeys = new Set();
      this.warnedKeysByObject.set(object, warnedKeys);
    }
    if (!warnedKeys.has(key)) {
      warnedKeys.add(key);
      this.logger.warn(message, object);
    }
  };
  return Guide;
}();

/** @hidden */
function attributeValueContainsToken(attributeName, token) {
  return "[" + attributeName + "~=\"" + token + "\"]";
}

var __spreadArrays$2 = window && window.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
var TargetSet = /** @class */function () {
  function TargetSet(scope) {
    this.scope = scope;
  }
  Object.defineProperty(TargetSet.prototype, "element", {
    get: function () {
      return this.scope.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(TargetSet.prototype, "identifier", {
    get: function () {
      return this.scope.identifier;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(TargetSet.prototype, "schema", {
    get: function () {
      return this.scope.schema;
    },
    enumerable: false,
    configurable: true
  });
  TargetSet.prototype.has = function (targetName) {
    return this.find(targetName) != null;
  };
  TargetSet.prototype.find = function () {
    var _this = this;
    var targetNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      targetNames[_i] = arguments[_i];
    }
    return targetNames.reduce(function (target, targetName) {
      return target || _this.findTarget(targetName) || _this.findLegacyTarget(targetName);
    }, undefined);
  };
  TargetSet.prototype.findAll = function () {
    var _this = this;
    var targetNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      targetNames[_i] = arguments[_i];
    }
    return targetNames.reduce(function (targets, targetName) {
      return __spreadArrays$2(targets, _this.findAllTargets(targetName), _this.findAllLegacyTargets(targetName));
    }, []);
  };
  TargetSet.prototype.findTarget = function (targetName) {
    var selector = this.getSelectorForTargetName(targetName);
    return this.scope.findElement(selector);
  };
  TargetSet.prototype.findAllTargets = function (targetName) {
    var selector = this.getSelectorForTargetName(targetName);
    return this.scope.findAllElements(selector);
  };
  TargetSet.prototype.getSelectorForTargetName = function (targetName) {
    var attributeName = "data-" + this.identifier + "-target";
    return attributeValueContainsToken(attributeName, targetName);
  };
  TargetSet.prototype.findLegacyTarget = function (targetName) {
    var selector = this.getLegacySelectorForTargetName(targetName);
    return this.deprecate(this.scope.findElement(selector), targetName);
  };
  TargetSet.prototype.findAllLegacyTargets = function (targetName) {
    var _this = this;
    var selector = this.getLegacySelectorForTargetName(targetName);
    return this.scope.findAllElements(selector).map(function (element) {
      return _this.deprecate(element, targetName);
    });
  };
  TargetSet.prototype.getLegacySelectorForTargetName = function (targetName) {
    var targetDescriptor = this.identifier + "." + targetName;
    return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
  };
  TargetSet.prototype.deprecate = function (element, targetName) {
    if (element) {
      var identifier = this.identifier;
      var attributeName = this.schema.targetAttribute;
      this.guide.warn(element, "target:" + targetName, "Please replace " + attributeName + "=\"" + identifier + "." + targetName + "\" with data-" + identifier + "-target=\"" + targetName + "\". " + ("The " + attributeName + " attribute is deprecated and will be removed in a future version of Stimulus."));
    }
    return element;
  };
  Object.defineProperty(TargetSet.prototype, "guide", {
    get: function () {
      return this.scope.guide;
    },
    enumerable: false,
    configurable: true
  });
  return TargetSet;
}();

var __spreadArrays$1 = window && window.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
var Scope = /** @class */function () {
  function Scope(schema, element, identifier, logger) {
    var _this = this;
    this.targets = new TargetSet(this);
    this.classes = new ClassMap(this);
    this.data = new DataMap(this);
    this.containsElement = function (element) {
      return element.closest(_this.controllerSelector) === _this.element;
    };
    this.schema = schema;
    this.element = element;
    this.identifier = identifier;
    this.guide = new Guide(logger);
  }
  Scope.prototype.findElement = function (selector) {
    return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
  };
  Scope.prototype.findAllElements = function (selector) {
    return __spreadArrays$1(this.element.matches(selector) ? [this.element] : [], this.queryElements(selector).filter(this.containsElement));
  };
  Scope.prototype.queryElements = function (selector) {
    return Array.from(this.element.querySelectorAll(selector));
  };
  Object.defineProperty(Scope.prototype, "controllerSelector", {
    get: function () {
      return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
    },
    enumerable: false,
    configurable: true
  });
  return Scope;
}();

var ScopeObserver = /** @class */function () {
  function ScopeObserver(element, schema, delegate) {
    this.element = element;
    this.schema = schema;
    this.delegate = delegate;
    this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
    this.scopesByIdentifierByElement = new WeakMap();
    this.scopeReferenceCounts = new WeakMap();
  }
  ScopeObserver.prototype.start = function () {
    this.valueListObserver.start();
  };
  ScopeObserver.prototype.stop = function () {
    this.valueListObserver.stop();
  };
  Object.defineProperty(ScopeObserver.prototype, "controllerAttribute", {
    get: function () {
      return this.schema.controllerAttribute;
    },
    enumerable: false,
    configurable: true
  });
  // Value observer delegate
  /** @hidden */
  ScopeObserver.prototype.parseValueForToken = function (token) {
    var element = token.element,
      identifier = token.content;
    var scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
    var scope = scopesByIdentifier.get(identifier);
    if (!scope) {
      scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
      scopesByIdentifier.set(identifier, scope);
    }
    return scope;
  };
  /** @hidden */
  ScopeObserver.prototype.elementMatchedValue = function (element, value) {
    var referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
    this.scopeReferenceCounts.set(value, referenceCount);
    if (referenceCount == 1) {
      this.delegate.scopeConnected(value);
    }
  };
  /** @hidden */
  ScopeObserver.prototype.elementUnmatchedValue = function (element, value) {
    var referenceCount = this.scopeReferenceCounts.get(value);
    if (referenceCount) {
      this.scopeReferenceCounts.set(value, referenceCount - 1);
      if (referenceCount == 1) {
        this.delegate.scopeDisconnected(value);
      }
    }
  };
  ScopeObserver.prototype.fetchScopesByIdentifierForElement = function (element) {
    var scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
    if (!scopesByIdentifier) {
      scopesByIdentifier = new Map();
      this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
    }
    return scopesByIdentifier;
  };
  return ScopeObserver;
}();

var Router = /** @class */function () {
  function Router(application) {
    this.application = application;
    this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
    this.scopesByIdentifier = new Multimap();
    this.modulesByIdentifier = new Map();
  }
  Object.defineProperty(Router.prototype, "element", {
    get: function () {
      return this.application.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Router.prototype, "schema", {
    get: function () {
      return this.application.schema;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Router.prototype, "logger", {
    get: function () {
      return this.application.logger;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Router.prototype, "controllerAttribute", {
    get: function () {
      return this.schema.controllerAttribute;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Router.prototype, "modules", {
    get: function () {
      return Array.from(this.modulesByIdentifier.values());
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Router.prototype, "contexts", {
    get: function () {
      return this.modules.reduce(function (contexts, module) {
        return contexts.concat(module.contexts);
      }, []);
    },
    enumerable: false,
    configurable: true
  });
  Router.prototype.start = function () {
    this.scopeObserver.start();
  };
  Router.prototype.stop = function () {
    this.scopeObserver.stop();
  };
  Router.prototype.loadDefinition = function (definition) {
    this.unloadIdentifier(definition.identifier);
    var module = new Module(this.application, definition);
    this.connectModule(module);
  };
  Router.prototype.unloadIdentifier = function (identifier) {
    var module = this.modulesByIdentifier.get(identifier);
    if (module) {
      this.disconnectModule(module);
    }
  };
  Router.prototype.getContextForElementAndIdentifier = function (element, identifier) {
    var module = this.modulesByIdentifier.get(identifier);
    if (module) {
      return module.contexts.find(function (context) {
        return context.element == element;
      });
    }
  };
  // Error handler delegate
  /** @hidden */
  Router.prototype.handleError = function (error, message, detail) {
    this.application.handleError(error, message, detail);
  };
  // Scope observer delegate
  /** @hidden */
  Router.prototype.createScopeForElementAndIdentifier = function (element, identifier) {
    return new Scope(this.schema, element, identifier, this.logger);
  };
  /** @hidden */
  Router.prototype.scopeConnected = function (scope) {
    this.scopesByIdentifier.add(scope.identifier, scope);
    var module = this.modulesByIdentifier.get(scope.identifier);
    if (module) {
      module.connectContextForScope(scope);
    }
  };
  /** @hidden */
  Router.prototype.scopeDisconnected = function (scope) {
    this.scopesByIdentifier.delete(scope.identifier, scope);
    var module = this.modulesByIdentifier.get(scope.identifier);
    if (module) {
      module.disconnectContextForScope(scope);
    }
  };
  // Modules
  Router.prototype.connectModule = function (module) {
    this.modulesByIdentifier.set(module.identifier, module);
    var scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
    scopes.forEach(function (scope) {
      return module.connectContextForScope(scope);
    });
  };
  Router.prototype.disconnectModule = function (module) {
    this.modulesByIdentifier.delete(module.identifier);
    var scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
    scopes.forEach(function (scope) {
      return module.disconnectContextForScope(scope);
    });
  };
  return Router;
}();

var defaultSchema = {
  controllerAttribute: "data-controller",
  actionAttribute: "data-action",
  targetAttribute: "data-target"
};

var __awaiter = window && window.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = window && window.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __spreadArrays = window && window.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
var Application = /** @class */function () {
  function Application(element, schema) {
    if (element === void 0) {
      element = document.documentElement;
    }
    if (schema === void 0) {
      schema = defaultSchema;
    }
    this.logger = console;
    this.element = element;
    this.schema = schema;
    this.dispatcher = new Dispatcher(this);
    this.router = new Router(this);
  }
  Application.start = function (element, schema) {
    var application = new Application(element, schema);
    application.start();
    return application;
  };
  Application.prototype.start = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, domReady()];
          case 1:
            _a.sent();
            this.dispatcher.start();
            this.router.start();
            return [2 /*return*/];
        }
      });
    });
  };

  Application.prototype.stop = function () {
    this.dispatcher.stop();
    this.router.stop();
  };
  Application.prototype.register = function (identifier, controllerConstructor) {
    this.load({
      identifier: identifier,
      controllerConstructor: controllerConstructor
    });
  };
  Application.prototype.load = function (head) {
    var _this = this;
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      rest[_i - 1] = arguments[_i];
    }
    var definitions = Array.isArray(head) ? head : __spreadArrays([head], rest);
    definitions.forEach(function (definition) {
      return _this.router.loadDefinition(definition);
    });
  };
  Application.prototype.unload = function (head) {
    var _this = this;
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      rest[_i - 1] = arguments[_i];
    }
    var identifiers = Array.isArray(head) ? head : __spreadArrays([head], rest);
    identifiers.forEach(function (identifier) {
      return _this.router.unloadIdentifier(identifier);
    });
  };
  Object.defineProperty(Application.prototype, "controllers", {
    // Controllers
    get: function () {
      return this.router.contexts.map(function (context) {
        return context.controller;
      });
    },
    enumerable: false,
    configurable: true
  });
  Application.prototype.getControllerForElementAndIdentifier = function (element, identifier) {
    var context = this.router.getContextForElementAndIdentifier(element, identifier);
    return context ? context.controller : null;
  };
  // Error handling
  Application.prototype.handleError = function (error, message, detail) {
    this.logger.error("%s\n\n%o\n\n%o", message, error, detail);
  };
  return Application;
}();
function domReady() {
  return new Promise(function (resolve) {
    if (document.readyState == "loading") {
      document.addEventListener("DOMContentLoaded", resolve);
    } else {
      resolve();
    }
  });
}

/** @hidden */
function ClassPropertiesBlessing(constructor) {
  var classes = readInheritableStaticArrayValues(constructor, "classes");
  return classes.reduce(function (properties, classDefinition) {
    return Object.assign(properties, propertiesForClassDefinition(classDefinition));
  }, {});
}
function propertiesForClassDefinition(key) {
  var _a;
  var name = key + "Class";
  return _a = {}, _a[name] = {
    get: function () {
      var classes = this.classes;
      if (classes.has(key)) {
        return classes.get(key);
      } else {
        var attribute = classes.getAttributeName(key);
        throw new Error("Missing attribute \"" + attribute + "\"");
      }
    }
  }, _a["has" + capitalize(name)] = {
    get: function () {
      return this.classes.has(key);
    }
  }, _a;
}

/** @hidden */
function TargetPropertiesBlessing(constructor) {
  var targets = readInheritableStaticArrayValues(constructor, "targets");
  return targets.reduce(function (properties, targetDefinition) {
    return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
  }, {});
}
function propertiesForTargetDefinition(name) {
  var _a;
  return _a = {}, _a[name + "Target"] = {
    get: function () {
      var target = this.targets.find(name);
      if (target) {
        return target;
      } else {
        throw new Error("Missing target element \"" + this.identifier + "." + name + "\"");
      }
    }
  }, _a[name + "Targets"] = {
    get: function () {
      return this.targets.findAll(name);
    }
  }, _a["has" + capitalize(name) + "Target"] = {
    get: function () {
      return this.targets.has(name);
    }
  }, _a;
}

/** @hidden */
function ValuePropertiesBlessing(constructor) {
  var valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
  var propertyDescriptorMap = {
    valueDescriptorMap: {
      get: function () {
        var _this = this;
        return valueDefinitionPairs.reduce(function (result, valueDefinitionPair) {
          var _a;
          var valueDescriptor = parseValueDefinitionPair(valueDefinitionPair);
          var attributeName = _this.data.getAttributeNameForKey(valueDescriptor.key);
          return Object.assign(result, (_a = {}, _a[attributeName] = valueDescriptor, _a));
        }, {});
      }
    }
  };
  return valueDefinitionPairs.reduce(function (properties, valueDefinitionPair) {
    return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
  }, propertyDescriptorMap);
}
/** @hidden */
function propertiesForValueDefinitionPair(valueDefinitionPair) {
  var _a;
  var definition = parseValueDefinitionPair(valueDefinitionPair);
  var type = definition.type,
    key = definition.key,
    name = definition.name;
  var read = readers[type],
    write = writers[type] || writers.default;
  return _a = {}, _a[name] = {
    get: function () {
      var value = this.data.get(key);
      if (value !== null) {
        return read(value);
      } else {
        return definition.defaultValue;
      }
    },
    set: function (value) {
      if (value === undefined) {
        this.data.delete(key);
      } else {
        this.data.set(key, write(value));
      }
    }
  }, _a["has" + capitalize(name)] = {
    get: function () {
      return this.data.has(key);
    }
  }, _a;
}
function parseValueDefinitionPair(_a) {
  var token = _a[0],
    typeConstant = _a[1];
  var type = parseValueTypeConstant(typeConstant);
  return valueDescriptorForTokenAndType(token, type);
}
function parseValueTypeConstant(typeConstant) {
  switch (typeConstant) {
    case Array:
      return "array";
    case Boolean:
      return "boolean";
    case Number:
      return "number";
    case Object:
      return "object";
    case String:
      return "string";
  }
  throw new Error("Unknown value type constant \"" + typeConstant + "\"");
}
function valueDescriptorForTokenAndType(token, type) {
  var key = dasherize(token) + "-value";
  return {
    type: type,
    key: key,
    name: camelize(key),
    get defaultValue() {
      return defaultValuesByType[type];
    }
  };
}
var defaultValuesByType = {
  get array() {
    return [];
  },
  boolean: false,
  number: 0,
  get object() {
    return {};
  },
  string: ""
};
var readers = {
  array: function (value) {
    var array = JSON.parse(value);
    if (!Array.isArray(array)) {
      throw new TypeError("Expected array");
    }
    return array;
  },
  boolean: function (value) {
    return !(value == "0" || value == "false");
  },
  number: function (value) {
    return parseFloat(value);
  },
  object: function (value) {
    var object = JSON.parse(value);
    if (object === null || typeof object != "object" || Array.isArray(object)) {
      throw new TypeError("Expected object");
    }
    return object;
  },
  string: function (value) {
    return value;
  }
};
var writers = {
  default: writeString,
  array: writeJSON,
  object: writeJSON
};
function writeJSON(value) {
  return JSON.stringify(value);
}
function writeString(value) {
  return "" + value;
}

var Controller = /** @class */function () {
  function Controller(context) {
    this.context = context;
  }
  Object.defineProperty(Controller.prototype, "application", {
    get: function () {
      return this.context.application;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Controller.prototype, "scope", {
    get: function () {
      return this.context.scope;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Controller.prototype, "element", {
    get: function () {
      return this.scope.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Controller.prototype, "identifier", {
    get: function () {
      return this.scope.identifier;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Controller.prototype, "targets", {
    get: function () {
      return this.scope.targets;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Controller.prototype, "classes", {
    get: function () {
      return this.scope.classes;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Controller.prototype, "data", {
    get: function () {
      return this.scope.data;
    },
    enumerable: false,
    configurable: true
  });
  Controller.prototype.initialize = function () {
    // Override in your subclass to set up initial controller state
  };
  Controller.prototype.connect = function () {
    // Override in your subclass to respond when the controller is connected to the DOM
  };
  Controller.prototype.disconnect = function () {
    // Override in your subclass to respond when the controller is disconnected from the DOM
  };
  Controller.blessings = [ClassPropertiesBlessing, TargetPropertiesBlessing, ValuePropertiesBlessing];
  Controller.targets = [];
  Controller.values = {};
  return Controller;
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var _default$1 = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);
  var _super = _createSuper(_default);
  function _default() {
    _classCallCheck(this, _default);
    return _super.apply(this, arguments);
  }
  _createClass(_default, [{
    key: "connect",
    value: function connect() {
      var _this = this;
      this.tabTargets.forEach(function (tab) {
        tab.tabContainer = _this;
      });
    }
  }, {
    key: "activeTabIdentifier",
    get: function get() {
      return this.controlTarget.value;
    }
  }, {
    key: "change",
    value: function change(event) {
      this.update(event.target.value);
    }
  }, {
    key: "update",
    value: function update(newActiveTabIdentifier) {
      var _this2 = this;
      this.tabTargets.forEach(function (tab) {
        var tabController = _this2.application.getControllerForElementAndIdentifier(tab, _this2.tabControllerNameValue);
        if (tab.dataset[_this2.tabIdentifierGetterValue] == newActiveTabIdentifier) {
          tabController.show();
        } else {
          tabController.hide();
        }
      });
    }
  }], [{
    key: "targets",
    get: function get() {
      return ["control", "tab"];
    }
  }, {
    key: "values",
    get: function get() {
      return {
        tabIdentifierGetter: String,
        tabControllerName: String
      };
    }
  }]);
  return _default;
}(Controller);

var _default = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);
  var _super = _createSuper(_default);
  function _default() {
    _classCallCheck(this, _default);
    return _super.apply(this, arguments);
  }
  _createClass(_default, [{
    key: "connect",
    value: function connect() {
      var tabContainer = this.element[this.tabContainerGetterValue];
      if (tabContainer.activeTabIdentifier === this.identifierValue) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.hasContentTarget) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "show",
    value: function show() {
      if (this.hasContentTarget) {
        return;
      }
      var pocketContent = this.pocketTarget.content.cloneNode(true);
      this.element.appendChild(pocketContent);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.hasContentTarget) {
        return;
      }
      this.contentTarget.remove();
    }
  }], [{
    key: "targets",
    get: function get() {
      return ["pocket", "content"];
    }
  }, {
    key: "values",
    get: function get() {
      return {
        identifier: String,
        tabContainerGetter: String
      };
    }
  }]);
  return _default;
}(Controller);

var StimulusApplication = Application.start();
StimulusApplication.register("tab-container", _default$1);
StimulusApplication.register("tab", _default);

export { StimulusApplication, Controller as StimulusController };
