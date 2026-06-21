import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bsp from '../public/backa.png'

const OtpInput = ({ size }) => {
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  async function correctOtp() {
    setError('')
    const ar = inputRefs.current.map((el, index)=>{return (isNaN(parseInt(el.value)) || parseInt(el.value) < 0) ? -1 : parseInt(el.value)})
    for(let i = 0; i < ar.length; i++){
      if(ar[i] === -1){
        setError("Invalid Attempt")
        return;
      }
    }
    const Number = parseInt(ar.join(''))
    const resp = await fetch('https://vendify-backend-service.vercel.app/verifyOtp', {
      method: "POST",
      headers:{"Content-Type" : "application/json"},
      body: JSON.stringify({
        id: localStorage.getItem('hashedId'),
        otp: Number
      })
    })
    const res = await resp.json();
    
    if(res.success){ 
      const token = res.token
      localStorage.setItem('token', token)
      navigate('/')
    }
    else{setError(res.error)}
  }
  
  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (value && index < size - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="bg-Gld p-12 rounded-2xl">
      <div className="h-[20px] mb-4 w-full ">
        <div className=" right-0 top-0 h-full w-[10%]">
          <button className=" w-full h-full" onClick={() => navigate('/signup')}>
            <img src={bsp} alt="" className=" w-full h-full" />
          </button>
        </div>
      </div>
      <div className="font-serif text-3xl font-bold"> Verify your email </div>
      <div className="font-serif text-xl font-bold text-center">Enter OTP</div>
    <br />
    <div className="flex space-x-2 flex justify-center">
      {Array.from({ length: size }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)} // Store refs in array
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          className="w-10 h-10 text-center border border-gray-300 rounded-md"
        />
      ))}
    </div>
    <div className="text-center text-red-500">{error  !== ''? error : null}</div>
    <br></br>
    <div className="transition-all duration-300 hover:h-[40px] bg-black text-white rounded-2xl text-center h-[32px]">
      <button className="h-[100%]" onClick={correctOtp}>
      Submit OTP
      </button>
    </div>
    </div>
  );
};

export default OtpInput;
