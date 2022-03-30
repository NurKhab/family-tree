"use strict";

//! Кнопка "наверх"
$(function () {
    $('#scroll-top').hide(); //* Изначально стрелка спрятана
	$(window).scroll(function(){ //* Если экран проматывается, то:
		if($(window).scrollTop() > 100) { //* Если скролл произошёл больше, чем на 100 пикселей, то:
			$('#scroll-top').show(); //* Стрелка появляется
		} else {
			$('#scroll-top').hide(); //* Иначе - исчезает
		}
	});
 
	$('#scroll-top').click(function(){ //* Если происходит нажатие на стрелку, то:
		$('html, body').animate({scrollTop: 0}, 600); //* Происходит скролл
		return false; //* Вовзращается false, т.е. функция запускается заново
	});
});

//! Перейти по ссылке

const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); 
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);	
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.menu').offsetHeight;

			if (burgerMenu.classList.contains('active')) {
				document.body.classList.remove('lock');
				burgerMenu.classList.remove('active');
				menuBody.classList.remove('active');
			} 

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//! Модальные окна

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

const timeout = 500;

let unlock = true;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        }); 
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

const langArr = {
    "doctitle" : {
        "ru" : "Моя родословная",
        "tat" : "Минем шәҗәрәм",
    },
    "scrollbutton" : {
        "ru": "<i class='fas fa-arrow-circle-up' title='Наверх'></i>",
        "tat": "<i class='fas fa-arrow-circle-up' title='Югарыга'></i>",
    },
    "maintitle" : {
        "ru": "Моя родословная",
        "tat": "Минем шәҗәрәм",
    },
    "aboutlink" : {
        "ru": "О родословной",
        "tat": "Шәҗәрә турында",
    },
    "treelink" : {
        "ru": "Древо",
        "tat": "Агач",
    },
};

//! Переключатель языка
const select = document.querySelector('select'); //* Поиск переключателя в коде и определение её в переменную
const langs = ['ru', 'tat']; //* Создание массива языков

select.addEventListener('change', changeURLLanguage); //* Присваивается класс change для последующего изменения языка и url

function changeURLLanguage() { //* Изменение url 
	let lang = select.value; //* Текущий язык сайта становится таким же, что и выбранный язык кнопки
	location.href = window.location.pathname + '#'+lang; //* Происходит добавление в url сайта #+язык (#ru, #tat, #en)
	location.reload(); //* Происходит перезагрузка сайта
}

function changeLanguage() { //* Изменение языка
	let hash = window.location.hash; //* Создание переменной, содержащую #+язык (#ru, #tat, #en)
	hash = hash.substr(1); //* Удаление # из переменной
	if (!langs.includes(hash)) { //* Если данный язык не содержится в массиве языков
		location.href = window.location.pathname + '#ru'; //* Язык сайта становится русским (по умолчанию)
		location.reload(); //* Перезагрузка страницы
	}
	select.value = hash; //* Значение выбранного
	document.querySelector('title').innerHTML = langArr['doctitle'][hash]; //* Меняется язык заголовка сайта

	for (let key in langArr) { //* Начало "пробега" по массиву с переводом элементов
        let elem = document.querySelector('.lng-' + key); //* Создание переменной и присваивание ей класса ".lng-(название для элемента перевода)"
        if (elem) { //* Если элемент с таким классом существует, то:
            elem.innerHTML = langArr[key][hash]; //* Элемент меняет свой язык
        }
    }
}
changeLanguage(); //* Фукнция запускается