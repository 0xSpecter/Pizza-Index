export function startOfDay(date: Date): Date {
	const start = new Date(date);
	start.setHours(0, 0, 0, 0);
	return start;
}

// Weeks start on Monday.
export function startOfWeek(date: Date): Date {
	const start = startOfDay(date);
	start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
	return start;
}

export function startOfMonth(date: Date): Date {
	const start = startOfDay(date);
	start.setDate(1);
	return start;
}

export function addDays(date: Date, days: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export function addMonths(date: Date, months: number): Date {
	const result = new Date(date);
	result.setMonth(result.getMonth() + months);
	return result;
}
