import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useCustomNavigate as useNavigate } from "#hooks";

import {
  Block,
  Button,
  Grid,
  GridItem,
  DropdownWithLabel,
  Loading,
} from "@USupport-components-library/src";
import { languageSvc } from "@USupport-components-library/services";
import { logoVerticalSvg } from "@USupport-components-library/assets";
import {
  replaceLanguageInUrl,
  getLanguageFromUrl,
} from "@USupport-components-library/utils";

import "./welcome.scss";

/**
 * Welcome
 *
 * Welcome block
 *
 * @return {jsx}
 */
export const Welcome = () => {
  const { t, i18n } = useTranslation("welcome");
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const localStorageLanguage = localStorage.getItem("language");

  const fetchLanguages = async () => {
    const FOR_GLOBAL = true;
    const res = await languageSvc.getActiveLanguages(FOR_GLOBAL);

    const languageFromUrl = getLanguageFromUrl();
    let hasUpdatedUrl = false;
    const hasLanguage = res.data.find((x) => x.alpha2 === languageFromUrl);

    if (hasLanguage) {
      localStorage.setItem("language", languageFromUrl);
      setSelectedLanguage(languageFromUrl);
      i18n.changeLanguage(languageFromUrl);
      replaceLanguageInUrl(languageFromUrl);
      hasUpdatedUrl = true;
    }

    const languages = res.data.map((x) => {
      const languageObject = {
        value: x.alpha2,
        label: x.name === "English" ? x.name : `${x.name} (${x.local_name})`,
        id: x["language_id"],
      };
      if (localStorageLanguage === x.alpha2 && !hasUpdatedUrl) {
        setSelectedLanguage(x.alpha2);
        i18n.changeLanguage(localStorageLanguage);
        replaceLanguageInUrl(localStorageLanguage);
      }
      return languageObject;
    });
    return languages;
  };

  const languagesQuery = useQuery(["languages"], fetchLanguages, {
    retry: false,
  });

  const handleSelectLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    replaceLanguageInUrl(lang);
  };

  const handleContinue = () => {
    const language = selectedLanguage;

    localStorage.setItem("language", language);

    i18n.changeLanguage(language);

    navigate("/login");
  };

  return (
    <Block classes="welcome">
      <Grid md={8} lg={12} classes="welcome__grid">
        <GridItem md={8} lg={12} classes="welcome__grid__logo-item">
          <h2 className="welcome__grid__logo-item__heading">{t("heading")}</h2>
          <img
            src={logoVerticalSvg}
            alt="Logo"
            className="welcome__grid__logo-item__logo"
          />
          <h2 className="welcome__grid__logo-item__heading">{t("admin")}</h2>
        </GridItem>
        <GridItem md={8} lg={12} classes="welcome__grid__content-item">
          {!languagesQuery.isLoading ? (
            <>
              <DropdownWithLabel
                options={languagesQuery.data || []}
                selected={selectedLanguage}
                setSelected={handleSelectLanguage}
                classes="welcome__grid__content-item__languages-dropdown"
                label={t("language")}
                placeholder={t("placeholder")}
              />
            </>
          ) : (
            <div className="welcome__grid__loading-container">
              <Loading size="lg" />
            </div>
          )}
          <Button
            label={t("button")}
            size="lg"
            disabled={!selectedLanguage}
            onClick={handleContinue}
          />
        </GridItem>
      </Grid>
    </Block>
  );
};
