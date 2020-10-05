var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };


$(document).ready(function() {
	document.querySelector('body').classList.add('isload');

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
			btn.firstElementChild.style.marginLeft = '4px';
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

			})
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

		$('.hero-slider__body').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.hero-slider__dots-body',
		  infinite: false,
		});

		$('.hero-slider__dots-body').slick({
		  slidesToShow: 4, 
		  asNavFor: '.hero-slider__body',
		  arrows: false,
		  infinite: false,
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
		  touchThreshold: 10,
		})
	}
}
 ;
	// ==== AND HOME =====================================================



});