if(document.querySelector('#main-slider')) {
	const $mainSliderIndexs = Array.from(document.querySelectorAll('.main-slider__text--big'))
	const $mainSliderLengths = Array.from(document.querySelectorAll('.main-slider__length'))
	const mainSlider = new Swiper('#main-slider .swiper', {
		effect: "creative",
		speed: 800,
		allowTouchMove: false,
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

	mainSlider.on('activeIndexChange', handleSlideChange)

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

/**
 * ACTIVE SECTIONS
 */
const $sections = document.querySelectorAll('.active-on-scroll')
let observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if(entry.isIntersecting) {
			entry.target.classList.add('active')
		}
	})
});

$sections.forEach($section => {
	observer.observe($section)
})

/**
 * BLOG
 */
if(document.querySelector('.l-grid-blog')) {
	var grid = new Muuri('.l-grid-blog', {
		items: '.item',
		visibleStyles: {
	    opacity: '1',
	    transform: 'translateY(0)'
	  }
	});
}

window.addEventListener('load', function () {
  if(document.querySelector('.l-grid-blog')) {
		refreshMuuriLayout();
	}
});

// The best solution for me
const refreshMuuriLayout = () => {
	grid.refreshItems().layout(true);
}

const generatePostTemplate = ({
	image,
	tags,
	title,
	link,
	delay
}) => {
	const postTemplate = `
	<div class="item-content" style="transition-delay: ${ delay }s;"">
	  <a href="${ link }" class="post d-block">
	    <img src="${ image }" class="post__thumbnail wp-post-image" alt="" onload="refreshMuuriLayout()">
	    <div class="post__info">
	      <div class="post__tags">
	      <a class="tag" href="http://strateps.test/categoria/people/" alt="Ver todo sobre people">people</a> <a class="tag" href="http://strateps.test/categoria/photography/" alt="Ver todo sobre photography">photography</a>        </div>
	      	<a href="${ link }">
	          <h3 class="post__title">
	            ${ title }
	           </h3>
	        </a>
	    </div>
	  </a>
	</div>
	`
	const el = document.createElement('article')
	el.classList.add('item')
	el.innerHTML = postTemplate
	return el
}

const showMorePosts = document.getElementById('show_more_posts')

const fetchPosts = async (limit, offset) => {
	const data = await fetch(`http://strateps.test/wp-json/wp/v2/posts?per_page=${limit}&offset=${offset}&_embed`)
	const json = await data.json()

	return json
}

let offset = 6

if(showMorePosts) {
	showMorePosts.addEventListener('click', async e => {
		handleDOMLoadMorePosts()
	})
}

const handleDOMLoadMorePosts = async () => {
	showMorePosts.innerHTML = `
		<span>Cargando publicaciones</span>
		<div class="spinner-border spinner-border-sm ms-3" role="status">
		  <span class="sr-only">Loading...</span>
		</div>
	`

	const posts = await fetchPosts(3, offset)

	if(!posts.length) {
		showMorePosts.innerHTML = 'No hay más publicaciones'
		return null
	}

	offset += 3

	let delay = 0;

	posts.forEach(post => {
		const elementPost = generatePostTemplate({
			image: post._embedded['wp:featuredmedia'].find(el => el.source_url).source_url,
			link: post.link,
			title: post.title.rendered,
			delay,
		})

		delay += .1

		grid.add(elementPost)
	})
	showMorePosts.innerHTML = 'Cargar más publicaciones'
}

/**
 * OTHER GRID
 */
if(document.querySelector('.archive-grid')) {
	var archiveGrid = new Muuri('.archive-grid', {
		items: '.grid-item',
	});
}

window.addEventListener('load', function () {
  if(document.querySelector('.archive-grid')) {
		archiveGrid.refreshItems().layout(true);
	}
});

if(document.querySelector('.portfolio-grid')) {
	var portfolioGrid = new Muuri('.portfolio-grid', {
		items: '.figure'
	});
}

const filterNav = document.getElementById('filternav')

if(filterNav) {
	filterNav.addEventListener('click', e => {
		if(e.target.classList.contains('filter-param')) {
			filter(e.target.textContent)
		}
	})
}

function filter(param) {
	portfolioGrid.filter(function (item) {
		return item.getElement().dataset.categories.includes(param);
	});
}