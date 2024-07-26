import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard";
import Footer from "./components/Footer";
import { Sidebar } from "./components/SideMenu";
import { Users } from "./pages/users/users";

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {!hideSidebar && <Sidebar className="w-1/6 bg-orange-200 rounded-r-md" />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
