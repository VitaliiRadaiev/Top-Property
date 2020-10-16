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

	let video = document.querySelector('.video-gallery__video');
	if(video) {
		let timerId;
		let videoWrap = document.querySelector('.video-gallery__video-wrap');
		let btn = document.querySelector('.video-gallery__play-pause');

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

	let videoList = document.querySelector('.video-gallery__list');
	if(videoList) {
		let video = document.querySelector('.video-gallery__video');
		let btn = document.querySelector('.video-gallery__play-pause');

		videoList.addEventListener('click', (e) => {
			if(e.target.closest('.video-gallery__item')) {
				let videoUrl = e.target.closest('.video-gallery__item').dataset.videourl;
				let posterUrl = e.target.closest('.video-gallery__item').dataset.posterurl;

				video.pause();
				btn.firstElementChild.className = 'icon-play3';
				btn.firstElementChild.style.marginLeft = '0.4rem';

				if(videoUrl) {
					video.src = videoUrl.trim();
				}

				if(posterUrl) {
					video.setAttribute('poster', posterUrl.trim());
				}
			}
			//video.src = 'img/videoplayback.mp4';
		})
	}
}
