console.log('Client side js file is loaded')
const formElement = document.querySelector('form')
const inputElement = document.querySelector('input')
const message1 = document.getElementById('1')
const message2 = document.getElementById('2')
const message3 = document.getElementById('3')

formElement.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = inputElement.value
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error
      } else {
        message1.textContent = data.latitude
        message2.textContent = data.longitude
        message3.textContent = data.location
      }
    })
  })
})
