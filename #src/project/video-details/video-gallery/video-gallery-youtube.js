{
	let video = document.querySelector('.video-gallery__video-wrap iframe');
	if(video) {
		let videoList = document.querySelector('.video-gallery__list');
		if(videoList) {

			videoList.addEventListener('click', (e) => {
				if(e.target.closest('.video-gallery__item')) {
					let videoUrl = e.target.closest('.video-gallery__item').dataset.youtubeurl;

					if(videoUrl) {
						video.src = videoUrl.trim();
					}

				}
			})
		}
	}
}