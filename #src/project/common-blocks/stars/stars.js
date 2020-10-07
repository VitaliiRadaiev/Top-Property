// === stars handler ================================================================================
	let rating = document.querySelectorAll('.stars');
	if(rating.length) {
		for(let listStars of rating) {
			for(let star = 0; star < listStars.dataset.amountstars; star++) {
				listStars.children[star].lastChild.className = 'icon-star-full';
			}
		}
	}
// === // stars handler ================================================================================