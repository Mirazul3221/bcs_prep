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
import { CgProfile } from "react-icons/cg";

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
        <div className="flex justify-between items-center">
          <div className="md:w-20 w-16">
            <Link href="/">
              {/* <Image src={logo} alt="bffd" /> */}
              <Logo w={100} />
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Navbar />
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
           <Link href="./userdashboard/myfavourite"><h2 className="w-fit py-2 px-5 bg-fuchsia-500 rounded-full text-white">My Favourite List</h2></Link>
          <Layout />
        </div>
      </ProtectRoute>
    </div>
  );
};

export default UserDashboard;
