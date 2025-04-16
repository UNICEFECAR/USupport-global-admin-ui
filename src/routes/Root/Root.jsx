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

  const allLangs = ["en", "ru", "kk", "pl", "uk"];

  if (!allLangs.includes(language) || !language) {
    return <Navigate to="/en/global-admin" />;
  }
  return (
    <Routes>
      <Route path="/global-admin/login" element={<Login />} />
      <Route
        path="/global-admin/forgot-password"
        element={<ForgotPassword />}
      />
      <Route path="/global-admin/reset-password" element={<ResetPassword />} />
      <Route
        path="/global-admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/global-admin/profile"
        element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/global-admin/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfileDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/global-admin/countries"
        element={
          <ProtectedRoute>
            <ChooseCountry />
          </ProtectedRoute>
        }
      />
      <Route
        path="/global-admin/countries/specific"
        element={
          <ProtectedRoute>
            <CountryInformation />
          </ProtectedRoute>
        }
      />
      <Route path="/global-admin" element={<Welcome />} />
      <Route path="/global-admin/*" element={<NotFound />} />
    </Routes>
  );
};

export default function Root() {
  const { t } = useTranslation("root");

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
          path="/:language"
          element={<Navigate to={`/${language}/global-admin`} replace />}
        />
        <Route path=":language/*" element={<LanguageLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export { Root, RootContext };
