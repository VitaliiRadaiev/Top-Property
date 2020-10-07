{
	let cards = document.querySelectorAll('.card-preview');
	if(cards.length) {
		cards.forEach(item => {
			let text = item.querySelector('.card-preview__text');
			if(text.innerText.length > 52) {
				text.innerText = [...text.innerText].slice(0, 52).join('') + '....';
			}
		})
	}
}