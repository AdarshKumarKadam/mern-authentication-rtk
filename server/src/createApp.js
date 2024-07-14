const express = require("express");
const cors = require("cors");
const helmet= require('helmet')
const cookieParser = require("cookie-parser");
const routes = require("./routes/indexRouter");
const  {notFound} =require('./middlewares/errorMiddleware');
 const {errorHandler} =require('./middlewares/errorMiddleware')
 const path = require('path')


function createApp() {
	const app = express();
	app.use(express.json());
	// Use Helmet middleware with Content Security Policy (CSP) directives
	app.use(
		helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: ["'self'"],
				connectSrc: ["'self'", "http://localhost:3000"],
				styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // Allow styles from Google Fonts
			},
		})
	);
	app.use(cors({
		origin: ["http://localhost:5173"],
		methods: ["POST", "GET", "PATCH","DELETE"],
		credentials: true
	}));
	app.use(cookieParser());
	app.use('/api',routes);
	if (process.env.NODE_ENV === 'production') {
		const __dirname = path.resolve()
		app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
		app.get('*', (req, res) => {
		  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
		})
	  } else {
		app.get("/", (req, res) => {
		  res.send("Server is ready")
		})
	  }
	  

	app.use(notFound);
	app.use(errorHandler);

	return app;
}
module.exports = createApp;