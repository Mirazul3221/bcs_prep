import React, { useContext } from "react";
import QuestionAddForm from "./components/QuestionAddForm";
import Logo from "../components/Logo";
import storeContext from "../global/createContex";
import { FaPlus, FaUserPlus, FaUsers } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

const AssistantHome = () => {
  const { store } = useContext(storeContext);
  return (
    <div>
      <div className="top flex justify-between items-center px-16 border-b-2 py-4">
        <div className="w-20">
          <Logo />
        </div>{" "}
        <span className="font-bold text-fuchsia-600 text-lg">
          {store.userInfo.name}
        </span>
      </div>
      <div className="md:flex mt-2">
        <div className="py-8 border-r-2 h-screen w-48 hidden md:block">
          <p className="text-center">
          <ul>
        <li  className={`flex cursor-pointer gap-2 items-center py-2 px-4  rounded-md font-medium text-gray-600`}><FaPlus/> Add Question</li>
        <li  className={`flex cursor-pointer gap-2 items-center py-2 px-4 rounded-md font-medium text-gray-600`}><FaUserPlus/> Add User</li>
        <li className={`flex cursor-pointer gap-2 items-center py-2 px-4 rounded-md font-medium text-gray-600`}><FaUsers/> User List</li>
        <li  className={`flex gap-2 cursor-pointer items-center py-2 px-4 rounded-md font-medium text-gray-600`}><RiLogoutCircleRLine/>Logout</li>
      </ul>
          </p>
        </div>
        <QuestionAddForm />
      </div>
    </div>
  );
};

export default AssistantHome;
