import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calculater from './modules/calculater';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import collaps from './modules/collaps';
import burger from './modules/burger';
import scrolling from './modules/scrolling';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";

	modals();
	sliders('.main-slider-item', 'vertical');
	sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
	forms();
	mask('[name="phone"]');
	checkTextInputs('[name="name"]');
	checkTextInputs('[name="message"]');
	showMoreStyles('.button-styles', '#styles .row');
	calculater('#size', '#material', '#options', '.promocode', '.calc-price');
	filter();
	pictureSize('.sizes-block');
	collaps('.accordion-heading', '.accordion-block');
	burger('.burger-menu', '.burger');
	scrolling();
});