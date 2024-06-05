"use client";
// import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CustomTimer from "./mainpage_components/timer";
import Roboticx from "./mainpage_components/robotix";
import storeContext from "./global/createContex";
import UserDashboard from "./userdashboard/UserDashboard";
import AdminDashboard from "./admindashboard/AdminDashboard";
import AssistantHome from "./assistantdashboard/Home";
import Header from "./components/Header";
import Section_01 from "./components/Section_01";
export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const { store } = useContext(storeContext);
  const otp = Math.floor(1000 + Math.random() * 9000);
  if (store?.userInfo?.role === "user") {
    return <div>{isClient ? <UserDashboard /> : ""}</div>;
  } else if (store?.userInfo?.role === "admin") {
    return <div>{isClient ? <AdminDashboard /> : ""}</div>;
  } else if (store?.userInfo?.role === "assistant") {
    return <div>{isClient ? <AssistantHome /> : <></>}</div>;
  } else {
    return (
      <div>
        {isClient ? (
          <main className="overflow-x-hidden max-w-[1440px] mx-auto">
            <Header />
            {/* <div className="w-screen h-screen mt-[100vh] bg-white"></div> */}
            {/* <div className="w-screen h-screen bg-red-100"></div> */}
            <div className="fixed -z-10">
              
              <div className="relative w-screen h-screen ">
                <CustomTimer />
                <Roboticx />
                <div className="w-screen h-screen absolute md:flex justify-center items-center top-0 left-0 bg-white/50 md:bg-white/90">
                      <h2 className="md:text-[60px] backdrop-blur-md md:backdrop-blur-0 text-gray-700 text-[24px] text-center font-bold mt-28 py-28 md:-mt-[130px]">
                        <span className=" px-4 bg-white/70 rounded-full"> Welcome</span> <br/> to the <span className="bg-fuchsia-600 text-shadow-lg py-2 px-6 text-white rounded-full">BCS Preparation</span> <br/> online platform
                      </h2>
                </div>
              </div>
            </div>
          <Section_01/>
          </main>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
