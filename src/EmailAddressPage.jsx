import {useState} from 'react';
import pana from './assets/pana.svg'
import logo from './assets/logo.png'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const EmailAddressPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useNavigate()
    const baseUrl = import.meta.env.VITE_APP_BASE_URL
    const [loading, setLoading] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const clientId = queryParams.get("id");


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setLoading(false)
        } else {
            setLoading(true)
            setError('');
            try {
                const user =  await axios.post(`${baseUrl}/PasswordRecovery/validate_user`, {
                    clientId: clientId,
                    email: email
                }, {
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY
                    }
                })
                setLoading(false)
                if(user.status === 200){
                    router(`/otp/?email=${email}`)
                }
            }catch(e){
                console.log(e);
                setLoading(false)
            }
        }
    };
    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-[#00C795] text-white hidden md:block">
                <div className="flex flex-col px-32">
                    <p className="text-[52px] font-bold mb-4">SFTSL</p>
                    <p className="text-[17px] mb-8 font-medium ">
                        Monitoring of Non-performing loan accounts <br/> with acceptable standard to maximize recovery<br/> at a
                        reduced Cost
                    </p>
                    <div className="mt-32">
                        <img src={pana} alt="DashboardImage"/>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center p-8">
                <div className="flex flex-col justify-center items-center">
                    <img src={logo} alt={"logo"} className="text-center"/>
                    <h2 className="text-[29px] text-[#00C795] font-bold mb-6">Password Recovery</h2>
                </div>
                <div className="mt-28">
                    <p className="mb-4 font-medium text[18px] text-[#6F8B84]">Enter your email to recover your
                        password</p>
                    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-[#072320] font-medium text-[16px] mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="adekunle.adebona@creditwaveng.com"
                            />
                            {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
                        </div>
                        {loading ? <button
                            type="submit"
                            className="bg-[#00C795] hover:bg-[#00C795] text-white font-semibold text-[18px] py-3 w-full px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submitting
                        </button> : <button
                            type="submit"
                            className="bg-[#00C795] hover:bg-[#00C795] text-white font-semibold text-[18px] py-3 w-full px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Verify Email
                        </button>}
                    </form>
                    <div className="mt-40">
                        <p className='text-[13px] text-[#135D54] font-[500] text-center'>
                            &copy; {new Date().getFullYear()}{" "}
                            <a href="https://sheizfinancials.com/" target="_blank" rel="noreferrer" className="underline hover:text-[#0b3f38]">
                                SFTSL
                            </a>{" "}
                            | All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailAddressPage;