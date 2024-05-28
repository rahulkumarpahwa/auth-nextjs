"use client";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex items-center justify-center gap-10 my-10">
      <div>
        <Image
          src="/giphy.gif"
          alt="Welcome"
          className="w-72 rounded-lg shadow"
          width={1000}
          height={1000}
          priority
        />
      </div>
    </div>
  );
};

export default Login;
