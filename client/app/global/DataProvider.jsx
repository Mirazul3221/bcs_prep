"use client"
import React, { useEffect, useReducer, useState } from 'react'
import { dataReducer } from './dataReducer'
import storeContext from './createContex'
import { decode_jwt } from '../userdashboard/utils/jwtExtract'
import axios from 'axios'
const DataProvider = ({children}) => {
const [questions, setQuestions] = useState(null);
 const localstoreToken = {};
  if(typeof window !== 'undefined'){
    // now access your localStorage
    localstoreToken.token =  localStorage.getItem("token")
  }
    const [store,dispatch] = useReducer(dataReducer,{
        userInfo : decode_jwt(localstoreToken.token || ""),
        token : localstoreToken.token,
        questionData : []
    })
    useEffect(() => {
     async function getQuestionsFromApi(){
      try {
        const { data } = await axios.get(
          "http://localhost:1010/question/all"
        );
        setQuestions(data);
        const reverseQue = data.reverse();
        dispatch({ type: "ALL", payload: reverseQue });
      } catch (error) {}
     };
     getQuestionsFromApi()
    }, []);
    // console.log(questions)
  return (
    <div>
       <storeContext.Provider value={ {questions ,store, dispatch}}>
        {children}
       </storeContext.Provider>
    </div>
  )
}

export default DataProvider
