import {postData} from '../services/requests';

const forms = () => {
	const form = document.querySelectorAll('form');
	const input = document.querySelectorAll('input');
	const phoneInputs = document.querySelectorAll('input[name="user_phone"]');
	const upload = document.querySelectorAll('[name="upload"]');


	const message = {
		loading: 'Loading...',
		success: 'Thank you! Waiting for callback soon.',
		failing: 'Something went wrong',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	}

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	};

	const clearInputs = () => {
		input.forEach(element => {
			element.value = '';
		});
		upload.forEach(item => {
			item.previousElementSibling.textContent = 'Load file';
		});
	};

	phoneInputs.forEach(item => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/\D/, '');
		});
	});

	upload.forEach(item => {
		item.addEventListener('input', () => {
			let dots;
			const arr = item.files[0].name.split('.');
			arr[0].length > 6 ? dots = '...' : dots = '.';
			const name = arr[0].substring(0, 6) + dots + arr[1];
			item.previousElementSibling.textContent = name;
		});
	});

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);

			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			const formData = new FormData(item);

			let api;
			item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
			console.log(api);

			postData(api, formData)
				.then(result => {
					console.log(result);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				})
				.catch(() => {
					statusImg.setAttribute('src', message.fail);
					textMessage.textContent = message.failing;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						item.style.display = 'block';
						item.classList.remove('fadeOutUp');
						item.classList.add('fadeInUp');
					}, 3000);
				});
		});
	});
};

export default forms;