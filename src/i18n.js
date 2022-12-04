import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  Page,
  Login,
  ForgotPassword,
  ResetPassword,
  Statistics,
  AdminsList,
  AdminProfile,
  EditProfileDetails,
  ChooseCountry,
  CountryInformation,
  Welcome,
} from "#blocks/locales.js";
import {
  NotFound as NotFoundPage,
  Login as LoginPage,
  ForgotPassword as ForgotPasswordPage,
  ResetPassword as ResetPasswordPage,
  EditProfileDetails as EditProfileDetailsPage,
  AdminProfile as AdminProfilePage,
  Welcome as WelcomePage,
} from "#pages/locales.js";

import {
  CreateContentAdmin,
  CreateLocalAdmin,
  ChangePassword,
} from "#backdrops/locales.js";

const resources = {
  en: {
    // Blocks
    page: Page.en,
    login: Login.en,
    "forgot-password": ForgotPassword.en,
    "reset-password": ResetPassword.en,
    statistics: Statistics.en,
    "admins-list": AdminsList.en,
    "edit-profile-details": EditProfileDetails.en,
    "admin-profile": AdminProfile.en,
    "choose-country": ChooseCountry.en,
    "country-information": CountryInformation.en,
    welcome: Welcome.en,

    // Pages
    "not-found-page": NotFoundPage.en,
    "login-page": LoginPage.en,
    "forgot-password-page": ForgotPasswordPage.en,
    "reset-password-page": ResetPasswordPage.en,
    "edit-profile-details-page": EditProfileDetailsPage.en,
    "admin-profile-page": AdminProfilePage.en,
    "welcome-page": WelcomePage.en,

    //Backdrops
    "create-content-admin": CreateContentAdmin.en,
    "create-local-admin": CreateLocalAdmin.en,
    "change-password": ChangePassword.en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
});

export default i18n;
