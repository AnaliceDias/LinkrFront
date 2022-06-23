import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Timeline from "../pages/Timeline";
import UserPage from "../pages/UserPage";
import HashtagPage from "../pages/HashtagPage";
import HashtagSidebar from "./HashtagSidebar";

// import Timeline from "./timeline"

// import TokenContext from "../contexts/TokenContext";
import FollowingContext from "../contexts/FollowingContext";

export default function App() {
  const [followingArr, setFollowingArr] = useState(null);

  return (
    <FollowingContext.Provider value={{ followingArr, setFollowingArr }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          <Route path="/users/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </FollowingContext.Provider>
  );
}
