{
	let categoryList = document.querySelector('.professionals-category__content');
	if(categoryList) {
		let observer = new MutationObserver(() => {
		  cardPreviewHandler();
		});

		observer.observe(categoryList, {
		  childList: true,
		});
	}
}