document.addEventListener('DOMContentLoaded', function () {
	const burgerBtn = document.querySelector('.navbar-toggler')
	const burgerMenu = document.querySelector('.navbar-collapse')

	const toggleMenu = () => {
		burgerMenu.classList.toggle('menu-appear')

		if (burgerMenu.classList.contains('menu-appear')) {
			burgerBtn.innerHTML = '<img src="./dist/img/x.svg" alt="Przycisk do zwijania nawigacji">'
		} else {
			burgerBtn.innerHTML = '<img src="./dist/img/list.svg" alt="Przycisk do rozwijania nawigacji">'
		}
	}

	burgerBtn.addEventListener('click', toggleMenu)
})
