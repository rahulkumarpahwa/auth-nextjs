"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/router";
import Link from "next/link";

const VerifyEmail = () => {
  // const router = useRouter(); //other option to get query
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verify", { token });
      setError(false);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      toast(error.message);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    //Other way with nextjs to get query
    //const {query}= router;
    //const urlToken = query.token;
    //setToken(urlToken);
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-[30rem] py-2">
      <h1 className="text-2xl my-3">Verify Email</h1>
      <h2 className="text-xl bg-red-500 text-white p-1 rounded-lg">
        {token ? `${token}` : "No Token"}
      </h2>
      <h1 className="text-xl my-3">
        {verified && (
          <div>
            <h2>Verified ✅</h2>
            <Link href="/login">Login</Link>
          </div>
        )}
      </h1>
      <h1 className="text-xl my-3">
        {error && (
          <div>
            <h2>Error</h2>
            <Toaster />
          </div>
        )}
      </h1>
    </div>
  );
};

export default VerifyEmail;
