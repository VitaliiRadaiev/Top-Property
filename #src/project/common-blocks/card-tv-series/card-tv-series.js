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

		})
	}
}

cardTvSeriesHandler();