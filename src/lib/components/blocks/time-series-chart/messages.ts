export const defaultMessages = {
	empty: "No data in this range yet.",
	noValue: "No data",
	date: "Date",
	peak: "Peak",
	average: "Average",
	showTable: "Show data table",
	hideTable: "Hide data table",
	keyboardHint: "Use the arrow keys to read each value.",
	summary: (title: string, start: string, end: string) =>
		`${title}, from ${start} to ${end}.`,
	seriesSummary: (name: string, low: string, high: string, latest: string) =>
		`${name}: low ${low}, high ${high}, latest ${latest}.`,
};

export type TimeSeriesChartMessages = typeof defaultMessages;
