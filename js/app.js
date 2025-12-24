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
 * Объединенный скрипт для обеих страниц (index.html и password.html)
 */

/**
 * Определяем на какой странице мы находимся
 */
function getCurrentPage() {
  var path = window.location.pathname;
  if (
    path.includes('password.html') ||
    document.getElementById('passwordForm')
  ) {
    return 'password';
  }
  return 'email'; // index.html или другая страница с формой email
}

/**
 * Проверка пароля на разрешенные символы
 */
function isValidPassword(password) {
  // Разрешаем: английские буквы (a-z, A-Z), цифры (0-9),
  // и специальные символы: !@#$%^&*()_+-=[]{}|;:'",.<>?/`~
  var validPasswordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~]+$/;
  return validPasswordRegex.test(password);
}

/**
 * Инициализация функции маски для поля телефона (только для страницы email)
 */
function initPhoneMask() {
  // Проверяем, что мы на странице email
  if (getCurrentPage() !== 'email') return;
  var phoneInput = document.getElementById('phoneEmail');
  var inputLabel = document.getElementById('inputLabel');
  var inputHint = document.getElementById('inputHint');
  if (!phoneInput) return;
  var maskOptions = {
    mask: [
      {
        mask: '+7 (000) 000-00-00',
        startsWith: '+7',
        country: 'Russia',
      },
      {
        mask: '+7 (000) 000-00-00',
        startsWith: '7',
        country: 'Russia',
      },
      {
        mask: '0 (000) 000-00-00',
        startsWith: '8',
        country: 'Russia',
      },
      {
        mask: '+7 (000) 000-00-00',
        startsWith: '',
        country: 'unknown',
      },
    ],
    dispatch: function dispatch(appended, dynamicMasked) {
      var number = (dynamicMasked.value + appended).replace(/\D/g, '');
      return dynamicMasked.compiledMasks.find(function(m) {
        return number.indexOf(m.startsWith) === 0;
      });
    },
  };
  var mask = null;

  // Обработчик фокуса - состояние 2 (при нажатии на поле)
  phoneInput.addEventListener('focus', function() {
    if (inputLabel) inputLabel.classList.add('focused');
    if (inputHint) inputHint.classList.add('visible');
    var value = this.value.replace(/\D/g, '');
    if (
      (value.startsWith('7') ||
        value.startsWith('8') ||
        this.value.startsWith('+7')) &&
      !mask
    ) {
      mask = IMask(phoneInput, maskOptions);
    }
  });

  // Обработчик потери фокуса
  phoneInput.addEventListener('blur', function() {
    if (inputLabel) inputLabel.classList.remove('focused');

    // Показываем подсказку только если есть текст - состояние 3
    if (inputHint) {
      if (this.value.trim()) {
        inputHint.classList.add('visible');
      } else {
        inputHint.classList.remove('visible');
      }
    }
    if (mask) {
      var maskValue = mask.unmaskedValue;
      var startWith = 10;
      if (maskValue.charAt(0) === '8') {
        startWith = 11;
      }
      if (maskValue.length < startWith) {
        mask.value = '';
      }
    }
  });

  // Обработчик ввода
  phoneInput.addEventListener('input', function() {
    var value = this.value.replace(/\D/g, '');

    // Показываем подсказку при вводе - состояние 3
    if (value && inputHint && !inputHint.classList.contains('visible')) {
      inputHint.classList.add('visible');
    }

    // Применяем маску для телефона
    if (
      (value.startsWith('7') ||
        value.startsWith('8') ||
        this.value.startsWith('+7')) &&
      !mask
    ) {
      mask = IMask(phoneInput, maskOptions);
    } else if (value.length === 0 && mask) {
      mask.destroy();
      mask = null;
    }

    // Скрываем ошибки при вводе
    var errorElement = document.getElementById('errorMessage');
    if (errorElement && errorElement.classList.contains('visible')) {
      errorElement.classList.remove('visible');
      phoneInput.classList.remove('error');
    }
  });
}

/**
 * Инициализация поля пароля (только для страницы password)
 */
