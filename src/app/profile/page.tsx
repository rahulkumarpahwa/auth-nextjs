"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";  
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Profile = () => {
  const router = useRouter();
  const [data, setData]: any = useState();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const res: any = await axios.post("/api/users/me");
      setData(res.data.data);
      console.log(res);
      toast.success(res.message);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/");
      toast.success("User Logout Successfully!");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center gap-20">
      <Image
        src="/goback.webp"
        alt="Welcome"
        className="w-72 rounded-lg shadow"
        width={1000}
        height={1000}
        priority
        unoptimized
      />

      <div className="flex flex-col items-center justify-center h-[25rem] py-2 gap-5">
        <h2>User Details </h2>
        {data != undefined && (
          <div className="flex flex-col gap-3 ">
            <div className="border border-gray-400 rounded-lg p-1 hover:text-black hover:bg-white">
              Id : <Link href={`/profile/${data._id}`}>{data._id}</Link>
            </div>
            ( click to go here!! )
            <div className="border border-gray-400 rounded-lg p-1">
              Username : {data.username}
            </div>
            <div
              className="border border-gray-400 rounded-lg p-1"
              onMouseOver={() => {
                setHide(true);
              }}
              onMouseOut={() => {
                setHide(false);
              }}
            >
              Email : {hide ? data.email : "●●●●●●●●●●●●●●"}
            </div>{" "}
            ( hover to see!! )
          </div>
        )}
        <button
          className="my-2 border p-1 rounded-md hover:bg-white hover:text-black"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Profile;
