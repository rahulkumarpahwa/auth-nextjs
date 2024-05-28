"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [disabledButton, setDisabledButton] = useState(true); //true means initially button is disabled.
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      setDisabledButton(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    //validation based one the empty input
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className="flex  items-center justify-center gap-20">
      <div>
        <Image
          src="/welcomeaboard.gif"
          alt="Welcome"
          className="w-72 rounded-lg shadow"
          width={1000}
          height={1000}
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center h-[30rem] py-2">
        <h1 className="my-1">{loading ? "🪐Processing" : "🔑 Signup"}</h1>
        <div className=" border border-b-white w-20 "></div>
        <input
          className="focus:outline-none border border-gray-600 text-black rounded-md my-2 px-2 py-1"
          placeholder="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })} //most important thing
        />
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
          onClick={onSignup}
          className="border-2 rounded-lg p-1 my-2 hover:text-black hover:bg-white"
        >
          {disabledButton ? "No Signup" : "Signup"}
        </button>
        <Link href="/login" className="hover:underline">
          Visit Login Page
        </Link>
        <Toaster />
      </div>
    </div>
  );
};

export default Signup;
