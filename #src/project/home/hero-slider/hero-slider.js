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
}