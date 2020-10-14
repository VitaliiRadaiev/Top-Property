var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

@@include('forms.js');

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