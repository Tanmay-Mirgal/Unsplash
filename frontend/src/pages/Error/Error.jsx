import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation

const ErrorPage = () => {
  const [message, setMessage] = useState("--ERROR: 401_[UNAUTHORIZED]-- ");
  const [opacity, setOpacity] = useState(0.5);
  const [t, setT] = useState(0);

  const navigate = useNavigate(); // Initialize the navigate function

  const shuffle = (str) => {
    const caps = str.toUpperCase();
    const char = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newMessage = "";
    
    for (let n = 0; n < caps.length; n++) {
      const calc = Math.floor(Math.random() * char.length);
      newMessage += n === 0 ? caps.charAt(0) : (t >= 0 + n * 2 ? caps.charAt(n) : char.charAt(calc));
    }
    setMessage(newMessage);
    setOpacity(0.5 + 1 / (caps.length * 2));
    setT(t + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      shuffle("--ERROR: 404_[NOT FOUND]-- -INVALID URL ENTERED-");
    }, 50);

    return () => clearInterval(interval);
  }, [t]);

  const reload = () => {
    window.location.reload();
  };

  const goHome = () => {
    navigate('/'); // Navigates to the home page
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-full flex justify-center items-center bg-black z-50">
      <div className="flex flex-col justify-center items-center w-80 space-y-4">
        <div
          id="str"
          onClick={reload}
          className="text-white text-3xl font-bold text-center"
          style={{ opacity: opacity, animation: 'anim 2.5s infinite ease' }}
        >
          {message}
        </div>

        {/* Small button to navigate to home page */}
        <button 
          onClick={goHome} 
          className="bg-black text-white px-4 py-2 hover:underline opacity-30"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
