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
}