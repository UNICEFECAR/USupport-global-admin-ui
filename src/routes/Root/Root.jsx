import React, { useState, useCallback } from "react";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IdleTimer } from "@USupport-components-library/src";

import { useEventListener } from "#hooks";

import {
  NotFound,
  Login,
  AdminProfile,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  EditProfileDetails,
  ChooseCountry,
  CountryInformation,
  Welcome,
} from "#pages";

import { ProtectedRoute } from "../ProtectedRoute";

const RootContext = React.createContext();

const LanguageLayout = () => {
  const { language } = useParams();

  const allLangs = ["en", "ru", "kk", "pl", "uk", "hy", "ro", "el"];

  if (!allLangs.includes(language) || !language) {
    return <Navigate to="/global-admin/en" />;
  }
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/edit"
        element={
          <ProtectedRoute>
            <EditProfileDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="countries"
        element={
          <ProtectedRoute>
            <ChooseCountry />
          </ProtectedRoute>
        }
      />
      <Route
        path="countries/specific"
        element={
          <ProtectedRoute>
            <CountryInformation />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default function Root() {
  const { t } = useTranslation("routes", { keyPrefix: "root" });

  const token = localStorage.getItem("token");
  const language = localStorage.getItem("language");
  const [loggedIn, setLoggedIn] = useState(!!token);

  const logoutHandler = useCallback(() => {
    setLoggedIn(false);
  }, []);

  useEventListener("logout", logoutHandler);

  const loginHandler = useCallback(() => {
    setLoggedIn(true);
  }, []);

  useEventListener("login", loginHandler);

  return (
    <React.Fragment>
      {loggedIn && (
        <IdleTimer
          setLoggedIn={setLoggedIn}
          t={t}
          NavigateComponent={Navigate}
          isInAdmin={true}
        />
      )}
      <Routes>
        <Route
          path="/global-admin"
          element={
            <Navigate to={`/global-admin/${language || "en"}`} replace />
          }
        />
        <Route path="/global-admin/:language/*" element={<LanguageLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export { Root, RootContext };
