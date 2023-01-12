//React
import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Styles
import "./App.scss";

//Helper
import AuthGuard from "./helper/AuthGuard";

//Pages
const Login = React.lazy(() => import("./pages/auth/login/Login"));
const Register = React.lazy(() => import("./pages/auth/register/Register"));
const Calculator = React.lazy(() => import("./pages/calculator/Calculator"));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<AuthGuard />}>
              <Route path="/" element={<Calculator />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
