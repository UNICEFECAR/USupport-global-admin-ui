import React, { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Icon } from "@USupport-components-library/src";

import { Page, CountryInformation as CountryInformationBlock } from "#blocks";
import { CreateLocalAdmin } from "#backdrops";

import "./country-information.scss";

/**
 * CountryInformation
 *
 * Country information page
 *
 * @returns {JSX.Element}
 */
export const CountryInformation = () => {
  const navigate = useNavigate();

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

  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);
  // const [adminToEdit, setAdminToEdit] = useState(null); // The id of the admin that is currently being edited
  const adminToEdit = useRef();
  const openCreateAdmin = () => setIsCreateAdminOpen(true);

  const openEditAdmin = (id) => {
    adminToEdit.current = id;
    setIsCreateAdminOpen(true);
  };

  const closeEditAdmin = () => {
    adminToEdit.current = null;
    setIsCreateAdminOpen(false);
  };

  return (
    <Page
      classes="page__country-information"
      handleGoBack={() => navigate(-1)}
      headingComponent={
        <Header countryAlpha2={countryAlpha2} countryName={countryName} />
      }
    >
      <CountryInformationBlock
        openCreateAdmin={openCreateAdmin}
        openEditAdmin={openEditAdmin}
        closeEditAdmin={closeEditAdmin}
        countryId={countryId}
      />
      <CreateLocalAdmin
        isOpen={isCreateAdminOpen}
        onClose={closeEditAdmin}
        adminType="country"
        action={adminToEdit.current ? "edit" : "create"}
        adminId={adminToEdit.current}
      />
    </Page>
  );
};

const Header = ({ countryName, countryAlpha2 }) => {
  return (
    <div className="page__country-information__header">
      <Icon name={`flag-${countryAlpha2}-round`} />
      <h3>{countryName}</h3>
    </div>
  );
};
