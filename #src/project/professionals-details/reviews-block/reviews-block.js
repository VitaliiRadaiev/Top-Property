{
	let reviewsBox = document.querySelectorAll('.reviews-block__box-review');
	if(reviewsBox) {
		const moveToMobileBOx = () => {
			reviewsBox.forEach(item => {
				let mobileBox = item.querySelector('.reviews-block__box-review-mobile');
				let name = item.querySelector('.reviews-block__box-review-name');
				let date = item.querySelector('.reviews-block__box-review-date');

				mobileBox.append(name);
				mobileBox.append(date);

			});
		}

		if(document.documentElement.clientWidth < 768) {
			moveToMobileBOx();
		}


		window.addEventListener('resize', () => {
			if(document.documentElement.clientWidth < 768) {
				moveToMobileBOx();
			}
		});
	}
}