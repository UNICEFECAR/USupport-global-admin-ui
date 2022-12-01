import React from "react";
import { Page, ChooseCountry as ChooseCountryBlock } from "#blocks";

import "./choose-country.scss";

/**
 * ChooseCountry
 *
 * Choose country page
 *
 * @returns {JSX.Element}
 */
export const ChooseCountry = () => {
  return (
    <Page showGoBackArrow={false} classes="page__choose-country">
      <ChooseCountryBlock />
    </Page>
  );
};
