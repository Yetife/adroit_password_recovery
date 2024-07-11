import {useEffect, useState} from 'react';
import logo from './assets/logo.svg'
import lock from './assets/lock.svg'
import {useNavigate} from "react-router-dom";
import SuccessModal from "./SuccessModal.jsx";
import axios from "axios";
const OTPVerification = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(300);
    const router = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const baseUrl = import.meta.env.VITE_APP_BASE_URL
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, []);
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (otp.length !== 4 || isNaN(otp)) {
            setError('Please enter a valid 4-digit OTP.');
        } else {
            setLoading(true)
            setError('');
            // Proceed with OTP verification
            try {
                const user =  await axios.post(`${baseUrl}/PasswordRecovery/validate_user_otp`, {
                    clientId: import.meta.env.VITE_APP_CLIENT_ID,
                    email: email,
                    otp: otp
                }, {
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY
                    }
                })
                setLoading(false)
                if(user.status === 200){
                    setShowModal(true);
                }
            }catch(e){
                console.log(e);
                setLoading(false)
            }
        }
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="flex">
            <div className="w-2/6 p-20">
                <button className="bg-[#00C795] hover:bg-[#00C795] rounded text-white font-medium text-[16px] py-2 px-4"
                        onClick={() => router(-1)}>
                    &lt; Back
                </button>
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="mb-8">
                    <img src={logo} alt="CreditWave Logo" className="w-52 mx-auto"/>
                </div>
                <div className="bg-white shadow-md rounded-lg p-8 w-[450px]">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 mx-auto mb-4">
                            <img src={lock} alt="Lock Icon" className="w-full h-full"/>
                        </div>
                        <h2 className="text-[32px] font-bold text-[#135D54]">Enter OTP</h2>
                        <p className="text-[#6F8B84] font-medium text-[14px]">Enter the four (4) digit verification code
                            sent to continue</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <input
                                type="text"
                                value={otp}
                                onChange={handleOtpChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Verification code"
                                maxLength="6"
                            />
                            <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">{formatTime(timer)}</span>
                            {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
                        </div>
                        <div className="flex justify-center mb-4">
                            {
                                loading ? <button
                                    type="submit"
                                    className="bg-[#00C795] hover:bg-[#00C795] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submitting
                                </button> : <button
                                    type="submit"
                                    className="bg-[#00C795] hover:bg-[#00C795] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            }

                        </div>
                    </form>
                    {showModal && <SuccessModal onClose={() => setShowModal(false)}/>}
                </div>
            </div>
        </div>

    );
};

export default OTPVerification;
