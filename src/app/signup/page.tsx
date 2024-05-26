"use client";
import { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState({
    username : "",
    password : "",
    email: "",
  });
  return <div>SignUp Page</div>;
};

export default Signup;
