document.addEventListener('DOMContentLoaded', function () {
	const username = document.querySelector('#username')
	const email = document.querySelector('#email')
	const message = document.querySelector('#msg')
	const sendBtn = document.querySelector('.send')
	const clearBtn = document.querySelector('.clear')
	const popup = document.querySelector('.popup')
	const inputs = [username, email, message]

	const showError = (input, msg) => {
		const formBox = input.parentElement
		const errorMsg = formBox.querySelector('.error-text')

		formBox.classList.add('error')
		errorMsg.textContent = msg
	}

	const clearError = input => {
		const formBox = input.parentElement
		formBox.classList.remove('error')
	}

	const checkForm = input => {
		input.forEach(el => {
			if (el.value === '') {
				showError(el, el.placeholder)
			} else {
				clearError(el)
			}
		})
	}

	const checkLength = (input, min) => {
		if (input.value.length < min) {
			showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków`)
		}
	}

	const checkMail = email => {
		const re = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i

		if (re.test(email.value)) {
			clearError(email)
		} else {
			showError(email, 'E-mail jest niepoprawny')
		}
	}

	const checkErrors = () => {
		const allInputs = document.querySelectorAll('.form-box')
		let errorCount = 0

		allInputs.forEach(el => {
			if (el.classList.contains('error')) {
				errorCount++
			}
		})

		if (errorCount === 0) {
			popup.classList.add('show-popup')
		}
	}

	sendBtn.addEventListener('click', e => {
		e.preventDefault()
		checkForm(inputs)
		checkLength(username, 3)
		checkLength(message, 15)
		checkMail(email)
		checkErrors()
	})

	clearBtn.addEventListener('click', e => {
		e.preventDefault()
		inputs.forEach(el => {
			el.value = ''
			clearError(el) // OPTIONAL
		})
	})
})

// part 1
// clearBtn.ade

// part 2
// in checkForm the "input" parameter it's array "inputs" from sendBtn.ade
// in showError the "input" parameter it's "el" from checkForm
// in showError the "msg" parameter it's "el.placeholder" from checkForm
// in clearError the "input" parameter it's "el" from checkForm

// part 3
// checkLength // minimum 3 characters

// part 4
//checkMail, - RegExp Regex Email, test()

// part 5
// checkErrors
