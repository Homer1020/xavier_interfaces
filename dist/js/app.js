const $mainSliderIndexs = Array.from(document.querySelectorAll('.main-slider__text--big'))
const mainSlider = new Swiper('#main-slider .swiper', {
	effect: "creative",
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

const handleSlideChange = () => {
	const { activeIndex } = mainSlider
	$mainSliderIndexs.map(e => {
		e.textContent= activeIndex + 1
	})
}

handleSlideChange()
mainSlider.on('activeIndexChange', handleSlideChange)

/**
 * SITE HEADER
 */
const $siteHeader = document.getElementById('site-header')
let scrollPos = 0

const handleSetBgHeader = () => {
	if(scrollY > 40) {
		$siteHeader.classList.add('site-header--fixed');
		if ((document.body.getBoundingClientRect()).top > scrollPos)
			$siteHeader.classList.remove('show')
		else
			$siteHeader.classList.add('show')
  	scrollPos = (document.body.getBoundingClientRect()).top;
	} else {
		$siteHeader.classList.remove('site-header--fixed');
	}
}

handleSetBgHeader()
window.addEventListener('scroll', handleSetBgHeader)