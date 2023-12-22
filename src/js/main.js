import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";

	// let modalState = {
	// 	form: 0,
	// 	type: "Cold"
	// };

	// let deadline = '2024-01-15';

	// changeModalState(modalState);
	modals();
	sliders('.main-slider-item', 'vertical');
	sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
	forms();
	mask('[name="phone"]');
	checkTextInputs('[name="name"]');
	checkTextInputs('[name="message"]');
	// tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'activ');
	// tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
	// tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
	// forms(modalState);
	// timer('.container1', deadline);
	// images();
});