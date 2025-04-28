import "./App.css";
import Interactive from "./components/interactive";
import Navbar from "./components/Navbar";
import About from "./components/about";
import PastRecs from "./components/pastRecs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar1 from "./components/Navbar";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  return (
    <Router>
      <Navbar1 setEmail={setEmail} email={email} />
      <Routes>
        <Route path="/" exact element={<Interactive email={email} />} />
        <Route path="/about" element={<About />} />
        <Route path="/pastRecs" element={<PastRecs email={email} />} />
      </Routes>
    </Router>
  );
}

export default App;
