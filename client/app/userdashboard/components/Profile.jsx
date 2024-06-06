import React from 'react'

const Profile = ({profile}) => {
  return (
    <div>
         <div className="w-[70px] h-[70px]"><img className="w-[70px] h-[70px] rounded-full border-4" src={profile} alt="profile-pic" /></div>
    </div>
  )
}

export default Profile