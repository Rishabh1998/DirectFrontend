import React from 'react';
import SignupHeader from "../pages/Signup/SignupHeader";
import Homepage from "../pages/homepage/HomepageHeader";


function Routes() {
  return (
    localStorage.getItem('token') ? <Homepage /> : <SignupHeader />
  );
}

export default Routes;