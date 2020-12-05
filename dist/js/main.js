var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

$(document).ready(function() {
	document.querySelector('body').classList.add('isload');

	
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
};

	
	// Dynamic Adapt v.1
	// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
	// e.x. data-da="item,2,992"

	"use strict";

	(function () {
		let originalPositions = [];
		let daElements = document.querySelectorAll('[data-da]');
		let daElementsArray = [];
		let daMatchMedia = [];
		//Заполняем массивы
		if (daElements.length > 0) {
			let number = 0;
			for (let index = 0; index < daElements.length; index++) {
				const daElement = daElements[index];
				const daMove = daElement.getAttribute('data-da');
				if (daMove != '') {
					const daArray = daMove.split(',');
					const daPlace = daArray[1] ? daArray[1].trim() : 'last';
					const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
					const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
					const daDestination = document.querySelector('.' + daArray[0].trim())
					if (daArray.length > 0 && daDestination) {
						daElement.setAttribute('data-da-index', number);
						//Заполняем массив первоначальных позиций
						originalPositions[number] = {
							"parent": daElement.parentNode,
							"index": indexInParent(daElement)
						};
						//Заполняем массив элементов 
						daElementsArray[number] = {
							"element": daElement,
							"destination": document.querySelector('.' + daArray[0].trim()),
							"place": daPlace,
							"breakpoint": daBreakpoint,
							"type": daType
						}
						number++;
					}
				}
			}
			dynamicAdaptSort(daElementsArray);

			//Создаем события в точке брейкпоинта
			for (let index = 0; index < daElementsArray.length; index++) {
				const el = daElementsArray[index];
				const daBreakpoint = el.breakpoint;
				const daType = el.type;

				daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
				daMatchMedia[index].addListener(dynamicAdapt);
			}
		}
		//Основная функция
		function dynamicAdapt(e) {
			for (let index = 0; index < daElementsArray.length; index++) {
				const el = daElementsArray[index];
				const daElement = el.element;
				const daDestination = el.destination;
				const daPlace = el.place;
				const daBreakpoint = el.breakpoint;
				const daClassname = "_dynamic_adapt_" + daBreakpoint;

				if (daMatchMedia[index].matches) {
					//Перебрасываем элементы
					if (!daElement.classList.contains(daClassname)) {
						let actualIndex = indexOfElements(daDestination)[daPlace];
						if (daPlace === 'first') {
							actualIndex = indexOfElements(daDestination)[0];
						} else if (daPlace === 'last') {
							actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
						}
						daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
						daElement.classList.add(daClassname);
					}
				} else {
					//Возвращаем на место
					if (daElement.classList.contains(daClassname)) {
						dynamicAdaptBack(daElement);
						daElement.classList.remove(daClassname);
					}
				}
			}
			customAdapt();
		}

		//Вызов основной функции
		dynamicAdapt();

		//Функция возврата на место
		function dynamicAdaptBack(el) {
			const daIndex = el.getAttribute('data-da-index');
			const originalPlace = originalPositions[daIndex];
			const parentPlace = originalPlace['parent'];
			const indexPlace = originalPlace['index'];
			const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
			parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
		}
		//Функция получения индекса внутри родителя
		function indexInParent(el) {
			var children = Array.prototype.slice.call(el.parentNode.children);
			return children.indexOf(el);
		}
		//Функция получения массива индексов элементов внутри родителя 
		function indexOfElements(parent, back) {
			const children = parent.children;
			const childrenArray = [];
			for (let i = 0; i < children.length; i++) {
				const childrenElement = children[i];
				if (back) {
					childrenArray.push(i);
				} else {
					//Исключая перенесенный элемент
					if (childrenElement.getAttribute('data-da') == null) {
						childrenArray.push(i);
					}
				}
			}
			return childrenArray;
		}
		//Сортировка объекта
		function dynamicAdaptSort(arr) {
			arr.sort(function (a, b) {
				if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
			});
			arr.sort(function (a, b) {
				if (a.place > b.place) { return 1 } else { return -1 }
			});
		}
		//Дополнительные сценарии адаптации
		function customAdapt() {
			//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		}
	}());

	/*
	let block = document.querySelector('.click');
	block.addEventListener("click", function (e) {
		alert('Все ок ;)');
	});
	*/

	/*
	//Объявляем переменные
	const parent_original = document.querySelector('.content__blocks_city');
	const parent = document.querySelector('.content__column_river');
	const item = document.querySelector('.content__block_item');

	//Слушаем изменение размера экрана
	window.addEventListener('resize', move);

	//Функция
	function move(){
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (viewport_width <= 992) {
			if (!item.classList.contains('done')) {
				parent.insertBefore(item, parent.children[2]);
				item.classList.add('done');
			}
		} else {
			if (item.classList.contains('done')) {
				parent_original.insertBefore(item, parent_original.children[2]);
				item.classList.remove('done');
			}
		}
	}

	//Вызываем функцию
	move();

	*/


// === Проверка, поддержка браузером формата webp ==================================================================

	function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
	callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

	if (support == true) {
	document.querySelector('body').classList.add('webp');
	}else{
	document.querySelector('body').classList.add('no-webp');
	}
	});

