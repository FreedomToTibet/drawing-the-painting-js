const scrolling = () => {
	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > 1650) {
			document.querySelector('.pageup').style.opacity = '1';
			document.querySelector('.pageup').addClass.add('animated', 'fadeIn');
			document.querySelector('.pageup').addClass.remove('fadeOut');
		} else {
			document.querySelector('.pageup').style.opacity = '0';
			document.querySelector('.pageup').addClass.add('fadeOut');
			document.querySelector('.pageup').addClass.remove('fadeIn');
		}
	});

	// Scrolling with raf
	const links = document.querySelectorAll('[href^="#"]'),
		speed = 0.2;
		
	links.forEach(link => {
		link.addEventListener('click', function(event) {
			event.preventDefault();

			let widthTop = document.documentElement.scrollTop,
				hash = this.hash,
				toBlock = document.querySelector(hash).getBoundingClientRect().top,
				start = null;

			requestAnimationFrame(step);

			function step(time) {
				if (start === null) {
					start = time;
				}

				let progress = time - start,
					r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

				document.documentElement.scrollTo(0, r);

				if (r != widthTop + toBlock) {
					requestAnimationFrame(step);
				} else {
					location.hash = hash;
				}
			}
		});
	});
}

export default scrolling;