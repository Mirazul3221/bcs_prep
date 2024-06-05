"use client";
import React, { useContext, useEffect, useState } from "react";
import ProtectRoute from "../global/ProtectRoute";
import Link from "next/link";
import storeContext from "../global/createContex";
import Navbar from "./components/Navbar";
// import Monitor from "./components/generalcontroller/Monitor";
import Logo from "../components/Logo";
import Layout from "./components/Layout";
// import Image from "next/image";
// import logo from "@/public/bcs-logo.png"
// import { TextEditor } from './components/TextEditor';
const UserDashboard = () => {
const [data,setData] = useState()
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



  const [navValue, setNaveValue] = useState("home");


  // const filterValue = (val) => {
  //   const returnFilterValue = data?.filter((question) => {
  //     return question.topic === val;
  //   });
  //   return returnFilterValue;
  // };

// console.log(filterValue('বাঙালি জাতি'))
// console.log(data)
  return (
    <div className="px-10 md:py-4 pt-4">
      <ProtectRoute>
        <div className="flex justify-between items-center">
          <div className="md:w-20 w-16">
            <Link href="/">
            {/* <Image src={logo} alt="bffd" /> */}
           <Logo w={100}/>
            </Link>
          </div>
          <Navbar value={navValue} setValue={setNaveValue} />
        </div>
        <div className="wrapper">
          {navValue == "home" ? (
            <>
              <h2 className="md:text-lg text-sm md:mt-10 mt-4 text-balance">
                Hey <span className="text-rose-300">{store.userInfo.name}</span>
                , Welcome
              </h2>
              <Layout/>
            </>
          ) : navValue == "BCS corner" ? (
             <div className="">
                  BCS Corner
             </div>
          ) : ""}
        </div>
      </ProtectRoute>
    </div>
  );
};

export default UserDashboard;
