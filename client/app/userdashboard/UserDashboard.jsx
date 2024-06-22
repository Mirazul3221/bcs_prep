"use client";
import React, { useContext, useEffect, useState } from "react";
import ProtectRoute from "../global/ProtectRoute";
import Link from "next/link";
import storeContext from "../global/createContex";
import Navbar from "./components/Navbar";
// import Monitor from "./components/generalcontroller/Monitor";
import Logo from "../components/Logo";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import SearchEngin from "../components/SearchEngin";
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
  return (
    <div className="px-10 md:py-4 pt-4">
      <ProtectRoute>
        <div className="flex justify-between items-center">
          <div className="md:w-20 w-16">
            <Link href="/">
              {/* <Image src={logo} alt="bffd" /> */}
              <Logo w={100} />
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Navbar />
           
            <Link href={"./userdashboard/myprofile"}>
              <Profile profile={store.userInfo.profile} />
            </Link>
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
           <Link href="./userdashboard/myfavourite"><h2 className="w-fit py-2 px-5 bg-fuchsia-500 rounded-full text-white">My Favourite List</h2></Link>
          <Layout />
        </div>
      </ProtectRoute>
    </div>
  );
};

export default UserDashboard;
