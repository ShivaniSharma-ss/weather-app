import "./App.css";
import Weather from "./components/weather/Weather";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import AddUser from "./components/addUser/AddUser";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
// require("dotenv").config();

function App() {
  return (

      <Routes>
        <Route path="/weather" element={<Weather />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/setPassword" element={<AddUser />}></Route>
      </Routes>
  );
}

export default App;
