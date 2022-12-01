import React, { useState, useRef } from "react";
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
    <Page classes="page__country-information" showGoBackArrow={false}>
      <CountryInformationBlock
        openCreateAdmin={openCreateAdmin}
        openEditAdmin={openEditAdmin}
        closeEditAdmin={closeEditAdmin}
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
