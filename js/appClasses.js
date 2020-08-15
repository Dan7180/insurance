//**Variables */
const form = document.querySelector('#request-quote');

//instantiate the class
const myUI = new ElementUI();

//**Event Listeners */

(function eventListeners() {
	//when window is loaded
	document.addEventListener('DOMContentLoaded', () => {
		// selectYears.displayYears()
		myUI.displayYears();
	});

	//when form is submitted
	form.addEventListener('submit', function (e) {
		e.preventDefault();

		const carMake = document.getElementById('make').value,
			year = document.getElementById('year').value,
			level = document.querySelector('input[name="level"]:checked').value;

		//check if all fields are filled
		if (carMake === '' || year === '' || level === '') {
			myUI.displayError('All fields are manadatory');
		} else {
			//clear previous quote summary if available
			const prevResult = document.querySelector('#result div');
			if (prevResult) {
				prevResult.remove();
			}

			const insurance = new Quotation(carMake, year, level);
			const price = insurance.calculateQuotation(insurance);
			//print the price
			myUI.displayResults(price, insurance);
		}
	});
})();
