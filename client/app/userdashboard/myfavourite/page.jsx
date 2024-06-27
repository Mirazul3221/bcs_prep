"use client"
import React, { useContext, useEffect, useState } from 'react'
import { baseurl } from '@/app/config';
import storeContext from '@/app/global/createContex';
import axios from 'axios';
import Monitor from '../components/examonitor/Monitor';
import ProtectRoute from '@/app/global/ProtectRoute';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { IoHomeOutline } from 'react-icons/io5';
import { AiFillHeart } from 'react-icons/ai';

const Page = () => {
    const { store } = useContext(storeContext);
    const [allQuestionId,setAllQuestionId] = useState()
    const [allQuestion,setAllQuestion] = useState([])
    useEffect(() => {
     const fetchFevourite =async () => {
        try {
            // setSaveQueLoader(true);
            const { data } = await axios.get(
              `${baseurl}/savequestions/all`,
              {
                headers: {
                  Authorization: `Bearer ${store.token}`,
                },
              }
            );
            // setSaveQueLoader(false);
            setAllQuestionId(data);
          } catch (error) {
            // setSaveQueLoader(false);
            console.log(error);
          }
     }
     fetchFevourite()
    }, []);


    const handleMyfavourite =async () =>{
        const manageAllid = []
        allQuestionId?.map((id)=>manageAllid.push(id?.question_id))
        try { 
            const { data } = await axios.post(
                `${baseurl}/english/myallfavouritequestions`,manageAllid,
                {
                  headers: {
                    Authorization: `Bearer ${store.token}`,
                  },
                }
              );
              setAllQuestion(data)
        } catch (error) {
            
        }
    }

    console.log(allQuestion?.length)
  return (
        <ProtectRoute>
              <div className='md:p-20 p-2'>
         <h2 onClick={handleMyfavourite} className='py-2 px-6 w-fit bg-fuchsia-500 text-white rounded-full cursor-pointer text-2xl'>English</h2>
         {
            allQuestion[0]?.subject == 'English' && (
                <>
                  <Monitor questions={allQuestion} megaQuestions={allQuestion} /> 
                </>
            )
         }
       </div>
            <div className="mobile-responsive flex justify-center items-center gap-2 absolute bottom-2 left-[50%] -translate-x-[50%]">
            <div className=""><div className="bg-fuchsia-500 text-white p-2 rounded-full"> <Link href={"./userdashboard/myprofile"}><CgProfile size={30} /></Link></div></div>
            <div className=""><div className="bg-fuchsia-500 text-white p-2 rounded-full"> <Link href={"/"}><IoHomeOutline size={30} /></Link></div></div>
            <div className=""><div className="bg-fuchsia-500 text-white p-2 rounded-full"> <Link href={"./userdashboard/myfavourite"}><AiFillHeart size={30}/></Link></div></div>
          </div>
        </ProtectRoute>
  )
}

export default Page
