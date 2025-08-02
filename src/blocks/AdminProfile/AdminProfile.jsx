import React, { useState, useEffect } from "react";
import { useCustomNavigate as useNavigate } from "#hooks";
import { useTranslation } from "react-i18next";
import {
  Block,
  Grid,
  GridItem,
  ButtonSelector,
} from "@USupport-components-library/src";
import { useGetAdminData } from "#hooks";

const GIT_BOOK_URL = `${import.meta.env.VITE_GIT_BOOK_URL}`;
import "./admin-profile.scss";

/**
 * AdminProfile
 *
 * AdminProfile block
 *
 * @return {jsx}
 */
export const AdminProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("blocks", { keyPrefix: "admin-profile" });

  const [displayName, setDisplayName] = useState("");

  const adminData = useGetAdminData()[1];
  useEffect(() => {
    if (adminData) {
      setDisplayName(`${adminData.name} ${adminData.surname}`);
    }
  }, [adminData]);

  const handleRedirect = (redirectTo) => {
    navigate(`/${redirectTo}`);
  };

  return (
    <Block classes="admin-profile">
      <Grid md={8} lg={12} classes="admin-profile__grid">
        <GridItem md={8} lg={12} classes="admin-profile__grid__item">
          <p className="text admin-profile__grid__item__label">
            {t("your_profile")}
          </p>
          <ButtonSelector
            label={displayName || t("guest")}
            classes="admin-profile__grid__item__button "
            onClick={() => handleRedirect("profile/edit")}
          />
          <ButtonSelector
            label={t("user_guide")}
            classes="admin-profile__grid__item__button "
            onClick={() => window.open(GIT_BOOK_URL, "_blank")}
          />
        </GridItem>
        {/* <GridItem md={8} lg={12} classes="admin-profile__grid__item">
          <p className="text admin-profile__grid__item__label">{t("other")}</p>
          <ButtonSelector
            label={t("privacy_policy_button_label")}
            iconName="document"
            classes="admin-profile__grid__item__button"
            onClick={() => handleRedirect("privacy-policy")}
          />
        </GridItem> */}
      </Grid>
    </Block>
  );
};
