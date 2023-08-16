if(document.querySelector('#main-slider')) {
	const $mainSliderIndexs = Array.from(document.querySelectorAll('.main-slider__text--big'))
	const $mainSliderLengths = Array.from(document.querySelectorAll('.main-slider__length'))
	const mainSlider = new Swiper('#main-slider .swiper', {
		effect: "creative",
		speed: 800,
		creativeEffect: {
			prev: {
				translate: ["-20%", 0, -1]
			},
			next: {
				translate: ["100%", 0, 0],
			},
		},
		navigation: {
			nextEl: '.main-slider__next',
			prevEl: '.main-slider__prev',
		},
		// loop: true
	})

	$mainSliderLengths.forEach(sliderLength => {
		sliderLength.textContent = $mainSliderLengths.length
	})

	const handleSlideChange = () => {
		const { activeIndex } = mainSlider
		$mainSliderIndexs.map(e => {
			e.textContent = activeIndex + 1
		})
	}

	handleSlideChange()
}

/**
 * SITE HEADER
 */
const $siteHeader = document.getElementById('site-header')
let scrollPos = 0

const handleSetBgHeader = () => {
	if(scrollY > 40) {
		$siteHeader.classList.add('site-header--fixed');
		if ((document.body.getBoundingClientRect()).top > scrollPos) {
			$siteHeader.classList.remove('show')
		} else {
			$siteHeader.classList.add('show')
			document.querySelector('.navbar.navbar--show')?.classList?.remove('navbar--show')
		}
  	scrollPos = (document.body.getBoundingClientRect()).top;
	} else {
		$siteHeader.classList.remove('site-header--fixed');
	}
}

handleSetBgHeader()
window.addEventListener('scroll', handleSetBgHeader)

/**
 * TABS
 */
if(document.querySelector('.swiper--tabs')) {
	const swiperTabs = new Swiper('.swiper--tabs', {
		effect: "creative",
		creativeEffect: {
			prev: {
				translate: ["100%", 0, -1]
			},
			next: {
				translate: ["100%", 0, 0],
			},
		},
		autoHeight: true
	})
	
	const $iconsNav = document.querySelector('.icons-nav')
	if($iconsNav) {
		$iconsNav.addEventListener('click', e => {
			if(e.target.classList.contains('icons-nav__item')) {
				e.preventDefault()
				const index = +e.target.getAttribute('href').replace('#', '')
				swiperTabs.slideTo(index)
				$iconsNav.querySelector('.icons-nav__item--active').classList.remove('icons-nav__item--active')
				e.target.classList.add('icons-nav__item--active')
			}
		})
	}
}

/**
 * CARDS SLIDER
 */
if(document.querySelector('.cards-slider')) {
	new Swiper('.cards-slider', {
		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			992: {
				spaceBetween: 30,
				slidesPerView: 2,
				navigation: {
					nextEl: '.cards-slider__buttons-next',
					prevEl: '.cards-slider__buttons-prev',
				},
			}
		},
	})
}

/**
 * GOTOTOP BUTTON
 */
const $gototop = document.getElementById('gototop')
window.addEventListener('scroll', () => {
	if(scrollY > 90) {
		$gototop.classList.add('gototop--visible')
	} else {
		$gototop.classList.remove('gototop--visible')
	}
})

$gototop.addEventListener('click', () => {
	window.scrollTo({
		behavior: 'smooth',
		top: 0
	})
})

/**
 * NAVBAR
 */
const $navbarToggle = document.getElementById('navbar-toggle')
const $navbar = document.getElementById('navbar')

$navbarToggle.addEventListener('click', () => {
	$navbar.classList.toggle('navbar--show')
})

/**
 * MINI NAVIGATION
 * (this code can be optimizated with propagation events)
 */
const $navItemsHasSubNav = document.querySelectorAll('.navbar__item--with-subnav')

$navItemsHasSubNav.forEach($item => {
	$item.addEventListener('click', e => {
		// RESPONSIVE IN JS 💕
		if(matchMedia('(max-width: 993px)').matches && e.target.classList.contains('navbar__item--with-subnav')) {
			e.preventDefault()
		}
		if(e.target.classList.contains('back')) {
			$item.classList.remove('active')
			$navbar.classList.remove('subnav-active')
			return null // 💕
		}
		$item.classList.add('active')
		$navbar.classList.add('subnav-active')
	})
});

/**
 * ANIMACIONES AL HACER SCROLL
 */
AOS.init()