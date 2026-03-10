import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./components/pages/Signin";
import Home from "./components/pages/Home";
import { Signup } from "./components/pages/Signup";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />}/>

        {/* Enter other Routes in here */}
        <Route path="/Home" element={<Home />} />
        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
