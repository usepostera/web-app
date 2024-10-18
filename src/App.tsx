import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Home";
import { LoginPage } from "./pages/Auth";
import AuthWrapper from "./components/AuthWrapper";
import AppWrapper from "./components/AppWrapper";
import PickupRequestPage from "./pages/PickupRequest";
import VolunteerPage from "./pages/Volunteer";
import AccountPage from "./pages/Account";
import ManageAddressPage from "./pages/ManageAddress";
import NotificationSettingsPage from "./pages/NotificationSettings";
import LogoutPage from "./pages/Auth/Logout";
import NotificationPage from "./pages/Notification";
import { Toaster } from "react-hot-toast";
import AccountWalletPage from "./pages/AccountWallet";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route element={<AppWrapper />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/pickups" element={<PickupRequestPage />} />
            <Route path="/pickups/:id" element={<PickupRequestPage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/account" element={<AccountPage />}>
              <Route path="/account" element={null} />
              <Route path="/account/wallet" element={<AccountWalletPage />} />
              <Route
                path="/account/addresses"
                element={<ManageAddressPage />}
              />
              <Route
                path="/account/notification-settings"
                element={<NotificationSettingsPage />}
              />
            </Route>
          </Route>

          <Route element={<AuthWrapper />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
