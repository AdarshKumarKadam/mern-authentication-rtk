const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

// creating  transporter object using smtp protocol and gmail  account details
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port:process.env.SMTP_PORT,
  secure: true, 
  auth: {
    //   user: "syntiaro.adarsh@gmail.com" ,
    // pass: "zrrblmhozorjrdki"

         user: process.env.EMAIL_ID ,
    pass: process.env.PASSWORD
  }
});


// creating  a helper function to send email  
const sendMail = async (email, otp) => {
  try {
    const mailOptions = {
      from:process.env.EMAIL_ID,
      to: email,
      subject: "Reset Password ✔",
      text: `http://localhost:5173/resetPassword/${otp}`,
    };
    const info = await transporter.sendMail(mailOptions);
    if(!info)throw new Error('Error in sending otp email !')
    console.log('Email sent:', info);
    return info;
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};

module.exports = sendMail;
