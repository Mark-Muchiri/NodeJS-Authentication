import express from "express";

import { getUsers, deleteUserById, getUserById } from "./UserController";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
	try {
		const users = await getUsers();

		return res.status(200).json(users);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		if (typeof id !== 'string') {
			return res.status(400).json({ error: 'Invalid ID parameter' });
		}

		const deletedUser = await deleteUserById(id);

		return res.json(deletedUser);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};

export const updateUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const { username } = req.body;

		// to ensure `id` is provided and not unidentified
		if (!id) {
			return res.sendStatus(400);
		}

		if (!username) {
			return res.sendStatus(400);
		}

		const user = await getUserById(id);

		if (!user) {
			return res.sendStatus(404); // Or return an appropriate response when the user is not found
		}

		user.username = username;

		await user?.save();

		return res.status(200).json(user).end();
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);

	}
};