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
}