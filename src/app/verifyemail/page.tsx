"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verify", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      toast(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  
  return <div>Verify Email</div>;
};

export default VerifyEmail;
