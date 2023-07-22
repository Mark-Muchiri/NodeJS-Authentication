import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import mongoose from "mongoose";
import http from "http";
import cookieParser from "cookie-parser";
import router from './router'

const app = express();

app.use(
	cors({
		credentials: true,
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(1999, () => {
    console.log('hey 😇 👋 The server running on :\n👉 http://localhost:1999/ ✅');
});

const MONGO_URL = 'mongodb+srv://muchirimark2:pbwzlDJWYWfwcTUV@auth.bwuiffn.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.error(error));

app.use('/', router());
