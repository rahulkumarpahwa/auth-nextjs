import Link from "next/link";
const Page = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-[25rem] py-2 gap-5">
      <h2 className="">Dynamic Url</h2>
      <h2 className="p-1 rounded-lg bg-green-500 font-bold">{params.id}</h2>
      <Link
        href="/profile"
        className="border p-1 rounded-lg hover:text-black hover:bg-white"
      >
        Back to Profile
      </Link>
    </div>
  );
};

export default Page;
