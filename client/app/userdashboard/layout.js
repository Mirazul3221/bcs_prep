import { Children } from "react";
import Navbar from "./components/Navbar";
import Profile from "../components/Profile";


export default function DashboardLayout ({children}) {
return (
    <>
    {/* <div className="flex justify-between items-center shadow-md px-10">
    <Profile/>
    <Navbar/>
    </div> */}
    {children}
    </>
)
}