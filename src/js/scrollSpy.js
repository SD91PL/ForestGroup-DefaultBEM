document.addEventListener('DOMContentLoaded', function () {
	const section = document.querySelectorAll('.spied-scroll')
	const navLinks = document.querySelectorAll('.nav-link')

	window.onscroll = () => {
		section.forEach(sec => {
			let top = window.scrollY
			let offset = sec.offsetTop - 150
			let height = sec.offsetHeight
			let id = sec.getAttribute('id')

			if (top >= offset && top < offset + height) {
				navLinks.forEach(links => {
					links.classList.remove('active')
					document.querySelector('.nav-link[href*=' + id + ']').classList.add('active')
				})
			}
		})
	}
})