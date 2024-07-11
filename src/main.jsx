import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import EmailAddressPage from "./EmailAddressPage.jsx";
import OTPVerification from "./OTPVerification.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <EmailAddressPage />
    },
    {
        path: "/otp",
        element: <OTPVerification />
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
