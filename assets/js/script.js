//Selectors for events

document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Function to calculate results
function calculateResults(e) {
	console.log('Calculating..');
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPmt = document.getElementById('monthly-payment');
	const totalPmt = document.getElementById('total-payment');
	const totalInt = document.getElementById('total-interest');

	// Getting values to be calculated

	const loanAmount = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPmt = parseFloat(years.value) * 12;

	//Montly Payments

	const calc = Math.pow(1 + calculatedInterest, calculatedPmt);
	const month = loanAmount * calc * calculatedInterest / (calc - 1);

	// Method used to check if number is finite or not
	if (isFinite(month)) {
		monthlyPmt.value = month.toFixed(2);
		totalPmt.value = (month * calculatedPmt).toFixed(2);
		totalInt.value = (month * calculatedPmt - loanAmount).toFixed(2);
	} else {
		showError('Check your Numbers');
	}

	e.preventDefault();
}

//Show error
function showError(error) {
	const errorDiv = document.createElement('div');

	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	errorDiv.className = 'alert alert-danger';

	errorDiv.appendChild(document.createTextNode(error));

	//Insert error before heading
	card.insertBefore(errorDiv, heading);

	// Timeout to clear error
	setTimeout(clearError, 3000);
}

function clearError() {
	document.querySelector('.alert').remove();
}
