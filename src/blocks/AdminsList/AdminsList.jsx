import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  Block,
  Button,
  Modal,
  AdminsTable,
} from "@USupport-components-library/src";

import { useGetAllGlobalAdmins, useDeleteAdminById } from "#hooks";

import "./admins-list.scss";

/**
 * AdminsList
 *
 * Block to display all global admins
 *
 * @return {jsx}
 */
export const AdminsList = ({ openCreateAdmin, openEditAdmin, adminId }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("admins-list");
  const rows = ["user", "status", "email", "phone", ""];

  const { isLoading, data } = useGetAllGlobalAdmins();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDeleteAdminSuccess = () => {
    toast(t("admin_deleted"));
    setIsDeleteModalOpen(false);
    queryClient.invalidateQueries(["global-admins"]);
    setIsSubmitting(false);
  };
  const onDeleteAdminError = (err) => {
    toast(err, { type: "error" });
    setIsSubmitting(false);
  };
  const deleteAdminMutation = useDeleteAdminById(
    onDeleteAdminSuccess,
    onDeleteAdminError
  );

  const confirmDelete = () => {
    setIsSubmitting(true);
    deleteAdminMutation.mutate(adminToDelete);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = (id) => {
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleEditAdmin = (id) => {
    openEditAdmin(id);
  };

  return (
    <React.Fragment>
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
          adminId={adminId}
          handleEdit={handleEditAdmin}
          handleDelete={handleDelete}
          isLoading={isLoading}
          rows={rows}
          data={data}
          t={t}
        />
      </Block>
      <Modal
        heading={t("are_you_sure")}
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        ctaLabel={t("delete_icon")}
        ctaHandleClick={confirmDelete}
        secondaryCtaLabel={t("cancel")}
        secondaryCtaHandleClick={() => setIsDeleteModalOpen(false)}
        secondaryCtaType="secondary"
        isCtaDisabled={isSubmitting}
      />
    </React.Fragment>
  );
};
