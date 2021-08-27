var Super = (function (exports) {
  'use strict';

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  /*
  Unobtrusive JavaScript
  https://github.com/rails/rails/blob/main/actionview/app/assets/javascripts
  Released under the MIT license
   */
  createCommonjsModule(function (module) {
    (function () {
      var context = this;
      (function () {
        (function () {
          this.Rails = {
            linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
            buttonClickSelector: {
              selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
              exclude: 'form button'
            },
            inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
            formSubmitSelector: 'form',
            formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
            formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
            formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
            fileInputSelector: 'input[name][type=file]:not([disabled])',
            linkDisableSelector: 'a[data-disable-with], a[data-disable]',
            buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
          };
        }).call(this);
      }).call(context);
      var Rails = context.Rails;
      (function () {
        (function () {
          var nonce;
          nonce = null;

          Rails.loadCSPNonce = function () {
            var ref;
            return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
          };

          Rails.cspNonce = function () {
            return nonce != null ? nonce : Rails.loadCSPNonce();
          };
        }).call(this);
        (function () {
          var expando, m;
          m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

          Rails.matches = function (element, selector) {
            if (selector.exclude != null) {
              return m.call(element, selector.selector) && !m.call(element, selector.exclude);
            } else {
              return m.call(element, selector);
            }
          };

          expando = '_ujsData';

          Rails.getData = function (element, key) {
            var ref;
            return (ref = element[expando]) != null ? ref[key] : void 0;
          };

          Rails.setData = function (element, key, value) {
            if (element[expando] == null) {
              element[expando] = {};
            }

            return element[expando][key] = value;
          };

          Rails.$ = function (selector) {
            return Array.prototype.slice.call(document.querySelectorAll(selector));
          };
        }).call(this);
        (function () {
          var $, csrfParam, csrfToken;
          $ = Rails.$;

          csrfToken = Rails.csrfToken = function () {
            var meta;
            meta = document.querySelector('meta[name=csrf-token]');
            return meta && meta.content;
          };

          csrfParam = Rails.csrfParam = function () {
            var meta;
            meta = document.querySelector('meta[name=csrf-param]');
            return meta && meta.content;
          };

          Rails.CSRFProtection = function (xhr) {
            var token;
            token = csrfToken();

            if (token != null) {
              return xhr.setRequestHeader('X-CSRF-Token', token);
            }
          };

          Rails.refreshCSRFTokens = function () {
            var param, token;
            token = csrfToken();
            param = csrfParam();

            if (token != null && param != null) {
              return $('form input[name="' + param + '"]').forEach(function (input) {
                return input.value = token;
              });
            }
          };
        }).call(this);
        (function () {
          var CustomEvent, fire, matches, preventDefault;
          matches = Rails.matches;
          CustomEvent = window.CustomEvent;

          if (typeof CustomEvent !== 'function') {
            CustomEvent = function (event, params) {
              var evt;
              evt = document.createEvent('CustomEvent');
              evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
              return evt;
            };

            CustomEvent.prototype = window.Event.prototype;
            preventDefault = CustomEvent.prototype.preventDefault;

            CustomEvent.prototype.preventDefault = function () {
              var result;
              result = preventDefault.call(this);

              if (this.cancelable && !this.defaultPrevented) {
                Object.defineProperty(this, 'defaultPrevented', {
                  get: function () {
                    return true;
                  }
                });
              }

              return result;
            };
          }

          fire = Rails.fire = function (obj, name, data) {
            var event;
            event = new CustomEvent(name, {
              bubbles: true,
              cancelable: true,
              detail: data
            });
            obj.dispatchEvent(event);
            return !event.defaultPrevented;
          };

          Rails.stopEverything = function (e) {
            fire(e.target, 'ujs:everythingStopped');
            e.preventDefault();
            e.stopPropagation();
            return e.stopImmediatePropagation();
          };

          Rails.delegate = function (element, selector, eventType, handler) {
            return element.addEventListener(eventType, function (e) {
              var target;
              target = e.target;

              while (!(!(target instanceof Element) || matches(target, selector))) {
                target = target.parentNode;
              }

              if (target instanceof Element && handler.call(target, e) === false) {
                e.preventDefault();
                return e.stopPropagation();
              }
            });
          };
        }).call(this);
        (function () {
          var AcceptHeaders, CSRFProtection, createXHR, cspNonce, prepareOptions, processResponse;
          cspNonce = Rails.cspNonce, CSRFProtection = Rails.CSRFProtection;
          AcceptHeaders = {
            '*': '*/*',
            text: 'text/plain',
            html: 'text/html',
            xml: 'application/xml, text/xml',
            json: 'application/json, text/javascript',
            script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
          };

          Rails.ajax = function (options) {
            var xhr;
            options = prepareOptions(options);
            xhr = createXHR(options, function () {
              var ref, response;
              response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader('Content-Type'));

              if (Math.floor(xhr.status / 100) === 2) {
                if (typeof options.success === "function") {
                  options.success(response, xhr.statusText, xhr);
                }
              } else {
                if (typeof options.error === "function") {
                  options.error(response, xhr.statusText, xhr);
                }
              }

              return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
            });

            if (options.beforeSend != null && !options.beforeSend(xhr, options)) {
              return false;
            }

            if (xhr.readyState === XMLHttpRequest.OPENED) {
              return xhr.send(options.data);
            }
          };

          prepareOptions = function (options) {
            options.url = options.url || location.href;
            options.type = options.type.toUpperCase();

            if (options.type === 'GET' && options.data) {
              if (options.url.indexOf('?') < 0) {
                options.url += '?' + options.data;
              } else {
                options.url += '&' + options.data;
              }
            }

            if (AcceptHeaders[options.dataType] == null) {
              options.dataType = '*';
            }

            options.accept = AcceptHeaders[options.dataType];

            if (options.dataType !== '*') {
              options.accept += ', */*; q=0.01';
            }

            return options;
          };

          createXHR = function (options, done) {
            var xhr;
            xhr = new XMLHttpRequest();
            xhr.open(options.type, options.url, true);
            xhr.setRequestHeader('Accept', options.accept);

            if (typeof options.data === 'string') {
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            }

            if (!options.crossDomain) {
              xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
              CSRFProtection(xhr);
            }

            xhr.withCredentials = !!options.withCredentials;

            xhr.onreadystatechange = function () {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                return done(xhr);
              }
            };

            return xhr;
          };

          processResponse = function (response, type) {
            var parser, script;

            if (typeof response === 'string' && typeof type === 'string') {
              if (type.match(/\bjson\b/)) {
                try {
                  response = JSON.parse(response);
                } catch (error) {}
              } else if (type.match(/\b(?:java|ecma)script\b/)) {
                script = document.createElement('script');
                script.setAttribute('nonce', cspNonce());
                script.text = response;
                document.head.appendChild(script).parentNode.removeChild(script);
              } else if (type.match(/\b(xml|html|svg)\b/)) {
                parser = new DOMParser();
                type = type.replace(/;.+/, '');

                try {
                  response = parser.parseFromString(response, type);
                } catch (error) {}
              }
            }

            return response;
          };

          Rails.href = function (element) {
            return element.href;
          };

          Rails.isCrossDomain = function (url) {
            var originAnchor, urlAnchor;
            originAnchor = document.createElement('a');
            originAnchor.href = location.href;
            urlAnchor = document.createElement('a');

            try {
              urlAnchor.href = url;
              return !((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host || originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host);
            } catch (error) {
              return true;
            }
          };
        }).call(this);
        (function () {
          var matches, toArray;
          matches = Rails.matches;

          toArray = function (e) {
            return Array.prototype.slice.call(e);
          };

          Rails.serializeElement = function (element, additionalParam) {
            var inputs, params;
            inputs = [element];

            if (matches(element, 'form')) {
              inputs = toArray(element.elements);
            }

            params = [];
            inputs.forEach(function (input) {
              if (!input.name || input.disabled) {
                return;
              }

              if (matches(input, 'fieldset[disabled] *')) {
                return;
              }

              if (matches(input, 'select')) {
                return toArray(input.options).forEach(function (option) {
                  if (option.selected) {
                    return params.push({
                      name: input.name,
                      value: option.value
                    });
                  }
                });
              } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
                return params.push({
                  name: input.name,
                  value: input.value
                });
              }
            });

            if (additionalParam) {
              params.push(additionalParam);
            }

            return params.map(function (param) {
              if (param.name != null) {
                return encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
              } else {
                return param;
              }
            }).join('&');
          };

          Rails.formElements = function (form, selector) {
            if (matches(form, 'form')) {
              return toArray(form.elements).filter(function (el) {
                return matches(el, selector);
              });
            } else {
              return toArray(form.querySelectorAll(selector));
            }
          };
        }).call(this);
        (function () {
          var allowAction, fire, stopEverything;
          fire = Rails.fire, stopEverything = Rails.stopEverything;

          Rails.handleConfirm = function (e) {
            if (!allowAction(this)) {
              return stopEverything(e);
            }
          };

          Rails.confirm = function (message, element) {
            return confirm(message);
          };

          allowAction = function (element) {
            var answer, callback, message;
            message = element.getAttribute('data-confirm');

            if (!message) {
              return true;
            }

            answer = false;

            if (fire(element, 'confirm')) {
              try {
                answer = Rails.confirm(message, element);
              } catch (error) {}

              callback = fire(element, 'confirm:complete', [answer]);
            }

            return answer && callback;
          };
        }).call(this);
        (function () {
          var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isXhrRedirect, matches, setData, stopEverything;
          matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

          Rails.handleDisabledElement = function (e) {
            var element;
            element = this;

            if (element.disabled) {
              return stopEverything(e);
            }
          };

          Rails.enableElement = function (e) {
            var element;

            if (e instanceof Event) {
              if (isXhrRedirect(e)) {
                return;
              }

              element = e.target;
            } else {
              element = e;
            }

            if (matches(element, Rails.linkDisableSelector)) {
              return enableLinkElement(element);
            } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
              return enableFormElement(element);
            } else if (matches(element, Rails.formSubmitSelector)) {
              return enableFormElements(element);
            }
          };

          Rails.disableElement = function (e) {
            var element;
            element = e instanceof Event ? e.target : e;

            if (matches(element, Rails.linkDisableSelector)) {
              return disableLinkElement(element);
            } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
              return disableFormElement(element);
            } else if (matches(element, Rails.formSubmitSelector)) {
              return disableFormElements(element);
            }
          };

          disableLinkElement = function (element) {
            var replacement;

            if (getData(element, 'ujs:disabled')) {
              return;
            }

            replacement = element.getAttribute('data-disable-with');

            if (replacement != null) {
              setData(element, 'ujs:enable-with', element.innerHTML);
              element.innerHTML = replacement;
            }

            element.addEventListener('click', stopEverything);
            return setData(element, 'ujs:disabled', true);
          };

          enableLinkElement = function (element) {
            var originalText;
            originalText = getData(element, 'ujs:enable-with');

            if (originalText != null) {
              element.innerHTML = originalText;
              setData(element, 'ujs:enable-with', null);
            }

            element.removeEventListener('click', stopEverything);
            return setData(element, 'ujs:disabled', null);
          };

          disableFormElements = function (form) {
            return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
          };

          disableFormElement = function (element) {
            var replacement;

            if (getData(element, 'ujs:disabled')) {
              return;
            }

            replacement = element.getAttribute('data-disable-with');

            if (replacement != null) {
              if (matches(element, 'button')) {
                setData(element, 'ujs:enable-with', element.innerHTML);
                element.innerHTML = replacement;
              } else {
                setData(element, 'ujs:enable-with', element.value);
                element.value = replacement;
              }
            }

            element.disabled = true;
            return setData(element, 'ujs:disabled', true);
          };

          enableFormElements = function (form) {
            return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
          };

          enableFormElement = function (element) {
            var originalText;
            originalText = getData(element, 'ujs:enable-with');

            if (originalText != null) {
              if (matches(element, 'button')) {
                element.innerHTML = originalText;
              } else {
                element.value = originalText;
              }

              setData(element, 'ujs:enable-with', null);
            }

            element.disabled = false;
            return setData(element, 'ujs:disabled', null);
          };

          isXhrRedirect = function (event) {
            var ref, xhr;
            xhr = (ref = event.detail) != null ? ref[0] : void 0;
            return (xhr != null ? xhr.getResponseHeader("X-Xhr-Redirect") : void 0) != null;
          };
        }).call(this);
        (function () {
          var stopEverything;
          stopEverything = Rails.stopEverything;

          Rails.handleMethod = function (e) {
            var csrfParam, csrfToken, form, formContent, href, link, method;
            link = this;
            method = link.getAttribute('data-method');

            if (!method) {
              return;
            }

            href = Rails.href(link);
            csrfToken = Rails.csrfToken();
            csrfParam = Rails.csrfParam();
            form = document.createElement('form');
            formContent = "<input name='_method' value='" + method + "' type='hidden' />";

            if (csrfParam != null && csrfToken != null && !Rails.isCrossDomain(href)) {
              formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
            }

            formContent += '<input type="submit" />';
            form.method = 'post';
            form.action = href;
            form.target = link.target;
            form.innerHTML = formContent;
            form.style.display = 'none';
            document.body.appendChild(form);
            form.querySelector('[type="submit"]').click();
            return stopEverything(e);
          };
        }).call(this);
        (function () {
          var ajax,
              fire,
              getData,
              isCrossDomain,
              isRemote,
              matches,
              serializeElement,
              setData,
              stopEverything,
              slice = [].slice;
          matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

          isRemote = function (element) {
            var value;
            value = element.getAttribute('data-remote');
            return value != null && value !== 'false';
          };

          Rails.handleRemote = function (e) {
            var button, data, dataType, element, method, url, withCredentials;
            element = this;

            if (!isRemote(element)) {
              return true;
            }

            if (!fire(element, 'ajax:before')) {
              fire(element, 'ajax:stopped');
              return false;
            }

            withCredentials = element.getAttribute('data-with-credentials');
            dataType = element.getAttribute('data-type') || 'script';

            if (matches(element, Rails.formSubmitSelector)) {
              button = getData(element, 'ujs:submit-button');
              method = getData(element, 'ujs:submit-button-formmethod') || element.method;
              url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;

              if (method.toUpperCase() === 'GET') {
                url = url.replace(/\?.*$/, '');
              }

              if (element.enctype === 'multipart/form-data') {
                data = new FormData(element);

                if (button != null) {
                  data.append(button.name, button.value);
                }
              } else {
                data = serializeElement(element, button);
              }

              setData(element, 'ujs:submit-button', null);
              setData(element, 'ujs:submit-button-formmethod', null);
              setData(element, 'ujs:submit-button-formaction', null);
            } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
              method = element.getAttribute('data-method');
              url = element.getAttribute('data-url');
              data = serializeElement(element, element.getAttribute('data-params'));
            } else {
              method = element.getAttribute('data-method');
              url = Rails.href(element);
              data = element.getAttribute('data-params');
            }

            ajax({
              type: method || 'GET',
              url: url,
              data: data,
              dataType: dataType,
              beforeSend: function (xhr, options) {
                if (fire(element, 'ajax:beforeSend', [xhr, options])) {
                  return fire(element, 'ajax:send', [xhr]);
                } else {
                  fire(element, 'ajax:stopped');
                  return false;
                }
              },
              success: function () {
                var args;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                return fire(element, 'ajax:success', args);
              },
              error: function () {
                var args;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                return fire(element, 'ajax:error', args);
              },
              complete: function () {
                var args;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                return fire(element, 'ajax:complete', args);
              },
              crossDomain: isCrossDomain(url),
              withCredentials: withCredentials != null && withCredentials !== 'false'
            });
            return stopEverything(e);
          };

          Rails.formSubmitButtonClick = function (e) {
            var button, form;
            button = this;
            form = button.form;

            if (!form) {
              return;
            }

            if (button.name) {
              setData(form, 'ujs:submit-button', {
                name: button.name,
                value: button.value
              });
            }

            setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
            setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
            return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
          };

          Rails.preventInsignificantClick = function (e) {
            var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
            link = this;
            method = (link.getAttribute('data-method') || 'GET').toUpperCase();
            data = link.getAttribute('data-params');
            metaClick = e.metaKey || e.ctrlKey;
            insignificantMetaClick = metaClick && method === 'GET' && !data;
            nonPrimaryMouseClick = e.button != null && e.button !== 0;

            if (nonPrimaryMouseClick || insignificantMetaClick) {
              return e.stopImmediatePropagation();
            }
          };
        }).call(this);
        (function () {
          var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;
          fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, loadCSPNonce = Rails.loadCSPNonce, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, preventInsignificantClick = Rails.preventInsignificantClick, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMethod = Rails.handleMethod;

          if (typeof jQuery !== "undefined" && jQuery !== null && jQuery.ajax != null) {
            if (jQuery.rails) {
              throw new Error('If you load both jquery_ujs and rails-ujs, use rails-ujs only.');
            }

            jQuery.rails = Rails;
            jQuery.ajaxPrefilter(function (options, originalOptions, xhr) {
              if (!options.crossDomain) {
                return CSRFProtection(xhr);
              }
            });
          }

          Rails.start = function () {
            if (window._rails_loaded) {
              throw new Error('rails-ujs has already been loaded!');
            }

            window.addEventListener('pageshow', function () {
              $(Rails.formEnableSelector).forEach(function (el) {
                if (getData(el, 'ujs:disabled')) {
                  return enableElement(el);
                }
              });
              return $(Rails.linkDisableSelector).forEach(function (el) {
                if (getData(el, 'ujs:disabled')) {
                  return enableElement(el);
                }
              });
            });
            delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
            delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
            delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
            delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
            delegate(document, Rails.linkClickSelector, 'click', preventInsignificantClick);
            delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
            delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
            delegate(document, Rails.linkClickSelector, 'click', disableElement);
            delegate(document, Rails.linkClickSelector, 'click', handleRemote);
            delegate(document, Rails.linkClickSelector, 'click', handleMethod);
            delegate(document, Rails.buttonClickSelector, 'click', preventInsignificantClick);
            delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
            delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
            delegate(document, Rails.buttonClickSelector, 'click', disableElement);
            delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
            delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
            delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
            delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
            delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
            delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
            delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
            delegate(document, Rails.formSubmitSelector, 'submit', function (e) {
              return setTimeout(function () {
                return disableElement(e);
              }, 13);
            });
            delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
            delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
            delegate(document, Rails.formInputClickSelector, 'click', preventInsignificantClick);
            delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
            delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
            delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
            document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
            document.addEventListener('DOMContentLoaded', loadCSPNonce);
            return window._rails_loaded = true;
          };

          if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
            Rails.start();
          }
        }).call(this);
      }).call(this);

      if (module.exports) {
        module.exports = Rails;
      }
    }).call(commonjsGlobal);
  });

  var EventListener =
  /** @class */
  function () {
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
    }; // Binding observer delegate

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

  var Dispatcher =
  /** @class */
  function () {
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
    }); // Binding observer delegate

    /** @hidden */

    Dispatcher.prototype.bindingConnected = function (binding) {
      this.fetchEventListenerForBinding(binding).bindingConnected(binding);
    };
    /** @hidden */


    Dispatcher.prototype.bindingDisconnected = function (binding) {
      this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
    }; // Error handling


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

  var Action =
  /** @class */
  function () {
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

  var Binding =
  /** @class */
  function () {
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

  var ElementObserver =
  /** @class */
  function () {
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
    }; // Mutation record processing


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
    }; // Element matching


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
    }; // Element tracking


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

  var AttributeObserver =
  /** @class */
  function () {
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
    }); // Element observer delegate

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

  var StringMapObserver =
  /** @class */
  function () {
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
    }; // Mutation record processing


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
    }; // State tracking


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

  var Multimap =
  /** @class */
  function () {
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

  /** @class */
  (function (_super) {
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

  var TokenListObserver =
  /** @class */
  function () {
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
    }); // Attribute observer delegate

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

  var ValueListObserver =
  /** @class */
  function () {
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

  var BindingObserver =
  /** @class */
  function () {
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
    }; // Value observer delegate


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

  var ValueObserver =
  /** @class */
  function () {
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
    }); // String map observer delegate

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

  var Context =
  /** @class */
  function () {
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
    }); // Error handling

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
        return (
          /** @class */
          function (_super) {
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

  var Module =
  /** @class */
  function () {
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

  var ClassMap =
  /** @class */
  function () {
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

  var DataMap =
  /** @class */
  function () {
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

  var Guide =
  /** @class */
  function () {
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

  var TargetSet =
  /** @class */
  function () {
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

  var Scope =
  /** @class */
  function () {
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

  var ScopeObserver =
  /** @class */
  function () {
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
    }); // Value observer delegate

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

  var Router =
  /** @class */
  function () {
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
    }; // Error handler delegate

    /** @hidden */


    Router.prototype.handleError = function (error, message, detail) {
      this.application.handleError(error, message, detail);
    }; // Scope observer delegate

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
    }; // Modules


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

  var Application =
  /** @class */
  function () {
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
              return [4
              /*yield*/
              , domReady()];

            case 1:
              _a.sent();

              this.dispatcher.start();
              this.router.start();
              return [2
              /*return*/
              ];
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
    }; // Error handling


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

  var Controller =
  /** @class */
  function () {
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

    Controller.prototype.initialize = function () {// Override in your subclass to set up initial controller state
    };

    Controller.prototype.connect = function () {// Override in your subclass to respond when the controller is connected to the DOM
    };

    Controller.prototype.disconnect = function () {// Override in your subclass to respond when the controller is disconnected from the DOM
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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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

  var _default$9 = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "call",
      value: function call(event) {
        event.preventDefault();
        var unixtime = new Date().getTime();
        var content = this.templateTarget.innerHTML.replace(/TEMPLATEINDEX/g, unixtime.toString());
        this.templateTarget.insertAdjacentHTML("beforebegin", content);
      }
    }], [{
      key: "targets",
      get: function get() {
        return ["template"];
      }
    }]);

    return _default;
  }(Controller);

  var _default$8 = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "submit",
      value: function submit() {
        var form = this.element.closest("form");
        form.method = this.methodValue;
        form.action = this.actionValue;
        var authenticityTokenInput = document.createElement("input");
        authenticityTokenInput.type = "hidden";
        authenticityTokenInput.name = document.querySelector("meta[name='csrf-param']").content;
        authenticityTokenInput.value = document.querySelector("meta[name='csrf-token']").content;
        form.appendChild(authenticityTokenInput);
      }
    }], [{
      key: "values",
      get: function get() {
        return {
          method: String,
          action: String
        };
      }
    }]);

    return _default;
  }(Controller);

  var _default$7 = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "call",
      value: function call() {
        var allControlsBlank = this.controlTargets.every(function (el) {
          return el.value === "";
        });

        if (!allControlsBlank) {
          return;
        }

        this.candidateTargets.forEach(function (el) {
          el.disabled = true;
        });
      }
    }], [{
      key: "targets",
      get: function get() {
        return ["candidate", "control"];
      }
    }]);

    return _default;
  }(Controller);

  var _default$6 = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "call",
      value: function call(event) {
        this.element.querySelectorAll("[data-controller='clean-filter-param']").forEach(function (el) {
          var controller = this.application.getControllerForElementAndIdentifier(el, "clean-filter-param");
          controller.call();
        }.bind(this));
      }
    }]);

    return _default;
  }(Controller);

  var _default$5 = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "close",
      value: function close(event) {
        if (!this.element.hasAttribute("open")) {
          return true;
        }

        if (this.element === event.target || this.element.contains(event.target)) {
          return true;
        }

        this.element.removeAttribute("open");
        return true;
      }
    }]);

    return _default;
  }(Controller);

  var _default$4 = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "call",
      value: function call(event) {
        event.preventDefault();
        this.element.remove();
      }
    }]);

    return _default;
  }(Controller);

  const HOOKS = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"];
  const defaults = {
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
    errorHandler: err => typeof console !== "undefined" && console.warn(err),
    getWeek: givenDate => {
      const date = new Date(givenDate.getTime());
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

  const english = {
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
    ordinal: nth => {
      const s = nth % 100;
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

  const pad = (number, length = 2) => `000${number}`.slice(length * -1);
  const int = bool => bool === true ? 1 : 0;
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }
  const arrayify = obj => obj instanceof Array ? obj : [obj];

  function toggleClass(elem, className, bool) {
    if (bool === true) return elem.classList.add(className);
    elem.classList.remove(className);
  }
  function createElement(tag, className, content) {
    const e = window.document.createElement(tag);
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
    const wrapper = createElement("div", "numInputWrapper"),
          numInput = createElement("input", "numInput " + inputClassName),
          arrowUp = createElement("span", "arrowUp"),
          arrowDown = createElement("span", "arrowDown");

    if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
      numInput.type = "number";
    } else {
      numInput.type = "text";
      numInput.pattern = "\\d*";
    }

    if (opts !== undefined) for (const key in opts) numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
  }
  function getEventTarget(event) {
    try {
      if (typeof event.composedPath === "function") {
        const path = event.composedPath();
        return path[0];
      }

      return event.target;
    } catch (error) {
      return event.target;
    }
  }

  const doNothing = () => undefined;

  const monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
  const revFormat = {
    D: doNothing,
    F: function (dateObj, monthName, locale) {
      dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: (dateObj, hour) => {
      dateObj.setHours(parseFloat(hour));
    },
    H: (dateObj, hour) => {
      dateObj.setHours(parseFloat(hour));
    },
    J: (dateObj, day) => {
      dateObj.setDate(parseFloat(day));
    },
    K: (dateObj, amPM, locale) => {
      dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
      dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: (dateObj, seconds) => {
      dateObj.setSeconds(parseFloat(seconds));
    },
    U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1000),
    W: function (dateObj, weekNum, locale) {
      const weekNumber = parseInt(weekNum);
      const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
      date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
      return date;
    },
    Y: (dateObj, year) => {
      dateObj.setFullYear(parseFloat(year));
    },
    Z: (_, ISODate) => new Date(ISODate),
    d: (dateObj, day) => {
      dateObj.setDate(parseFloat(day));
    },
    h: (dateObj, hour) => {
      dateObj.setHours(parseFloat(hour));
    },
    i: (dateObj, minutes) => {
      dateObj.setMinutes(parseFloat(minutes));
    },
    j: (dateObj, day) => {
      dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: (dateObj, month) => {
      dateObj.setMonth(parseFloat(month) - 1);
    },
    n: (dateObj, month) => {
      dateObj.setMonth(parseFloat(month) - 1);
    },
    s: (dateObj, seconds) => {
      dateObj.setSeconds(parseFloat(seconds));
    },
    u: (_, unixMillSeconds) => new Date(parseFloat(unixMillSeconds)),
    w: doNothing,
    y: (dateObj, year) => {
      dateObj.setFullYear(2000 + parseFloat(year));
    }
  };
  const tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    u: "(.+)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})"
  };
  const formats = {
    Z: date => date.toISOString(),
    D: function (date, locale, options) {
      return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
      return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
      return pad(formats.h(date, locale, options));
    },
    H: date => pad(date.getHours()),
    J: function (date, locale) {
      return locale.ordinal !== undefined ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
    },
    K: (date, locale) => locale.amPM[int(date.getHours() > 11)],
    M: function (date, locale) {
      return monthToStr(date.getMonth(), true, locale);
    },
    S: date => pad(date.getSeconds()),
    U: date => date.getTime() / 1000,
    W: function (date, _, options) {
      return options.getWeek(date);
    },
    Y: date => pad(date.getFullYear(), 4),
    d: date => pad(date.getDate()),
    h: date => date.getHours() % 12 ? date.getHours() % 12 : 12,
    i: date => pad(date.getMinutes()),
    j: date => date.getDate(),
    l: function (date, locale) {
      return locale.weekdays.longhand[date.getDay()];
    },
    m: date => pad(date.getMonth() + 1),
    n: date => date.getMonth() + 1,
    s: date => date.getSeconds(),
    u: date => date.getTime(),
    w: date => date.getDay(),
    y: date => String(date.getFullYear()).substring(2)
  };

  const createDateFormatter = ({
    config = defaults,
    l10n = english,
    isMobile = false
  }) => (dateObj, frmt, overrideLocale) => {
    const locale = overrideLocale || l10n;

    if (config.formatDate !== undefined && !isMobile) {
      return config.formatDate(dateObj, frmt, locale);
    }

    return frmt.split("").map((c, i, arr) => formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "").join("");
  };
  const createDateParser = ({
    config = defaults,
    l10n = english
  }) => (date, givenFormat, timeless, customLocale) => {
    if (date !== 0 && !date) return undefined;
    const locale = customLocale || l10n;
    let parsedDate;
    const dateOrig = date;
    if (date instanceof Date) parsedDate = new Date(date.getTime());else if (typeof date !== "string" && date.toFixed !== undefined) parsedDate = new Date(date);else if (typeof date === "string") {
      const format = givenFormat || (config || defaults).dateFormat;
      const datestr = String(date).trim();

      if (datestr === "today") {
        parsedDate = new Date();
        timeless = true;
      } else if (/Z$/.test(datestr) || /GMT$/.test(datestr)) parsedDate = new Date(date);else if (config && config.parseDate) parsedDate = config.parseDate(date, format);else {
        parsedDate = !config || !config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
        let matched,
            ops = [];

        for (let i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
          const token = format[i];
          const isBackSlash = token === "\\";
          const escaped = format[i - 1] === "\\" || isBackSlash;

          if (tokenRegex[token] && !escaped) {
            regexStr += tokenRegex[token];
            const match = new RegExp(regexStr).exec(date);

            if (match && (matched = true)) {
              ops[token !== "Y" ? "push" : "unshift"]({
                fn: revFormat[token],
                val: match[++matchIndex]
              });
            }
          } else if (!isBackSlash) regexStr += ".";

          ops.forEach(({
            fn,
            val
          }) => parsedDate = fn(parsedDate, val, locale) || parsedDate);
        }

        parsedDate = matched ? parsedDate : undefined;
      }
    }

    if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
      config.errorHandler(new Error(`Invalid date provided: ${dateOrig}`));
      return undefined;
    }

    if (timeless === true) parsedDate.setHours(0, 0, 0, 0);
    return parsedDate;
  };
  function compareDates(date1, date2, timeless = true) {
    if (timeless !== false) {
      return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
    }

    return date1.getTime() - date2.getTime();
  }
  const isBetween = (ts, ts1, ts2) => {
    return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
  };
  const duration = {
    DAY: 86400000
  };
  function getDefaultHours(config) {
    let hours = config.defaultHour;
    let minutes = config.defaultMinute;
    let seconds = config.defaultSeconds;

    if (config.minDate !== undefined) {
      const minHour = config.minDate.getHours();
      const minMinutes = config.minDate.getMinutes();
      const minSeconds = config.minDate.getSeconds();

      if (hours < minHour) {
        hours = minHour;
      }

      if (hours === minHour && minutes < minMinutes) {
        minutes = minMinutes;
      }

      if (hours === minHour && minutes === minMinutes && seconds < minSeconds) seconds = config.minDate.getSeconds();
    }

    if (config.maxDate !== undefined) {
      const maxHr = config.maxDate.getHours();
      const maxMinutes = config.maxDate.getMinutes();
      hours = Math.min(hours, maxHr);
      if (hours === maxHr) minutes = Math.min(maxMinutes, minutes);
      if (hours === maxHr && minutes === maxMinutes) seconds = config.maxDate.getSeconds();
    }

    return {
      hours,
      minutes,
      seconds
    };
  }

  if (typeof Object.assign !== "function") {
    Object.assign = function (target, ...args) {
      if (!target) {
        throw TypeError("Cannot convert undefined or null to object");
      }

      for (const source of args) {
        if (source) {
          Object.keys(source).forEach(key => target[key] = source[key]);
        }
      }

      return target;
    };
  }

  const DEBOUNCED_CHANGE_MS = 300;

  function FlatpickrInstance(element, instanceConfig) {
    const self = {
      config: Object.assign(Object.assign({}, defaults), flatpickr.defaultConfig),
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
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;

    function setupHelperFunctions() {
      self.utils = {
        getDaysInMonth(month = self.currentMonth, yr = self.currentYear) {
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
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (!self.isMobile && isSafari) {
        positionCalendar();
      }

      triggerEvent("onReady");
    }

    function bindToInstance(fn) {
      return fn.bind(self);
    }

    function setCalendarWidth() {
      const config = self.config;

      if (config.weekNumbers === false && config.showMonths === 1) {
        return;
      } else if (config.noCalendar !== true) {
        window.requestAnimationFrame(function () {
          if (self.calendarContainer !== undefined) {
            self.calendarContainer.style.visibility = "hidden";
            self.calendarContainer.style.display = "block";
          }

          if (self.daysContainer !== undefined) {
            const daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
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
        const defaultDate = self.config.minDate === undefined || compareDates(new Date(), self.config.minDate) >= 0 ? new Date() : new Date(self.config.minDate.getTime());
        const defaults = getDefaultHours(self.config);
        defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
        self.selectedDates = [defaultDate];
        self.latestSelectedDateObj = defaultDate;
      }

      if (e !== undefined && e.type !== "blur") {
        timeWrapper(e);
      }

      const prevValue = self._input.value;
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
      let hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24,
          minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60,
          seconds = self.secondElement !== undefined ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;

      if (self.amPM !== undefined) {
        hours = ampm2military(hours, self.amPM.textContent);
      }

      const limitMinHours = self.config.minTime !== undefined || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.minDate, true) === 0;
      const limitMaxHours = self.config.maxTime !== undefined || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.maxDate, true) === 0;

      if (limitMaxHours) {
        const maxTime = self.config.maxTime !== undefined ? self.config.maxTime : self.config.maxDate;
        hours = Math.min(hours, maxTime.getHours());
        if (hours === maxTime.getHours()) minutes = Math.min(minutes, maxTime.getMinutes());
        if (minutes === maxTime.getMinutes()) seconds = Math.min(seconds, maxTime.getSeconds());
      }

      if (limitMinHours) {
        const minTime = self.config.minTime !== undefined ? self.config.minTime : self.config.minDate;
        hours = Math.max(hours, minTime.getHours());
        if (hours === minTime.getHours() && minutes < minTime.getMinutes()) minutes = minTime.getMinutes();
        if (minutes === minTime.getMinutes()) seconds = Math.max(seconds, minTime.getSeconds());
      }

      setHours(hours, minutes, seconds);
    }

    function setHoursFromDate(dateObj) {
      const date = dateObj || self.latestSelectedDateObj;

      if (date) {
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
      const eventTarget = getEventTarget(event);
      const year = parseInt(eventTarget.value) + (event.delta || 0);

      if (year / 1000 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
        changeYear(year);
      }
    }

    function bind(element, event, handler, options) {
      if (event instanceof Array) return event.forEach(ev => bind(element, ev, handler, options));
      if (element instanceof Array) return element.forEach(el => bind(el, event, handler, options));
      element.addEventListener(event, handler, options);

      self._handlers.push({
        remove: () => element.removeEventListener(event, handler)
      });
    }

    function triggerChange() {
      triggerEvent("onChange");
    }

    function bindEvents() {
      if (self.config.wrap) {
        ["open", "close", "toggle", "clear"].forEach(evt => {
          Array.prototype.forEach.call(self.element.querySelectorAll(`[data-${evt}]`), el => bind(el, "click", self[evt]));
        });
      }

      if (self.isMobile) {
        setupMobile();
        return;
      }

      const debouncedResize = debounce(onResize, 50);
      self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
      if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) bind(self.daysContainer, "mouseover", e => {
        if (self.config.mode === "range") onMouseOver(getEventTarget(e));
      });
      bind(window.document.body, "keydown", onKeyDown);
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
        const selText = e => getEventTarget(e).select();

        bind(self.timeContainer, ["increment"], updateTime);
        bind(self.timeContainer, "blur", updateTime, {
          capture: true
        });
        bind(self.timeContainer, "click", timeIncrement);
        bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
        if (self.secondElement !== undefined) bind(self.secondElement, "focus", () => self.secondElement && self.secondElement.select());

        if (self.amPM !== undefined) {
          bind(self.amPM, "click", e => {
            updateTime(e);
            triggerChange();
          });
        }
      }

      if (self.config.allowInput) {
        bind(self._input, "blur", onBlur);
      }
    }

    function jumpToDate(jumpDate, triggerChange) {
      const jumpTo = jumpDate !== undefined ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
      const oldYear = self.currentYear;
      const oldMonth = self.currentMonth;

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
      const eventTarget = getEventTarget(e);
      if (~eventTarget.className.indexOf("arrow")) incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
    }

    function incrementNumInput(e, delta, inputElem) {
      const target = e && getEventTarget(e);
      const input = inputElem || target && target.parentNode && target.parentNode.firstChild;
      const event = createEvent("increment");
      event.delta = delta;
      input && input.dispatchEvent(event);
    }

    function build() {
      const fragment = window.document.createDocumentFragment();
      self.calendarContainer = createElement("div", "flatpickr-calendar");
      self.calendarContainer.tabIndex = -1;

      if (!self.config.noCalendar) {
        fragment.appendChild(buildMonthNav());
        self.innerContainer = createElement("div", "flatpickr-innerContainer");

        if (self.config.weekNumbers) {
          const {
            weekWrapper,
            weekNumbers
          } = buildWeeks();
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
      const customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType !== undefined;

      if (self.config.inline || self.config.static) {
        self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");

        if (self.config.inline) {
          if (!customAppend && self.element.parentNode) self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);else if (self.config.appendTo !== undefined) self.config.appendTo.appendChild(self.calendarContainer);
        }

        if (self.config.static) {
          const wrapper = createElement("div", "flatpickr-wrapper");
          if (self.element.parentNode) self.element.parentNode.insertBefore(wrapper, self.element);
          wrapper.appendChild(self.element);
          if (self.altInput) wrapper.appendChild(self.altInput);
          wrapper.appendChild(self.calendarContainer);
        }
      }

      if (!self.config.static && !self.config.inline) (self.config.appendTo !== undefined ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
    }

    function createDay(className, date, dayNumber, i) {
      const dateIsEnabled = isEnabled(date, true),
            dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
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

      if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && dayNumber % 7 === 1) {
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
      const startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
      const endMonth = delta > 0 ? self.config.showMonths : -1;

      for (let m = startMonth; m != endMonth; m += delta) {
        const month = self.daysContainer.children[m];
        const startIndex = delta > 0 ? 0 : month.children.length - 1;
        const endIndex = delta > 0 ? month.children.length : -1;

        for (let i = startIndex; i != endIndex; i += delta) {
          const c = month.children[i];
          if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj)) return c;
        }
      }

      return undefined;
    }

    function getNextAvailableDay(current, delta) {
      const givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
      const endMonth = delta > 0 ? self.config.showMonths : -1;
      const loopDelta = delta > 0 ? 1 : -1;

      for (let m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
        const month = self.daysContainer.children[m];
        const startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
        const numMonthDays = month.children.length;

        for (let i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
          const c = month.children[i];
          if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta)) return focusOnDayElem(c);
        }
      }

      self.changeMonth(loopDelta);
      focusOnDay(getFirstAvailableDay(loopDelta), 0);
      return undefined;
    }

    function focusOnDay(current, offset) {
      const dayFocused = isInView(document.activeElement || document.body);
      const startElem = current !== undefined ? current : dayFocused ? document.activeElement : self.selectedDateElem !== undefined && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== undefined && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);

      if (startElem === undefined) {
        self._input.focus();
      } else if (!dayFocused) {
        focusOnDayElem(startElem);
      } else {
        getNextAvailableDay(startElem, offset);
      }
    }

    function buildMonthDays(year, month) {
      const firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
      const prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
      const daysInMonth = self.utils.getDaysInMonth(month, year),
            days = window.document.createDocumentFragment(),
            isMultiMonth = self.config.showMonths > 1,
            prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay",
            nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
      let dayNumber = prevMonthDays + 1 - firstOfMonth,
          dayIndex = 0;

      for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
        days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
      }

      for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
        days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
      }

      for (let dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
        days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
      }

      const dayContainer = createElement("div", "dayContainer");
      dayContainer.appendChild(days);
      return dayContainer;
    }

    function buildDays() {
      if (self.daysContainer === undefined) {
        return;
      }

      clearNode(self.daysContainer);
      if (self.weekNumbers) clearNode(self.weekNumbers);
      const frag = document.createDocumentFragment();

      for (let i = 0; i < self.config.showMonths; i++) {
        const d = new Date(self.currentYear, self.currentMonth, 1);
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

      const shouldBuildMonth = function (month) {
        if (self.config.minDate !== undefined && self.currentYear === self.config.minDate.getFullYear() && month < self.config.minDate.getMonth()) {
          return false;
        }

        return !(self.config.maxDate !== undefined && self.currentYear === self.config.maxDate.getFullYear() && month > self.config.maxDate.getMonth());
      };

      self.monthsDropdownContainer.tabIndex = -1;
      self.monthsDropdownContainer.innerHTML = "";

      for (let i = 0; i < 12; i++) {
        if (!shouldBuildMonth(i)) continue;
        const month = createElement("option", "flatpickr-monthDropdown-month");
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
      const container = createElement("div", "flatpickr-month");
      const monthNavFragment = window.document.createDocumentFragment();
      let monthElement;

      if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
        monthElement = createElement("span", "cur-month");
      } else {
        self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
        self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
        bind(self.monthsDropdownContainer, "change", e => {
          const target = getEventTarget(e);
          const selectedMonth = parseInt(target.value, 10);
          self.changeMonth(selectedMonth - self.currentMonth);
          triggerEvent("onMonthChange");
        });
        buildMonthSwitch();
        monthElement = self.monthsDropdownContainer;
      }

      const yearInput = createNumberInput("cur-year", {
        tabindex: "-1"
      });
      const yearElement = yearInput.getElementsByTagName("input")[0];
      yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);

      if (self.config.minDate) {
        yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
      }

      if (self.config.maxDate) {
        yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
        yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
      }

      const currentMonth = createElement("div", "flatpickr-current-month");
      currentMonth.appendChild(monthElement);
      currentMonth.appendChild(yearInput);
      monthNavFragment.appendChild(currentMonth);
      container.appendChild(monthNavFragment);
      return {
        container,
        yearElement,
        monthElement
      };
    }

    function buildMonths() {
      clearNode(self.monthNav);
      self.monthNav.appendChild(self.prevMonthNav);

      if (self.config.showMonths) {
        self.yearElements = [];
        self.monthElements = [];
      }

      for (let m = self.config.showMonths; m--;) {
        const month = buildMonth();
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
        get: () => self.__hidePrevMonthArrow,

        set(bool) {
          if (self.__hidePrevMonthArrow !== bool) {
            toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
            self.__hidePrevMonthArrow = bool;
          }
        }

      });
      Object.defineProperty(self, "_hideNextMonthArrow", {
        get: () => self.__hideNextMonthArrow,

        set(bool) {
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
      const defaults = getDefaultHours(self.config);
      self.timeContainer = createElement("div", "flatpickr-time");
      self.timeContainer.tabIndex = -1;
      const separator = createElement("span", "flatpickr-time-separator", ":");
      const hourInput = createNumberInput("flatpickr-hour", {
        "aria-label": self.l10n.hourAriaLabel
      });
      self.hourElement = hourInput.getElementsByTagName("input")[0];
      const minuteInput = createNumberInput("flatpickr-minute", {
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
        const secondInput = createNumberInput("flatpickr-second");
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

      for (let i = self.config.showMonths; i--;) {
        const container = createElement("div", "flatpickr-weekdaycontainer");
        self.weekdayContainer.appendChild(container);
      }

      updateWeekdays();
      return self.weekdayContainer;
    }

    function updateWeekdays() {
      if (!self.weekdayContainer) {
        return;
      }

      const firstDayOfWeek = self.l10n.firstDayOfWeek;
      let weekdays = [...self.l10n.weekdays.shorthand];

      if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
        weekdays = [...weekdays.splice(firstDayOfWeek, weekdays.length), ...weekdays.splice(0, firstDayOfWeek)];
      }

      for (let i = self.config.showMonths; i--;) {
        self.weekdayContainer.children[i].innerHTML = `
      <span class='flatpickr-weekday'>
        ${weekdays.join("</span><span class='flatpickr-weekday'>")}
      </span>
      `;
      }
    }

    function buildWeeks() {
      self.calendarContainer.classList.add("hasWeeks");
      const weekWrapper = createElement("div", "flatpickr-weekwrapper");
      weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
      const weekNumbers = createElement("div", "flatpickr-weeks");
      weekWrapper.appendChild(weekNumbers);
      return {
        weekWrapper,
        weekNumbers
      };
    }

    function changeMonth(value, isOffset = true) {
      const delta = isOffset ? value : value - self.currentMonth;
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

    function clear(triggerChangeEvent = true, toInitial = true) {
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
        const {
          hours,
          minutes,
          seconds
        } = getDefaultHours(self.config);
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

      for (let i = self._handlers.length; i--;) {
        self._handlers[i].remove();
      }

      self._handlers = [];

      if (self.mobileInput) {
        if (self.mobileInput.parentNode) self.mobileInput.parentNode.removeChild(self.mobileInput);
        self.mobileInput = undefined;
      } else if (self.calendarContainer && self.calendarContainer.parentNode) {
        if (self.config.static && self.calendarContainer.parentNode) {
          const wrapper = self.calendarContainer.parentNode;
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

      ["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(k => {
        try {
          delete self[k];
        } catch (_) {}
      });
    }

    function isCalendarElem(elem) {
      if (self.config.appendTo && self.config.appendTo.contains(elem)) return true;
      return self.calendarContainer.contains(elem);
    }

    function documentClick(e) {
      if (self.isOpen && !self.config.inline) {
        const eventTarget = getEventTarget(e);
        const isCalendarElement = isCalendarElem(eventTarget);
        const isInput = eventTarget === self.input || eventTarget === self.altInput || self.element.contains(eventTarget) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
        const lostFocus = e.type === "blur" ? isInput && e.relatedTarget && !isCalendarElem(e.relatedTarget) : !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
        const isIgnored = !self.config.ignoredFocusElements.some(elem => elem.contains(eventTarget));

        if (lostFocus && isIgnored) {
          if (self.timeContainer !== undefined && self.minuteElement !== undefined && self.hourElement !== undefined && self.input.value !== "" && self.input.value !== undefined) {
            updateTime();
          }

          self.close();

          if (self.config && self.config.mode === "range" && self.selectedDates.length === 1) {
            self.clear(false);
            self.redraw();
          }
        }
      }
    }

    function changeYear(newYear) {
      if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear()) return;
      const newYearNum = newYear,
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

    function isEnabled(date, timeless = true) {
      var _a;

      const dateToCheck = self.parseDate(date, undefined, timeless);
      if (self.config.minDate && dateToCheck && compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0) return false;
      if (!self.config.enable && self.config.disable.length === 0) return true;
      if (dateToCheck === undefined) return false;
      const bool = !!self.config.enable,
            array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;

      for (let i = 0, d; i < array.length; i++) {
        d = array[i];
        if (typeof d === "function" && d(dateToCheck)) return bool;else if (d instanceof Date && dateToCheck !== undefined && d.getTime() === dateToCheck.getTime()) return bool;else if (typeof d === "string") {
          const parsed = self.parseDate(d, undefined, true);
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
      const isInput = e.target === self._input;

      if (isInput && (self.selectedDates.length > 0 || self._input.value.length > 0) && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
        self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
      }
    }

    function onKeyDown(e) {
      const eventTarget = getEventTarget(e);
      const isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
      const allowInput = self.config.allowInput;
      const allowKeydown = self.isOpen && (!allowInput || !isInput);
      const allowInlineKeydown = self.config.inline && isInput && !allowInput;

      if (e.keyCode === 13 && isInput) {
        if (allowInput) {
          self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
          return eventTarget.blur();
        } else {
          self.open();
        }
      } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
        const isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);

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

              if (self.daysContainer !== undefined && (allowInput === false || document.activeElement && isInView(document.activeElement))) {
                const delta = e.keyCode === 39 ? 1 : -1;
                if (!e.ctrlKey) focusOnDay(undefined, delta);else {
                  e.stopPropagation();
                  changeMonth(delta);
                  focusOnDay(getFirstAvailableDay(1), 0);
                }
              }
            } else if (self.hourElement) self.hourElement.focus();

            break;

          case 38:
          case 40:
            e.preventDefault();
            const delta = e.keyCode === 40 ? 1 : -1;

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
              const elems = [self.hourElement, self.minuteElement, self.secondElement, self.amPM].concat(self.pluginElements).filter(x => x);
              const i = elems.indexOf(eventTarget);

              if (i !== -1) {
                const target = elems[i + (e.shiftKey ? -1 : 1)];
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

    function onMouseOver(elem) {
      if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains("flatpickr-day") || elem.classList.contains("flatpickr-disabled"))) return;
      const hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(),
            initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(),
            rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()),
            rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
      let containsDisabled = false;
      let minRange = 0,
          maxRange = 0;

      for (let t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
        if (!isEnabled(new Date(t), true)) {
          containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
          if (t < initialDate && (!minRange || t > minRange)) minRange = t;else if (t > initialDate && (!maxRange || t < maxRange)) maxRange = t;
        }
      }

      for (let m = 0; m < self.config.showMonths; m++) {
        const month = self.daysContainer.children[m];

        for (let i = 0, l = month.children.length; i < l; i++) {
          const dayElem = month.children[i],
                date = dayElem.dateObj;
          const timestamp = date.getTime();
          const outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;

          if (outOfRange) {
            dayElem.classList.add("notAllowed");
            ["inRange", "startRange", "endRange"].forEach(c => {
              dayElem.classList.remove(c);
            });
            continue;
          } else if (containsDisabled && !outOfRange) continue;

          ["startRange", "inRange", "endRange", "notAllowed"].forEach(c => {
            dayElem.classList.remove(c);
          });

          if (elem !== undefined) {
            elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
            if (initialDate < hoverDate && timestamp === initialDate) dayElem.classList.add("startRange");else if (initialDate > hoverDate && timestamp === initialDate) dayElem.classList.add("endRange");
            if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate)) dayElem.classList.add("inRange");
          }
        }
      }
    }

    function onResize() {
      if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
    }

    function open(e, positionElement = self._positionElement) {
      if (self.isMobile === true) {
        if (e) {
          e.preventDefault();
          const eventTarget = getEventTarget(e);

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

      const wasOpen = self.isOpen;
      self.isOpen = true;

      if (!wasOpen) {
        self.calendarContainer.classList.add("open");

        self._input.classList.add("active");

        triggerEvent("onOpen");
        positionCalendar(positionElement);
      }

      if (self.config.enableTime === true && self.config.noCalendar === true) {
        if (self.config.allowInput === false && (e === undefined || !self.timeContainer.contains(e.relatedTarget))) {
          setTimeout(() => self.hourElement.select(), 50);
        }
      }
    }

    function minMaxDateSetter(type) {
      return date => {
        const dateObj = self.config[`_${type}Date`] = self.parseDate(date, self.config.dateFormat);
        const inverseDateObj = self.config[`_${type === "min" ? "max" : "min"}Date`];

        if (dateObj !== undefined) {
          self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
        }

        if (self.selectedDates) {
          self.selectedDates = self.selectedDates.filter(d => isEnabled(d));
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
      const boolOpts = ["wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"];
      const userConfig = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
      const formats = {};
      self.config.parseDate = userConfig.parseDate;
      self.config.formatDate = userConfig.formatDate;
      Object.defineProperty(self.config, "enable", {
        get: () => self.config._enable,
        set: dates => {
          self.config._enable = parseDateRules(dates);
        }
      });
      Object.defineProperty(self.config, "disable", {
        get: () => self.config._disable,
        set: dates => {
          self.config._disable = parseDateRules(dates);
        }
      });
      const timeMode = userConfig.mode === "time";

      if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
        const defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
        formats.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
      }

      if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
        const defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
        formats.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + ` h:i${userConfig.enableSeconds ? ":S" : ""} K`;
      }

      Object.defineProperty(self.config, "minDate", {
        get: () => self.config._minDate,
        set: minMaxDateSetter("min")
      });
      Object.defineProperty(self.config, "maxDate", {
        get: () => self.config._maxDate,
        set: minMaxDateSetter("max")
      });

      const minMaxTimeSetter = type => val => {
        self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
      };

      Object.defineProperty(self.config, "minTime", {
        get: () => self.config._minTime,
        set: minMaxTimeSetter("min")
      });
      Object.defineProperty(self.config, "maxTime", {
        get: () => self.config._maxTime,
        set: minMaxTimeSetter("max")
      });

      if (userConfig.mode === "time") {
        self.config.noCalendar = true;
        self.config.enableTime = true;
      }

      Object.assign(self.config, formats, userConfig);

      for (let i = 0; i < boolOpts.length; i++) self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";

      HOOKS.filter(hook => self.config[hook] !== undefined).forEach(hook => {
        self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
      });
      self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      for (let i = 0; i < self.config.plugins.length; i++) {
        const pluginConf = self.config.plugins[i](self) || {};

        for (const key in pluginConf) {
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
      if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined") self.config.errorHandler(new Error(`flatpickr: invalid locale ${self.config.locale}`));
      self.l10n = Object.assign(Object.assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : undefined);
      tokenRegex.K = `(${self.l10n.amPM[0]}|${self.l10n.amPM[1]}|${self.l10n.amPM[0].toLowerCase()}|${self.l10n.amPM[1].toLowerCase()})`;
      const userConfig = Object.assign(Object.assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));

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
      const positionElement = customPositionElement || self._positionElement;
      const calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (acc, child) => acc + child.offsetHeight, 0),
            calendarWidth = self.calendarContainer.offsetWidth,
            configPos = self.config.position.split(" "),
            configPosVertical = configPos[0],
            configPosHorizontal = configPos.length > 1 ? configPos[1] : null,
            inputBounds = positionElement.getBoundingClientRect(),
            distanceFromBottom = window.innerHeight - inputBounds.bottom,
            showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
      const top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
      toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
      toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
      if (self.config.inline) return;
      let left = window.pageXOffset + inputBounds.left;
      let isCenter = false;
      let isRight = false;

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
      const right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
      const rightMost = left + calendarWidth > window.document.body.offsetWidth;
      const centerMost = right + calendarWidth > window.document.body.offsetWidth;
      toggleClass(self.calendarContainer, "rightMost", rightMost);
      if (self.config.static) return;
      self.calendarContainer.style.top = `${top}px`;

      if (!rightMost) {
        self.calendarContainer.style.left = `${left}px`;
        self.calendarContainer.style.right = "auto";
      } else if (!centerMost) {
        self.calendarContainer.style.left = "auto";
        self.calendarContainer.style.right = `${right}px`;
      } else {
        const doc = getDocumentStyleSheet();
        if (doc === undefined) return;
        const bodyWidth = window.document.body.offsetWidth;
        const centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
        const centerBefore = ".flatpickr-calendar.centerMost:before";
        const centerAfter = ".flatpickr-calendar.centerMost:after";
        const centerIndex = doc.cssRules.length;
        const centerStyle = `{left:${inputBounds.left}px;right:auto;}`;
        toggleClass(self.calendarContainer, "rightMost", false);
        toggleClass(self.calendarContainer, "centerMost", true);
        doc.insertRule(`${centerBefore},${centerAfter}${centerStyle}`, centerIndex);
        self.calendarContainer.style.left = `${centerLeft}px`;
        self.calendarContainer.style.right = "auto";
      }
    }

    function getDocumentStyleSheet() {
      let editableSheet = null;

      for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i];

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
      const style = document.createElement("style");
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

      const isSelectable = day => day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");

      const t = findParent(getEventTarget(e), isSelectable);
      if (t === undefined) return;
      const target = t;
      const selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
      const shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
      self.selectedDateElem = target;
      if (self.config.mode === "single") self.selectedDates = [selectedDate];else if (self.config.mode === "multiple") {
        const selectedIndex = isDateSelected(selectedDate);
        if (selectedIndex) self.selectedDates.splice(parseInt(selectedIndex), 1);else self.selectedDates.push(selectedDate);
      } else if (self.config.mode === "range") {
        if (self.selectedDates.length === 2) {
          self.clear(false, false);
        }

        self.latestSelectedDateObj = selectedDate;
        self.selectedDates.push(selectedDate);
        if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort((a, b) => a.getTime() - b.getTime());
      }
      setHoursFromInputs();

      if (shouldChangeMonth) {
        const isNewYear = self.currentYear !== selectedDate.getFullYear();
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
        const single = self.config.mode === "single" && !self.config.enableTime;
        const range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;

        if (single || range) {
          focusAndClose();
        }
      }

      triggerChange();
    }

    const CALLBACKS = {
      locale: [setupLocale, updateWeekdays],
      showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
      minDate: [jumpToDate],
      maxDate: [jumpToDate],
      clickOpens: [() => {
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

        for (const key in option) {
          if (CALLBACKS[key] !== undefined) CALLBACKS[key].forEach(x => x());
        }
      } else {
        self.config[option] = value;
        if (CALLBACKS[option] !== undefined) CALLBACKS[option].forEach(x => x());else if (HOOKS.indexOf(option) > -1) self.config[option] = arrayify(value);
      }

      self.redraw();
      updateValue(true);
    }

    function setSelectedDate(inputDate, format) {
      let dates = [];
      if (inputDate instanceof Array) dates = inputDate.map(d => self.parseDate(d, format));else if (inputDate instanceof Date || typeof inputDate === "number") dates = [self.parseDate(inputDate, format)];else if (typeof inputDate === "string") {
        switch (self.config.mode) {
          case "single":
          case "time":
            dates = [self.parseDate(inputDate, format)];
            break;

          case "multiple":
            dates = inputDate.split(self.config.conjunction).map(date => self.parseDate(date, format));
            break;

          case "range":
            dates = inputDate.split(self.l10n.rangeSeparator).map(date => self.parseDate(date, format));
            break;
        }
      } else self.config.errorHandler(new Error(`Invalid date supplied: ${JSON.stringify(inputDate)}`));
      self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter(d => d instanceof Date && isEnabled(d, false));
      if (self.config.mode === "range") self.selectedDates.sort((a, b) => a.getTime() - b.getTime());
    }

    function setDate(date, triggerChange = false, format = self.config.dateFormat) {
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
      return arr.slice().map(rule => {
        if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
          return self.parseDate(rule, undefined, true);
        } else if (rule && typeof rule === "object" && rule.from && rule.to) return {
          from: self.parseDate(rule.from, undefined),
          to: self.parseDate(rule.to, undefined)
        };

        return rule;
      }).filter(x => x);
    }

    function setupDates() {
      self.selectedDates = [];
      self.now = self.parseDate(self.config.now) || new Date();
      const preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
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
      self._positionElement = self.config.positionElement || self._input;
    }

    function setupMobile() {
      const inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
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

      bind(self.mobileInput, "change", e => {
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
      const hooks = self.config[event];

      if (hooks !== undefined && hooks.length > 0) {
        for (let i = 0; hooks[i] && i < hooks.length; i++) hooks[i](self.selectedDates, self.input.value, self, data);
      }

      if (event === "onChange") {
        self.input.dispatchEvent(createEvent("change"));
        self.input.dispatchEvent(createEvent("input"));
      }
    }

    function createEvent(name) {
      const e = document.createEvent("Event");
      e.initEvent(name, true, true);
      return e;
    }

    function isDateSelected(date) {
      for (let i = 0; i < self.selectedDates.length; i++) {
        if (compareDates(self.selectedDates[i], date) === 0) return "" + i;
      }

      return false;
    }

    function isDateInRange(date) {
      if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
      return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
    }

    function updateNavigationCurrentMonth() {
      if (self.config.noCalendar || self.isMobile || !self.monthNav) return;
      self.yearElements.forEach((yearElement, i) => {
        const d = new Date(self.currentYear, self.currentMonth, 1);
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

    function getDateStr(format) {
      return self.selectedDates.map(dObj => self.formatDate(dObj, format)).filter((d, i, arr) => self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
    }

    function updateValue(triggerChange = true) {
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
      const eventTarget = getEventTarget(e);
      const isPrevMonth = self.prevMonthNav.contains(eventTarget);
      const isNextMonth = self.nextMonthNav.contains(eventTarget);

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
      const isKeyDown = e.type === "keydown",
            eventTarget = getEventTarget(e),
            input = eventTarget;

      if (self.amPM !== undefined && eventTarget === self.amPM) {
        self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
      }

      const min = parseFloat(input.getAttribute("min")),
            max = parseFloat(input.getAttribute("max")),
            step = parseFloat(input.getAttribute("step")),
            curValue = parseInt(input.value, 10),
            delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
      let newValue = curValue + step * delta;

      if (typeof input.value !== "undefined" && input.value.length === 2) {
        const isHourElem = input === self.hourElement,
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
    const nodes = Array.prototype.slice.call(nodeList).filter(x => x instanceof HTMLElement);
    const instances = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

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
    en: Object.assign({}, english),
    default: Object.assign({}, english)
  };

  flatpickr.localize = l10n => {
    flatpickr.l10ns.default = Object.assign(Object.assign({}, flatpickr.l10ns.default), l10n);
  };

  flatpickr.setDefaults = config => {
    flatpickr.defaultConfig = Object.assign(Object.assign({}, flatpickr.defaultConfig), config);
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

  var _default$3 = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "connect",
      value: function connect() {
        this.flatpickrInstance = flatpickr(this.element, this.optionsValue);
      }
    }], [{
      key: "values",
      get: function get() {
        return {
          options: Object
        };
      }
    }]);

    return _default;
  }(Controller);

  var _default$2 = /*#__PURE__*/function (_Controller) {
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

  var _default = /*#__PURE__*/function (_Controller) {
    _inherits(_default, _Controller);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.apply(this, arguments);
    }

    _createClass(_default, [{
      key: "call",
      value: function call(event) {
        var target = event.target;

        if (target) {
          if (target.checked) {
            this.element.classList.add("opacity-75", "bg-gray-100");
          } else {
            this.element.classList.remove("opacity-75", "bg-gray-100");
          }
        }
      }
    }]);

    return _default;
  }(Controller);

  var StimulusApplication = Application.start();
  StimulusApplication.register("apply-template", _default$9);
  StimulusApplication.register("batch", _default$8);
  StimulusApplication.register("clean-filter-param", _default$7);
  StimulusApplication.register("clean-filter-params", _default$6);
  StimulusApplication.register("click-outside-to-close", _default$5);
  StimulusApplication.register("delete", _default$4);
  StimulusApplication.register("flatpickr", _default$3);
  StimulusApplication.register("tab-container", _default$2);
  StimulusApplication.register("tab", _default$1);
  StimulusApplication.register("toggle-pending-destruction", _default);

  exports.StimulusApplication = StimulusApplication;
  exports.StimulusController = Controller;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
