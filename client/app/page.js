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
import "./anim.css"
import BannerSection from "./components/BannerSection";
import Projects from "./components/Cards";
export default function Home() {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  
  const [isClient, setIsClient] = useState(false);
   let number = []
   for(let i = 1; i <= 100; i ++){
       number.push(i)
   }


   number.sort((a , b)=> 0.5 - Math.random())

  useEffect(() => {
    setIsClient(true);
  }, []);
  const { store } = useContext(storeContext);
  // const `otp` = Math.floor(1000 + Math.random() * 9000);
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
          <main className="max-w-[1440px]">
           <div className="fixed -z-10 top-0 left-0 overflow-hidden w-screen h-screen">
           <div className="absolute -top-10 md:h-[110vh] h-[60vh] w-[200vw] bg-gray-300 -z-10 rotate-12 -left-20 md:-left-48"></div>
           </div>
          

            <Header />
          <BannerSection/>
          <Section_01/>
          <div className="bg-[#1c1a24]"><Projects/></div>
          <div className="h-screen bg-white">
            <h1 className="text-2xl mb-2"> Why do we use it?</h1>
            <p>//
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </div>
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