function initPasswordField() {
  // Проверяем, что мы на странице пароля
  if (getCurrentPage() !== 'password') return;
  var passwordInput = document.getElementById('password');
  var passwordToggle = document.getElementById('passwordToggle');
  var passwordLabel = document.getElementById('passwordLabel');
  var passwordHint = document.getElementById('passwordHint');
  var userEmailDisplay = document.getElementById('userEmailDisplay');
  console.log('initPasswordField вызван');
  console.log('passwordInput:', passwordInput);
  console.log('passwordToggle:', passwordToggle);

  /* ---------- показываем e-mail ---------- */
  var userEmail = localStorage.getItem('userEmail');
  if (userEmail && userEmailDisplay) {
    userEmailDisplay.textContent = userEmail;
  }

  /* ---------- переключение видимости пароля ---------- */
  if (passwordToggle && passwordInput) {
    console.log('Добавляем обработчик клика на passwordToggle');
    passwordToggle.addEventListener('change', function(e) {
      console.log('Чекбокс изменен!');
      var newType = this.checked ? 'text' : 'password';
      console.log('Меняем тип на', newType);

      // Сохраняем текущее значение и позицию курсора
      var currentValue = passwordInput.value;
      var cursorPosition = passwordInput.selectionStart;

      // Меняем тип
      passwordInput.setAttribute('type', newType);

      // Восстанавливаем значение и позицию курсора
      passwordInput.value = currentValue;
      if (cursorPosition !== null) {
        passwordInput.setSelectionRange(cursorPosition, cursorPosition);
      }

      // Принудительно убираем маскировку для type="text"
      if (newType === 'text') {
        passwordInput.style.webkitTextSecurity = 'none';
        passwordInput.style.textSecurity = 'none';
        passwordInput.style.fontFamily = "'Roboto', sans-serif";
      } else {
        passwordInput.style.webkitTextSecurity = '';
        passwordInput.style.textSecurity = '';
        passwordInput.style.fontFamily = '';
      }
    });
  } else {
    console.error('passwordToggle или passwordInput не найдены!');
  }

  /* ---------- фокус / блюр ---------- */
  if (passwordInput) {
    passwordInput.addEventListener('focus', function() {
      if (passwordLabel) passwordLabel.classList.add('focused');
      if (passwordHint) passwordHint.classList.add('visible');
    });
    passwordInput.addEventListener('blur', function() {
      if (passwordLabel) passwordLabel.classList.remove('focused');
      if (passwordHint && !passwordInput.value.trim()) {
        passwordHint.classList.remove('visible');
      }

      // Проверка на недопустимые символы при потере фокуса
      if (passwordInput.value && !isValidPassword(passwordInput.value)) {
        passwordInput.classList.add('error');
      }
    });
    if (passwordInput.value.trim() && passwordHint) {
      passwordHint.classList.add('visible');
    }
    passwordInput.addEventListener('input', function() {
      var err = document.getElementById('errorMessage');
      if (err && err.classList.contains('visible')) {
        err.classList.remove('visible');
        passwordInput.classList.remove('error');
      }

      // Проверка на недопустимые символы при вводе
      if (passwordInput.value && !isValidPassword(passwordInput.value)) {
        passwordInput.classList.add('error');
      } else {
        passwordInput.classList.remove('error');
      }
    });
  }
}

/**
 * Показ сообщения об ошибке
 */
function showError(message) {
  var isPasswordError =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (getCurrentPage() === 'password' && isPasswordError) {
    // Ошибка на странице пароля
    var errorElement = document.getElementById('errorMessage');
    var passwordInput = document.getElementById('password');
    if (errorElement && passwordInput) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
      passwordInput.classList.add('error', 'shaking');
      setTimeout(function() {
        passwordInput.classList.remove('shaking');
      }, 500);
    }
  } else {
    // Ошибка на странице email
    var _errorElement = document.getElementById('errorMessage');
    var phoneInput = document.getElementById('phoneEmail');
    if (_errorElement && phoneInput) {
      _errorElement.textContent = message;
      _errorElement.classList.add('visible');
      phoneInput.classList.add('error', 'shaking');
      setTimeout(function() {
        phoneInput.classList.remove('shaking');
      }, 500);
    }
  }
}

/**
 * Показ успешного сообщения
 */
function showSuccess(message) {
  var successElement = document.querySelector('.success-message');
  if (!successElement) {
    successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.style.cssText =
      '\n      position: fixed;\n      bottom: 20px;\n      right: 20px;\n      background: #81c995;\n      color: #202124;\n      padding: 12px 20px;\n      border-radius: 4px;\n      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n      z-index: 1001;\n      font-size: 14px;\n      animation: slideUp 0.3s ease-out;\n    ';
    document.body.appendChild(successElement);
  }
  successElement.textContent = message;
  setTimeout(function() {
    successElement.remove();
  }, 3000);
}

/**
 * Переход на страницу ввода пароля
 */
function goToPasswordPage(email) {
  localStorage.setItem('userEmail', email);
  document.body.classList.add('page-transition');
  setTimeout(function() {
    window.location.href = 'password.html';
  }, 300);
}

/**
 * Возврат на страницу ввода email
 */
