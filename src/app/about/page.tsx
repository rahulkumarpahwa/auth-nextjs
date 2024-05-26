"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const About = () => {
  const [data, setData] = useState({
    name: "none",
    html_url: "none",
    avatar_url: "https://avatars.githubusercontent.com/u/56966500?v=4",
    bio: "none",
    twitter_username: "none",
  });

  const fetchData = async () => {
    const data = await fetch("https://api.github.com/users/rahulkumarpahwa");
    const json = await data.json();
    // console.log(json);
    setData(json);
  };

  fetchData();

  return data != undefined ? (
    <div className="bg-black my-20 mb-10  h-[40rem]">
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
            This is an Authentication App made using Nextjs + TypeScript. There are three routes : 
            <div className="grid grid-cols-4 gap-2 my-2">
              <div className="border border-gray-500 p-2 rounded-lg">
                <h2 className="text-center text-bold">Home Page</h2>
                <ul className="ml-4 my-2 space-y-2 list-disc">
                  <li>Featured Courses</li>
                  <li>Why Choose Us?</li>
                  <li>Student Testimonials</li>
                  <li>Featured Webinars</li>
                  <li>Music Instructors</li>
                </ul>
              </div>
              <div className="border border-gray-500 p-2 rounded-lg">
                <h2 className="text-center text-bold">Our Courses</h2>
                <ul className="ml-4 my-2 space-y-2 list-disc">
                  <li>Guitar Fundamentals</li>
                  <li>Piano for Beginners</li>
                  <li>Advanced Vocal Techniques</li>
                  <li>Drumming Mastery</li>
                  <li>And More...</li>
                </ul>
              </div>
              <div className="border border-gray-500 p-2 rounded-lg">
                <h2 className="text-center text-bold">Contact Us</h2>
                <ul className="ml-4 my-2 space-y-2 list-disc">
                  <li>Contact Form</li>
                </ul>
              </div>
              <div className="border border-gray-500 p-2 rounded-lg">
                <h2 className="text-center text-bold">About Us</h2>
                <ul className="ml-4 my-2 space-y-2 list-disc">
                  <li>About Us</li>
                </ul>
              </div>
            </div>
          </p>
          <p className="text-bold text-3xl">TechStack: </p>
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
