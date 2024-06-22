"use client"
import React, { useContext, useEffect, useState } from 'react'
import { baseurl } from '@/app/config';
import storeContext from '@/app/global/createContex';
import axios from 'axios';
import Monitor from '../components/examonitor/Monitor';

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
  )
}

export default Page
