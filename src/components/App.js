import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import SignIn from "./SignIn"
import SignUp from "./SignUp"

import TokenContext from "../contexts/TokenContext"
import Timeline from "./Timeline"

export default function App() {
  const [token, setToken] = useState("")

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline/>} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  )
}
