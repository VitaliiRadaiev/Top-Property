{
	@@include('../../../js/swiped-events.js');

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
}