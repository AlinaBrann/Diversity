import { TweenMax } from 'gsap';
import { Draggable } from 'gsap/Draggable';
global.TweenMax = TweenMax;
global.$ = global.jQuery = require('jquery');
global.Draggable = Draggable;
require('./utils/jqExtensions');
require('jquery-validation');
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
		if (!localStorage.getItem('visit')) {
			setTimeout(() => {
				preloaderLogo.animate({
					left: left,
					top: top
				}, 1000, function () {
					preloader.removeClass('_visible')
				})
			}, 1000);

			localStorage.setItem('visit', 1);
		} else {
			preloader.removeClass('_visible')
		}



		//console.log($('.innovation-slider-wrapper').width());
		//console.log($('.innovation-slider-wrapper').height());
		// console.log(getRandomInt(0, $('.innovation-slider-wrapper').width()));
		let innovationW = $('.innovation-slider-wrapper').width();
		let innovationH = $('.innovation-slider-wrapper').height();

		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min; //�������� �� ����������, ������� ����������
		}
		setInterval(function () {
			// console.log(getRandomInt(0, innovationW));
			$('.innovation-slider-wrapper .video-section-squares__square').hide;
			$('.innovation_square1').css({ top: getRandomInt(0, innovationH - 80), left: getRandomInt(0, innovationW - 158) });
			$('.innovation_square2').css({ top: getRandomInt(0, innovationH - 80), left: getRandomInt(0, innovationW - 158) });
			$('.innovation-slider-wrapper .video-section-squares__square').show;
			// console.log(getRandomInt(0, innovationH));
		}, 3000);
		//$('video-section-squares__square')


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

		const footerRequest = $('.footer-request__text');
		footerRequest.on('click', function(){
			$(this).parents('.footer-request').toggleClass('_popup-opened');
		});
		$(document).on("mouseup", function(e) {
			const container = $(".footer-request__text");
			const popup = $(".footer-request-popup");
			if (
				(!container.is(e.target) && container.has(e.target).length === 0) &&
				(!popup.is(e.target) && popup.has(e.target).length === 0)
			)
			{
				$('.footer-request').removeClass('_popup-opened');
			}
		});

		$.validator.setDefaults({
			submitHandler: function() {
				$('.footer-request').removeClass('_popup-opened');
				alert("Сообщение отправлено!");
			}
		});

		$('.footer-request-popup__form').validate({
			rules: {
				name: "required",
				mail: {
					required: true,
					email: true
				},
				message: {
					required: true,
					minlength: 2
				},
				rules: {
					required: "#rules:checked"
				}
			},
			focusCleanup: true,
			invalidHandler: function(event, validator) {

				$('.input-error-text').show();
			},
			messages: {
				name: "Пожалуйста, укажите имя",
				mail: {
					required: "Пожалуйста, укажите email",
					email: "Указанный email некорректный"
				},
				message: "Напишите нам, мы все читаем! Не менее 20 букв",
				rules: "Пожалуйста, подтвердите согласие",
			},
			submitHandler: function (form) {
				let $form = $(form);
				let $inputs = $form.find("input, button, textarea");
				let serializedData = $form.serialize();
				let request;
				$inputs.prop("disabled", true).addClass('_loading');
				
				request = $.ajax({
					url: "https://thediversity.ru/api/",
					type: "post",
					data: serializedData
				});
		
				request.done(function (response, textStatus, jqXHR) {
					console.log("Hooray, it worked!");
					$('.footer-request-succes').addClass('_opened');
					$('.footer-request').removeClass('_popup-opened');
				});		
				request.fail(function (jqXHR, textStatus, errorThrown) {
					
				});
				request.always(function () {
					$inputs.prop("disabled", false).removeClass('_loading');
				});
		
			}
		});
		$('.footer-request-succes__close').on('click', function() {
			$(this).parents('.footer-request-succes').removeClass('_opened')
		})
		$(document).on("mouseup", function(e) {
			const popup = $(".footer-request-succes");
			if (!popup.is(e.target) && popup.has(e.target).length === 0)
			{
				popup.removeClass('_opened');
			}
		});

		$('.tabs-content').find('.services-case:not(:first-of-type)').remove();

		var copyright = new Date().getFullYear();
		$('.footer__copyright span').text(copyright);

		// let isIntroHidden = false;
		// $(window).scroll(function() {
		// 	if (isIntroHidden) return;

		// 	const coordY = $('section.video-section').offset().top
		// 	if ($(window).scrollTop() > coordY) {
		// 		$('#intro').hide()
		// 		isIntroHidden = true
		// 		window.scrollTo(0, 0)
		// 	}
		// });

	});

}();

if (module.hot) {
	module.hot.accept();
}
