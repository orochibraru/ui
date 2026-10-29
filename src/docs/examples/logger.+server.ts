import { json, type RequestHandler } from "@sveltejs/kit";

import { Logger } from "#lib/server/logger.js";

const logger = new Logger("Projects");

export const POST: RequestHandler = async ({ request }) => {
	const { name } = await request.json();
	const projectId = `p_${crypto.randomUUID().slice(0, 4)}`;
	logger.info("Project created", { projectId, name });
	return json({ projectId }, { status: 201 });
};
