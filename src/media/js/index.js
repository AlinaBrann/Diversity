import { TweenMax } from 'gsap';
import { Draggable } from 'gsap/Draggable';
global.TweenMax = TweenMax;
global.$ = global.jQuery = require('jquery');
global.Draggable = Draggable;
require('./utils/jqExtensions');
require('slick-carousel');

import TextFill from 'textfilljs';
// prettier-ignore
global.ProjectName = new function ProjectName() { // eslint-disable-line
	this.env = require('./utils/ENV');
	this.dom = require('./utils/DOM');
	this.utils = require('./utils/Utils');

	this.classes = {
		Callback: require('./classes/Callback')
	};

	this.helpers = {};
	this.modules = {
		Popups: require('./modules/Popups'),
		Tabs: require('./modules/Tabs'),
		Animations: require('./modules/Animations'),
		SlickSliders: require('./modules/SlickSliders'),
	};

	// Startup
	$(() => {
		// Remove _loading modificator
		this.dom.$html.removeClass('_loading');
		
		const headerLogo = document.querySelector('.header-logo');
		let top = headerLogo.getBoundingClientRect().top
		let left = headerLogo.getBoundingClientRect().left
		const preloader = $('.preloader')
		const preloaderLogo = $('.preloader__logo')
		setTimeout(() => {
			preloaderLogo.animate({
				left: left,
				top: top
			}, 1000, function() {
				preloader.removeClass('_visible')
			})
		}, 1000);

		const menu = $('.header-menu-button');
		menu.on('click', function(){
			$(this).parents('.header').addClass('_menu-opened');
		});
		
		const menuCloser = $('[data-menu-closer]');
		menuCloser.on('click', function(){
			$(this).parents('.header').removeClass('_menu-opened');
		});
		
		
		let textFit = document.querySelectorAll(".facts-slide-childslider__title")
		textFit.forEach((text) => {
			TextFill(text,{
				maxFontPixels: 220
			  });
		})
		
		$('.tabs-content').find('.services-case:not(:first-of-type)').remove();

		var copyright = new Date().getFullYear();
		$('.footer__copyright span').text(copyright);
		
	});
	
}();

if (module.hot) {
	module.hot.accept();
}
