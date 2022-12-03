import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  Block,
  Country,
  Grid,
  GridItem,
  Loading,
} from "@USupport-components-library/src";
import { countrySvc } from "@USupport-components-library/services";

import "./choose-country.scss";

/**
 * ChooseCountry
 *
 * Choose a country
 *
 * @return {jsx}
 */
export const ChooseCountry = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("choose-country");

  const fetchCountries = async () => {
    try {
      const { data } = await countrySvc.getActiveCountries();
      return data;
    } catch (err) {}
  };
  const { isLoading, data } = useQuery(["countries"], fetchCountries);

  const handleRedirectToCountry = (country) => {
    navigate(
      `/countries/specific/?countryId=${country.country_id}&countryName=${country.name}&countryAlpha2=${country.alpha2}`
    );
  };

  return (
    <Block classes="choose-country">
      <h3>{t("countries")}</h3>
      <Grid classes="choose-country__grid">
        {isLoading ? (
          <GridItem md={8} lg={12}>
            <Loading size="lg" />
          </GridItem>
        ) : (
          data.map((country) => {
            return (
              <GridItem md={3} lg={4} key={country.country_id}>
                <Country
                  countryName={country.name}
                  countryAlpha2={country.alpha2}
                  handleClick={() => handleRedirectToCountry(country)}
                />
              </GridItem>
            );
          })
        )}
      </Grid>
    </Block>
  );
};
