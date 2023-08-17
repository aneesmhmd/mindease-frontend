import React from 'react';
import ProfileCard from '../../components/User/Profile/UserProfile';
import { Helmet } from 'react-helmet';
import image from '../../images/subBg.jpg'

const UserProfile = () => {
  return (
   <div className='pt-20 min-h-screen' style={{ backgroundImage: `url(${image})` }}>
    <Helmet>
      <title>My Profile | MindEase</title>
    </Helmet>
    <ProfileCard/>
   </div>
  );
};

export default UserProfile;
