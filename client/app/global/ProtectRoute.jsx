"use client"
import { useRouter } from "next/navigation";
import storeContext from "@/app/global/createContex"
import { useContext } from "react"

const ProtectRoute = ({children}) => {
  const { store } = useContext(storeContext)
  const router = useRouter();
    if (store?.userInfo?.id) {
      return <div>{children}</div>  
    } else {
      router.push("/login")
    }
}

export default ProtectRoute
