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

		function offset(el) {
			var rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
		
		// example use
		let headerLogo = document.querySelector('.header-logo');
		let logoOffset = offset(headerLogo);
		
		let preloader = $('.preloader')
		let preloaderLogo = $('.preloader__logo')
		setTimeout(() => {
			preloaderLogo.animate({
				left: logoOffset.left,
				top: logoOffset.top
			}, 1000, function() {
				preloader.removeClass('_visible')
			})
		}, 1000);

		var menu = $('.header-menu-button');
		menu.on('click', function(){
			$(this).parents('.header').toggleClass('_menu-opened');
		});
		
		// let array = document.querySelectorAll('.video-section-squares__square')
		// let size = 4; //размер подмассива

		// for (let i = 0; i <Math.ceil(array.length/size); i++){
		// 	for (let index = 0; index < 4; index++) {
		// 		array[(i*size + index)].css('transition-delay',(i*size) + size + 's')
				
		// 	}
		// }
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
