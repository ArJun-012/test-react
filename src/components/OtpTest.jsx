import React, { useState } from 'react';
import OTPVerifyPopup from './OTPVerifyPopup';

function OtpTest() {
    const [showPopup, setShowPopup] = useState(true);

    const handleVerify = (otp) => {
        console.log('OTP entered:', otp);
        setShowPopup(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Open OTP Popup
        </button>

        <OTPVerifyPopup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            email="uiuxmadhura@gmail.com"
            onVerify={handleVerify}
        />
        </div>
    );
}

export default OtpTest;