function goBackToEmailPage() {
  localStorage.removeItem('userEmail');
  document.body.classList.add('page-transition');
  setTimeout(function() {
    window.location.href = 'index.html';
  }, 300);
}

/**
 * Редирект на другой сайт после успешного входа
 */
function redirectToOtherSite() {
  // ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА СВОЙ САЙТ
  var otherSiteUrl = 'https://google.com';
  document.body.style.opacity = '0.8';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(function() {
    window.location.href = otherSiteUrl;
  }, 1000);
}

/**
 * Инициализация обработчиков событий (для обеих страниц)
 */
function initEventHandlers() {
  var currentPage = getCurrentPage();
  if (currentPage === 'email') {
    // Обработчики для страницы email
    var loginForm = document.getElementById('loginForm');
    var submitBtn = document.getElementById('submitBtn');
    var createAccount = document.getElementById('createAccount');
    var forgotEmail = document.getElementById('forgotEmail');
    var privacyPolicy = document.getElementById('privacyPolicy');
    var termsOfUse = document.getElementById('termsOfUse');
    var helpLink = document.getElementById('helpLink');
    var privacyLink = document.getElementById('privacyLink');
    var termsLink = document.getElementById('termsLink');
    var languageSelector = document.querySelector('.language-selector');

    // Обработка отправки формы входа
    if (loginForm) {
      loginForm.addEventListener(
        'submit',
        /*#__PURE__*/ (function() {
          var _ref = _asyncToGenerator(
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(e) {
              var phoneEmailValue, emailRegex, phoneRegex;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1)
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      e.preventDefault();
                      phoneEmailValue = document
                        .getElementById('phoneEmail')
                        .value.trim();
                      if (phoneEmailValue) {
                        _context.next = 5;
                        break;
                      }
                      showError(
                        'Пожалуйста, введите телефон или адрес электронной почты',
                      );
                      return _context.abrupt('return');
                    case 5:
                      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
                      if (
                        !(
                          !emailRegex.test(phoneEmailValue) &&
                          !phoneRegex.test(phoneEmailValue.replace(/\D/g, ''))
                        )
                      ) {
                        _context.next = 10;
                        break;
                      }
                      showError(
                        'Пожалуйста, введите корректный телефон или адрес электронной почты',
                      );
                      return _context.abrupt('return');
                    case 10:
                      submitBtn.classList.add('loading');
                      submitBtn.disabled = true;
                      _context.next = 14;
                      return new Promise(function(resolve) {
                        return setTimeout(resolve, 1500);
                      });
                    case 14:
                      submitBtn.classList.remove('loading');
                      submitBtn.disabled = false;
                      goToPasswordPage(phoneEmailValue);
                    case 17:
                    case 'end':
                      return _context.stop();
                  }
              }, _callee);
            }),
          );
          return function(_x) {
            return _ref.apply(this, arguments);
          };
        })(),
      );
    }

    // Обработчики для ссылок
    var setupLinkHandler = function setupLinkHandler(element, message) {
      if (element) {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          alert(message);
        });
      }
    };
    if (forgotEmail) {
      forgotEmail.addEventListener('click', function(e) {
        e.preventDefault();
        var phoneEmailInput = document.getElementById('phoneEmail');
        phoneEmailInput.value = '';
        phoneEmailInput.focus();
        showError('Введите ваш email для восстановления доступа');
      });
    }
    setupLinkHandler(createAccount, 'Переход на страницу создания аккаунта.');
    setupLinkHandler(privacyPolicy, 'Открытие политики конфиденциальности.');
    setupLinkHandler(termsOfUse, 'Открытие условий использования.');
    setupLinkHandler(helpLink, 'Открытие справки.');
    setupLinkHandler(privacyLink, 'Открытие политики конфиденциальности.');
    setupLinkHandler(termsLink, 'Открытие условий использования.');
    if (languageSelector) {
      languageSelector.addEventListener('click', function() {
        alert('Выбор языка (в разработке)');
      });
    }
  } else if (currentPage === 'password') {
    // Обработчики для страницы пароля
    var passwordForm = document.getElementById('passwordForm');
    var _submitBtn = document.getElementById('submitBtn');
    var forgotPassword = document.getElementById('forgotPassword');
    var useAnotherAccount = document.getElementById('useAnotherAccount');
    var _privacyPolicy = document.getElementById('privacyPolicy');
    var _termsOfUse = document.getElementById('termsOfUse');
    var _helpLink = document.getElementById('helpLink');
    var _privacyLink = document.getElementById('privacyLink');
    var _termsLink = document.getElementById('termsLink');
    var _languageSelector = document.querySelector('.language-selector');

    // Обработка отправки формы пароля
    if (passwordForm) {
      passwordForm.addEventListener(
        'submit',
        /*#__PURE__*/ (function() {
          var _ref2 = _asyncToGenerator(
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(e) {
              var passwordValue;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1)
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      e.preventDefault();
                      passwordValue = document.getElementById('password').value;
                      if (passwordValue) {
                        _context2.next = 5;
                        break;
                      }
                      showError('Пожалуйста, введите пароль', true);
                      return _context2.abrupt('return');
                    case 5:
                      if (!(passwordValue.length < 6)) {
                        _context2.next = 8;
                        break;
                      }
                      showError(
                        'Пароль должен содержать не менее 6 символов',
                        true,
                      );
                      return _context2.abrupt('return');
                    case 8:
                      if (isValidPassword(passwordValue)) {
                        _context2.next = 11;
                        break;
                      }
                      showError(
                        'Пароль может содержать только английские буквы, цифры и специальные символы',
                        true,
                      );
                      return _context2.abrupt('return');
                    case 11:
                      _submitBtn.classList.add('loading');
                      _submitBtn.disabled = true;
                      _context2.next = 15;
                      return new Promise(function(resolve) {
                        return setTimeout(resolve, 1500);
                      });
                    case 15:
                      _submitBtn.classList.remove('loading');
                      _submitBtn.disabled = false;
                      showSuccess('Вход выполнен успешно! Перенаправляем...');
                      redirectToOtherSite();
                    case 19:
                    case 'end':
                      return _context2.stop();
                  }
              }, _callee2);
            }),
          );
          return function(_x2) {
            return _ref2.apply(this, arguments);
          };
        })(),
      );
    }

    // Обработчики для ссылок
    var _setupLinkHandler = function _setupLinkHandler(element, message) {
      var action =
        arguments.length > 2 && arguments[2] !== undefined
          ? arguments[2]
          : null;
      if (element) {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          if (action) {
            action();
          } else {
            alert(message);
          }
        });
      }
    };
    if (forgotPassword) {
      forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        showError('Функция восстановления пароля временно недоступна', true);
      });
    }
    if (useAnotherAccount) {
      useAnotherAccount.addEventListener('click', function(e) {
        e.preventDefault();
        goBackToEmailPage();
      });
    }
    _setupLinkHandler(_privacyPolicy, 'Открытие политики конфиденциальности.');
    _setupLinkHandler(_termsOfUse, 'Открытие условий использования.');
    _setupLinkHandler(_helpLink, 'Открытие справки.');
    _setupLinkHandler(_privacyLink, 'Открытие политики конфиденциальности.');
    _setupLinkHandler(_termsLink, 'Открытие условий использования.');
    if (_languageSelector) {
      _languageSelector.addEventListener('click', function() {
        alert('Выбор языка (в разработке)');
      });
    }
  }
}

