//**Variables */
const form = document.querySelector('#request-quote');

//instantiate the object
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

//**objects */
function ElementUI() {}

function Quotation(carMake, manufactureYear, protectionLevel) {
	this.carMake = carMake;
	this.year = manufactureYear;
	this.level = protectionLevel;
}

//**prototypes */

//calculate price
Quotation.prototype.calculateQuotation = function (insurance) {
	let price;
	let base = 2000;

	/* 
    1 = American 15%
    2 = Asian 5%
    3.= European 35%
    */

	//get car make
	const make = insurance.carMake;

	switch (make) {
		case '1':
			price = base + base * (15 / 100);
			break;
		case '2':
			price = base + base * (5 / 100);
			break;
		case '3':
			price = base + base * (35 / 100);
			break;
		// default:
	}

	//get year
	const year = insurance.year;

	const differenceInYears = this.getYearDifference(year);

	//every year insurance is 3% cheaper
	price = price - (differenceInYears * 3 * price) / 100;

	//use level of protection
	const level = insurance.level;

	price = this.calculateLevel(price, level);

	return price;
};

//get difference between current year and car manufacture year
Quotation.prototype.getYearDifference = (year) => {
	const currentYear = new Date().getFullYear();

	return currentYear - year;
};

Quotation.prototype.calculateLevel = function (price, level) {
	/*
    Basic = increase value by 30%
    complete = increase value by 50%
     */

	if (level === 'basic') {
		price = price * 1.3;
	} else {
		price = price * 1.5;
	}

	return price;
};

//last 20 years from current date
ElementUI.prototype.displayYears = function () {
	const currentYear = new Date().getFullYear(),
		lastAcceptedYear = currentYear - 20;

	//** create the options list of years to display*/
	const yearsDropdown = document.querySelector('#year');

	for (let i = currentYear; i >= lastAcceptedYear; i--) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		yearsDropdown.appendChild(option);
	}
};

//prints error messages
ElementUI.prototype.displayError = function (message) {
	//create a div element
	const div = document.createElement('div');
	//add a class
	div.classList.add('error');
	div.innerHTML = `<p>${message}</p>`;

	const elem = document.querySelector('.data-1');
	form.insertBefore(div, elem);

	//remove error after 3 seconds
	setTimeout(() => {
		document.querySelector('.error').remove();
	}, 3000);
};

//prints the final result
ElementUI.prototype.displayResults = function (price, insurance) {
	const result = document.getElementById('result');

	//get car make
	let make = insurance.carMake;
	switch (make) {
		case '1':
			make = 'American';
			break;
		case '2':
			make = 'Asian';
			break;
		case '3':
			make = 'European';
			break;
	}

	//create a div
	const div = document.createElement('div');

	div.innerHTML = `
    <p class="header">Summary</p>
    <p>make: ${make}</p>
    <p>Year: ${insurance.year}</p>
    <p>Level: ${insurance.level}</p>
    <p class="total">$${price}</p>
    `;

	const spinner = document.querySelector('#loading img');
	spinner.style.display = 'block';
	spinner.style.margin = '0 auto';

	setTimeout(() => {
		spinner.style.display = 'none';
		result.appendChild(div);
	}, 3000);
};
