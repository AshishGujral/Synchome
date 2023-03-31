import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import AcControlHome from "./components/Ac Control/AcControlHome";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext, useState } from "react";
import WaterControl from "./pages/waterControl/waterControl";
import MotionControl from "./pages/motionControl/MotionControl";
import LedControl from "./pages/ledControl/LedControl"
import { Context } from "./context/Context";
import UserHome from "./components/Userprofile/UserHome";

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


function App() {
// const [user, setUser] = useState(true); // before register
const {user} = useContext(Context);
  return (
    <Router>
      {/* insert outlet if any  */}
      <Routes>
        {/* ! make this protected route */}
        <Route path="/login" element={<Login />}></Route>

       
        <Route path="/" element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/waterControl" element={<ProtectedRoute user={user} />}>
          <Route path="/waterControl" element={<WaterControl />} />
        </Route>

        <Route path="/accontrol" element={<ProtectedRoute user={user} />}>
          <Route path="/accontrol" element={<AcControlHome />} />
        </Route>

        <Route path="/ledcontrol" element={<ProtectedRoute user={user} />}>
          <Route path="/ledcontrol" element={<LedControl />} />
        </Route>

        <Route path="/motioncontrol" element={<ProtectedRoute user={user} />}>
          <Route path="/motioncontrol" element={<MotionControl />} />
        </Route>

        <Route path="/UserHome" element={<ProtectedRoute user={user} />}>
          <Route path="/UserHome" element={<UserHome/>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