/**
 * Инициализация анимаций и общего функционала
 */
function initCommon() {
  // Анимация появления элементов с задержкой
  var animatedElements = document.querySelectorAll(
    '.auth-left h1, .user-email, .auth-left p, .auth-right, .policy, .auth-footer',
  );
  animatedElements.forEach(function(el, index) {
    el.style.animationDelay = ''.concat(0.1 * (index + 1), 's');
  });

  // Добавляем CSS для анимации shake если её нет
  if (!document.querySelector('#shake-animation')) {
    var style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent =
      '\n      @keyframes shake {\n        0%, 100% { transform: translateX(0); }\n        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }\n        20%, 40%, 60%, 80% { transform: translateX(5px); }\n      }\n      @keyframes slideUp {\n        from { opacity: 0; transform: translateY(10px); }\n        to { opacity: 1; transform: translateY(0); }\n      }\n    ';
    document.head.appendChild(style);
  }
}

/**
 * Инициализация при загрузке DOM
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded сработал');

  // Инициализируем общие функции
  initCommon();

  // Инициализируем функционал в зависимости от страницы
  var currentPage = getCurrentPage();
  console.log('Текущая страница:', currentPage);
  if (currentPage === 'email') {
    initPhoneMask();
  } else if (currentPage === 'password') {
    initPasswordField();
  }

  // Инициализируем обработчики событий
  initEventHandlers();
});

/**
 * Для совместимости с jQuery
 */
if (typeof $ !== 'undefined') {
  $(function() {
    console.log('jQuery ready сработал');

    // Инициализируем функционал в зависимости от страницы
    var currentPage = getCurrentPage();
    if (currentPage === 'email') {
      initPhoneMask();
    } else if (currentPage === 'password') {
      initPasswordField();
    }
    initEventHandlers();
    initCommon();
  });
}
