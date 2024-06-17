import React from "react";
import laptop from "@/public/laptop-view.png"
import Image from "next/image";
const BannerSection = () => {
  return (
    <div>
      <div className="md:flex justify-between items-center p-4">
        <div className="md:w-1/2 laptop-anim hidden md:block">
          <Image className="md:pt-20" src={laptop} alt="laptop-view" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl text-gray-700">A New Way to Learn</h2>
          <h2 className="text-lg">
            This is the best platform to help you enhance your skills, expand
            your knowledge and prepare for BCS exam.
          </h2>
        </div>
        <Image className="md:pt-20 md:hidden md:w-1/2" src={laptop} alt="laptop-view" />
      </div>
    </div>
  );
};

export default BannerSection;
