var link = document.querySelector(".login-list"); // 1. Находит кнопку(ссылку) открытия модального окна.

var popup = document.querySelector(".modal-login"); // 3. Находит модальное окно.
var close = popup.querySelector(".modal-close"); // 6. Находит кнопку закрытия модалки.

var form = popup.querySelector("form"); // 10. Находит форму.
var login = popup.querySelector("[name=login]"); // 8. Находит поле ввода логина.
var password = popup.querySelector("[name=password]"); // 12. Находит поле пароля.


/* 15. Отлавливает ситуацию, при которой localStorage отключен или не поддерживается. */
var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) { // 2. Отлавливает событие клика по кнопке.
  evt.preventDefault(); // 4. Отменяет действие по умолчанию, т.е. переход по ссылке.
  popup.classList.add("modal-show"); // 5. Добавляет модалке класс с display:block при клике на ссылку.

  if (storage) { // 16. Записывает логин в поле ввода при открытии модалки, если значение существует,
    login.value = storage;
    password.focus(); // и смещает фокус на поле ввода пороля.
  } else {
    login.focus();
  }

  login.focus(); // 9. Устанавливает фокус при открытии формы на поле ввода логина.
});

close.addEventListener("click", function (evt) { // 7. Добавляет обработчик клика по кнопке закрытия,
  evt.preventDefault();                         // отменяет стандартное действие,
  popup.classList.remove("modal-show");         // удаляет класс, возвращая display: none.
  popup.classList.remove("modal-error");        // 19. Удаляет класс ошибки при закрытии формы.
});

form.addEventListener("submit", function (evt) { // 11. Отлавливает событие отправки формы.
  if (!login.value || !password.value) { // 13. Отменяет отправку форму если одно из полей незаполнено.
    evt.preventDefault();
    popup.classList.remove("modal-error"); // 20. Добавляет хак, чтобы анимация ошибки срабатывала несколько раз.
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error"); // 18. Добавляет форме класс ошибки если форма не валидна.
  } else {
    if (isStorageSupport) { // 14. Записывает логин в локальное хранилище при заполненной форме.
      localStorage.setItem("login", login.value);
    }
  }
});

window.addEventListener("keydown", function (evt) { // 17. Отлавливает нажатие клавиши esc, 
  if (evt.keyCode === 27) {
    evt.preventDefault(); // отменяет действие по умолчанию(выход из полноэкранного режима),
    if (popup.classList.contains("modal-show")) { // если модалка открыта, закрывает ее.
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});