const mask = (selector) => {
	
		let setCursorPosition = (pos, elem) => {
				elem.focus();

				if (elem.setSelectionRange) {
						elem.setSelectionRange(pos, pos); // устанавливаем курсор в позицию pos
				} else if (elem.createTextRange) {
						let range = elem.createTextRange(); // создаем объект
						range.collapse(true); // метод collapse - объединяет граничные точки диапазона
						range.moveEnd('character', pos); // метод moveEnd - перемещает конец диапазона на заданное число единиц
						range.moveStart('character', pos); // метод moveStart - перемещает начало диапазона на заданное число единиц
						range.select(); // метод select - выделяет текст внутри диапазона
				}
		};

		function createMask(event) {
				let matrix = '+1 (___) ___ __ __'; // матрица
				let	i = 0;
				let def = matrix.replace(/\D/g, ''); // избавляемся от не чисел
				let val = this.value.replace(/\D/g, ''); // избавляемся от не чисел

				if (def.length >= val.length) {
						val = def;
				}

				this.value = matrix.replace(/./g, function (a) { // заменяем все символы в матрице на то что ввел пользователь
						return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
				});

				// если пользователь убирает фокус с инпута, то курсор возвращается в начало
				if (event.type === 'blur') {
						if (this.value.length === 2) {
								this.value = '';
						}
				} else {
						setCursorPosition(this.value.length, this);
				}
		}

		let inputs = document.querySelectorAll(selector);

		inputs.forEach(input => {
				input.addEventListener('input', createMask);
				input.addEventListener('keypress', createMask);
				input.addEventListener('focus', createMask);
				input.addEventListener('blur', createMask);
		});
}

export default mask;