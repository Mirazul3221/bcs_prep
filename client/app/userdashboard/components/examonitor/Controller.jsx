"use client";
import React, { useContext, useEffect, useState } from "react";
import { CiCircleQuestion } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaBookReader } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { PiEye } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import "../../components/cssfiles/scrolling_bar.css";
import "../../components/cssfiles/marksmcq.css";
import HTMLReactParser from "html-react-parser";
import SearchEngin from "@/app/components/SearchEngin";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { baseurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
// import correct from "@/public/mediaresource/music_button/right.mp3"
//==================Import Audio Sound=============================
// import correct from "../mediaresource/music_button/right.mp3";
// import wrong from "../mediaresource/music_button/error.mp3";

const Controller = ({
  getLocalVal,
  getRobot,
  questionsData,
  grid,
  allQuestion,
  megaQuestions,
}) => {
  const [selectAll, setSelectAll] = useState(0);
  const [countReadingQuestion, setCountReadingQuestion] = useState(0);
  //Here is the statement about correct and inCorrect ans
  const [correctMcq, setCorrectMcq] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  //Here is thatement about negitive and positive marks
  const [positiveMarks, setPositiveMarks] = useState(0);
  const [negitiveMarks, setNegitiveMarks] = useState(0);
  const [search, setSearch] = useState("");
  const heyRobot = getRobot;
  //=======================================
  const volumeSound = localStorage.getItem("volume");
  // const correctVolume = new Audio(correct);
  //   const wrongVolume = new Audio(wrong);
  //=====================================
  //====================================================
  //====================================================================
  const checkAns = (e, ans, index, singleQuestion) => {
    let selectedData = questionsData[index].rightAns;

    const currentTerget = e.target;
    const tergetBox = e.target.parentElement.parentElement.children; // This tergetbox refers to the childer elements
    const tergetExp =
      e.target.parentElement.parentElement.parentElement.children[2]; // This tergetbox refers to the explanation elements
    //=============================================================
    const parentBox = e.target.parentElement.parentElement;
    const getAttribute = parentBox.getAttribute("data-select");
    const getAtterIntoNumber = parseInt(getAttribute);
    setTimeout(() => {
      parentBox.setAttribute("data-select", getAttribute + 1);
    }, 100);

    //=============================================================

    const allOpton = [tergetBox[0], tergetBox[1], tergetBox[2], tergetBox[3]];
    const mainTerget = questionsData[index].rightAns;
    if (heyRobot === "on") {
      if (getAtterIntoNumber === selectedData) {
        if (questionsData[index].rightAns === ans) {
          currentTerget.classList.add("true");
          setCorrectMcq(correctMcq + 1);
          setSelectAll(selectAll + 1);
          if (volumeSound === "on") {
            // correctVolume.play();
          }

          localStorage.setItem("crossBtn", "true");
          setPositiveMarks(positiveMarks + 1);
        } else {
          currentTerget.classList.add("false");
          allOpton[mainTerget - 1].children[1].classList.add("true");
          //   if (volumeSound === "on") {
          //     wrongVolume.play();
          //   }
          setWrongAns(wrongAns + 1);
          setTimeout(() => {
            tergetExp.classList.add("scale-110");
            tergetExp.classList.remove("scale-0");
          }, 100);
          tergetExp.classList.remove("hidden");
          setSelectAll(selectAll + 1);
          setNegitiveMarks(negitiveMarks + 0.25);
        }
      }
    }

    //tish function has been set for counting reading questions
    const checkReadingQuestion = () => {
      // localStorage.setItem("")
      const uniqueId = singleQuestion._id;
      const questionId = localStorage.getItem("UUID")
        ? JSON.parse(localStorage.getItem("UUID"))
        : [];
      //Find ID from localstorage =================

      questionId.push(uniqueId);

      localStorage.setItem("UUID", JSON.stringify(questionId));
    };
    checkReadingQuestion();
  };

  // const findReadQuestions = question_data.filter((queId) => {
  //   const getReadQuestion = JSON.parse(localStorage.getItem("UUID"));
  //   // const length = getReadQuestion.map((item))
  //   // return queId._id === "";
  // });
  const getReadQuestion = JSON.parse(localStorage.getItem("UUID"));
  const exactReadQuestion = getReadQuestion?.filter((item, index) => {
    return index === getReadQuestion?.findIndex((item2) => item2 === item);
  });
  function readQuestion() {
    const finelResult = [];
    for (let i = 0; i < exactReadQuestion?.length; i++) {
      const filterData = allQuestion?.filter((singleQue) => {
        const filterLength = singleQue._id === exactReadQuestion[i];
        return filterLength;
      });

      filterData?.map((que) => {
        if (que._id !== undefined) {
          finelResult.push(que._id);
          // console.log(que._id);
        }
      });
      // console.log(filterData[0]?._id)
    }
    setTimeout(() => {
      setCountReadingQuestion(finelResult.length);
    }, 100);
  }
  readQuestion();

  //shuffle the exam question
  if (getLocalVal === "true") {
    questionsData.sort((a, b) => 0.5 - Math.random());
  }

  const correctAns = (ans) => {
    if (ans === 1) {
      return "A";
    }
    if (ans === 2) {
      return "B";
    }
    if (ans === 3) {
      return "C";
    }
    if (ans === 4) {
      return "D";
    }
  };

  //========================================
  const removeExp = (e) => {
    e.target.parentElement.parentElement.classList.add("scale-0");
    e.target.parentElement.parentElement.classList.remove("scale-110");
    setTimeout(() => {
      e.target.parentElement.parentElement.classList.add("hidden");
    }, 100);
  };

  function countReadTime(id) {
    const result = getReadQuestion?.filter((uuId) => uuId === id);
    if (result?.length > 0) {
      return result.length;
    }
    return null;
  }


  //=====================Questions save intigration=================
  const [saveQue,setSaveQue] = useState([])
const { store } = useContext(storeContext);
const saveQuestion =async (id) => {
  try {
    const { data } = await axios.post(`${baseurl}/savequestions/create`,{question_id:id}, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  async function fetchData() {
    try {
      const { data } = await axios.get(`${baseurl}/savequestions/all`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });

      setSaveQue(data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchData();
}, [store.token]);

const checkSaveQuestion = (id)=>{
 const filterQue = saveQue.filter((questionId)=>{
  return questionId.question_id === id
 })
//  console.log(filterQue[0].question_id)
 if (filterQue[0]?.question_id === id ) {
   return <AiFillHeart size={20} color="#c602db"/>
 } else {
  return <AiOutlineHeart size={20} color="#c602db" /> 
 }
}

  return (
    <div className="pb-12 md:pb-0">
      <div className="flex gap-10 items-center">
        <div className="flex items-center ml-6 md:ml-0 gap-2 text-gray-700">
          <FaBookReader size={20} />
          <h2 className="my-2 text-[11px] md:text-lg">
            এই পর্যন্ত আপনি (
            <span className="font-bold text-fuchsia-500">
              {" " + countReadingQuestion + " "}
            </span>
            ) টি প্রশ্ন পড়ছেন।
          </h2>
        </div>
        <SearchEngin takeValue={setSearch} />
      </div>

      <div
        className={`grid ${
          grid == 1
            ? "md:grid-cols-1"
            : grid == 2
            ? "md:grid-cols-2"
            : grid == 3
            ? "md:grid-cols-3"
            : grid == 4
            ? "md:grid-cols-4"
            : grid == 5
            ? "md:grid-cols-5"
            : ""
        } gap-4`}
      >
        {/* =============================================
              ==================Justify Answer=============
              ============================================= */}
        {questionsData?.map((value, index) => {
          return (
            <div key={index} className="bg-gray-100 question_box relative mx-4 p-2 md:mx-0 md:p-6 rounded-md shadow-md border-2">
              <div
                key={index}
                className="md:mb-6 mb-10"
              >
                <div>
                  <div className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
                    <div>
                      <div className="rounded-full w-fit p-[1px] flex justify-center items-center border-2 relative">
                        <CiCircleQuestion color="gray" size={20} />
                      </div>
                    </div>
                    <h2 className="text-[12px] md:text-[15px]">
                      {value.question}
                    </h2>
                  </div>

                  <h2 className="text-[9px] flex mt-2 md:text-[10px] ml-1 text-fuchsia-500">
                    {value.examName ? (
                      <span>
                        {" "}
                        <LiaClipboardListSolid color="gray" size={16} />
                      </span>
                    ) : value.otherExamName ? (
                      <span>
                        {" "}
                        <LiaClipboardListSolid color="gray" size={16} />
                      </span>
                    ) : null}
                    {value.examName}
                    {value?.examSeassion && (
                      <span className="text-[9px] md:text-[10px]">
                        {value.examSeassion}
                      </span>
                    )}
                    {value?.otherExamName && (
                      <span className="text-[9px] md:text-[10px] ml-1">
                        {value.otherExamName}
                      </span>
                    )}
                  </h2>
                </div>
                <div
                  data-select={value.rightAns}
                  className="option_box space-y-2 mt-2"
                >
                  <div className="relative">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      {value.subject === "বাংলা"
                        ? "ক"
                        : value.subject === "English"
                        ? "A"
                        : "ক"}
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 1, index, value);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5 text-[12px] md:text-[14px]"
                    >
                      {value.option_01}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      {value.subject === "বাংলা"
                        ? "ক"
                        : value.subject === "English"
                        ? "A"
                        : "ক"}
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 2, index, value);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5 text-[12px] md:text-[14px]"
                    >
                      {value.option_02}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      {value.subject === "বাংলা"
                        ? "ক"
                        : value.subject === "English"
                        ? "A"
                        : "ক"}
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 3, index, value);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5 text-[12px] md:text-[14px]"
                    >
                      {value.option_03}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="__option_number__ absolute left-5 border-2 border-white top-[5px] text-white rounded-full bg-gray-400 w-6 h-6 flex justify-center items-center">
                      {value.subject === "বাংলা"
                        ? "ক"
                        : value.subject === "English"
                        ? "A"
                        : "ক"}
                    </div>

                    <p
                      onClick={(e) => {
                        checkAns(e, 4, index, value);
                      }}
                      className="__option_value__ cursor-pointer ml-8 w-[90%] rounded-full px-4 py-[5px] mx-5 text-[12px] md:text-[14px]"
                    >
                      {value.option_04}
                    </p>
                  </div>
                </div>
                {heyRobot === "on" ? (
                  <></>
                ) : (
                  <>
                    <div className="flex justify-end">
                      <div className="ans text-right w-8 h-8 flex justify-center items-center font-semibold text-gray-500 rounded-full border-2 border-gray-500">
                        {correctAns(value.rightAns, value.subject)}
                      </div>
                    </div>
                  </>
                )}

                {/* ==================Adding Explanation with click===================== */}
                {heyRobot === "on" ? (
                  <></>
                ) : (
                  <div
                    className={`explanation relative hidden_scroll pt-2 mt-4 px-4 md:px-12 transform duration-500 bg-white max-h-[40vh] overflow-y-scroll`}
                  >
                    <p className="text-[12px] p-2 md:p-10">
                      {HTMLReactParser(value.description)}
                    </p>
                  </div>
                )}

                {value.description.length > 0 ? (
                  <div
                    className={`explanation relative hidden_scroll pt-2 hidden mt-4 px-4 md:px-12 transform scale-0 duration-500 max-h-[40vh] overflow-y-scroll`}
                  >
                    <div
                      onClick={(e) => {
                        removeExp(e);
                      }}
                      className="fixed cursor-pointer w-4 h-4 top-2 right-2 md:right-8 flex justify-center items-center rounded-full bg-rose-300/50"
                    >
                      <RxCross2 color="red" size={10} />
                    </div>
                    <div>
                      <p className="text-[12px] mt-2">
                        {HTMLReactParser(value.description)}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="absolute bottom-2 w-full -ml-6 md:px-10">
              {heyRobot !== "on" ? (
                  ""
                ) : (
                  <>
                    <div className="flex justify-end">
                      <div className="flex gap-2">
                        <div onClick={()=>saveQuestion(value._id)} className="px-4 py-2 rounded-full border cursor-pointer border-fuchsia-500">
                          {checkSaveQuestion(value._id)}
                        </div>
                        <div className="flex items-center gap-[1px] right-2 shadow-sm px-4 py-2 rounded-full border border-fuchsia-500">
                          {value._id ===
                          getReadQuestion?.find((id) => id === value._id) ? (
                            <PiEye color="#ff0037" />
                          ) : (
                            <PiEyeSlash color="#a8a8a8" />
                          )}
                          <h2
                            className={`text-[8px] text-rose-500 md:text-[10px]  rounded-full ${
                              countReadTime(value._id) === null ? "" : ""
                            } flex justify-center items-center`}
                          >
                            {countReadTime(value._id)}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {wrongAns > 0 ? (
          <div className="fixed opacity-60 right-2 md:right-10 bottom-12 bg-rose-300 w-10 h-10 p-[12px] rounded-full flex items-center justify-center">
            {wrongAns}
          </div>
        ) : (
          ""
        )}
        {correctMcq > 0 ? (
          <div className="fixed opacity-60 right-2 md:right-[80px] bottom-20 md:bottom-12 w-10 h-10 p-[12px] bg-green-300 rounded-full flex items-center justify-center">
            {correctMcq}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Controller;
