import express from "express";

import { getUsers, deleteUserById } from "./UserController";

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
