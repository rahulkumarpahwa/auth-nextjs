"use client";
import Image from "next/image";
import Link from "next/link";

const Header = () =>{
  return (
    <div className="flex justify-between items-center px-8 pt-4 pb-2 shadow shadow-white">
      <Link href={"/"}>
        {" "}
        <div className="flex gap-3 items-center">
          <Image
            src="/favicon.ico"
            alt="Vercel Logo"
            className="dark:invert"
            width={30}
            height={24}
            priority
          />

          <span>Auth App</span>
        </div>{" "}
      </Link>
      <ul className="flex justify-center items-center gap-10">
        <li className="hover:text-black hover:bg-white rounded-lg p-1">
          {" "}
          <Link href={"/"}>Home</Link>
        </li>
        <li className="hover:text-black hover:bg-white rounded-lg p-1">
          <Link href={"/about"}>About</Link>
        </li>
        <li className="hover:text-black hover:bg-white rounded-lg p-1">
          <Link href={"/login"}>Login</Link>
        </li>
        <li className="hover:text-black hover:bg-white rounded-lg p-1">
          <Link href={"/signup"}>Signup</Link>
        </li>
      </ul>
    </div>
  );

};

export default Header