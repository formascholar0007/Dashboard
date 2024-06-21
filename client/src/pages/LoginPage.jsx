import React, { useEffect } from 'react';
import googleImg from '../assets/google.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const isUser = useSelector((state) => state.auth.userInfo);

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:3000/login/google';
  };

 
  useEffect(() => {
    if (isUser) {
      navigate('/dashboard');
    }
  }, [isUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">Login Page</h2>
        <button
          className="bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center w-full"
          type="button"
          onClick={loginWithGoogle}
          disabled={!!isUser} 
        >
          <img className="h-6 w-6 mr-2" src={googleImg} alt="Google Icon" />
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;