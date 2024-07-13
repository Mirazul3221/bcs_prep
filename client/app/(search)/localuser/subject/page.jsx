"use client"
import Header from '@/app/components/Header'
import { baseurl } from '@/app/config'
import storeContext from '@/app/global/createContex'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import loderImage from '@/public/wating.gif'
import Image from 'next/image'


const page = () => {
const [data,setData] = useState([])
const [loader,setLoader] = useState(false)
const {store} = useContext(storeContext)
useEffect(() => {
  async function fetchData() {
    try {
      setLoader(true)
      const { data } = await axios.get(`${baseurl}/allquestionscollection/api/search/${store.searchReasultFromGeneralUser}`);
      setData(data);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  }
  fetchData();
}, [store.searchReasultFromGeneralUser]);
console.log(data)
  return (
    <div className='min-w-screen'>
      <div className="header border-b">
        <Header/>
      </div>
       {
        loader ? <div className="w-full h-[89vh] flex justify-center items-center"><Image className='w-4/12' src={loderImage} alt='loading image'/></div>
         : 
         <div className="">
             {
              data.length > 0? <div className="">                  {
                data?.map((singleQuestion)=>{
                 return <h2>{singleQuestion.question}</h2>
                })
              }</div> : "Question Not Found"
             }
         </div>
       }
    </div>
  )
}

export default page
