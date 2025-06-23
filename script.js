const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function ageCalc() {
	let input = document.getElementById("date").value;
	if (!input) {
		alert("Please select a valid date.");
		return;
	}

	let today = new Date();
	let inputDate = new Date(input);

	let birthDetails = {
		date: inputDate.getDate(),
		month: inputDate.getMonth() + 1,
		year: inputDate.getFullYear()
	};

	let currentYear = today.getFullYear();
	let currentMonth = today.getMonth() + 1;
	let currentDate = today.getDate();

	// Check for future date
	if (
		birthDetails.year > currentYear ||
		(birthDetails.year === currentYear && birthDetails.month > currentMonth) ||
		(birthDetails.year === currentYear && birthDetails.month === currentMonth && birthDetails.date > currentDate)
	) {
		alert("Please enter a valid past date.");
		return;
	}

	// Leap year check for current year to adjust February
	leapChecker(currentYear);

	let birthYear = currentYear - birthDetails.year;
	let birthMonth = currentMonth - birthDetails.month;
	let birthDay = currentDate - birthDetails.date;

	// Adjust for negative days
	if (birthDay < 0) {
		birthMonth--;
		let prevMonth = currentMonth - 2;
		if (prevMonth < 0) prevMonth = 11;
		birthDay += months[prevMonth];
	}

	// Adjust for negative months
	if (birthMonth < 0) {
		birthMonth += 12;
		birthYear--;
	}

	display(birthDay, birthMonth, birthYear);
}

function display(day, month, year) {
	document.getElementById("years").textContent = year;
	document.getElementById("months").textContent = month;
	document.getElementById("days").textContent = day;
}

function leapChecker(year) {
	// Leap year condition
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		months[1] = 29;
	} else {
		months[1] = 28;
	}
}
