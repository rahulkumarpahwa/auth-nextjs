"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true); //true means initially button is disabled.

  const onLogin = async () => {
    try {
      setLoading(true);
      setDisabledButton(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed");
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    //validation based one the empty input
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center gap-20 my-10">
      <div>
        <Image
          src="/giphy.gif"
          alt="Welcome"
          className="w-72 rounded-lg shadow"
          width={1000}
          height={1000}
          priority
          unoptimized
        />
      </div>
      <div className="flex flex-col items-center justify-center h-[25rem] py-2">
        <h1 className="my-1">{loading ? "🪐Processing" : "🔐 Login"}</h1>
        <div className=" border border-b-white w-20 "></div>
        <input
          className="focus:outline-none border border-gray-600 text-black rounded-md my-2 px-2 py-1"
          placeholder="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })} //most important thing
        />
        <input
          className="focus:outline-none border border-gray-600 text-black rounded-md my-2 px-2 py-1"
          placeholder="password"
          type="text"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })} //most important thing
        />
        <button
          onClick={onLogin}
          className="border-2 rounded-lg p-1 my-2 hover:text-black hover:bg-white"
        >
          {disabledButton ? "No Login" : "Login"}
        </button>
        <Link href="/signup" className="hover:underline">
          Visit Signup Page
        </Link>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
