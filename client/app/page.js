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
import Image from "next/image";
import manymobile from '@/public/banner/multiplemobile.png'
import { FaFacebook, FaLinkedin, FaSquareWhatsapp } from "react-icons/fa6";
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
          <main className="max-w-[1440px] mx-auto">
           <div className="fixed -z-10 top-0 left-0 overflow-hidden w-screen h-screen">
           <div className="absolute -top-10 md:h-[110vh] h-[60vh] w-[200vw] bg-gray-300 -z-10 rotate-12 -left-20 md:-left-48"></div>
           </div>
          

            <Header />
          <BannerSection/>
          <Section_01/>
          <div className="bg-[#1c1a24]"><Projects/></div>
          <div className="bg-white flex justify-center py-10">
            <Image src={manymobile} alt="multiple mobile"/>
          </div>
          <div className="footer flex justify-between items-center py-4 md:px-20 px-4 bg-gray-300">
                <h2>
                © Copyright 2024 | All Rights Reserved | Powered by Mirazul islam
                </h2>
                <div className="flex items-center md:gap-4 gap-2">
                  <FaFacebook size={25}/>
                  <FaSquareWhatsapp size={25}/>
                  <FaLinkedin size={25}/>
                </div>
             
          </div>
          <Card/>
          </main>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const dalali = [
  {a:"Basic",
    b:"Price: 500.00 ৳",
    c:"Daily 2 Ads",
    d:"Daily Income 200",
    e:"Validity 30 Days",
  },
  {a:"Silver",
    b:"Price: 1000.00 ৳",
    c:"Daily 5 Ads",
    d:"Daily Income 500",
    e:"Validity 40 Days",
  },
  {a:"Diamond",
    b:"Price: 40,000.00 ৳",
    c:"Daily 50 Ads",
    d:"Daily Income 5000",
    e:"Validity 180 Days",
  },
  {a:"Master",
    b:"Price: 80,000.00 ৳",
    c:"Daily 150 Ads",
    d:"Daily Income 15000",
    e:"Validity 360 Days",
  },
  {a:"Diamond",
    b:"Price: 40,000.00 ৳",
    c:"Daily 50 Ads",
    d:"Daily Income 5000",
    e:"Validity 180 Days",
  },
  {a:"Master",
    b:"Price: 80,000.00 ৳",
    c:"Daily 150 Ads",
    d:"Daily Income 15000",
    e:"Validity 360 Days",
  },
  {a:"Diamond",
    b:"Price: 40,000.00 ৳",
    c:"Daily 50 Ads",
    d:"Daily Income 5000",
    e:"Validity 180 Days",
  },
  {a:"Master",
    b:"Price: 80,000.00 ৳",
    c:"Daily 150 Ads",
    d:"Daily Income 15000",
    e:"Validity 360 Days",
  },
  {a:"Diamond",
    b:"Price: 40,000.00 ৳",
    c:"Daily 50 Ads",
    d:"Daily Income 5000",
    e:"Validity 180 Days",
  },
  {a:"Master",
    b:"Price: 80,000.00 ৳",
    c:"Daily 150 Ads",
    d:"Daily Income 15000",
    e:"Validity 360 Days",
  },
]

const Card = ()=>{
  return <div className="bg-white md:p-28 grid grid-cols-2 gap-5">
     {
      dalali.map((dalal)=>{
       return  <div className="bg-[#fcb100] py-2 text-center text-white rounded-xl space-y-2">
             <h2 className="text-black font-bold text-2xl">{dalal.a}</h2>
             <h2 className="font-bold">{dalal.b}</h2>
             <h2 className="">{dalal.c}</h2>
             <h2 className="">{dalal.d}</h2>
             <h2 className="">{dalal.e}</h2>
             <div className="mx-auto text-black w-10/12 border border-black py-2 rounded-full duration-300 shadow-md bg-[#f7e48f] cursor-pointer hover:bg-[#f0e4b2]">Buy</div>
         </div>
      })
     }
  </div>
}
             // <CustomTimer />
                // <Roboticx />
