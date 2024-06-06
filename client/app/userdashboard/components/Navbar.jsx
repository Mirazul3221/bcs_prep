"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const route = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    route.push("/login");
  };
  return (
    <div className="flex gap-4 items-center">
      <ul className="md:w-full md:flex hidden justify-center py-4">
        {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Our Team
        </li> */}
        {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Service
        </li> */}
        {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Blogs
        </li> */}
        <li
          className={`text-lg font-normal px-4 py-[4px]  hover:bg-slate-100 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white`}>
          BCS corner
        </li>
        <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Recent News
        </li>
        <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Job Circular
        </li>
        {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
          Contact Info
        </li> */}
        <li
          onClick={logout}
          className="text-lg font-normal px-4 py-[4px] ml-2 text-green-500 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-green-500">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
