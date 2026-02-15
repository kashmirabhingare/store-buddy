import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Payments from "./pages/Payments";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;