// === // Проверка, поддержка браузером формата webp ==================================================================



	// ==== COMMON BLOCKS =====================================================
	{
	/*!
 * swiped-events.js - v@version@
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {

    'use strict';

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    var xDown = null;
    var yDown = null;
    var xDiff = null;
    var yDiff = null;
    var timeDown = null;
    var startEl = null;

    function handleTouchEnd(e) {

        // if the user released on a different target, cancel!
        if (startEl !== e.target) return;

        var swipeThreshold = parseInt(startEl.getAttribute('data-swipe-threshold') || '20', 10);    // default 10px
        var swipeTimeout = parseInt(startEl.getAttribute('data-swipe-timeout') || '500', 10);      // default 1000ms
        var timeDiff = Date.now() - timeDown;
        var eventType = '';

        if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
            if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (xDiff > 0) {
                    eventType = 'swiped-left';
                }
                else {
                    eventType = 'swiped-right';
                }
            }
        }
        else {
            if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (yDiff > 0) {
                    eventType = 'swiped-up';
                }
                else {
                    eventType = 'swiped-down';
                }
            }
        }

        if (eventType !== '') {

            // fire event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true }));

            // if (console && console.log) console.log(eventType + ' fired on ' + startEl.tagName);
        }

        // reset values
        xDown = null;
        yDown = null;
        timeDown = null;
    }

    function handleTouchStart(e) {

        // if the element has data-swipe-ignore="true" we stop listening for swipe events
        if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

        startEl = e.target;

        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    }

    function handleTouchMove(e) {

        if (!xDown || !yDown) return;

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    }

}(window, document));


//== ПРИМЕР ИСПОЛЬЗОВАНИЯ ==============================================
// document.addEventListener('swiped-left', function(e) {
//   alert('this is swiping to left')
// });

// document.addEventListener('swiped-right', function(e) {
//   alert('this is swiping to right')
// });

// document.addEventListener('swiped-up', function(e) {
//   alert('this is swiping to up')
// });

// document.addEventListener('swiped-down', function(e) {
//   alert('this is swiping to down')
// });
//== //ПРИМЕР ИСПОЛЬЗОВАНИЯ ==============================================
;

	function togglePlayPause(video,btn) {
		if(video.paused) {
			video.play();
			btn.firstElementChild.className = 'icon-pause2';
			btn.firstElementChild.style.marginLeft = '0px';

		} else {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
			btn.firstElementChild.style.marginLeft = '0.4rem';
		}
	}

	let carousel = document.querySelector('.carousel-video');
	if(carousel) {

		function videoPause() {
			carousel.querySelectorAll('.carousel-video__item').forEach(item => {
				let video = item.querySelector('.carousel-video__video');
				let btn = item.querySelector('.carousel-video__play-pause');

				video.pause();
				btn.firstElementChild.className = 'icon-play3';
			})
		}

		let timerId;

		carousel.querySelectorAll('.carousel-video__item').forEach(item => {
			let videoWrap = item.querySelector('.carousel-video__video-wrap');
			let video = item.querySelector('.carousel-video__video');

			let btn = item.querySelector('.carousel-video__play-pause');

			videoWrap.addEventListener('mousemove', (e) => {
				if(!video.paused) {
					btn.style.opacity = '1';
					
						clearTimeout(timerId);
						timerId = setTimeout(() => {
							btn.style.opacity = '0';
						}, 2000);

				} else {
					btn.style.opacity = '1';
				}

			});

			video.addEventListener('ended', () => {
				video.pause();
				btn.firstElementChild.className = 'icon-play3';
				btn.firstElementChild.style.marginLeft = '0.4rem';
			});
		})



		carousel.addEventListener('click', (e) => {
			if(e.target.closest('.carousel-video__item')) {

				if(e.target.closest('.carousel-video__item--1')) {
					let currentItem = e.target.closest('.carousel-video__item--1');
					let video = currentItem.querySelector('.carousel-video__video');
					let btn = currentItem.querySelector('.carousel-video__play-pause');
					togglePlayPause(video,btn);
					return
				}

				let item = e.target.closest('.carousel-video__item');
				let nameClass = item.className.split(' ')[1];


				videoPause();

				let activeItem = document.querySelector('.carousel-video__item--1');
				activeItem.classList.remove('carousel-video__item--1');
				activeItem.classList.remove('active');
				activeItem.classList.add(nameClass);

				item.classList.remove(nameClass);
				item.classList.add('carousel-video__item--1');
				item.classList.add('active');
			}
		});

		carousel.addEventListener('swiped-left', () => {
			let item = carousel.querySelector('.carousel-video__item.active');

			if(item.nextElementSibling) {
				let nameClass = item.nextElementSibling.className.split(' ')[1];

				item.classList.remove('carousel-video__item--1');
				item.classList.remove('active');
				item.classList.add(nameClass);

				item.nextElementSibling.classList.remove(nameClass);
				item.nextElementSibling.classList.add('carousel-video__item--1');
				item.nextElementSibling.classList.add('active');

				videoPause();
			} else {
				let firstEl = carousel.querySelector('.carousel-video__body').firstElementChild;
				let nameClass = firstEl.className.split(' ')[1];
				 item.classList.remove('carousel-video__item--1');
				 item.classList.remove('active');
				 item.classList.add(nameClass);

				 firstEl.classList.remove(nameClass);
				 firstEl.classList.add('carousel-video__item--1');
				 firstEl.classList.add('active');
				 videoPause();
			}
		});

		carousel.addEventListener('swiped-right', () => {
				let item = carousel.querySelector('.carousel-video__item.active');

				if(item.previousElementSibling) {
					let nameClass = item.previousElementSibling.className.split(' ')[1];

					item.classList.remove('carousel-video__item--1');
					item.classList.remove('active');
					item.classList.add(nameClass);

					item.previousElementSibling.classList.remove(nameClass);
					item.previousElementSibling.classList.add('carousel-video__item--1');
					item.previousElementSibling.classList.add('active');
					videoPause();

				} else {
					let lastEl = carousel.querySelector('.carousel-video__body').lastElementChild;
					let nameClass = lastEl.className.split(' ')[1];

					item.classList.remove('carousel-video__item--1');
					item.classList.remove('active');
					item.classList.add(nameClass);

					lastEl.classList.remove(nameClass);
					lastEl.classList.add('carousel-video__item--1');
					lastEl.classList.add('active');
					videoPause();
				}
		});
	}
};

	// === stars handler ================================================================================
	let rating = document.querySelectorAll('.stars');
	if(rating.length) {
		for(let listStars of rating) {
			for(let star = 0; star < listStars.dataset.amountstars; star++) {
				listStars.children[star].lastChild.className = 'icon-star-full';
			}
		}
	}
// === // stars handler ================================================================================;


	function cardPreviewHandler(){
	let cards = document.querySelectorAll('.card-preview');
	if(cards.length) {
		cards.forEach(item => {
			let text = item.querySelector('.card-preview__text');
			if(text) {
				if(text.innerText.length > 52) {
					text.innerText = [...text.innerText].slice(0, 52).join('') + '....';
				}
			}
		})
	}
};

cardPreviewHandler();;


	//RATING
$('.rating.edit .star').hover(function() {
		var block=$(this).parents('.rating');
	block.find('.rating__activeline').css({width:'0%'});
		var ind=$(this).index()+1;
		var linew=ind/block.find('.star').length*100;
	setrating(block,linew);
},function() {
		var block=$(this).parents('.rating');
	block.find('.star').removeClass('active');
		var ind=block.find('input').val();
		var linew=ind/block.find('.star').length*100;
	setrating(block,linew);
});
$('.rating.edit .star').click(function(event) {
		var block=$(this).parents('.rating');
		var re=$(this).index()+1;
		block.find('input').val(re);
		var linew=re/block.find('.star').length*100;
	setrating(block,linew);
});
$.each($('.rating'), function(index, val) {
		var ind=$(this).find('input').val();
		var linew=ind/$(this).parent().find('.star').length*100;
	setrating($(this),linew);
});
function setrating(th,val) {
	th.find('.rating__activeline').css({width:val+'%'});
};


	function cardVideoHandler() {
	function togglePlayPause(video,btn) {
		if(video.paused) {
			video.play();
			btn.firstElementChild.className = 'icon-pause2';
			btn.firstElementChild.style.marginLeft = '0px';

		} else {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
			btn.firstElementChild.style.marginLeft = '0.4rem';
		}
	}

	let cards = document.querySelectorAll('.card-video');
	if(cards.length) {
		let timerId;
		cards.forEach((card) => {

			let videoWrap = card.querySelector('.card-video__video-wrap');
			let video = card.querySelector('.card-video__video');
			let btn = card.querySelector('.card-video__play-pause');
			let time = card.querySelector('.card-video__duration-time');
			let btnLink = card.querySelector('.card-video__btn');

			if(video) {
				videoWrap.addEventListener('click', (e) => {
					e.preventDefault();
					togglePlayPause(video,btn);
				});
				video.addEventListener('ended', () => {
					video.pause();
					btn.firstElementChild.className = 'icon-play3';
					btn.firstElementChild.style.marginLeft = '0.4rem';
				});
				videoWrap.addEventListener('mousemove', (e) => { 
					if(!video.paused) {
						btn.style.opacity = '1';
						
							clearTimeout(timerId);
							timerId = setTimeout(() => {
								btn.style.opacity = '0';
							}, 2000);

					} else {
						btn.style.opacity = '1';
					}

				});
				video.addEventListener('loadedmetadata', function() {
					if(video.duration >= 60) {

						time.innerText = (video.duration / 60).toFixed(2) + ' min';
					} else if(video.duration < 10) {
						time.innerText = '0.0' + Math.round(video.duration) + ' min';
					} else if(video.duration < 60) {
						time.innerText = '0.' + Math.round(video.duration) + ' min';
					}
				});
				if(btnLink.dataset.background) {
					btnLink.style.background = btnLink.dataset.background.trim();
				}
				if(btnLink.dataset.color) {
					btnLink.style.color = btnLink.dataset.color.trim();
				}
			}
		})
	}

}

cardVideoHandler();;


	// ==== accordion =======================================================
if ($('.accordion').length>0) {
	$.each($('.spoller.active'), function (index, val) {
		$(this).next().show();
	});
	$('body').on('click', '.spoller', function (event) {
		if ($(this).hasClass('mob') && !isMobile.any()) {
			return false;
		}

		if ($(this).parents('.one').length > 0) {
			$(this).parents('.one').find('.spoller').not($(this)).removeClass('active').next().slideUp(300);
			$(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('active');
		}

		if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
			$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
				$(this).removeClass('active');
				$(this).next().slideUp(300);
			});
		}
		$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
			if ($(this).parent().find('.slick-slider').length > 0) {
				$(this).parent().find('.slick-slider').slick('setPosition');
			}
		});
		return false;
	});
}

// ==== // accordion =======================================================;


	function cardTvSeriesHandler() {
	function togglePlayPause(video,btn) {
		if(video.paused) {
			video.play();
			btn.firstElementChild.className = 'icon-pause2';
			btn.firstElementChild.style.marginLeft = '0px';

		} else {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
			btn.firstElementChild.style.marginLeft = '0.4rem';
		}
	}

	let cards = document.querySelectorAll('.card-tv-series');
	if(cards.length) {
		let timerId;

		cards.forEach((card) => {
			let videoWrap = card.querySelector('.card-tv-series__video-wrap');
			let video = card.querySelector('.card-tv-series__video');
			let btn = card.querySelector('.card-tv-series__play-pause');

			if(video) {
				videoWrap.addEventListener('click', (e) => {
					e.preventDefault();
					togglePlayPause(video,btn);
				});

				video.addEventListener('ended', () => {
					video.pause();
					btn.firstElementChild.className = 'icon-play3';
					btn.firstElementChild.style.marginLeft = '0.4rem';
				});

				videoWrap.addEventListener('mousemove', (e) => { 
					if(!video.paused) {
						btn.style.opacity = '1';
						
							clearTimeout(timerId);
							timerId = setTimeout(() => {
								btn.style.opacity = '0';
							}, 2000);

					} else {
						btn.style.opacity = '1';
					}

				});
			}	

		})
	}
}

cardTvSeriesHandler();;



	// ==== AND COMMON BLOCKS =====================================================



	// ==== HEADER =====================================================
	// === header =================
{
	let header = document.querySelector('.header');
	if(header) {

		let _slideUp = (target, duration = 500) => {
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.style.display = 'none';
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
		let _slideDown = (target, duration = 500) => {
			target.style.removeProperty('display');
			let display = window.getComputedStyle(target).display;
			if (display === 'none')
				display = 'block';

			target.style.display = display;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
		let _slideToggle = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');
				if (window.getComputedStyle(target).display === 'none') {
					return _slideDown(target, duration);
				} else {
					return _slideUp(target, duration);
				}
			}
		}

	//-- burger handler ----------
		let burger = document.querySelector('.navbar-burger');
		let menu = document.querySelector('.navbar-menu');
		burger.addEventListener('click', () => {
			header.classList.toggle('navOpen');
			_slideToggle(menu);
		});
	//-- and burger handler ----------


	}
}
// === and header =================;
	// ==== AND HEADER =====================================================


	// ==== HOME =====================================================
	{
	let heroSlider = document.querySelector('.hero-slider');
	if(heroSlider) {
		let countSlide = document.querySelector('.hero-slider__dots-body').children.length;

		$('.hero-slider__body').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.hero-slider__dots-body',
		  infinite: true,
		});

		$('.hero-slider__dots-body').slick({
		  slidesToShow: countSlide, 
		  asNavFor: '.hero-slider__body',
		  arrows: false,
		  infinite: true,
		});

		document.querySelectorAll('.hero-slider__dots-item').forEach(item => {
			let index = item.closest('.slick-slide').dataset.slickIndex;
			$(item).click(() => {
				$('.hero-slider__body').slick('slickGoTo' , index);
			})
		})

	}
};
	{
	let professionals = document.querySelector('.professionals');
	if(professionals) {
		$('.professionals__slider').slick({
		  infinite: true,
		  slidesToScroll: 1,
		  prevArrow: '<div class="slick-arrow slick-prev"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.74741 1.66436C7.11433 1.25158 7.07715 0.619509 6.66436 0.252591C6.25158 -0.114327 5.61951 -0.0771466 5.25259 0.335636L6.74741 1.66436ZM2 5.5L1.25259 4.83564L0.662045 5.5L1.25259 6.16436L2 5.5ZM5.25259 10.6644C5.61951 11.0771 6.25158 11.1143 6.66436 10.7474C7.07715 10.3805 7.11433 9.74842 6.74741 9.33564L5.25259 10.6644ZM5.25259 0.335636L1.25259 4.83564L2.74741 6.16436L6.74741 1.66436L5.25259 0.335636ZM2 5.5C1.25259 6.16436 1.2526 6.16437 1.25262 6.1644C1.25264 6.16442 1.25266 6.16445 1.2527 6.16449C1.25277 6.16457 1.25289 6.1647 1.25304 6.16486C1.25333 6.1652 1.25378 6.1657 1.25436 6.16636C1.25554 6.16768 1.25731 6.16967 1.25963 6.17229C1.26429 6.17753 1.27123 6.18533 1.28035 6.19559C1.29859 6.21611 1.32554 6.24643 1.3604 6.28564C1.43011 6.36407 1.53144 6.47807 1.65792 6.62036C1.91088 6.90494 2.26444 7.30269 2.6668 7.75535C3.47154 8.66068 4.47154 9.78568 5.25259 10.6644L6.74741 9.33564C5.96636 8.45696 4.96636 7.33196 4.16162 6.42663C3.75925 5.97396 3.4057 5.57621 3.15274 5.29163C3.02626 5.14934 2.92493 5.03534 2.85521 4.95692C2.82036 4.9177 2.79341 4.88738 2.77517 4.86687C2.76605 4.85661 2.75911 4.8488 2.75445 4.84356C2.75212 4.84093 2.75036 4.83896 2.74918 4.83763C2.7486 4.83697 2.74815 4.83647 2.74785 4.83614C2.7477 4.83597 2.7476 4.83585 2.74752 4.83576C2.74748 4.83572 2.74746 4.83569 2.74744 4.83567C2.74742 4.83565 2.74741 4.83564 2 5.5Z" fill="black"/></svg></div>',
		  nextArrow: '<div class="slick-arrow slick-next"><svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.252591 9.33564C-0.114327 9.74842 -0.0771466 10.3805 0.335636 10.7474C0.748419 11.1143 1.38049 11.0771 1.74741 10.6644L0.252591 9.33564ZM5 5.5L5.74741 6.16436L6.33796 5.5L5.74741 4.83564L5 5.5ZM1.74741 0.335636C1.38049 -0.0771468 0.74842 -0.114328 0.335637 0.252591C-0.0771457 0.619508 -0.114327 1.25158 0.252591 1.66436L1.74741 0.335636ZM1.74741 10.6644L5.74741 6.16436L4.25259 4.83564L0.252591 9.33564L1.74741 10.6644ZM5 5.5C5.74741 4.83564 5.7474 4.83563 5.74738 4.8356C5.74736 4.83558 5.74734 4.83555 5.7473 4.83551C5.74723 4.83543 5.74711 4.8353 5.74696 4.83514C5.74667 4.8348 5.74622 4.8343 5.74564 4.83364C5.74446 4.83232 5.74269 4.83033 5.74037 4.82771C5.73571 4.82247 5.72877 4.81467 5.71965 4.80441C5.70141 4.78389 5.67446 4.75357 5.63961 4.71436C5.56989 4.63593 5.46856 4.52193 5.34208 4.37964C5.08912 4.09506 4.73557 3.69731 4.3332 3.24465C3.52846 2.33932 2.52846 1.21432 1.74741 0.335636L0.252591 1.66436C1.03364 2.54304 2.03364 3.66804 2.83838 4.57337C3.24075 5.02604 3.5943 5.42379 3.84726 5.70837C3.97374 5.85066 4.07507 5.96466 4.14479 6.04308C4.17964 6.0823 4.20659 6.11262 4.22483 6.13313C4.23395 6.14339 4.24089 6.1512 4.24555 6.15644C4.24788 6.15907 4.24964 6.16104 4.25082 6.16237C4.2514 6.16303 4.25185 6.16353 4.25215 6.16386C4.2523 6.16403 4.2524 6.16415 4.25248 6.16424C4.25252 6.16428 4.25254 6.16431 4.25256 6.16433C4.25258 6.16435 4.25259 6.16436 5 5.5Z" fill="black"/></svg></div>',
		  variableWidth: true,	
		  touchThreshold: 20,
		})
	}
}
 ;
	// ==== AND HOME =====================================================
	


	// ==== PROFESSIONALS CATEGORY =====================================================
	{
	let categoryList = document.querySelector('.professionals-category__content');
	if(categoryList) {
		let observer = new MutationObserver(() => {
		  cardPreviewHandler();
		});

		observer.observe(categoryList, {
		  childList: true,
		});
	}
};
	// ==== AND PROFESSIONALS CATEGORY =====================================================
	


	// ==== PROFESSIONALS DETAILS =====================================================
	;
	{
	let gallerySlider = document.querySelector('.gallery');
	if(gallerySlider) {
		$('.gallery__main-slider').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  prevArrow: '<div class="slick-arrow slick-prev"><span class=""><svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 19.5L11.55 18.45L5.925 12.75L21.75 12.75L21.75 11.25L5.925 11.25L11.55 5.55L10.5 4.5L3 12L10.5 19.5Z" fill="#344F6E"/></svg></span></div>',
		  nextArrow: '<div class="slick-arrow slick-next"><span class=""><svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L12.45 5.55L18.075 11.25H2.25V12.75H18.075L12.45 18.45L13.5 19.5L21 12L13.5 4.5Z" fill="#344F6E"/></svg></span></div>',
		  fade: true,
		  asNavFor: '.gallery__bottom-slider',
		  infinite: true,
		  responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		       fade: false,
		      }
		    }
		  ]
		});

		$('.gallery__bottom-slider').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.gallery__main-slider',
		  arrows: false,
		  infinite: true,
		});

		document.querySelectorAll('.gallery__bottom-slider-item').forEach(item => {
			let index = item.closest('.slick-slide').dataset.slickIndex;
			$(item).click(() => {
				$('.gallery__main-slider').slick('slickGoTo' , index);
			})
		})

	}
};
	{
	let reviewsBox = document.querySelectorAll('.reviews-block__box-review');
	if(reviewsBox) {
		const moveToMobileBOx = () => {
			reviewsBox.forEach(item => {
				let mobileBox = item.querySelector('.reviews-block__box-review-mobile');
				let name = item.querySelector('.reviews-block__box-review-name');
				let date = item.querySelector('.reviews-block__box-review-date');

				mobileBox.append(name);
				mobileBox.append(date);

			});
		}

		if(document.documentElement.clientWidth < 768) {
			moveToMobileBOx();
		}


		window.addEventListener('resize', () => {
			if(document.documentElement.clientWidth < 768) {
				moveToMobileBOx();
			}
		});
	}
};
	;
	// ==== AND PROFESSIONALS DETAILS =====================================================
	


	// ==== VIDEOS =====================================================
	{
	let videoList = document.querySelector('.videos__list > .columns');
	if(videoList) {
		let observer = new MutationObserver(() => {
		  cardVideoHandler();
		});

		observer.observe(videoList, {
		  childList: true,
		});
	}
};
	// ==== AND VIDEOS =====================================================
	


	// ==== VIDEO DETAILS =====================================================
	{
	function togglePlayPause(video,btn) {
		if(video.paused) {
			video.play();
			btn.firstElementChild.className = 'icon-pause2';
			btn.firstElementChild.style.marginLeft = '0px';

		} else {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
			btn.firstElementChild.style.marginLeft = '0.4rem';
		}
	}

	let video = document.querySelector('.video-details__video');

	if(video) {
		let timerId;
		let videoWrap = document.querySelector('.video-details__hero-video-wrap');
		let btn = document.querySelector('.video-details__play-pause');

		btn.addEventListener('click', (e) => {
			togglePlayPause(video,btn);
		});

		video.addEventListener('mousemove', (e) => { 
			if(!video.paused) {
				btn.style.opacity = '1';
				video.setAttribute('controls', '');
					clearTimeout(timerId);
					timerId = setTimeout(() => {
						btn.style.opacity = '0';
						video.removeAttribute('controls');
					}, 2000);

			} else {
				btn.style.opacity = '1';
			}

		});

		video.addEventListener('ended', () => {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
			btn.firstElementChild.style.marginLeft = '0.4rem';
		});

		video.addEventListener('click', () => {
			if(video.paused) {
				btn.firstElementChild.className = 'icon-pause2';
				btn.firstElementChild.style.marginLeft = '0px';

			} else {
				btn.firstElementChild.className = 'icon-play3';
				btn.firstElementChild.style.marginLeft = '0.4rem';
			}
		});

		if(isMobile.any()) {
			video.setAttribute('controls', '');
		}
	}
};
	{
	function togglePlayPause(video,btn) {
		if(video.paused) {
			video.play();
			btn.firstElementChild.className = 'icon-pause2';
			btn.firstElementChild.style.marginLeft = '0px';

		} else {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
			btn.firstElementChild.style.marginLeft = '0.4rem';
		}
	}

	let video = document.querySelector('.video-gallery__video');
	if(video) {
		let timerId;
		let videoWrap = document.querySelector('.video-gallery__video-wrap');
		let btn = document.querySelector('.video-gallery__play-pause');

		btn.addEventListener('click', (e) => {
			togglePlayPause(video,btn);
		});

		video.addEventListener('mousemove', (e) => { 
			if(!video.paused) {
				btn.style.opacity = '1';
				video.setAttribute('controls', '');
					clearTimeout(timerId);
					timerId = setTimeout(() => {
						btn.style.opacity = '0';
						video.removeAttribute('controls');
					}, 2000);

			} else {
				btn.style.opacity = '1';
			}

		});

		video.addEventListener('ended', () => {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
			btn.firstElementChild.style.marginLeft = '0.4rem';
		});

		video.addEventListener('click', () => {
			if(video.paused) {
				btn.firstElementChild.className = 'icon-pause2';
				btn.firstElementChild.style.marginLeft = '0px';

			} else {
				btn.firstElementChild.className = 'icon-play3';
				btn.firstElementChild.style.marginLeft = '0.4rem';
			}
		});

		if(isMobile.any()) {
			video.setAttribute('controls', '');
		}
	}

	let videoList = document.querySelector('.video-gallery__list');
	if(videoList) {
		let video = document.querySelector('.video-gallery__video');
		let btn = document.querySelector('.video-gallery__play-pause');

		videoList.addEventListener('click', (e) => {
			if(e.target.closest('.video-gallery__item')) {
				let videoUrl = e.target.closest('.video-gallery__item').dataset.videourl;
				let posterUrl = e.target.closest('.video-gallery__item').dataset.posterurl;

				video.pause();
				btn.firstElementChild.className = 'icon-play3';
				btn.firstElementChild.style.marginLeft = '0.4rem';

				if(videoUrl) {
					video.src = videoUrl.trim();
				}

				if(posterUrl) {
					video.setAttribute('poster', posterUrl.trim());
				}
			}
			//video.src = 'img/videoplayback.mp4';
		})
	}
}
;
	{
	let video = document.querySelector('.video-gallery__video-wrap iframe');
	if(video) {
		let videoList = document.querySelector('.video-gallery__list');
		if(videoList) {

			videoList.addEventListener('click', (e) => {
				if(e.target.closest('.video-gallery__item')) {
					let videoUrl = e.target.closest('.video-gallery__item').dataset.youtubeurl;

					if(videoUrl) {
						video.src = videoUrl.trim();
					}

				}
			})
		}
	}
};
	// ==== AND VIDEO DETAILS =====================================================

	

	// ==== BLOG =====================================================
	{
	let gallerySlider = document.querySelector('.hero-gallery');
	if(gallerySlider) {
		$('.hero-gallery__main-slider').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  prevArrow: '<div class="slick-arrow slick-prev"><span class=""><svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 0V1.93411L2.56341 4.36L6 6.87143V8.72L0.359207 4.36L6 0Z" fill="white"/></svg></span></div>',
		  nextArrow: '<div class="slick-arrow slick-next"><span class=""><svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V1.93411L3.43659 4.36L0 6.87143V8.72L5.64079 4.36L0 0Z" fill="white"/></svg></span></div>',
		  fade: true,
		  asNavFor: '.hero-gallery__bottom-slider',
		  infinite: true,
		  responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		       fade: false,
		      }
		    }
		  ]
		});

		$('.hero-gallery__bottom-slider').slick({
		  slidesToShow: 4,
		  slidesToScroll: 1,
		  asNavFor: '.hero-gallery__main-slider',
		  arrows: false,
		  infinite: true,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		       	slidesToShow: 3,
		      }
		    }
		  ]
		});

		document.querySelectorAll('.hero-gallery__bottom-slider-item').forEach(item => {
			let index = item.closest('.slick-slide').dataset.slickIndex;
			$(item).click(() => {
				$('.hero-gallery__main-slider').slick('slickGoTo' , index);
			})
		})

	}
};
	// ==== AND BLOG =====================================================
	


	// ==== TV-SERIES =====================================================
	;
	// ==== AND TV-SERIES =====================================================




});



// === MAP ================================================================================================
// ==== //  google map ===============

{


	let isMap = document.getElementById("map");
	if(isMap) {
		var map;

		let center = {
			lat: 55.781977,
			lng: 37.469893,
		}

		let markerPosition = {
			lat: 55.781977,
			lng: 37.469893,
		}

		// Функция initMap которая отрисует карту на странице
		function initMap() {

			// В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
			map = new google.maps.Map(document.getElementById('map'), {
				// При создании объекта карты необходимо указать его свойства
				// center - определяем точку на которой карта будет центрироваться
				center: {lat: center.lat, lng: center.lng},
				// zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.

				zoom: 6,

				// Добавляем свои стили для отображения карты
				//styles: 
			});

			// Создаем маркер на карте
			var marker = new google.maps.Marker({

				// Определяем позицию маркера
			    position: {lat: markerPosition.lat, lng: markerPosition.lng},

			    // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
			    map: map,

			    // Пишем название маркера - появится если навести на него курсор и немного подождать
			    title: '',
			    label: '',

			    // Укажем свою иконку для маркера
			   // icon: 'img/contact/googlMarker.svg',
			});

		}
	}
};
// ===// MAP ================================================================================================