import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import React from "react";

import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Timeline from "./timeline"
import HashtagSidebar from "./HashtagSidebar";

import TokenContext from "../contexts/TokenContext"

export default function App() {
  const [token, setToken] = useState("")

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="*" element={<h1>This page does not exists</h1>} />
          <Route path="/hashtag_testes" element={<HashtagSidebar />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  )
}