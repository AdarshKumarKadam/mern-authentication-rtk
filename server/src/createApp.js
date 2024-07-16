const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const routes = require("./routes/indexRouter");
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');

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
  
  // CORS configuration
  app.use(cors({
    origin: ["https://mern-authentication-rtk-client.vercel.app"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true
  }));
  
  app.use(cookieParser());
  
  // API routes
  app.use('/api', routes);

	// Health check endpoint
  app.get("/", (req, res) => {
    res.send("Server is ready");
  });

  // Static file serving in production
 //  if (process.env.NODE_ENV === 'production') {

	// const __dirname = path.resolve();
    
 //    // Serve static files from the frontend build directory
 //    app.use(express.static(path.join(__dirname,  '..', 'client', 'dist')));
    
 //    // Serve index.html for any other path to enable client-side routing
 //    app.get('*', (req, res) => {
 //      res.sendFile(path.resolve(__dirname,  '..', 'client', 'dist', 'index.html'));
 //    });
 //  } else {
 //    // Development mode response
 //    app.get("/", (req, res) => {
 //      res.send("Server is ready");
 //    });
 //  }
  
  // Error handling middleware
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
