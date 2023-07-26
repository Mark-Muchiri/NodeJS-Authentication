import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../controllers/UserController";

// Can only delete yourself. no other account can delete another account, only the logged in account
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const { id } = req.params;
		const currentUserId = get(req, 'identity._id') as string | undefined;

		if (!currentUserId) {
			return res.sendStatus(403);
		}

		if (currentUserId.toString() !== id) {
			return res.sendStatus(403);
		}

		return next();
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);

	}
};


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const sessionToken = req.cookies["MARK-AUTH"];

		// if token expires
		if (!sessionToken) {
			return res.sendStatus(403).json({ message: "please login again" });
		}

		const existingUser = await getUserBySessionToken(sessionToken);

		if (!existingUser) {
			return res.sendStatus(403).json({ message: "Forbidden" });
		}

		merge(req, { identity: existingUser });

		return next();
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
