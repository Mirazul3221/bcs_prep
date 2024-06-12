"use client";
import React, { useEffect, useState } from "react";
import Controller from "./Controller";
import "../../components/cssfiles/responsive.css";
import ControllerForExam from "./ControllerForExam";
import { devider } from "@/app/subject/conponents/devider";
import PaginationNumber from "./PaginationNumber";


const Monitor = ({ questions,megaQuestions }) => {
  const [navigate, setNavigate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [grid, setGrid] = useState(3);
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

//  useEffect(() => {
  
//  }, []);
  const devidedQuestions = devider(questions, +itemsPerPage);

  ///===================================================
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  //=========================================
  //============grid control system==============
  return (
    <>
      {navigate ? (
        <ControllerForExam questionsData={questions} />
      ) : (
        <div className="mx-2">
          <div>
            <div className="flex justify-between items-center responsive_title my-2 mt-3">
              <div className="flex gap-2 main_box">
                <div className="mail md:flex justify-center hidden">
                  <div className="sub narrow_btn flex justify-center items-center gap-2 w-fit px-2 md:px-4 py-2 bg-gray-200 rounded-full">
                    <p className="text-[12px] md:text-[16px] font-medium ">
                      Set Random
                    </p>
                    <div
                      onClick={handleClick}
                      className={`md:w-6 w-4 h-4 cursor-pointer md:h-6 ${
                        getLocalVal === "true" ? "bg-fuchsia-500" : "bg-white"
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
                        getRobot === "on" ? "bg-fuchsia-500" : "bg-white"
                      } rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 md:gap-4 justify-center items-center">
                <div className="flex md:gap-2 items-center">
                  <select
                    onChange={(e) => setGrid(e.target.value)}
                    className="py-[10px] hidden md:inline-block px-4 border rounded-full bg-gray-100"
                    name="grid_ctrl"
                    id="ctrl"
                  >
                    <option value="">Show grid</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <select
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    className="md:py-[10px] py-[7px] text-sm md:px-4 border rounded-full bg-gray-100"
                    name="item-per-page"
                    id="ctrl-item"
                  >
                    <option value="">Show items</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <div className="mail flex justify-center">
                    <>
                      <div
                        className={`sub narrow_btn flex ${
                          getRobot === "on"
                            ? "transform scale-110 duration-500"
                            : "transform scale-0 duration-500"
                        } justify-center items-center gap-2 w-fit px-2 md:px-4 py-2 bg-gray-100 rounded-full`}
                      >
                        <p className="text-[12px] md:text-[16px] font-medium">
                          Get Start
                        </p>

                        <div
                          onClick={() => setNavigate(true)}
                          className={`md:w-5 w-4 h-4 cursor-pointer md:h-5 bounce_btn ${
                            getRobot === "on"
                              ? "animate-ping bg-fuchsia-500"
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
              <div className={`flex`}>
                {devidedQuestions.question.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={`${
                        i + 1 === currentPage ? "visible" : "hidden"
                      }`}
                    >
                      <Controller
                        getLocalVal={getLocalVal}
                        getRobot={getRobot}
                        questionsData={item}
                        grid={grid}
                        allQuestion={questions}
                        megaQuestions={megaQuestions}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="fixed left-[50%] md:left-0 -translate-x-[50%] md:translate-x-0 md:right-[120px] bottom-1 md:bottom-2 py-3 w-full">
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
