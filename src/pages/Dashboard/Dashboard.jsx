import React, { useState } from "react";
import { Page, Statistics, AdminsList } from "#blocks";
import { CreateLocalAdmin } from "#backdrops";

import "./dashboard.scss";
import { useRef } from "react";

/**
 * Dashboard
 *
 * Global admin dashboard
 *
 * @returns {JSX.Element}
 */
export const Dashboard = () => {
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
    <Page classes="page__dashboard">
      <Statistics />
      <AdminsList
        openCreateAdmin={openCreateAdmin}
        openEditAdmin={openEditAdmin}
        closeEditAdmin={closeEditAdmin}
      />
      <CreateLocalAdmin
        isOpen={isCreateAdminOpen}
        onClose={() => setIsCreateAdminOpen(false)}
        adminType="global"
        action={adminToEdit.current ? "edit" : "create"}
        adminId={adminToEdit.current}
      />
    </Page>
  );
};
