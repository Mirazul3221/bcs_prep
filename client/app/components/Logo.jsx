import Image from "next/image";
import React from "react";
import logo from "@/public/bcs-logo.png";
import Link from "next/link";
const Logo = ({w}) => {
  return (

      <Link href={"/"}>
        <Image width={w} src={logo} alt="BCS Logo" />
      </Link>

  );
};

export default Logo;
