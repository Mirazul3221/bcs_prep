"use client";
import React, { useState } from "react";
import Controller from "./Controller";
import "../../components/cssfiles/responsive.css";
import ControllerForExam from "./ControllerForExam";
import { devider } from "@/app/subject/conponents/devider";
import PaginationNumber from "./PaginationNumber";

const Monitor = ({ questions }) => {
  const [navigate, setNavigate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [val, setVal] = useState(false);
  const [random, setRandom] = useState(false);
  const [localData, setLocalData] = useState();
  const getLocalVal = localStorage.getItem("setrandom");
  const getRobot = localStorage.getItem("robot");
  const getPageNumber = (number) => setCurrentPage(number);
  //==================================
  const handleClick = () => {
    setVal(!val);
    setLocalData(!val);
    localStorage.setItem("setrandom", localData);
  };

  const handleClickForRobot = () => {
    setRandom(!random);
    localStorage.setItem("robot", random ? "off" : "on");
  };

  const devidedQuestions = devider(questions, itemsPerPage);


  ///===================================================
  const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

  function scrollToTop() {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  //=========================================
  return (
    <>
      {navigate ? (
        <ControllerForExam questionsData={questions} />
      ) : (
        <div className="mx-2">
          <div>
            <div className="flex justify-between items-center responsive_title my-2 mt-3">
              <div className="flex gap-2 main_box">
                <div className="mail flex justify-center">
                  <div className="sub narrow_btn flex justify-center items-center gap-2 w-fit px-2 md:px-4 py-2 bg-gray-200 rounded-full">
                    <p className="text-[12px] md:text-[16px] font-medium ">
                      Set Random
                    </p>
                    <div
                      onClick={handleClick}
                      className={`md:w-6 w-4 h-4 cursor-pointer md:h-6 ${
                        getLocalVal === "true" ? "bg-green-300" : "bg-white"
                      } rounded-full`}
                    ></div>
                  </div>
                </div>
                <div className="mail flex justify-center">
                  <div className="sub narrow_btn flex justify-center items-center gap-2 w-fit px-2 md:px-4 py-2 bg-gray-200 rounded-full">
                    <p className="text-[12px] md:text-[16px] font-medium">
                      Set Roboticx
                    </p>
                    <div
                      onClick={handleClickForRobot}
                      className={`md:w-6 w-4 h-4 cursor-pointer md:h-6 ${
                        getRobot === "on" ? "bg-green-300" : "bg-white"
                      } rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex gap-2">
                  <div className="mail flex justify-center">
                    <>
                      <div
                        className={`sub narrow_btn flex ${
                          getRobot === "on"
                            ? "transform scale-110 duration-500"
                            : "transform scale-0 duration-500"
                        } justify-center items-center gap-2 w-fit px-2 md:px-4 py-2 bg-gray-200 rounded-full`}
                      >
                        <p className="text-[12px] md:text-[16px] font-medium">
                          Get Start
                        </p>

                        <div
                          onClick={() => setNavigate(true)}
                          className={`md:w-5 w-4 h-4 cursor-pointer md:h-5 bounce_btn ${
                            getRobot === "on"
                              ? "animate-ping bg-green-500"
                              : "bg-white"
                          } rounded-full`}
                        ></div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex`}
              >
                {devidedQuestions.question.map((item, i) => {
                  return (
                    <div key={i} className={`${i+1 === currentPage ? "visible" : "hidden"}`}>

                        <Controller
                          getLocalVal={getLocalVal}
                          getRobot={getRobot}
                          questionsData={item}
                        />
                    </div>
                  );
                })}
              </div>
              <div className="fixed right-16 md:right-[120px] bottom-0 md:bottom-2 py-3">
                <PaginationNumber
                  totalPost={questions.length}
                  postPerPage={itemsPerPage}
                  getPageNumber={getPageNumber}
                  scrollToTop={scrollToTop}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Monitor;
