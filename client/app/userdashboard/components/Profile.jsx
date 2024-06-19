import React from 'react'

const Profile = ({profile}) => {
  return (
    <div>
         <div className="md:w-[70px] md:h-[70px] w-[50px] h-[50px]"><img className="md:w-[70px] md:h-[70px] w-[50px] h-[50px] rounded-full border-4" src={profile} alt="profile-pic" /></div>
    </div>
  )
}

export default Profile