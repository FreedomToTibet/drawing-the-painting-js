const modals = () => {
	let btnPressed = false;

	function bindModal(triggerSelector, modalSelector, closerSelector, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const closer = document.querySelector(closerSelector);
		const modalWindows = document.querySelectorAll('[data-modal]');
		const scrollWidth = calculateScroll();
		const gift = document.querySelector('.fixed-gift');

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if(e.target) {e.preventDefault();}

				btnPressed = true;

				if(destroy) {item.remove();}

				modalWindows.forEach(item => {
					item.style.display = 'none';
					item.classList.add('animated', 'fadeIn');
				});
	
				modal.style.display = "block";
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${scrollWidth}px`;
				if(gift) {
					gift.style.right = (`${parseInt(window.getComputedStyle(gift).getPropertyValue('right')) + scrollWidth}px`);
				}
			});
		});

		closer.addEventListener('click', () => {
			modalWindows.forEach(item => {
				item.style.display = 'none';
			});

			modal.style.display = "none";
			document.body.style.overflow = "";
			document.body.style.marginRight = `0px`;
			gift.style.right = "2rem";
		});

		modal.addEventListener('click', (e) => {
			if(e.target === modal) {
				modalWindows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
				gift.style.right = "2rem";
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(function() {
			let display;

			document.querySelectorAll('[data-modal]').forEach(modal => {
				if(getComputedStyle(modal).display !== 'none') {display = 'block'}
			});

			if(!display) {
				document.querySelector(selector).style.display = 'block';
				document.body.style.overflow = "hidden";
				let scrollWidth = calculateScroll();
				document.body.style.marginRight = `${scrollWidth}px`;
			}
		}, time);
	};

	function calculateScroll() {
		let div = document.createElement('div');
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflow = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	function openByScroll(selector) {
		window.addEventListener('scroll', () => {
			if(!btnPressed && (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
				document.querySelector(selector).click();
			}
		});
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

	openByScroll('.fixed-gift');

	showModalByTime('.popup-consultation', 60000);
};

export default modals;