import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Home";
import { LoginPage } from "./pages/Auth";
import AuthWrapper from "./components/AuthWrapper";
import AppWrapper from "./components/AppWrapper";
import PickupRequestPage from "./pages/PickupRequest";
import VolunteerPage from "./pages/Volunteer";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppWrapper />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pickups" element={<PickupRequestPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
        </Route>

        <Route element={<AuthWrapper />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
