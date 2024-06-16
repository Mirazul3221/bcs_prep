"use client";
// import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
// import CustomTimer from "./mainpage_components/timer";
// import Roboticx from "./mainpage_components/robotix";
import storeContext from "./global/createContex";
import UserDashboard from "./userdashboard/UserDashboard";
import AdminDashboard from "./admindashboard/AdminDashboard";
import AssistantHome from "./assistantdashboard/Home";
import Header from "./components/Header";
import Section_01 from "./components/Section_01";
import laptop from "@/public/laptop-view.png"
import Image from "next/image";
import "./anim.css"
export default function Home() {
  const [isClient, setIsClient] = useState(false);
   let number = []
   for(let i = 1; i <= 100; i ++){
       number.push(i)
   }


   number.sort((a , b)=> 0.5 - Math.random())
  console.log( number)

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
          <main className="overflow-x-hidden max-w-[1440px] relative md:px-20">
            <div className="absolute top-0 h-[100vh] w-[200vw] bg-gray-300 -z-10 rotate-12 -left-20 md:-left-10"></div>

            <Header />
            <div className="md:flex justify-between items-center p-4">
             <div className="md:w-1/2 laptop-anim hidden md:block"><Image className="md:pt-20" src={laptop} alt="laptop-view"/></div>
             <div className="md:w-1/2">
             <h2 className="text-3xl text-gray-700">A New Way to Learn</h2>
             <h2 className="text-lg">This is the best platform to help you enhance your skills, expand your knowledge and prepare for BCS exam.</h2>
             </div>
             <div className="md:w-1/2 laptop-anim md:hidden"><Image className="md:pt-20" src={laptop} alt="laptop-view"/></div>
            </div>
            <div className="">
              
              {/* <div className="relative w-screen h-screen ">
                <div className="w-screen h-screen absolute md:flex justify-center items-center top-0 left-0 bg-white/50 md:bg-white/90">
                      <h2 className="md:text-[60px] backdrop-blur-md md:backdrop-blur-0 text-gray-700 text-[24px] text-center font-bold mt-28 py-28 md:-mt-[130px]">
                        <span className=" px-4 bg-white/70 rounded-full"> Welcome</span> <br/> to the <span className="bg-fuchsia-600 text-shadow-lg py-2 px-6 text-white rounded-full">BCS Preparation</span> <br/> online platform
                      </h2>
                </div>
              </div> */}
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

             // <CustomTimer />
                // <Roboticx />
