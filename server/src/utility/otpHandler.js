const otpGenerator = require('otp-generator')

const otpStore = new Map();

// Function to generate OTP
const generateOTP =() => {

    const otp = otpGenerator.generate(6, 
        { upperCaseAlphabets: false, 
            specialChars: false ,
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false
        });

    return otp;
}

// Function to store OTP
const storeOTP = (email, otp, expiresInMinutes = 10) => {
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    otpStore.set(email, { otp, expiresAt });
};

// Function to retrieve OTP
const getStoredOTP = (email) => {
    const otpEntry = otpStore.get(email);
    if (otpEntry && otpEntry.expiresAt > new Date()) {
        return otpEntry.otp;
    } else {
        // Remove expired OTP entry from the Map
        otpStore.delete(email);
        return null;
    }
};

// Function to periodically clean up expired OTPs
const cleanupExpiredOTPs = () => {
    const now = new Date();
    for (const [email, otpEntry] of otpStore.entries()) {
        if (otpEntry.expiresAt < now) {
            otpStore.delete(email);
        }
    }
};


// Set up a timer to periodically clean up expired OTPs
setInterval(cleanupExpiredOTPs, 60000 * 30); // Cleanup every half an hour

module.exports = { storeOTP, getStoredOTP, generateOTP };


