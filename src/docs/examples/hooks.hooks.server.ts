import { sequence } from "@sveltejs/kit/hooks";

import { requestLog, unexpectedErrors } from "#lib/server/hooks.js";
import { Logger } from "#lib/server/logger.js";

export const handle = sequence(requestLog(new Logger("Http")));

export const handleError = unexpectedErrors(
	new Logger("Server"),
	"Something went wrong.",
);
