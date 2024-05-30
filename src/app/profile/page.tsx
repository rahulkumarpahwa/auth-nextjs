"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const getUserData = async () => {
    try {
      const res: any = await axios.post("/api/users/me");
      setData(res.data._id);
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
  return <div>profile</div>;
};
export default Profile;
