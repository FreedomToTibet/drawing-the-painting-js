import {postData} from '../services/requests';

const forms = () => {
	const form = document.querySelectorAll('form');
	const input = document.querySelectorAll('input');
	const comment = document.querySelectorAll('textarea');
	const phoneInputs = document.querySelectorAll('input[name="user_phone"]');
	const upload = document.querySelectorAll('[name="upload"]');
	const resultBlock = document.querySelector('.calc-price');
	const sizeBlock = document.querySelector('#size');
	const materialBlock = document.querySelector('#material');
	const optionsBlock = document.querySelector('#options');
	const promocodeBlock = document.querySelector('.promocode');


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
		// designer: "https://66163e62b8b8e32ffc7ccc7b.mockapi.io/api/painting/desig-req",
		// question: "https://66163e62b8b8e32ffc7ccc7b.mockapi.io/api/painting/quest-req",
	};

	const clearInputs = () => {
		input.forEach(element => {
			element.value = '';
		});
		upload.forEach(item => {
			item.previousElementSibling.textContent = 'Load file';
		});
		try {
			resultBlock.textContent = '';
			console.log(sizeBlock.querySelectorAll('option')[0]);
			sizeBlock.querySelectorAll('option')[0].selected = true;
			materialBlock.querySelectorAll('option')[0].selected = true;
			optionsBlock.querySelectorAll('option')[0].selected = true;
			promocodeBlock = '';
		} catch (e) {}
	};

	const clearComments = () => {
		comment.forEach(element => {
			element.value = '';
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

			// const formJson = JSON.stringify(Object.fromEntries(formData.entries()));
			// console.log(formJson);

			postData(api, formData)
			// postData(api, formJson)
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
					clearComments();
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