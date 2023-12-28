const burger = (menuSelector, burgerSelector) => {
	const menuElem = document.querySelector(menuSelector);
	const burgerElem = document.querySelector(burgerSelector);

	burgerElem.addEventListener('click', () => {
		if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
			menuElem.style.display = 'block';
		} else {
			menuElem.style.display = 'none';
		}
	});

	window.addEventListener('resize', () => {
		if (window.screen.availWidth > 992) {
			menuElem.style.display = 'none';
		} else {
			menuElem.style.display = 'block';
		};
	})
};

export default burger;