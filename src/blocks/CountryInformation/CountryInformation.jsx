import React from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Statistics } from "#blocks";
import { useGetAllCountryAdmins } from "#hooks";
import {
  AdminsTable,
  Button,
  Block,
  Icon,
  Grid,
  GridItem,
} from "@USupport-components-library/src";

import "./country-information.scss";

/**
 * CountryInformation
 *
 * Country information block
 *
 * @return {jsx}
 */
export const CountryInformation = ({ openCreateAdmin, openEditAdmin }) => {
  const countryId = new URLSearchParams(window.location.search).get(
    "countryId"
  );
  const countryAlpha2 = new URLSearchParams(window.location.search).get(
    "countryAlpha2"
  );
  const countryName = new URLSearchParams(window.location.search).get(
    "countryName"
  );

  if (!countryId || !countryAlpha2 || !countryName) {
    return <Navigate to="/countries" />;
  }
  const { t } = useTranslation("country-information");
  const rows = ["user", "status", "email", "phone", ""];
  const { isLoading, data } = useGetAllCountryAdmins(countryId);

  const handleDelete = (id) => {
    //TODO: delete admin
  };
  const handleEdit = (id) => {
    openEditAdmin(id);
  };

  return (
    <Block classes="country-information">
      <Header countryAlpha2={countryAlpha2} countryName={countryName} />
      <Statistics countryId={countryId} />
      <Block>
        <Grid classes="country-information__add-admin">
          <GridItem md={4} lg={6}>
            <h4>{t("country_admins")}</h4>
          </GridItem>
          <GridItem md={4} lg={6}>
            <Button
              size="md"
              type="primary"
              color="purple"
              label={t("add_admin")}
              onClick={openCreateAdmin}
            />
          </GridItem>
        </Grid>
      </Block>
      <AdminsTable
        isLoading={isLoading}
        rows={rows}
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        t={t}
      />
    </Block>
  );
};

const Header = ({ countryName, countryAlpha2 }) => {
  return (
    <div className="country-information__header">
      <Icon name="arrow-chevron-back" />
      <Icon name={`flag-${countryAlpha2}-round`} />
      <h3>{countryName}</h3>
    </div>
  );
};
