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

//! Меню-бургер

const burgerMenu = document.querySelector('.menu__burger'); //* Поиск кнопки меню в коде и определение его в переменную
const menuBody = document.querySelector('.menu__body'); //* Поиск меню в коде и определение его в переменную
if (burgerMenu) { //* Если кнопка обнаружена, то
	burgerMenu.addEventListener("click", function (e) { //* При клике ана кнопку происходит следующие действия
		document.body.classList.toggle('lock'); //* Блокируется возможность взаимодействовать с основной страницей
		burgerMenu.classList.toggle('active'); //* Активируется и меняется кнопка меню-бургера
		menuBody.classList.toggle('active'); //* Открывается меню
	});
}
    
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
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

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
    "whatislink" : {
        "ru": "Что это?",
        "tat": "Нәрсә ул?",
    },
    "forwhatlink" : {
        "ru": "Сакральность древа",
        "tat": "Шәҗәрә әһәмияте",
    },
    "treelink" : {
        "ru": "Древо",
        "tat": "Шәҗәрә",
    },
    "whatistitle" : {
        "ru": "<i class='fa-solid fa-circle-question'></i> Что такое родословная?",
        "tat": "<i class='fa-solid fa-circle-question'></i> Нәрсә ул шәҗәрә?",
    },
    "forwhattitle" : {
        "ru": "<i class='fa-solid fa-circle-question'></i> Зачем нужна родословная?",
        "tat": "<i class='fa-solid fa-circle-exclamation'></i> Шәҗәрә эшләүнең максаты",
    },
    "treetitle" : {
        "ru": "<i class='fa-solid fa-tree'></i> Генеалогическое древо",
        "tat": "<i class='fa-solid fa-tree'></i> Шәҗәрә",
    },
    "whatistext" : {
        "ru": "&#10148;&nbsp;&nbsp;&nbsp;<strong>Родословная</strong> - это перечень поколений одного рода, устанавливающий происхождение и степень родства.<br>&#10148;&nbsp;&nbsp;&nbsp;Но это лишь общепринятое определение данного слова. В жизни человека значение генеалогии гораздо выше, ведь родословное древо позволяет нам почувствовать себя частью потока сменяющих друг друга поколений. Поэтому можно сказать, что родословная - это «семейная память», в которую входят описание рода и фрагменты истории этноса и страны.",
        "tat": "&#10148;&nbsp;&nbsp;&nbsp;<strong>Шәҗәрә ул</strong> - буыннар чылбыры, нәсел тамырлары, туганлык җепләре. <strong>Шәҗәрә ул</strong> – нәсел хәтере. <br>&#10148;&nbsp;&nbsp;&nbsp;Кешегә нәсел көче,ерак бабалары рухы  тормыш дәвамында тәэсир итә килә. Юкка гына һәр кеше җиде буыны өчен җаваплы, димәгәннәр борынгылар. Нәсел хәтеренә милләт хәтере тоташа.",
    },
    "forwhattext" : {
        "ru": "&#10148;&nbsp;&nbsp;&nbsp;Сегодня изучение происхождения своей фамилии и рода стало особенно популярным. Можно составить список причин, по которой люди интересуются своей родословной: <ul><li>узнать происхождение фамилии и историю семьи</li><li>узнать информацию о своих предках</li><li>узнать о дальних родственниках</li><li>доказать факт родства с кем-либо</li><li>узнать возможную предрасположенность к болезни</li><li><i>и так далее.</i></li></ul>",
        "tat": "&#10148;&nbsp;&nbsp;&nbsp;Нәсел тарихыңны белү ул ни өчен гаять әһәмиятле: <ul><li>каныңа сеңгән яшәү кануннарын барлау өчен;</li><li>туганлык җепләрен торгызыр, ныгытыр өчен;</li><li>тормыш-яшәештәге урыныңны тояр өчен;</li><li>килер буыннар алдында җаваплылык тояр өчен.</li><i>һәм башкалар</i></li></ul>",
    },
    "readmore" : {
        "ru": "Читать",
        "tat": "Укырга"
    },
    "family-tree-title-1" : {
        "ru": "Древо Хабибуллиных",
        "tat": "Хәбибуллиннар шәҗәрәсе"
    },
    "family-tree-title-2" : {
        "ru": "Древо Закировых",
        "tat": "Закировлар шәҗәрәсе"
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

//! Открытие и скрытие контента

function readMore() {
    const more = document.getElementById("more");
    const moreBtn = document.getElementById("more-button");

    if (more.style.display === "inline") {
        moreBtn.innerHTML = "Читать";
        more.style.display = "none";
    } else {
        moreBtn.innerHTML = "Скрыть";
        more.style.display = "inline";
    }
}
function readMoreDouble() {
    const more = document.getElementById("more-1");
    const moreBtn = document.getElementById("more-button-1");

    if (more.style.display === "inline") {
        moreBtn.innerHTML = "Читать";
        more.style.display = "none";
    } else {
        moreBtn.innerHTML = "Скрыть";
        more.style.display = "inline";
    }
}

//! Ленивая загрузка

const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;
const loadMoreBlock = document.querySelector('load-more');

let lazyImgsPos = [];
if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        if (img.dataset.src || img.dataset.srcset) {
            lazyImgsPos.push(img.getBoundingClientRect().top + pageYOffset);
            lazyScrollCheck();
        }
    });
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
    if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
        lazyScrollCheck();
    }
    if (!loadMoreBlock.classList.contains('_loading')) {
        loadMore();
    }
}

function lazyScrollCheck() {
    let imgIndex = lazyImgsPos.findIndex(
        item => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        } else if (lazyImages[imgIndex].dataset.srcset) {
            lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
            lazyImages[imgIndex].removeAttribute('data-srcset');
        }
        delete lazyImgsPos[imgIndex];
    }
}

function loadMore() {
    const loadMoreBlockPos =  loadMoreBlock.getBoundingClientRect().top + pageYOffset;
    const loadMoreBlockHeight = loadMoreBlock.offsetHeight;

    if (pageYOffset > (loadMoreBlockPos + loadMoreBlockHeight) - windowHeight) {
        getContent();
    }
}

async function getContent() {
    if (!document.querySelector('_loading-icon')) {
       loadMoreBlock.insertAdjacentHTML(
           'beforeend',
            `<div class="_loading-icon"></div>`
       );
       loadMoreBlock.classList.add('_loading');

       let response = await fetch('_more.html', {
           method: 'GET',
       });
       if (response.ok) {
           let result = await response.text();
           loadMoreBlock.insertAdjacentHTML('beforeend', result);
           loadMoreBlock.classList.remove('_loading');
           if (document.querySelector('._loading-icon')) {
               document.querySelector('._loading-icon').remove();
           }
       } else { 
           alert("Ошибка");
       }
    }
}
