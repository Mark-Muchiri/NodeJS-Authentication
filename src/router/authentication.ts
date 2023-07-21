import express from "express";

import { register } from "../controllers/UserController";

export default (router: express.Router) => {
	router.post("/auth/register", register);
};
