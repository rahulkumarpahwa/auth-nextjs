"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const About = () => {
  const [data, setData] = useState({
    name: "none",
    html_url: "none",
    avatar_url: "https://avatars.githubusercontent.com/u/56966500?v=4",
    bio: "none",
    twitter_username: "none",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://api.github.com/users/rahulkumarpahwa");
    const json = await data.json();
    // console.log(json);
    setData(json);
  };

  return data != undefined ? (
    <div className="bg-black my-20  h-[30rem]">
      <div className="flex items-center justify-center gap-10">
        <div>
          <h3 className="text-center my-4 text-bold text-sans">Build By :</h3>
          <div className="border border-gray-500 hover:border-white max-w-[17rem] rounded-lg">
            <Link href={data?.html_url ? data.html_url : "none"}>
              <Image
                src={data?.avatar_url}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-tl-lg rounded-tr-lg"
                alt={data?.name}
              />
              <div className="p-2">
                <h2 className="text-xl text-center text-bold ">{data.name}</h2>
                <p className="text-gray-500 hover:text-white">{data.bio}</p>
                <div className="text-gray-500 hover:text-white">
                  X :{" "}
                  <Link
                    href={`https://twitter.com/${data.twitter_username}`}
                    target="_blank"
                  >
                    @rahulkumarpahwa
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-sans font-bold">
            About Us{" "}
          </h2>
          <p className="text-base">
            This is an Authentication App made using Nextjs. There are three
            routes :
            <ul className="ml-4 my-2 space-y-1 list-disc">
              <li>
                {" "}
                <Link href="/login">LogIn</Link>
              </li>
              <li>
                <Link href="/signup">SignUp</Link>
              </li>
              <li>
                <Link href="/About">About</Link>
              </li>
            </ul>
          </p>
          <h2 className="text-bold text-3xl">Features :</h2>
          <ul className="ml-4 space-y-1 list-disc">
            <li> User can SignUp or LogIn.</li>
            <li>After SignUp, user will get an email to verify.</li>
            <li>After Verification, user will LogIn and then see its info.</li>
          </ul>

          <p className="text-bold text-3xl">TechStack : </p>
          <ul className="ml-4 space-y-1 list-disc">
            <li>Nextjs</li>
            <li>TailwindCSS</li>
            <li>TypeScript</li>
            <li>JSX</li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-black mt-36 py-12 h-[40rem] text-center">Loading !</div>
  );
};

export default About;
