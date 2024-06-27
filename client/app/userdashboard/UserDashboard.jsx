"use client";
import React, { useContext, useState } from "react";
import ProtectRoute from "../global/ProtectRoute";
import Link from "next/link";
import storeContext from "../global/createContex";
import Navbar from "./components/Navbar";
// import Monitor from "./components/generalcontroller/Monitor";
import Logo from "../components/Logo";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import SearchEngin from "../components/SearchEngin";
import { useRouter } from "next/navigation";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Banner, BannerMobile } from "../adsterra/Banner";
import Script from "next/script";

// import Image from "next/image";
// import logo from "@/public/bcs-logo.png"
// import { TextEditor } from './components/TextEditor';
const UserDashboard = () => {
  const [search,setSearch] = useState("")
  const { store } = useContext(storeContext);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { data } = await axios.get(`${baseurl}/bangla/find`, {
  //         headers: {
  //           Authorization: `Bearer ${store.token}`,
  //         },
  //       });

  //       setData(data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [store.token]);
  // const filterValue = (val) => {
  //   const returnFilterValue = data?.filter((question) => {
  //     return question.topic === val;
  //   });
  //   return returnFilterValue;
  // };

  // console.log(filterValue('বাঙালি জাতি'))
  const { dispatch } = useContext(storeContext);
  const route = useRouter();
  const logout = () => {
   dispatch({type:"logout"})
    route.push("/login");
  };
  return (
    <div className="px-10 md:py-4 pt-4">
      <ProtectRoute>
        <Script type="text/javascript" src="//pl23641250.highrevenuenetwork.com/9d/dd/06/9ddd062e14b034f4d6043be8bf0a1f91.js" />
        <div className="flex justify-between items-center">
          <div className="md:w-20 w-16">
            <Link href="/">
              {/* <Image src={logo} alt="bffd" /> */}
              <Logo w={100} />
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <div className="hidden md:block">  <Navbar /></div>
            <div className="group relative duration-100">
            <Profile profile={store.userInfo.profile} />
            <div className="space-y-1 hidden group-hover:block py-2 absolute z-10 duration-200 bg-white p-2 rounded-md shadow-md -left-4">
            <Link href={"./userdashboard/myprofile"}>
             <h2 className="flex items-center gap-1 text-fuchsia-500"> <CgProfile /> Profile</h2>
            </Link>
                 <h2 onClick={logout} className="cursor-pointer text-white text-sm flex items-center gap-1 px-2 rounded-md bg-[#ff8d85]"><RiLogoutCircleRLine /> Logout</h2>
            </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
      <div className="flex gap-10 items-center">
      <h2 className="md:text-lg text-sm text-balance">
            Hey <span className="text-[#d000ff]">{store.userInfo.name}</span>,
            Welcome
          </h2>
          <SearchEngin takeValue={setSearch}/>
      </div>
          <Layout />
         <div className="hidden md:block"><Banner/></div>
         <div className="hidden"><BannerMobile/></div>
        </div>
        <div className="mobile-responsive flex justify-center items-center gap-2 fixed bottom-2 left-[50%] -translate-x-[50%]">
            <div className=""><div className={`p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500 text-gray-500`}> <Link href={"./userdashboard/myprofile"}><CgProfile size={30} /></Link></div></div>
            <div className=""><div className="bg-fuchsia-500 text-white scale-110 duration-500 p-2 rounded-full"> <Link href={"/"}><IoHomeOutline size={30} /></Link></div></div>
            <div className=""><div className={` bg-gray-200 shadow-md shadow-gray-500 text-gray-500 p-2 rounded-full `}> <Link href={"./userdashboard/myfavourite"}><AiOutlineHeart size={30}/></Link></div></div>
          </div>
      </ProtectRoute>
    </div>
  );
};

export default UserDashboard;
