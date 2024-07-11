import React from 'react';

const SuccessModal = ({ onClose }) => {
    const handleRoute = () => {
        onClose
        window.location.href = `${import.meta.env.VITE_APP_ADROIT_URL}/`;

    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[380px]">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <svg width="121" height="120" viewBox="0 0 121 120" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M60.5 120C76.413 120 91.6742 113.679 102.926 102.426C114.179 91.1742 120.5 75.913 120.5 60C120.5 44.087 114.179 28.8258 102.926 17.5736C91.6742 6.32141 76.413 0 60.5 0C44.587 0 29.3258 6.32141 18.0736 17.5736C6.82141 28.8258 0.5 44.087 0.5 60C0.5 75.913 6.82141 91.1742 18.0736 102.426C29.3258 113.679 44.587 120 60.5 120ZM51.7571 84.6H45.6714L26.2143 65.1429L32.3 59.0571L48.7571 75.5143L84.7571 39.4286L90.8429 45.5143L51.7571 84.6Z"
                                  fill="#00C796"/>
                        </svg>
                    </div>
                </div>
                <h2 className="text-center text-[#135D54] text-[28px] font-bold mb-4">Password Recovered
                    Successfully</h2>
                <p className="text-center text-[#6F8B84] text-[14px] font-medium mb-6">Check the email address you provided to access your
                    recovered password.</p>
                <div className="flex justify-center">
                    <button
                        onClick={handleRoute}
                        className="bg-[#00C796] hover:bg-[#00C796] text-white font-bold py-2 px-12 rounded"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
