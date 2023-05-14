import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Statistics, AdminsList } from "#blocks";
import { CreateLocalAdmin } from "#backdrops";
import { useGetAdminData } from "#hooks";

import "./dashboard.scss";

/**
 * Dashboard
 *
 * Global admin dashboard
 *
 * @returns {JSX.Element}
 */
export const Dashboard = () => {
  const navigate = useNavigate();
  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);
  const [action, setAction] = useState("create");
  const adminData = useGetAdminData()[1];
  const adminToEdit = useRef();
  const openCreateAdmin = () => setIsCreateAdminOpen(true);

  const openEditAdmin = (id) => {
    if (adminData.adminId === id) {
      navigate("/profile/edit");
    } else {
      setAction("edit");
      adminToEdit.current = id;
      setIsCreateAdminOpen(true);
    }
  };

  const closeEditAdmin = () => {
    adminToEdit.current = null;
    setIsCreateAdminOpen(false);
  };

  return (
    <Page classes="page__dashboard" showGoBackArrow={false}>
      <Statistics />
      <AdminsList
        adminId={adminData?.adminId}
        openCreateAdmin={openCreateAdmin}
        openEditAdmin={openEditAdmin}
        closeEditAdmin={closeEditAdmin}
      />
      <CreateLocalAdmin
        isOpen={isCreateAdminOpen}
        onClose={closeEditAdmin}
        adminType="global"
        action={action}
        adminId={adminToEdit.current}
      />
    </Page>
  );
};
