import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
const Header = () => {
  const [switcher, setSwitcher] = useState(false);
  const [switcher1, setSwitcher1] = useState(false);
 //=============set scroll for header================
 const [header,setHeader] = useState(false)
 const scrollHeader = ()=>{
    if (window.scrollY >= 40) {
      setHeader(true)
    } else {
      setHeader(false)
    }
 }
 useEffect(() => {
  window.addEventListener("scroll",scrollHeader)
  return () => {
    window.addEventListener("scroll",scrollHeader)
  };
 }, []);

  return (
    <div className={`md:p-0 px-4 ${header ? "fixed w-full left-0 top-0 bg-white/50 shadow-lg duration-500 z-50 backdrop-blur-md" : ""}`}>
      <div className={`flex justify-between py-3 ${header ? "px-20 duration-100" : ""}`}>
        <FaBars
          onClick={() => {
            setSwitcher(true);
            setTimeout(() => {
              setSwitcher1(true);
            }, 200);
          }}
          className="md:hidden"
          size={30}
        />

        <div className="hidden md:block">
          <Logo w={100} />
        </div>
        <div className="md:hidden block">
          <Logo w={60} />
        </div>

        <div
          className={`md:hidden ${
            switcher ? "left-0" : "-left-[400px]"
          } bg-black/80 top-0 h-screen fixed w-screen duration-200`}
        >
          <ul
            className={`bg-white w-2/3 h-full relative ${
              switcher1 ? "left-0" : "-left-[400px]"
            } duration-200 p-4`}
          >
            <div className="absolute right-4 top-4">
              <RxCross2
                onClick={() => {
                  setSwitcher(false);
                  setTimeout(() => {
                    setSwitcher1(false);
                  }, 100);
                }}
                size={30}
              />
            </div>
            <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
              About Us
            </li>
            {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Our Team
          </li> */}
            <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
              Service
            </li>
            {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Blogs
          </li> */}
            <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
              BCS corner
            </li>
            {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Recent News
          </li>
          <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Job Circular
          </li> */}
            <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
              Contact Info
            </li>
          </ul>
        </div>

        {/* ============================================================ */}
        <ul className="md:flex items-center hidden">
        <div>
        <li className="text-lg font-normal px-4 py-[4px] w-fit cursor-pointer duration-500 rounded-md">
            About Us
          </li>
        </div>

          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Our Team
          </li> */}
          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Service
          </li> */}
          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Blogs
          </li> */}
          <div>
          <li className="text-lg font-normal px-4 py-[4px] text-gray-700 w-fit cursor-pointer duration-500 rounded-md">
            BCS corner
          </li>
          </div>
          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Recent News
          </li> */}
          {/* <li className="text-lg font-normal px-4 py-[4px] hover:bg-slate-100 hover:border-gray-200 text-gray-700 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-white">
            Job Circular
          </li> */}
          
          <div>
            <li className="text-lg font-normal px-4 py-[4px] text-gray-700 w-fit cursor-pointer duration-500 rounded-md">
              Contact Info
            </li>
          </div>
          <Link href={"/register"}>
            <li className="text-lg font-normal px-4 ml-2 text-white bg-fuchsia-500 w-fit cursor-pointer duration-500 rounded-md">
              Join
            </li>
          </Link>
        </ul>
        <Link className="md:hidden" href={"/register"}>
          <div className="text-lg font-normal px-4 py-[4px] ml-2 hover:text-white hover:bg-fuchsia-500 text-fuchsia-500 w-fit cursor-pointer duration-500 rounded-md border-[1px] border-fuchsia-500">
            Join
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
