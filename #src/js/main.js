var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

$(document).ready(function() {
	document.querySelector('body').classList.add('isload');

	@@include('../project/common-blocks/form-search/form-search.js');

	
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
	@@include('../project/common-blocks/carousel-video/carousel-video.js');

	@@include('../project/common-blocks/stars/stars.js');


	@@include('../project/common-blocks/card-preview/card-preview.js');


	@@include('../project/common-blocks/rating-block/rating-block.js');


	@@include('../project/common-blocks/card-video/card-video.js');


	@@include('../project/common-blocks/accordion/accordion.js');


	@@include('../project/common-blocks/card-tv-series/card-tv-series.js');



	// ==== AND COMMON BLOCKS =====================================================



	// ==== HEADER =====================================================
	@@include('../project/header/header.js');
	// ==== AND HEADER =====================================================


	// ==== HOME =====================================================
	@@include('../project/home/hero-slider/hero-slider.js');
	@@include('../project/home/professionals/professionals.js');
	// ==== AND HOME =====================================================
	


	// ==== PROFESSIONALS CATEGORY =====================================================
	@@include('../project/professionals-category/professionals-category.js');
	// ==== AND PROFESSIONALS CATEGORY =====================================================
	


	// ==== PROFESSIONALS DETAILS =====================================================
	@@include('../project/professionals-details/hero/hero.js');
	@@include('../project/professionals-details/gallery/gallery.js');
	@@include('../project/professionals-details/reviews-block/reviews-block.js');
	@@include('../project/professionals-details/add-reviwe-form/add-reviwe-form.js');
	// ==== AND PROFESSIONALS DETAILS =====================================================
	


	// ==== VIDEOS =====================================================
	@@include('../project/videos/videos.js');
	// ==== AND VIDEOS =====================================================
	


	// ==== VIDEO DETAILS =====================================================
	@@include('../project/video-details/video-details.js');
	@@include('../project/video-details/video-gallery/video-gallery.js');
	@@include('../project/video-details/video-gallery/video-gallery-youtube.js');
	// ==== AND VIDEO DETAILS =====================================================

	

	// ==== BLOG =====================================================
	@@include('../project/blog/hero-gallery/hero-gallery.js');
	// ==== AND BLOG =====================================================
	


	// ==== TV-SERIES =====================================================
	@@include('../project/tv-series/tv-series.js');
	// ==== AND TV-SERIES =====================================================




});



// === MAP ================================================================================================
@@include('../project/common-blocks/map/map.js');
// ===// MAP ================================================================================================