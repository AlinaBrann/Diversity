const dom = require('../utils/DOM');

import ShowHelper2 from '../helpers/ShowHelper2';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { from, gsap } from 'gsap';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function Animations() {
	const delay = 0.5;
	const sections = document.querySelectorAll('.animated-section');
	let scrollSunTl = gsap.timeline();

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

	$('.fp-section.active')
		.find('.animated-title')
		.addClass('_active');
	sections.forEach(section => {
		let imgs = section.querySelectorAll('.animated-image');
		imgs.forEach(img => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top top+=25%',
				toggleClass: {
					targets: img,
					className: '_active',
				},
				markers: false,

				once: true,
			});
		});
		let title = section.querySelector('.animated-title');
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
						0.855,
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
			false,
			55
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
						0.855,
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
			false,
			55
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
						0.855,
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
			false,
			55
		);
	}
	ShowHelper2.start();
}

export default new Animations();
