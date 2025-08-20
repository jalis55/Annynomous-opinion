
import './App.css';
import React, { useState, useEffect } from 'react'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AllPosts from './components/Post/AllPosts';
import NavBar from './components/NavBar/NavBar';
import CreatePost from './components/Post/CreatePost';
import AgreementModal from './components/Agreement/AgreementModal';
import Aboutus from './components/AboutUs/Aboutus';


function App() {
  //agreement
  
  const [showTerms, setShowTerms] = useState(true);

  useEffect(() => {
    const hasAgreed = localStorage.getItem('hasAgreedToTerms');
   
    if (hasAgreed) {
      setShowTerms(false);
    }
  }, []);

  //Routers
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><NavBar /> <AllPosts /> </>
    },
    {
      path: "/create-post",
      element: <div><NavBar /><CreatePost /></div>
    },
    {
      path:"/aboutus",
      element: <div><NavBar /><Aboutus /></div>
    }
  ])

  if (!showTerms) {
    return (
      <>
      <RouterProvider router={router} />
      </>
    );
  }


  return (
    <>
            <AgreementModal setShowTerms={setShowTerms}/>

    </>
  );
}

export default App;
