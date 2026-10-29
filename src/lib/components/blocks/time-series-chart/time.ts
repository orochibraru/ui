export type TimeUnit = "minute" | "hour" | "day" | "month" | "year";

const minute = 60_000;
const hour = 60 * minute;
const day = 24 * hour;

const intervals: { unit: TimeUnit; step: number; length: number }[] = [
	{ unit: "minute", step: 1, length: minute },
	{ unit: "minute", step: 5, length: 5 * minute },
	{ unit: "minute", step: 15, length: 15 * minute },
	{ unit: "minute", step: 30, length: 30 * minute },
	{ unit: "hour", step: 1, length: hour },
	{ unit: "hour", step: 3, length: 3 * hour },
	{ unit: "hour", step: 6, length: 6 * hour },
	{ unit: "hour", step: 12, length: 12 * hour },
	{ unit: "day", step: 1, length: day },
	{ unit: "day", step: 2, length: 2 * day },
	{ unit: "day", step: 7, length: 7 * day },
	{ unit: "day", step: 14, length: 14 * day },
	{ unit: "month", step: 1, length: 30 * day },
	{ unit: "month", step: 3, length: 91 * day },
	{ unit: "month", step: 6, length: 182 * day },
	{ unit: "year", step: 1, length: 365 * day },
	{ unit: "year", step: 2, length: 730 * day },
	{ unit: "year", step: 5, length: 1826 * day },
	{ unit: "year", step: 10, length: 3652 * day },
];

function floorTo(date: Date, unit: TimeUnit, step: number): Date {
	const result = new Date(date);
	if (unit === "minute") {
		result.setMinutes(Math.floor(result.getMinutes() / step) * step, 0, 0);
		return result;
	}
	if (unit === "hour") {
		result.setHours(Math.floor(result.getHours() / step) * step, 0, 0, 0);
		return result;
	}
	result.setHours(0, 0, 0, 0);
	if (unit === "month") {
		result.setMonth(Math.floor(result.getMonth() / step) * step, 1);
	}
	if (unit === "year") {
		result.setFullYear(Math.floor(result.getFullYear() / step) * step, 0, 1);
	}
	return result;
}

function advance(date: Date, unit: TimeUnit, step: number): Date {
	const result = new Date(date);
	if (unit === "minute") {
		result.setMinutes(result.getMinutes() + step);
	} else if (unit === "hour") {
		result.setHours(result.getHours() + step);
	} else if (unit === "day") {
		result.setDate(result.getDate() + step);
	} else if (unit === "month") {
		result.setMonth(result.getMonth() + step);
	} else {
		result.setFullYear(result.getFullYear() + step);
	}
	return result;
}

export function timeTicks(
	start: Date,
	end: Date,
	maximum: number,
): { ticks: Date[]; unit: TimeUnit } {
	const span = Math.max(0, end.getTime() - start.getTime());
	const { unit, step } = intervals.find(
		(candidate) => span / candidate.length <= maximum,
	) ?? { unit: "year", step: Math.ceil(span / (365 * day) / maximum) };
	const ticks: Date[] = [];
	let tick = floorTo(start, unit, step);
	while (tick.getTime() <= end.getTime() && ticks.length <= maximum + 2) {
		if (tick.getTime() >= start.getTime()) {
			ticks.push(tick);
		}
		tick = advance(tick, unit, step);
	}
	return { ticks, unit };
}

export function formatTick(date: Date, unit: TimeUnit): string {
	const midnight =
		date.getHours() === 0 && date.getMinutes() === 0 && unit !== "minute";
	const options: Intl.DateTimeFormatOptions =
		unit === "year"
			? { year: "numeric" }
			: unit === "month"
				? date.getMonth() === 0
					? { month: "short", year: "numeric" }
					: { month: "short" }
				: unit === "day" || midnight
					? { day: "numeric", month: "short" }
					: { hour: "numeric", minute: "2-digit" };
	return new Intl.DateTimeFormat(undefined, options).format(date);
}

export function formatInstant(date: Date, spacing: number): string {
	const options: Intl.DateTimeFormatOptions =
		spacing > 0 && spacing < day
			? { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }
			: spacing >= 28 * day
				? { month: "long", year: "numeric" }
				: { weekday: "short", day: "numeric", month: "short", year: "numeric" };
	return new Intl.DateTimeFormat(undefined, options).format(date);
}
