{
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

	let video = document.querySelector('.video-details__video');

	if(video) {
		let timerId;
		let videoWrap = document.querySelector('.video-details__hero-video-wrap');
		let btn = document.querySelector('.video-details__play-pause');

		btn.addEventListener('click', (e) => {
			togglePlayPause(video,btn);
		});

		video.addEventListener('mousemove', (e) => { 
			if(!video.paused) {
				btn.style.opacity = '1';
				video.setAttribute('controls', '');
					clearTimeout(timerId);
					timerId = setTimeout(() => {
						btn.style.opacity = '0';
						video.removeAttribute('controls');
					}, 2000);

			} else {
				btn.style.opacity = '1';
			}

		});

		video.addEventListener('ended', () => {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
			btn.firstElementChild.style.marginLeft = '0.4rem';
		});

		video.addEventListener('click', () => {
			if(video.paused) {
				btn.firstElementChild.className = 'icon-pause2';
				btn.firstElementChild.style.marginLeft = '0px';

			} else {
				btn.firstElementChild.className = 'icon-play3';
				btn.firstElementChild.style.marginLeft = '0.4rem';
			}
		});

		if(isMobile.any()) {
			video.setAttribute('controls', '');
		}
	}
}