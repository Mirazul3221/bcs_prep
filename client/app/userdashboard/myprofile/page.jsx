"use client";
import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Profile from "@/app/components/Profile";
import axios from "axios";
import storeContext from "@/app/global/createContex";
import { PiPenLight } from "react-icons/pi";
import { baseurl } from "@/app/config";
import Logo from "@/app/components/Logo";
import ProtectRoute from "@/app/global/ProtectRoute";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";


const Page = () => {
  const [userDetails, setUserDetails] = useState("");
  const [controltitle, setControlTitle] = useState(false);
  const [controlDesc, setControlDesc] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(userDetails?.description);
  const [updateDesc, setUpdateDesc] = useState(userDetails?.description);
  const [livingPlace, setUpdateLivingPlace] = useState("");
  const isBrowser = typeof window !== undefined;
  const { store } = useContext(storeContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseurl}/auth/find`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setUserDetails(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [store.token,updateTitle]);
// console.log(userDetails)
  //========================================
  const updateUser = async (e) => {
    setUpdateTitle(e.target.value);
    try {
      await axios.post(`${baseurl}/auth/updatemytitle`,updateTitle, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
    } catch (error) {}
  };
if (isBrowser) {
  
}
useEffect(() => {
  window.addEventListener('click',(e)=>{
    if (e.target.classList.contains("updateTitle")) {
      setControlTitle(true)
    } else {
      setControlTitle(false)
    }
    if (e.target.classList.contains("updateDesc")) {
      setControlDesc(true)
    } else {
      setControlDesc(false)
    }
  })//
}, []);

  return (
    <ProtectRoute>
          <div className="md:px-10 px-4 mt">
      <div className="flex justify-between items-center my-4">
        <Logo w={100}/>
      <Navbar />
      </div>
      <div className="md:w-4/12 border-t-4 rounded-lg border-fuchsia-500 ml-2 shadow-md p-10">
        <div className="w-1/2 mx-auto py-2">
          <Profile profile={userDetails.profile} />
          <h1 className="text-center text-2xl font-semibold">
            {userDetails.name}
          </h1>
        </div>
        <div className="border-t-2 py-2">
          {controltitle ? (
            <>
              <input value={updateTitle}
                className="border-2 updateTitle w-full px-2 py-[3px]"
                type="text"
                onChange={(e) => {
                    updateUser(e)
                }}
                // value={userDetails.title}
                placeholder="Update your title"
              />
            </>
          ) : (
            <>
              <div className="relative w-full group">
                <h2
                  className={`updateTitle ${
                    userDetails.title?.length <= 30
                      ? "text-center text-fuchsia-500"
                      : "text-rose-500"
                  } `}
                >
                  {userDetails.title?.length <= 0
                    ? "Untitled User"
                    : userDetails.title}
                </h2>
                <div
                  className="group-hover:flex hidden bg-white w-5 h-5 rounded-full absolute right-0 top-0 justify-center items-center shadow-md"
                >
                  <PiPenLight />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-3">
          {controlDesc ? (
            <>
              <textarea
              value={updateDesc}
                className="updateDesc w-full border-[1px] p-2"
                onChange={(e) => {
                  setUpdateDesc(e.target.value);
                }}
                rows="5"
                placeholder="Update description"
                name="text"
                id=""
              ></textarea>
            </>
          ) : (
            <>
              <div className="relative w-full group">
                <p className="text-justify updateDesc">
                  {userDetails.description?.length <= 0
                    ? "Write Something about you."
                    : userDetails.description}
                </p>
                <div 
                  className="group-hover:flex descriptionValue hidden bg-white w-8 h-8 rounded-full absolute right-0 top-0 justify-center items-center shadow-md"
                >
                  <PiPenLight size={22} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    <div className="mobile-responsive flex justify-center items-center gap-2 absolute bottom-2 left-[50%] -translate-x-[50%]">
          <div className=""><div className="bg-fuchsia-500 text-white p-2 rounded-full"> <Link href={"./userdashboard/myprofile"}><CgProfile size={30} /></Link></div></div>
          <div className=""><div className="bg-fuchsia-500 text-white p-2 rounded-full"> <Link href={"/"}><IoHomeOutline size={30} /></Link></div></div>
          <div className=""><div className="bg-fuchsia-500 text-white p-2 rounded-full"> <Link href={"./userdashboard/myfavourite"}><AiFillHeart size={30}/></Link></div></div>
        </div>
    </ProtectRoute>
  );
};

export default Page;
