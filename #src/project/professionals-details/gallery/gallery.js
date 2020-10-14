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
}