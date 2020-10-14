{
	let videoList = document.querySelector('.videos__list > .columns');
	if(videoList) {
		let observer = new MutationObserver(() => {
		  cardVideoHandler();
		});

		observer.observe(videoList, {
		  childList: true,
		});
	}
}