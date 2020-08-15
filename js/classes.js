//**classes */

class Quotation {
	constructor(carMake, manufactureYear, protectionLevel) {
		this.carMake = carMake;
		this.year = manufactureYear;
		this.level = protectionLevel;
	}

	//calculate price
	calculateQuotation(insurance) {
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
	}

	//get difference between current year and car manufacture year
	getYearDifference(year) {
		const currentYear = new Date().getFullYear();

		return currentYear - year;
	}

	calculateLevel(price, level) {
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
	}
}

class ElementUI {
	//last 20 years from current date
	displayYears() {
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
	}

	//prints error messages
	displayError(message) {
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
	}

	//prints the final result
	displayResults(price, insurance) {
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
	}
}
