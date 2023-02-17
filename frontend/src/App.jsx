import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext, useState } from "react";
// import { Context } from "./context/Context";

const ProtectedRoute = ({ user, redirectPath = "/login" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
// ! for testing protected routes// delete this later

function App() {
const [user, setUser] = useState(true); 
 
  return (
    <Router>
      {/* insert outlet if any  */}
      <Routes>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
