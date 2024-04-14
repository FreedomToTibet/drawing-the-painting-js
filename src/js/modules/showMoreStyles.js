// we render all images at once
// import {getData} from '../services/requests';

// const showMoreStyles = (trigger, wrapper) => {
// 	const btn = document.querySelector(trigger);
// 	function createCards (response) {
// 		response.forEach(({src, title, link}) => {
// 			let card = document.createElement('div');
// 			card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

// 			card.innerHTML = `
// 				<div class="styles-block">
// 					<img src=${src} alt="style">
// 					<h4>${title}</h4>
// 					<a href=${link}>Details</a>
// 				</div>
// 			`;

// 			document.querySelector(wrapper).appendChild(card);
// 		});
// 	};

// 	btn.addEventListener('click', function() {
// 		getData('https://66163e62b8b8e32ffc7ccc7b.mockapi.io/api/painting/styles')
// 			.then(result => createCards(result))
// 			.catch(error => console.log(error));

// 		this.remove();
// 	});
// };

// export default showMoreStyles;


// we render 4 images at a time
import { getData } from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);
    let remainingData = [];
    let currentIndex = 0;
    const batchSize = 4;

    function createCards(response) {
        response.forEach(({ src, title, link }) => {
            let card = document.createElement('div');
            card.classList.add('animated', 'fadeInUp', 'styles-block');

            card.innerHTML = `
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Details</a>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    };

    function renderNextBatch() {
        const nextBatch = remainingData.slice(currentIndex, currentIndex + batchSize);
        createCards(nextBatch);
        currentIndex += batchSize;

        if (currentIndex >= remainingData.length) {
            btn.remove();
        }
    }

    btn.addEventListener('click', function () {
        if (remainingData.length === 0) {
            getData('https://66163e62b8b8e32ffc7ccc7b.mockapi.io/api/painting/styles')
                .then(result => {
                    remainingData = result;
                    renderNextBatch();
                })
                .catch(error => console.log(error));
        } else {
            renderNextBatch();
        }
    });
};

export default showMoreStyles;


// we render 4 images at a time and we use the shift method to remove the first 4 elements from the array
// import {getData} from '../services/requests';

// const showMoreStyles = (trigger, wrapper) => {
// 	const btn = document.querySelector(trigger);
// 	let data = [];

// 	function createCards () {
// 		for(let i = 0; i < 4; i++) {
// 			if(data.length === 0) {
// 				btn.remove();
// 				break;
// 			}

// 			const {src, title, link} = data.shift();
// 			let card = document.createElement('div');
// 			card.classList.add('animated', 'fadeInUp', 'styles-block');

// 			card.innerHTML = `
// 					<img src=${src} alt="style">
// 					<h4>${title}</h4>
// 					<a href=${link}>Details</a>
// 			`;

// 			document.querySelector(wrapper).appendChild(card);
// 		}
// 	};

// 	btn.addEventListener('click', function() {
// 		if(data.length === 0) {
// 			getData('https://66163e62b8b8e32ffc7ccc7b.mockapi.io/api/painting/styles')
// 				.then(result => {
// 					data = result;
// 					createCards();
// 				})
// 				.catch(error => console.log(error));
// 		} else {
// 			createCards();
// 		}
// 	});
// };

// export default showMoreStyles;

