/*
  API = https://date.nager.at/Api
  1. Public Holidays Fetch
  */

// 1. Public Holidays Fetch

// Get textfield and input button with querySelector and assign them to respective buttons
let holidayText = document.querySelector('#holidayText')
let holidayBtn = document.querySelector('#getHoliday')

// Add a event listener to the input button, it listens for a "click" event and executes a function when that happens
holidayBtn.addEventListener('click', searchHolidays)

// Add an event listener to the input field for the "Enter" key
holidayText.addEventListener('keyup', function (event) {
    // Check if the pressed key is the "Enter" key (key code 13)
    if (event.key === 'Enter') {
        // Trigger the search function when the "Enter" key is pressed
        searchHolidays()
    }
})

// Search holiday function, function that is called by holidayBtn
function searchHolidays() {
    // Clear the previous search results
    let holidayBox = document.querySelector('#holidayBox')
    holidayBox.innerHTML = ''

    // make a GET fetch request to the api with a query
    fetch(
        `https://date.nager.at/api/v3/PublicHolidays/2022/${holidayText.value}`
    )
        .then((response) => {
            // Error message
            if (!response.ok) {
                throw Error('Error!')
            }
            // return json
            return response.json()
        })
        // Handle the data we have received
        .then((data) => {
            // ForEach, creates a header for each item in the array
            data.forEach((country) => {
                let newElement = document.createElement('h3')
                newElement.innerHTML = `
            ${country.localName}<br> <strong>${country.date}</strong>
          `

                // Append the newly created element to holidayBox
                holidayBox.appendChild(newElement)
            })
        })
        .catch((error) => {
            // Catch to handle errors
            console.log(error)
        })
}
