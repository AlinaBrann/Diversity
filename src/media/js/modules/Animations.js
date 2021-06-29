const dom = require('../utils/DOM');

import ShowHelper2 from '../helpers/ShowHelper2';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { from, gsap } from 'gsap';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function Animations() {
	const delay = 0.7;
	const sections = document.querySelectorAll('.animated-section');
	let scrollSunTl = gsap.timeline();

	var anchor = '[data-anchor]';
	dom.$body.on('click', anchor, function(event) {
		event.preventDefault();
		var $this = $(this),
			href = '#' + $this.data('anchor');
		gsap.to(window, {
			duration: 2,
			scrollTo: {
				y: href,
			},
		});
		return false;
	});
	const $targetsAnimatedText = $('[data-animated-text]');
	if ($targetsAnimatedText.length) {
		TweenMax.set($targetsAnimatedText, {
			alpha: 0,
		});
		ShowHelper2.staggerWatch(
			$targetsAnimatedText,
			function(state, target) {
				if (state) {
					let targetDelayAttr = target.getAttribute('data-delay');
					let targetDelay;
					if (targetDelayAttr) {
						targetDelay = targetDelayAttr;
					} else {
						targetDelayAttr = delay;
					}
					target.removeAttribute('data-animated-text');
					ShowHelper2.unwatch(target);
					TweenMax.fromTo(
						target,
						0.855,
						{
							x: -55,
							alpha: 0,
						},
						{
							x: 0,
							alpha: 1,
							force3D: true,
							delay: targetDelay,
							clearProps: 'all',
						}
					);
					const animatedText = target.querySelectorAll('[data-animated-part]');
					gsap.timeline({
						scrollTrigger: {
							trigger: target,
							once: true,
							toggleClass: {
								targets: animatedText,
								className: '_active',
							},
						},
					});
				}
			},
			true,
			false,
			55
		);
	}
	scrollSunTl.to('.video-section', {
		scrollTrigger: {
			trigger: '.video-section',
			start: 'top+=30 center',
			once: true,
			toggleClass: {
				targets: '.video-section',
				className: '_active',
			},
			markers: false,
		},
	});

	let headerTrigger = document.querySelectorAll('[data-header-trigger]');
	headerTrigger.forEach(block => {
		ScrollTrigger.create({
			trigger: block,
			start: 'top top',
			end: 'bottom top',
			toggleClass: {
				targets: '.header',
				className: '_white',
			},
			markers: false,
		});
	});
	sections.forEach(section => {
		let animatedBlock = section.querySelectorAll('.animated-block');
		animatedBlock.forEach(block => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top top+=50%',
				end: 'bottom bottom',
				toggleClass: {
					targets: block,
					className: '_active',
				},
				markers: false,
				once: true,
			});
		});
	});
	let animatedCase = document.querySelectorAll('.case');
	animatedCase.forEach(block => {
		ScrollTrigger.create({
			trigger: block,
			start: 'top top+=70%',
			end: 'bottom bottom',
			toggleClass: {
				targets: block,
				className: '_active',
			},
			markers: false,
			once: true,
		});
	});
	ShowHelper2.setViewpostScale(1);

	const $targets = $('[data-auto-show]');
	if ($targets.length) {
		TweenMax.set($targets, {
			alpha: 0,
		});

		ShowHelper2.staggerWatch(
			$targets,
			function(state, target) {
				if (state) {
					target.removeAttribute('data-auto-show');

					ShowHelper2.unwatch(target);
					TweenMax.fromTo(
						target,
						0.9,
						{
							y: 15,
							alpha: 0,
						},
						{
							y: 0,
							alpha: 1,
							force3D: true,
							delay: delay,
							clearProps: 'all',
						}
					);
				}
			},
			true,
			true,
			15
		);
	}

	const $targetsRight = $('[data-auto-show-right]');
	if ($targetsRight.length) {
		TweenMax.set($targetsRight, {
			alpha: 0,
		});
		ShowHelper2.staggerWatch(
			$targetsRight,
			function(state, target) {
				if (state) {
					target.removeAttribute('data-auto-show-right');
					ShowHelper2.unwatch(target);
					TweenMax.fromTo(
						target,
						0.9,
						{
							x: 15,
							alpha: 0,
						},
						{
							x: 0,
							alpha: 1,
							force3D: true,
							delay: delay,
							clearProps: 'all',
						}
					);
				}
			},
			true,
			true,
			15
		);
	}
	const $targetsLeft = $('[data-auto-show-left]');

	if ($targetsLeft.length) {
		TweenMax.set($targetsLeft, {
			alpha: 0,
		});
		ShowHelper2.staggerWatch(
			$targetsLeft,
			function(state, target) {
				if (state) {
					target.removeAttribute('data-auto-show-left');
					ShowHelper2.unwatch(target);
					TweenMax.fromTo(
						target,
						0.9,
						{
							x: -55,
							alpha: 0,
						},
						{
							x: 0,
							alpha: 1,
							force3D: true,
							delay: delay,
							clearProps: 'all',
						}
					);
				}
			},
			true,
			true,
			15
		);
	}
	ShowHelper2.start();

	let lastScrollTop = 0;
	dom.$window.on('scroll', function() {
		let scrollTop = $(this).scrollTop();
		if (scrollTop > lastScrollTop) {
			$('.header').addClass('_onscroll');
		} else {
			$('.header').removeClass('_onscroll');
		}
		lastScrollTop = scrollTop;
	});
}

export default new Animations();
