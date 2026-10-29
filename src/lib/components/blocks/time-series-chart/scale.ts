export interface TimePoint {
	at: Date;
	value: number | null;
}

export interface TimeSeries {
	name: string;
	points: TimePoint[];
}

export interface Position {
	x: number;
	y: number;
}

export function niceStep(span: number, count: number): number {
	const raw = span / Math.max(1, count);
	const magnitude = 10 ** Math.floor(Math.log10(raw));
	const residual = raw / magnitude;
	if (residual > 5) {
		return 10 * magnitude;
	}
	if (residual > 2) {
		return 5 * magnitude;
	}
	if (residual > 1) {
		return 2 * magnitude;
	}
	return magnitude;
}

export function niceTicks(
	minimum: number,
	maximum: number,
	count: number,
): number[] {
	const low = Math.min(0, minimum);
	const high = Math.max(0, maximum) === low ? low + 1 : Math.max(0, maximum);
	const step = niceStep(high - low, count);
	const decimals = Math.max(0, -Math.floor(Math.log10(step)));
	const first = Math.floor(low / step);
	const last = Math.ceil(high / step);
	const ticks: number[] = [];
	for (let index = first; index <= last; index++) {
		ticks.push(Number((index * step).toFixed(decimals)));
	}
	return ticks;
}

export function scaleLinear(
	domain: [number, number],
	range: [number, number],
): (value: number) => number {
	const [domainStart, domainEnd] = domain;
	const [rangeStart, rangeEnd] = range;
	const span = domainEnd - domainStart;
	return (value) =>
		span === 0
			? (rangeStart + rangeEnd) / 2
			: rangeStart + ((value - domainStart) / span) * (rangeEnd - rangeStart);
}

export function columnsOf(series: TimeSeries[]): number[] {
	const times = new Set<number>();
	for (const entry of series) {
		for (const point of entry.points) {
			times.add(point.at.getTime());
		}
	}
	return [...times].sort((first, second) => first - second);
}

export function valueMap(series: TimeSeries): Map<number, number | null> {
	return new Map(
		series.points.map((point) => [point.at.getTime(), point.value]),
	);
}

export function valueExtent(series: TimeSeries[]): [number, number] | null {
	let minimum = Infinity;
	let maximum = -Infinity;
	for (const entry of series) {
		for (const point of entry.points) {
			if (point.value !== null && Number.isFinite(point.value)) {
				minimum = Math.min(minimum, point.value);
				maximum = Math.max(maximum, point.value);
			}
		}
	}
	return minimum === Infinity ? null : [minimum, maximum];
}

export function segmentsOf(points: TimePoint[]): TimePoint[][] {
	const sorted = [...points].sort(
		(first, second) => first.at.getTime() - second.at.getTime(),
	);
	const segments: TimePoint[][] = [];
	let current: TimePoint[] = [];
	for (const point of sorted) {
		if (point.value === null || !Number.isFinite(point.value)) {
			if (current.length) {
				segments.push(current);
			}
			current = [];
		} else {
			current.push(point);
		}
	}
	if (current.length) {
		segments.push(current);
	}
	return segments;
}

export function nearestIndex(times: number[], target: number): number {
	let low = 0;
	let high = times.length - 1;
	while (high - low > 1) {
		const middle = Math.floor((low + high) / 2);
		if ((times[middle] ?? 0) <= target) {
			low = middle;
		} else {
			high = middle;
		}
	}
	const lowDistance = Math.abs(target - (times[low] ?? 0));
	const highDistance = Math.abs((times[high] ?? 0) - target);
	return highDistance < lowDistance ? high : low;
}

export function medianSpacing(times: number[]): number {
	const gaps = times
		.slice(1)
		.map((time, index) => time - (times[index] ?? time))
		.sort((first, second) => first - second);
	return gaps[Math.floor(gaps.length / 2)] ?? 0;
}

export function linePath(positions: Position[]): string {
	return positions
		.map(
			(position, index) =>
				`${index ? "L" : "M"}${position.x.toFixed(1)},${position.y.toFixed(1)}`,
		)
		.join("");
}

export function areaPath(positions: Position[], baseline: number): string {
	const first = positions[0];
	const last = positions.at(-1);
	if (!first || !last) {
		return "";
	}
	return `${linePath(positions)}L${last.x.toFixed(1)},${baseline.toFixed(1)}L${first.x.toFixed(1)},${baseline.toFixed(1)}Z`;
}

export function barPath(
	left: number,
	width: number,
	top: number,
	baseline: number,
): string {
	const height = Math.abs(baseline - top);
	if (height < 0.5 || width <= 0) {
		return "";
	}
	const radius = Math.min(4, width / 2, height);
	const right = left + width;
	const direction = top <= baseline ? 1 : -1;
	const sweep = direction === 1 ? 1 : 0;
	const corner = top + direction * radius;
	return [
		`M${left},${baseline}`,
		`V${corner}`,
		`A${radius},${radius} 0 0 ${sweep} ${left + radius},${top}`,
		`H${right - radius}`,
		`A${radius},${radius} 0 0 ${sweep} ${right},${corner}`,
		`V${baseline}Z`,
	].join("");
}
