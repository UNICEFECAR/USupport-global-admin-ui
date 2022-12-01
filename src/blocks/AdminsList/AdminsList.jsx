import React from "react";
import { Block, Button, Loading, Icon } from "@USupport-components-library/src";

import "./admins-list.scss";
import { useTranslation } from "react-i18next";
import { useGetAllGlobalAdmins } from "#hooks";
import { AdminsTable } from "@USupport-components-library/src";

/**
 * AdminsList
 *
 * Block to display all global admins
 *
 * @return {jsx}
 */
export const AdminsList = ({ openCreateAdmin, openEditAdmin }) => {
  const { t } = useTranslation("admins-list");
  const rows = ["user", "status", "email", "phone", ""];

  const { isLoading, data } = useGetAllGlobalAdmins();

  const handleEditAdmin = (id) => {
    openEditAdmin(id);
  };

  return (
    <Block classes="admins-list">
      <div className="admins-list__add-admin">
        <h3>{t("global_admins")}</h3>
        <Button
          size="md"
          type="primary"
          color="purple"
          label={t("add_admin")}
          onClick={openCreateAdmin}
        />
      </div>
      <AdminsTable
        isLoading={isLoading}
        rows={rows}
        data={data}
        t={t}
        handleEdit={handleEditAdmin}
      />
    </Block>
  );
};
