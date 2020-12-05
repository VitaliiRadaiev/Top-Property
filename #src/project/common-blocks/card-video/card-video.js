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

cardVideoHandler();