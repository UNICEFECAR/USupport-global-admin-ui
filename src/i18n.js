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
  CodeVerification,
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
    "code-verification": CodeVerification.en,
  },

  kk: {
    // Blocks
    page: Page.kk,
    login: Login.kk,
    "forgot-password": ForgotPassword.kk,
    "reset-password": ResetPassword.kk,
    statistics: Statistics.kk,
    "admins-list": AdminsList.kk,
    "edit-profile-details": EditProfileDetails.kk,
    "admin-profile": AdminProfile.kk,
    "choose-country": ChooseCountry.kk,
    "country-information": CountryInformation.kk,
    welcome: Welcome.kk,

    // Pages
    "not-found-page": NotFoundPage.kk,
    "login-page": LoginPage.kk,
    "forgot-password-page": ForgotPasswordPage.kk,
    "reset-password-page": ResetPasswordPage.kk,
    "edit-profile-details-page": EditProfileDetailsPage.kk,
    "admin-profile-page": AdminProfilePage.kk,
    "welcome-page": WelcomePage.kk,

    //Backdrops
    "create-content-admin": CreateContentAdmin.kk,
    "create-local-admin": CreateLocalAdmin.kk,
    "change-password": ChangePassword.kk,
    "code-verification": CodeVerification.kk,
  },

  ru: {
    // Blocks
    page: Page.ru,
    login: Login.ru,
    "forgot-password": ForgotPassword.ru,
    "reset-password": ResetPassword.ru,
    statistics: Statistics.ru,
    "admins-list": AdminsList.ru,
    "edit-profile-details": EditProfileDetails.ru,
    "admin-profile": AdminProfile.ru,
    "choose-country": ChooseCountry.ru,
    "country-information": CountryInformation.ru,
    welcome: Welcome.ru,

    // Pages
    "not-found-page": NotFoundPage.ru,
    "login-page": LoginPage.ru,
    "forgot-password-page": ForgotPasswordPage.ru,
    "reset-password-page": ResetPasswordPage.ru,
    "edit-profile-details-page": EditProfileDetailsPage.ru,
    "admin-profile-page": AdminProfilePage.ru,
    "welcome-page": WelcomePage.ru,

    //Backdrops
    "create-content-admin": CreateContentAdmin.ru,
    "create-local-admin": CreateLocalAdmin.ru,
    "change-password": ChangePassword.ru,
    "code-verification": CodeVerification.ru,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
});

export default i18n;
